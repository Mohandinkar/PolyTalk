import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage.jsx";
import { Navigate, Route } from "react-router";
import { Routes } from "react-router";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import PageLoader from "./components/PageLoader.jsx";
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "./store/useThemeStore.js";
import ChatPage from "./pages/ChatPage.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import CallPage from "./pages/CallPage.jsx";
import FriendPage from "./pages/FriendPage.jsx";

const App = () => {
  //custom hook to get auth user
  const { isLoading, authUser } = useAuthUser();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  const {theme} = useThemeStore();
  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className=" h-screen" data-theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
              
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <SignupPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />}
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <NotificationPage />
              </Layout>
            ) : (<Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />)
          }
        />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/chat/:id" element={
          isAuthenticated && isOnboarded ? (
            <Layout showSidebar={false}>
              <ChatPage/>
            </Layout>
          ) :(
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )
        }/>

        <Route path="/call/:id" element={
          isAuthenticated && isOnboarded ? (
            <Layout showSidebar={false}>
             <CallPage/>
            </Layout>
          ) :(
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )
        }/>

        <Route path="/friends" element={
          isAuthenticated && isOnboarded ? (
            <Layout showSidebar={true}>
              <FriendPage/>
            </Layout>
          ):(
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )
        } />

      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
