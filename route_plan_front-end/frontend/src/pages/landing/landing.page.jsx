import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import "./landing.page.styles.scss";
import { NavLink } from "react-router-dom";

const { Footer } = Layout;

const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const navLinks = document.querySelectorAll(".nav-link");

      let currentSectionIndex = 0;
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentSectionIndex = index;
        }
      });

      navLinks.forEach((link) => link.classList.remove("active"));
      navLinks[currentSectionIndex]?.classList.add("active");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="neubrutalism">
      <nav className="navbar">
        <div className="container">
          {" "}
          <div className="logo">SILog.</div>
          <div className="hamburger" onClick={toggleMobileMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
            <li>
              <a href="#home" className="nav-link">
                Home
              </a>
            </li>
            <li>
              <a href="#features" className="nav-link">
                Features
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="nav-link">
                How It Works
              </a>
            </li>
            <li>
              <a href="#testimonials" className="nav-link">
                Testimonials
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-link">
                Contact
              </a>
            </li>
            <li className="start-trial">
              <a href="#" className="nav-link">
                Start Trial
              </a>
            </li>

            <li className="login">
              <NavLink to="/login" className="navlink" activeClassName="active">
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <section id="hero" className="hero-section">
        <div className="hero-content">
          <h1>
            POWER UP YOUR <br /> FIELD OPERATIONS
          </h1>
          <p>
            Empower your field team with intelligent route planning and
            merchandising tools
          </p>
          <button className="cta-button">START FREE TRIAL →</button>
        </div>
        <div className="hero-shapes">
          <div className="shape-1"></div>
          <div className="shape-2"></div>
        </div>
      </section>

      <section id="features" className="features-section">
        <h2>AWESOME FEATURES</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Smart Merchandiser Management</h3>
            <p>
              Effortlessly track your merchandisers' performance, optimize their
              schedules, and improve team communication
            </p>
          </div>
          <div className="feature-card">
            <h3>Real-time Outlet Insights</h3>
            <p>
              Gain real-time insights into outlet activity, monitor stock
              levels, and identify opportunities to increase sales
            </p>
          </div>
          <div className="feature-card">
            <h3>Intelligent Route Optimization</h3>
            <p>
              Plan the most efficient routes, reduce travel time, and maximize
              the number of customer visits
            </p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works">
        <h2>HOW IT WORKS</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Set Up Your Team</h3>
            <p>
              Add your merchandisers and assign their territories in minutes
            </p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Plan Routes</h3>
            <p>Optimal routes for maximum effeciency</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Track & Optimize</h3>
            <p>
              Monitor performance and make data-driven decisions to improve
              results
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>READY TO START?</h2>
        <button className="cta-button">GET STARTED →</button>
      </section>

      <Footer style={{ textAlign: "center" }}>
        SILog. <br /> © {new Date().getFullYear()} - Transforming Field Sales
        Operations
      </Footer>
    </main>
  );
};

export default LandingPage;
