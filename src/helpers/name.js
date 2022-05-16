export function substringProductName(name) {
  return name.length > 21 ? `${name.substring(0, 18)}...` : name;
}