# 🧠 Frontend Quizzerando (Versão Angular)

Este projeto é uma **reimplementação em Angular** do [Frontend Quizzerando](https://github.com/impedrohenri/frontend-quizzerando), originalmente criado com React. A aplicação simula um quiz interativo com foco em usabilidade e design moderno.

---

## 📦 Tecnologias Utilizadas

- [Angular 17+](https://angular.io/)
- [RxJS](https://rxjs.dev/)
- HTML5 + CSS3 (responsivo)
- [TypeScript](https://www.typescriptlang.org/)
- [Angular CLI](https://angular.io/cli)

---

## ✨ Funcionalidades

- Seleção de categorias de perguntas
- Interface dinâmica e responsiva
- Feedback imediato sobre respostas
- Contador de pontuação e progresso
- Timer regressivo para desafios de tempo

---
##Pré-requisitos
-Node.js 18+
-Angular CLI (npm install -g @angular/cli)
-Navegador moderno (Chrome, Edge, Firefox)

##Autores
-Feito por @impedrohenri (versão original em React)
-Adaptado para Angular por @luizfelipefarias,@impedrohenri  e  @8VINO

---

## 🔄 O que mudou da versão React?

| React                              | Angular                                |
|------------------------------------|----------------------------------------|
| React hooks (`useState`, etc.)     | Services + RxJS + Angular Forms        |
| JSX e componentes funcionais       | Angular templates + TypeScript         |
| CSS Modules ou styled-components   | Estilização via CSS e `:host` bindings |
| React Router                       | Angular Router                         |
| State via useContext/useReducer    | Injeção de dependência + RxJS          |

---

## 🚀 Como Executar Localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/SEU_USUARIO/angular-quizzerando.git
cd angular-quizzerando

Instalar dependências
npm install

Rodar o servidor de desenvolvimento
ng serve

src/
├── app/
│   ├── components/      # Componentes visuais
│   ├── services/        # Serviços com lógica de negócio
│   ├── models/          # Interfaces e tipos
│   └── pages/           # Telas da aplicação
├── assets/
├── environments/




