# Backend for - 10Fix

## Live Demo

- Backend API: [https://10fix.vercel.app/]([https://taasu-soap-backend.vercel.app/](https://10fix.vercel.app/)

<!-- Navigation Tags -->

- [🔗 Live Demo](#live-demo)
- [✨ Features](#features)
- [🛠 Tech Stack](#tech-stack)
- [📁 Project Structure](#project-structure)
- [📡 API Endpoints](#api-endpoints)
- [📦 Installation](#installation)
- [⚙️ Environment Variables](#environment-variables)
- [📝 License](#license)

## Features

- RESTful API with Express.js
- MongoDB database with Mongoose ODM
- Authentication with JWT
- Data validation with Zod
- File upload with Multer and Cloudinary
- Payment integration with Stripe
- TypeScript for type safety

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js (TypeScript)
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT
- **Validation**: Zod
- **File Storage**: Cloudinary
- **Payments**: Stripe
- **Linting**: ESLint + Prettier

## Project Structure

---

### Frontend

```
src/
├── modules/ # Feature modules
│ ├── auth/ # Authentication
│ ├── user/ # User management
│ ├── blog/ # Blog posts
│ ├── project/ # Projects
├── app/ # Application core
│ ├── middleware/ # Express middleware
│ ├── utils/ # Utility functions
│ └── config/ # Configuration
├── types/ # TypeScript type definitions
└── server.ts # Server entry point
```

## API Endpoints

## Installation

```bash
cd dev-arifulislam/server
npm install
# Create .env file with required variables
npm run start:dev
```

## Environment Variables

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=30d
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
STRIPE_SECRET_KEY=your_stripe_key
```

## 📝 License

This project is licensed under the MIT License.  
See the [LICENSE](./LICENSE) file for details.
