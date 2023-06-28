import { Outlet } from "react-router-dom";
function RecipesLayout() {
  return (
    <div className='careers-layout'>
      <h2>recipes</h2>
      <Outlet />
    </div>
  );
}

export default RecipesLayout