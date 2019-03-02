import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Injectable } from '@angular/core'
import { User } from './shared/user.model';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators'
import { URL_API } from './shared/app.api';

@Injectable()
export class AppService {

    constructor(private http: Http){}

    public getUsers(): Observable<User[]> { 
        return this.http.get(`${URL_API}/users`)
            .pipe(map((resposta: Response) => resposta.json()))
    }

    public save(usuario: User): Observable<any> {
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')

        return this.http.post(
            `${URL_API}/users`, 
            JSON.stringify(usuario),
            new RequestOptions({ headers: headers })
        )
        .pipe( map((resposta: Response) => {
            resposta.json()
            console.log(resposta)
        }) )
    }

    public update(usuario: User, id: number): Observable<any> {
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')

        return this.http.put(
            `${URL_API}/users/${id}`,
            JSON.stringify(usuario),
            new RequestOptions({ headers: headers })
        )
        .pipe( map((resposta: Response) => {
            resposta.json()
            console.log(resposta)
        }) )
    }

    public delete(id: number): Observable<any> {
        return this.http.delete(`${URL_API}/users/${id}`)
            .pipe( map((resposta: Response) => {
                resposta.json()
            }) )
    }

    public searchUser(termo: string): Observable<User[]> {
        return this.http.get(`${URL_API}/users/?nome_like=${termo}`)
            .pipe(
                retry(10),
                map((resposta: Response) => resposta.json()
            ))
    }

    public consultaCep(cep: string): any {
        return this.http.get(`https://viacep.com.br/ws/${cep}/json/ `)
            .pipe(map((resposta: Response) => resposta.json()))
    }

    public getEstadosBr(): any{
        return this.http.get('src/app/shared/estados.json')
            .pipe(map((resposta: Response) => resposta.json()))
    }

}