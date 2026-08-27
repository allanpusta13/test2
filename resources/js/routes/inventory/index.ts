import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import items9d5457 from './items'
import transactionsBbd80d from './transactions'
/**
* @see \App\Http\Controllers\Admin\InventoryController::list
 * @see app/Http/Controllers/Admin/InventoryController.php:41
 * @route '/inventory/list'
 */
export const list = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

list.definition = {
    methods: ["get","head"],
    url: '/inventory/list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InventoryController::list
 * @see app/Http/Controllers/Admin/InventoryController.php:41
 * @route '/inventory/list'
 */
list.url = (options?: RouteQueryOptions) => {
    return list.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InventoryController::list
 * @see app/Http/Controllers/Admin/InventoryController.php:41
 * @route '/inventory/list'
 */
list.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\InventoryController::list
 * @see app/Http/Controllers/Admin/InventoryController.php:41
 * @route '/inventory/list'
 */
list.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: list.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\InventoryController::list
 * @see app/Http/Controllers/Admin/InventoryController.php:41
 * @route '/inventory/list'
 */
    const listForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: list.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\InventoryController::list
 * @see app/Http/Controllers/Admin/InventoryController.php:41
 * @route '/inventory/list'
 */
        listForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: list.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\InventoryController::list
 * @see app/Http/Controllers/Admin/InventoryController.php:41
 * @route '/inventory/list'
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
* @see \App\Http\Controllers\Admin\InventoryController::create
 * @see app/Http/Controllers/Admin/InventoryController.php:78
 * @route '/inventory/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/inventory/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InventoryController::create
 * @see app/Http/Controllers/Admin/InventoryController.php:78
 * @route '/inventory/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InventoryController::create
 * @see app/Http/Controllers/Admin/InventoryController.php:78
 * @route '/inventory/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\InventoryController::create
 * @see app/Http/Controllers/Admin/InventoryController.php:78
 * @route '/inventory/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\InventoryController::create
 * @see app/Http/Controllers/Admin/InventoryController.php:78
 * @route '/inventory/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\InventoryController::create
 * @see app/Http/Controllers/Admin/InventoryController.php:78
 * @route '/inventory/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\InventoryController::create
 * @see app/Http/Controllers/Admin/InventoryController.php:78
 * @route '/inventory/create'
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
* @see \App\Http\Controllers\Admin\InventoryController::store
 * @see app/Http/Controllers/Admin/InventoryController.php:92
 * @route '/inventory'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/inventory',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\InventoryController::store
 * @see app/Http/Controllers/Admin/InventoryController.php:92
 * @route '/inventory'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InventoryController::store
 * @see app/Http/Controllers/Admin/InventoryController.php:92
 * @route '/inventory'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\InventoryController::store
 * @see app/Http/Controllers/Admin/InventoryController.php:92
 * @route '/inventory'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\InventoryController::store
 * @see app/Http/Controllers/Admin/InventoryController.php:92
 * @route '/inventory'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\InventoryController::items
 * @see app/Http/Controllers/Admin/InventoryController.php:41
 * @route '/inventory/items'
 */
export const items = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: items.url(options),
    method: 'get',
})

items.definition = {
    methods: ["get","head"],
    url: '/inventory/items',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InventoryController::items
 * @see app/Http/Controllers/Admin/InventoryController.php:41
 * @route '/inventory/items'
 */
items.url = (options?: RouteQueryOptions) => {
    return items.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InventoryController::items
 * @see app/Http/Controllers/Admin/InventoryController.php:41
 * @route '/inventory/items'
 */
items.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: items.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\InventoryController::items
 * @see app/Http/Controllers/Admin/InventoryController.php:41
 * @route '/inventory/items'
 */
items.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: items.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\InventoryController::items
 * @see app/Http/Controllers/Admin/InventoryController.php:41
 * @route '/inventory/items'
 */
    const itemsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: items.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\InventoryController::items
 * @see app/Http/Controllers/Admin/InventoryController.php:41
 * @route '/inventory/items'
 */
        itemsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: items.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\InventoryController::items
 * @see app/Http/Controllers/Admin/InventoryController.php:41
 * @route '/inventory/items'
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
/**
* @see \App\Http\Controllers\Admin\InventoryController::transactions
 * @see app/Http/Controllers/Admin/InventoryController.php:231
 * @route '/inventory/transactions'
 */
export const transactions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transactions.url(options),
    method: 'get',
})

transactions.definition = {
    methods: ["get","head"],
    url: '/inventory/transactions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InventoryController::transactions
 * @see app/Http/Controllers/Admin/InventoryController.php:231
 * @route '/inventory/transactions'
 */
transactions.url = (options?: RouteQueryOptions) => {
    return transactions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InventoryController::transactions
 * @see app/Http/Controllers/Admin/InventoryController.php:231
 * @route '/inventory/transactions'
 */
transactions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transactions.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\InventoryController::transactions
 * @see app/Http/Controllers/Admin/InventoryController.php:231
 * @route '/inventory/transactions'
 */
transactions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: transactions.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\InventoryController::transactions
 * @see app/Http/Controllers/Admin/InventoryController.php:231
 * @route '/inventory/transactions'
 */
    const transactionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: transactions.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\InventoryController::transactions
 * @see app/Http/Controllers/Admin/InventoryController.php:231
 * @route '/inventory/transactions'
 */
        transactionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: transactions.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\InventoryController::transactions
 * @see app/Http/Controllers/Admin/InventoryController.php:231
 * @route '/inventory/transactions'
 */
        transactionsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: transactions.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    transactions.form = transactionsForm
const inventory = {
    list: Object.assign(list, list),
create: Object.assign(create, create),
store: Object.assign(store, store),
items: Object.assign(items, items9d5457),
transactions: Object.assign(transactions, transactionsBbd80d),
}

export default inventory