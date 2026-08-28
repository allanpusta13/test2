import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\AuthController::showLoginForm
 * @see app/Http/Controllers/Auth/AuthController.php:23
 * @route '/login'
 */
const showLoginFormb6041c76e8e1cd791f8f89d035d48611 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showLoginFormb6041c76e8e1cd791f8f89d035d48611.url(options),
    method: 'get',
})

showLoginFormb6041c76e8e1cd791f8f89d035d48611.definition = {
    methods: ["get","head"],
    url: '/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::showLoginForm
 * @see app/Http/Controllers/Auth/AuthController.php:23
 * @route '/login'
 */
showLoginFormb6041c76e8e1cd791f8f89d035d48611.url = (options?: RouteQueryOptions) => {
    return showLoginFormb6041c76e8e1cd791f8f89d035d48611.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::showLoginForm
 * @see app/Http/Controllers/Auth/AuthController.php:23
 * @route '/login'
 */
showLoginFormb6041c76e8e1cd791f8f89d035d48611.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showLoginFormb6041c76e8e1cd791f8f89d035d48611.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\AuthController::showLoginForm
 * @see app/Http/Controllers/Auth/AuthController.php:23
 * @route '/login'
 */
showLoginFormb6041c76e8e1cd791f8f89d035d48611.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showLoginFormb6041c76e8e1cd791f8f89d035d48611.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\AuthController::showLoginForm
 * @see app/Http/Controllers/Auth/AuthController.php:23
 * @route '/login'
 */
    const showLoginFormb6041c76e8e1cd791f8f89d035d48611Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showLoginFormb6041c76e8e1cd791f8f89d035d48611.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\AuthController::showLoginForm
 * @see app/Http/Controllers/Auth/AuthController.php:23
 * @route '/login'
 */
        showLoginFormb6041c76e8e1cd791f8f89d035d48611Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showLoginFormb6041c76e8e1cd791f8f89d035d48611.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\AuthController::showLoginForm
 * @see app/Http/Controllers/Auth/AuthController.php:23
 * @route '/login'
 */
        showLoginFormb6041c76e8e1cd791f8f89d035d48611Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showLoginFormb6041c76e8e1cd791f8f89d035d48611.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showLoginFormb6041c76e8e1cd791f8f89d035d48611.form = showLoginFormb6041c76e8e1cd791f8f89d035d48611Form
    /**
* @see \App\Http\Controllers\Auth\AuthController::showLoginForm
 * @see app/Http/Controllers/Auth/AuthController.php:23
 * @route '/auth/demo-accounts'
 */
const showLoginFormba03fdb5fe948e35176155c8d2f38d7f = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showLoginFormba03fdb5fe948e35176155c8d2f38d7f.url(options),
    method: 'get',
})

showLoginFormba03fdb5fe948e35176155c8d2f38d7f.definition = {
    methods: ["get","head"],
    url: '/auth/demo-accounts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::showLoginForm
 * @see app/Http/Controllers/Auth/AuthController.php:23
 * @route '/auth/demo-accounts'
 */
showLoginFormba03fdb5fe948e35176155c8d2f38d7f.url = (options?: RouteQueryOptions) => {
    return showLoginFormba03fdb5fe948e35176155c8d2f38d7f.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::showLoginForm
 * @see app/Http/Controllers/Auth/AuthController.php:23
 * @route '/auth/demo-accounts'
 */
showLoginFormba03fdb5fe948e35176155c8d2f38d7f.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showLoginFormba03fdb5fe948e35176155c8d2f38d7f.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\AuthController::showLoginForm
 * @see app/Http/Controllers/Auth/AuthController.php:23
 * @route '/auth/demo-accounts'
 */
showLoginFormba03fdb5fe948e35176155c8d2f38d7f.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showLoginFormba03fdb5fe948e35176155c8d2f38d7f.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\AuthController::showLoginForm
 * @see app/Http/Controllers/Auth/AuthController.php:23
 * @route '/auth/demo-accounts'
 */
    const showLoginFormba03fdb5fe948e35176155c8d2f38d7fForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showLoginFormba03fdb5fe948e35176155c8d2f38d7f.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\AuthController::showLoginForm
 * @see app/Http/Controllers/Auth/AuthController.php:23
 * @route '/auth/demo-accounts'
 */
        showLoginFormba03fdb5fe948e35176155c8d2f38d7fForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showLoginFormba03fdb5fe948e35176155c8d2f38d7f.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\AuthController::showLoginForm
 * @see app/Http/Controllers/Auth/AuthController.php:23
 * @route '/auth/demo-accounts'
 */
        showLoginFormba03fdb5fe948e35176155c8d2f38d7fForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showLoginFormba03fdb5fe948e35176155c8d2f38d7f.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showLoginFormba03fdb5fe948e35176155c8d2f38d7f.form = showLoginFormba03fdb5fe948e35176155c8d2f38d7fForm

/**
* Multiple routes resolve to \App\Http\Controllers\Auth\AuthController::showLoginForm, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `showLoginForm['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const showLoginForm = {
    '/login': showLoginFormb6041c76e8e1cd791f8f89d035d48611,
    '/auth/demo-accounts': showLoginFormba03fdb5fe948e35176155c8d2f38d7f,
}

/**
* @see \App\Http\Controllers\Auth\AuthController::login
 * @see app/Http/Controllers/Auth/AuthController.php:34
 * @route '/login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

login.definition = {
    methods: ["post"],
    url: '/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::login
 * @see app/Http/Controllers/Auth/AuthController.php:34
 * @route '/login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::login
 * @see app/Http/Controllers/Auth/AuthController.php:34
 * @route '/login'
 */
login.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\AuthController::login
 * @see app/Http/Controllers/Auth/AuthController.php:34
 * @route '/login'
 */
    const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: login.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\AuthController::login
 * @see app/Http/Controllers/Auth/AuthController.php:34
 * @route '/login'
 */
        loginForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: login.url(options),
            method: 'post',
        })
    
    login.form = loginForm
