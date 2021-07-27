
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

  // deleteElement(item) {
  //     const deletedElement = this.busketProsucts[
  //         this.busketProsucts.findIndex((x) => x.id == item.id)
  //       ];

  //       if (deletedElement > -1) {

  //          this.busketProsucts.splice(deletedElement,1)
  //       }
  //     console.log("массив после удаление" + this.busketProsucts.length);

  // }

  // updateElementData(item) {

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

  bindRemoveFromBusket(handler) {
    this.busket.addEventListener("click", (event) => {
      if (event.target.className === "busket__item__delete") {
        const id = event.target.dataset.id;
        handler(id);
        console.log("товар удален!");
      }
    });
  }
}

export  class busketListController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.onBusketListChanged(this.model.busketProducts);
  }

  onBusketListChanged(items) {
    this.view.bindRemoveFromBusket(this.handleRemoveFromBusket.bind(this));
  }

  
  deleteFromBusket(id) {
    let tL = document.querySelectorAll(".busket__item");

    for (let i=0; i<this.model.busketProducts.length; i++) {
      
            if (tL[i].dataset.id == id) {

          //удаление товара из массива элементов корзины
          // let delitingID = this.model.busketProducts.findIndex((x) => x.id == id );
          this.model.busketProducts.splice(id, 1 );
            
            //удалить div товара из корзины
            removeRow(tL[i]);
      }
    }
  }

  handleRemoveFromBusket(id) {
    this.deleteFromBusket(id)
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

      console.log(item.count + item.cost);
    }
  }

}


function removeRow(input) {
  //Now we are getting the parent for the input element, marked as anyRow so we do not rely on fixed dom structure
  //Furthermore we do not need to retrieve parentDiv anymore
  var tP = (function getParent(e) {
    return e.className.indexOf("busket__item") !== -1 || !e.parentNode
      ? e
      : getParent(e.parentNode);
  })(input);

  if (tP) tP.parentNode.removeChild(tP);
}

