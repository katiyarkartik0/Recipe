# Recipe Backend

Welcome to the backend part of the Recipe project! This backend is responsible for user authentication, handling recipe-related actions, and ensuring the security of protected routes through token verification.

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Middleware: `verifyToken.js`](#middleware-verifytokenjs)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Access Token](#access-token)
  - [Recipes](#recipes)
- [Spoonacular Service](#spoonacular-api-service)
## Project Structure

The backend of Recipe is organized into different components to handle various tasks. Here's an overview of the key components and their functions:

- **index.js**: The entry point of the backend application. It sets up the server, connects to the database, and defines routes for different functionalities.

- **middleware/verifyToken.js**: Middleware responsible for checking the validity of access tokens before allowing access to protected routes.

- **routes/auth.js**: Defines routes related to user authentication, such as logging in and signing up.

- **routes/accessToken.js**: Defines a route for destroying access tokens, providing a way to log out users by invalidating their tokens.

- **routes/recipe.js**: Defines routes related to recipe actions, including retrieving recipes, ingredients, nutritional information, instructions, saving and deleting recipes, and retrieving saved recipes.

## Getting Started

To get started with the backend of Recipe, follow these steps:

1. Make sure you have Node.js installed on your system.

2. Clone the repository and navigate to the backend directory.

3. Install the required dependencies using `npm install`.

4. Configure your environment variables. You can use the `.env` file to store sensitive information like database connection details.

5. Set up your MongoDB database. Ensure that the connection URL matches the one specified in your environment variables.

6. Run the backend server using `npm start`.

Now, your backend should be up and running, ready to handle authentication and recipe-related requests.

## Middleware: `verifyToken.js`

The `verifyToken` middleware ensures the security of protected routes by checking the validity of access tokens before processing requests. It validates the token in the request's authorization header and grants access only if a valid token is present.

```
const verifyToken = async (req, res, next) => {
  // 1. It retrieves the access token from the request's authorization header.
  let token = req.header("authorization");

  // 2. It checks if the token is present and starts with "OAT" (Opaque Authentication Token).
  if (token && token.split(" ")[0] === "OAT") {
    // 3. If the token is valid, it extracts the actual access token and the user's ID.
    const accessToken = token.split(" ")[1];
    const userId = token.split(" ")[2];

    // 4. It checks the presence of the access token in the database.
    if (await isTokenPresent({ token: accessToken })) {
      // 5. If the token is valid, it sets user-related data in the request object.
      req.id = userId;
      req.verified = true;
      next(); // 6. It calls the next middleware or route handler.
    } else {
      // 7. If the token is not valid, it sets an error message and proceeds to the next middleware.
      req.verified = false;
      req.msg = "invalid JWT token";
      next();
      return;
    }
  } else {
    // 8. If the token is missing or has an incorrect format, it sets an error message and proceeds to the next middleware.
    req.verified = false;
    req.msg = "Authorization header not found";
    next();
  }
};

// 9. It exports the `verifyToken` middleware for use in routes.
module.exports = { verifyToken };
```

## API Endpoints

### Authentication

#### Register User

- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:**
  - `email` (string) - User's email address.
  - `password` (string) - User's password.
- **Response:**
  - `msg` (string) - Success message.

#### Login User

- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Description:** Log in an existing user.
- **Request Body:**
  - `email` (string) - User's email address.
  - `password` (string) - User's password.
- **Response:**
  - `token` (string) - JWT token for authentication.

### Access Tokens

#### Destroy Access Token

- **URL:** `/api/access-token/destroy`
- **Method:** `DELETE`
- **Description:** Destroy the user's access token.
- **Request:**
  - Requires a valid JWT token for authorization.
- **Response:**
  - `msg` (string) - Success message if the access token is destroyed successfully.
  
### Recipes

#### Get Recipes

- **URL:** `/api/recipe/recipes`
- **Method:** `POST`
- **Description:** Get a list of recipes based on user preferences.
- **Request Body:**
  - `diet` (array of strings) - Specifies the desired diet types.
  - `cuisine` (array of strings) - Defines preferred cuisines.
  - `intolerances` (array of strings) - Lists any intolerances.
  - `offset` (integer) - Determines the starting position for recipe results.
  - `number` (integer) - Specifies the number of recipes to retrieve.
- **Response:**
  - `recipes` (array of objects) - List of recipes with details.

#### Get Ingredients

- **URL:** `/api/recipe/ingredients`
- **Method:** `GET`
- **Description:** Get a list of ingredients for a recipe.
- **Request Parameters:**
  - `recipeId` (string) - Unique identifier for the recipe.
- **Response:**
  - `ingredients` (array of strings) - List of ingredients for the specified recipe.

#### Get Nutritional Information

- **URL:** `/api/recipe/nutritionalInfo`
- **Method:** `GET`
- **Description:** Get nutritional information for a recipe.
- **Request Parameters:**
  - `recipeId` (string) - Unique identifier for the recipe.
- **Response:**
  - `nutritionalInfo` (object) - Nutritional information for the specified recipe.

#### Get Recipe Instructions

- **URL:** `/api/recipe/instructions`
- **Method:** `GET`
- **Description:** Get instructions for preparing a recipe.
- **Request Parameters:**
  - `recipeId` (string) - Unique identifier for the recipe.
- **Response:**
  - `instructions` (object) - Instructions for preparing the specified recipe.

#### Save Recipe

- **URL:** `/api/recipe/save`
- **Method:** `POST`
- **Description:** Save a recipe to the user's collection.
- **Request Body:**
  - `spoonacularRecipeId` (integer) - Unique identifier for the recipe.
  - `title` (string) - Title of the recipe.
  - `image` (string) - URL of the recipe's image.
  - `imageType` (string) - Type of the image.
- **Response:**
  - `msg` (string) - Success message if the recipe is saved successfully.

#### Delete Recipe

- **URL:** `/api/recipe/delete`
- **Method:** `DELETE`
- **Description:** Delete a saved recipe from the user's collection.
- **Request Parameters:**
  - `recipeId` (string) - Unique identifier for the recipe to be deleted.
- **Response:**
  - `msg` (string) - Success message if the recipe is deleted successfully.

#### Get Saved Recipes

- **URL:** `/api/recipe/savedRecipes`
- **Method:** `GET`
- **Description:** Get a list of recipes saved in the user's collection.
- **Response:**
  - `savedRecipes` (array of objects) - List of saved recipes with details.

# Spoonacular API Service

This module interacts with the Spoonacular API to fetch recipes, ingredients, instructions, and nutritional information. It provides the following functions:

## Functions

### Fetch Recipes

- **Description:** Fetch a list of recipes based on user preferences.
- **Input:**
  - `diet` (Array): User's preferred diet types.
  - `cuisine` (Array): User's preferred cuisines.
  - `intolerances` (Array): User's intolerances.
  - `offset` (Number): Starting position for recipe results.
  - `number` (Number): Number of recipes to retrieve.
- **Output:** List of recipes with details.

### Fetch Ingredients

- **Description:** Fetch the list of ingredients for a specific recipe.
- **Input:**
  - `recipeId` (String): Unique identifier for the recipe.
- **Output:** List of ingredients for the specified recipe.

### Fetch Instructions

- **Description:** Fetch cooking instructions for a specific recipe.
- **Input:**
  - `recipeId` (String): Unique identifier for the recipe.
- **Output:** Cooking instructions for the specified recipe.

### Fetch Nutritional Information

- **Description:** Fetch nutritional information for a specific recipe.
- **Input:**
  - `recipeId` (String): Unique identifier for the recipe.
- **Output:** Nutritional information for the specified recipe.

## Configuration

Before using these functions, make sure to configure your environment by setting up the following environment variable:

- **SPOONACULAR_API_KEY:** Your Spoonacular API key.

### Checkout README.md for Recipe project overview
[Features of Recipe Project](https://github.com/katiyarkartik0/recipe/blob/main/README.md)

### Checkout README.md for frontend implementation
[Frontend](https://github.com/katiyarkartik0/Recipe/blob/main/client/README.md)

