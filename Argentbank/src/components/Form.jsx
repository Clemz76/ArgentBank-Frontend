import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom"; // Importer useNavigate
import axios from "axios";

const Form = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate(); // Initialiser useNavigate

   const handleSubmit = async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;

      try {
         const response = await axios.post(
            "http://localhost:3001/api/v1/user/login",
            {
               email,
               password,
            }
         );

         // Dispatch pour mettre à jour Redux
         dispatch(loginSuccess({ token: response.data.body.token }));

         // Redirection vers /users
         navigate("/users");
      } catch (err) {
         console.error("Login failed:", err.message);
         alert("Invalid email or password");
      }
   };

   return (
      <form onSubmit={handleSubmit}>
         <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" />
         </div>
         <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
         </div>
         <button type="submit" className="sign-in-button">
            Sign In
         </button>
      </form>
   );
};

export default Form;
