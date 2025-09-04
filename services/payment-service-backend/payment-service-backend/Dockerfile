# ===== build =====
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /workspace
COPY pom.xml ./
RUN mvn -q -B -DskipTests dependency:go-offline
COPY src ./src
RUN mvn -q -B -DskipTests package

# ===== run =====
FROM eclipse-temurin:21-jre
WORKDIR /app
# Your artifactId is `payment-service` and version is `0.1.0`
COPY --from=build /workspace/target/payment-service-*.jar /app/app.jar
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75"
EXPOSE 8080
ENTRYPOINT ["sh","-c","java $JAVA_OPTS -jar /app/app.jar"]
