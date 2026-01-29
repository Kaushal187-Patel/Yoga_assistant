import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Auth from "./pages/Auth";
import BasicWarmupExercises from "./pages/BasicWarmupExercises";
import CategoryDetail from "./pages/CategoryDetail";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import PoseDetail from "./pages/PoseDetail";
import PoseDetection from "./pages/PoseDetection";
import Profile from "./pages/Profile";
import ProjectInfo from "./pages/ProjectInfo";
import Team from "./pages/Team";
import "./styles/index.css";

// Preloader Component
const Preloader: React.FC<{ isLoading: boolean }> = ({ isLoading }) => (
  <div className={`preloader ${!isLoading ? "hidden" : ""}`}>
    <div className="loader">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Preloader effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Scroll animation observer - triggers on both scroll up and down
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50px 0px",
      threshold: 0.15,
    };

    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add visible class when entering viewport
          entry.target.classList.add("visible");
          entry.target.classList.remove("hidden");
        } else {
          // Remove visible class when leaving viewport (for re-animation)
          entry.target.classList.remove("visible");
          entry.target.classList.add("hidden");
        }
      });
    }, observerOptions);

    const animationSelectors =
      ".scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale, .stagger-children, .fade-up, .fade-down, .fade-left, .fade-right, .zoom-in";

    // Function to observe elements
    const observeElements = () => {
      const animateElements = document.querySelectorAll(animationSelectors);
      animateElements.forEach((el) => {
        if (!el.hasAttribute("data-observed")) {
          el.setAttribute("data-observed", "true");
          intersectionObserver.observe(el);
        }
      });
    };

    // Initial observation
    observeElements();

    // MutationObserver to watch for new elements (like tab content)
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [location.pathname]);

  return (
    <>
      <Preloader isLoading={isLoading} />
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/project-info" element={<ProjectInfo />} />
            <Route path="/pose-detection" element={<PoseDetection />} />
            <Route path="/pose/:poseId" element={<PoseDetail />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/category/:categoryId" element={<CategoryDetail />} />
            <Route
              path="/warmup-exercises"
              element={<BasicWarmupExercises />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
