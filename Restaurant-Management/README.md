# Restaurant Management Website 🍽️

## Live URL
[My Live Website Link](https://restaurent-management-61037.web.app/)

## Key Features

### General Features
- Fully responsive design for mobile, tablet, and desktop.
- Eye-catching and recruiter-friendly design with proper color contrast, alignment, and spacing.
- Environment variables for secure Firebase configuration keys and MongoDB credentials.
- JWT authentication for secure access to private routes.
- Theme toggling between light and dark modes.

### Pages and Functionalities

#### Navbar
- Website name/logo.
- Links to Home, All Foods, Gallery.
- Conditional login/logout button.
- Profile image dropdown (links to My Foods, Add Food, My Orders).

#### Home Page (Public)
- **Banner Section**: Heading, short description, and a button redirecting to the All Foods page.
- **Top Foods Section**: Displays 6 top-selling food items with details and navigation buttons.
- **Extra Sections**: Two additional attractive sections.

#### All Foods Page (Public)
- Displays all food items from the database with search and pagination functionalities.
- Each card contains food info, quantity, and a details button.

#### Single Food Page (Public)
- Detailed information about a food item, including purchase count and a purchase button.

#### Food Purchase Page (Private)
- Form to buy food items, including fields for food name, price, quantity, and buyer details.
- Purchase restrictions based on availability and ownership.

#### Gallery Page (Public)
- Displays a gallery of 10+ static images with a lightbox view for enlarged previews.

#### My Foods Page (Private)
- Displays all food items added by the logged-in user with update functionality.

#### Add Food Page (Private)
- Form to add new food items, including details like name, category, quantity, price, and description.

#### My Orders Page (Private)
- Displays all food items ordered by the logged-in user with delete functionality.

### Authentication System
- Email/password-based login and registration.
- Google and GitHub social login.
- Password validation with error messages/toasts.
- JWT token creation and verification.

### Additional Features
- Spinner for loading states.
- Animations using Framer Motion.
- Backend filtering and pagination.
- Infinite scrolling and animations in the gallery section.

## npm Packages Used
- **Frontend**:
  - React
  - React Router
  - TailwindCSS
  - Yet-Another-React-Lightbox
  - Framer Motion
  - React Toastify
  - Axios
  - Moment.js

- **Backend**:
  - Express.js
  - MongoDB
  - JSON Web Token (JWT)
  - dotenv

## Repository Links
- [Client & Backend Repository](https://github.com/IsmailHossen87/A-11-Restaurant-Management)

