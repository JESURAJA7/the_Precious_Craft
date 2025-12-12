// controller/pricingEngineController.js
const MetalRate = require("../models/MetalRate");
const Product = require("../models/Product");
const { calculateProductPrice } = require("../utils/pricingEngine");

/**
 * Get latest metal rate + history
 * GET /api/pricing/rates
 */
const getRates = async (req, res) => {
  try {
    const latest = await MetalRate.findOne().sort({ createdAt: -1 }).lean();
    const history = await MetalRate.find()
      .sort({ createdAt: -1 })
      .limit(30)
      .lean();

    res.send({
      success: true,
      latest,
      history,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

/**
 * Create new rate for today
 * POST /api/pricing/rates
 * body: { gold, silver, brass, note? }
 */
const createRate = async (req, res) => {
  try {
    const { gold, silver, brass, note } = req.body;
    console.log("gold, silver, brass, note", gold, silver, brass, note);

    if (gold == null || silver == null || brass == null) {
      return res.status(400).send({
        success: false,
        message: "gold, silver, brass are required",
      });
    }

    const rate = await MetalRate.create({
      gold,
      silver,
      brass,
      note,
      date: new Date(),
    });

    res.status(201).send({
      success: true,
      rate,
      message: "Metal rates saved successfully!",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
    console.log("err", err);
  }
};

/**
 * Recalculate all product prices using latest rate
 * POST /api/pricing/recalculate
 */
const recalculateAllProductPrices = async (req, res) => {
  try {
    const latest = await MetalRate.findOne().sort({ createdAt: -1 }).lean();
    if (!latest) {
      return res.status(400).send({
        success: false,
        message: "No metal rates found. Please set today's rate first.",
      });
    }

    const metalRates = {
      gold: latest.gold,
      silver: latest.silver,
      brass: latest.brass,
    };

    const products = await Product.find({}).exec();
    let updatedCount = 0;

    for (const product of products) {
      const newPrices = calculateProductPrice(product, metalRates);
      if (!newPrices) continue;

      product.prices.originalPrice = newPrices.originalPrice;
      product.prices.price = newPrices.price;
      product.prices.discount = newPrices.discount;

      await product.save();
      updatedCount += 1;
    }

    res.send({
      success: true,
      message: `Recalculated prices for ${updatedCount} products.`,
      updatedCount,
      ratesUsed: metalRates,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getRates,
  createRate,
  recalculateAllProductPrices,
};
