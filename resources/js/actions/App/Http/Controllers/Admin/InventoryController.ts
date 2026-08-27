import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\InventoryController::index
 * @see app/Http/Controllers/Admin/InventoryController.php:28
 * @route '/inventory'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/inventory',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InventoryController::index
 * @see app/Http/Controllers/Admin/InventoryController.php:28
 * @route '/inventory'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InventoryController::index
 * @see app/Http/Controllers/Admin/InventoryController.php:28
 * @route '/inventory'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\InventoryController::index
 * @see app/Http/Controllers/Admin/InventoryController.php:28
 * @route '/inventory'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\InventoryController::index
 * @see app/Http/Controllers/Admin/InventoryController.php:28
 * @route '/inventory'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\InventoryController::index
 * @see app/Http/Controllers/Admin/InventoryController.php:28
 * @route '/inventory'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\InventoryController::index
 * @see app/Http/Controllers/Admin/InventoryController.php:28
 * @route '/inventory'
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
* @see \App\Http\Controllers\Admin\InventoryController::list
 * @see app/Http/Controllers/Admin/InventoryController.php:41
 * @route '/inventory/list'
 */
const listc8107b88f3c00816256a2de38521b429 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listc8107b88f3c00816256a2de38521b429.url(options),
    method: 'get',
})

listc8107b88f3c00816256a2de38521b429.definition = {
    methods: ["get","head"],
    url: '/inventory/list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InventoryController::list
 * @see app/Http/Controllers/Admin/InventoryController.php:41
 * @route '/inventory/list'
 */
listc8107b88f3c00816256a2de38521b429.url = (options?: RouteQueryOptions) => {
    return listc8107b88f3c00816256a2de38521b429.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InventoryController::list
 * @see app/Http/Controllers/Admin/InventoryController.php:41
 * @route '/inventory/list'
 */
listc8107b88f3c00816256a2de38521b429.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listc8107b88f3c00816256a2de38521b429.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\InventoryController::list
 * @see app/Http/Controllers/Admin/InventoryController.php:41
 * @route '/inventory/list'
 */
listc8107b88f3c00816256a2de38521b429.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: listc8107b88f3c00816256a2de38521b429.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\InventoryController::list
 * @see app/Http/Controllers/Admin/InventoryController.php:41
 * @route '/inventory/list'
 */
    const listc8107b88f3c00816256a2de38521b429Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: listc8107b88f3c00816256a2de38521b429.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\InventoryController::list
 * @see app/Http/Controllers/Admin/InventoryController.php:41
 * @route '/inventory/list'
 */
        listc8107b88f3c00816256a2de38521b429Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: listc8107b88f3c00816256a2de38521b429.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\InventoryController::list
 * @see app/Http/Controllers/Admin/InventoryController.php:41
 * @route '/inventory/list'
 */
        listc8107b88f3c00816256a2de38521b429Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: listc8107b88f3c00816256a2de38521b429.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    listc8107b88f3c00816256a2de38521b429.form = listc8107b88f3c00816256a2de38521b429Form
    /**
* @see \App\Http\Controllers\Admin\InventoryController::list
 * @see app/Http/Controllers/Admin/InventoryController.php:41
 * @route '/inventory/items'
 */
const listf509c5f8ddc5278e27136bad3d2b38a1 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listf509c5f8ddc5278e27136bad3d2b38a1.url(options),
    method: 'get',
})

