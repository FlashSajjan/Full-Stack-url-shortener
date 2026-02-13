# Use lightweight Java runtime image
FROM eclipse-temurin:17-jre

# Set working directory
WORKDIR /app

# Copy the already-built jar from local target folder
COPY target/url-shortener-sb-0.0.1-SNAPSHOT.jar app.jar

# Expose Spring Boot port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]