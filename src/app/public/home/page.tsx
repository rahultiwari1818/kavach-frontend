"use client";

import CrimeMap from "@/components/CrimeMap/CrimeMap";
export const dynamic = "force-dynamic";

export default function CrimeNearbyPage() {
  return (
    <div>
      {/* <h1 className="text-xl font-bold p-2">Crimes Near You</h1> */}
      <CrimeMap />
    </div>
  );
}
