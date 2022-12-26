import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import Login from "../Login";
import Home from "./home";
import "./index.scss"

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    })
  }, [])
  return (
    <div>
      {user ? <Home /> : <Login />}
    </div>
  )
}

export default Dashboard;