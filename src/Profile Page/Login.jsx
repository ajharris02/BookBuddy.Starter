import axios from "axios";
import { useNavigate } from "react-router";

const Login = ({ setError, error, authenticate, setToken }) => {
  const navigate = useNavigate();

  const login = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    const user = {
      email,
      password,
    };
    try {
      const { data } = await axios.post(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",
        user,
      );
      window.localStorage.setItem("token", data.token);
      setToken(data.token);
      authenticate();
      setError("");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h3>Please log in.</h3>
      <form action={login}>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div>{error === 401 ? <p>Inccorect Credentials.</p> : null}</div>
    </div>
  );
};

export default Login;
