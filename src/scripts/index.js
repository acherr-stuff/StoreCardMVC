
// Подключаем стили
import 'normalize.css';
import '../styles/index.scss';


// Подключаем скрипты
import { busketListView, busketListModel, busketListController } from './basket';
import { catalogListView, catalogListModel, catalogListController } from "./catalog";

const catalog = new catalogListController(
  new catalogListModel(),
  new catalogListView()
);

const busket = new busketListController(
  new busketListModel(),
  new busketListView()
);


//добавление в контролер каталога метода "addtoBusket"

catalog.addToBusket = function (item) {
  busket.addToBusket(item);
};



