export function firstSentence(description: string): string {
  if (description.length < 2) {
    return description;
  }
  let stopIndex = description.indexOf(".");
  if (stopIndex == -1) {
    stopIndex = description.indexOf("!");
    if (stopIndex == -1) {
      stopIndex = description.indexOf("?");
      if (stopIndex == -1) {
        stopIndex = description.length - 2;
      }
    }
  }
  return description.substring(0, stopIndex + 1);
}

export function htmlizeLineBreaks(description: string): string {
  return description.replaceAll("\n", "<br />");
}

const currencyFormatter = new Intl.NumberFormat("default", {
  style: "currency",
  currency: "USD",
});

export function priceAsCurrency(price: number): string {
  return currencyFormatter.format(price);
}
