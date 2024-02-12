FROM openjdk:17-jdk-slim-buster
WORKDIR /app
COPY build/libs/entity-0.0.1-SNAPSHOT.jar app.jar
COPY ./src/main/resources/application-DB.yml .
COPY ./src/main/resources/application.yml .
EXPOSE 5000
ENTRYPOINT ["java", "-jar", "app.jar"]
