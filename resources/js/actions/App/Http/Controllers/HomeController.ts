import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\HomeController::index
 * @see app/Http/Controllers/HomeController.php:27
 * @route '/'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomeController::index
 * @see app/Http/Controllers/HomeController.php:27
 * @route '/'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::index
 * @see app/Http/Controllers/HomeController.php:27
 * @route '/'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomeController::index
 * @see app/Http/Controllers/HomeController.php:27
 * @route '/'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomeController::index
 * @see app/Http/Controllers/HomeController.php:27
 * @route '/'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomeController::index
 * @see app/Http/Controllers/HomeController.php:27
 * @route '/'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomeController::index
 * @see app/Http/Controllers/HomeController.php:27
 * @route '/'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\HomeController::bootstrap
 * @see app/Http/Controllers/HomeController.php:39
 * @route '/api/bootstrap'
 */
const bootstrap14eb217bd4f341b6ac6cc5ee1d74d3db = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bootstrap14eb217bd4f341b6ac6cc5ee1d74d3db.url(options),
    method: 'get',
})

bootstrap14eb217bd4f341b6ac6cc5ee1d74d3db.definition = {
    methods: ["get","head"],
    url: '/api/bootstrap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomeController::bootstrap
 * @see app/Http/Controllers/HomeController.php:39
 * @route '/api/bootstrap'
 */
bootstrap14eb217bd4f341b6ac6cc5ee1d74d3db.url = (options?: RouteQueryOptions) => {
    return bootstrap14eb217bd4f341b6ac6cc5ee1d74d3db.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::bootstrap
 * @see app/Http/Controllers/HomeController.php:39
 * @route '/api/bootstrap'
 */
bootstrap14eb217bd4f341b6ac6cc5ee1d74d3db.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bootstrap14eb217bd4f341b6ac6cc5ee1d74d3db.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomeController::bootstrap
 * @see app/Http/Controllers/HomeController.php:39
 * @route '/api/bootstrap'
 */
bootstrap14eb217bd4f341b6ac6cc5ee1d74d3db.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bootstrap14eb217bd4f341b6ac6cc5ee1d74d3db.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomeController::bootstrap
 * @see app/Http/Controllers/HomeController.php:39
 * @route '/api/bootstrap'
 */
    const bootstrap14eb217bd4f341b6ac6cc5ee1d74d3dbForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: bootstrap14eb217bd4f341b6ac6cc5ee1d74d3db.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomeController::bootstrap
 * @see app/Http/Controllers/HomeController.php:39
 * @route '/api/bootstrap'
 */
        bootstrap14eb217bd4f341b6ac6cc5ee1d74d3dbForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bootstrap14eb217bd4f341b6ac6cc5ee1d74d3db.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomeController::bootstrap
 * @see app/Http/Controllers/HomeController.php:39
 * @route '/api/bootstrap'
 */
        bootstrap14eb217bd4f341b6ac6cc5ee1d74d3dbForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bootstrap14eb217bd4f341b6ac6cc5ee1d74d3db.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    bootstrap14eb217bd4f341b6ac6cc5ee1d74d3db.form = bootstrap14eb217bd4f341b6ac6cc5ee1d74d3dbForm
    /**
* @see \App\Http\Controllers\HomeController::bootstrap
 * @see app/Http/Controllers/HomeController.php:39
 * @route '/api/shared-payload'
 */
const bootstrap917a672296aa0b5c25f7e9400575f5d3 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bootstrap917a672296aa0b5c25f7e9400575f5d3.url(options),
    method: 'get',
})

