import React, { useCallback, useEffect, useState } from "react";
import { setToast } from "store/slices/toast";

import "./RecipeDetails.css";
import {
  getIngredients,
  getInstructions,
  getNutritionalInfo,
} from "api/recipe";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken, selectUserData } from "helpers/selector";
import Instruction from "components/Instruction/Instruction";
import Nutrition from "components/Nutrition/Nutrition";
import Ingredient from "components/Ingredient/Ingredient";
import { Loader } from "utils/Loader/Loader";
import RecipeButton from "components/RecipeButton/RecipeButton";
import Button from "components/Button/Button";
import { useNavigate } from "react-router-dom";
import { destroyAccessToken } from "api/accessToken";

const LOCAL_STORAGE_INSTRUCTIONS_KEY = ({ id: recipeId }) =>
  `${recipeId}-instructions`;

const LOCAL_STORAGE_NUTRITIONAL_INFO_KEY = ({ id: recipeId }) =>
  `${recipeId}-nutritionalInfo`;

const LOCAL_STORAGE_INGREDIENTS_KEY = ({ id: recipeId }) =>
  `${recipeId}-ingredients`;

const RecipeDetails = ({
  id = "",
  imageUrl = "",
  title = "",
  imageType = "",
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector(selectAccessToken);
  const userData = useSelector(selectUserData);

  const [instructions, setInstructions] = useState([]);
  const [nutritionalInfo, setNutritionalInfo] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const [isLoading, setIsLoading] = useState({
    instructions: false,
    nutritionalInfo: false,
    ingredients: false,
  });

  const handleLogout = async () => {
    await destroyAccessToken({ accessToken });
    localStorage.clear();
    navigate("/");
  };

  const fetchInstructions = useCallback(async () => {
    const steps = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_INSTRUCTIONS_KEY({ id }))
    );
    if (steps) {
      setInstructions(steps);
    } else {
      setIsLoading({ ...isLoading, instructions: true });
      try {
        const response = await getInstructions({ accessToken, recipeId: id });
        const { instructions } = await response.json();
        const { steps } = instructions[0];

        setInstructions(steps);

        localStorage.setItem(
          LOCAL_STORAGE_INSTRUCTIONS_KEY({ id }),
          JSON.stringify(steps)
        );
      } catch (error) {
        dispatch(
          setToast({ status: "failure", displayMessage: JSON.stringify(error) })
        );
      }
      setIsLoading({ ...isLoading, instructions: false });
    }
  }, [id]);

  const fetchNutritionalInfo = useCallback(async () => {
    const nutrients = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_NUTRITIONAL_INFO_KEY({ id }))
    );
    if (nutrients) {
      setNutritionalInfo(nutrients);
    } else {
      setIsLoading({ ...isLoading, nutritionalInfo: true });
      try {
        const response = await getNutritionalInfo({
          accessToken,
          recipeId: id,
        });
        const {
          nutritionalInfo: { nutrients },
        } = await response.json();

        setNutritionalInfo(nutrients);

        localStorage.setItem(
          LOCAL_STORAGE_NUTRITIONAL_INFO_KEY({ id }),
          JSON.stringify(nutrients)
        );
      } catch (error) {
        dispatch(
          setToast({ status: "failure", displayMessage: JSON.stringify(error) })
        );
      }
      setIsLoading({ ...isLoading, nutritionalInfo: false });
    }
  }, [id]);

  const fetchIngredients = useCallback(async () => {
    const ingredients = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_INGREDIENTS_KEY({ id }))
    );
    if (ingredients) {
      setIngredients(ingredients);
    } else {
      setIsLoading({ ...isLoading, ingredients: true });
      try {
        const response = await getIngredients({ accessToken, recipeId: id });
        const {
          ingredients: { ingredients },
        } = await response.json();
        setIngredients(ingredients);

        localStorage.setItem(
          LOCAL_STORAGE_INGREDIENTS_KEY({ id }),
          JSON.stringify(ingredients)
        );
      } catch (error) {
        dispatch(
          setToast({ status: "failure", displayMessage: JSON.stringify(error) })
        );
      }
      setIsLoading({ ...isLoading, ingredients: false });
    }
  }, [id]);

  useEffect(() => {
    fetchInstructions();
    fetchNutritionalInfo();
    fetchIngredients();
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="nav">
          <h1 className="app-nav-header">Recipe Details</h1>
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
      <div className="product-detail">
        <div className="item-detail">
          <img className="product-image" src={imageUrl} alt={title} />
          <div className="product-box">
            <h1 className="product-title">{title}</h1>
            <RecipeButton
              recipeId={id}
              imageUrl={imageUrl}
              title={title}
              imageType={imageType}
            />{" "}
          </div>
        </div>
        <div className="container">
          <h2 className="instruction-heading">Instructions</h2>
          <div className="ingredient-box">
            {isLoading.instructions && <Loader />}
            {!isLoading.instructions &&
              instructions.map(
                ({ ingredients = [], equipment = [], step }, idx) => (
                  <Instruction
                    key={idx}
                    ingredients={ingredients}
                    equipment={equipment}
                    step={step}
                  />
                )
              )}
          </div>
        </div>
        <div className="container">
          <h2 className="nutrient-heading">Nutrients</h2>
          <table className="nutrients-table">
            <tr>
              <th className="nutrients-heading">Name</th>
              <th className="nutrients-heading">Unit</th>
              <th className="nutrients-heading">Amount</th>
              <th className="nutrients-heading">Percent of Daily Needs</th>
            </tr>
            <tbody>
              {isLoading.nutritionalInfo && <Loader />}
              {!isLoading.nutritionalInfo &&
                nutritionalInfo.map((nutrient, idx) => (
                  <Nutrition key={idx} nutrient={nutrient} />
                ))}
            </tbody>
          </table>
        </div>
        <div className="container">
          <h2 className="ingredient-heading">Ingredients</h2>
          <table className="ingredients-table">
            <tr>
              <th className="ingredients-heading">Name</th>
              <th className="ingredients-heading">Units</th>
              <th className="ingredients-heading">Amount</th>
            </tr>
            <tbody>
              {isLoading.ingredients && <Loader />}
              {!isLoading.ingredients &&
                ingredients.map((ingredient, idx) => (
                  <Ingredient key={idx} ingredient={ingredient} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RecipeDetails;
