import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\PosController::store
 * @see app/Http/Controllers/Admin/PosController.php:80
 * @route '/pos/orders'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/pos/orders',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PosController::store
 * @see app/Http/Controllers/Admin/PosController.php:80
 * @route '/pos/orders'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PosController::store
 * @see app/Http/Controllers/Admin/PosController.php:80
 * @route '/pos/orders'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\PosController::store
 * @see app/Http/Controllers/Admin/PosController.php:80
 * @route '/pos/orders'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PosController::store
 * @see app/Http/Controllers/Admin/PosController.php:80
 * @route '/pos/orders'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const orders = {
    store: Object.assign(store, store),
}

export default orders