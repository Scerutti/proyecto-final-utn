import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "./login.css"
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

interface User {
  email: string;
  password: string;
}

const Login: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<User>({
    email:"",
    password:"",
  });
  const auth = getAuth();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    signInWithEmailAndPassword(auth,user.email, user.password)
    .then((userCredential)=>{

      toast.success("Inicio correcto",{draggable: false, hideProgressBar: true, autoClose: 2000});

      navigate("/")
    })
    .catch((error) => {
      const errorCode = error.code;
      toast.error(`${error.message} - ${errorCode}`,
      { draggable: false, hideProgressBar: true, autoClose: 2000 })
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof User) => {
    setUser({
      ...user,
      [field]: event.target.value,
    });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" onChange={(e) => handleInputChange(e,"email")} autoComplete='username' required/>

        <label htmlFor="contrasena">Contraseña:</label>
        <input type="password" id="contrasena" onChange={(e) => handleInputChange(e, "password")} autoComplete='current-password' required/>

        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
