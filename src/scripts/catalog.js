
import pic1 from "../assets/images/pic1.jpg";
import pic2 from "../assets/images/pic2.jpg";
import pic3 from "../assets/images/pic3.jpg";

const cart = [
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

const listElement = document.createElement("div");
listElement.className = "productList";

for (let i = 0; i < cart.length; i++) {
  const productElement = document.createElement("div");
  productElement.className = "product";

  const productDefinition = document.createElement("div");
  productDefinition.className = "product__definition";

  // Title
  const productTitle = document.createElement("div");
  productTitle.className = "product__definition__title";
  productTitle.innerText = cart[i].name;
  productDefinition.appendChild(productTitle);

  // Price
  const productPrice = document.createElement("div");

  productPrice.innerText = cart[i].price + " Р";
  productDefinition.appendChild(productPrice);

  productElement.appendChild(productDefinition);

  // Button
  const productButton = document.createElement("button");
  productButton.className = "addButton";
  productButton.innerText = "Добавить в корзину";
  productButton.dataset["id"] = cart[i].id;
  productElement.appendChild(productButton);

  listElement.appendChild(productElement);
}

// document.body.appendChild(listElement);

document.getElementById("catalog").appendChild(listElement);
document.querySelector(".productList").addEventListener("click", (event) => {
  if (event.target.classList.contains("addButton")) {
    console.log("начинаем добавление в корзину");

    let data;

    let totalSum = 0; //сумма всех покупок

    if (JSON.parse(localStorage.getItem("cart"))) {
      data = JSON.parse(localStorage.getItem("cart"));
      console.log("товары в корзине: ", data);
    } else {
      data = [];

      console.log("товары в пустой корзине: ", data);
    }

    if (JSON.parse(localStorage.getItem("busket_sum_ls"))) {
      totalSum = JSON.parse(localStorage.getItem("busket_sum_ls"));
    } else {
      totalSum = 0;
    }

    let id = event.target.dataset["id"];

    console.log("добавляем элемент с id = ", id);

    //найти элемент с нужным id в массиве data
    let dataProduct = data.findIndex((x) => x.id == id);
    let cartProduct = cart.findIndex((x) => x.id == id);

    if (data[dataProduct] !== undefined) {
      data[dataProduct]["count"]++;
      data[dataProduct]["cost"] =
        data[dataProduct]["count"] * data[dataProduct]["price"];
      totalSum = totalSum + data[dataProduct].price;
    } else {
      // data[dataProduct] = cart[cartProduct];
      data.push(cart[cartProduct]);
      data[data.length - 1]["count"] = 1;
      data[data.length - 1]["cost"] =
        data[data.length - 1]["count"] * data[data.length - 1]["price"];
      totalSum = totalSum + data[data.length - 1].price;
    }
    // console.log("data_id", data[id])
    localStorage.setItem("cart", JSON.stringify(data));
    localStorage.setItem("busket_sum_ls", JSON.stringify(totalSum));
    window.dispatchEvent(new Event("storage"));
  }
});