import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../app/services/authContexts';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { LogoSideLayerComponent } from '../../components/logo-side-layer/logo-side-layer.component';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LogoSideLayerComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // aqui corrigido
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  loginInvalido: string = '';
  validated=false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private titleService: Title
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
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
  goToEsqueceu(){
    this.router.navigate(['/esqueceu-senha'])
  }

  async onSubmit() {
  this.validated=true
  this.loginInvalido = '';

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return
  }
  const data = this.form.value;

  try {
    const logado = await firstValueFrom(this.auth.login(data));
    this.router.navigate(['/']);
  } catch (error: any) {
    if (error.status === 401) {
      this.loginInvalido = 'Email ou senha incorretos.';
    } else {
      this.loginInvalido = 'Erro ao tentar fazer login.';
    }
    console.error('Erro no login:', error);
  }
}

onInputChange() {
  this.loginInvalido = '';
}}
