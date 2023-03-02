import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";

export const NavBar = () => {
    
  const { user } = useAuthValue();
  console.log(user? "O usuário está chegando no NavBar" : "Não há usuário no NavBar")
  console.log( user )

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        Mini <span>Blog</span>
      </NavLink>
      <ul className={styles.links_list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : " ")}
          >
            Home
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : " ")}
              >
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? styles.active : " ")}
              >
                Cadastrar
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink to="/posts/create"
              className={({ isActive }) => (isActive ? styles.active : " ")}>
                Novo Post
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard"
              className={({ isActive }) => (isActive ? styles.active : " ")}>
                Dashboard
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : " ")}
          >
            Sobre
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
