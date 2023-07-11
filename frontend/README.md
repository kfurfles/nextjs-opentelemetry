# Proposta 

A proposta desse pequeno projeto é explorar a criativade de como pode ser feito a o logging completo da aplicação e diversos eventos que podem ocorrer ao longo do processo.
alguns requisitos:
* ser um projeto em next.js
* utilizar typescript
* utilizar react
* login com google
* enviar para um banco de dados mongo os eventos capturados  

# Solução
A ideia do projeto em sí é muito simples, porém é possivel avaliar alguns possiveis problemas ao adotar uma solução mais simples como um simples evento enviado para um banco de dados.
E para a solução deste desafio foi implementado os requisitos descritos, porém, fugindo um pouco da abortagem mais simplista, e para solucionar este problema foi utilizado um conjunto de ferramentas do [OpenTelemetry](https://opentelemetry.io/).
O uso do OpenTelemetry em um projeto Next.js é bom para logging/tracing porque oferece:

* Observabilidade abrangente.
* Instrumentação automática.
* Consistência entre serviços.
* Suporte a diferentes destinos.
* Compatibilidade com padrões abertos.

Em resumo, o OpenTelemetry facilita a coleta de informações detalhadas sobre o comportamento da sua aplicação, simplifica a instrumentação do código, permite a correlação entre serviços, oferece opções de envio de logs e é compatível com outras ferramentas de observabilidade como dynatrace, datadog e etcx. Isso ajuda na solução de problemas e melhoria contínua.
Outro Ponto forte da escolhas feitas, é que essa solução ela é escalavel, e não é necessário qualquer alteração no codigo com regras de negócio, apenas a importação do modulo de tracking previamente, utilizar as variaveis de ambiente corretas e pronto, nova aplicação 100% instrumentada automaticamente.

Através [deste link](https://github.com/kfurfles/nextjs-opentelemetry/raw/e2ebb95fe1399b76905f8fb7a6f301b2334601b4/show-case.mp4), você pode ver a aplicação funcionado através de um video, ou pode seguir os passos abaixo para executar o projeto localmente.

### Observação
Neste projeto ja contém todas as credenciais (.env) necessárias para subir o projeto, e foi uma escolha proposital afim de facilitar a avaliação do mesmo 

# README

Este é um projeto que utiliza o Docker Compose e Node para criar um ambiente de desenvolvimento. Siga as etapas abaixo para configurar e executar o projeto localmente.

## Pré-requisitos

- Docker: [Instalação do Docker](https://docs.docker.com/get-docker/)

- Node Versão 18.16.1 ou superior [Instalação do Node](https://nodejs.org/en)

## Configuração e execução

1. Clone o repositório para o seu ambiente local:

```

git clone https://github.com/kfurfles/nextjs-opentelemetry

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
