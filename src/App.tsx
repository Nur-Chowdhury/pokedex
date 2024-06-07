import React, { useEffect } from 'react'
import Navbar from './sections/Navbar'
import Footer from './sections/Footer'
import Background from './Components/Background'
import "./scss/index.scss";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import Search from './Pages/Search'
import MyList from './Pages/MyList'
import About from './Pages/About'
import Compare from './Pages/Compare'
import Pokemon from './Pages/Pokemon'
import "react-toastify/dist/ReactToastify.css"
import { useAppDispatch, useAppSelector } from './app/hooks'
import { ToastContainer, ToastOptions, toast } from 'react-toastify'
import { clearToasts, setUserStatus } from './app/slices/AppSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from './utils/FirebaseConfig'

function App() {

  const { toasts } = useAppSelector(({ app }) => app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      //console.log(currentUser);
      if (currentUser) {
        dispatch(setUserStatus({ email: currentUser.email as string }));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if(toasts.length){
      const toastOption: ToastOptions ={
        position: "bottom-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      }
      toasts.forEach((message: string) => {
        toast(message, toastOption);
      });
      dispatch(clearToasts());
    }
  },[toasts, dispatch])

  return (
    <div className='main-container'>
      <Background />
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <Routes>
            <Route element={<Search />} path='/search' />
            <Route element={<MyList />} path='/list' />
            <Route element={<About />} path='/about' />
            <Route element={<Compare />} path='/compare' />
            <Route element={<Pokemon />} path='/pokemon/:id' />
            <Route element={<Navigate to={"/pokemon/1"} />} path='*' />
          </Routes>
          <Footer />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
