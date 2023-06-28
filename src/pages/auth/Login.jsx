import { Form, Link, NavLink, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/Authcontext";
import { useContext, useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import Spinner from "../../Components/Spinner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);
  const {login ,error,isLoading } = useLogin()

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email,password)
  }

  return (
    <div className='login'>
      {isLoading? <Spinner/>:(<>
        <h3>Login</h3>
        <form method='post' onSubmit={handleLogin}>
          <label>
            <span>Your email:</span>
            <input
              type='email'
              name='email'
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
          <label>
            <span>Your password:</span>
            <input
              name='password'
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
          <button disabled={isLoading}>Submit</button>
          {error && <div>{error}</div>}
        </form>
        <p>
          Don't have an acoount? then,
          <Link to='/register'>Register Here</Link>
        </p>
      </>)}
    </div>
  );
}

export default Login;
