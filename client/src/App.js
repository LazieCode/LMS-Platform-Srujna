import './App.css';
import Signin from "./Components/signin";
import Signup from "./Components/signup";
import AdminLogin from "./Components/adminLogin";
import Dashboard from "./Components/dashboard/Dashboard";
import Redirect from "./Components/redirect";
import Blog from "./Components/blog/Blog";
import SuperLady from "./Components/superLady";
import CreateCourse from "./Components/createCourse";
import AdminPage from './Components/adminPage';
import Marking from "./Components/marking"
import Feedback from "./Components/feedback";
import { Link, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>

      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="redirect" element={<Redirect />} />
        <Route path="blog" element={<Blog />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="superLady" element={<SuperLady />} />
        <Route path="/create" element={<CreateCourse />} />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/marking" element={<Marking />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>

    </div>

  );
}

export default App;
