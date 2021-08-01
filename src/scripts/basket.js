
export class busketListModel {
  constructor() {
    this.busketProducts = [];
    this.sumOfTheProducts = 0;
  }

  // deleteFromBusket(id) {
    
  //   this.busketProducts.splice(id - 1, 1);
  //   this.model.sumOfTheProducts =this.model.sumOfTheProducts - this.model.busketProducts[i].cost;

  //   console.log(this.model.busketProducts.length);
  // }
}
 
export class busketListView {
  constructor() {
    this.busket = this.getElement("#busket_table");
    this.busketBottom = this.getElement("#busket_bottom");
    this.emptyBusket = this.getElement("#empty_busket");
    
    // this.busket.className = "unactive";
    
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


  displayNewItem(item) {

    let busketItem = this.createElement("div", "busket__item");
    busketItem.setAttribute("data-id", item.id);
    this.busket.appendChild(busketItem);
    let busketItemTitle = this.createElement("div", "busket__item__title");
    busketItemTitle.textContent = item.name;
    busketItem.appendChild(busketItemTitle);

    let busketItemPrice = this.createElement("div", "busket__item__price");
    busketItemPrice.textContent = item.price + " ₽";
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
    busketItemCountUp.setAttribute("data-id", item.id);
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
  bindIncreaseCount(handler) {
    this.busket.addEventListener("click", (event) => {
      if (event.target.className === "busket__item__count__up") {
        const id = event.target.dataset.id;
        handler(id);
        // console.log("счетчик увеличен!");
      }
    });
  }
  bindDecreaseCount(handler) {
    this.busket.addEventListener("click", (event) => {
      if (event.target.className === "busket__item__count__down") {
        const id = event.target.dataset.id;
        handler(id);
        // console.log("счетчик увеличен!");
      }
    });
  }
}

export class busketListController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.onBusketListChanged(this.model.busketProducts);
  }

  onBusketListChanged(items) {
    this.view.bindRemoveFromBusket(this.handleRemoveFromBusket.bind(this));
    this.view.bindIncreaseCount(this.handleIncreaseCount.bind(this));
    this.view.bindDecreaseCount(this.handleDecreaseCount.bind(this));

    if (this.model.busketProducts.length == 0) {
      this.view.busket.classList.add("unactive");
    }
  }

  // bindBusketListChanged(callback) {
  //   this.onBusketListChanged = callback;
  // }

  deleteFromBusket(id) {
    let tL = document.querySelectorAll(".busket__item");

    if (tL.length == 1) {
      this.view.busket.classList.add("unactive");
      this.view.emptyBusket.classList.remove("unactive");
    }

    for (let i = 0; i < this.model.busketProducts.length; i++) {
      if (tL[i].dataset.id == id) {
        this.model.sumOfTheProducts =
          this.model.sumOfTheProducts - this.model.busketProducts[i].cost;
        this.view.busketBottom.innerText =
          "ИТОГО: " + this.model.sumOfTheProducts + " Р";
        //удаление товара из массива элементов корзины
        this.model.busketProducts.splice(id - 1, 1);

        //удалить div товара из корзины
        removeRow(tL[i]);
      }
    }

    console.log(this.model.busketProducts.length);
  }

  handleRemoveFromBusket(id) {
    this.deleteFromBusket(id);
  }

  handleDecreaseCount(id) {
    let tCount = document.querySelectorAll(".busket__item__count__number");

    for (let i = 0; i < this.model.busketProducts.length; i++) {
      if (
        tCount[i].dataset.id == id &&
        this.model.busketProducts[i].count > 1
      ) {
        this.model.busketProducts[i].count--;
        this.model.busketProducts[i].cost -= this.model.busketProducts[i].price;

        // console.log(this.model.busketProducts[i].cost);

        document
          .getElementById("busket_table")
          .querySelector('[data-id="' + id + '"]')
          .querySelector(".busket__item__count__number").innerText =
          this.model.busketProducts[i].count;

        document
          .getElementById("busket_table")
          .querySelector('[data-id="' + id + '"]')
          .querySelector(".busket__item__cost").innerText =
          this.model.busketProducts[i].cost;

        this.model.sumOfTheProducts =
          this.model.sumOfTheProducts - this.model.busketProducts[i].price;
        this.view.busketBottom.innerText =
          "ИТОГО: " + this.model.sumOfTheProducts + " Р";
      }
    }
  }

  handleIncreaseCount(id) {
    let tCount = document.querySelectorAll(".busket__item__count__number");
    //увеличим значение счетчика
    for (let i = 0; i < this.model.busketProducts.length; i++) {
      if (tCount[i].dataset.id == id) {
        this.model.busketProducts[i].count++;
        this.model.busketProducts[i].cost += this.model.busketProducts[i].price;

        console.log(this.model.busketProducts[i].cost);

        document
          .getElementById("busket_table")
          .querySelector('[data-id="' + id + '"]')
          .querySelector(".busket__item__count__number").innerText =
          this.model.busketProducts[i].count;

        document
          .getElementById("busket_table")
          .querySelector('[data-id="' + id + '"]')
          .querySelector(".busket__item__cost").innerText =
          this.model.busketProducts[i].cost;

        this.model.sumOfTheProducts =
          this.model.sumOfTheProducts + this.model.busketProducts[i].price;
        this.view.busketBottom.innerText =
          "ИТОГО: " + this.model.sumOfTheProducts + " Р";
      }
    }
  }

  addToBusket(item) {
    //ищем есть ли в корзине товар с таким id
    let productInBusket = this.model.busketProducts.findIndex(
      (x) => x.id == item.id
    );

    if (this.model.busketProducts.length == 0) {
      this.view.busket.classList.remove("unactive");
      this.view.emptyBusket.classList.add("unactive");
    }

    if (productInBusket == -1) {
      //идем в эту ветку, если продукта с даннным id еще нет в корзине

      this.model.busketProducts.push(item);

      item.count = 1;
      item.cost = item.price * item.count;

      //отрисовываем новый элемент в корзин
      this.view.displayNewItem(item);

      this.model.sumOfTheProducts = this.model.sumOfTheProducts + item.price;
      this.view.busketBottom.innerText =
        "ИТОГО: " + this.model.sumOfTheProducts + " Р";
    } else {
      //если есть товар с передаваемым id

      item.count++;
      item.cost = item.price * item.count;

      document
        .getElementById("busket_table")
        .querySelector('[data-id="' + item.id + '"]')
        .querySelector(".busket__item__count__number").innerText = item.count;

      document
        .getElementById("busket_table")
        .querySelector('[data-id="' + item.id + '"]')
        .querySelector(".busket__item__cost").innerText = item.cost + " ₽";

      this.model.sumOfTheProducts = this.model.sumOfTheProducts + item.price;
      this.view.busketBottom.innerText =
        "ИТОГО: " + this.model.sumOfTheProducts + " Р";
    }
  }

  // handleAddToBusket(id) {

  //   if (this.model.busketProducts.length != 0) {
  //     this.view.busket.classList.remove("unactive");
  //     this.view.emptyBusket.classList.add("unactive");
  //   }

  //   this.addToBusket(id);

  // }
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


