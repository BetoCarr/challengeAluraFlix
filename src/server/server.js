const express = require('express');
const app = express();
const port = 6000; // Puedes cambiar el puerto según tus necesidades

// Middleware para permitir solicitudes POST con JSON en el cuerpo
app.use(express.json());

// Ruta para manejar solicitudes POST
app.post('/categorias/:categoria/videos', (req, res) => {
  // Aquí puedes leer los datos del cuerpo de la solicitud y el parámetro de la ruta
    const categoria = req.params.categoria;
    const nuevoVideo = req.body; // El cuerpo de la solicitud debe contener los datos del nuevo video

  // En este punto, puedes procesar los datos como desees y agregarlos al archivo JSON o realizar cualquier otra acción necesaria.

  // Ejemplo: Agregar el nuevo video a la categoría en tu archivo JSON local (datos-iniciales.json)

  // Responder con un mensaje de éxito o el resultado de la operación
    res.json({ message: 'Video agregado con éxito' });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
