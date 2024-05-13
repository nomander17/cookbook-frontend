import Admin from "./pages/Admin/Admin";
import { Home } from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostPage from "./pages/Posts/PostPage";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import RequireAuth from '@auth-kit/react-router/RequireAuth'

const store = createStore({
  authName: "_auth",
  authType: "localstorage",
  cookieSecure: false,
});

function App() {
  return (
    <div id="App">
      <AuthProvider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/home" element={
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
      </AuthProvider>
    </div>
  );
}

export default App;
