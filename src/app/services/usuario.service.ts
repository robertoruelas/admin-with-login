import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterForm} from '../interfaces/register-form.interfaces';
import {LoginForm} from '../interfaces/login-form.interface';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';



const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient,private router: Router) { }

 loguot(){
   localStorage.removeItem('token');
   this.router.navigateByUrl('/login');

 }

  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    
    return this.http.get(`${base_url}/login`,{
      headers:{
        'x-token':token 
      }

    }).pipe(
      tap( (resp: any) =>{
        localStorage.setItem('token',resp.token);
      }),
      map(resp => true),
      catchError( error => of(false))

    );

  }

  crearUsuario( formData: RegisterForm){
    
    return this.http.post(`${base_url}/usuarios`,formData);
    

  }

  login( formData: LoginForm){
    
    return this.http.post(`${base_url}/login`,formData)
    .pipe(
      tap( (resp: any) => {
        // console.log(resp.token);
        localStorage.setItem('token',resp.token);
      })
    );

  }


}
