FROM mcr.microsoft.com/dotnet/core/aspnet:3.1.5-alpine AS base
WORKDIR /app
EXPOSE 80

VOLUME ["nistagram-backend/Nistagram/CampaignMicroservice/wwwroot"]

COPY "nistagram-backend/Nistagram/CampaignMicroservice/wwwroot" /publish/wwwroot

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-alpine AS build
WORKDIR /src
COPY ["nistagram-backend/Nistagram/CampaignMicroservice/CampaignMicroservice.csproj", "nistagram-backend/Nistagram/CampaignMicroservice/"]
RUN dotnet restore "nistagram-backend/Nistagram/CampaignMicroservice/CampaignMicroservice.csproj"
COPY . .
RUN dotnet build "nistagram-backend/Nistagram/CampaignMicroservice/CampaignMicroservice.csproj" -c Release -o /app/build

FROM build AS publish
ENV PATH $PATH:/root/.dotnet/tools
RUN dotnet tool install -g dotnet-ef --version 3.1.0 && \
	dotnet publish "nistagram-backend/Nistagram/CampaignMicroservice/CampaignMicroservice.csproj" -c Release -o /app/publish && \
    dotnet-ef dbcontext script -p "nistagram-backend/Nistagram/CampaignMicroservice/CampaignMicroservice.csproj" -o /app/sql-campaign/init-campaign.sql

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
WORKDIR /app/publish
COPY "agent-app-backend/WebShop/WebShop/wwwroot" .
VOLUME /app/sql-campaign
CMD ASPNETCORE_URLS=http://:$PORT dotnet CampaignMicroservice.dll