import OrderController from './OrderController'
import PosController from './PosController'
import MenuController from './MenuController'
import InventoryController from './InventoryController'
import UserController from './UserController'
import KitchenController from './KitchenController'
import SettingsController from './SettingsController'
const Admin = {
    OrderController: Object.assign(OrderController, OrderController),
PosController: Object.assign(PosController, PosController),
MenuController: Object.assign(MenuController, MenuController),
InventoryController: Object.assign(InventoryController, InventoryController),
UserController: Object.assign(UserController, UserController),
KitchenController: Object.assign(KitchenController, KitchenController),
SettingsController: Object.assign(SettingsController, SettingsController),
}

export default Admin