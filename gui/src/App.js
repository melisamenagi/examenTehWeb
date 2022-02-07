import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FavouriteList from "./components/FavouriteList";
import VideosList from "./components/VideosList";

function App() {
  return (
    <Router>
      {/* <h1>Examen Menagi Daria-Melisa</h1> */}
      <Routes>
        <Route path='/' element={<FavouriteList />}></Route>
        <Route path='/:id/videos' element={<VideosList />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
