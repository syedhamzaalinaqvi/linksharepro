import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

// Setup Firebase auth state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User signed in:", user.displayName);
  } else {
    console.log("User signed out");
  }
});

createRoot(document.getElementById("root")!).render(<App />);
