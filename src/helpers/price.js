export function fixPrice(price = 0) {
  return price.toFixed(2).split(".").join(",");
}

export function getNumberFromPrice(priceString) {
  return Number(priceString.split(',').join('.'));
}