import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\PosController::index
 * @see app/Http/Controllers/Admin/PosController.php:28
 * @route '/pos'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/pos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PosController::index
 * @see app/Http/Controllers/Admin/PosController.php:28
 * @route '/pos'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PosController::index
 * @see app/Http/Controllers/Admin/PosController.php:28
 * @route '/pos'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\PosController::index
 * @see app/Http/Controllers/Admin/PosController.php:28
 * @route '/pos'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\PosController::index
 * @see app/Http/Controllers/Admin/PosController.php:28
 * @route '/pos'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\PosController::index
 * @see app/Http/Controllers/Admin/PosController.php:28
 * @route '/pos'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\PosController::index
 * @see app/Http/Controllers/Admin/PosController.php:28
 * @route '/pos'
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
* @see \App\Http\Controllers\Admin\PosController::list
 * @see app/Http/Controllers/Admin/PosController.php:41
 * @route '/pos/list'
 */
export const list = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

list.definition = {
    methods: ["get","head"],
    url: '/pos/list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PosController::list
 * @see app/Http/Controllers/Admin/PosController.php:41
 * @route '/pos/list'
 */
list.url = (options?: RouteQueryOptions) => {
    return list.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PosController::list
 * @see app/Http/Controllers/Admin/PosController.php:41
 * @route '/pos/list'
 */
list.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\PosController::list
 * @see app/Http/Controllers/Admin/PosController.php:41
 * @route '/pos/list'
 */
list.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: list.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\PosController::list
 * @see app/Http/Controllers/Admin/PosController.php:41
 * @route '/pos/list'
 */
    const listForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: list.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\PosController::list
 * @see app/Http/Controllers/Admin/PosController.php:41
 * @route '/pos/list'
 */
        listForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: list.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\PosController::list
 * @see app/Http/Controllers/Admin/PosController.php:41
 * @route '/pos/list'
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
* @see \App\Http\Controllers\Admin\PosController::create
 * @see app/Http/Controllers/Admin/PosController.php:62
 * @route '/pos/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/pos/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PosController::create
 * @see app/Http/Controllers/Admin/PosController.php:62
 * @route '/pos/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PosController::create
 * @see app/Http/Controllers/Admin/PosController.php:62
 * @route '/pos/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\PosController::create
 * @see app/Http/Controllers/Admin/PosController.php:62
 * @route '/pos/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\PosController::create
 * @see app/Http/Controllers/Admin/PosController.php:62
 * @route '/pos/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\PosController::create
 * @see app/Http/Controllers/Admin/PosController.php:62
 * @route '/pos/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\PosController::create
 * @see app/Http/Controllers/Admin/PosController.php:62
 * @route '/pos/create'
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
* @see \App\Http\Controllers\Admin\PosController::store
 * @see app/Http/Controllers/Admin/PosController.php:80
 * @route '/pos/store'
 */
const store45b52058b268c752b48fb4fdbe6b122d = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store45b52058b268c752b48fb4fdbe6b122d.url(options),
    method: 'post',
})

store45b52058b268c752b48fb4fdbe6b122d.definition = {
    methods: ["post"],
    url: '/pos/store',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PosController::store
 * @see app/Http/Controllers/Admin/PosController.php:80
 * @route '/pos/store'
 */
store45b52058b268c752b48fb4fdbe6b122d.url = (options?: RouteQueryOptions) => {
    return store45b52058b268c752b48fb4fdbe6b122d.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PosController::store
 * @see app/Http/Controllers/Admin/PosController.php:80
 * @route '/pos/store'
 */
store45b52058b268c752b48fb4fdbe6b122d.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store45b52058b268c752b48fb4fdbe6b122d.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\PosController::store
 * @see app/Http/Controllers/Admin/PosController.php:80
 * @route '/pos/store'
 */
    const store45b52058b268c752b48fb4fdbe6b122dForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store45b52058b268c752b48fb4fdbe6b122d.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PosController::store
 * @see app/Http/Controllers/Admin/PosController.php:80
 * @route '/pos/store'
 */
        store45b52058b268c752b48fb4fdbe6b122dForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store45b52058b268c752b48fb4fdbe6b122d.url(options),
            method: 'post',
        })
    
    store45b52058b268c752b48fb4fdbe6b122d.form = store45b52058b268c752b48fb4fdbe6b122dForm
    /**
* @see \App\Http\Controllers\Admin\PosController::store
 * @see app/Http/Controllers/Admin/PosController.php:80
 * @route '/pos/orders'
 */