listf509c5f8ddc5278e27136bad3d2b38a1.definition = {
    methods: ["get","head"],
    url: '/inventory/items',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InventoryController::list
 * @see app/Http/Controllers/Admin/InventoryController.php:41
 * @route '/inventory/items'
 */
listf509c5f8ddc5278e27136bad3d2b38a1.url = (options?: RouteQueryOptions) => {
    return listf509c5f8ddc5278e27136bad3d2b38a1.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InventoryController::list
 * @see app/Http/Controllers/Admin/InventoryController.php:41
 * @route '/inventory/items'
 */
listf509c5f8ddc5278e27136bad3d2b38a1.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listf509c5f8ddc5278e27136bad3d2b38a1.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\InventoryController::list
 * @see app/Http/Controllers/Admin/InventoryController.php:41
 * @route '/inventory/items'
 */
listf509c5f8ddc5278e27136bad3d2b38a1.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: listf509c5f8ddc5278e27136bad3d2b38a1.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\InventoryController::list
 * @see app/Http/Controllers/Admin/InventoryController.php:41
 * @route '/inventory/items'
 */
    const listf509c5f8ddc5278e27136bad3d2b38a1Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: listf509c5f8ddc5278e27136bad3d2b38a1.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\InventoryController::list
 * @see app/Http/Controllers/Admin/InventoryController.php:41
 * @route '/inventory/items'
 */
        listf509c5f8ddc5278e27136bad3d2b38a1Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: listf509c5f8ddc5278e27136bad3d2b38a1.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\InventoryController::list
 * @see app/Http/Controllers/Admin/InventoryController.php:41
 * @route '/inventory/items'
 */
        listf509c5f8ddc5278e27136bad3d2b38a1Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: listf509c5f8ddc5278e27136bad3d2b38a1.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    listf509c5f8ddc5278e27136bad3d2b38a1.form = listf509c5f8ddc5278e27136bad3d2b38a1Form

/**
* Multiple routes resolve to \App\Http\Controllers\Admin\InventoryController::list, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `list['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const list = {
    '/inventory/list': listc8107b88f3c00816256a2de38521b429,
    '/inventory/items': listf509c5f8ddc5278e27136bad3d2b38a1,
}

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
const store0f0f149fd5ad713a01fac2dca3083cda = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store0f0f149fd5ad713a01fac2dca3083cda.url(options),
    method: 'post',
})

store0f0f149fd5ad713a01fac2dca3083cda.definition = {
    methods: ["post"],
    url: '/inventory',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\InventoryController::store
 * @see app/Http/Controllers/Admin/InventoryController.php:92
 * @route '/inventory'
 */
store0f0f149fd5ad713a01fac2dca3083cda.url = (options?: RouteQueryOptions) => {
    return store0f0f149fd5ad713a01fac2dca3083cda.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InventoryController::store
 * @see app/Http/Controllers/Admin/InventoryController.php:92
 * @route '/inventory'
 */
store0f0f149fd5ad713a01fac2dca3083cda.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store0f0f149fd5ad713a01fac2dca3083cda.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\InventoryController::store
 * @see app/Http/Controllers/Admin/InventoryController.php:92
 * @route '/inventory'
 */
    const store0f0f149fd5ad713a01fac2dca3083cdaForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store0f0f149fd5ad713a01fac2dca3083cda.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\InventoryController::store
 * @see app/Http/Controllers/Admin/InventoryController.php:92
 * @route '/inventory'
 */
        store0f0f149fd5ad713a01fac2dca3083cdaForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store0f0f149fd5ad713a01fac2dca3083cda.url(options),
            method: 'post',
        })
    
    store0f0f149fd5ad713a01fac2dca3083cda.form = store0f0f149fd5ad713a01fac2dca3083cdaForm
    /**
* @see \App\Http\Controllers\Admin\InventoryController::store
 * @see app/Http/Controllers/Admin/InventoryController.php:92
 * @route '/inventory/items'
 */
const storef509c5f8ddc5278e27136bad3d2b38a1 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storef509c5f8ddc5278e27136bad3d2b38a1.url(options),
    method: 'post',
})

storef509c5f8ddc5278e27136bad3d2b38a1.definition = {
    methods: ["post"],
    url: '/inventory/items',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\InventoryController::store
 * @see app/Http/Controllers/Admin/InventoryController.php:92
 * @route '/inventory/items'
 */
storef509c5f8ddc5278e27136bad3d2b38a1.url = (options?: RouteQueryOptions) => {
    return storef509c5f8ddc5278e27136bad3d2b38a1.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InventoryController::store
 * @see app/Http/Controllers/Admin/InventoryController.php:92
 * @route '/inventory/items'
 */
storef509c5f8ddc5278e27136bad3d2b38a1.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storef509c5f8ddc5278e27136bad3d2b38a1.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\InventoryController::store
 * @see app/Http/Controllers/Admin/InventoryController.php:92
 * @route '/inventory/items'
 */
    const storef509c5f8ddc5278e27136bad3d2b38a1Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storef509c5f8ddc5278e27136bad3d2b38a1.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\InventoryController::store
 * @see app/Http/Controllers/Admin/InventoryController.php:92
 * @route '/inventory/items'
 */
        storef509c5f8ddc5278e27136bad3d2b38a1Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storef509c5f8ddc5278e27136bad3d2b38a1.url(options),
            method: 'post',
        })
    
    storef509c5f8ddc5278e27136bad3d2b38a1.form = storef509c5f8ddc5278e27136bad3d2b38a1Form

