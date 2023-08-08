import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import "./registro.css"

interface UserDTO {
  name:string,
  email: string;
  password: string;
  confirmPassword: string;
}

const Registro = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<UserDTO>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = React.useState<string>('');

  const auth = getAuth();


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (user.password !== user.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    createUserWithEmailAndPassword(auth, user.email, user.password)
    .then(()=> {
      toast.success("Registro exitoso", { draggable: false, hideProgressBar: true, autoClose: 2000 });
      setError("");
      navigate("/login");
    })
    .catch((error) => {
      const errorCode = error.code;
      setError('Error al registrar usuario: ' + error.message + `Codigo de error ${errorCode}`)
    })
  };


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof UserDTO) => {
    setUser({
      ...user,
      [field]: event.target.value,
    });
  };

  return (
    <div className="registro-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" onChange={(e) => handleInputChange(e,"name")} autoComplete='username' required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" onChange={(e) => handleInputChange(e, "email")} autoComplete='email' required />

        <label htmlFor="contrasena">Contraseña:</label>
        <input type="password" id="contrasena" onChange={(e) => handleInputChange(e, "password")} autoComplete='new-password' required />
        
        <label htmlFor="contrasena">Confirmar contraseña:</label>
        <input type="password" id="contrasena" onChange={(e) => handleInputChange(e, "confirmPassword")} autoComplete='new-password' required />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;
