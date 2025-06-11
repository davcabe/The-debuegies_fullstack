FROM node:20-alpine

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración primero
COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY tailwind.config.ts ./
COPY postcss.config.js ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Construir la aplicación
RUN npm run build

EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]