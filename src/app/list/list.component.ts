import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { User } from '../shared/user.model';
import { Router } from '@angular/router';
import { Subject, Observable, of } from 'rxjs';
import { debounce, distinctUntilChanged, debounceTime, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public usuarios: User[]
  public obsUsuarios: Observable<User[]>
  public flag: boolean = false
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(
    private appService: AppService,
    private router: Router
    ) { }

  ngOnInit() {
    this.obsUsuarios = this.subjectPesquisa.pipe(
      debounceTime(1000) ,
      distinctUntilChanged(),
      switchMap((termo: string) =>{
        if(termo.trim() === ""){
          this.appService.getUsers()
            .subscribe((usuarios: any) => {
              this.usuarios = usuarios
            })
            // return of<User[]>([])
        }
        return this.appService.searchUser(termo)
      }),
      catchError((err: any) => {
        console.log(err)
        return of<User[]>([])
      })
    )

    this.obsUsuarios.subscribe((usuarios: User[]) => {
      this.usuarios = usuarios
      if(this.usuarios.length === 0){
          this.flag = true
      } else {
        this.flag = false
      }
    })

    this.getUsers()
  }

  public getUsers(): void {
    this.appService.getUsers()
      .subscribe((usuarios: any) => {
        this.usuarios = usuarios
        if(this.usuarios.length === 0){
          this.flag = true
        } else {
          this.flag = false
        }
      })
  }

  public delete(usuario: User, id): void {
    if (confirm("Tem certeza de que deseja excluir " + usuario.nome + "?")){
      this.appService.delete(id)
        .subscribe(() => {
          this.getUsers()
        })
    }
  }

  public pesquisa(termo: string): void {
    this.subjectPesquisa.next(termo)
  }
}
