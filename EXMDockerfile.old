
#
# Build stage
#
FROM maven:3.8.3-openjdk-17 AS build
COPY . .
RUN mvn clean package -Pprod -DskipTests

#
# Package stage
#
FROM openjdk:17-alpine
COPY --from=build /target/expense-manager-0.0.1-SNAPSHOT.jar expense-manager.jar
# ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["java", "-Dspring-boot.run.profiles=prod", "-jar", "expense-manager.jar"]
