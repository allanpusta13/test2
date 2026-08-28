import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\KitchenController::index
 * @see app/Http/Controllers/Admin/KitchenController.php:29
 * @route '/kitchen'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/kitchen',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\KitchenController::index
 * @see app/Http/Controllers/Admin/KitchenController.php:29
 * @route '/kitchen'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KitchenController::index
 * @see app/Http/Controllers/Admin/KitchenController.php:29
 * @route '/kitchen'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\KitchenController::index
 * @see app/Http/Controllers/Admin/KitchenController.php:29
 * @route '/kitchen'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\KitchenController::index
 * @see app/Http/Controllers/Admin/KitchenController.php:29
 * @route '/kitchen'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\KitchenController::index
 * @see app/Http/Controllers/Admin/KitchenController.php:29
 * @route '/kitchen'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\KitchenController::index
 * @see app/Http/Controllers/Admin/KitchenController.php:29
 * @route '/kitchen'
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
* @see \App\Http\Controllers\Admin\KitchenController::list
 * @see app/Http/Controllers/Admin/KitchenController.php:42
 * @route '/kitchen/list'
 */
const listc4bfd26ad0f21812692b2dbde2bb2623 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listc4bfd26ad0f21812692b2dbde2bb2623.url(options),
    method: 'get',
})

listc4bfd26ad0f21812692b2dbde2bb2623.definition = {
    methods: ["get","head"],
    url: '/kitchen/list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\KitchenController::list
 * @see app/Http/Controllers/Admin/KitchenController.php:42
 * @route '/kitchen/list'
 */
listc4bfd26ad0f21812692b2dbde2bb2623.url = (options?: RouteQueryOptions) => {
    return listc4bfd26ad0f21812692b2dbde2bb2623.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KitchenController::list
 * @see app/Http/Controllers/Admin/KitchenController.php:42
 * @route '/kitchen/list'
 */
listc4bfd26ad0f21812692b2dbde2bb2623.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listc4bfd26ad0f21812692b2dbde2bb2623.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\KitchenController::list
 * @see app/Http/Controllers/Admin/KitchenController.php:42
 * @route '/kitchen/list'
 */
listc4bfd26ad0f21812692b2dbde2bb2623.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: listc4bfd26ad0f21812692b2dbde2bb2623.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\KitchenController::list
 * @see app/Http/Controllers/Admin/KitchenController.php:42
 * @route '/kitchen/list'
 */
    const listc4bfd26ad0f21812692b2dbde2bb2623Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: listc4bfd26ad0f21812692b2dbde2bb2623.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\KitchenController::list
 * @see app/Http/Controllers/Admin/KitchenController.php:42
 * @route '/kitchen/list'
 */
        listc4bfd26ad0f21812692b2dbde2bb2623Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: listc4bfd26ad0f21812692b2dbde2bb2623.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\KitchenController::list
 * @see app/Http/Controllers/Admin/KitchenController.php:42
 * @route '/kitchen/list'
 */
        listc4bfd26ad0f21812692b2dbde2bb2623Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: listc4bfd26ad0f21812692b2dbde2bb2623.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    listc4bfd26ad0f21812692b2dbde2bb2623.form = listc4bfd26ad0f21812692b2dbde2bb2623Form
    /**
* @see \App\Http\Controllers\Admin\KitchenController::list
 * @see app/Http/Controllers/Admin/KitchenController.php:42
 * @route '/kitchen/feed'
 */
const list339bc34672e183329e79d37ca37003a8 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list339bc34672e183329e79d37ca37003a8.url(options),
    method: 'get',
})

