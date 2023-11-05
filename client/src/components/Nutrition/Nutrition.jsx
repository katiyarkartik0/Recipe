import "./Nutrition.css";
const Nutrition = ({
  nutrient: { name = "", unit = "", amount = "", percentOfDailyNeeds = "" },
}) => {
  return (
    <>
      <tr>
        <td className="nutrition-data">{name}</td>
        <td className="nutrition-data">{unit}</td>
        <td className="nutrition-data">{amount}</td>
        <td className="nutrition-data">{percentOfDailyNeeds}</td>
      </tr>
    </>
  );
};

export default Nutrition;