bootstrap917a672296aa0b5c25f7e9400575f5d3.definition = {
    methods: ["get","head"],
    url: '/api/shared-payload',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomeController::bootstrap
 * @see app/Http/Controllers/HomeController.php:39
 * @route '/api/shared-payload'
 */
bootstrap917a672296aa0b5c25f7e9400575f5d3.url = (options?: RouteQueryOptions) => {
    return bootstrap917a672296aa0b5c25f7e9400575f5d3.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::bootstrap
 * @see app/Http/Controllers/HomeController.php:39
 * @route '/api/shared-payload'
 */
bootstrap917a672296aa0b5c25f7e9400575f5d3.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bootstrap917a672296aa0b5c25f7e9400575f5d3.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomeController::bootstrap
 * @see app/Http/Controllers/HomeController.php:39
 * @route '/api/shared-payload'
 */
bootstrap917a672296aa0b5c25f7e9400575f5d3.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bootstrap917a672296aa0b5c25f7e9400575f5d3.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomeController::bootstrap
 * @see app/Http/Controllers/HomeController.php:39
 * @route '/api/shared-payload'
 */
    const bootstrap917a672296aa0b5c25f7e9400575f5d3Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: bootstrap917a672296aa0b5c25f7e9400575f5d3.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomeController::bootstrap
 * @see app/Http/Controllers/HomeController.php:39
 * @route '/api/shared-payload'
 */
        bootstrap917a672296aa0b5c25f7e9400575f5d3Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bootstrap917a672296aa0b5c25f7e9400575f5d3.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomeController::bootstrap
 * @see app/Http/Controllers/HomeController.php:39
 * @route '/api/shared-payload'
 */
        bootstrap917a672296aa0b5c25f7e9400575f5d3Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bootstrap917a672296aa0b5c25f7e9400575f5d3.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    bootstrap917a672296aa0b5c25f7e9400575f5d3.form = bootstrap917a672296aa0b5c25f7e9400575f5d3Form

/**
* Multiple routes resolve to \App\Http\Controllers\HomeController::bootstrap, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `bootstrap['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const bootstrap = {
    '/api/bootstrap': bootstrap14eb217bd4f341b6ac6cc5ee1d74d3db,
    '/api/shared-payload': bootstrap917a672296aa0b5c25f7e9400575f5d3,
}

/**
* @see \App\Http\Controllers\HomeController::list
 * @see app/Http/Controllers/HomeController.php:50
 * @route '/list'
 */
export const list = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

list.definition = {
    methods: ["get","head"],
    url: '/list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomeController::list
 * @see app/Http/Controllers/HomeController.php:50
 * @route '/list'
 */
list.url = (options?: RouteQueryOptions) => {
    return list.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::list
 * @see app/Http/Controllers/HomeController.php:50
 * @route '/list'
 */
list.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomeController::list
 * @see app/Http/Controllers/HomeController.php:50
 * @route '/list'
 */
list.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: list.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomeController::list
 * @see app/Http/Controllers/HomeController.php:50
 * @route '/list'
 */
    const listForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: list.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomeController::list
 * @see app/Http/Controllers/HomeController.php:50
 * @route '/list'
 */
        listForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: list.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomeController::list
 * @see app/Http/Controllers/HomeController.php:50
 * @route '/list'
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
* @see \App\Http\Controllers\HomeController::create
 * @see app/Http/Controllers/HomeController.php:107
 * @route '/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomeController::create
 * @see app/Http/Controllers/HomeController.php:107
 * @route '/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::create
 * @see app/Http/Controllers/HomeController.php:107
 * @route '/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomeController::create
 * @see app/Http/Controllers/HomeController.php:107
 * @route '/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomeController::create
 * @see app/Http/Controllers/HomeController.php:107
 * @route '/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomeController::create
 * @see app/Http/Controllers/HomeController.php:107
 * @route '/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomeController::create
 * @see app/Http/Controllers/HomeController.php:107
 * @route '/create'
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
* @see \App\Http\Controllers\HomeController::store
 * @see app/Http/Controllers/HomeController.php:123
 * @route '/store'
 */
const store3061d1e453eae72af66960c6525ad9ee = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store3061d1e453eae72af66960c6525ad9ee.url(options),
    method: 'post',
})

store3061d1e453eae72af66960c6525ad9ee.definition = {
    methods: ["post"],
    url: '/store',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HomeController::store
 * @see app/Http/Controllers/HomeController.php:123
 * @route '/store'
 */
store3061d1e453eae72af66960c6525ad9ee.url = (options?: RouteQueryOptions) => {
    return store3061d1e453eae72af66960c6525ad9ee.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::store
 * @see app/Http/Controllers/HomeController.php:123
 * @route '/store'
 */
store3061d1e453eae72af66960c6525ad9ee.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store3061d1e453eae72af66960c6525ad9ee.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HomeController::store
 * @see app/Http/Controllers/HomeController.php:123
 * @route '/store'
 */
    const store3061d1e453eae72af66960c6525ad9eeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store3061d1e453eae72af66960c6525ad9ee.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HomeController::store
 * @see app/Http/Controllers/HomeController.php:123
 * @route '/store'
 */
        store3061d1e453eae72af66960c6525ad9eeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store3061d1e453eae72af66960c6525ad9ee.url(options),
            method: 'post',
        })
    
    store3061d1e453eae72af66960c6525ad9ee.form = store3061d1e453eae72af66960c6525ad9eeForm
    /**
* @see \App\Http\Controllers\HomeController::store
 * @see app/Http/Controllers/HomeController.php:123
 * @route '/order'
 */
const store8eb02b5d54156a6649a89fe45f4a752d = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store8eb02b5d54156a6649a89fe45f4a752d.url(options),
    method: 'post',
})

