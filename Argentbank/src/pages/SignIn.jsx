import React from "react";
import Form from "../components/Form";

const SignIn = () => {
   return (
      <main class="main bg-dark">
         <section class="sign-in-content">
            <i class="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <Form />
         </section>
      </main>
   );
};

export default SignIn;
