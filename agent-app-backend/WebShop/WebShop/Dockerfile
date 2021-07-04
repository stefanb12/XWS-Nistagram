FROM mcr.microsoft.com/dotnet/core/aspnet:3.1.5-alpine AS base
WORKDIR /app
EXPOSE 80

VOLUME ["agent-app-backend/WebShop/WebShop/wwwroot"]

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-alpine AS build
WORKDIR /src
COPY ["agent-app-backend/WebShop/WebShop/WebShop.csproj", "agent-app-backend/WebShop/WebShop/"]
RUN dotnet restore "agent-app-backend/WebShop/WebShop/WebShop.csproj"
COPY . .
RUN dotnet build "agent-app-backend/WebShop/WebShop/WebShop.csproj" -c Release -o /app/build

FROM build AS publish
ENV PATH $PATH:/root/.dotnet/tools
RUN dotnet tool install -g dotnet-ef --version 3.1.0 && \
	dotnet publish "agent-app-backend/WebShop/WebShop/WebShop.csproj" -c Release -o /app/publish && \
    dotnet-ef dbcontext script -p "agent-app-backend/WebShop/WebShop/WebShop.csproj" -o /app/sql-web-shop/init-web-shop.sql

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
WORKDIR /app/publish
VOLUME /app/sql-web-shop
CMD ASPNETCORE_URLS=http://:$PORT dotnet WebShop.dll