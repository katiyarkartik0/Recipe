import "./Nutrition.css"
const Nutrition = ({
  nutrient: { name = "", unit = "", amount = "", percentOfDailyNeeds = "" },
}) => {
  return (
    <>
      <tr >
        <td>{name}</td>
        <td>{unit}</td>
        <td>{amount}</td>
        <td>{percentOfDailyNeeds}</td>
      </tr>
    </>
  );
};

export default Nutrition;
