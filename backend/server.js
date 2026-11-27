
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

// Ruta principal
app.get("/api", (req, res) => {
    res.json({
        mensaje: "Backend Express funcionando"
    });
});

// Ruta para comprobar la comunicación con el frontend
app.get("/api/auth/ping", (req, res) => {
    res.json({
        mensaje: "Backend disponible",
        conectado: true
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
