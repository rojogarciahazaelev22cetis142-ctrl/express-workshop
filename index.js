const express = require('express');
const app = express();

/*
verbos HTTP
GET: Solicita datos de un recurso específico.
POST: Envía datos para crear un nuevo recurso.
PUT: Actualiza un recurso existente con nuevos datos.
DELETE: Elimina un recurso específico.
PATCH: Actualiza parcialmente un recurso existente.

*/

app.listen(3000,()  => {
    console.log('Server is running on port 3000');
});