store8eb02b5d54156a6649a89fe45f4a752d.definition = {
    methods: ["post"],
    url: '/order',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HomeController::store
 * @see app/Http/Controllers/HomeController.php:123
 * @route '/order'
 */
store8eb02b5d54156a6649a89fe45f4a752d.url = (options?: RouteQueryOptions) => {
    return store8eb02b5d54156a6649a89fe45f4a752d.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::store
 * @see app/Http/Controllers/HomeController.php:123
 * @route '/order'
 */
store8eb02b5d54156a6649a89fe45f4a752d.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store8eb02b5d54156a6649a89fe45f4a752d.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HomeController::store
 * @see app/Http/Controllers/HomeController.php:123
 * @route '/order'
 */
    const store8eb02b5d54156a6649a89fe45f4a752dForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store8eb02b5d54156a6649a89fe45f4a752d.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HomeController::store
 * @see app/Http/Controllers/HomeController.php:123
 * @route '/order'
 */
        store8eb02b5d54156a6649a89fe45f4a752dForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store8eb02b5d54156a6649a89fe45f4a752d.url(options),
            method: 'post',
        })
    
    store8eb02b5d54156a6649a89fe45f4a752d.form = store8eb02b5d54156a6649a89fe45f4a752dForm

/**
* Multiple routes resolve to \App\Http\Controllers\HomeController::store, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `store['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const store = {
    '/store': store3061d1e453eae72af66960c6525ad9ee,
    '/order': store8eb02b5d54156a6649a89fe45f4a752d,
}

/**
* @see \App\Http\Controllers\HomeController::show
 * @see app/Http/Controllers/HomeController.php:86
 * @route '/show/{id}'
 */
const showdf2fec1aa49388d7617a5a000f02df9e = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showdf2fec1aa49388d7617a5a000f02df9e.url(args, options),
    method: 'get',
})

showdf2fec1aa49388d7617a5a000f02df9e.definition = {
    methods: ["get","head"],
    url: '/show/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomeController::show
 * @see app/Http/Controllers/HomeController.php:86
 * @route '/show/{id}'
 */
showdf2fec1aa49388d7617a5a000f02df9e.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return showdf2fec1aa49388d7617a5a000f02df9e.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::show
 * @see app/Http/Controllers/HomeController.php:86
 * @route '/show/{id}'
 */
showdf2fec1aa49388d7617a5a000f02df9e.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showdf2fec1aa49388d7617a5a000f02df9e.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomeController::show
 * @see app/Http/Controllers/HomeController.php:86
 * @route '/show/{id}'
 */
showdf2fec1aa49388d7617a5a000f02df9e.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showdf2fec1aa49388d7617a5a000f02df9e.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomeController::show
 * @see app/Http/Controllers/HomeController.php:86
 * @route '/show/{id}'
 */
    const showdf2fec1aa49388d7617a5a000f02df9eForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showdf2fec1aa49388d7617a5a000f02df9e.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomeController::show
 * @see app/Http/Controllers/HomeController.php:86
 * @route '/show/{id}'
 */
        showdf2fec1aa49388d7617a5a000f02df9eForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showdf2fec1aa49388d7617a5a000f02df9e.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomeController::show
 * @see app/Http/Controllers/HomeController.php:86
 * @route '/show/{id}'
 */
        showdf2fec1aa49388d7617a5a000f02df9eForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showdf2fec1aa49388d7617a5a000f02df9e.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showdf2fec1aa49388d7617a5a000f02df9e.form = showdf2fec1aa49388d7617a5a000f02df9eForm
    /**
* @see \App\Http\Controllers\HomeController::show
 * @see app/Http/Controllers/HomeController.php:86
 * @route '/menu-dishes/{id}'
 */
const show319642706ecdc4ed1f751606056368dc = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show319642706ecdc4ed1f751606056368dc.url(args, options),
    method: 'get',
})

