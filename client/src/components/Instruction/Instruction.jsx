import "./Instruction.css"

const Instruction = ({ ingredients = [], equipment = [], step = "" }) => {
  return (
    <div className="instruction">
      {ingredients.length > 0 && (
        <>
          <h3>Ingredients</h3>
          <ul>
            {ingredients.map(({ name }) => {
              return <li>{name}</li>;
            })}
          </ul>
        </>
      )}
      {equipment.length > 0 && (
        <>
          {" "}
          <h3>Equipments</h3>
          <ul>
            {equipment.map(({ name }) => {
              return <li>{name}</li>;
            })}
          </ul>
        </>
      )}
      <h3>Step</h3>
      <p>{step}</p>
    </div>
  );
};

export default Instruction;
