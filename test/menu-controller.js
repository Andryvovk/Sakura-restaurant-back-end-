const expect = require("chai").expect;
const sinon = require("sinon");

const Menu = require("../models").Menu;
const Dish = require("../models").Dish;

const MenuController = require("../controllers/menu");

describe("get menu", () => {
  it("should throw an error if menu is empty", done => {
    Menu.findAll({
      include: [Dish]
    }).then(menu => {
      expect(menu.length).to.equal(5);
      done();
    });
  });
});
describe("Menu add dish", () => {
  it("should throw error if dish wasn`t add", done => {
    sinon.stub(Dish, "create");
    Dish.create.throws();
    const req = {
      body: {
        name: "tester",
        pass: "tester",
        MenuId: 'sadas'
      }
    };
    MenuController.addDish(req, {}, () => {}).then(result => {
      expect(result).to.have.property("statusCode", 500);
      done();
    });

    Dish.create.restore();
  });
});
