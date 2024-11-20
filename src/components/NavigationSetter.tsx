import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setNavigate } from '../api/apiClient';

const NavigationSetter: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return null;
};

export default NavigationSetter;