list339bc34672e183329e79d37ca37003a8.definition = {
    methods: ["get","head"],
    url: '/kitchen/feed',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\KitchenController::list
 * @see app/Http/Controllers/Admin/KitchenController.php:42
 * @route '/kitchen/feed'
 */
list339bc34672e183329e79d37ca37003a8.url = (options?: RouteQueryOptions) => {
    return list339bc34672e183329e79d37ca37003a8.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KitchenController::list
 * @see app/Http/Controllers/Admin/KitchenController.php:42
 * @route '/kitchen/feed'
 */
list339bc34672e183329e79d37ca37003a8.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list339bc34672e183329e79d37ca37003a8.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\KitchenController::list
 * @see app/Http/Controllers/Admin/KitchenController.php:42
 * @route '/kitchen/feed'
 */
list339bc34672e183329e79d37ca37003a8.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: list339bc34672e183329e79d37ca37003a8.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\KitchenController::list
 * @see app/Http/Controllers/Admin/KitchenController.php:42
 * @route '/kitchen/feed'
 */
    const list339bc34672e183329e79d37ca37003a8Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: list339bc34672e183329e79d37ca37003a8.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\KitchenController::list
 * @see app/Http/Controllers/Admin/KitchenController.php:42
 * @route '/kitchen/feed'
 */
        list339bc34672e183329e79d37ca37003a8Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: list339bc34672e183329e79d37ca37003a8.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\KitchenController::list
 * @see app/Http/Controllers/Admin/KitchenController.php:42
 * @route '/kitchen/feed'
 */
        list339bc34672e183329e79d37ca37003a8Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: list339bc34672e183329e79d37ca37003a8.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    list339bc34672e183329e79d37ca37003a8.form = list339bc34672e183329e79d37ca37003a8Form

/**
* Multiple routes resolve to \App\Http\Controllers\Admin\KitchenController::list, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `list['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const list = {
    '/kitchen/list': listc4bfd26ad0f21812692b2dbde2bb2623,
    '/kitchen/feed': list339bc34672e183329e79d37ca37003a8,
}

/**
* @see \App\Http\Controllers\Admin\KitchenController::show
 * @see app/Http/Controllers/Admin/KitchenController.php:73
 * @route '/kitchen/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/kitchen/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\KitchenController::show
 * @see app/Http/Controllers/Admin/KitchenController.php:73
 * @route '/kitchen/{id}'
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
* @see \App\Http\Controllers\Admin\KitchenController::show
 * @see app/Http/Controllers/Admin/KitchenController.php:73
 * @route '/kitchen/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\KitchenController::show
 * @see app/Http/Controllers/Admin/KitchenController.php:73
 * @route '/kitchen/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\KitchenController::show
 * @see app/Http/Controllers/Admin/KitchenController.php:73
 * @route '/kitchen/{id}'
 */
    const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\KitchenController::show
 * @see app/Http/Controllers/Admin/KitchenController.php:73
 * @route '/kitchen/{id}'
 */
        showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\KitchenController::show
 * @see app/Http/Controllers/Admin/KitchenController.php:73
 * @route '/kitchen/{id}'
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
* @see \App\Http\Controllers\Admin\KitchenController::edit
 * @see app/Http/Controllers/Admin/KitchenController.php:86
 * @route '/kitchen/{id}/edit'
 */
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/kitchen/{id}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\KitchenController::edit
 * @see app/Http/Controllers/Admin/KitchenController.php:86
 * @route '/kitchen/{id}/edit'
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
* @see \App\Http\Controllers\Admin\KitchenController::edit
 * @see app/Http/Controllers/Admin/KitchenController.php:86
 * @route '/kitchen/{id}/edit'
 */
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\KitchenController::edit
 * @see app/Http/Controllers/Admin/KitchenController.php:86
 * @route '/kitchen/{id}/edit'
 */
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\KitchenController::edit
 * @see app/Http/Controllers/Admin/KitchenController.php:86
 * @route '/kitchen/{id}/edit'
 */
    const editForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\KitchenController::edit
 * @see app/Http/Controllers/Admin/KitchenController.php:86
 * @route '/kitchen/{id}/edit'
 */
        editForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\KitchenController::edit
 * @see app/Http/Controllers/Admin/KitchenController.php:86
 * @route '/kitchen/{id}/edit'
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
* @see \App\Http\Controllers\Admin\KitchenController::update
 * @see app/Http/Controllers/Admin/KitchenController.php:99
 * @route '/kitchen/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/kitchen/{id}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\KitchenController::update
 * @see app/Http/Controllers/Admin/KitchenController.php:99
 * @route '/kitchen/{id}'
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
* @see \App\Http\Controllers\Admin\KitchenController::update
 * @see app/Http/Controllers/Admin/KitchenController.php:99
 * @route '/kitchen/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\KitchenController::update
 * @see app/Http/Controllers/Admin/KitchenController.php:99
 * @route '/kitchen/{id}'
 */
update.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\KitchenController::update
 * @see app/Http/Controllers/Admin/KitchenController.php:99
 * @route '/kitchen/{id}'
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
* @see \App\Http\Controllers\Admin\KitchenController::update
 * @see app/Http/Controllers/Admin/KitchenController.php:99
 * @route '/kitchen/{id}'
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
* @see \App\Http\Controllers\Admin\KitchenController::update
 * @see app/Http/Controllers/Admin/KitchenController.php:99
 * @route '/kitchen/{id}'
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
* @see \App\Http\Controllers\Admin\KitchenController::destroy
 * @see app/Http/Controllers/Admin/KitchenController.php:133
 * @route '/kitchen/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/kitchen/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\KitchenController::destroy
 * @see app/Http/Controllers/Admin/KitchenController.php:133
 * @route '/kitchen/{id}'
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
* @see \App\Http\Controllers\Admin\KitchenController::destroy
 * @see app/Http/Controllers/Admin/KitchenController.php:133
 * @route '/kitchen/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\KitchenController::destroy
 * @see app/Http/Controllers/Admin/KitchenController.php:133
 * @route '/kitchen/{id}'
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
* @see \App\Http\Controllers\Admin\KitchenController::destroy
 * @see app/Http/Controllers/Admin/KitchenController.php:133
 * @route '/kitchen/{id}'
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
* @see \App\Http\Controllers\Admin\KitchenController::bump
 * @see app/Http/Controllers/Admin/KitchenController.php:157
 * @route '/kitchen/orders/{id}/bump'
 */
export const bump = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bump.url(args, options),
    method: 'post',
})

