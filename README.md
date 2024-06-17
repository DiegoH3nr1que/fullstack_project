# Game Database API

## Escopo do projeto - Fullstack

### Tópicos a serem abordados na documentação do escopo de um projeto fullstack de TI usando arquitetura MTV:

1. **Introdução**
   - O presente projeto visa desenvolver uma plataforma fullstack sobre busca e análise de games, onde usuários podem compartilhar e consultar opiniões sobre diversos jogos eletrônicos. A plataforma será projetada para oferecer uma experiência intuitiva e interativa, permitindo que os jogadores se conectem, troquem informações e descubram novos jogos com base em avaliações e recomendações da comunidade.

2. **Objetivo Geral**
   - Desenvolver uma aplicação web completa (frontend e backend) que permita aos usuários criar contas, fazer login, postar reviews de jogos, avaliar reviews de outros usuários e consultar uma base de dados abrangente de jogos e reviews.

3. **Arquitetura do Sistema**
   - O padrão MVC (Model-View-Controller) organiza uma aplicação em três componentes distintos:
     - **Model**: Gerencia os dados e a lógica de negócios.
     - **View**: Exibe os dados e captura as interações do usuário.
     - **Controller**: Processa as entradas do usuário e coordena a interação entre Model e View.
   - Essa separação facilita a manutenção, escalabilidade e testabilidade da aplicação.
   - Uso do padrão Repository para acesso a dados.

4. **Requisitos Funcionais**
   1. **Autenticação e Autorização:**
      - Implementar sistema de registro e login de usuários com autenticação segura.
      - Gerenciar permissões para garantir que apenas usuários autenticados possam postar e editar reviews.
   2. **Gestão de Usuários:**
      - Criar perfis de usuários contendo informações como nome de usuário, avatar e histórico de atividades (reviews postadas, avaliações, etc.).
      - Implementar funcionalidades de edição de perfil e recuperação de senha.
   3. **Postagem e consulta:**
      - Permitir que usuários vejam seus jogos, incluindo título, descrição, nota e tags.
      - Criar um sistema de moderação para garantir a qualidade e a pertinência das reviews postadas.
   4. **Catálogo de Jogos:**
      - Api externa para pegar a imagem dos games e o nome, o resto do CRUD será totalmente feito pelo nosso backend.
   5. **Interatividade e Feedback:**
      - Permitir que usuários avaliem reviews (curtidas ou reações) e comentem sobre elas.
      - Implementar um sistema de recomendações baseado nas interações dos usuários (ex. "Jogos semelhantes", "Reviews mais curtidas").
   6. **Interface do Usuário:**
      - Desenvolver uma interface amigável e responsiva, garantindo acessibilidade em diferentes dispositivos (desktop, tablet, mobile).
      - Aplicar design moderno e intuitivo, focando na usabilidade e na experiência do usuário.

5. **Requisitos Não Funcionais**
   - Versatilidade
   - Designer Tecnológico
   - Segurança
   - Usabilidade

6. **Tecnologias Utilizadas**
   - **Linguagens de programação:**
     - React Next – TypeScript
     - Django REST – Python
   - **Bancos de dados:**
     - SQLite
   - **Ferramentas de desenvolvimento:**
     - Git - Versionamento de Código
     - GitHub - Plataforma de desenvolvimento colaborativo

---

## Funcionalidades Atuais:
- **Buscar Detalhes do Jogo:** Obtenha informações completas sobre um jogo específico, incluindo título, data de lançamento, avaliação, plataformas, desenvolvedores, gêneros, website e muito mais.

## Próximas Implementações:
- **Adicionar Reviews de Usuários:** Crie um sistema para que os usuários possam enviar suas próprias reviews, incluindo a avaliação e um comentário sobre o jogo.
- **Curtir/Não Curtir Reviews:** Permita que os usuários expressem sua opinião sobre as reviews de outros usuários, através de um sistema de curtidas ou reações.
- **Ordenação e Filtragem de Reviews:** Ofereça opções para ordenar e filtrar as reviews por data, avaliação ou outros critérios relevantes.

---

## Como Executar o Projeto:
1. Clone o repositório:
   ```bash
   git clone 
