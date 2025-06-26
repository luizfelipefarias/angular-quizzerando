import { Component, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  constructor(
    private dialog: MatDialog,
    private serviceTitle: Title,
    private router: Router
  ) { this.serviceTitle.setTitle('Meu Perfil') }



  formNome = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(5)])
  })

  formSenha = new FormGroup({
    senha: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmeSenha: new FormControl('', [Validators.required, Validators.minLength(8)]),

  }, this.senhasIguaisValidator)

  formEmail = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ])
  },this.emailRegistradoValidator)

  Voltar() {
    this.router.navigate(['/']);
  }

  modalAtual: 'nome' | 'email' | 'senha' | null = null;

  abrirModal(templateRef: TemplateRef<any>, tipo: 'nome' | 'email' | 'senha') {

    this.modalAtual=tipo;

    const dialogRef = this.dialog.open(templateRef, {
      width: '400px'
    });

    //remover o foco do botão para sumir o alert do console
    (document.activeElement as HTMLElement)?.blur();

    dialogRef.afterClosed().subscribe(() => {
      this.formNome.reset();
      this.formSenha.reset();
      this.formEmail.reset();
      this.formEnviado=false;
      
    })
    
  }
  
  senhasIguaisValidator(group: AbstractControl): ValidationErrors | null {
    const senha = group.get('senha')?.value;
    const confirma = group.get('confirmeSenha')?.value;

    if (!senha || !confirma){
      return null; // enquanto digita
    }
    return senha === confirma ? null : { senhasDiferentes: true };
  }

  formEnviado=false;

  emailRegistradoValidator(group: AbstractControl): ValidationErrors | null{
    const email = group.get('email')?.value;
    //verifica no back
    const res = 'usuariocadastrado@gmail.com';
    //
    //outra opcao:
    // if(res){
    //   return {emailRegistrado:true}
    // }

    return email===res ? {emailRegistrado:true} : null
  }

  salvarAlteracao() {
    this.formEnviado = true;

    if (this.modalAtual==='nome') {
      if(this.formNome.invalid){
      this.formNome.markAllAsTouched(); 
      return;
      }
    }
    else if (this.modalAtual==='senha') {
      if(this.formSenha.invalid){
      this.formSenha.markAllAsTouched(); 
      return;
      }
    }
    else if (this.modalAtual==='email') {
      if(this.formEmail.invalid){
      this.formEmail.markAllAsTouched(); 
      return;
      }
    }
    console.log('funfou')
    //chamadas do back e etc
    this.dialog.closeAll();
  }
  

}
