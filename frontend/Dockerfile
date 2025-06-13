FROM node:23-slim

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar archivos de mi proyecto
COPY . .

# Define el build arg ANTES de instalar dependencias y construir
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Instalar dependencias
RUN npm install

# Asegúrate de que npm run build vea la variable
RUN npm run build

EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]