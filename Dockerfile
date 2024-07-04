# Use a imagem oficial do Node.js como base
FROM node:14

# Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie o arquivo package.json e package-lock.json
COPY package*.json ./

# Instale as dependências da aplicação
RUN npm install

ENV DOCKERIZE_VERSION v0.7.0

RUN apt-get update \
    && apt-get install -y wget \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apt-get autoremove -yqq --purge wget && rm -rf /var/lib/apt/lists/*

# Copie o restante do código da aplicação
COPY . .

# Exponha a porta em que a aplicação será executada
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]

