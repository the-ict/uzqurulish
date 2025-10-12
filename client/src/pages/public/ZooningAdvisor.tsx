import { useState, useEffect } from 'react';
import { MapPin, AlertTriangle, Home, Building, Factory, Layers, Satellite, Map } from 'lucide-react';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ZoningFunctions from '../../functions/zoning.func';
import type { IZoningInfo, IZoneType } from '../../functions/zoning.func';


export default function ZoningAdvisor() {
   const [location, setLocation] = useState("");
   const [zoneInfo, setZoneInfo] = useState<IZoningInfo | null>(null);
   const [mapView, setMapView] = useState("standard");
   const [mapCenter, setMapCenter] = useState<[number, number]>([41.2995, 69.2401]);
   const [mapZoom, setMapZoom] = useState(12);
   const [showLayers, setShowLayers] = useState(true);
   const [loading, setLoading] = useState(false);
   const [zoneTypes, setZoneTypes] = useState<IZoneType[]>([]);
   const [mapData, setMapData] = useState<any[]>([]);
   const zoningFunctions = new ZoningFunctions();

  useEffect(() => {
    // Load zone types and map data on component mount
    const loadData = async () => {
      try {
        const [types, map] = await Promise.all([
          zoningFunctions.getZoneTypes(),
          zoningFunctions.getZoningMapData()
        ]);
        setZoneTypes(types);
        setMapData(map);
      } catch (error) {
        console.error('Failed to load initial data:', error);
        alert('Dastlabki ma\'lumotlarni yuklashda xatolik yuz berdi.');
      }
    };
    loadData();
  }, []);

  const handleSearch = async () => {
    if (!location.trim()) return;

    setLoading(true);
    try {
      const data = await zoningFunctions.getZoningInfo(location);
      setZoneInfo(data);
    } catch (error) {
      console.error('Failed to fetch zoning data:', error);
      alert('Hudud ma\'lumotlarini yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Zoning Advisor</h1>
      
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-bold text-lg mb-4">Manzilni kiriting</h2>
        
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="text-gray-400" size={18} />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Manzilni kiriting..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? 'Qidirilmoqda...' : 'Qidirish'}
          </button>
        </div>
      </div>
      
      {zoneInfo ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map View */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Xarita</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setMapView("standard")}
                  className={`p-2 rounded-lg ${mapView === "standard" ? 'bg-gray-200' : 'bg-gray-100'}`}
                >
                  <Map size={18} />
                </button>
                <button 
                  onClick={() => setMapView("satellite")}
                  className={`p-2 rounded-lg ${mapView === "satellite" ? 'bg-gray-200' : 'bg-gray-100'}`}
                >
                  <Satellite size={18} />
                </button>
                <button
                  onClick={() => setShowLayers(!showLayers)}
                  className={`p-2 rounded-lg ${showLayers ? 'bg-gray-200' : 'bg-gray-100'}`}
                >
                  <Layers size={18} />
                </button>
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-lg h-96 overflow-hidden relative">
              <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }}
              >
                <TileLayer
                  url={mapView === "satellite"
                    ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  }
                  attribution={mapView === "satellite"
                    ? '&copy; <a href="https://www.arcgis.com/">Esri</a> &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  }
                />
                {showLayers && mapData.map((zone) => (
                  <Polygon
                    key={zone.id}
                    positions={zone.coordinates}
                    pathOptions={{
                      color: zone.color,
                      fillColor: zone.color,
                      fillOpacity: 0.3,
                      weight: 2
                    }}
                  />
                ))}
              </MapContainer>
            </div>
            
            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-2">
              {mapData.map(zone => (
                <div key={zone.id} className="flex items-center">
                  <div className="w-4 h-4 rounded-full mr-1" style={{ backgroundColor: zone.color }}></div>
                  <span className="text-sm">{zone.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Zone Info */}
          <div className="space-y-6">
            {/* Zone Details */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="font-bold text-lg mb-4">Hudud ma'lumotlari</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700">Hudud turi</h3>
                  <p className="font-semibold">{zoneInfo.zone.zoneType}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-700">Maksimal balandlik</h3>
                    <p className="font-semibold">{zoneInfo.zone.maxHeight ? `${zoneInfo.zone.maxHeight}m` : 'Noma\'lum'}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700">Maksimal qavatlar</h3>
                    <p className="font-semibold">{zoneInfo.zone.maxFloors || 'Noma\'lum'}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Cheklovlar</h3>
                  <ul className="space-y-2">
                    {zoneInfo.zone.maxHeight && (
                      <li className="flex items-center">
                        <AlertTriangle className="text-yellow-500 mr-2" size={16} />
                        <span>Maksimal balandlik: {zoneInfo.zone.maxHeight}m</span>
                      </li>
                    )}
                    {zoneInfo.zone.maxFloors && (
                      <li className="flex items-center">
                        <AlertTriangle className="text-yellow-500 mr-2" size={16} />
                        <span>Maksimal qavatlar: {zoneInfo.zone.maxFloors}</span>
                      </li>
                    )}
                    {zoneInfo.zone.minGreenSpace && (
                      <li className="flex items-center">
                        <AlertTriangle className="text-yellow-500 mr-2" size={16} />
                        <span>Yashil maydon: {zoneInfo.zone.minGreenSpace}%</span>
                      </li>
                    )}
                    {zoneInfo.zone.restrictions && (
                      <li className="flex items-center">
                        <AlertTriangle className="text-yellow-500 mr-2" size={16} />
                        <span>{zoneInfo.zone.restrictions}</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Nearby Facilities */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="font-bold text-lg mb-4">Yaqin atrofdagi ob'ektlar</h2>
              
              <div className="space-y-3">
                {zoneInfo.nearbyFacilities.map((facility, index: number) => (
                  <div key={index} className="flex items-center justify-between p-2 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 bg-gray-100 rounded-lg mr-3">
                        {facility.type === "education" && <Home className="text-blue-600" size={16} />}
                        {facility.type === "healthcare" && <Building className="text-red-600" size={16} />}
                        {facility.type === "commercial" && <Factory className="text-green-600" size={16} />}
                        {facility.type === "transport" && <MapPin className="text-yellow-600" size={16} />}
                      </div>
                      <span>{facility.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{facility.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow p-12 text-center">
          <MapPin className="mx-auto text-gray-300" size={48} />
          <p className="mt-4 text-gray-500">Hudud ma'lumotlarini ko'rish uchun manzilni kiriting</p>
        </div>
      )}
      
      {/* Zone Types */}
      <div className="bg-white rounded-xl shadow">
        <div className="p-5 border-b border-gray-200">
          <h3 className="font-bold text-lg">Hudud turlari</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
          {zoneTypes.map((zoneType, index) => {
            const getIcon = (type: string) => {
              switch (type) {
                case 'residential': return <Home className="text-blue-600" size={20} />;
                case 'commercial': return <Building className="text-green-600" size={20} />;
                case 'industrial': return <Factory className="text-yellow-600" size={20} />;
                default: return <Home className="text-gray-600" size={20} />;
              }
            };
            const getColor = (type: string) => {
              switch (type) {
                case 'residential': return 'bg-blue-500';
                case 'commercial': return 'bg-green-500';
                case 'industrial': return 'bg-yellow-500';
                default: return 'bg-gray-500';
              }
            };

            return (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition">
                <div className="flex items-center mb-2">
                  {getIcon(zoneType.type)}
                  <span className="font-medium ml-2">{zoneType.name}</span>
                </div>
                <p className="text-sm text-gray-600">{zoneType.description}</p>
                <div className="mt-3 flex items-center">
                  <div className={`w-4 h-4 rounded-full ${getColor(zoneType.type)} mr-2`}></div>
                  <span className="text-xs text-gray-500">Xaritada ushbu rang</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}