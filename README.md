# [Wash Suite (Car Wash Booking System)](https://wash-suite-77385.web.app/)

[Live Link](https://wash-suite-77385.web.app/)

## Project Description

The **Wash Suite** is a web-based platform designed to provide a seamless booking experience for car wash services. The system allows users to sign up, browse services, select time slots, and make payments easily. For administrators, it offers an intuitive dashboard to manage services, users, and bookings efficiently.

## Technology Stack

-   **Frontend**:Typescript, React, TailwindCSS, KeepReact
-   **Backend**: Typescript, Node.js, Express
-   **Database**: MongoDB, Mongoose
-   **Payment Gateway**: AAMARPAY
-   **Authentication**: JWT (JSON Web Tokens)

## Project Features

### Public Features

1. **Home Page**
    - Navigation menu linking to key pages (Services, Booking, Login).
    - Hero section showcasing car wash services with a call-to-action button for booking.
    - Featured services section and user review functionality.
2. **User Authentication**
    - Sign up and login with token-based authentication.
    - Email, password, and role-based system (USER by default, ADMIN via promotion).
3. **Service Management**
    - Browse and filter available car wash services with details, prices, and booking slots.
4. **Booking System**
    - Users can select available time slots for services.
    - Payment integration with **AAMARPAY** for secure checkout.
5. **Error Handling**
    - Custom 404 pages for invalid routes.

### Admin Features

1. **Admin Dashboard**
    - Manage services, booking slots, and users from a single interface.
    - Add, update, and delete services with confirmation modals.
    - Slot management system with the ability to toggle statuses between available, booked, and canceled.
2. **User Management**
    - Manage user roles and view their booking history.

### User Dashboard

-   Overview of past and upcoming bookings.
-   Countdown timers for upcoming bookings.

## Admin Credentials

-   **Email**: admin@gmail.com
-   **Password**: 11

## Local Setup Instructions

To run the Car Wash Booking System locally, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/monishatBaishnab/car-washing-management-client
    ```

2. **Navigate to the project directory**:

    ```bash
    cd car-washing-management-client
    ```

3. **Install dependencies**:

    ```bash
    npm install
    ```

4. **Set up environment variables**:

    - Create a `.env` file in the root directory.
    - Add the following variables:
        ```env
        VITE_IMGBB_API=<your-imgbb-api-key>
        ```

5. **Start the server**:

    ```bash
    npm start
    ```

6. **Access the application**:
    - Open your browser and navigate to `http://localhost:3000`.
