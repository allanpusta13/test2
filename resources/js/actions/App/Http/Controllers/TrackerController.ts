import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TrackerController::index
 * @see app/Http/Controllers/TrackerController.php:18
 * @route '/tracker/{token?}'
 */
export const index = (args?: { token?: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/tracker/{token?}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TrackerController::index
 * @see app/Http/Controllers/TrackerController.php:18
 * @route '/tracker/{token?}'
 */
index.url = (args?: { token?: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { token: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    token: args[0],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "token",
        ])

    const parsedArgs = {
                        token: args?.token,
                }

    return index.definition.url
            .replace('{token?}', parsedArgs.token?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TrackerController::index
 * @see app/Http/Controllers/TrackerController.php:18
 * @route '/tracker/{token?}'
 */
index.get = (args?: { token?: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TrackerController::index
 * @see app/Http/Controllers/TrackerController.php:18
 * @route '/tracker/{token?}'
 */
index.head = (args?: { token?: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TrackerController::index
 * @see app/Http/Controllers/TrackerController.php:18
 * @route '/tracker/{token?}'
 */
    const indexForm = (args?: { token?: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TrackerController::index
 * @see app/Http/Controllers/TrackerController.php:18
 * @route '/tracker/{token?}'
 */
        indexForm.get = (args?: { token?: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TrackerController::index
 * @see app/Http/Controllers/TrackerController.php:18
 * @route '/tracker/{token?}'
 */
        indexForm.head = (args?: { token?: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\TrackerController::track
 * @see app/Http/Controllers/TrackerController.php:28
 * @route '/tracker/order/{token}'
 */
export const track = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: track.url(args, options),
    method: 'get',
})

track.definition = {
    methods: ["get","head"],
    url: '/tracker/order/{token}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TrackerController::track
 * @see app/Http/Controllers/TrackerController.php:28
 * @route '/tracker/order/{token}'
 */
track.url = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return track.definition.url
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TrackerController::track
 * @see app/Http/Controllers/TrackerController.php:28
 * @route '/tracker/order/{token}'
 */
track.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: track.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TrackerController::track
 * @see app/Http/Controllers/TrackerController.php:28
 * @route '/tracker/order/{token}'
 */
track.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: track.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TrackerController::track
 * @see app/Http/Controllers/TrackerController.php:28
 * @route '/tracker/order/{token}'
 */
    const trackForm = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: track.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TrackerController::track
 * @see app/Http/Controllers/TrackerController.php:28
 * @route '/tracker/order/{token}'
 */
        trackForm.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: track.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TrackerController::track
 * @see app/Http/Controllers/TrackerController.php:28
 * @route '/tracker/order/{token}'
 */
        trackForm.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: track.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    track.form = trackForm
const TrackerController = { index, track }

export default TrackerController