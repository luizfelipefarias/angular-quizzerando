import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../contexts/authContexts';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // aqui corrigido
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  loginInvalido: string = '';
  validated: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private titleService: Title
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });

    this.titleService.setTitle('Quizzerando - Entre ou cadastre-se');
  }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  goToCadastro() {
    this.router.navigate(['/cadastro']);
  }

  async onSubmit() {
    this.loginInvalido = '';
    this.validated = false;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.validated = true;
      return;
    }

    const data = this.form.value;

    try {
      const logado = await firstValueFrom(this.auth.login(data));
      this.router.navigate(['/']);
    } catch (error: any) {
      if (error.status === 401) {
        this.loginInvalido = 'Email ou senha incorreto.';
      } else {
        this.loginInvalido = 'Erro ao tentar fazer login.';
      }
      console.error('Erro no login:', error);
    }
  }

  onInputChange() {
    this.loginInvalido = '';
  }
}
