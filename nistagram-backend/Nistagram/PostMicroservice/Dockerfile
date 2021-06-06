FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80

VOLUME ["nistagram-backend/Nistagram/PostMicroservice/Images"]

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["nistagram-backend/Nistagram/PostMicroservice/PostMicroservice.csproj", "nistagram-backend/Nistagram/PostMicroservice/"]
RUN dotnet restore "nistagram-backend/Nistagram/PostMicroservice/PostMicroservice.csproj"
COPY . .
WORKDIR "/src/nistagram-backend/Nistagram/PostMicroservice"
RUN dotnet build "PostMicroservice.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PostMicroservice.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
CMD ASPNETCORE_URLS=http://*:$PORT dotnet PostMicroservice.dll