/**
* @see \App\Http\Controllers\Auth\AuthController::logout
 * @see app/Http/Controllers/Auth/AuthController.php:183
 * @route '/logout'
 */
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::logout
 * @see app/Http/Controllers/Auth/AuthController.php:183
 * @route '/logout'
 */
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::logout
 * @see app/Http/Controllers/Auth/AuthController.php:183
 * @route '/logout'
 */
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\AuthController::logout
 * @see app/Http/Controllers/Auth/AuthController.php:183
 * @route '/logout'
 */
    const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: logout.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\AuthController::logout
 * @see app/Http/Controllers/Auth/AuthController.php:183
 * @route '/logout'
 */
        logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: logout.url(options),
            method: 'post',
        })
    
    logout.form = logoutForm
/**
* @see \App\Http\Controllers\Auth\AuthController::user
 * @see app/Http/Controllers/Auth/AuthController.php:161
 * @route '/auth/user'
 */
const userfdd54c908f1713e31b39162fcc9faf0f = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userfdd54c908f1713e31b39162fcc9faf0f.url(options),
    method: 'get',
})

userfdd54c908f1713e31b39162fcc9faf0f.definition = {
    methods: ["get","head"],
    url: '/auth/user',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::user
 * @see app/Http/Controllers/Auth/AuthController.php:161
 * @route '/auth/user'
 */
userfdd54c908f1713e31b39162fcc9faf0f.url = (options?: RouteQueryOptions) => {
    return userfdd54c908f1713e31b39162fcc9faf0f.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::user
 * @see app/Http/Controllers/Auth/AuthController.php:161
 * @route '/auth/user'
 */
userfdd54c908f1713e31b39162fcc9faf0f.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userfdd54c908f1713e31b39162fcc9faf0f.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\AuthController::user
 * @see app/Http/Controllers/Auth/AuthController.php:161
 * @route '/auth/user'
 */
userfdd54c908f1713e31b39162fcc9faf0f.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: userfdd54c908f1713e31b39162fcc9faf0f.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\AuthController::user
 * @see app/Http/Controllers/Auth/AuthController.php:161
 * @route '/auth/user'
 */
    const userfdd54c908f1713e31b39162fcc9faf0fForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: userfdd54c908f1713e31b39162fcc9faf0f.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\AuthController::user
 * @see app/Http/Controllers/Auth/AuthController.php:161
 * @route '/auth/user'
 */
        userfdd54c908f1713e31b39162fcc9faf0fForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: userfdd54c908f1713e31b39162fcc9faf0f.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\AuthController::user
 * @see app/Http/Controllers/Auth/AuthController.php:161
 * @route '/auth/user'
 */
        userfdd54c908f1713e31b39162fcc9faf0fForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: userfdd54c908f1713e31b39162fcc9faf0f.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    userfdd54c908f1713e31b39162fcc9faf0f.form = userfdd54c908f1713e31b39162fcc9faf0fForm
    /**
* @see \App\Http\Controllers\Auth\AuthController::user
 * @see app/Http/Controllers/Auth/AuthController.php:161
 * @route '/api/user'
 */
const userfae88ad6309fcfbde7a7c79f2701ed35 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userfae88ad6309fcfbde7a7c79f2701ed35.url(options),
    method: 'get',
})

userfae88ad6309fcfbde7a7c79f2701ed35.definition = {
    methods: ["get","head"],
    url: '/api/user',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::user
 * @see app/Http/Controllers/Auth/AuthController.php:161
 * @route '/api/user'
 */
userfae88ad6309fcfbde7a7c79f2701ed35.url = (options?: RouteQueryOptions) => {
    return userfae88ad6309fcfbde7a7c79f2701ed35.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::user
 * @see app/Http/Controllers/Auth/AuthController.php:161
 * @route '/api/user'
 */
userfae88ad6309fcfbde7a7c79f2701ed35.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userfae88ad6309fcfbde7a7c79f2701ed35.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\AuthController::user
 * @see app/Http/Controllers/Auth/AuthController.php:161
 * @route '/api/user'
 */
userfae88ad6309fcfbde7a7c79f2701ed35.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: userfae88ad6309fcfbde7a7c79f2701ed35.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\AuthController::user
 * @see app/Http/Controllers/Auth/AuthController.php:161
 * @route '/api/user'
 */
    const userfae88ad6309fcfbde7a7c79f2701ed35Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: userfae88ad6309fcfbde7a7c79f2701ed35.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\AuthController::user
 * @see app/Http/Controllers/Auth/AuthController.php:161
 * @route '/api/user'
 */
        userfae88ad6309fcfbde7a7c79f2701ed35Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: userfae88ad6309fcfbde7a7c79f2701ed35.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\AuthController::user
 * @see app/Http/Controllers/Auth/AuthController.php:161
 * @route '/api/user'
 */
        userfae88ad6309fcfbde7a7c79f2701ed35Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: userfae88ad6309fcfbde7a7c79f2701ed35.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    userfae88ad6309fcfbde7a7c79f2701ed35.form = userfae88ad6309fcfbde7a7c79f2701ed35Form

/**
* Multiple routes resolve to \App\Http\Controllers\Auth\AuthController::user, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `user['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const user = {
    '/auth/user': userfdd54c908f1713e31b39162fcc9faf0f,
    '/api/user': userfae88ad6309fcfbde7a7c79f2701ed35,
}

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
const AuthController = { showLoginForm, login, logout, user, quickLogin }

export default AuthController