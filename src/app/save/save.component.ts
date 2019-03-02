import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { User } from '../shared/user.model';
import { AppService } from '../app.service';
import { Estados } from '../shared/estados.model';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css']
})
export class SaveComponent implements OnInit, OnDestroy {

  public formulario: FormGroup
  public user: any
  public nome: any
  public flagButtonSave: boolean
  public inscricao: Subscription
  public estados: Observable<Estados[]>

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private appService: AppService,
    private router: Router
  ) {  }

  ngOnInit() {

    this.inscricao = this.route.params.subscribe((params: any) => {
      this.user = params
    })
    this.flagButtonSave =  this.user.id ? true : false

    this.formulario = this.fb.group({
      nome: ["",[Validators.required]],
      email: ["",[Validators.required]],
      rua: ["",[Validators.required]],
      cep: ["",[Validators.required]],
      numero: ["",[Validators.required]],
      complemento: [""],
      bairro: ["",[Validators.required]],
      cidade: ["",[Validators.required]],
      estado: ["",[Validators.required]]
    })

    if(this.user.id){
      this.setFormulario(this.user)
    }

    this.estados = this.appService.getEstadosBr()
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe()
  }

  public onSubmit(): void {
    if(this.formulario.valid){

      let usuario = this.setObjetoUsuario()
      
      if(this.user.id){
        this.appService.update(usuario, this.user.id)
          .subscribe((resposta: any) => {
            this.formulario.reset()
            this.router.navigate([""])
          })
      } else {
        this.appService.save(usuario)
          .subscribe((resposta: any) => {
            this.formulario.reset()
            this.router.navigate([""])
          })
      }
    } else {
      this.formulario.get("nome").markAsTouched(),
      this.formulario.get("email").markAsTouched()
      this.formulario.get("rua").markAsTouched()
      this.formulario.get("cep").markAsTouched()
      this.formulario.get("numero").markAsTouched()
      this.formulario.get("complemento").markAsTouched()
      this.formulario.get("bairro").markAsTouched()
      this.formulario.get("cidade").markAsTouched()
      this.formulario.get("estado").markAsTouched()
    }
  }

  public msgSuccess(campo: string): boolean {
    return this.formulario.get(campo).valid && this.formulario.get(campo).touched
  }

  public msgError(campo: string): boolean {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched
  }

  public setFormulario(usuario: User): void {
    this.formulario.setValue({
      nome: usuario.nome,
      email: usuario.email,
      rua: usuario.rua,
      cep: usuario.cep,
      numero: usuario.numero,
      complemento: usuario.complemento,
      bairro: usuario.bairro,
      cidade: usuario.cidade,
      estado: usuario.estado
    })
  }

  public setObjetoUsuario(): User{
    return new User(
      this.formulario.value.nome,
      this.formulario.value.email,
      this.formulario.value.rua,
      this.formulario.value.cep,
      this.formulario.value.numero,
      this.formulario.value.complemento,
      this.formulario.value.bairro,
      this.formulario.value.cidade,
      this.formulario.value.estado
    )
  }

  public consultaCep(cepConsulta: string): void {
    let cep = cepConsulta.replace(/\D/g, "")

    if(cep != ""){
      let validaCep = /^[0-9]{8}$/
      if(validaCep.test(cep)){
        this.appService.consultaCep(cep)
          .subscribe((resposta: any) => {
            this.formulario.patchValue({
              rua: resposta.logradouro,
              cep: resposta.cep,
              complemento: resposta.complemento,
              bairro: resposta.bairro,
              cidade: resposta.localidade,
              estado: resposta.uf
            })
          })
      }
    }
  }

}
