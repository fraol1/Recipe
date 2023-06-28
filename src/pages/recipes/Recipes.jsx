import { useLoaderData,Link } from "react-router-dom";

function Recipes() {
  const result = useLoaderData()
  const recipes = Object.values(result);

  return (
    <div className='recipes'>
      {recipes.map((recipe) => (
        <Link to={recipe.id.toString()} key={recipe.id}>
          <p>{recipe.name}</p>
        </Link>
      ))}
    </div>
  );
}

export const recipesLoader = async () => {
    const res = await fetch("http://localhost:3000/recipes");
    return res.json()
}

export default Recipes