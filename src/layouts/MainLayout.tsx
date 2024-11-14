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
    <div className="flex flex-col min-h-screen">
  <Header />
  <div className="hidden xl:block h-[80px]" />
  <main className="flex flex-col flex-1 justify-center items-center container mx-auto p-5">
    <Outlet />
  </main>
  <Footer />
</div>

  );
}

export default MainLayout;
