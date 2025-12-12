const express = require("express");
const router = express.Router();

const {
  getRates,
  createRate,
  recalculateAllProductPrices,
} = require("../controller/pricingEngineController");

// If you have auth middleware, add it here:
const { isAuth, isAdmin } = require("../config/auth");

/**
 * Pricing Engine Routes
 */

// Get latest rates + history
router.get("/rates", isAuth, isAdmin, getRates);

// Create today's rates
router.post("/rates", isAuth, isAdmin, createRate);

// Recalculate all product prices based on latest rates
router.post(
  "/recalculate",
  isAuth, isAdmin, recalculateAllProductPrices
);

module.exports = router;
