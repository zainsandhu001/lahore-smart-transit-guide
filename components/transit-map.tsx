'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Lahore city center.
const LAHORE_CENTER: [number, number] = [31.5204, 74.3587];
const ZOOM = 12;

// Fix the default marker icon under bundlers/SSR.
const defaultIcon = L.icon({
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

export default function TransitMap() {
  return (
    <MapContainer
      center={LAHORE_CENTER}
      zoom={ZOOM}
      scrollWheelZoom={false}
      className="h-[420px] w-full rounded-2xl border border-slate-200 shadow-sm"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={LAHORE_CENTER}>
        <Popup>
          <div className="space-y-0.5">
            <p className="font-semibold text-slate-900">Lahore</p>
            <p className="text-xs text-slate-600">
              Pakistan&apos;s transit hub — Orange Line, Metro Bus, Speedo &amp; EV
              buses.
            </p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
