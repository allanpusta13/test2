import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\TrackerController::lookup
 * @see app/Http/Controllers/TrackerController.php:28
 * @route '/tracker/order/{token}'
 */
export const lookup = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lookup.url(args, options),
    method: 'get',
})

lookup.definition = {
    methods: ["get","head"],
    url: '/tracker/order/{token}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TrackerController::lookup
 * @see app/Http/Controllers/TrackerController.php:28
 * @route '/tracker/order/{token}'
 */
lookup.url = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { token: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    token: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        token: args.token,
                }

    return lookup.definition.url
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TrackerController::lookup
 * @see app/Http/Controllers/TrackerController.php:28
 * @route '/tracker/order/{token}'
 */
lookup.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lookup.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TrackerController::lookup
 * @see app/Http/Controllers/TrackerController.php:28
 * @route '/tracker/order/{token}'
 */
lookup.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lookup.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TrackerController::lookup
 * @see app/Http/Controllers/TrackerController.php:28
 * @route '/tracker/order/{token}'
 */
    const lookupForm = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: lookup.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TrackerController::lookup
 * @see app/Http/Controllers/TrackerController.php:28
 * @route '/tracker/order/{token}'
 */
        lookupForm.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: lookup.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TrackerController::lookup
 * @see app/Http/Controllers/TrackerController.php:28
 * @route '/tracker/order/{token}'
 */
        lookupForm.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: lookup.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    lookup.form = lookupForm
const tracker = {
    lookup: Object.assign(lookup, lookup),
}

export default tracker