const express = require("express");
const router = express.Router();

const VentaController = require("../controllers/ventas");

router.get("", VentaController.getVentas);
router.post("", VentaController.addVenta);
router.delete("/:id", VentaController.deleteVenta)
router.get("/disponibles", VentaController.getVentaDisponible);
router.get("/:id", VentaController.getVentaId);
router.put("/:id", VentaController.editVenta);
module.exports = router;