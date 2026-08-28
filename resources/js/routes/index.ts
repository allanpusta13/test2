import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../wayfinder'
/**
* @see \App\Http\Controllers\Auth\AuthController::login
 * @see app/Http/Controllers/Auth/AuthController.php:23
 * @route '/login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::login
 * @see app/Http/Controllers/Auth/AuthController.php:23
 * @route '/login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::login
 * @see app/Http/Controllers/Auth/AuthController.php:23
 * @route '/login'
 */
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\AuthController::login
 * @see app/Http/Controllers/Auth/AuthController.php:23
 * @route '/login'
 */
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\AuthController::login
 * @see app/Http/Controllers/Auth/AuthController.php:23
 * @route '/login'
 */
    const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: login.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\AuthController::login
 * @see app/Http/Controllers/Auth/AuthController.php:23
 * @route '/login'
 */
        loginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\AuthController::login
 * @see app/Http/Controllers/Auth/AuthController.php:23
 * @route '/login'
 */
        loginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    login.form = loginForm
/**
* @see \App\Http\Controllers\Auth\AuthController::logout
 * @see app/Http/Controllers/Auth/AuthController.php:183
 * @route '/logout'
 */
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::logout
 * @see app/Http/Controllers/Auth/AuthController.php:183
 * @route '/logout'
 */
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::logout
 * @see app/Http/Controllers/Auth/AuthController.php:183
 * @route '/logout'
 */
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\AuthController::logout
 * @see app/Http/Controllers/Auth/AuthController.php:183
 * @route '/logout'
 */
    const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: logout.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\AuthController::logout
 * @see app/Http/Controllers/Auth/AuthController.php:183
 * @route '/logout'
 */
        logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: logout.url(options),
            method: 'post',
        })
    
    logout.form = logoutForm
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
export const register = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})

register.definition = {
    methods: ["get","head"],
    url: '/register',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
register.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
register.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: register.url(options),
    method: 'head',
})

    /**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
    const registerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: register.url(options),
        method: 'get',
    })

            /**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
        registerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: register.url(options),
            method: 'get',
        })
            /**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
        registerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: register.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    register.form = registerForm
/**
* @see \App\Http\Controllers\HomeController::home
 * @see app/Http/Controllers/HomeController.php:27
 * @route '/'
 */
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomeController::home
 * @see app/Http/Controllers/HomeController.php:27
 * @route '/'
 */
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::home
 * @see app/Http/Controllers/HomeController.php:27
 * @route '/'
 */
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomeController::home
 * @see app/Http/Controllers/HomeController.php:27
 * @route '/'
 */
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomeController::home
 * @see app/Http/Controllers/HomeController.php:27
 * @route '/'
 */
    const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: home.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomeController::home
 * @see app/Http/Controllers/HomeController.php:27
 * @route '/'
 */
        homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomeController::home
 * @see app/Http/Controllers/HomeController.php:27
 * @route '/'
 */
        homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    home.form = homeForm
/**
* @see \App\Http\Controllers\LocaleController::translations
 * @see app/Http/Controllers/LocaleController.php:34
 * @route '/translations/{locale?}'
 */
export const translations = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: translations.url(args, options),
    method: 'get',
})

translations.definition = {
    methods: ["get","head"],
    url: '/translations/{locale?}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LocaleController::translations
 * @see app/Http/Controllers/LocaleController.php:34
 * @route '/translations/{locale?}'
 */
translations.url = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { locale: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "locale",
        ])

    const parsedArgs = {
                        locale: args?.locale,
                }

    return translations.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LocaleController::translations
 * @see app/Http/Controllers/LocaleController.php:34
 * @route '/translations/{locale?}'
 */
translations.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: translations.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LocaleController::translations
 * @see app/Http/Controllers/LocaleController.php:34
 * @route '/translations/{locale?}'
 */
translations.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: translations.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LocaleController::translations
 * @see app/Http/Controllers/LocaleController.php:34
 * @route '/translations/{locale?}'
 */
    const translationsForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: translations.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LocaleController::translations
 * @see app/Http/Controllers/LocaleController.php:34
 * @route '/translations/{locale?}'
 */
        translationsForm.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: translations.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LocaleController::translations
 * @see app/Http/Controllers/LocaleController.php:34
 * @route '/translations/{locale?}'
 */
        translationsForm.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: translations.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    translations.form = translationsForm
