import {Link } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm.jsx";


const SignupPage = () => {
  

  return (
 
      <div className="container">
        <div>
          <h2 className="title">{("signin.signup")}</h2>
          <AuthForm/>
         
          <Link className="auth-link" to="/signin">
            {("signin.title")}
          </Link>
        </div>
      </div>
    
  );
};

export default SignupPage;

export default SignupPage;
