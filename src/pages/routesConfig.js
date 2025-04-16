import React from "react";
import Home from "./home";
import NewCategory from "./new-category";
import UpdateCategory from "./update-category";
import AddVideo from "./add-video";
import UpdateVideo from "./update-video";


// Exporta un arreglo con las rutas
const routesConfig = [
    { path: "/", element: <Home />, exact: true },
    { path: "/new-category", element: <NewCategory />, exact: true },
    { path: "/update-category/:categoryId", element: <UpdateCategory />, exact: true },
    { path: "/add-video/:categoryId", element: <AddVideo />, exact: true },
    { path: "/update-video/:categoryId/:videoId", element: <UpdateVideo />, exact: true },
    { path: "*", element: <h1>404 - Página no encontrada</h1>, exact: false },
];

export default routesConfig;