# Blog App Frontend

This is the frontend for the Blog App, built using React, React Router, and Axios.

## Features

- **User Authentication**: Secure login and registration with JWT-based authentication.
- **CRUD Operations**:Create, Read, Update, and Delete functionality for blog posts.
- **Authorization**: Only authenticated users can create, update, or delete blog posts.
- **Responsive UI**: Optimized for mobile and desktop devices for seamless user experience.
- **Error Handling**: Informative error messages when actions fail or data is unavailable.
- **Protected Routes**: Ensures only authorized users can access specific routes.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/ashishgourr/blog-app-frontend.git
   ```

2. Navigate to the backend directory:

   ```sh
   cd blog-app-frontend
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

## Running the App

To start the React app in development mode:

```sh
npm start
```

## Usage

Once the app is running, you can navigate through the app's pages:

- **Home page**: Displays all blog posts
- **Login page**: Login with a registered username and password
- **Register page**: Register a new user
- **Create post page**: Create a new blog post (authenticated users only)
- **Edit or Delete post**: Edit or delete an existing blog post (authenticated users only)
