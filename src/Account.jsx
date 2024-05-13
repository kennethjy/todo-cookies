import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS for styling
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signOut } from 'firebase/auth';
import { App, Auth } from './FirebaseApp';
import { collection, getFirestore, query, where, getDocs, getDoc, deleteDoc} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';



function AccountDrawer(){
    const [isOpen, setIsOpen] = useState(false);
    const auth = Auth();
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);
    const db = getFirestore(App());

    useEffect(() => {
      if (!user) {
        navigate("/");
      }
    }, [user, loading, navigate]);
    useEffect(() => {
    if (!user) {
        navigate("/");
    }
    }, []);
    const toggleDrawer = () => {
      setIsOpen(!isOpen);
    }; 

    const logout = () => {
        signOut(Auth());
        navigate("/");
    }

    const deleteAccount = async () => {
        await auth.currentUser.delete();
        logout();
        navigate("/");

    }
    
    return (
      <div>
        <button onClick={toggleDrawer} className="openBtn">Account</button>
        <div className={`drawer ${isOpen ? 'active' : ''}`}>
          <h1>{user?user.displayName:""}</h1>
          <p>{user?user.email:""}</p>
          <button onClick={logout} className="closeBtn">Sign Out</button>
          <p></p>
          <button onClick={deleteAccount} className="closeBtn del">Delete Account</button>
        </div>
        <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={toggleDrawer}></div>
      </div>
    );
};

export default AccountDrawer;
