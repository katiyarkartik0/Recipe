import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRecipes } from "store/slices/recipes";
import { setToast } from "store/slices/toast";

import { destroyAccessToken } from "api/accessToken";
import { getRecipes } from "api/recipe";

import Recipe from "components/Recipe/Recipe";
import Button from "components/Button/Button";

import { Loader } from "utils/Loader/Loader";
import {
  selectAccessToken,
  selectPreferences,
  selectRecipes,
  selectUserData,
} from "helpers/selector";

import "./Recipes.css";

const NUMBER_OF_RESULTS_PER_PAGE = 10;

const Recipes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isItemsLoading, setIsItemsLoading] = useState(false);

  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const accessToken = useSelector(selectAccessToken);
  const preferences = useSelector(selectPreferences);
  const { recipes: { results = [] } = {} } = useSelector(selectRecipes);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await destroyAccessToken({ accessToken });
    localStorage.clear();
    navigate("/");
  };

  const handleSearch = async ({ pageNumber }) => {
    setIsItemsLoading(true);
    try {
      const response = await getRecipes({
        accessToken,
        preferences: {
          ...preferences,
          offset: pageNumber,
          number: NUMBER_OF_RESULTS_PER_PAGE,
        },
      });
      setCurrentPage(pageNumber);

      const recipes = await response.json();
      dispatch(setRecipes({ recipes }));
      localStorage.setItem("recipes", JSON.stringify(recipes));
    } catch (error) {
      dispatch(
        setToast({ status: "failure", displayMessage: JSON.stringify(error) })
      );
    }
    setIsItemsLoading(false);
  };

  return (
    <>
      <div className="navbar">
        <div className="nav">
          <h3 className="item-page-heading">
            Based on your preferences, we have...
          </h3>{" "}
          <div className="user-detail">
            <div className="userName icon-user">{userData.name}</div>
            <Button
              className="logout"
              text="Logout"
              onClickEvent={handleLogout}
            />
          </div>
        </div>
      </div>

      <div className="items">
        {isItemsLoading && <Loader />}
        {!isItemsLoading &&
          results.map(({ id, image, title, imageType }) => {
            return (
              <Recipe
                key={id}
                imageType={imageType}
                id={id}
                imageUrl={image}
                title={title}
                className="item-box"
              />
            );
          })}
      </div>
      <div className="pageinatorContainer">
        <Button
          className="paginator"
          text="Go Back"
          onClickEvent={() => handleSearch({ pageNumber: currentPage - 1 })}
        />
        <span className="page-tag page-tag-blue">{"page number " + currentPage}</span>
        <Button
          className="paginator"
          text="Show More"
          onClickEvent={() => handleSearch({ pageNumber: currentPage + 1 })}
        />
      </div>
    </>
  );
};

export default Recipes;
