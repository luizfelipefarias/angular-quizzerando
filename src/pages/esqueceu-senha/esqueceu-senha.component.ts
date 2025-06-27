import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { LogoSideLayerComponent } from '../../components/logo-side-layer/logo-side-layer.component';


// Importar do ng-bootstrap

const API_URL = 'https://quizzerando-api.onrender.com';

@Component({
  selector: 'app-esqueceu-senha',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgbModalModule, LogoSideLayerComponent],
  templateUrl: './esqueceu-senha.component.html',
  styleUrls: ['./esqueceu-senha.component.css']
})
export class EsqueceuSenhaComponent {
  form: FormGroup;
  validated = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private modalService: NgbModal // injetar serviço
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  goToLogin(){
    this.router.navigate(['/login'])
  }
  onSubmit(modalContent: any) {
    this.validated = true;
    this.errorMessage = '';

    if (this.form.invalid) {
      return;
    }

    const payload = { email: this.form.value.email };

    this.http.post(`${API_URL}/auth/recovery`, payload, { observe: 'response' })
      .subscribe({
        next: (res) => {
          if (res.status === 200) {
            this.openModal(modalContent);
          }
        },
        error: (err) => {
          this.errorMessage = 'Erro ao enviar o email. Tente novamente.';
          console.error(err);
        }
      });
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true, backdrop: 'static' })
      .result.then(() => {
        this.router.navigate(['/login']);
      }, () => {
        this.router.navigate(['/login']);
      });

    setTimeout(() => this.modalService.dismissAll(), 8000);
  }

  get email() {
    return this.form.get('email');
  }
}
