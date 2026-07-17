import axios from "axios";
const Register = () => {
  const register = async (formData) => {
    const firstname = formData.get("first-name");
    const lastname = formData.get("last-name");
    const email = formData.get("email");
    const password = formData.get("password");
    const user = {
      firstname,
      lastname,
      email,
      password,
    };
    try {
      const { data } = await axios.post(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",
        user,
      );

      console.log(data);
    } catch (error) {
      console.error(error);
      console.log(error.response.data);
    }
  };
  return (
    <div>
      <form action={register}>
        <label>
          First Name:
          <input type="text" name="first-name" />
        </label>
        <label>
          Last Name:
          <input type="text" name="last-name" />
        </label>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
export default Register;
