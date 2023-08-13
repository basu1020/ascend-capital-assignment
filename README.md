# ascend-capital-assignment

Deployed links:-

Backend - https://taskapp-backend.onrender.com/
Frontend - https://sparkling-llama-e8ac7e.netlify.app/

# Frontend Project Documentation

## Introduction
This section discussed the use React and its state management and the useContext hook. Through meticulous design and thoughtful implementation, we've created a seamless user experience driven by intuitive UI components and smooth interactions.

## Key Features
- **React:** The heart of our project lies in the use of React, a popular JavaScript library for building user interfaces. Its component-based structure allows us to create reusable, modular UI elements that facilitate both development and maintenance.

- **useContext:** We've harnessed the power of React's `useContext` hook to manage and share state across various components efficiently. This approach simplifies the process of passing data down the component tree and ensures a consistent application-wide state.

- **Vite:** Our project benefits from the lightning-fast development environment provided by Vite. This build tool not only speeds up the development process but also enhances the overall performance of our application.

## AppContext and State Handling
Our project's state management is centralized in the `appContext` file. This context encapsulates various functions and data related to user authentication and task management, providing a seamless integration of these features across different components.

## JSX Files
Our project is composed of several JSX files, each contributing to the overall user experience:

- **Home:** This file represents the home page, where users can view and interact with their tasks.

- **Login:** The login page enables users to securely access their accounts using their credentials.

- **Signup:** Users can create new accounts through the signup page, ensuring a streamlined onboarding process.

- **Navbar:** The navbar component ensures easy navigation throughout the application, enhancing user accessibility and experience.

## AppState useContext component 
## `AppState` Component
The `AppState` component plays a crucial role in managing the application's state and providing essential functions for user authentication and task management. Here's an overview of the features in the `AppState` component:

    ````jsx
    import AppContext from "./appContext";
    import { useState } from "react";
  
    const host = 'https://taskapp-backend.onrender.com';
  
    const AppState = (props) => {
      const [loggedIN, setLoggedIN] = useState(false);
      const [user, setUser] = useState({
          name: "",
          email: "",
          tasks: []
      });
  
      // ... (login, signup, getUserTasks, updateTasks functions)
  
      return (
          <AppContext.Provider value={{login, signup, loggedIN, setLoggedIN, updateTasks, user, setUser, getUserTasks}}>
              {props.children}
          </AppContext.Provider>
      )
      }
  
      export default AppState;

- The AppState component encapsulates functions such as login, signup, getUserTasks, and updateTasks, enabling seamless communication with the backend server and efficient management of user-related data.

## Home Component Documentation

## Introduction
The `Home` component is a vital part of our project's frontend, providing users with an interactive and intuitive interface to manage their tasks. This component leverages React's state management and incorporates features such as task manipulation and drag-and-drop functionality.

## Task Manipulation
The `Home` component enables users to interact with their tasks in various ways:

### Adding a New List
Users can easily add a new list of tasks by clicking on the "+" button. This action triggers the `handleAddingNewList` function, which appends an empty task list to the existing tasks and updates the backend accordingly.

### Editing and Deleting Tasks
Users can edit task names by clicking on them and making changes. Any modifications trigger the `onBlur` event, which updates the task name both in the component's state and in the backend using the `updateBackendwithNewTasks` function. To delete a task, users can click the checkmark icon (✔), which invokes the `handleDeleteTask` function.

## Drag and Drop Functionality
The `Home` component supports drag-and-drop functionality for rearranging tasks within and between lists. The following interactions are facilitated:

- `handleDragStart`: Initiates the drag event and sets data attributes to capture the source list and task indexes.

- `handleDragOver`: Specifies the drag-over behavior and visual effect during the drag operation.

- `handleDrop`: Handles the drop event, updating the tasks' order based on the source and target indexes. It utilizes the `updateBackendwithNewTasks` function to persist changes in the backend.

## User Authentication
The `Home` component ensures user authentication before rendering the task management interface. If a user is not logged in, they will be redirected to the login page.

## Usage
The `Home` component should be rendered within the appropriate context, typically in a route configuration. Here's an example of how it can be used:

    ````jsx
    import React from 'react';
    import Home from './Home';
    
    function HomePage() {
        return (
            <div>
                {/* Other components */}
                <Home />
            </div>
        );
    }
    
    export default HomePage;

# Backend Project Documentation

## Introduction
This documentation provides an overview of the backend project developed using Express.js and MongoDB. The project includes API routes for user signup, login, fetching user details, and updating user tasks.

## Project Structure
The project consists of several components, including the main `index.js` file, configuration files, model definitions, controller functions, middleware, and environment variables.

## Setup and Configuration
1. Clone the repository and navigate to the project directory.
2. Install the required dependencies using the following command:
   ```sh
   npm install

3.Rename the .env.example file to .env and set your environment variables, such as JWT_SECRET for JSON Web Token encryption.
Start the server by running:
    ```sh
    npm start

## API Endpoints

### `POST /signup`
Creates a new user account.

- **Request:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "yourPassword"
  }
- **Response**
  ```json
  {
  "success": true
  }

### POST /login
- Description: Users can log in using their registered email and password.
- **Request:**:
  ```json
  {
  "email": "john@example.com",
  "password": "yourPassword"
  }
- **Response**:
  ```json
  {
  "success": true,
  "authToken": "yourAuthToken"
  }

### POST/get-user
- Description: Retrieves the user's details based on the provided authentication token.
- **Request:**:
Requires an authentication token (provided during login).
- **Response**
  ````json
  {
  "success": true,
  "user": {
    "_id": "userObjectId",
    "name": "John Doe",
    "email": "john@example.com",
    "tasks": ["task1", "task2"]
  }
  }

### POST /update-tasks
- Description: Updates the user's tasks based on the provided authentication token.
- Request:
     - Requires an authentication token (provided during login).
     - Request Body:
       ```json
       {
            "tasks": ["newTask1", "newTask2"]
       }
- Response:
  ````json
  {
  "success": true,
  "updatedUser": {
    "_id": "userObjectId",
    "name": "John Doe",
    "email": "john@example.com",
    "tasks": ["newTask1", "newTask2"]
  }
  }

## Error Handling 
  If an error occurs during API execution, appropriate error responses are returned with detailed messages. Error responses include relevant status codes and explanations to assist with debugging.

