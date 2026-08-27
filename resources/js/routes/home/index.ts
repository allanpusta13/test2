import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\HomeController::list
 * @see app/Http/Controllers/HomeController.php:50
 * @route '/list'
 */
export const list = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

list.definition = {
    methods: ["get","head"],
    url: '/list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomeController::list
 * @see app/Http/Controllers/HomeController.php:50
 * @route '/list'
 */
list.url = (options?: RouteQueryOptions) => {
    return list.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::list
 * @see app/Http/Controllers/HomeController.php:50
 * @route '/list'
 */
list.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomeController::list
 * @see app/Http/Controllers/HomeController.php:50
 * @route '/list'
 */
list.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: list.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomeController::list
 * @see app/Http/Controllers/HomeController.php:50
 * @route '/list'
 */
    const listForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: list.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomeController::list
 * @see app/Http/Controllers/HomeController.php:50
 * @route '/list'
 */
        listForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: list.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomeController::list
 * @see app/Http/Controllers/HomeController.php:50
 * @route '/list'
 */
        listForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: list.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    list.form = listForm
/**
* @see \App\Http\Controllers\HomeController::create
 * @see app/Http/Controllers/HomeController.php:107
 * @route '/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomeController::create
 * @see app/Http/Controllers/HomeController.php:107
 * @route '/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::create
 * @see app/Http/Controllers/HomeController.php:107
 * @route '/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomeController::create
 * @see app/Http/Controllers/HomeController.php:107
 * @route '/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomeController::create
 * @see app/Http/Controllers/HomeController.php:107
 * @route '/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomeController::create
 * @see app/Http/Controllers/HomeController.php:107
 * @route '/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomeController::create
 * @see app/Http/Controllers/HomeController.php:107
 * @route '/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\HomeController::store
 * @see app/Http/Controllers/HomeController.php:123
 * @route '/store'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/store',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HomeController::store
 * @see app/Http/Controllers/HomeController.php:123
 * @route '/store'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::store
 * @see app/Http/Controllers/HomeController.php:123
 * @route '/store'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HomeController::store
 * @see app/Http/Controllers/HomeController.php:123
 * @route '/store'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HomeController::store
 * @see app/Http/Controllers/HomeController.php:123
 * @route '/store'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\HomeController::order
 * @see app/Http/Controllers/HomeController.php:123
 * @route '/order'
 */
export const order = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: order.url(options),
    method: 'post',
})

order.definition = {
    methods: ["post"],
    url: '/order',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HomeController::order
 * @see app/Http/Controllers/HomeController.php:123
 * @route '/order'
 */
order.url = (options?: RouteQueryOptions) => {
    return order.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::order
 * @see app/Http/Controllers/HomeController.php:123
 * @route '/order'
 */
order.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: order.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HomeController::order
 * @see app/Http/Controllers/HomeController.php:123
 * @route '/order'
 */
    const orderForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: order.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HomeController::order
 * @see app/Http/Controllers/HomeController.php:123
 * @route '/order'
 */
        orderForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: order.url(options),
            method: 'post',
        })
    
    order.form = orderForm
/**
* @see \App\Http\Controllers\HomeController::show
 * @see app/Http/Controllers/HomeController.php:86
 * @route '/show/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/show/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomeController::show
 * @see app/Http/Controllers/HomeController.php:86
 * @route '/show/{id}'
 */
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::show
 * @see app/Http/Controllers/HomeController.php:86
 * @route '/show/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomeController::show
 * @see app/Http/Controllers/HomeController.php:86
 * @route '/show/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomeController::show
 * @see app/Http/Controllers/HomeController.php:86
 * @route '/show/{id}'
 */
    const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomeController::show
 * @see app/Http/Controllers/HomeController.php:86
 * @route '/show/{id}'
 */
        showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomeController::show
 * @see app/Http/Controllers/HomeController.php:86
 * @route '/show/{id}'
 */
        showForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\HomeController::dish
 * @see app/Http/Controllers/HomeController.php:86
 * @route '/menu-dishes/{id}'
 */
export const dish = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dish.url(args, options),
    method: 'get',
})

dish.definition = {
    methods: ["get","head"],
    url: '/menu-dishes/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomeController::dish
 * @see app/Http/Controllers/HomeController.php:86
 * @route '/menu-dishes/{id}'
 */
dish.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return dish.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::dish
 * @see app/Http/Controllers/HomeController.php:86
 * @route '/menu-dishes/{id}'
 */
dish.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dish.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomeController::dish
 * @see app/Http/Controllers/HomeController.php:86
 * @route '/menu-dishes/{id}'
 */
dish.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dish.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomeController::dish
 * @see app/Http/Controllers/HomeController.php:86
 * @route '/menu-dishes/{id}'
 */
    const dishForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dish.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomeController::dish
 * @see app/Http/Controllers/HomeController.php:86
 * @route '/menu-dishes/{id}'
 */
        dishForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dish.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomeController::dish
 * @see app/Http/Controllers/HomeController.php:86
 * @route '/menu-dishes/{id}'
 */
        dishForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dish.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dish.form = dishForm
/**
* @see \App\Http\Controllers\HomeController::categories
 * @see app/Http/Controllers/HomeController.php:70
 * @route '/menu-categories'
 */
export const categories = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: categories.url(options),
    method: 'get',
})

categories.definition = {
    methods: ["get","head"],
    url: '/menu-categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomeController::categories
 * @see app/Http/Controllers/HomeController.php:70
 * @route '/menu-categories'
 */
categories.url = (options?: RouteQueryOptions) => {
    return categories.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::categories
 * @see app/Http/Controllers/HomeController.php:70
 * @route '/menu-categories'
 */
categories.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: categories.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomeController::categories
 * @see app/Http/Controllers/HomeController.php:70
 * @route '/menu-categories'
 */
categories.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: categories.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomeController::categories
 * @see app/Http/Controllers/HomeController.php:70
 * @route '/menu-categories'
 */
    const categoriesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: categories.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomeController::categories
 * @see app/Http/Controllers/HomeController.php:70
 * @route '/menu-categories'
 */
        categoriesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: categories.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomeController::categories
 * @see app/Http/Controllers/HomeController.php:70
 * @route '/menu-categories'
 */
        categoriesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: categories.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    categories.form = categoriesForm
const home = {
    list: Object.assign(list, list),
create: Object.assign(create, create),
store: Object.assign(store, store),
order: Object.assign(order, order),
show: Object.assign(show, show),
dish: Object.assign(dish, dish),
categories: Object.assign(categories, categories),
}

export default home