show319642706ecdc4ed1f751606056368dc.definition = {
    methods: ["get","head"],
    url: '/menu-dishes/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomeController::show
 * @see app/Http/Controllers/HomeController.php:86
 * @route '/menu-dishes/{id}'
 */
show319642706ecdc4ed1f751606056368dc.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return show319642706ecdc4ed1f751606056368dc.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::show
 * @see app/Http/Controllers/HomeController.php:86
 * @route '/menu-dishes/{id}'
 */
show319642706ecdc4ed1f751606056368dc.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show319642706ecdc4ed1f751606056368dc.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomeController::show
 * @see app/Http/Controllers/HomeController.php:86
 * @route '/menu-dishes/{id}'
 */
show319642706ecdc4ed1f751606056368dc.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show319642706ecdc4ed1f751606056368dc.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomeController::show
 * @see app/Http/Controllers/HomeController.php:86
 * @route '/menu-dishes/{id}'
 */
    const show319642706ecdc4ed1f751606056368dcForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show319642706ecdc4ed1f751606056368dc.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomeController::show
 * @see app/Http/Controllers/HomeController.php:86
 * @route '/menu-dishes/{id}'
 */
        show319642706ecdc4ed1f751606056368dcForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show319642706ecdc4ed1f751606056368dc.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomeController::show
 * @see app/Http/Controllers/HomeController.php:86
 * @route '/menu-dishes/{id}'
 */
        show319642706ecdc4ed1f751606056368dcForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show319642706ecdc4ed1f751606056368dc.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show319642706ecdc4ed1f751606056368dc.form = show319642706ecdc4ed1f751606056368dcForm

/**
* Multiple routes resolve to \App\Http\Controllers\HomeController::show, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `show['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const show = {
    '/show/{id}': showdf2fec1aa49388d7617a5a000f02df9e,
    '/menu-dishes/{id}': show319642706ecdc4ed1f751606056368dc,
}

/**
* @see \App\Http\Controllers\HomeController::categories
 * @see app/Http/Controllers/HomeController.php:70
 * @route '/menu-categories'
 */
export const categories = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: categories.url(options),
    method: 'get',
})

categories.definition = {
    methods: ["get","head"],
    url: '/menu-categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomeController::categories
 * @see app/Http/Controllers/HomeController.php:70
 * @route '/menu-categories'
 */
categories.url = (options?: RouteQueryOptions) => {
    return categories.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::categories
 * @see app/Http/Controllers/HomeController.php:70
 * @route '/menu-categories'
 */
categories.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: categories.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomeController::categories
 * @see app/Http/Controllers/HomeController.php:70
 * @route '/menu-categories'
 */
categories.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: categories.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomeController::categories
 * @see app/Http/Controllers/HomeController.php:70
 * @route '/menu-categories'
 */
    const categoriesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: categories.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomeController::categories
 * @see app/Http/Controllers/HomeController.php:70
 * @route '/menu-categories'
 */
        categoriesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: categories.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomeController::categories
 * @see app/Http/Controllers/HomeController.php:70
 * @route '/menu-categories'
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
const HomeController = { index, bootstrap, list, create, store, show, categories }

export default HomeController