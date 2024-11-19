import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    // Si le fragment existe dans l'URL, ne scrolle pas automatiquement vers le haut
    if (currentPath !== location.pathname) {
      if (!location.hash) {
        window.scrollTo(0, 0);
      }
      setCurrentPath(location.pathname);
    }
  }, [currentPath, location.pathname, location.hash]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="hidden xl:block h-[80px]" />
      <main className="flex flex-col flex-1 justify-center items-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
