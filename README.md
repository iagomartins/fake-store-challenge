# 🛍️ Fake Store! - E-commerce Platform

A modern, responsive e-commerce platform built with Next.js 15, React 19, and TypeScript. Features a professional design with smooth animations, shopping cart functionality, and a complete product catalog.

![Fake Store Preview](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## 📺 Live Demo

**Production URL:** [https://fake-store-three-ashy.vercel.app/](https://fake-store-three-ashy.vercel.app/)

## �� Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [Project Structure](#-project-structure)
- [Installation Guide](#-installation-guide)
- [Environment Setup](#-environment-setup)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [API Integration](#-api-integration)
- [State Management](#-state-management)
- [Styling & UI](#-styling--ui)
- [Performance Optimizations](#-performance-optimizations)

## ✨ Features

### 🛒 E-commerce Functionality

- **Product Catalog**: Browse products with category filtering
- **Shopping Cart**: Add/remove items with real-time updates
- **Product Details**: Detailed product pages with image galleries
- **User Authentication**: Login system with user management
- **Responsive Design**: Mobile-first approach with modern UI

### 🎨 Modern UI/UX

- **Professional Design**: Clean, modern e-commerce interface
- **Smooth Animations**: Hover effects and transitions
- **Loading States**: User feedback during data fetching
- **Toast Notifications**: Real-time user feedback
- **Dark/Light Mode**: CSS custom properties for theming

### ⚡ Performance

- **Server-Side Rendering**: Next.js App Router for optimal performance
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic bundle optimization
- **Caching**: React Query for intelligent data caching

## 🛠 Tech Stack

### Frontend

- **Next.js 15.3.3** - React framework with App Router
- **React 19.0.0** - Latest React with concurrent features
- **TypeScript 5.8.3** - Type-safe JavaScript
- **Tailwind CSS 4.0** - Utility-first CSS framework

### State Management

- **React Context API** - Global state management
- **TanStack Query** - Server state management and caching
- **React Hooks** - Local component state

### UI Components

- **Headless UI** - Unstyled, accessible UI components
- **Heroicons** - Beautiful hand-crafted SVG icons
- **Font Awesome** - Icon library
- **React Toastify** - Toast notifications

### Development Tools

- **ESLint** - Code linting and formatting
- **Jest** - Testing framework
- **Testing Library** - Component testing utilities
- **TypeScript** - Static type checking

## 📜 Architecture Overview

### Clean Architecture Principles

The project follows Clean Architecture principles with clear separation of concerns:

```markdown:README.md
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Pages     │  │ Components  │  │      Contexts       │  │
│  │             │  │             │  │                     │  │
│  │ • Login     │  │ • Header    │  │ • Cart Context      │  │
│  │ • Gallery   │  │ • Footer    │  │ • Query Provider    │  │
│  │ • Product   │  │ • Product   │  │ • Toast Context     │  │
│  │             │  │   Card      │  │                     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                    Business Logic Layer                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Hooks     │  │   Utils     │  │      Services       │  │
│  │             │  │             │  │                     │  │
│  │ • useCart   │  │ • Helpers   │  │ • API Services      │  │
│  │ • useQuery  │  │ • Constants │  │ • Data Fetching     │  │
│  │             │  │             │  │                     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Types     │  │   API       │  │      External       │  │
│  │             │  │             │  │      Services       │  │
│  │ • Product   │  │ • Axios     │  │ • Fake Store API    │  │
│  │ • Category  │  │ • Endpoints │  │ • External APIs     │  │
│  │ • CartItem  │  │             │  │                     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

1. **App Router**: Using Next.js 15 App Router for better performance and developer experience
2. **Component Composition**: Reusable components with clear interfaces
3. **Context Pattern**: Global state management without external libraries
4. **Type Safety**: Full TypeScript implementation for better maintainability
5. **Separation of Concerns**: Clear boundaries between UI, business logic, and data layers

## 📁 Project Structure

```
fake-store-challenge/
├── public/                     # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   └── vercel.svg
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Global styles and CSS variables
│   │   ├── layout.tsx          # Root layout component
│   │   ├── page.tsx            # Home/Login page
│   │   ├── gallery/            # Product catalog page
│   │   │   └── page.tsx
│   │   └── product/            # Product detail pages
│   │       └── [id]/
│   │           └── page.tsx
│   ├── components/             # Reusable UI components
│   │   ├── CartView.tsx        # Shopping cart modal
│   │   ├── Footer.tsx          # Site footer
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Loading.tsx         # Loading component
│   │   └── ProductCard.tsx     # Product display card
│   ├── context/                # React Context providers
│   │   ├── Cart.tsx            # Shopping cart state
│   │   ├── TanstackProvider.tsx # React Query provider
│   │   └── Toast.tsx           # Toast notifications
│   ├── types/                  # TypeScript type definitions
│   │   ├── CartItem.ts         # Cart item interface
│   │   ├── Category.ts         # Product category interface
│   │   ├── Customer.ts         # User interface
│   │   └── Product.ts          # Product interface
│   └── __test__/               # Test files
│       └── app.test.tsx
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── eslint.config.mjs           # ESLint configuration
├── jest.config.ts              # Jest testing configuration
├── jest.setup.ts               # Jest setup file
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies and scripts
├── postcss.config.mjs          # PostCSS configuration
├── README.md                   # Project documentation
└── tsconfig.json               # TypeScript configuration
```

## 🚀 Installation Guide

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v22.15.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v10.0.0 or higher) - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/your-username/fake-store-challenge.git

# Navigate to the project directory
cd fake-store-challenge
```

### Step 2: Install Dependencies

```bash
# Install all dependencies
npm install

# Alternative with yarn
yarn install

# Alternative with pnpm
pnpm install
```

### Step 3: Environment Setup

Create a `.env.local` and `.env.development` (for dev run) file in the root directory:

```bash
# Copy the example environment file
cp .env.example .env.local
```

Add the following environment variables to `.env.local`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.escuelajs.co

# Optional: Add other environment variables as needed
NEXT_PUBLIC_APP_NAME=Fake Store
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### Step 4: Verify Installation

```bash
# Check if everything is installed correctly
npm run build

# If successful, start the development server
npm run dev
```

## 🔧 Environment Setup

### Required Environment Variables

| Variable              | Description          | Example Value              |
| --------------------- | -------------------- | -------------------------- |
| `NEXT_PUBLIC_API_URL` | Base URL for the API | `https://api.escuelajs.co` |

## 🛠 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Run tests
npm run test
```

### Development Server

```bash
# Start the development server
npm run dev

# The application will be available at:
# http://localhost:3000
```

### Code Quality

The project includes several tools to maintain code quality:

- **ESLint**: Configured with Next.js rules
- **TypeScript**: Strict type checking enabled
- **Prettier**: Code formatting (if configured)

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Run tests with coverage
npm run test -- --coverage
```

### Test Structure

- **Unit Tests**: Component and utility function tests
- **Integration Tests**: API integration and user flow tests
- **E2E Tests**: End-to-end user journey tests (if configured)

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**:

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy to Vercel
   vercel
   ```

2. **Environment Variables**: Set up environment variables in Vercel dashboard

3. **Automatic Deployments**: Connected to Git repository for automatic deployments

### Other Platforms

#### Netlify

```bash
# Build the project
npm run build

# Deploy to Netlify
# Upload the 'out' folder to Netlify
```

#### Docker

```dockerfile
# Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔌 API Integration

### Fake Store API

The application integrates with the [Fake Store API](https://api.escuelajs.co/) for product data:

#### Endpoints Used

| Endpoint                | Method | Description                    |
| ----------------------- | ------ | ------------------------------ |
| `/api/v1/products`      | GET    | Fetch all products             |
| `/api/v1/products/{id}` | GET    | Fetch single product           |
| `/api/v1/categories`    | GET    | Fetch all categories           |
| `/api/v1/users`         | GET    | Fetch users for authentication |

#### API Integration Pattern

```typescript
// Example API call
const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`
  );
  return response.data;
};
```

## 🗃 State Management

### Context API Pattern

The application uses React Context API for state management:

#### Cart Context

```typescript
interface CartContextType {
  cart: CartItem[];
  subtotal: number;
  addToCart: (item: Product) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
}
```

#### TanStack Query

For server state management and caching:

```typescript
const { data: products, isLoading } = useQuery({
  queryKey: ["products"],
  queryFn: fetchProducts,
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

## 🎨 Styling & UI

### Design System

- **Color Palette**: Professional red-based e-commerce theme
- **Typography**: Geist Sans font family
- **Spacing**: Consistent spacing scale using Tailwind CSS
- **Components**: Reusable, accessible components

### CSS Architecture

```css
/* CSS Custom Properties */
:root {
  --primary: #dc2626;
  --primary-hover: #b91c1c;
  --background: #ffffff;
  --foreground: #1f2937;
  /* ... more variables */
}
```

### Responsive Design

- **Mobile First**: Designed for mobile devices first
- **Breakpoints**:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px

## ⚡ Performance Optimizations

### Next.js Optimizations

- **App Router**: Latest Next.js routing system
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic bundle splitting
- **Static Generation**: Pre-rendered pages where possible

### React Optimizations

- **React 19**: Latest React with concurrent features
- **Memoization**: React.memo for expensive components
- **Lazy Loading**: Dynamic imports for code splitting

### Bundle Analysis

```bash
# Analyze bundle size
npm run build
npm run analyze
```

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Run tests**: `npm run test`
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Code Style

- Follow the existing code style
- Use TypeScript for all new code
- Write tests for new features
- Update documentation as needed

### Test Credentials

For testing the application, use these credentials:

- **Email**: `john@mail.com`
- **Password**: `changeme`

### Common Issues

1. **Port already in use**: Change the port with `npm run dev -- -p 3001`
2. **API errors**: Check if the API URL is correct in `.env.local` or `.env.development`
3. **Build errors**: Ensure all dependencies are installed with `npm install`

### Getting Help

- **Documentation**: Check this README and inline code comments
- **Issues**: Open an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions

---

**Built with ❤️ using Next.js, React, and TypeScript**
