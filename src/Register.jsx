import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
  } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { App, Auth } from "./FirebaseApp";
import { collection,
    getDocs, getFirestore, 
    addDoc, query, where } from "firebase/firestore";
import './App.css'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
function Register() {
    const app = App();
    const auth = Auth();
    const db = getFirestore(app);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();

    const registerWithEmailAndPassword = async (n, e, password) => {
        try {
          const res = await createUserWithEmailAndPassword(auth, e, password);
          updateProfile(auth.currentUser, {
            displayName: n
          })
          console.log("added user")
        } catch (err) {
          console.error(err);
          alert(err.message);
        }
      };
    const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
          }
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };
    const register = async () => {
      if (!name) alert("Please enter name");
      await registerWithEmailAndPassword(name, email, password);
    };
    useEffect(() => {
      if (loading) return;
      if (user) navigate("/app");
    }, [user, loading]);
    
    return (
      <div className="register">
        <div className="register__container">
          <input
            type="text"
            className="register__textBox"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
          <input
            type="text"
            className="register__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            className="register__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="register__btn" onClick={register}>
            Register
          </button>
          <button
            className="register__btn register__google"
            onClick={signInWithGoogle}
          >
            Register with Google
          </button>
          <div>
            Already have an account? <Link to="/">Login</Link> now.
          </div>
        </div>
      </div>
    );
  }
export default Register;
