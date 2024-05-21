# Escopo do projeto - Fullstack

Tópicos a serem abordados na documentação do escopo de um projeto fullstack de TI usando arquitetura MVC/MTV com repository:

1. **Introdução**
    - O presente projeto visa desenvolver uma plataforma fullstack de review de games, onde usuários podem compartilhar e consultar opiniões sobre diversos jogos eletrônicos. A plataforma será projetada para oferecer uma experiência intuitiva e interativa, permitindo que os jogadores se conectem, troquem informações e descubram novos jogos com base em avaliações e recomendações da comunidade.
2. **Objetivo Geral**
     - Desenvolver uma aplicação web completa (frontend e backend) que permita aos usuários criar contas, fazer login, postar reviews de jogos, avaliar reviews de outros usuários e consultar uma base de dados abrangente de jogos e reviews.
4. **Arquitetura do Sistema**
    - O padrão MVC (Model-View-Controller) organiza uma aplicação em três componentes distintos: Model, que gerencia os dados e a lógica de negócios; View, que exibe os dados e captura as interações do usuário; e Controller, que processa as entradas do usuário e coordena a interação entre Model e View. Essa separação facilita a manutenção, escalabilidade e testabilidade da aplicação.
    - Uso do padrão Repository para acesso a dados
5. **Requisitos Funcionais**
    1. Autenticação e Autorização:
        - Implementar sistema de registro e login de usuários com autenticação segura.
        - Gerenciar permissões para garantir que apenas usuários autenticados possam postar e editar reviews.
    2. Gestão de Usuários:
        - Criar perfis de usuários contendo informações como nome de usuário, avatar e histórico de atividades (reviews postadas, avaliações, etc.).
        - Implementar funcionalidades de edição de perfil e recuperação de senha.
    3. Postagem e consulta de Reviews:
        - Permitir que usuários postem reviews de jogos, incluindo título, descrição, nota e tags.
        - Criar um sistema de moderação para garantir a qualidade e a pertinência das reviews postadas.
    4. Catálogo de Jogos:
        - Api externa para pegar a imagem dos games e o nome, o resto do CRUD será totalmente feito pelo nosso backend.
    5. Interatividade e Feedback:
        - Permitir que usuários avaliem reviews (curtidas ou reações) e comentem sobre elas.
        - Implementar um sistema de recomendações baseado nas interações dos usuários (ex. "Jogos semelhantes", "Reviews mais curtidas").
    6. Interface do Usuário:
        - Desenvolver uma interface amigável e responsiva, garantindo acessibilidade em diferentes dispositivos (desktop, tablet, mobile).
        - Aplicar design moderno e intuitivo, focando na usabilidade e na experiência do usuário.

7. **Requisitos Não Funcionais**
    - Versatilidade
    - Designer Tecnológico
    - Segurança
    - Usabilidade
8. **Tecnologias Utilizadas**
    - Linguagens de programação:
        •	React Next – TypeScript
        •	Django REST – Python
    - Bancos de dados:
        •	PostgreSQL
    - Ferramentas de desenvolvimento:
        •	Git - Versionamento de Código
        •	GitHub - Plataforma de desenvolvimento colaborativo
        •	Docker - plataforma de código aberto para facilitar criação/implementação/execução de projetos em contêiner.
      
- O escopo do projeto propõe o desenvolvimento de uma plataforma fullstack para análises de jogos. Utilizando a arquitetura MVC/MTV com padrão Repository, o projeto busca garantir organização e escalabilidade. Requisitos funcionais incluem autenticação de usuários, gestão de perfis, postagem e consulta de análises, interatividade e feedback. Requisitos não funcionais destacam versatilidade, design tecnológico, segurança e usabilidade. Tecnologias como React Next, Django REST e PostgreSQL são selecionadas. O projeto visa oferecer uma plataforma dinâmica e envolvente para a comunidade de jogadores.
