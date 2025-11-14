# 🛡️ Kavach Frontend: Crime Reporting & Hotspot Mapping

## Overview

The **Kavach Frontend** is the interactive user interface for the Kavach Crime Reporting and Hotspot Mapping System. It's a modern, high-performance application built with Next.js and TypeScript, designed to serve citizens, administrators, and super administrators with role-specific access.

### Key Capabilities

* **Crime Reporting Interface:** Simple and fast reporting for citizens, including media uploads.
* **Admin Dashboard:** Crime verification and management for administrators.
* **Super Admin Panel:** Comprehensive user and system management.
* **Interactive Map System:** Real-time visualization of crime data using **Leaflet** and **OpenStreetMap**.
* **Optimized Performance:** Uses debounced API requests and optimized marker rendering.

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 (TypeScript) | Full-stack React framework for performance and routing. |
| **UI/Styling** | React 18, Tailwind CSS | Component library and utility-first CSS for responsive design. |
| **Map** | Leaflet + React-Leaflet | Map rendering and interaction. |
| **API Client** | Axios | HTTP client for efficient API communication. |
| **UI Components** | Material UI | Sliders and structured UI controls. |
| **Notifications** | React Toastify | User feedback and notifications. |
| **Media** | Cloudinary | External service for media loading and display. |

---

## ✨ Features

* **Authentication & Access:** Register, login, and **role-based access control** for citizens, admins, and super admins.
* **Geolocation & Search:** **Radius-based crime search** (100m to 50km) and location-based reporting.
* **Filtering:** Advanced filtering by crime **type** and **time/date**.
* **Data Visualization:**
    * **Real-time map visualization** of reported crimes.
    * View **heatmap** and **dynamic risk zones**.
* **Verification Workflow:** Uses a **State pattern** for secure and managed crime verification transitions (e.g., Pending $\rightarrow$ Verified).
* **Optimized API Calls:** Custom **debounce adapter** for Axios to prevent excessive API requests.
* **Detailed Views:** **Popup dialogs** for viewing crime details and performing admin verification.

# Environment variables


---

## ⚙️ Installation & Setup

### Environment Variables

Create a file named `.env.local` in the `frontend/` directory and add the following variables:

NEXT_PUBLIC_API_URL=http://localhost:8080 NEXT_PUBLIC_CLOUDINARY_BASE=https://res.cloudinary.com/


### Installation Steps

1.  Navigate into the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

To start the application in development mode:

```bash
npm run dev
The frontend will be accessible at: http://localhost:3000

## 📡 API & Map Details

### API Communication

All API requests are handled by **Axios**. Crucially, they include `withCredentials: true` to ensure secure **cookie-based authentication** and session management with the backend.

### Map Integration

The interactive map is powered by the **Leaflet library** integrated via `react-leaflet`. It uses:

* Custom markers and popup components for crime data.
* Specialized circle layers for rendering risk zones.

---

## ⚠️ Troubleshooting

1.  **Map Icons Missing:** Ensure the Leaflet CSS file is correctly imported in your global styles or main layout file.
2.  **Authentication Failure (Cookies):** Verify that the backend's CORS configuration (including `Access-Control-Allow-Credentials`) is correctly set up to allow cookies from the frontend origin (`http://localhost:3000`).
3.  **Incorrect Map Center:** Check that your browser permissions allow the application to access your geolocation if the map relies on the user's current location.