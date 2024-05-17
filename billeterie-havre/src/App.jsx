import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import Admin from "./pages/Admin";
import AddEvent from "./pages/events/eventAdd";
import ListEvent from "./pages/events/eventList";
import EditEvent from "./pages/events/eventModify";
import EditEventId from "./pages/events/eventModifyApp";
import Home from "./pages/Home";
import Calendar from "./components/Calendar";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/events" element={<ListEvent />} />
          <Route path="/events/add" element={<AddEvent />} />
          <Route path="/events/edit" element={<EditEvent />} />
          <Route path="/events/edit/:id" element={<EditEventId />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
