export class busketListModel {
  constructor() {
    if (JSON.parse(localStorage.getItem("cart"))) {
      this.busketProducts = JSON.parse(localStorage.getItem("cart"));
      this.sumOfTheProducts = JSON.parse(localStorage.getItem("busket_sum_ls"));
    } else {
      this.busketProducts = [];
      this.sumOfTheProducts = 0;
    }
  }

  deleteFromBusket(id) {
    let delProduct = this.busketProducts.findIndex((x) => x.id == id);

    this.sumOfTheProducts =
      this.sumOfTheProducts - this.busketProducts[delProduct].cost;

    this.busketProducts.splice(delProduct, 1);

    localStorage.setItem("cart", JSON.stringify(this.busketProducts));

    localStorage.setItem(
      "busket_sum_ls",
      JSON.stringify(this.sumOfTheProducts)
    );

    console.log("товары в корзине:", this.busketProducts);
  }

  decreaseItemCount(item) {
    let decProduct = this.busketProducts.findIndex((x) => x.id == item.id);

    if (this.busketProducts[decProduct].count > 1) {
      this.busketProducts[decProduct].count--;

      this.busketProducts[decProduct].cost -=
        this.busketProducts[decProduct].price;

      localStorage.setItem("cart", JSON.stringify(this.busketProducts));

      this.sumOfTheProducts =
        this.sumOfTheProducts - this.busketProducts[decProduct].price;

      localStorage.setItem(
        "busket_sum_ls",
        JSON.stringify(this.sumOfTheProducts)
      );
    }

    console.log("товары в корзине:", this.busketProducts);
  }

  increaseItemCount(item) {
    let incProduct = this.busketProducts.findIndex((x) => x.id == item.id);

    this.busketProducts[incProduct].count++;

    this.busketProducts[incProduct].cost +=
      this.busketProducts[incProduct].price;

    localStorage.setItem("cart", JSON.stringify(this.busketProducts));

    this.sumOfTheProducts =
      this.sumOfTheProducts + this.busketProducts[incProduct].price;

    localStorage.setItem(
      "busket_sum_ls",
      JSON.stringify(this.sumOfTheProducts)
    );

    console.log("товары в корзине:", this.busketProducts);
  }

  addToBusket(item) {
    //ищем есть ли в корзине товар с таким id
    let productInBusket = this.busketProducts.findIndex((x) => x.id == item.id);

    if (productInBusket == -1) {
      //идем в эту ветку, если продукта с даннным id еще нет в корзине

      this.busketProducts.push(item);
      // item.count = 1;
      item.cost = item.price * item.count;
      // localStorage.setItem("added to busket", item.name)
      // localStorage.setItem("cart", JSON.stringify(this.busketProducts));
    } else {
      //если есть товар с передаваемым id
      // item.count++;
      item.cost = item.price * item.count;
      // localStorage.setItem("cart",JSON.stringify(this.busketProducts));
    }
  }
}

export class busketListView {
  constructor() {
    this.busket = this.getElement("#busket_table");
    this.busketBottom = this.getElement("#busket_bottom");
    this.emptyBusket = this.getElement("#empty_busket");
    this.busketBottomSumm = this.getElement(".busket_bottom__summ");
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
  //удаление строчки из таблицы
  removeRow(input) {
    // Теперь мы получаем родительский элемент для входного элемента, помеченный как anyRow, поэтому мы не полагаемся на фиксированную структуру dom
    // Кроме того, нам больше не нужно получать parentDiv
    var tP = (function getParent(e) {
      return e.className.indexOf("busket__item") !== -1 || !e.parentNode
        ? e
        : getParent(e.parentNode);
    })(input);

    if (tP) tP.parentNode.removeChild(tP);
  }

  deleteItemFromBusketPage(id) {
    let tL = document.querySelectorAll(".busket__item");

    if (tL.length == 1) {
      this.busket.classList.add("unactive");
      this.emptyBusket.classList.remove("unactive");
    }

    for (let i = 0; i < tL.length; i++) {
      if (tL[i].dataset.id == id) {
        this.removeRow(tL[i]);
      }
    }
    // console.log(this.model.busketProducts.length);
  }

  //методы для изменения представления при работе с каунтером идентичны, можно сделать метод "updateItemCount"

  updateItemCount(item) {
    let tCount = document.querySelectorAll(".busket__item__count__number");
    let tCost = document.querySelectorAll(".busket__item__cost");

    for (let i = 0; i < tCount.length; i++) {
      if (tCount[i].dataset.id == item.id) {
        tCount[i].innerText = item.count;
        tCost[i].innerText = item.cost;
      }
    }
  }

  //если в localstorage уже есть товары з корзины, то выводим их при загрузке страницы
  displayItemsFromStorage() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    for (let key in cart) {
      // console.log(cart[key].name + " находится в корзине")
      this.displayNewItem(cart[key]);
    }
  }

