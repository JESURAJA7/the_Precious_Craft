
/**
 * metalRates: { gold, silver, brass }  // per gram
 * product: Mongoose Product document
 *
 * Formula example:
 * base = metalRate * product.weight
 * originalPrice = base + makingCharge + stonePrice
 * price = originalPrice - discount
 */
function calculateProductPrice(product, metalRates) {
  if (!product.metal || !product.weight) {
    return product.prices; // don't touch if missing data
  }

  const metal = product.metal.toLowerCase();
  const ratePerGram = metalRates[metal];

  if (!ratePerGram) {
    return product.prices;
  }

  const weight = product.weight || 0;

  // You can customize these or store in product
  const makingCharge = product.makingCharge || 0;
  const stonePrice = product.stonePrice || 0;
  const discountPercent = product.discountPercent || 0;

  const base = ratePerGram * weight;
  const originalPrice = Math.round(base + makingCharge + stonePrice);

  const discountAmount = Math.round((originalPrice * discountPercent) / 100);
  const price = originalPrice - discountAmount;

  return {
    originalPrice,
    price,
    discount: discountPercent,
  };
}

module.exports = {
  calculateProductPrice,
};
