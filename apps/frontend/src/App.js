import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Import pages (we'll create these next)
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Games from './pages/Games';
import Extras from './pages/Extras';
import Guestbook from './pages/Guestbook';
import GameDetail from './pages/GameDetail';

// Import Layout component (we'll create this next)
import Layout from './components/common/Layout';
import ErrorBoundary from './components/common/ErrorBoundary';
import { initGA, trackPageView } from './utils/analytics';

function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <PageTracker />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/sobre-mim" element={<About />} />
            <Route path="/games" element={<Games />} />
            <Route path="/extras" element={<Extras />} />
            <Route path="/guestbook" element={<Guestbook />} />
            <Route path="/games/:slug" element={<GameDetail />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