/**
* @see \App\Http\Controllers\Admin\OrderController::orders
 * @see app/Http/Controllers/Admin/OrderController.php:31
 * @route '/orders'
 */
export const orders = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: orders.url(options),
    method: 'get',
})

orders.definition = {
    methods: ["get","head"],
    url: '/orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\OrderController::orders
 * @see app/Http/Controllers/Admin/OrderController.php:31
 * @route '/orders'
 */
orders.url = (options?: RouteQueryOptions) => {
    return orders.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\OrderController::orders
 * @see app/Http/Controllers/Admin/OrderController.php:31
 * @route '/orders'
 */
orders.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: orders.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\OrderController::orders
 * @see app/Http/Controllers/Admin/OrderController.php:31
 * @route '/orders'
 */
orders.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: orders.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\OrderController::orders
 * @see app/Http/Controllers/Admin/OrderController.php:31
 * @route '/orders'
 */
    const ordersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: orders.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\OrderController::orders
 * @see app/Http/Controllers/Admin/OrderController.php:31
 * @route '/orders'
 */
        ordersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: orders.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\OrderController::orders
 * @see app/Http/Controllers/Admin/OrderController.php:31
 * @route '/orders'
 */
        ordersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: orders.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    orders.form = ordersForm
/**
* @see \App\Http\Controllers\Admin\PosController::pos
 * @see app/Http/Controllers/Admin/PosController.php:28
 * @route '/pos'
 */
export const pos = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pos.url(options),
    method: 'get',
})

pos.definition = {
    methods: ["get","head"],
    url: '/pos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PosController::pos
 * @see app/Http/Controllers/Admin/PosController.php:28
 * @route '/pos'
 */
pos.url = (options?: RouteQueryOptions) => {
    return pos.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PosController::pos
 * @see app/Http/Controllers/Admin/PosController.php:28
 * @route '/pos'
 */
pos.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pos.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\PosController::pos
 * @see app/Http/Controllers/Admin/PosController.php:28
 * @route '/pos'
 */
pos.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pos.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\PosController::pos
 * @see app/Http/Controllers/Admin/PosController.php:28
 * @route '/pos'
 */
    const posForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: pos.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\PosController::pos
 * @see app/Http/Controllers/Admin/PosController.php:28
 * @route '/pos'
 */
        posForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pos.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\PosController::pos
 * @see app/Http/Controllers/Admin/PosController.php:28
 * @route '/pos'
 */
        posForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pos.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    pos.form = posForm
/**
* @see \App\Http\Controllers\Admin\MenuController::menu
 * @see app/Http/Controllers/Admin/MenuController.php:31
 * @route '/menu'
 */
export const menu = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: menu.url(options),
    method: 'get',
})

menu.definition = {
    methods: ["get","head"],
    url: '/menu',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MenuController::menu
 * @see app/Http/Controllers/Admin/MenuController.php:31
 * @route '/menu'
 */
menu.url = (options?: RouteQueryOptions) => {
    return menu.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MenuController::menu
 * @see app/Http/Controllers/Admin/MenuController.php:31
 * @route '/menu'
 */
menu.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: menu.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\MenuController::menu
 * @see app/Http/Controllers/Admin/MenuController.php:31
 * @route '/menu'
 */
menu.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: menu.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\MenuController::menu
 * @see app/Http/Controllers/Admin/MenuController.php:31
 * @route '/menu'
 */
    const menuForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: menu.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\MenuController::menu
 * @see app/Http/Controllers/Admin/MenuController.php:31
 * @route '/menu'
 */
        menuForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: menu.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\MenuController::menu
 * @see app/Http/Controllers/Admin/MenuController.php:31
 * @route '/menu'
 */
        menuForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: menu.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    menu.form = menuForm
/**
* @see \App\Http\Controllers\Admin\InventoryController::inventory
 * @see app/Http/Controllers/Admin/InventoryController.php:28
 * @route '/inventory'
 */
export const inventory = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: inventory.url(options),
    method: 'get',
})

