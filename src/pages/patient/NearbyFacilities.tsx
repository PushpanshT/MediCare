// src/pages/patient/NearbyFacilities.tsx
import { useEffect, useState } from "react";
import { MapPin, Hospital, Stethoscope, Pill, LocateFixed } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";

// Simple mock facilities – replace with API / backend data later
type FacilityType = "hospital" | "clinic" | "pharmacy";

interface Facility {
  id: number;
  name: string;
  type: FacilityType;
  address: string;
  distance: string;
  lat: number;
  lng: number;
  isOpen: boolean;
}

const sampleFacilities: Facility[] = [
  {
    id: 1,
    name: "City Care Hospital",
    type: "hospital",
    address: "Wardha Road, Nagpur",
    distance: "1.2 km",
    lat: 21.1295,
    lng: 79.082,
    isOpen: true,
  },
  {
    id: 2,
    name: "Heart & Lung Clinic",
    type: "clinic",
    address: "Dharampeth, Nagpur",
    distance: "2.0 km",
    lat: 21.143,
    lng: 79.0705,
    isOpen: true,
  },
  {
    id: 3,
    name: "HealthPlus Pharmacy",
    type: "pharmacy",
    address: "Sitabardi, Nagpur",
    distance: "1.8 km",
    lat: 21.1458,
    lng: 79.0882,
    isOpen: false,
  },
];

const NearbyFacilities = () => {
  const [selectedType, setSelectedType] = useState<FacilityType | "all">("all");
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
    sampleFacilities[0]
  );
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Location is not supported on this device.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLocationError(null);
      },
      () => {
        setLocationError("Unable to fetch current location. Please allow access.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const filteredFacilities =
    selectedType === "all"
      ? sampleFacilities
      : sampleFacilities.filter((f) => f.type === selectedType);

  const getTypeIcon = (type: FacilityType) => {
    if (type === "hospital")
      return <Hospital className="w-4 h-4 text-destructive" />;
    if (type === "pharmacy")
      return <Pill className="w-4 h-4 text-emerald-500" />;
    return <Stethoscope className="w-4 h-4 text-primary" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-6 animate-slide-up">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Nearby Facilities
            </h1>
            <p className="text-muted-foreground">
              Find hospitals, clinics, and pharmacies around you on an interactive
              map.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 animate-slide-up stagger-1">
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "All" },
                { id: "hospital", label: "Hospitals" },
                { id: "clinic", label: "Clinics" },
                { id: "pharmacy", label: "Pharmacies" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedType(f.id as any)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedType === f.id
                      ? "gradient-bg text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (!navigator.geolocation) return;
                navigator.geolocation.getCurrentPosition(
                  (pos) =>
                    setUserLocation({
                      lat: pos.coords.latitude,
                      lng: pos.coords.longitude,
                    }),
                  () => setLocationError("Unable to refresh location.")
                );
              }}
              className="gap-2"
            >
              <LocateFixed className="w-4 h-4" />
              Use current location
            </Button>
          </div>

          {locationError && (
            <div className="mb-4 text-xs text-destructive animate-slide-up stagger-1">
              {locationError}
            </div>
          )}

          {/* Map + List layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map */}
            <div className="lg:col-span-2">
              <div className="card-healthcare h-[460px] p-0 overflow-hidden animate-slide-up stagger-2">
                {/* Map container - replace URL with real map (Mapbox, Google Maps, Leaflet) */}
                <div className="relative w-full h-full">
                  <iframe
                    title="Nearby Facilities Map"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={
                      userLocation
                        ? `https://www.google.com/maps/embed/v1/search?key=${
                            import.meta.env.VITE_GOOGLE_MAPS_API_KEY
                          }&q=hospital+near+me&center=${userLocation.lat},${
                            userLocation.lng
                          }&zoom=14`
                        : "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14735.899!2d79.0882!3d21.1458!2m3!1f0!2f0!3f0"
                    }
                  />
                  {/* Selected facility badge */}
                  {selectedFacility && (
                    <div className="absolute left-4 bottom-4 right-4">
                      <div className="flex items-center justify-between gap-3 rounded-xl bg-background/95 backdrop-blur p-3 shadow-lg border border-border">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                            {getTypeIcon(selectedFacility.type)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {selectedFacility.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {selectedFacility.address}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {selectedFacility.distance}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full ${
                              selectedFacility.isOpen
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {selectedFacility.isOpen ? "Open now" : "Closed"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Facilities list */}
            <div className="space-y-3 animate-slide-up stagger-3">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Facilities list
              </h2>
              {filteredFacilities.map((facility) => (
                <button
                  key={facility.id}
                  onClick={() => setSelectedFacility(facility)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedFacility?.id === facility.id
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border bg-background hover:bg-muted/60"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                      {getTypeIcon(facility.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="font-medium text-foreground truncate">
                          {facility.name}
                        </p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {facility.distance}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {facility.address}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="capitalize px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {facility.type}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full ${
                            facility.isOpen
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {facility.isOpen ? "Open now" : "Closed"}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NearbyFacilities;
