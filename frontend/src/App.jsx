import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import CreateTask from "./pages/CreateTask";
import ListTasks from "./pages/ListTasks";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/create" element={<CreateTask />} /> */}
          <Route path="/" element={<ListTasks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
