import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CaseStudy from "./pages/CaseStudy";
import ArticlePage from "./pages/ArticlePage";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<CaseStudy />} />
        <Route path="/blog/:slug" element={<ArticlePage />} />
      </Routes>
    </BrowserRouter>
  );
}