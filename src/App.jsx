import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import IcoiCaseStudy from "./pages/IcoiCaseStudy";
import LatteLearnCaseStudy from "./pages/LatteLearnCaseStudy";
import RoomieTaskCaseStudy from "./pages/RoomieTaskCaseStudy";
import DesignathonCaseStudy from "./pages/DesignathonCaseStudy";
import Playground from "./pages/Playground";
import FocusScreen from "./components/lattelearn/FocusScreen";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/work/icoi" element={<IcoiCaseStudy />} />
      <Route path="/work/lattelearn" element={<LatteLearnCaseStudy />} />
      <Route path="/work/roomietask" element={<RoomieTaskCaseStudy />} />
      <Route path="/work/designathon" element={<DesignathonCaseStudy />} />
      <Route path="/playground" element={<Playground />} />
      <Route path="/playground/lattelearn-focus" element={<FocusScreen />} />
    </Routes>
  );
}
