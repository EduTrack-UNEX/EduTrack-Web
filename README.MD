# 🚀 Guia de Instalação e Configuração Local

Siga os passos abaixo para configurar e executar o **EduTrack-Web** em seu ambiente de desenvolvimento local.

## 🛠️ 1. Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas em sua máquina. As versões listadas são recomendações para garantir a compatibilidade.

* **Node.js**: `v18.x` ou superior.
* **npm**: `v9.x` ou superior (geralmente vem com o Node.js) ou **Yarn**: `v1.22.x` ou superior.
* **Git**: Para clonar o repositório.

Você pode verificar as versões com os seguintes comandos no seu terminal:

```bash
node -v
npm -v
git --version
```

### 🖥️ 2. Instalação

Com os pré-requisitos atendidos, siga este passo a passo:

1. **Clone o repositório:**
    Abra seu terminal, navegue até o diretório onde deseja salvar o projeto e execute o comando abaixo para baixar o código-fonte.

    ```bash
    git clone https://github.com/EduTrack-UNEX/EduTrack-Web.git
    ```

2. **Acesse o diretório do projeto:**

    ```bash
    cd EduTrack-Web
    ```

3. **Instale as dependências:**
    Este comando irá baixar todas as bibliotecas e pacotes necessários para o projeto funcionar.

    * Usando **npm**:

        ```bash
        npm install
        ```

    * Ou, se preferir usar **Yarn**:

        ```bash
        yarn install
        ```

### 🔑 3. Configuração das Variáveis de Ambiente

As variáveis de ambiente são usadas para armazenar informações sensíveis, como credenciais de banco de dados e chaves de API, fora do código-fonte.

1. **Crie o arquivo de ambiente:**
    Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env`. É neste novo arquivo que você colocará suas configurações locais.

    ```bash
    cp .env.example .env
    ```

2. **Preencha as variáveis:**
    Abra o arquivo `.env` recém-criado em um editor de texto e preencha os valores para cada variável. Por exemplo:

    ```env
    # Exemplo de configuração do banco de dados
    DATABASE_URL="postgresql://user:password@localhost:5432/edutrack_db"

    # Chave secreta para a API
    API_SECRET="sua-chave-secreta-aqui"
    ```

### ▶️ 4. Executando a Aplicação

Após a instalação e configuração, você está pronto para iniciar o servidor de desenvolvimento.

1. **Inicie o servidor:**

    ```bash
    npm run dev
    ```

2. **Acesse no navegador:**
    Abra seu navegador e acesse <http://localhost:3000> (ou a porta que estiver configurada no seu projeto).

Pronto! O ambiente de desenvolvimento do **EduTrack-Web** está configurado e rodando na sua máquina.

## 📜 Scripts do Projeto
