import "./Instruction.css";

const Instruction = ({ ingredients = [], equipment = [], step = "" }) => {
  return (
    <div className="instruction">
      {ingredients.length > 0 && (
        <>
          <h3 className="instruction-detail-heading">Ingredients</h3>
          <ul className="instruction-detail-item">
            {ingredients.map(({ name }) => {
              return <li className="ingredient-list tag tag-blue">{name}</li>;
            })}
          </ul>
        </>
      )}
      {equipment.length > 0 && (
        <>
          {" "}
          <h3 className="instruction-detail-heading">Equipments</h3>
          <ul className="instruction-detail-item">
            {equipment.map(({ name }) => {
              return <li className="ingredient-list tag tag-blue">{name}</li>;
            })}
          </ul>
        </>
      )}
      <h3 className="instruction-detail-heading">Step</h3>
      <p className="step-content">{step}</p>
    </div>
  );
};

export default Instruction;
