import React, { useState } from "react";
import "./Search.css"; // Import your CSS file
import { PREFERENCES } from "helpers/constants";
import Button from "components/Button/Button";

const Search = () => {
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

  return (
    <>
      <div className="card">
        {PREFERENCES.map(({ name: preferenceName, options }) => {
          return (
            <div key={preferenceName}>
              <h2 className="card-heading">{preferenceName}</h2>
              <div className="tags">
                {options.map(({ name: optionName, value }) => {
                  return (
                    <button
                      key={value}
                      className="tag"
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
      <Button text={"Get Recipes"} />
    </>
  );
};

export default Search;
