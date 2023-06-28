import { NavLink,Outlet,Link } from "react-router-dom";
import BreadCrums from "./BreadCrums";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
export default function Navbar() {
  const { logout } = useLogout()

  const { user } = useAuthContext()

  const handleLogout = () => {
    logout()
  }


  return (
    <div className='navbar'>
      <header>
        <nav>
          <h1>
            <Link to='/'> Recipes </Link>
          </h1>
          {user && (<div className="link">
            <NavLink to='/'> Home </NavLink>
            <NavLink to='about'>About</NavLink>
            <NavLink to='help'>Help</NavLink>
            <NavLink to='recipes'>Recipes</NavLink>

            <div>
              <span>{user.user.email}</span>
              <button onClick={handleLogout}>LogOut</button>
            </div>
          </div>)}

          {!user && <NavLink to='login'>Login</NavLink>}
        </nav>
        <BreadCrums />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
