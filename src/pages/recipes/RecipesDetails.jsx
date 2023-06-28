import { useLoaderData, useParams } from "react-router-dom"


function RecipesDetails() {
    const {id} = useParams()
    const recipe = useLoaderData()
    const recipes = Object.values(recipe);
    const RecipeDetails = recipes[parseInt(id) - 1];

    if (!RecipeDetails) {
      return <div>Error: Recipe not found</div>;
    }
    const Ingridients = RecipeDetails.ingredients;
    const Instructions = RecipeDetails.instructions;
  return (
    <div>
      <h2>{RecipeDetails.name}</h2>
      <p>Ingridients</p>
      <ol>
        {Ingridients.map((Ingridient, index) => (
          <li key={index}>{Ingridient}</li>
        ))}
      </ol>

      <p>Instructions</p>
      <ol>
        {Instructions.map((Instruction, index) => (
          <li key={index}>{Instruction}</li>
        ))}
      </ol>
    </div>
  );
}

export const recipesDetailsLoader = async ({ params }) => {
  const { id } = params;
  const res = await fetch("http://localhost:3000/recipes/");
  return res.json();
};

export default RecipesDetails