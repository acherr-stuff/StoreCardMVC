
// Подключаем стили
import 'normalize.css';
import '../styles/index.scss';


// Подключаем скрипты
import { busketListView, busketListModel, busketListController } from './basket';
import  "./catalog";


const busket = new busketListController(
  new busketListModel(),
  new busketListView()
);





