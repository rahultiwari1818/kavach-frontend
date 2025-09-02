README
======

Kavach Frontend (Next.js + TypeScript)
======================================

Overview
--------

The frontend of the Kavach Crime Reporting and Hotspot Mapping System is built using Next.js and TypeScript. It provides an interactive user interface for citizens, admins, and super admins. The application includes:

*   Crime reporting interface
    
*   Admin crime verification dashboard
    
*   Super admin management panel
    
*   Interactive map system powered by Leaflet and OpenStreetMap
    
*   Real-time media preview and radius-based crime filtering
    
*   Debounced API requests for optimized performance
    

Tech Stack
----------

*   Next.js 14 (TypeScript)
    
*   React 18
    
*   Tailwind CSS
    
*   Leaflet + React-Leaflet
    
*   Axios
    
*   Material UI (sliders, UI controls)
    
*   React Toastify
    
*   Cloudinary (media loading)
    

Features
--------

*   Register, login, and role-based access control
    
*   Report crimes with media uploads (images/videos)
    
*   Real-time map visualization
    
*   Radius-based crime search (100m to 50km)
    
*   Type and time-based filtering
    
*   Popup dialogs for crime details and verification
    
*   Optimized API calls with custom debounce adapter
    
*   View heatmap and dynamic risk zones
    
*   State pattern for crime verification transitions
    

Folder Structure
----------------

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   frontend/  │  ├── src/  │   ├── app/                     # Next.js app router pages  │   ├── components/              # Dialogs, Map, Overlays, UI elements  │   ├── Types/                   # TypeScript interfaces  │   ├── utils/                   # Debounce, helper functions  │   ├── hooks/                   # Custom hooks  │   └── styles/                  # Global CSS  │  ├── public/                      # Static assets and icons  ├── package.json  └── .env.local   `

Environment Variables
---------------------

Create a .env.local file:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   NEXT_PUBLIC_API_URL=http://localhost:8080  NEXT_PUBLIC_CLOUDINARY_BASE=https://res.cloudinary.com/   `

Installation
------------

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd frontend  npm install   `

Running the Development Server
------------------------------

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   npm run dev   `

The frontend will run on:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   http://localhost:3000   `

Build for Production
--------------------

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   npm run build  npm start   `

API Communication
-----------------

All API requests are made using Axios and include withCredentials: true to support secure cookie-based authentication.

Map Integration
---------------

Powered by:

*   Leaflet library
    
*   Custom risk zone circle layers
    
*   Popup content components
    
*   Optimized marker rendering
    

Troubleshooting
---------------

1.  If icons do not load, ensure the Leaflet CSS is correctly included.
    
2.  If cookies are not set, verify backend CORS config.
    
3.  If map centers incorrectly, ensure browser permissions for location are allowed.

