import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import categories08bc8d from './categories'
import items9d5457 from './items'
/**
* @see \App\Http\Controllers\Admin\MenuController::list
 * @see app/Http/Controllers/Admin/MenuController.php:44
 * @route '/menu/list'
 */
export const list = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

list.definition = {
    methods: ["get","head"],
    url: '/menu/list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MenuController::list
 * @see app/Http/Controllers/Admin/MenuController.php:44
 * @route '/menu/list'
 */
list.url = (options?: RouteQueryOptions) => {
    return list.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MenuController::list
 * @see app/Http/Controllers/Admin/MenuController.php:44
 * @route '/menu/list'
 */
list.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\MenuController::list
 * @see app/Http/Controllers/Admin/MenuController.php:44
 * @route '/menu/list'
 */
list.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: list.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\MenuController::list
 * @see app/Http/Controllers/Admin/MenuController.php:44
 * @route '/menu/list'
 */
    const listForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: list.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\MenuController::list
 * @see app/Http/Controllers/Admin/MenuController.php:44
 * @route '/menu/list'
 */
        listForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: list.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\MenuController::list
 * @see app/Http/Controllers/Admin/MenuController.php:44
 * @route '/menu/list'
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
* @see \App\Http\Controllers\Admin\MenuController::create
 * @see app/Http/Controllers/Admin/MenuController.php:75
 * @route '/menu/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/menu/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MenuController::create
 * @see app/Http/Controllers/Admin/MenuController.php:75
 * @route '/menu/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MenuController::create
 * @see app/Http/Controllers/Admin/MenuController.php:75
 * @route '/menu/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\MenuController::create
 * @see app/Http/Controllers/Admin/MenuController.php:75
 * @route '/menu/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\MenuController::create
 * @see app/Http/Controllers/Admin/MenuController.php:75
 * @route '/menu/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\MenuController::create
 * @see app/Http/Controllers/Admin/MenuController.php:75
 * @route '/menu/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\MenuController::create
 * @see app/Http/Controllers/Admin/MenuController.php:75
 * @route '/menu/create'
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
* @see \App\Http\Controllers\Admin\MenuController::store
 * @see app/Http/Controllers/Admin/MenuController.php:126
 * @route '/menu'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/menu',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\MenuController::store
 * @see app/Http/Controllers/Admin/MenuController.php:126
 * @route '/menu'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MenuController::store
 * @see app/Http/Controllers/Admin/MenuController.php:126
 * @route '/menu'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\MenuController::store
 * @see app/Http/Controllers/Admin/MenuController.php:126
 * @route '/menu'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\MenuController::store
 * @see app/Http/Controllers/Admin/MenuController.php:126
 * @route '/menu'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\MenuController::categories
 * @see app/Http/Controllers/Admin/MenuController.php:234
 * @route '/menu/categories'
 */
export const categories = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: categories.url(options),
    method: 'get',
})

categories.definition = {
    methods: ["get","head"],
    url: '/menu/categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MenuController::categories
 * @see app/Http/Controllers/Admin/MenuController.php:234
 * @route '/menu/categories'
 */
categories.url = (options?: RouteQueryOptions) => {
    return categories.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MenuController::categories
 * @see app/Http/Controllers/Admin/MenuController.php:234
 * @route '/menu/categories'
 */
categories.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: categories.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\MenuController::categories
 * @see app/Http/Controllers/Admin/MenuController.php:234
 * @route '/menu/categories'
 */
categories.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: categories.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\MenuController::categories
 * @see app/Http/Controllers/Admin/MenuController.php:234
 * @route '/menu/categories'
 */
    const categoriesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: categories.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\MenuController::categories
 * @see app/Http/Controllers/Admin/MenuController.php:234
 * @route '/menu/categories'
 */
        categoriesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: categories.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\MenuController::categories
 * @see app/Http/Controllers/Admin/MenuController.php:234
 * @route '/menu/categories'
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
/**
* @see \App\Http\Controllers\Admin\MenuController::items
 * @see app/Http/Controllers/Admin/MenuController.php:44
 * @route '/menu/items'
 */
export const items = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: items.url(options),
    method: 'get',
})

items.definition = {
    methods: ["get","head"],
    url: '/menu/items',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MenuController::items
 * @see app/Http/Controllers/Admin/MenuController.php:44
 * @route '/menu/items'
 */
items.url = (options?: RouteQueryOptions) => {
    return items.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MenuController::items
 * @see app/Http/Controllers/Admin/MenuController.php:44
 * @route '/menu/items'
 */
items.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: items.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\MenuController::items
 * @see app/Http/Controllers/Admin/MenuController.php:44
 * @route '/menu/items'
 */
items.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: items.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\MenuController::items
 * @see app/Http/Controllers/Admin/MenuController.php:44
 * @route '/menu/items'
 */
    const itemsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: items.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\MenuController::items
 * @see app/Http/Controllers/Admin/MenuController.php:44
 * @route '/menu/items'
 */
        itemsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: items.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\MenuController::items
 * @see app/Http/Controllers/Admin/MenuController.php:44
 * @route '/menu/items'
 */
        itemsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: items.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    items.form = itemsForm
const menu = {
    list: Object.assign(list, list),
create: Object.assign(create, create),
store: Object.assign(store, store),
categories: Object.assign(categories, categories08bc8d),
items: Object.assign(items, items9d5457),
}

export default menu