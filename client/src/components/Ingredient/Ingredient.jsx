import "./Ingredient.css";

const Ingredient = ({
  ingredient: {
    name = "",
    amount: { metric: { unit = "", value = "" } = {} } = {},
  },
}) => {
  return (
    <tr>
      <td className="ingredient-data">{name}</td>
      <td className="ingredient-data">{unit}</td>
      <td className="ingredient-data">{value}</td>
    </tr>
  );
};

export default Ingredient;
