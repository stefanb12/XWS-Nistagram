FROM mcr.microsoft.com/dotnet/core/aspnet:3.1.5-alpine AS base
WORKDIR /app
EXPOSE 80

VOLUME ["nistagram-backend/Nistagram/PostMicroservice/wwwroot"]

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-alpine AS build
WORKDIR /src
COPY ["nistagram-backend/Nistagram/PostMicroservice/PostMicroservice.csproj", "nistagram-backend/Nistagram/PostMicroservice/"]
RUN dotnet restore "nistagram-backend/Nistagram/PostMicroservice/PostMicroservice.csproj"
COPY . .
RUN dotnet build "nistagram-backend/Nistagram/PostMicroservice/PostMicroservice.csproj" -c Release -o /app/build

FROM build AS publish
ENV PATH $PATH:/root/.dotnet/tools
RUN dotnet tool install -g dotnet-ef --version 3.1.0 && \
	dotnet publish "nistagram-backend/Nistagram/PostMicroservice/PostMicroservice.csproj" -c Release -o /app/publish && \
    dotnet-ef dbcontext script -p "nistagram-backend/Nistagram/PostMicroservice/PostMicroservice.csproj" -o /app/sql-post/init-post.sql

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
WORKDIR /app/publish
COPY "nistagram-backend/Nistagram/CampaignMicroservice/wwwroot" .
COPY "agent-app-backend/WebShop/WebShop/wwwroot" .
VOLUME /app/sql-post
CMD ASPNETCORE_URLS=http://:$PORT dotnet PostMicroservice.dll