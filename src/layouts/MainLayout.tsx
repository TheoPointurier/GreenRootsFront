import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    // Si le hash est vide, remonte en haut de la page
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  return (
    <div className="flex-1">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
