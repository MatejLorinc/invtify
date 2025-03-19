# syntax = docker/dockerfile:1.2

FROM ubuntu:latest AS build

RUN apt-get update
RUN apt-get install openjdk-17-jdk -y
COPY . .

RUN chmod +x ./gradlew

RUN --mount=type=secret,id=env_properties,dst=./env.properties ./gradlew bootJar --no-daemon

FROM openjdk:17-jdk-slim

EXPOSE 443

COPY --from=build /build/libs/invtify-0.0.1-SNAPSHOT.jar app.jar

COPY --from=build ./env.properties ./env.properties

ENTRYPOINT ["java", "-jar", "app.jar"]