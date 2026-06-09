import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
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
      rootMargin: "-20px 0px",
      threshold: 0.01,
    };

    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add visible class when entering viewport
          entry.target.classList.add("visible");
          entry.target.classList.remove("hidden");
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
          // Fail-safe: keep content visible even if observer misses it.
          el.classList.add("visible");
          el.classList.remove("hidden");
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

  // Global interaction motion effects across the website.
  useEffect(() => {
    const interactiveMotionSelectors = [
      ".btn",
      ".card",
      ".pose-card",
      ".pose-card-clickable",
      ".tip-card",
      ".team-card",
      ".contact-card",
      ".auth-card",
      ".profile-card",
      ".warmup-card",
      ".tech-tag",
      ".tab-btn",
      ".subcategory-filter-btn",
      ".insight-card",
      ".accordion-item",
      ".navbar-logo",
      ".navbar-links a",
      ".navbar-toggle",
      ".social-btn",
      ".feature-item",
      ".additional-card",
      ".requirement-card",
      ".tech-card",
      ".layer-card",
      ".metric-card",
      ".explanation-card",
    ].join(", ");

    const cleanupHandlers: Array<() => void> = [];

    const runMotionClass = (target: HTMLElement, className: string) => {
      target.classList.remove("motion-check-in", "motion-check-out");
      // Force reflow so animation restarts every time.
      void target.offsetWidth;
      target.classList.add(className);
    };

    const bindTarget = (el: Element) => {
      const target = el as HTMLElement;
      if (target.dataset.motionBound === "true") {
        return;
      }

      target.dataset.motionBound = "true";
      target.classList.add("motion-target");
      runMotionClass(target, "motion-check-in");

      const handleEnter = () => {
        runMotionClass(target, "motion-check-in");
      };

      const handleLeave = () => {
        runMotionClass(target, "motion-check-out");
      };

      target.addEventListener("mouseenter", handleEnter);
      target.addEventListener("mouseleave", handleLeave);

      cleanupHandlers.push(() => {
        target.removeEventListener("mouseenter", handleEnter);
        target.removeEventListener("mouseleave", handleLeave);
        target.classList.remove("motion-target", "motion-check-in", "motion-check-out");
        delete target.dataset.motionBound;
      });
    };

    const bindAllTargets = () => {
      document.querySelectorAll(interactiveMotionSelectors).forEach(bindTarget);
    };

    bindAllTargets();

    const motionObserver = new MutationObserver(() => {
      bindAllTargets();
    });

    motionObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      motionObserver.disconnect();
      cleanupHandlers.forEach((cleanup) => cleanup());
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
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
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
