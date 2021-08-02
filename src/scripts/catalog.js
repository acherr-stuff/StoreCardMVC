
import pic1 from "../assets/images/pic1.jpg";
import pic2 from "../assets/images/pic2.jpg";
import pic3 from "../assets/images/pic3.jpg";


export class catalogListModel {
  constructor() {
    this.catalogProducts = [
      {
        id: "1",
        name: "Смартфон DEXP A250",
        image: pic1,
        price: 3000,
        definition: "",
      },
      {
        id: "2",
        name: "Планшет DEXP A250",
        image: pic2,
        price: 3000,
        definition: "",
      },
      {
        id: "3",
        name: "Ноутбук DEXP A250",
        image: pic3,
        price: 3000,
        definition: "",
      },
      {
        id: "4",
        name: "Телевизор DEXP A250",
        image: pic1,
        price: 3000,
        definition: "",
      },
      {
        id: "5",
        name: "Часы DEXP A250",
        image: pic2,
        price: 3000,
        definition: "",
      },
      {
        id: "6",
        name: "Колонки DEXP A250",
        image: pic3,
        price: 3000,
        definition: "",
      },
    ];
  }
}

export class catalogListView {
  constructor() {
    this.catalog = this.getElement("#catalog");
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

  displayItems(items) {
    while (this.catalog.firstChild) {
      this.catalog.removeChild(this.catalog.firstChild);
    }
    //Если каталог пуст, показать сообщение
    if (items.length === 0) {
      const p = this.createElement("p");
      p.textContent = "В каталоге на данный момент нет товаров";
      this.catalog.append(p);
    } else {
      items.forEach((item) => {
        let catalogItem = this.createElement("div", "product");
        catalogItem.setAttribute("data-id", item.id);
        this.catalog.append(catalogItem);
        let catalogItemDefinition = this.createElement(
          "div",
          "product__definition"
        );
        catalogItem.appendChild(catalogItemDefinition);

        let catalogItemTitle = this.createElement(
          "div",
          "product__definition__title"
        );
        catalogItemTitle.textContent = item.name;
        catalogItemDefinition.appendChild(catalogItemTitle);

        let catalogItemImage = this.createElement(
          "img",
          "product__definition__image"
        );
        catalogItemImage.setAttribute("src", item.image);
        catalogItemDefinition.appendChild(catalogItemImage);

        let catalogItemPrice = this.createElement(
          "div",
          "product__definition__price"
        );
        catalogItemPrice.textContent = item.price + " ₽";
        catalogItemDefinition.appendChild(catalogItemPrice);

        let catalogItemAdd = this.createElement("div", "product__button");
        catalogItem.appendChild(catalogItemAdd);

        let addButton = this.createElement("button", "add_button");
        addButton.textContent = "В КОРЗИНУ";
        addButton.setAttribute("data-id", item.id);
        catalogItemAdd.appendChild(addButton);
      });
    }
  }


  bindAddToBusket(handler) {
    this.catalog.addEventListener("click", (event) => {
      if (event.target.className === "add_button") {
        const id = event.target.dataset.id;

        handler(id);

        console.log("товар добавлен в корзину!");
      }
    });
  }
}

export class catalogListController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.onCatalogListChanged(this.model.catalogProducts);
  }

  onCatalogListChanged(items) {
    this.view.displayItems(items);
    this.view.bindAddToBusket(this.handleAddToBusket.bind(this));
  }

  handleAddToBusket(id) {
    let itemIndex = this.model.catalogProducts.findIndex((x) => x.id == id);
    let item = this.model.catalogProducts[itemIndex];
    if (this.addToBusket) {
      this.addToBusket(item);
    }
  }
}
