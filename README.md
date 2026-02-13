**A full-stack URL shortening service with user authentication, analytics tracking, and admin management capabilities. Built with Spring Boot backend and React frontend.
**
Core Functionality
- URL Shortening: Convert long URLs into short, shareable links
- Custom Short URLs: Create personalized short links
- Click Tracking: Real-time analytics for each shortened URL
- URL Redirection: Fast and reliable redirect service

User Management
- User Registration & Login: Secure authentication with JWT tokens
- User Dashboard: Manage all your shortened URLs in one place
- Personal Analytics: View click statistics and graphs for your URLs
- Role-Based Access: User and Admin roles with different permissions

Admin Features
- User Management: View and manage all registered users
- URL Management: Monitor and delete any shortened URLs
- System Overview: Access to all URLs and user statistics

Analytics
- Click Count Tracking: Monitor total clicks per URL
- Time-Based Analytics: View click trends over time
- Visual Graphs: Chart.js powered visualizations
- Click Events: Detailed timestamp tracking for each click

Technology Stack

Backend
- Framework: Spring Boot 3.5.9
- Language: Java 17
- Database: PostgreSQL (Production), H2 (Testing), MySQL(Local)
- Security: Spring Security with JWT authentication
- ORM: Spring Data JPA with Hibernate
- Build Tool: Maven
- Additional Libraries:
  - Lombok for boilerplate reduction
  - JJWT for JWT token handling
  - Spring Boot Actuator for monitoring

Frontend
- Framework: React 19
- Build Tool: Vite
- Routing: React Router DOM v7
- UI Libraries: 
  - Material-UI (MUI)
  - Tailwind CSS
  - Framer Motion for animations
- State Management: TanStack React Query
- HTTP Client: Axios
- Charts: Chart.js with react-chartjs-2
- Forms: React Hook Form
- Notifications: React Hot Toast

API Endpoints used in the Spring Backend

Authentication
- POST /api/auth/public/register - Register new user
- POST /api/auth/public/login - User login
- POST /api/auth/public/register-admin - Register admin user

Redirection
- GET /{shortUrl} - Redirect to original URL

Protected Endpoints (Requires Authentication)

URL Management
- POST /api/urls/shorten - Create shortened URL
- GET /api/urls/myurls - Get user's URLs
- GET /api/urls/analytics/{shortUrl} - Get URL analytics
- GET /api/urls/totalClicks - Get total clicks for user's URLs

Admin Only
- GET /api/admin/users - Get all users
- GET /api/admin/urls - Get all URLs
- DELETE /api/admin/urls/{id} - Delete URL
- DELETE /api/admin/users/{id} - Delete user

Database Schema

User Table
- id (Primary Key)
- username (Unique)
- email (Unique)
- password (Encrypted)
- role (ROLE_USER / ROLE_ADMIN)

UrlMapping Table
- id (Primary Key)
- originalUrl
- shortUrl (Unique)
- clickCount
- createdDate
- user_id (Foreign Key)

ClickEvent Table
- id (Primary Key)
- clickDate
- url_mapping_id (Foreign Key)

Security

- JWT Authentication: Secure token-based authentication
- Password Encryption: BCrypt password hashing
- CORS Configuration: Configured for frontend-backend communication
- Role-Based Authorization: Different access levels for users and admins
- Secure Endpoints: Protected routes require valid JWT tokens



 Deployment

Backend Deployment
- Configure production database in .env.prod
- Build JAR file: mvnw clean package
- Deploy to cloud platform (Render)
- Set environment variables in deployment platform

Frontend Deployment
- Build production bundle: npm run build
- Deploy dist folder to hosting service (Netlify)
