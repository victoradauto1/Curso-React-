import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { About } from "./pages/About/About";
import { Register } from "./pages/Register/Register";
import { NavBar } from "./components/NavBar/NavBar";
import { Footer } from "./components/Footer/Footer";
import { Login } from "./pages/Login/Login";

import { AuthProvider } from "./context/AuthContext";

import { onAuthStateChanged } from "firebase/auth";

import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";
import { CreatePost } from "./pages/CreatePost/CreatePost";
import { Dashboard } from "./pages/Dashboard/Dashboard";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando ...</p>;
  }

  console.log(user? "está logado": "sem usuário logado")

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider value={{user}}>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login"  element={!user? <Login /> : <Navigate to="/" />}/>
              <Route path="/register" element={!user? <Register /> : <Navigate to="/" />}/>
              <Route path="/posts/create" element={user? <CreatePost/> : <Navigate to="login" />}/>
              <Route path="/dashboard" element={user? <Dashboard/> : <Navigate to="login" />}/>
            </Routes>
          </div>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
