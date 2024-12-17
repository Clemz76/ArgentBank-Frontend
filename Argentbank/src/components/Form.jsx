import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Form = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;

      try {
         const loginResponse = await axios.post(
            "http://localhost:3001/api/v1/user/login",
            { email, password }
         );

         const token = loginResponse.data.body.token;

         const profileResponse = await axios.get(
            "http://localhost:3001/api/v1/user/profile",
            {
               headers: { Authorization: `Bearer ${token}` },
            }
         );

         const user = profileResponse.data.body;

         dispatch(loginSuccess({ token, user }));

         navigate("/profile");
      } catch (error) {
         console.error("Login failed:", error.message);
         alert("Invalid email or password");
      }
   };

   return (
      <form onSubmit={handleSubmit}>
         <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" required />
         </div>
         <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
         </div>
         <button type="submit" className="sign-in-button">
            Sign In
         </button>
      </form>
   );
};

export default Form;
