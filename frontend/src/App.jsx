import React from "react";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios";
import HomePage from "./pages/HomePage";
import { Route } from "react-router";
import { Routes } from "react-router";

const App = () => {

  const {data:authData, reloading, error} = useQuery({
      queryKey: ['authUser'],
      queryFn:async()=>{
        const res = await axiosInstance.get('/auth/me');
        return res.data;
      }
    })
    
    const authUser = authData?.user;

  return (

    <div className=" h-screen" data-theme="halloween">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<loginPage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Routes>
      <Toaster/>
    </div>
  );
};

export default App;
