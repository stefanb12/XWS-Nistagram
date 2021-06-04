FROM mcr.microsoft.com/dotnet/core/aspnet:3.1.5-alpine AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-alpine AS build
WORKDIR /src
COPY ["nistagram-backend/Nistagram/UserMicroservice/UserMicroservice.csproj", "nistagram-backend/Nistagram/UserMicroservice/"]
RUN dotnet restore "nistagram-backend/Nistagram/UserMicroservice/UserMicroservice.csproj"
COPY . .
RUN dotnet build "nistagram-backend/Nistagram/UserMicroservice/UserMicroservice.csproj" -c Release -o /app/build

FROM build AS publish
ENV PATH $PATH:/root/.dotnet/tools
RUN dotnet tool install -g dotnet-ef --version 3.1.0 && \
	dotnet publish "nistagram-backend/Nistagram/UserMicroservice/UserMicroservice.csproj" -c Release -o /app/publish && \
    dotnet-ef dbcontext script -p "nistagram-backend/Nistagram/UserMicroservice/UserMicroservice.csproj" -o /app/sql-user/init-user.sql

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
WORKDIR /app/publish
VOLUME /app/sql-user
CMD ASPNETCORE_URLS=http://:$PORT dotnet UserMicroservice.dll