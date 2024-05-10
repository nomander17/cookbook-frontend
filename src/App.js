import Admin from "./pages/Admin/Admin";
import { Home } from "./pages/Home/Home";
import PostPage from "./pages/Home/PostPage";
import Landing from "./pages/Landing/Landing";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div id="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/admin" element={<Admin/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/posts/:postId" element={<PostPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
