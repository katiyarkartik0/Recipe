import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToast } from "store/slices/toast";
import { setSavedRecipes } from "store/slices/recipes";

import { destroyAccessToken } from "api/accessToken";

import Search from "components/Search/Seacrh";
import Button from "components/Button/Button";
import Recipe from "components/Recipe/Recipe";

import { getSavedRecipes } from "api/recipe";

import UnauthorizedPage from "pages/unauthorizedPage/UnauthorizedPage";

import {
  selectAccessToken,
  selectSavedRecipes,
  selectUserData,
} from "helpers/selector";

import "./homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const userData = useSelector(selectUserData);
  const accessToken = useSelector(selectAccessToken);
  const savedRecipes = useSelector(selectSavedRecipes);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await destroyAccessToken({ accessToken });
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        await getSavedRecipes({ accessToken }).then(async (res) => {
          const { savedRecipes } = await res.json();
          dispatch(setSavedRecipes({ savedRecipes }));
          localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
        });
        localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
      } catch (error) {
        dispatch(
          setToast({ status: "failure", displayMessage: JSON.stringify(error) })
        );
      }
    };
    fetchSavedRecipes();
  }, []);
  console.log(savedRecipes);
  if (accessToken) {
    return (
      <div className="App">
        <div className="nav">
          <h1 className="app-nav-header">Recipe App</h1>
          <div className="user-detail">
            <div className="userName icon-user">{userData.name}</div>

            <Button
              className="logout"
              text="Logout"
              onClickEvent={handleLogout}
            />
          </div>
        </div>
        <div>
          <Search />
        </div>
        <hr></hr>
        <h3 className="save-recipes-heading">Saved Recipes</h3>
        {/* <Recipe
              imageType={"jpg"}
              id={"716429"}
              title={"Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs"}
              imageUrl={"https://spoonacular.com/recipeImages/716429-312x231.jpg"}
            /> */}

        <div className="saved-item-list">
          {savedRecipes.map(
            ({ spoonacularRecipeId, title, image, imageType }) => {
              return (
                <Recipe
                  imageType={imageType}
                  title={title}
                  imageUrl={image}
                  id={spoonacularRecipeId}
                  className="saved-item"
                />
              );
            }
          )}
        </div>

        <br></br>
      </div>
    );
  } else {
    return <UnauthorizedPage />;
  }
};

export default HomePage;
