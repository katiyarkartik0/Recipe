import React from "react";
import "./Search.css"; // Import your CSS file
import { PREFERENCES } from "helpers/constants";

const Search = () => {
  return (
    <div className="card">
      {PREFERENCES.map(({ name, options }) => {
        return (
          <>
            <h2 className="card-heading">{name}</h2>
            <div className="tags">
              {options.map(({ name: optionName, value }) => {
                return <span className="tag">{optionName}</span>;
              })}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Search;
