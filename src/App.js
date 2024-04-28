import Admin from "./pages/Admin/Admin";
import Landing from "./pages/Landing/Landing";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div id="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/admin" element={<Admin/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