const store90f366a929c9af6ed59bf51b31270ec1 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store90f366a929c9af6ed59bf51b31270ec1.url(options),
    method: 'post',
})

store90f366a929c9af6ed59bf51b31270ec1.definition = {
    methods: ["post"],
    url: '/pos/orders',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PosController::store
 * @see app/Http/Controllers/Admin/PosController.php:80
 * @route '/pos/orders'
 */
store90f366a929c9af6ed59bf51b31270ec1.url = (options?: RouteQueryOptions) => {
    return store90f366a929c9af6ed59bf51b31270ec1.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PosController::store
 * @see app/Http/Controllers/Admin/PosController.php:80
 * @route '/pos/orders'
 */
store90f366a929c9af6ed59bf51b31270ec1.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store90f366a929c9af6ed59bf51b31270ec1.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\PosController::store
 * @see app/Http/Controllers/Admin/PosController.php:80
 * @route '/pos/orders'
 */
    const store90f366a929c9af6ed59bf51b31270ec1Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store90f366a929c9af6ed59bf51b31270ec1.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PosController::store
 * @see app/Http/Controllers/Admin/PosController.php:80
 * @route '/pos/orders'
 */
        store90f366a929c9af6ed59bf51b31270ec1Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store90f366a929c9af6ed59bf51b31270ec1.url(options),
            method: 'post',
        })
    
    store90f366a929c9af6ed59bf51b31270ec1.form = store90f366a929c9af6ed59bf51b31270ec1Form

/**
* Multiple routes resolve to \App\Http\Controllers\Admin\PosController::store, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `store['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const store = {
    '/pos/store': store45b52058b268c752b48fb4fdbe6b122d,
    '/pos/orders': store90f366a929c9af6ed59bf51b31270ec1,
}

/**
* @see \App\Http\Controllers\Admin\PosController::show
 * @see app/Http/Controllers/Admin/PosController.php:150
 * @route '/pos/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/pos/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PosController::show
 * @see app/Http/Controllers/Admin/PosController.php:150
 * @route '/pos/{id}'
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
* @see \App\Http\Controllers\Admin\PosController::show
 * @see app/Http/Controllers/Admin/PosController.php:150
 * @route '/pos/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\PosController::show
 * @see app/Http/Controllers/Admin/PosController.php:150
 * @route '/pos/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\PosController::show
 * @see app/Http/Controllers/Admin/PosController.php:150
 * @route '/pos/{id}'
 */
    const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\PosController::show
 * @see app/Http/Controllers/Admin/PosController.php:150
 * @route '/pos/{id}'
 */
        showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\PosController::show
 * @see app/Http/Controllers/Admin/PosController.php:150
 * @route '/pos/{id}'
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
* @see \App\Http\Controllers\Admin\PosController::edit
 * @see app/Http/Controllers/Admin/PosController.php:163
 * @route '/pos/{id}/edit'
 */
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/pos/{id}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PosController::edit
 * @see app/Http/Controllers/Admin/PosController.php:163
 * @route '/pos/{id}/edit'
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
* @see \App\Http\Controllers\Admin\PosController::edit
 * @see app/Http/Controllers/Admin/PosController.php:163
 * @route '/pos/{id}/edit'
 */
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\PosController::edit
 * @see app/Http/Controllers/Admin/PosController.php:163
 * @route '/pos/{id}/edit'
 */
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\PosController::edit
 * @see app/Http/Controllers/Admin/PosController.php:163
 * @route '/pos/{id}/edit'
 */
    const editForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\PosController::edit
 * @see app/Http/Controllers/Admin/PosController.php:163
 * @route '/pos/{id}/edit'
 */
        editForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\PosController::edit
 * @see app/Http/Controllers/Admin/PosController.php:163
 * @route '/pos/{id}/edit'
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
* @see \App\Http\Controllers\Admin\PosController::update
 * @see app/Http/Controllers/Admin/PosController.php:176
 * @route '/pos/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/pos/{id}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\PosController::update
 * @see app/Http/Controllers/Admin/PosController.php:176
 * @route '/pos/{id}'
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
* @see \App\Http\Controllers\Admin\PosController::update
 * @see app/Http/Controllers/Admin/PosController.php:176
 * @route '/pos/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\PosController::update
 * @see app/Http/Controllers/Admin/PosController.php:176
 * @route '/pos/{id}'
 */
