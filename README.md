# Portfólio - Arthur Marques Diniz

Portfólio profissional desenvolvido com HTML, CSS e JavaScript puro.

## Funcionalidades

- Layout responsivo (mobile-first)
- Projetos dinâmicos via GitHub API
- Filtros por linguagem de programação
- Estatísticas do GitHub
- Tema corporativo profissional

## Tecnologias Utilizadas

- HTML5
- CSS3 (Flexbox/Grid)
- JavaScript Vanilla
- GitHub API

## Como Usar

### Estrutura de Arquivos

```
portfolio/
├── index.html      # Página principal
├── style.css       # Estilos
├── script.js       # Lógica e API do GitHub
└── README.md       # Este arquivo
```

### Personalização

1. **Alterar informações pessoais:**
   - Edite o `index.html` para atualizar nome, descrição e links

2. **Adicionar habilidades:**
   - Modifique a seção `#habilidades` no `index.html`

3. **Mudar cores:**
   - Edite as variáveis CSS no `style.css`:
     ```css
     :root {
         --primary: #0066cc;      /* Cor principal */
         --primary-dark: #0052a3; /* Cor principal escura */
         --secondary: #6c757d;    /* Cor secundária */
     }
     ```

### Deploy no GitHub Pages

1. Faça push das alterações para o repositório
2. Acesse as configurações do repositório no GitHub
3. Vá em **Settings** > **Pages**
4. Em **Source**, selecione a branch `main`
5. Clique em **Save**
6. O site estará disponível em: `https://arthurmdiniz.github.io/portfolio/`

## Licença

Este projeto é de uso pessoal.
