const assert = require("assert");
const { getOrderReceiptDetails, printReceipt } = require("../src/receipts");

describe("Receipt tests", function () {
  it("Input 1", function () {
    const order = [
      {
        description: "book",
        type: "book",
        price: 12.49,
        imported: false,
        quantity: 2,
      },
      {
        description: "music cd",
        type: "music",
        price: 14.99,
        imported: false,
        quantity: 1,
      },
      {
        description: "chocolate bar",
        type: "food",
        price: 0.85,
        imported: false,
        quantity: 1,
      },
    ];
    const details = getOrderReceiptDetails(order);
    printReceipt(details);
    assert.equal(details.taxes, 1.5);
    assert.equal(details.total, 42.32);
  });

  it("Input 2", function () {
    const order = [
      {
        description: "imported box of chocolates",
        type: "food",
        price: 10.0,
        imported: true,
        quantity: 1,
      },
      {
        description: "imported bottle of perfume",
        type: "beauty",
        price: 47.5,
        imported: true,
        quantity: 1,
      },
    ];
    const details = getOrderReceiptDetails(order);
    printReceipt(details);
    assert.equal(details.taxes, 7.65);
    assert.equal(details.total, 65.15);
 });

  it("Input 3", function () {
    const order = [
      {
        "description": "imported bottle of perfume",
        type: "beauty",
        price: 27.99,
        imported: true,
        quantity: 1,
      },
      {
        "description": "bottle of perfume",
        type: "beauty",
        price: 18.99,
        imported: false,
        quantity: 1,
      },
      {
        "description": "packet of headache pills",
        type: "medical",
        price: 9.75,
        imported: false,
        quantity: 1,
      },
      {
        "description": "imported box of chocolates",
        type: "food",
        price: 11.25,
        imported: true,
        quantity: 3,
      },
    ];
    const details = getOrderReceiptDetails(order);
    printReceipt(details);
    assert.equal(details.taxes, 7.9);
    assert.equal(details.total, 98.38);
  });
});
