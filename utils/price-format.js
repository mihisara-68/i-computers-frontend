export default function formatPrice(price) {
  if (price == null) {
    return "N/A";
  }
  const priceInnumber = Number(price);
  if (isNaN(priceInnumber)) {
    return "N/A";
  } else {
    return (
      "LKR " +
      priceInnumber.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  }
}
