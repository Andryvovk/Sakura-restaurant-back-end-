const expect = require("chai").expect;
const sinon = require("sinon");

const Order = require("../models").Order;
const OrderController = require("../controllers/orders");

describe("Order controller", () => {
  it("should throw an error if order.length is undefind", done => {
    Order.findAll().then(order => {
      expect(undefined).not.to.equal(order.length);
      done();
    });
  });
  it("should throw error if order wasn`t add", done => {
    sinon.stub(Order, "create");
    Order.create.throws();
    const req = {
      body: {
        name: "tester",
        username: "order",
        UserId: "sadas"
      }
    };
    OrderController.addOrders(req, {}, () => {}).then(result => {
      expect(result).to.have.property("statusCode", 500);
      done();
    });
    Order.create.restore();
  });
  it("should test destroy method", done => {
    sinon.stub(Order, "destroy");
    Order.destroy.throws();
    const req = {
      body: {
        id: 1,
      }
    };
    OrderController.submitOrders(req, {}, () => {}).then(result => {
      expect(result).to.have.property("statusCode", 500);
      done();
    });
    Order.destroy.restore();
  });
});
