# Etapa Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copiar y restaurar dependencias
COPY *.csproj ./
RUN dotnet restore

# Copiar el resto del código y publicar
COPY . ./
RUN dotnet publish -c Release -o out

# Construir imagen final
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/out ./

EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "Backend.dll"]