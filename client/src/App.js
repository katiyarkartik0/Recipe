import { BrowserRouter, Route, Routes } from "react-router-dom";

import UnauthorizedPage from "pages/unauthorizedPage/UnauthorizedPage";
import HomePage from "pages/homepage/homepage";
import AuthenticationPage from "pages/auth/authenticationPage";
import Recipes from "pages/recipes/Recipes";
import RecipeDetailPage from "pages/recipeDetail/RecipeDetailPage";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthenticationPage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/recipes" element={<Recipes />}></Route>
          <Route path="recipes/:recipeId" element={<RecipeDetailPage />}></Route>
          <Route path="*" element={<UnauthorizedPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
