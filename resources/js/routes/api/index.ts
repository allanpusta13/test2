import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\AuthController::user
 * @see app/Http/Controllers/Auth/AuthController.php:161
 * @route '/api/user'
 */
export const user = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: user.url(options),
    method: 'get',
})

user.definition = {
    methods: ["get","head"],
    url: '/api/user',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::user
 * @see app/Http/Controllers/Auth/AuthController.php:161
 * @route '/api/user'
 */
user.url = (options?: RouteQueryOptions) => {
    return user.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::user
 * @see app/Http/Controllers/Auth/AuthController.php:161
 * @route '/api/user'
 */
user.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: user.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\AuthController::user
 * @see app/Http/Controllers/Auth/AuthController.php:161
 * @route '/api/user'
 */
user.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: user.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\AuthController::user
 * @see app/Http/Controllers/Auth/AuthController.php:161
 * @route '/api/user'
 */
    const userForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: user.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\AuthController::user
 * @see app/Http/Controllers/Auth/AuthController.php:161
 * @route '/api/user'
 */
        userForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: user.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\AuthController::user
 * @see app/Http/Controllers/Auth/AuthController.php:161
 * @route '/api/user'
 */
        userForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: user.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    user.form = userForm
/**
* @see \App\Http\Controllers\HomeController::bootstrap
 * @see app/Http/Controllers/HomeController.php:39
 * @route '/api/bootstrap'
 */
export const bootstrap = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bootstrap.url(options),
    method: 'get',
})

bootstrap.definition = {
    methods: ["get","head"],
    url: '/api/bootstrap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomeController::bootstrap
 * @see app/Http/Controllers/HomeController.php:39
 * @route '/api/bootstrap'
 */
bootstrap.url = (options?: RouteQueryOptions) => {
    return bootstrap.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::bootstrap
 * @see app/Http/Controllers/HomeController.php:39
 * @route '/api/bootstrap'
 */
bootstrap.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bootstrap.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomeController::bootstrap
 * @see app/Http/Controllers/HomeController.php:39
 * @route '/api/bootstrap'
 */
bootstrap.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bootstrap.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomeController::bootstrap
 * @see app/Http/Controllers/HomeController.php:39
 * @route '/api/bootstrap'
 */
    const bootstrapForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: bootstrap.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomeController::bootstrap
 * @see app/Http/Controllers/HomeController.php:39
 * @route '/api/bootstrap'
 */
        bootstrapForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bootstrap.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomeController::bootstrap
 * @see app/Http/Controllers/HomeController.php:39
 * @route '/api/bootstrap'
 */
        bootstrapForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bootstrap.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    bootstrap.form = bootstrapForm
/**
* @see \App\Http\Controllers\HomeController::sharedPayload
 * @see app/Http/Controllers/HomeController.php:39
 * @route '/api/shared-payload'
 */
export const sharedPayload = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sharedPayload.url(options),
    method: 'get',
})

sharedPayload.definition = {
    methods: ["get","head"],
    url: '/api/shared-payload',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomeController::sharedPayload
 * @see app/Http/Controllers/HomeController.php:39
 * @route '/api/shared-payload'
 */
sharedPayload.url = (options?: RouteQueryOptions) => {
    return sharedPayload.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::sharedPayload
 * @see app/Http/Controllers/HomeController.php:39
 * @route '/api/shared-payload'
 */
sharedPayload.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sharedPayload.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomeController::sharedPayload
 * @see app/Http/Controllers/HomeController.php:39
 * @route '/api/shared-payload'
 */
sharedPayload.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: sharedPayload.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomeController::sharedPayload
 * @see app/Http/Controllers/HomeController.php:39
 * @route '/api/shared-payload'
 */
    const sharedPayloadForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: sharedPayload.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomeController::sharedPayload
 * @see app/Http/Controllers/HomeController.php:39
 * @route '/api/shared-payload'
 */
        sharedPayloadForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: sharedPayload.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomeController::sharedPayload
 * @see app/Http/Controllers/HomeController.php:39
 * @route '/api/shared-payload'
 */
        sharedPayloadForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: sharedPayload.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    sharedPayload.form = sharedPayloadForm
const api = {
    user: Object.assign(user, user),
bootstrap: Object.assign(bootstrap, bootstrap),
sharedPayload: Object.assign(sharedPayload, sharedPayload),
}

export default api