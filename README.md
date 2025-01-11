# Restaurant Management Website ✨

## Live URL
[Live Website](https://restaurent-management-61037.web.app/)

## Overview
The Restaurant Management Website is a fully responsive and dynamic web application designed to manage and showcase food items. It features user authentication, food management, and order tracking functionalities. The project is built with a modern tech stack to ensure scalability, performance, and ease of use. 

## Key Features

### General Features
- Fully responsive design for all devices (mobile, tablet, desktop).
- Clean, user-friendly interface with proper color contrast, alignment, and spacing.
- Secure environment variable integration for Firebase and MongoDB credentials.
- JWT-based authentication to secure private routes.
- Light and dark mode theme toggling.

### Pages and Functionalities

#### Navbar
- Contains website name/logo.
- Links to **Home**, **All Foods**, and **Gallery**.
- Conditional login/logout button.
- Profile dropdown for authenticated users with links to:
  - **My Foods**
  - **Add Food**
  - **My Orders**

#### Home Page (Public)
- **Banner Section**: Highlights the website with a catchy heading, description, and CTA button.
- **Top Foods Section**: Displays 6 popular food items with navigation options.
- **Extra Sections**: Includes two visually engaging sections for additional content.

#### All Foods Page (Public)
- Lists all available food items with search and pagination.
- Each card includes food details, quantity, and a button to view more.

#### Single Food Page (Public)
- Shows detailed information about a specific food item, including purchase stats and a purchase button.

#### Food Purchase Page (Private)
- A secure form for purchasing food items with validation and availability checks.

#### Gallery Page (Public)
- Displays a gallery of static images with a lightbox feature for enhanced viewing.

#### My Foods Page (Private)
- Lists all food items added by the user with options to update details.

#### Add Food Page (Private)
- Provides a form to add new food items with fields for:
  - Name
  - Category
  - Quantity
  - Price
  - Description

#### My Orders Page (Private)
- Displays all orders placed by the logged-in user, including options to delete an order.

### Authentication System
- Login and registration with email/password.
- Social logins using Google and GitHub.
- Error messages and toasts for feedback.
- Secure JWT token generation and verification.

### Additional Features
- Loading spinners for better user experience.
- Smooth animations using Framer Motion.
- Backend-driven filtering and pagination.
- Infinite scrolling and dynamic animations in the gallery.

## Technology Stack

### Frontend
- React
- React Router
- TailwindCSS
- Yet-Another-React-Lightbox
- Framer Motion
- React Toastify
- Axios
- Moment.js

### Backend
- Express.js
- MongoDB
- JSON Web Token (JWT)
- dotenv

## Installation Guide

### Prerequisites
- Node.js
- npm/yarn

### Steps to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/IsmailHossen87/A-11-Restaurant-Management.git
   ```

2. Navigate to the project directory:
   ```bash
   cd A-11-Restaurant-Management
   ```

3. Install dependencies for both frontend and backend:
   ```bash
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add Firebase and MongoDB credentials, as well as the JWT secret.

5. Start the development server:
   ```bash
   npm start
   ```

6. Open the application in your browser at [http://localhost:3000](http://localhost:3000).

## Repository Links
- [GitHub Repository](https://github.com/IsmailHossen87/A-11-Restaurant-Management)

---


