import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRecipes } from "store/slices/recipes";
import { setToast } from "store/slices/toast";

import Button from "components/Button/Button";

import { getRecipes } from "api/recipe";

import { selectAccessToken } from "helpers/selector";
import { PREFERENCES } from "helpers/constants";

import "./Search.css";

const Search = () => {
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    diet: [],
    intolerances: [],
    cuisine: [],
  });

  const handleClick = ({ preferenceName, value }) => {
    const preference = preferences[preferenceName];
    if (preference.includes(value)) {
      const updatedPreferences = preference.filter(
        (option) => option !== value
      );
      setPreferences({ ...preferences, [preferenceName]: updatedPreferences });
    } else {
      const updatedPreferences = [...preference, value];
      setPreferences({ ...preferences, [preferenceName]: updatedPreferences });
    }
  };

  const handleSearch = async () => {
    try {
      const response = await getRecipes({ accessToken, preferences });

      const recipes = await response.json();
      dispatch(setRecipes({ recipes }));
      localStorage.setItem("recipes", JSON.stringify(recipes));
      navigate("/recipes");
    } catch (error) {
      dispatch(
        setToast({ status: "failure", displayMessage: JSON.stringify(error) })
      );
    }
  };

  return (
    <>
      <div className="preference-container">
        <h3>Whats your pick?</h3>
        {PREFERENCES.map(({ name: preferenceName, options }) => {
          return (
            <div key={preferenceName}>
              <h2 className="preference-heading">{preferenceName}</h2>
              <div className="preference-tags-container">
                {options.map(({ name: optionName, value }) => {
                  const isOptionIncluded =
                    preferences[preferenceName].includes(value);
                  return (
                    <button
                      key={value}
                      className={`${
                        isOptionIncluded ? "selected-tag" : "preference-tag"
                      }`}
                      onClick={() => handleClick({ preferenceName, value })}
                    >
                      {optionName}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <Button text={"Get Recipes"} onClickEvent={handleSearch} className="get-recipes-btn" />
    </>
  );
};

export default Search;
