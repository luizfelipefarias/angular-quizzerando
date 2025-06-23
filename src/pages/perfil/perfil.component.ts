import { Component, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators,AbstractControl, ValidationErrors } from '@angular/forms';
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
      private router:Router
    ){ this.serviceTitle.setTitle('Meu Perfil')}
    


    formNome = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(5)])
    })

    formSenha = new FormGroup({
      senha: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmeSenha: new FormControl('', [Validators.required, Validators.minLength(8)]),

    },this.senhasIguaisValidator)


    Voltar(){
      this.router.navigate(['/']);
    }

    abrirModal(templateRef:TemplateRef<any>){
      const dialogRef=this.dialog.open(templateRef,{
        width:'400px',   
      });
      
      //remover o foco do botão para sumir o alert do console
      (document.activeElement as HTMLElement)?.blur();

      dialogRef.afterClosed().subscribe(()=>{
        this.formNome.reset();
        this.formSenha.reset();
      })
    }
    senhasIguaisValidator(group: AbstractControl): ValidationErrors | null {
    const senha = group.get('senha')?.value;
    const confirma = group.get('confirmeSenha')?.value;

    if (!senha || !confirma) return null; // enquanto digita

    return senha === confirma ? null : { senhasDiferentes: true };
  }
   
    salvarAlteracao(){

      console.log("oia")
      if (this.formNome.valid){
        const nomeDigitado = this.formNome.get('nome')?.value;
        console.log("Nome salvo:",nomeDigitado);

        //espaço para o back
        this.formNome.reset()
      


      }
      else if(this.formSenha.valid){
        console.log(this.formSenha.value);
      }
      else{
        console.log("Formulario Inválido");
        this.formNome.markAllAsTouched();
      }
    }
   
}
