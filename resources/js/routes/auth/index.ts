import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\AuthController::user
 * @see app/Http/Controllers/Auth/AuthController.php:161
 * @route '/auth/user'
 */
export const user = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: user.url(options),
    method: 'get',
})

user.definition = {
    methods: ["get","head"],
    url: '/auth/user',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::user
 * @see app/Http/Controllers/Auth/AuthController.php:161
 * @route '/auth/user'
 */
user.url = (options?: RouteQueryOptions) => {
    return user.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::user
 * @see app/Http/Controllers/Auth/AuthController.php:161
 * @route '/auth/user'
 */
user.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: user.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\AuthController::user
 * @see app/Http/Controllers/Auth/AuthController.php:161
 * @route '/auth/user'
 */
user.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: user.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\AuthController::user
 * @see app/Http/Controllers/Auth/AuthController.php:161
 * @route '/auth/user'
 */
    const userForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: user.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\AuthController::user
 * @see app/Http/Controllers/Auth/AuthController.php:161
 * @route '/auth/user'
 */
        userForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: user.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\AuthController::user
 * @see app/Http/Controllers/Auth/AuthController.php:161
 * @route '/auth/user'
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
* @see \App\Http\Controllers\Auth\AuthController::quickLogin
 * @see app/Http/Controllers/Auth/AuthController.php:101
 * @route '/auth/quick-login'
 */
export const quickLogin = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: quickLogin.url(options),
    method: 'post',
})

quickLogin.definition = {
    methods: ["post"],
    url: '/auth/quick-login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::quickLogin
 * @see app/Http/Controllers/Auth/AuthController.php:101
 * @route '/auth/quick-login'
 */
quickLogin.url = (options?: RouteQueryOptions) => {
    return quickLogin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::quickLogin
 * @see app/Http/Controllers/Auth/AuthController.php:101
 * @route '/auth/quick-login'
 */
quickLogin.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: quickLogin.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\AuthController::quickLogin
 * @see app/Http/Controllers/Auth/AuthController.php:101
 * @route '/auth/quick-login'
 */
    const quickLoginForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: quickLogin.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\AuthController::quickLogin
 * @see app/Http/Controllers/Auth/AuthController.php:101
 * @route '/auth/quick-login'
 */
        quickLoginForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: quickLogin.url(options),
            method: 'post',
        })
    
    quickLogin.form = quickLoginForm
/**
* @see \App\Http\Controllers\Auth\AuthController::demoAccounts
 * @see app/Http/Controllers/Auth/AuthController.php:23
 * @route '/auth/demo-accounts'
 */
export const demoAccounts = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: demoAccounts.url(options),
    method: 'get',
})

demoAccounts.definition = {
    methods: ["get","head"],
    url: '/auth/demo-accounts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::demoAccounts
 * @see app/Http/Controllers/Auth/AuthController.php:23
 * @route '/auth/demo-accounts'
 */
demoAccounts.url = (options?: RouteQueryOptions) => {
    return demoAccounts.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::demoAccounts
 * @see app/Http/Controllers/Auth/AuthController.php:23
 * @route '/auth/demo-accounts'
 */
demoAccounts.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: demoAccounts.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\AuthController::demoAccounts
 * @see app/Http/Controllers/Auth/AuthController.php:23
 * @route '/auth/demo-accounts'
 */
demoAccounts.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: demoAccounts.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\AuthController::demoAccounts
 * @see app/Http/Controllers/Auth/AuthController.php:23
 * @route '/auth/demo-accounts'
 */
    const demoAccountsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: demoAccounts.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\AuthController::demoAccounts
 * @see app/Http/Controllers/Auth/AuthController.php:23
 * @route '/auth/demo-accounts'
 */
        demoAccountsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: demoAccounts.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\AuthController::demoAccounts
 * @see app/Http/Controllers/Auth/AuthController.php:23
 * @route '/auth/demo-accounts'
 */
        demoAccountsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: demoAccounts.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    demoAccounts.form = demoAccountsForm
const auth = {
    user: Object.assign(user, user),
quickLogin: Object.assign(quickLogin, quickLogin),
demoAccounts: Object.assign(demoAccounts, demoAccounts),
}

export default auth