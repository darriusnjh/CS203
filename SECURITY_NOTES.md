# Security Notes

## Database Credentials
⚠️ **SECURITY WARNING**: Database credentials are currently hardcoded in `backend/src/main/resources/application.properties`.

**Current configuration:**
- Database URL: `jdbc:postgresql://tariff-rates.c58aasic6q12.ap-southeast-2.rds.amazonaws.com:5432/postgres`
- Username: `postgres`
- Password: `Dragonsoul2003`

**Recommendations:**
1. Move sensitive credentials to environment variables
2. Use Spring profiles for different environments (dev, staging, prod)
3. Consider using AWS Secrets Manager or similar service
4. Never commit credentials to version control

**Example secure configuration:**
```properties
spring.datasource.url=${DB_URL:jdbc:postgresql://localhost:5432/tariffcalc}
spring.datasource.username=${DB_USERNAME:postgres}
spring.datasource.password=${DB_PASSWORD:}
```

## CORS Configuration
The application currently allows all origins (`@CrossOrigin(origins = "*")`). For production, restrict this to specific domains.

## JWT Configuration
JWT secret should be moved to environment variables for production deployment.
