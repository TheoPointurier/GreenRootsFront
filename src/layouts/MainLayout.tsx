import { useEffect, useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NavigationSetter from '../components/NavigationSetter';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    if (currentPath !== location.pathname) {
      window.scrollTo(0, 0);
      setCurrentPath(location.pathname);
    }
  }, [currentPath, location.pathname]);

  return (
    <>
      <NavigationSetter />
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="hidden xl:block h-[80px]" />
        <main className="flex flex-col flex-1 justify-center items-center">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
