import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { CadastroComponent } from '../pages/cadastro/cadastro.component';
import { HistoricoComponent } from '../pages/historico/historico.component';
import { LoginComponent } from '../pages/login/login.component';
import { EsqueceuSenhaComponent } from '../pages/esqueceu-senha/esqueceu-senha.component';
import { PerfilComponent } from '../pages/perfil/perfil.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { QuizPagesComponent } from '../pages/quiz-pages/quiz-pages.component';
import { CriarQuizComponent } from '../pages/criar-quiz/criar-quiz.component';
import { EditarQuizComponent } from '../pages/editar-quiz/editar-quiz.component';
import { ResultadoQuizComponent } from '../components/resultado-quiz/resultado-quiz.component';
import { AuthGuard } from '../auth/privateRoutes'; 

export const routes: Routes = [
    { path: 'cadastro', component: CadastroComponent },
    { path: 'login', component: LoginComponent },
    { path: 'esqueceu-senha', component: EsqueceuSenhaComponent },

    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'historico', component: HistoricoComponent, canActivate: [AuthGuard] },
    { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
    { path: 'quiz/criar', component: CriarQuizComponent, canActivate: [AuthGuard] },
    { path: 'quiz/:id/editar', component: EditarQuizComponent, canActivate: [AuthGuard] },
    { path: 'quiz/:id', component: QuizPagesComponent, canActivate: [AuthGuard] },
    { path: 'resultado', component: ResultadoQuizComponent, canActivate: [AuthGuard] },

    { path: '**', component: NotFoundComponent }
];

export const API_URL = 'https://quizzerando-api.onrender.com';