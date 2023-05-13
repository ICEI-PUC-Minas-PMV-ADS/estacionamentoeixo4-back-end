# Passo a passo para estar com setup habilidado para subir as aplicações

### WINDOWS

- alterar o host do docker para 127.0.0.1

  - abrir o bloco de notas como administrador
  - vá até C:\Windows\System32\drivers\etc
  - selecione para visualizar todos os arquivos
  - abra o arquivo hosts
  - altere as seguintes linhas:

  Added by Docker Desktop
  127.0.0.1 host.docker.internal
  127.0.0.1 gateway.docker.internal

  To allow the same kube context to work on the host and the container:
  127.0.0.1 kubernetes.docker.internal

### KAFKA

- subir o docker que está no diretório do kafka

  - estacionamentoeixo4-back-end/kafka/docker-compose.yml
  - depois de subir o docker do kafka abra o website http://localhost:8080/
  - criar dois tópicos na aba topics no botão superior direito "Add a Topic"
  - adicionar as seguintes configurações, uma para o tópico reservar_vaga e outra para o tópico reservar_vaga.reply

  Number of partitions: 1
  Min In Sync Replicas: 1
  Replication Factor: 1
  Time to retain data (in ms): 7 days

  - clicar no botão "Create topic"

### PRODUCER

- subir o docker que está na raiz do projeto

  - estacionamentoeixo4-back-end/docker-compose.yml

- entrar na pasta do producer

  - estacionamentoeixo4-back-end/api_producer

- rodar o comando "npm i" para instalar as dependencias do projeto (somente na primeira vez ou quando fizer pull na branch)

- se ainda não tiver nada no banco criar e rodar as migrations com os seguintes comandos:
  npm run migrate:create (criar a migration)
  npm run migrate:run (roda a migration)

- rode o projeto com o comando "npm run start:dev"

### CONSUMER

- se ainda não tiver nada no banco criar e rodar as migration com os seguintes comando:
  dotnet ef migrations add nome-da-migation (criar a migration)
  dotnet ef database update (roda a migration)

- rode o projeto via visual studio ou rode o seguinte comando no terminal:
  dotnet run
