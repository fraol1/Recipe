import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./Components/Navbar";
import Faq from "./pages/help/Faq";
import Contact from "./pages/help/Contact";
import HelpLayout from "./Components/HelpLayout";
import Recipes, { recipesLoader } from "./pages/recipes/Recipes";
import RecipesLayout from "./Components/RecipesLayout";
import RecipesDetails, {
  recipesDetailsLoader,
} from "./pages/recipes/RecipesDetails";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Navbar />}>
        <Route
          index
          element={user ? <Home /> : <Navigate to='/login' replace={true} />}
        />
        <Route path='about' element={<About />} />
        <Route
          path='help'
          element={user ? <HelpLayout /> : <Navigate to='/login' replace={true} />}>
          <Route path='faq' element={<Faq />}></Route>
          <Route path='contact' element={<Contact />}></Route>
        </Route>
        <Route
          path='recipes'
          element={
            user ? <RecipesLayout /> : <Navigate to='/login' replace={true} />
          }>
          <Route index element={<Recipes />} loader={recipesLoader} />
          <Route
            path=':id'
            loader={recipesDetailsLoader}
            element={<RecipesDetails />}
          />
        </Route>
        <Route
          path='login'
          element={!user ? <Login /> : <Navigate to='/' replace={true} />}
        />
        <Route
          path='register'
          element={
            !user ? <Registration /> : <Navigate to='/' replace={true} />
          }
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
