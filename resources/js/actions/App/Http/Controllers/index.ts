import Auth from './Auth'
import HomeController from './HomeController'
import TrackerController from './TrackerController'
import LocaleController from './LocaleController'
import Admin from './Admin'
const Controllers = {
    Auth: Object.assign(Auth, Auth),
HomeController: Object.assign(HomeController, HomeController),
TrackerController: Object.assign(TrackerController, TrackerController),
LocaleController: Object.assign(LocaleController, LocaleController),
Admin: Object.assign(Admin, Admin),
}

export default Controllers