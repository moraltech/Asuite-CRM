"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface TruckPosition {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: string;
  speed: number;
  heading: string;
}

interface FleetMapProps {
  trucks: TruckPosition[];
}

export default function FleetMap({ trucks }: FleetMapProps) {
  return (
    <MapContainer
      center={[39.8283, -98.5795]}
      zoom={4}
      style={{ height: "100%", width: "100%", borderRadius: "12px" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {trucks.map((truck) => (
        <Marker key={truck.id} position={[truck.lat, truck.lng]} icon={defaultIcon}>
          <Popup>
            <div className="text-sm">
              <p className="font-bold">{truck.name}</p>
              <p>Status: {truck.status}</p>
              <p>Speed: {truck.speed} mph</p>
              <p>Heading: {truck.heading}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
