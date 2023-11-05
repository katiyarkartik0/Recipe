import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPreferences, setRecipes } from "store/slices/recipes";
import { setToast } from "store/slices/toast";

import Button from "components/Button/Button";

import { getRecipes } from "api/recipe";

import { selectAccessToken } from "helpers/selector";
import { PREFERENCES } from "helpers/constants";

import "./Search.css";
import { isEqualStrings } from "helpers/validator";

const Search = () => {
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPreference, setCurrentPreference] = useState({
    diet: [],
    intolerances: [],
    cuisine: [],
  });

  const handleClick = ({ preferenceName, value }) => {
    const preference = currentPreference[preferenceName];
    if (preference.includes(value)) {
      const updatedPreferences = preference.filter((option) =>
        !(isEqualStrings([option, value]))
      );
      setCurrentPreference({
        ...currentPreference,
        [preferenceName]: updatedPreferences,
      });
      dispatch(
        setPreferences({
          preferences: {
            ...currentPreference,
            [preferenceName]: updatedPreferences,
          },
        })
      );
    } else {
      const updatedPreferences = [...preference, value];
      setCurrentPreference({
        ...currentPreference,
        [preferenceName]: updatedPreferences,
      });
      dispatch(
        setPreferences({
          preferences: {
            ...currentPreference,
            [preferenceName]: updatedPreferences,
          },
        })
      );
    }
  };

  const handleSearch = async () => {
    try {
      const response = await getRecipes({
        accessToken,
        preferences: currentPreference,
      });

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
                    currentPreference[preferenceName].includes(value);
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
      <Button
        text={"Get Recipes"}
        onClickEvent={handleSearch}
        className="get-recipes-btn"
      />
    </>
  );
};

export default Search;
