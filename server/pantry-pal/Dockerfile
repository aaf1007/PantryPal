FROM maven:3.9.12-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN ./mvnw -B -DskipTests clean package -Pproduction

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/pantry-pal-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
