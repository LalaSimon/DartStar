# DartStar

A comprehensive dart game management system with API and client applications.

## Project Structure

This is a monorepo containing:

```
DartStar/
├── api/           # Backend API (NestJS + Prisma + PostgreSQL)
├── client/        # Frontend application (to be implemented)
├── .gitignore     # Git ignore rules
└── README.md      # This file
```

## API

The backend API is built with:

- **NestJS** - Progressive Node.js framework
- **Prisma** - Modern database toolkit
- **PostgreSQL** - Database
- **Swagger** - API documentation

### Getting Started with API

```bash
cd api
npm install
npm run start:dev
```

The API will be available at `http://localhost:3000`
API documentation at `http://localhost:3000/api/docs`

## Client

The frontend application will be implemented here.

## Development

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies for API:
   ```bash
   cd api
   npm install
   ```
3. Set up environment variables in `api/.env`
4. Run database migrations:
   ```bash
   cd api
   npx prisma migrate dev
   ```
5. Start the development server:
   ```bash
   npm run start:dev
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit your changes
5. Push to the branch
6. Create a Pull Request

## License

This project is licensed under the MIT License.
