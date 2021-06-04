FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["nistagram-backend/Nistagram/GatewayWebApi/GatewayWebApi.csproj", "nistagram-backend/Nistagram/GatewayWebApi/"]
RUN dotnet restore "nistagram-backend/Nistagram/GatewayWebApi/GatewayWebApi.csproj"
COPY . .
WORKDIR "/src/nistagram-backend/Nistagram/GatewayWebApi"
RUN dotnet build "GatewayWebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "GatewayWebApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
CMD ASPNETCORE_URLS=http://*:$PORT dotnet GatewayWebApi.dll