import { Component, TemplateRef, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../app/services/authContexts';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  dadosUsuario: any = null;
  constructor(
    private dialog: MatDialog,
    private serviceTitle: Title,
    private router: Router,
    private authService: AuthService,


  ) {
    this.serviceTitle.setTitle('Meu Perfil');
    this.authService.userInfo$.subscribe((userinfo) => {
      this.dadosUsuario = userinfo;
    })
  }

  dadosAtualizados: any = null;

  ngOnInit() {
    if (this.dadosUsuario) {
      this.formNome.patchValue({ nome: this.dadosUsuario.nome });
      this.formEmail.patchValue({ email: this.dadosUsuario.email });

    }
  }
  carregarDados() {
    this.formNome.patchValue({ nome: this.dadosUsuario.nome });
    this.formEmail.patchValue({ email: this.dadosUsuario.email });
  }
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
  })

  voltar() {
    this.router.navigate(['/']);
  }

  logout() {
    this.authService.logout();
  }

  modalAtual: 'nome' | 'email' | 'senha' | null = null;

  abrirModal(templateRef: TemplateRef<any>, tipo: 'nome' | 'email' | 'senha') {

    this.modalAtual = tipo;

    const dialogRef = this.dialog.open(templateRef, {
      width: '400px'
    });

    //remover o foco do botão para sumir o alert do console
    (document.activeElement as HTMLElement)?.blur();

    dialogRef.afterClosed().subscribe(() => {
  if (this.dadosUsuario) {
    this.formNome.patchValue({ nome: this.dadosUsuario.nome });
    this.formEmail.patchValue({ email: this.dadosUsuario.email });
  }
  this.formSenha.reset();
  this.formEnviado = false;
});

  }

  senhasIguaisValidator(group: AbstractControl): ValidationErrors | null {
    const senha = group.get('senha')?.value;
    const confirma = group.get('confirmeSenha')?.value;

    if (!senha || !confirma) {
      return null; // enquanto digita
    }
    return senha === confirma ? null : { senhasDiferentes: true };
  }

  formEnviado = false;


  salvarAlteracao() {
    this.formEnviado = true;


    if (this.modalAtual === 'nome') {
      if (this.formNome.invalid) {
        this.formNome.markAllAsTouched();
        return;
      }
      this.dadosAtualizados = { nome: this.formNome.value.nome }
     
    }
    else if (this.modalAtual === 'senha') {
      if (this.formSenha.invalid) {
        this.formSenha.markAllAsTouched();
        return;
      }
      this.dadosAtualizados = { senha: this.formSenha.value.senha }
    }
    else if (this.modalAtual === 'email') {
      if (this.formEmail.invalid) {
        this.formEmail.markAllAsTouched();
        return;
      }
      this.dadosAtualizados = { email: this.formEmail.value.email }
    }

    this.authService.updateUser(this.dadosAtualizados).subscribe({
      next: (resposta) => {
        console.log("Usuário atualizado com sucesso: ", resposta);
        if (this.dadosAtualizados.nome) {
          this.dadosUsuario.nome = this.dadosAtualizados.nome
        }
        else if (this.dadosAtualizados.email) {
          this.dadosUsuario.email = this.dadosAtualizados.email
        }


        
        localStorage.setItem('userInfo', JSON.stringify(this.dadosUsuario))
        

        this.dadosAtualizados = null;
        this.dialog.closeAll();
      },
      error: (erro) => {
        if (erro.status === 500 && this.modalAtual === 'email') {
          this.formEmail.setErrors({ emailRegistrado: true });

        } else {
          console.error("Erro ao atualizar:", erro);
        }
      }
    })




  }


}
