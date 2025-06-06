# 🧠 Frontend Quizzerando (Versão Angular)

Este projeto é uma **reimplementação em Angular** do [Frontend Quizzerando](https://github.com/impedrohenri/frontend-quizzerando), originalmente criado com React. A aplicação simula um quiz interativo com foco em usabilidade e design moderno.

---

## 📦 Tecnologias Utilizadas

- [Angular 17+](https://angular.io/)
- [RxJS](https://rxjs.dev/)
- [HTML5](https://developer.mozilla.org/pt-BR/docs/Web/HTML) + [CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS) (responsivo)
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

## 🔧 Pré-requisitos

- Node.js 18+
- Angular CLI (`npm install -g @angular/cli`)
- Navegador moderno (Chrome, Edge, Firefox)

---

## 👥 Autores

- Versão original em React: [@impedrohenri](https://github.com/impedrohenri)
- Adaptado para Angular por:
  - [@luizfelipefarias](https://github.com/luizfelipefarias)
  - [@impedrohenri](https://github.com/impedrohenri)
  - [@8VINO](https://github.com/8VINO)

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

```bash
# Clonar o repositório
git clone https://github.com/SEU_USUARIO/angular-quizzerando.git
cd angular-quizzerando

# Instalar dependências
npm install

# Rodar o servidor de desenvolvimento
ng serve

#Estrutura de Pastas
src/
├── app/
│   ├── components/      # Componentes visuais
│   ├── services/        # Serviços com lógica de negócio
│   ├── models/          # Interfaces e tipos
│   └── pages/           # Telas da aplicação
├── assets/              # Imagens e recursos estáticos
├── environments/        # Configurações de ambiente
