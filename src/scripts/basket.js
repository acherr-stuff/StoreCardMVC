
export class busketListModel {
  constructor() {
    this.busketProducts = [];
  }
}

export class busketListView {
  constructor() {
    this.busket = this.getElement("#busket_table");
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
  }
  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }

  // updateElementData(element) {
  
  // }

  displayNewItem(item) {
    let busketItem = this.createElement("div", "busket__item");
    busketItem.setAttribute("data-id", item.id);
    this.busket.appendChild(busketItem);
    let busketItemTitle = this.createElement("div", "busket__item__title");
    busketItemTitle.textContent = item.name;
    busketItem.appendChild(busketItemTitle);

    let busketItemPrice = this.createElement("div", "busket__item__price");
    busketItemPrice.textContent = item.price;
    busketItem.appendChild(busketItemPrice);
    let busketItemCount = this.createElement("div", "busket__item__count");
    busketItem.appendChild(busketItemCount);

    let busketItemCountDown = this.createElement(
      "button",
      "busket__item__count__down"
    );
    busketItemCountDown.textContent = "-";
    busketItemCountDown.setAttribute("data-id", item.id);
    busketItemCount.appendChild(busketItemCountDown);

    let busketItemCountNumber = this.createElement(
      "div",
      "busket__item__count__number"
    );
    busketItemCountNumber.textContent = item.count;
    busketItemCountNumber.setAttribute("data-id", item.id);
    busketItemCount.appendChild(busketItemCountNumber);

    let busketItemCountUp = this.createElement(
      "button",
      "busket__item__count__up"
    );
    busketItemCountUp.textContent = "+";
    busketItemCountNumber.setAttribute("data-id", item.id);
    busketItemCount.appendChild(busketItemCountUp);

    let busketItemCost = this.createElement("div", "busket__item__cost");
    busketItemCost.textContent = item.cost;

    busketItem.appendChild(busketItemCost);

    let busketItemDelete = this.createElement("button", "busket__item__delete");
    busketItemDelete.textContent = "X";
    busketItemDelete.setAttribute("data-id", item.id);
    busketItem.appendChild(busketItemDelete);
  }
}

export  class busketListController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    // this.catalogProducts = [];
    // this.onBusketListChanged(this.model.busketProducts);
  }

  addToBusket(item) {
    //ищем есть ли в корзине товар с таким id
    let productInBusket = this.model.busketProducts.findIndex(
      (x) => x.id == item.id
    );

    if (productInBusket == -1) {
      //идем в эту ветку, если продукта с даннным id еще нет в корзине

      console.log("ветка1");

      this.model.busketProducts.push(item);

      console.log("число позиций в корзине" + this.model.busketProducts.length);

      item.count = 1;
      item.cost = item.price + " ₽";
      console.log("число " + item.count + "стоим" + item.cost);
      //отрисовываем новый элемент в корзин
      this.view.displayNewItem(item);
      // this.view.displayNewItem(this.model.busketProducts[productInBusket]);
    } else {
      console.log("ветка2");
      item.count++;
      item.cost += item.price + " ₽";

      console.log(item.count+ item.cost )
    }
  }

  removeFromBusket(item) {
    
  }
}
