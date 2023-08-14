import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { User, signOut } from "firebase/auth";
import { auth } from "../../shared/firebaseConfig";
import { toast } from 'react-toastify';



interface NavBarProps{
    user: User | null;
}

const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {
    const navigate = useNavigate();


    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success("Sesión cerrada", { draggable: false, hideProgressBar: true, autoClose: 2000 });
            navigate('/');
        } catch (error) {
            toast.error(`Error al cerrar sesión: ${error} `);
        }
    };


    return (
        <nav className="navbar">
            {props.user ? (
                <div className="nav-right">
                    <button className="nav-button" onClick={handleLogout}>
                        Cerrar Sesión
                    </button>
                </div>
            ) : (
                <div className="nav-right">
                    <button className="nav-button" onClick={() => navigate('/registro')}>
                        Registro
                    </button>
                    <button className="nav-button" onClick={() => navigate('/login')}>
                        Login
                    </button>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
