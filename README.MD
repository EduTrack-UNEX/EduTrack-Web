# 🚀 Guia de Instalação e Configuração Local

Siga os passos abaixo para configurar e executar o **EduTrack-Web** em seu ambiente de desenvolvimento local.

## 🛠️ 1. Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas em sua máquina. As versões listadas são recomendações para garantir a compatibilidade.

* **Node.js**: `v18.x` ou superior projeto está na versão (22.18.0).
* **npm**: `v9.x` ou superior (geralmente vem com o Node.js) recomendado a versão (11.6.2).
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

### ▶️ 3. Executando a Aplicação

Após a instalação e configuração, você está pronto para iniciar o servidor de desenvolvimento.

1. **Instale as depêndencias**

    ```bash
    npm install
    ```

2. **Inicie o servidor:**

    ```bash
    npm run dev
    ```

3. **Acesse no navegador:**
    Abra seu navegador e acesse <http://localhost:5173/> (ou a porta que estiver configurada no seu projeto).

4. **Acessar as rotas:**
    Para acessar as rotas que já estão feitas:
    <http://localhost:5173/>
    <http://localhost:5173/login>
    <http://localhost:5173/cadastro>
    <http://localhost:5173/adicionar-disciplina>
    <http://localhost:5173/adicionar-atividade>
    <http://localhost:5173/listagem-disciplina>

Pronto! O ambiente de desenvolvimento do **EduTrack-Web** está configurado e rodando na sua máquina.
