import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\InventoryController::store
 * @see app/Http/Controllers/Admin/InventoryController.php:252
 * @route '/inventory/transactions'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/inventory/transactions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\InventoryController::store
 * @see app/Http/Controllers/Admin/InventoryController.php:252
 * @route '/inventory/transactions'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InventoryController::store
 * @see app/Http/Controllers/Admin/InventoryController.php:252
 * @route '/inventory/transactions'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\InventoryController::store
 * @see app/Http/Controllers/Admin/InventoryController.php:252
 * @route '/inventory/transactions'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\InventoryController::store
 * @see app/Http/Controllers/Admin/InventoryController.php:252
 * @route '/inventory/transactions'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const transactions = {
    store: Object.assign(store, store),
}

export default transactions