update.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\PosController::update
 * @see app/Http/Controllers/Admin/PosController.php:176
 * @route '/pos/{id}'
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
* @see \App\Http\Controllers\Admin\PosController::update
 * @see app/Http/Controllers/Admin/PosController.php:176
 * @route '/pos/{id}'
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
* @see \App\Http\Controllers\Admin\PosController::update
 * @see app/Http/Controllers/Admin/PosController.php:176
 * @route '/pos/{id}'
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
* @see \App\Http\Controllers\Admin\PosController::destroy
 * @see app/Http/Controllers/Admin/PosController.php:201
 * @route '/pos/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/pos/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\PosController::destroy
 * @see app/Http/Controllers/Admin/PosController.php:201
 * @route '/pos/{id}'
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
* @see \App\Http\Controllers\Admin\PosController::destroy
 * @see app/Http/Controllers/Admin/PosController.php:201
 * @route '/pos/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\PosController::destroy
 * @see app/Http/Controllers/Admin/PosController.php:201
 * @route '/pos/{id}'
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
* @see \App\Http\Controllers\Admin\PosController::destroy
 * @see app/Http/Controllers/Admin/PosController.php:201
 * @route '/pos/{id}'
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
* @see \App\Http\Controllers\Admin\PosController::recordPayment
 * @see app/Http/Controllers/Admin/PosController.php:223
 * @route '/pos/payments'
 */
export const recordPayment = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordPayment.url(options),
    method: 'post',
})

recordPayment.definition = {
    methods: ["post"],
    url: '/pos/payments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PosController::recordPayment
 * @see app/Http/Controllers/Admin/PosController.php:223
 * @route '/pos/payments'
 */
recordPayment.url = (options?: RouteQueryOptions) => {
    return recordPayment.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PosController::recordPayment
 * @see app/Http/Controllers/Admin/PosController.php:223
 * @route '/pos/payments'
 */
recordPayment.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordPayment.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\PosController::recordPayment
 * @see app/Http/Controllers/Admin/PosController.php:223
 * @route '/pos/payments'
 */
    const recordPaymentForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: recordPayment.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PosController::recordPayment
 * @see app/Http/Controllers/Admin/PosController.php:223
 * @route '/pos/payments'
 */
        recordPaymentForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: recordPayment.url(options),
            method: 'post',
        })
    
    recordPayment.form = recordPaymentForm
/**
* @see \App\Http\Controllers\Admin\PosController::printReceipt
 * @see app/Http/Controllers/Admin/PosController.php:267
 * @route '/pos/receipt/{orderId}'
 */
export const printReceipt = (args: { orderId: string | number } | [orderId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: printReceipt.url(args, options),
    method: 'get',
})

printReceipt.definition = {
    methods: ["get","head"],
    url: '/pos/receipt/{orderId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PosController::printReceipt
 * @see app/Http/Controllers/Admin/PosController.php:267
 * @route '/pos/receipt/{orderId}'
 */
printReceipt.url = (args: { orderId: string | number } | [orderId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { orderId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    orderId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        orderId: args.orderId,
                }

    return printReceipt.definition.url
            .replace('{orderId}', parsedArgs.orderId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PosController::printReceipt
 * @see app/Http/Controllers/Admin/PosController.php:267
 * @route '/pos/receipt/{orderId}'
 */
printReceipt.get = (args: { orderId: string | number } | [orderId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: printReceipt.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\PosController::printReceipt
 * @see app/Http/Controllers/Admin/PosController.php:267
 * @route '/pos/receipt/{orderId}'
 */
printReceipt.head = (args: { orderId: string | number } | [orderId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: printReceipt.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\PosController::printReceipt
 * @see app/Http/Controllers/Admin/PosController.php:267
 * @route '/pos/receipt/{orderId}'
 */
    const printReceiptForm = (args: { orderId: string | number } | [orderId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: printReceipt.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\PosController::printReceipt
 * @see app/Http/Controllers/Admin/PosController.php:267
 * @route '/pos/receipt/{orderId}'
 */
        printReceiptForm.get = (args: { orderId: string | number } | [orderId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: printReceipt.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\PosController::printReceipt
 * @see app/Http/Controllers/Admin/PosController.php:267
 * @route '/pos/receipt/{orderId}'
 */
        printReceiptForm.head = (args: { orderId: string | number } | [orderId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: printReceipt.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    printReceipt.form = printReceiptForm
const PosController = { index, list, create, store, show, edit, update, destroy, recordPayment, printReceipt }

export default PosController