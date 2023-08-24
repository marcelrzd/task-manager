import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CreateTask from "./pages/CreateTask";
import ListTasks from "./pages/ListTasks";
import Navbar from "./components/NavBar";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/" element={<ListTasks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
