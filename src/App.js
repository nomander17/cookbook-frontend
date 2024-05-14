import Admin from "./pages/Admin/Admin";
import { Home } from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostPage from "./pages/Posts/PostPage";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import { AuthUserProvider } from "./context/AuthUserContext";

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
              {/* <Route path="/home" element={<Home />}></Route> */}
              {/* Secure these two later */}
              <Route path="/posts/:postId" element={<PostPage />}></Route>
              <Route path="/admin" element={<Admin />}></Route>
            </Routes>
          </BrowserRouter>
        </AuthUserProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