/**
* Multiple routes resolve to \App\Http\Controllers\Admin\InventoryController::store, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `store['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const store = {
    '/inventory': store0f0f149fd5ad713a01fac2dca3083cda,
    '/inventory/items': storef509c5f8ddc5278e27136bad3d2b38a1,
}

/**
* @see \App\Http\Controllers\Admin\InventoryController::show
 * @see app/Http/Controllers/Admin/InventoryController.php:138
 * @route '/inventory/items/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/inventory/items/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InventoryController::show
 * @see app/Http/Controllers/Admin/InventoryController.php:138
 * @route '/inventory/items/{id}'
 */
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InventoryController::show
 * @see app/Http/Controllers/Admin/InventoryController.php:138
 * @route '/inventory/items/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\InventoryController::show
 * @see app/Http/Controllers/Admin/InventoryController.php:138
 * @route '/inventory/items/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\InventoryController::show
 * @see app/Http/Controllers/Admin/InventoryController.php:138
 * @route '/inventory/items/{id}'
 */
    const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\InventoryController::show
 * @see app/Http/Controllers/Admin/InventoryController.php:138
 * @route '/inventory/items/{id}'
 */
        showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\InventoryController::show
 * @see app/Http/Controllers/Admin/InventoryController.php:138
 * @route '/inventory/items/{id}'
 */
        showForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Admin\InventoryController::edit
 * @see app/Http/Controllers/Admin/InventoryController.php:161
 * @route '/inventory/items/{id}/edit'
 */
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/inventory/items/{id}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InventoryController::edit
 * @see app/Http/Controllers/Admin/InventoryController.php:161
 * @route '/inventory/items/{id}/edit'
 */
edit.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InventoryController::edit
 * @see app/Http/Controllers/Admin/InventoryController.php:161
 * @route '/inventory/items/{id}/edit'
 */
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\InventoryController::edit
 * @see app/Http/Controllers/Admin/InventoryController.php:161
 * @route '/inventory/items/{id}/edit'
 */
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\InventoryController::edit
 * @see app/Http/Controllers/Admin/InventoryController.php:161
 * @route '/inventory/items/{id}/edit'
 */
    const editForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\InventoryController::edit
 * @see app/Http/Controllers/Admin/InventoryController.php:161
 * @route '/inventory/items/{id}/edit'
 */
        editForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\InventoryController::edit
 * @see app/Http/Controllers/Admin/InventoryController.php:161
 * @route '/inventory/items/{id}/edit'
 */
        editForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Admin\InventoryController::update
 * @see app/Http/Controllers/Admin/InventoryController.php:178
 * @route '/inventory/items/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/inventory/items/{id}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\InventoryController::update
 * @see app/Http/Controllers/Admin/InventoryController.php:178
 * @route '/inventory/items/{id}'
 */
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InventoryController::update
 * @see app/Http/Controllers/Admin/InventoryController.php:178
 * @route '/inventory/items/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\InventoryController::update
 * @see app/Http/Controllers/Admin/InventoryController.php:178
 * @route '/inventory/items/{id}'
 */
update.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\InventoryController::update
 * @see app/Http/Controllers/Admin/InventoryController.php:178
 * @route '/inventory/items/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\InventoryController::update
 * @see app/Http/Controllers/Admin/InventoryController.php:178
 * @route '/inventory/items/{id}'
 */
        updateForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\InventoryController::update
 * @see app/Http/Controllers/Admin/InventoryController.php:178
 * @route '/inventory/items/{id}'
 */
        updateForm.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\InventoryController::destroy
 * @see app/Http/Controllers/Admin/InventoryController.php:201
 * @route '/inventory/items/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/inventory/items/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\InventoryController::destroy
 * @see app/Http/Controllers/Admin/InventoryController.php:201
 * @route '/inventory/items/{id}'
 */
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InventoryController::destroy
 * @see app/Http/Controllers/Admin/InventoryController.php:201
 * @route '/inventory/items/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\InventoryController::destroy
 * @see app/Http/Controllers/Admin/InventoryController.php:201
 * @route '/inventory/items/{id}'
 */
    const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\InventoryController::destroy
 * @see app/Http/Controllers/Admin/InventoryController.php:201
 * @route '/inventory/items/{id}'
 */
        destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
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
/**
* @see \App\Http\Controllers\Admin\InventoryController::recordTransaction
 * @see app/Http/Controllers/Admin/InventoryController.php:252
 * @route '/inventory/transactions'
 */
export const recordTransaction = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordTransaction.url(options),
    method: 'post',
})

recordTransaction.definition = {
    methods: ["post"],
    url: '/inventory/transactions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\InventoryController::recordTransaction
 * @see app/Http/Controllers/Admin/InventoryController.php:252
 * @route '/inventory/transactions'
 */
recordTransaction.url = (options?: RouteQueryOptions) => {
    return recordTransaction.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InventoryController::recordTransaction
 * @see app/Http/Controllers/Admin/InventoryController.php:252
 * @route '/inventory/transactions'
 */
recordTransaction.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordTransaction.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\InventoryController::recordTransaction
 * @see app/Http/Controllers/Admin/InventoryController.php:252
 * @route '/inventory/transactions'
 */
    const recordTransactionForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: recordTransaction.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\InventoryController::recordTransaction
 * @see app/Http/Controllers/Admin/InventoryController.php:252
 * @route '/inventory/transactions'
 */
        recordTransactionForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: recordTransaction.url(options),
            method: 'post',
        })
    
    recordTransaction.form = recordTransactionForm
const InventoryController = { index, list, create, store, show, edit, update, destroy, transactions, recordTransaction }

export default InventoryController