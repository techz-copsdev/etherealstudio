export interface PriceRecommendationInput {
  modalCost: number;
  shippingCost: number;
  marginPercent: number;
}

export interface PriceRecommendation {
  totalCost: number;
  marginAmount: number;
  recommendedPrice: number;
}

/**
 * Compute a recommended selling price from cost + shipping + margin %.
 * Handles negative or NaN inputs by clamping to zero.
 */
export function recommendSellingPrice(
  input: PriceRecommendationInput
): PriceRecommendation {
  const modal = Math.max(0, Number(input.modalCost) || 0);
  const ship = Math.max(0, Number(input.shippingCost) || 0);
  const margin = Math.max(0, Number(input.marginPercent) || 0);
  const totalCost = modal + ship;
  const marginAmount = (totalCost * margin) / 100;
  const recommendedPrice = Math.round(totalCost + marginAmount);
  return { totalCost, marginAmount, recommendedPrice };
}
