import React from 'react'
import {FcGoogle} from 'react-icons/fc';
import { useAppDispatch } from '../app/hooks';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth, usersRef } from '../utils/FirebaseConfig';
import { addDoc, getDocs, query, where } from 'firebase/firestore';
import { setUserStatus } from '../app/slices/AppSlice';

function Login() {
  const dispatch = useAppDispatch();
    const handleLogin = async () => {
      const provider = new GoogleAuthProvider
      const {
        user: {email, uid},
      } = await signInWithPopup(firebaseAuth, provider);
      if(email) {
        const firestoreQuery = query(usersRef, where("uid", "==", uid));
        const fetchUser = await getDocs(firestoreQuery);
        if(fetchUser.docs.length === 0) {
          await addDoc(usersRef, {uid, email});
        }
        dispatch(setUserStatus({email}));
      }
    };
    
  return (
    <div className='login'>
      <button className='login-btn' onClick={handleLogin}>
        <FcGoogle />
        Login with Google
      </button>
    </div>
  );
}

export default Login;
