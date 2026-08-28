import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\BroadcastingController::authenticate
 * @see app/Http/Controllers/BroadcastingController.php:26
 * @route '/broadcasting/auth'
 */
export const authenticate = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: authenticate.url(options),
    method: 'get',
})

authenticate.definition = {
    methods: ["get","post","head"],
    url: '/broadcasting/auth',
} satisfies RouteDefinition<["get","post","head"]>

/**
* @see \App\Http\Controllers\BroadcastingController::authenticate
 * @see app/Http/Controllers/BroadcastingController.php:26
 * @route '/broadcasting/auth'
 */
authenticate.url = (options?: RouteQueryOptions) => {
    return authenticate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BroadcastingController::authenticate
 * @see app/Http/Controllers/BroadcastingController.php:26
 * @route '/broadcasting/auth'
 */
authenticate.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: authenticate.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BroadcastingController::authenticate
 * @see app/Http/Controllers/BroadcastingController.php:26
 * @route '/broadcasting/auth'
 */
authenticate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: authenticate.url(options),
    method: 'post',
})
/**
* @see \App\Http\Controllers\BroadcastingController::authenticate
 * @see app/Http/Controllers/BroadcastingController.php:26
 * @route '/broadcasting/auth'
 */
authenticate.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: authenticate.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BroadcastingController::authenticate
 * @see app/Http/Controllers/BroadcastingController.php:26
 * @route '/broadcasting/auth'
 */
    const authenticateForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: authenticate.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BroadcastingController::authenticate
 * @see app/Http/Controllers/BroadcastingController.php:26
 * @route '/broadcasting/auth'
 */
        authenticateForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: authenticate.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BroadcastingController::authenticate
 * @see app/Http/Controllers/BroadcastingController.php:26
 * @route '/broadcasting/auth'
 */
        authenticateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: authenticate.url(options),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\BroadcastingController::authenticate
 * @see app/Http/Controllers/BroadcastingController.php:26
 * @route '/broadcasting/auth'
 */
        authenticateForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: authenticate.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    authenticate.form = authenticateForm
const BroadcastingController = { authenticate }

export default BroadcastingController