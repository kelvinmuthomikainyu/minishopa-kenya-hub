# Mini Shop Africa Backend API

A comprehensive Node.js/Express backend for the Mini Shop Africa marketplace platform.

## Features

- **User Management**: Registration, authentication, and profile management
- **Product Management**: CRUD operations with advanced filtering and search
- **Influencer Program**: Commission tracking and performance analytics
- **Order Management**: Complete order lifecycle with status tracking
- **Category System**: Hierarchical product categorization
- **Location-based Services**: Kenya-focused location filtering
- **Security**: JWT authentication, rate limiting, and data validation

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Mongoose validators + custom validation

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Navigate to server directory**:
   ```bash
   cd server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

5. **Seed the database** (optional):
   ```bash
   npm run seed
   ```

6. **Start the server**:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

The API will be available at `http://localhost:5000`

## Environment Variables

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/minishopa-kenya

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Email (for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=muthomikelvin23@gmail.com
EMAIL_PASS=your-app-password

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Frontend
FRONTEND_URL=http://localhost:3000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (seller/admin)
- `PUT /api/products/:id` - Update product (owner/admin)
- `DELETE /api/products/:id` - Delete product (owner/admin)
- `GET /api/products/featured/list` - Get featured products

### Influencers
- `POST /api/influencers/apply` - Apply to become influencer
- `GET /api/influencers/dashboard` - Get influencer dashboard
- `POST /api/influencers/track-click/:code` - Track referral click
- `GET /api/influencers/applications` - Get applications (admin)
- `PUT /api/influencers/:id/status` - Approve/reject application (admin)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status
- `PUT /api/orders/:id/cancel` - Cancel order

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (admin)

### Users
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get single user

## Database Models

### User
- Personal information (name, email, phone)
- Authentication (password, verification)
- Location data (county, town)
- Role-based access (buyer, seller, admin)

### Product
- Product details (name, description, price)
- Inventory management (stock, units)
- Location and delivery information
- SEO and categorization
- Performance metrics (sales, ratings)

### Influencer
- Social media information
- Commission tracking (15% default)
- Performance analytics
- Monthly statistics
- Payout management

### Order
- Order items and pricing
- Delivery and contact information
- Status tracking and history
- Payment integration
- Influencer commission tracking

### Category
- Hierarchical structure (parent/subcategories)
- Product organization
- SEO-friendly slugs

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Prevents API abuse (100 requests/15 minutes)
- **Helmet**: Security headers protection
- **CORS**: Cross-origin resource sharing configuration
- **Input Validation**: Mongoose validators and custom validation
- **Password Hashing**: bcryptjs for secure password storage

## Influencer Commission System

The platform includes a comprehensive influencer program:

- **15% Commission Rate**: Default commission on all sales
- **Real-time Tracking**: Click and conversion analytics
- **Monthly Reports**: Detailed performance statistics
- **Automated Payouts**: Commission calculation and tracking
- **Referral Codes**: Unique codes for each influencer

## Development

### Project Structure
```
server/
├── models/          # Database models
├── routes/          # API route handlers
├── middleware/      # Custom middleware
├── scripts/         # Utility scripts
├── uploads/         # File upload directory
├── .env            # Environment variables
├── server.js       # Main server file
└── package.json    # Dependencies
```

### Adding New Features

1. Create model in `models/` directory
2. Add routes in `routes/` directory
3. Import routes in `server.js`
4. Update this README

### Testing

The seed script creates test data:
```bash
npm run seed
```

This creates:
- Sample users (buyers and sellers)
- Product categories
- Sample products
- Approved influencers

## Deployment

### Production Setup

1. Set `NODE_ENV=production` in environment
2. Use a production MongoDB instance
3. Configure proper JWT secrets
4. Set up file upload storage (AWS S3, etc.)
5. Configure email service for notifications

### Docker Support

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## Support

For technical support or questions:
- **Email**: muthomikelvin23@gmail.com
- **Phone**: 0706325807

## License

MIT License - see LICENSE file for details.
