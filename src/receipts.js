const SALES_TAX_RATE = 10;
const IMPORT_TAX_RATE = 5;
const TAX_TICK = 0.05;

const noTaxGoods = ["food", "book", "medical"];

function computePriceTax(price, taxRate, tick) {
  const tax = (taxRate * price) / 100;
  const result = tick * Math.ceil(tax / tick);
  return result;
}

function computeItemTaxes(orderItem) {
  let taxRate = 0;
  if (!noTaxGoods.includes(orderItem.type)) {
    taxRate += SALES_TAX_RATE;
  }
  if (orderItem.imported) {
    taxRate += IMPORT_TAX_RATE;
  }
  const taxes = taxRate ? computePriceTax(orderItem.price, taxRate, TAX_TICK) : 0;
  return taxes;
}

module.exports.getOrderReceiptDetails = function (order) {
  const receiptDetails = { items: [], total: 0, taxes: 0 };
  for (const orderItem of order) {
    const receiptItem = {
      description: orderItem.description,
      quantity: orderItem.quantity,
    };
    const itemTaxes = orderItem.quantity * computeItemTaxes(orderItem);
    receiptItem.price = orderItem.price * orderItem.quantity + itemTaxes;
    receiptDetails.items.push(receiptItem);
    receiptDetails.total = receiptDetails.total + receiptItem.price;
    receiptDetails.taxes = receiptDetails.taxes + itemTaxes;
  }

  return receiptDetails;
};

module.exports.printReceipt = function (receiptDetails) {
  const lines = [];
  receiptDetails.items.forEach((item, i) => {
    const line = `${item.quantity} ${item.description}: ${item.price.toFixed(
      2
    )}`;
    lines.push(line);
  });
  const salesTaxes = `Sale Taxes: ${receiptDetails.taxes.toFixed(2)}`;
  const total = `Total: ${receiptDetails.total.toFixed(2)}`;
  lines.push(salesTaxes);
  lines.push(total);
  console.log(lines.join("\n"));
};
