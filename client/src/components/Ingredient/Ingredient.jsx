import "./Ingredient.css";

const Ingredient = ({
  ingredient: {
    name = "",
    amount: { metric: { unit = "", value = "" } = {} } = {},
  },
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{unit}</td>
      <td>{value}</td>
    </tr>
  );
};

export default Ingredient;
