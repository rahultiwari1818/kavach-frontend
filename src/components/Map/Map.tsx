"use client";

import "leaflet/dist/leaflet.css";
const { MapContainer, TileLayer, Marker, Popup, useMap } =
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  typeof window !== "undefined" ? require("react-leaflet") : {};
import { useEffect, useState } from "react";
import { CustomMapProps } from "./types";
// import MapClickHandler from "./MapClickHandler";
// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars
const L = typeof window !== "undefined" ? require("leaflet") : null;
import dynamic from "next/dynamic";
// import HeatmapLayer from "./HeatMapLayer";
// import RiskZoneLayer from "./RiskZoneLayer";
// import HeatmapLayer from "./HeatMapLayer";

const defaultUserIcon = L
  ? new L.Icon({
      iconUrl: "/user-location.png",
      iconSize: [30, 40],
      iconAnchor: [15, 40],
    })
  : null;

export const userIcon = L
  ? new L.Icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    })
  : null;

export const crimeIcon = L
  ? new L.Icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    })
  : null;

const MapMarkerLayer = dynamic(() => import("./MapMarkerLayer"), {
  ssr: false,
});
const MapClickHandler = dynamic(() => import("./MapClickHandler"), {
  ssr: false,
});
const HeatmapLayer = dynamic(() => import("./HeatMapLayer"), { ssr: false });
const RiskZoneLayer = dynamic(() => import("./RiskZoneLayer"), { ssr: false });

function FlyToLocation({
  location,
  zoom,
}: {
  location: [number, number] | null;
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo(location, zoom, { duration: 1.5 });
    }
  }, [location, map, zoom]);

  return null;
}

function MapComponent({
  center = [20.5937, 78.9629], // Default India center
  zoom = 15,
  markers = [],
  tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  height = "80vh",
  width = "100%",
  scrollWheelZoom = true,
  draggable = true,
  showZoomControl = true,
  showUserLocation = false,
  userIcon = defaultUserIcon,
  onMapClick,
  heatPoints = [[0, 0, 0]],
  crimeCount = 0,
  radius = 1000,
}: CustomMapProps) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (
      showUserLocation &&
      typeof window !== "undefined" &&
      navigator.geolocation
    ) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.warn("Geolocation denied or failed:", error);
        }
      );
    }
  }, [showUserLocation]);

  useEffect(() => {
    setMounted(true);
  }, []);
  const initialCenter = userLocation || center;

  return mounted ? (
    <div style={{ height, width }}>
      <MapContainer
        center={initialCenter}
        zoom={zoom}
        scrollWheelZoom={scrollWheelZoom}
        dragging={draggable}
        zoomControl={showZoomControl}
        style={{ height: "100%", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer url={tileUrl} />

        {/* Crime Markers */}
        <MapMarkerLayer markers={markers || []} />

        {/* Handle Map Click */}
        <MapClickHandler onClick={onMapClick} />

        {/* Auto-fly to user location when detected */}
        <FlyToLocation location={userLocation} zoom={zoom} />

        {/* User Location Marker */}
        {showUserLocation && userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup>Your current location</Popup>
          </Marker>
        )}

        {heatPoints && heatPoints.length > 0 && (
          <HeatmapLayer points={heatPoints} />
        )}
        {(crimeCount || crimeCount >= 0) && (
          <RiskZoneLayer
            userLocation={userLocation}
            crimeCount={crimeCount}
            radius={radius}
          />
        )}
      </MapContainer>
    </div>
  ) : (
    <></>
  );
}

// import dynamic from "next/dynamic";

export default dynamic(() => Promise.resolve(MapComponent), { ssr: false });

// export default MapComponent;
