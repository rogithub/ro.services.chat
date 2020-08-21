
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /app

# copy csproj and restore as distinct layers
COPY Ro.Services.Chat.sln .
COPY Ro.Services.Chat/*.csproj ./Ro.Services.Chat/
RUN dotnet restore

# copy everything else and build app
COPY . ./
WORKDIR /app/Ro.Services.Chat
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS runtime

WORKDIR /app

# Change timezone to local time
ENV TZ=America/Mexico_City
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY --from=build /app/Ro.Services.Chat/out ./
ENTRYPOINT ["dotnet", "Ro.Services.Chat.dll"]