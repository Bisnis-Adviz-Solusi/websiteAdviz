import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTranslation } from 'react-i18next';

const MapContact = ({ isDark }: { isDark: boolean }) => {
    const { t } = useTranslation();
    const [Error, setError] = useState(false);
    const pin = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      
    useEffect(() => {
        try {
            const map = L.map('map').setView([-6.193666433316111, 106.83902712917678], 15);
            L.tileLayer(
                isDark
                    ? 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}'
                    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                {
                    attribution: '&copy; Esri, &copy; OpenStreetMap contributors',
                    maxZoom: 16,
                }
            ).addTo(map);
              

            L.marker([-6.193666433316111, 106.83902712917678], { icon: pin })
                .addTo(map)
                .bindPopup(t('contact.officeAddress.buildingName'));

            return () => {
                map.remove();
            };
        } catch (error) {
            console.error('Map Error Found!', error);
            setError(true);
        }
    }, [isDark, pin,t]);

    return (
        <div id="map" style={{ height: '100%', width: '100%', position: 'relative' }}>
            {Error && (
                <div className="absolute inset-0 flex items-center justify-center text-red-500 text-lg font-semibold bg-gray-100 dark:bg-gray-800 z-10">
                    {t('warning.undefined')}
                </div>
            )}
        </div>
    );
};

export default MapContact;
