FROM mcr.microsoft.com/dotnet/core/aspnet:3.1.5-alpine AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-alpine AS build
WORKDIR /src
COPY ["nistagram-backend/Nistagram/NotificationMicroservice/NotificationMicroservice.csproj", "nistagram-backend/Nistagram/NotificationMicroservice/"]
RUN dotnet restore "nistagram-backend/Nistagram/NotificationMicroservice/NotificationMicroservice.csproj"
COPY . .
RUN dotnet build "nistagram-backend/Nistagram/NotificationMicroservice/NotificationMicroservice.csproj" -c Release -o /app/build

FROM build AS publish
ENV PATH $PATH:/root/.dotnet/tools
RUN dotnet tool install -g dotnet-ef --version 3.1.0 && \
	dotnet publish "nistagram-backend/Nistagram/NotificationMicroservice/NotificationMicroservice.csproj" -c Release -o /app/publish && \
    dotnet-ef dbcontext script -p "nistagram-backend/Nistagram/NotificationMicroservice/NotificationMicroservice.csproj" -o /app/sql-notification/init-notification.sql

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
WORKDIR /app/publish
VOLUME /app/sql-notification
CMD ASPNETCORE_URLS=http://:$PORT dotnet NotificationMicroservice.dll