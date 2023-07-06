# README

Este é um projeto que utiliza o Docker Compose e Node para criar um ambiente de desenvolvimento. Siga as etapas abaixo para configurar e executar o projeto localmente.

## Pré-requisitos

- Docker: [Instalação do Docker](https://docs.docker.com/get-docker/)

- Node Versão 18.16.1 ou superior [Instalação do Node](https://nodejs.org/en)

## Configuração e execução

1. Clone o repositório para o seu ambiente local:

```

git clone <URL_DO_REPOSITORIO>

```

2. Navegue até o diretório do projeto:

```

cd <DIRETORIO_DO_PROJETO>

```

3. Inicie os contêineres Docker usando o Docker Compose:

```

docker-compose up -d

```

4. Aguarde até que os contêineres sejam iniciados e executados.

5. Abra o navegador e acesse a URL [http://0.0.0.0:16686/](http://0.0.0.0:16686/) para acessar o Jaeger, uma ferramenta de rastreamento e observabilidade.

6. Instale as dependências locais do Node.js executando o seguinte comando:

```
yarn install
```

7. Iniciar o servidor com o Storybook

```
yarn storybook
```

8. Iniciar o servidor local

```
yarn dev
```

## Encerrando a execução

Para encerrar a execução do projeto, você pode executar o seguinte comando na raiz do projeto:

```

docker-compose down

```

Isso encerrará os contêineres Docker e liberará os recursos utilizados.

## Observações

Certifique-se de ter o Docker instalado corretamente no seu ambiente antes de executar o projeto.

Certifique-se de que as portas especificadas no arquivo `docker-compose.yml` não estejam sendo utilizadas por outros processos em seu sistema.
