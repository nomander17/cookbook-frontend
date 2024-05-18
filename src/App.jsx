import Admin from "./pages/Admin/Admin";
import { Home } from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostPage from "./pages/Posts/PostPage";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import { AuthUserProvider } from "./context/AuthUserContext";
import Profile from "./pages/Profile/Profile";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: false,
});

function App() {
  return (
    <div id="App">
      <AuthProvider store={store}>
        <AuthUserProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />}></Route>
              <Route
                path="/home"
                element={
                  <RequireAuth fallbackPath={"/"}>
                    <Home />
                  </RequireAuth>
                }
              />
              <Route
                path="/posts/:postId"
                element={
                  <RequireAuth fallbackPath={"/"}>
                    <PostPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin"
                element={
                  <RequireAuth fallbackPath={"/"}>
                    <Admin />
                  </RequireAuth>
                }
              />
              <Route
                path="/profile"
                element={
                  <RequireAuth fallbackPath={"/"}>
                    <Profile />
                  </RequireAuth>
                }
              />
            </Routes>
          </BrowserRouter>
        </AuthUserProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
