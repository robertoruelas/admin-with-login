import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {UsuarioService} from '../../services/usuario.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public formSubitted = false;

  public registerForm = this.fb.group({
    nombre: ['Roberto', [Validators.required, Validators.minLength(3)]],
    email: ['roberto.ruelas@uas.edu.mx',[Validators.required,Validators.email]],
    password: ['123456', Validators.required],
    password2: ['123456',Validators.required],
    terminos: [true,Validators.required]



  },{
    validators: this.passwordIguales('password','password2')
  });

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService ) { }

  crearUsuario(){
    this.formSubitted = true;
    console.log(this.registerForm.value);

    if(this.registerForm.invalid){
      return;
    }

    //Realizar el posteo
    this.usuarioService.crearUsuario(this.registerForm.value)
        .subscribe( resp => {
          console.log('Usuario creado.');
          console.log(resp);
        },(err) => {
          // Si sucede un error 
          Swal.fire('Error',err.error.msg,'error');
        });
  }


  aceptaTerminos(){
    return !this.registerForm.get('terminos').value && this.formSubitted;
  }
  contrasenasNoValidas(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if((pass1 !== pass2) && this.formSubitted ){
      return true;
    }else{
      return false;
    }


  }
  campoNoValido( campo: string): boolean {
    if(this.registerForm.get(campo).invalid && this.formSubitted){
      return true;
    }else{
      return false;
    }
    
  }
  passwordIguales(passName1: string, passName2: string){
    return (formGroup: FormGroup) => {

      const passControl1 = formGroup.get(passName1);
      const passControl2 = formGroup.get(passName2);

      if(passControl1.value === passControl2.value){
        passControl2.setErrors(null);
      }else{
        passControl2.setErrors({noEsIgual: true});
      }


    }

  }

}
