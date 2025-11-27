import React from "react";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios";
import HomePage from "./pages/HomePage";
import { Navigate, Route } from "react-router";
import { Routes } from "react-router";
import SignupPage from "./pages/signupPage";
import LoginPage from "./pages/loginPage";
import NotificationPage from "./pages/NotificationPage";
import OnboardingPage from "./pages/OnboardingPage";


const App = () => {

  const {data:authData, reloading, error} = useQuery({
      queryKey: ['authUser'],
      queryFn:async()=>{
        const res = await axiosInstance.get('/auth/me');
        return res.data;
      },
      retry: false,
    })
    
    const authUser = authData?.user;

  return (

    <div className=" h-screen" data-theme="halloween">
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser ? <SignupPage/>: <Navigate to="/"/>}/>
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/"/>} />
        <Route path="/notifications" element={authUser ? <NotificationPage />: <Navigate to="/login"/>} />
        <Route path="/onboarding" element={authUser ? <OnboardingPage />: <Navigate to="/login"/>} />
      </Routes>
      <Toaster/>
    </div>
  );
};

export default App;
