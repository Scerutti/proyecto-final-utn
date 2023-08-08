import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import NavBar from "./pages/navbar/NavBar";
import Registro from "./pages/registro/Registro";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import React from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./shared/firebaseConfig";

function App() {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user)=> {
      setUser(user)
    });
    return () => {
      unsubscribe();
    };
  },[])

  return (
    <BrowserRouter>
      <NavBar user={user} />
      <Routes>
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        {user ? <Route path="/" element={<Home />} /> : <Route path="/" element={<Navigate to="/login" />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;