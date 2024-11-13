import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import { setNavigate } from '../api/apiClient';

function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Initialise la fonction de navigation
    setNavigate(navigate);
  }, [navigate]);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  return (
    <div className="flex-1 xl:mt-32">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
