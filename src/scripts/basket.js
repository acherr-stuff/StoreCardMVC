
export class busketListModel {
  constructor() {
    // this.busketProducts = [];
    this.busketProducts = JSON.parse(localStorage.getItem("busket_list")) || [];
    // this.sumOfTheProducts = 0;
    // this.sumProductsLCBefore = 0;
    this.sumOfTheProducts = JSON.parse(localStorage.getItem("busket_sum_ls")) || 0;


  }

  deleteFromBusket(id) {
    let delProduct = this.busketProducts.findIndex((x) => x.id == id);

    this.sumOfTheProducts = this.sumOfTheProducts - this.busketProducts[delProduct].cost;

    this.busketProducts.splice(delProduct, 1);

    localStorage.setItem("busket_list", JSON.stringify(this.busketProducts));

    localStorage.setItem( "busket_sum_ls", JSON.stringify(this.sumOfTheProducts));

  }

  decreaseItemCount(item) {
    let decProduct = this.busketProducts.findIndex((x) => x.id == item.id);

    if (this.busketProducts[decProduct].count > 1) {
      this.busketProducts[decProduct].count--;
      this.busketProducts[decProduct].cost -=
        this.busketProducts[decProduct].price;

         localStorage.setItem(
           "busket_list",
           JSON.stringify(this.busketProducts)
         );
      
      this.sumOfTheProducts =
        this.sumOfTheProducts - this.busketProducts[decProduct].price;

            localStorage.setItem(
              "busket_sum_ls",
              JSON.stringify(this.sumOfTheProducts)
            );
    }
           
  }

  increaseItemCount(item) {
    let incProduct = this.busketProducts.findIndex((x) => x.id == item.id);

    this.busketProducts[incProduct].count++;
    this.busketProducts[incProduct].cost +=
      this.busketProducts[incProduct].price;

      localStorage.setItem("busket_list", JSON.stringify(this.busketProducts));

    this.sumOfTheProducts =
      this.sumOfTheProducts + this.busketProducts[incProduct].price;

    localStorage.setItem("busket_sum_ls", JSON.stringify(this.sumOfTheProducts) );


    console.log("счетч увел, сумма покупок - ", this.sumOfTheProducts);
  }

  addToBusket(item) {
    //ищем есть ли в корзине товар с таким id
    let productInBusket = this.busketProducts.findIndex((x) => x.id == item.id);

    if (productInBusket == -1) {
      //идем в эту ветку, если продукта с даннным id еще нет в корзине

      this.busketProducts.push(item);

      item.count = 1;
      item.cost = item.price * item.count;

      localStorage.setItem("added to busket", item.name)
      localStorage.setItem("busket_list", JSON.stringify(this.busketProducts));

    } else {
      //если есть товар с передаваемым id

      item.count++;
      item.cost = item.price * item.count;
      localStorage.setItem("busket_list",JSON.stringify(this.busketProducts));

    }

      // console.log("summ prev" + this.sumOfTheProducts);

    //итоговая сумма всех товаров
    this.sumOfTheProducts = this.sumOfTheProducts + item.price;

    // console.log("summ " this.sumOfTheProducts);
    localStorage.setItem("busket_sum_ls", JSON.stringify(this.sumOfTheProducts) );

  }

}
  
 
export class busketListView {
  constructor() {
    this.busket = this.getElement("#busket_table");
    this.busketBottom = this.getElement("#busket_bottom");
    this.emptyBusket = this.getElement("#empty_busket");
    this.busketBottomSumm = this.getElement(".busket_bottom__summ");
    // this.sumProductsLCBefore = 0
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
  //удаление элемента
  removeRow(input) {
    //Now we are getting the parent for the input element, marked as anyRow so we do not rely on fixed dom structure
    //Furthermore we do not need to retrieve parentDiv anymore
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

  displayItemsFromStorage(items) {
    while (this.busket.firstChild) {
      this.busket.removeChild(this.busket.firstChild);
    }

    //Если каталог пуст, показать сообщение
    if (items.length == 0) {
      console.log("пусто");
      // const p = this.createElement("p");
      // p.textContent = "В каталоге на данный момент нет товаров";
      // this.catalog.append(p);
    } else {
      items.forEach((item) => {
        this.displayNewItem(item);
        console.log("отрисовано");
        // this.sumProductsLCBefore += item.cost;
      });

      // this.busketBottomSumm.innerText = this.sumProductsLCBefore;
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
  }

  onBusketListChanged(items) {
    this.view.displayItemsFromStorage(items);
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
          JSON.parse(localStorage.getItem("busket_sum_ls")) + " Р";

  }

  handleDecreaseCount(id) {
    const item = this.model.busketProducts.find((x) => x.id == id);
    this.model.decreaseItemCount(item);
    this.view.updateItemCount(item);
        this.view.busketBottomSumm.innerText =
          JSON.parse(localStorage.getItem("busket_sum_ls")) + " Р";


    
  }

  handleIncreaseCount(id) {
    const item = this.model.busketProducts.find((x) => x.id == id);
    this.model.increaseItemCount(item);
    this.view.updateItemCount(item);
    this.view.busketBottomSumm.innerText = JSON.parse(localStorage.getItem("busket_sum_ls")) + " Р";


   
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
    } 
    
    else {
      //обновляем данные для уже отрисованной позиции
      this.view.updateItemCount(item);
      }
          this.view.busketBottomSumm.innerText =
            JSON.parse(localStorage.getItem("busket_sum_ls")) + " Р";

    }
  
  }
