import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import './App.css';

// Import pages
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Games from './pages/Games';
import Extras from './pages/Extras';
import Guestbook from './pages/Guestbook';
import GameDetail from './pages/GameDetail';
import Recommendations from './pages/Recommendations';
import Shrines from './pages/Shrines';
import ShrineDetail from './pages/ShrineDetail';

// Import Layout component
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

function LayoutWrapper() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <PageTracker />
        <Routes>
          {/* Shrine detail - renderiza SEM o Layout padrão (header/footer) */}
          <Route path="/shrines/:id" element={<ShrineDetail />} />

          {/* Todas as outras rotas - COM Layout padrão */}
          <Route element={<LayoutWrapper />}>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/sobre-mim" element={<About />} />
            <Route path="/games" element={<Games />} />
            <Route path="/extras" element={<Extras />} />
            <Route path="/guestbook" element={<Guestbook />} />
            <Route path="/games/:slug" element={<GameDetail />} />
            <Route path="/recomendacoes" element={<Recommendations />} />
            <Route path="/shrines" element={<Shrines />} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
