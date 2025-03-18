# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)
  uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast
  Refresh

## O que foi feito?

Feito ✅:

- Formulário para realizar cadastro de livros;
- Lista paginada (somente no frontend) e com opções de filtragem (somente no frontend);
- Página com detalhes de um livro (a foto está fixa);
- Botão para alugar/devolver um livro;
- Ação de exclusão somente quando o livro não estiver alugado.

O que falta ❌:

- Tela para edição de um livro;
- Feedback para o usuário para requisições POST/PUT/DELETE;
- Tela de login;
- Rotas protegidas somente para usuários logados (utilizando JWT);
- Testes unitários;
- Uso de Docker para deploy do sistema;


