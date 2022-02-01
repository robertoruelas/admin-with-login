import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  public formSubitted = false;

  public loginForm = this.fb.group({
    
    email: ['roberto.ruelas@uas.edu.mx',[Validators.required,Validators.email]],
    password: ['123456', Validators.required],
    remember: [false]
  
  });
  constructor( private router: Router , private fb: FormBuilder, private usurioService: UsuarioService ) { }

  ngOnInit(): void {
  }

  login() {

    this.usurioService.login(this.loginForm.value)

     .subscribe(resp => {
       //console.log(resp);
       this.router.navigateByUrl('/');
     },(err) => {
        // Si sucede un error 
        Swal.fire('Error',err.error.msg,'error');
     });

    
  }

}
