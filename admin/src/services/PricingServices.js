// src/services/PricingServices.js
import requests from "./httpService";

const PricingServices = {
  // Get latest metal rates + history (30 days as per backend)
  getRates: async () => {
    return requests.get("/pricing/rates");
  },

  // Create/set today's metal rates (gold, silver, brass, note?)
  createRate: async (body) => {
    // body = { gold, silver, brass, note? }
    return requests.post("/pricing/rates", body);
  },

  // Recalculate all product prices using latest metal rates
  recalculateAllProductPrices: async () => {
    return requests.post("/pricing/recalculate");
  },
};

export default PricingServices;