inventory.definition = {
    methods: ["get","head"],
    url: '/inventory',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InventoryController::inventory
 * @see app/Http/Controllers/Admin/InventoryController.php:28
 * @route '/inventory'
 */
inventory.url = (options?: RouteQueryOptions) => {
    return inventory.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InventoryController::inventory
 * @see app/Http/Controllers/Admin/InventoryController.php:28
 * @route '/inventory'
 */
inventory.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: inventory.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\InventoryController::inventory
 * @see app/Http/Controllers/Admin/InventoryController.php:28
 * @route '/inventory'
 */
inventory.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: inventory.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\InventoryController::inventory
 * @see app/Http/Controllers/Admin/InventoryController.php:28
 * @route '/inventory'
 */
    const inventoryForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: inventory.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\InventoryController::inventory
 * @see app/Http/Controllers/Admin/InventoryController.php:28
 * @route '/inventory'
 */
        inventoryForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: inventory.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\InventoryController::inventory
 * @see app/Http/Controllers/Admin/InventoryController.php:28
 * @route '/inventory'
 */
        inventoryForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: inventory.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    inventory.form = inventoryForm
/**
* @see \App\Http\Controllers\Admin\UserController::users
 * @see app/Http/Controllers/Admin/UserController.php:26
 * @route '/users'
 */
export const users = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
})

users.definition = {
    methods: ["get","head"],
    url: '/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\UserController::users
 * @see app/Http/Controllers/Admin/UserController.php:26
 * @route '/users'
 */
users.url = (options?: RouteQueryOptions) => {
    return users.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\UserController::users
 * @see app/Http/Controllers/Admin/UserController.php:26
 * @route '/users'
 */
users.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\UserController::users
 * @see app/Http/Controllers/Admin/UserController.php:26
 * @route '/users'
 */
users.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: users.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\UserController::users
 * @see app/Http/Controllers/Admin/UserController.php:26
 * @route '/users'
 */
    const usersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: users.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\UserController::users
 * @see app/Http/Controllers/Admin/UserController.php:26
 * @route '/users'
 */
        usersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: users.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\UserController::users
 * @see app/Http/Controllers/Admin/UserController.php:26
 * @route '/users'
 */
        usersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: users.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    users.form = usersForm
/**
 * @see routes/web.php:155
 * @route '/roles'
 */
export const roles = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: roles.url(options),
    method: 'get',
})

roles.definition = {
    methods: ["get","head"],
    url: '/roles',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:155
 * @route '/roles'
 */
roles.url = (options?: RouteQueryOptions) => {
    return roles.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:155
 * @route '/roles'
 */
roles.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: roles.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:155
 * @route '/roles'
 */
roles.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: roles.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:155
 * @route '/roles'
 */
    const rolesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: roles.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:155
 * @route '/roles'
 */
        rolesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: roles.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:155
 * @route '/roles'
 */
        rolesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: roles.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    roles.form = rolesForm
/**
* @see \App\Http\Controllers\Admin\KitchenController::kitchen
 * @see app/Http/Controllers/Admin/KitchenController.php:29
 * @route '/kitchen'
 */
export const kitchen = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kitchen.url(options),
    method: 'get',
})

kitchen.definition = {
    methods: ["get","head"],
    url: '/kitchen',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\KitchenController::kitchen
 * @see app/Http/Controllers/Admin/KitchenController.php:29
 * @route '/kitchen'
 */
kitchen.url = (options?: RouteQueryOptions) => {
    return kitchen.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KitchenController::kitchen
 * @see app/Http/Controllers/Admin/KitchenController.php:29
 * @route '/kitchen'
 */
kitchen.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kitchen.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\KitchenController::kitchen
 * @see app/Http/Controllers/Admin/KitchenController.php:29
 * @route '/kitchen'
 */
kitchen.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kitchen.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\KitchenController::kitchen
 * @see app/Http/Controllers/Admin/KitchenController.php:29
 * @route '/kitchen'
 */
    const kitchenForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: kitchen.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\KitchenController::kitchen
 * @see app/Http/Controllers/Admin/KitchenController.php:29
 * @route '/kitchen'
 */
        kitchenForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: kitchen.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\KitchenController::kitchen
 * @see app/Http/Controllers/Admin/KitchenController.php:29
 * @route '/kitchen'
 */
        kitchenForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: kitchen.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    kitchen.form = kitchenForm