import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WordList from "./pages/WordList";
import Navbar from "./components/Navbar";
import Project from "./pages/Project";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/o-projektu" exact element={<Project />} />
          <Route path="/seznam-slov" exact element={<WordList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
