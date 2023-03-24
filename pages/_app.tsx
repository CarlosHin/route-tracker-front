import { useState } from "react";
import { UserContext } from "../components/UserContext";
import "../styles/output.css";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState({
    username: '',
    token: '',
    name: '',
  });
  return <UserContext.Provider value={{ user, setUser }} >
    <Component {...pageProps} />
  </UserContext.Provider>
}
