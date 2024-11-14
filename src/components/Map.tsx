import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import customMarkerIcon from '../assets/Logos/Logo_onglet_nav.webp';

// Icône personnalisée GreenRoots
const customIcon = new L.Icon({
  iconUrl: customMarkerIcon,
  iconRetinaUrl: customMarkerIcon,
  // Taille de l'icône
  iconSize: [40, 40],
  // Point de l'icône correspondant à la position du marqueur
  iconAnchor: [16, 32],
  // Point relatif à l'icône où s'affiche le popup
  popupAnchor: [0, -32],
});

const MapComponent: React.FC = () => {
  return (
    <MapContainer
      center={[48.8851947, 2.332213]}
      zoom={13}
      className="w-full h-full"
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[48.8851947, 2.332213]} icon={customIcon}>
        <Popup>Bienvenue chez Greenroots!</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
