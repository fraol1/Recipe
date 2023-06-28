import { useContext, useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { AuthContext } from "../../context/Authcontext";
import Spinner from "../../Components/Spinner";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);
  const { signup, error, isLoading } = useSignup();

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(name,email, password);
  };

  return (
    <div className='login'>
      { isLoading ? (<Spinner/>):
       ( <>
          <h3>Register</h3>
          <form on onSubmit={handleSignup}>
            <label>
              <span>Your name:</span>
              <input
                type='text'
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </label>
            <label></label>
            <label>
              <span>Your email:</span>
              <input
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </label>
            <label>
              <span>Your password:</span>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required></input>
            </label>
            <button>Submit</button>
          </form>
        </>)
      }
    </div>
  );
}

export default Registration;