  displayNewItem(item) {
    //меняем отображение корзин
    this.busket.classList.remove("unactive");
    this.emptyBusket.classList.add("unactive");

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
      }
    });
  }
  bindDecreaseCount(handler) {
    this.busket.addEventListener("click", (event) => {
      if (event.target.className === "busket__item__count__down") {
        const id = event.target.dataset.id;
        handler(id);
      }
    });
  }
}

export class busketListController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.onBusketListChanged(this.model.busketProducts);

    console.log("уже в корзине" + this.model.busketProducts);

    window.addEventListener(
      "storage",
      (e) => {
        console.log("Обрабатываем в корзине изменение localStorage");
        const cart = JSON.parse(localStorage.getItem("cart"));

        for (let key in cart) {
          // Добавить только тот, которого нету
          this.addToBusket(cart[key]);
        }

        if (JSON.parse(localStorage.getItem("cart"))) {
          this.model.busketProducts = JSON.parse(localStorage.getItem("cart"));
        }

        if (JSON.parse(localStorage.getItem("busket_sum_ls"))) {
          this.model.sumOfTheProducts = JSON.parse(
            localStorage.getItem("busket_sum_ls")
          );
        }
      },
      false
    );
  }

  onBusketListChanged(items) {
    this.view.displayItemsFromStorage();
    this.view.bindRemoveFromBusket(this.handleRemoveFromBusket.bind(this));
    this.view.bindIncreaseCount(this.handleIncreaseCount.bind(this));
    this.view.bindDecreaseCount(this.handleDecreaseCount.bind(this));

    if (this.model.busketProducts.length == 0) {
      this.view.busket.classList.add("unactive");
    }
    this.view.busketBottomSumm.innerText = this.model.sumOfTheProducts;
  }

  handleRemoveFromBusket(id) {
    this.model.deleteFromBusket(id);
    this.view.deleteItemFromBusketPage(id);
    this.view.busketBottomSumm.innerText =
      JSON.parse(localStorage.getItem("busket_sum_ls")) + " ₽";
  }

  handleDecreaseCount(id) {
    // this.view.displayItemsFromStorage();
    const item = this.model.busketProducts.find((x) => x.id == id);
    this.model.decreaseItemCount(item);
    this.view.updateItemCount(item);
    this.view.busketBottomSumm.innerText =
      JSON.parse(localStorage.getItem("busket_sum_ls")) + " ₽";
  }

  handleIncreaseCount(id) {
    const item = this.model.busketProducts.find((x) => x.id == id);
    this.model.increaseItemCount(item);
    this.view.updateItemCount(item);
    this.view.busketBottomSumm.innerText =
      JSON.parse(localStorage.getItem("busket_sum_ls")) + " ₽";
  }

  addToBusket(item) {
    //ищем, есть ли товар item в корзине
    let productInBusket = this.model.busketProducts.findIndex(
      (x) => x.id == item.id
    );

    this.model.addToBusket(item);

    //ищем есть ли в корзине товар с таким id
    if (productInBusket == -1) {
      //отрисовываем позицию для данного товара заново. если нет
      this.view.displayNewItem(item);
    } else {
      //обновляем данные для уже отрисованной позиции
      this.view.updateItemCount(item);
    }
    this.view.busketBottomSumm.innerText =
      JSON.parse(localStorage.getItem("busket_sum_ls")) + " ₽";
  }
}
