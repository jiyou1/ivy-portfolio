import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import IcoiCaseStudy from "./pages/IcoiCaseStudy";
import LatteLearnCaseStudy from "./pages/LatteLearnCaseStudy";
import RoomieTaskCaseStudy from "./pages/RoomieTaskCaseStudy";
import DesignathonCaseStudy from "./pages/DesignathonCaseStudy";
import Playground from "./pages/Playground";
import Brewing from "./pages/Brewing";
import FocusScreen from "./components/lattelearn/FocusScreen";
import { PROJECTS } from "./data/projects";

const isBrewing = (slug) => !!PROJECTS.find((p) => p.slug === slug)?.brewing;

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/work/icoi" element={<IcoiCaseStudy />} />
      <Route path="/work/lattelearn" element={<LatteLearnCaseStudy />} />
      <Route path="/work/roomietask" element={<RoomieTaskCaseStudy />} />
      <Route
        path="/work/designathon"
        element={isBrewing("designathon") ? <Brewing /> : <DesignathonCaseStudy />}
      />
      <Route path="/playground" element={<Playground />} />
      <Route path="/playground/lattelearn-focus" element={<FocusScreen />} />
    </Routes>
  );
}