bump.definition = {
    methods: ["post"],
    url: '/kitchen/orders/{id}/bump',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\KitchenController::bump
 * @see app/Http/Controllers/Admin/KitchenController.php:157
 * @route '/kitchen/orders/{id}/bump'
 */
bump.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return bump.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KitchenController::bump
 * @see app/Http/Controllers/Admin/KitchenController.php:157
 * @route '/kitchen/orders/{id}/bump'
 */
bump.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bump.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\KitchenController::bump
 * @see app/Http/Controllers/Admin/KitchenController.php:157
 * @route '/kitchen/orders/{id}/bump'
 */
    const bumpForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: bump.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\KitchenController::bump
 * @see app/Http/Controllers/Admin/KitchenController.php:157
 * @route '/kitchen/orders/{id}/bump'
 */
        bumpForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: bump.url(args, options),
            method: 'post',
        })
    
    bump.form = bumpForm
/**
* @see \App\Http\Controllers\Admin\KitchenController::updateStatus
 * @see app/Http/Controllers/Admin/KitchenController.php:198
 * @route '/kitchen/orders/{id}/status'
 */
export const updateStatus = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

updateStatus.definition = {
    methods: ["patch"],
    url: '/kitchen/orders/{id}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\KitchenController::updateStatus
 * @see app/Http/Controllers/Admin/KitchenController.php:198
 * @route '/kitchen/orders/{id}/status'
 */
updateStatus.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateStatus.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KitchenController::updateStatus
 * @see app/Http/Controllers/Admin/KitchenController.php:198
 * @route '/kitchen/orders/{id}/status'
 */
updateStatus.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\KitchenController::updateStatus
 * @see app/Http/Controllers/Admin/KitchenController.php:198
 * @route '/kitchen/orders/{id}/status'
 */
    const updateStatusForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\KitchenController::updateStatus
 * @see app/Http/Controllers/Admin/KitchenController.php:198
 * @route '/kitchen/orders/{id}/status'
 */
        updateStatusForm.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateStatus.form = updateStatusForm
const KitchenController = { index, list, show, edit, update, destroy, bump, updateStatus }

export default KitchenController