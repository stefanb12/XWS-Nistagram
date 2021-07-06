FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80

VOLUME ["nistagram-backend/Nistagram/StoryMicroservice/wwwroot"]

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["nistagram-backend/Nistagram/StoryMicroservice/StoryMicroservice.csproj", "nistagram-backend/Nistagram/StoryMicroservice/"]
RUN dotnet restore "nistagram-backend/Nistagram/StoryMicroservice/StoryMicroservice.csproj"
COPY . .
WORKDIR "/src/nistagram-backend/Nistagram/StoryMicroservice"
RUN dotnet build "StoryMicroservice.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "StoryMicroservice.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY "nistagram-backend/Nistagram/CampaignMicroservice/wwwroot" .
COPY "agent-app-backend/WebShop/WebShop/wwwroot" .
CMD ASPNETCORE_URLS=http://*:$PORT dotnet StoryMicroservice.dll