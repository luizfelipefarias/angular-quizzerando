import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators,AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../app/services/authContexts';
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
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      confirmar: ['', [Validators.required]]
    },{
    validators: this.senhasIguaisValidator // <-- Aqui está o ajuste
  });
  }

  senhasIguaisValidator(group: AbstractControl): ValidationErrors | null {
      const senha = group.get('senha')?.value;
      const confirma = group.get('confirmar')?.value;
  
      if (!senha || !confirma) {
        return null; // enquanto digita
      }
      return senha === confirma ? null : { senhasDiferentes: true };
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
      this.form.markAllAsTouched();
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
        if (err.status === 500) {
          this.form.setErrors({ emailRegistrado: true });

        }
        
        
      }
    });
  }
}
