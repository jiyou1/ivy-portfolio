import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CaseStudy from "./pages/CaseStudy";
import IcoiCaseStudy from "./pages/IcoiCaseStudy";
import LatteLearnCaseStudy from "./pages/LatteLearnCaseStudy";
import RoomieTaskCaseStudy from "./pages/RoomieTaskCaseStudy";
import DesignathonCaseStudy from "./pages/DesignathonCaseStudy";
import Playground from "./pages/Playground";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/work/prime-academy" element={<CaseStudy slug="prime-academy" />} />
      <Route path="/work/icoi" element={<IcoiCaseStudy />} />
      <Route path="/work/lattelearn" element={<LatteLearnCaseStudy />} />
      <Route path="/work/roomietask" element={<RoomieTaskCaseStudy />} />
      <Route path="/work/designathon" element={<DesignathonCaseStudy />} />
      <Route path="/playground" element={<Playground />} />
    </Routes>
  );
}
