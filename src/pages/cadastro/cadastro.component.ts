import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../contexts/authContexts';
import { LogoSideLayerComponent } from '../../components/logo-side-layer/logo-side-layer.component';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LogoSideLayerComponent],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  form: FormGroup;
  passwordMatchError = '';
  validated = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      confirmar: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
voltarParaLogin() {
  this.router.navigate(['/login']);
}
  onInputChange() {
    this.passwordMatchError = '';
  }

  onSubmit() {
    this.validated = true;
    this.passwordMatchError = '';

    if (this.form.invalid) {
      return;
    }

    if (this.form.value.senha !== this.form.value.confirmar) {
      this.passwordMatchError = 'As senhas não coincidem!';
      return;
    }

    const payload = {
      nome: this.form.value.nome,
      email: this.form.value.email,
      senha: this.form.value.senha
    };

    this.auth.register(payload).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(`Erro: ${err.status}`);
        console.error(err);
      }
    });
  }
}
