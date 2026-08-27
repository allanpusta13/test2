import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\MenuController::index
 * @see app/Http/Controllers/Admin/MenuController.php:31
 * @route '/menu'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/menu',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MenuController::index
 * @see app/Http/Controllers/Admin/MenuController.php:31
 * @route '/menu'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MenuController::index
 * @see app/Http/Controllers/Admin/MenuController.php:31
 * @route '/menu'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\MenuController::index
 * @see app/Http/Controllers/Admin/MenuController.php:31
 * @route '/menu'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\MenuController::index
 * @see app/Http/Controllers/Admin/MenuController.php:31
 * @route '/menu'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\MenuController::index
 * @see app/Http/Controllers/Admin/MenuController.php:31
 * @route '/menu'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\MenuController::index
 * @see app/Http/Controllers/Admin/MenuController.php:31
 * @route '/menu'
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
* @see \App\Http\Controllers\Admin\MenuController::list
 * @see app/Http/Controllers/Admin/MenuController.php:44
 * @route '/menu/list'
 */
const listb847a9b54256013048d0b3facfa9aaaa = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listb847a9b54256013048d0b3facfa9aaaa.url(options),
    method: 'get',
})

listb847a9b54256013048d0b3facfa9aaaa.definition = {
    methods: ["get","head"],
    url: '/menu/list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MenuController::list
 * @see app/Http/Controllers/Admin/MenuController.php:44
 * @route '/menu/list'
 */
listb847a9b54256013048d0b3facfa9aaaa.url = (options?: RouteQueryOptions) => {
    return listb847a9b54256013048d0b3facfa9aaaa.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MenuController::list
 * @see app/Http/Controllers/Admin/MenuController.php:44
 * @route '/menu/list'
 */
listb847a9b54256013048d0b3facfa9aaaa.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listb847a9b54256013048d0b3facfa9aaaa.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\MenuController::list
 * @see app/Http/Controllers/Admin/MenuController.php:44
 * @route '/menu/list'
 */
listb847a9b54256013048d0b3facfa9aaaa.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: listb847a9b54256013048d0b3facfa9aaaa.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\MenuController::list
 * @see app/Http/Controllers/Admin/MenuController.php:44
 * @route '/menu/list'
 */
    const listb847a9b54256013048d0b3facfa9aaaaForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: listb847a9b54256013048d0b3facfa9aaaa.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\MenuController::list
 * @see app/Http/Controllers/Admin/MenuController.php:44
 * @route '/menu/list'
 */
        listb847a9b54256013048d0b3facfa9aaaaForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: listb847a9b54256013048d0b3facfa9aaaa.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\MenuController::list
 * @see app/Http/Controllers/Admin/MenuController.php:44
 * @route '/menu/list'
 */
        listb847a9b54256013048d0b3facfa9aaaaForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: listb847a9b54256013048d0b3facfa9aaaa.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    listb847a9b54256013048d0b3facfa9aaaa.form = listb847a9b54256013048d0b3facfa9aaaaForm
    /**
* @see \App\Http\Controllers\Admin\MenuController::list
 * @see app/Http/Controllers/Admin/MenuController.php:44
 * @route '/menu/items'
 */
const liste60cec14c51d633b2160b95773ed071b = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: liste60cec14c51d633b2160b95773ed071b.url(options),
    method: 'get',
})

liste60cec14c51d633b2160b95773ed071b.definition = {
    methods: ["get","head"],
    url: '/menu/items',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MenuController::list
 * @see app/Http/Controllers/Admin/MenuController.php:44
 * @route '/menu/items'
 */
liste60cec14c51d633b2160b95773ed071b.url = (options?: RouteQueryOptions) => {
    return liste60cec14c51d633b2160b95773ed071b.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MenuController::list
 * @see app/Http/Controllers/Admin/MenuController.php:44
 * @route '/menu/items'
 */
liste60cec14c51d633b2160b95773ed071b.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: liste60cec14c51d633b2160b95773ed071b.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\MenuController::list
 * @see app/Http/Controllers/Admin/MenuController.php:44
 * @route '/menu/items'
 */
liste60cec14c51d633b2160b95773ed071b.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: liste60cec14c51d633b2160b95773ed071b.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\MenuController::list
 * @see app/Http/Controllers/Admin/MenuController.php:44
 * @route '/menu/items'
 */
    const liste60cec14c51d633b2160b95773ed071bForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: liste60cec14c51d633b2160b95773ed071b.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\MenuController::list
 * @see app/Http/Controllers/Admin/MenuController.php:44
 * @route '/menu/items'
 */
        liste60cec14c51d633b2160b95773ed071bForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: liste60cec14c51d633b2160b95773ed071b.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\MenuController::list
 * @see app/Http/Controllers/Admin/MenuController.php:44
 * @route '/menu/items'
 */
        liste60cec14c51d633b2160b95773ed071bForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: liste60cec14c51d633b2160b95773ed071b.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    liste60cec14c51d633b2160b95773ed071b.form = liste60cec14c51d633b2160b95773ed071bForm

/**
* Multiple routes resolve to \App\Http\Controllers\Admin\MenuController::list, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `list['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const list = {
    '/menu/list': listb847a9b54256013048d0b3facfa9aaaa,
    '/menu/items': liste60cec14c51d633b2160b95773ed071b,
}

/**
* @see \App\Http\Controllers\Admin\MenuController::create
 * @see app/Http/Controllers/Admin/MenuController.php:75
 * @route '/menu/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/menu/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MenuController::create
 * @see app/Http/Controllers/Admin/MenuController.php:75
 * @route '/menu/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MenuController::create
 * @see app/Http/Controllers/Admin/MenuController.php:75
 * @route '/menu/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\MenuController::create
 * @see app/Http/Controllers/Admin/MenuController.php:75
 * @route '/menu/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\MenuController::create
 * @see app/Http/Controllers/Admin/MenuController.php:75
 * @route '/menu/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\MenuController::create
 * @see app/Http/Controllers/Admin/MenuController.php:75
 * @route '/menu/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\MenuController::create
 * @see app/Http/Controllers/Admin/MenuController.php:75
 * @route '/menu/create'
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
* @see \App\Http\Controllers\Admin\MenuController::store
 * @see app/Http/Controllers/Admin/MenuController.php:126
 * @route '/menu'
 */
const store567180f5e3aba06b1bd67380afd29dc9 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store567180f5e3aba06b1bd67380afd29dc9.url(options),
    method: 'post',
})

store567180f5e3aba06b1bd67380afd29dc9.definition = {
    methods: ["post"],
    url: '/menu',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\MenuController::store
 * @see app/Http/Controllers/Admin/MenuController.php:126
 * @route '/menu'
 */
store567180f5e3aba06b1bd67380afd29dc9.url = (options?: RouteQueryOptions) => {
    return store567180f5e3aba06b1bd67380afd29dc9.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MenuController::store
 * @see app/Http/Controllers/Admin/MenuController.php:126
 * @route '/menu'
 */
store567180f5e3aba06b1bd67380afd29dc9.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store567180f5e3aba06b1bd67380afd29dc9.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\MenuController::store
 * @see app/Http/Controllers/Admin/MenuController.php:126
 * @route '/menu'
 */
    const store567180f5e3aba06b1bd67380afd29dc9Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store567180f5e3aba06b1bd67380afd29dc9.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\MenuController::store
 * @see app/Http/Controllers/Admin/MenuController.php:126
 * @route '/menu'
 */
        store567180f5e3aba06b1bd67380afd29dc9Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store567180f5e3aba06b1bd67380afd29dc9.url(options),
            method: 'post',
        })
    
    store567180f5e3aba06b1bd67380afd29dc9.form = store567180f5e3aba06b1bd67380afd29dc9Form
    /**
* @see \App\Http\Controllers\Admin\MenuController::store
 * @see app/Http/Controllers/Admin/MenuController.php:126
 * @route '/menu/items'
 */
const storee60cec14c51d633b2160b95773ed071b = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storee60cec14c51d633b2160b95773ed071b.url(options),
    method: 'post',
})

storee60cec14c51d633b2160b95773ed071b.definition = {
    methods: ["post"],
    url: '/menu/items',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\MenuController::store
 * @see app/Http/Controllers/Admin/MenuController.php:126
 * @route '/menu/items'
 */
storee60cec14c51d633b2160b95773ed071b.url = (options?: RouteQueryOptions) => {
    return storee60cec14c51d633b2160b95773ed071b.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MenuController::store
 * @see app/Http/Controllers/Admin/MenuController.php:126
 * @route '/menu/items'
 */
storee60cec14c51d633b2160b95773ed071b.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storee60cec14c51d633b2160b95773ed071b.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\MenuController::store
 * @see app/Http/Controllers/Admin/MenuController.php:126
 * @route '/menu/items'
 */
    const storee60cec14c51d633b2160b95773ed071bForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storee60cec14c51d633b2160b95773ed071b.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\MenuController::store
 * @see app/Http/Controllers/Admin/MenuController.php:126
 * @route '/menu/items'
 */
        storee60cec14c51d633b2160b95773ed071bForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storee60cec14c51d633b2160b95773ed071b.url(options),
            method: 'post',
        })
    
    storee60cec14c51d633b2160b95773ed071b.form = storee60cec14c51d633b2160b95773ed071bForm

/**
* Multiple routes resolve to \App\Http\Controllers\Admin\MenuController::store, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `store['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const store = {
    '/menu': store567180f5e3aba06b1bd67380afd29dc9,
    '/menu/items': storee60cec14c51d633b2160b95773ed071b,
}

/**
* @see \App\Http\Controllers\Admin\MenuController::categories
 * @see app/Http/Controllers/Admin/MenuController.php:234
 * @route '/menu/categories'
 */
export const categories = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: categories.url(options),
    method: 'get',
})

categories.definition = {
    methods: ["get","head"],
    url: '/menu/categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MenuController::categories
 * @see app/Http/Controllers/Admin/MenuController.php:234
 * @route '/menu/categories'
 */
categories.url = (options?: RouteQueryOptions) => {
    return categories.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MenuController::categories
 * @see app/Http/Controllers/Admin/MenuController.php:234
 * @route '/menu/categories'
 */
categories.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: categories.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\MenuController::categories
 * @see app/Http/Controllers/Admin/MenuController.php:234
 * @route '/menu/categories'
 */
categories.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: categories.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\MenuController::categories
 * @see app/Http/Controllers/Admin/MenuController.php:234
 * @route '/menu/categories'
 */
    const categoriesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: categories.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\MenuController::categories
 * @see app/Http/Controllers/Admin/MenuController.php:234
 * @route '/menu/categories'
 */
        categoriesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: categories.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\MenuController::categories
 * @see app/Http/Controllers/Admin/MenuController.php:234
 * @route '/menu/categories'
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
/**
* @see \App\Http\Controllers\Admin\MenuController::storeCategory
 * @see app/Http/Controllers/Admin/MenuController.php:247
 * @route '/menu/categories'
 */
export const storeCategory = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeCategory.url(options),
    method: 'post',
})

storeCategory.definition = {
    methods: ["post"],
    url: '/menu/categories',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\MenuController::storeCategory
 * @see app/Http/Controllers/Admin/MenuController.php:247
 * @route '/menu/categories'
 */
storeCategory.url = (options?: RouteQueryOptions) => {
    return storeCategory.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MenuController::storeCategory
 * @see app/Http/Controllers/Admin/MenuController.php:247
 * @route '/menu/categories'
 */
storeCategory.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeCategory.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\MenuController::storeCategory
 * @see app/Http/Controllers/Admin/MenuController.php:247
 * @route '/menu/categories'
 */
    const storeCategoryForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeCategory.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\MenuController::storeCategory
 * @see app/Http/Controllers/Admin/MenuController.php:247
 * @route '/menu/categories'
 */
        storeCategoryForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeCategory.url(options),
            method: 'post',
        })
    
    storeCategory.form = storeCategoryForm
/**
* @see \App\Http\Controllers\Admin\MenuController::updateCategory
 * @see app/Http/Controllers/Admin/MenuController.php:266
 * @route '/menu/categories/{id}'
 */
export const updateCategory = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateCategory.url(args, options),
    method: 'put',
})

updateCategory.definition = {
    methods: ["put","patch"],
    url: '/menu/categories/{id}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\MenuController::updateCategory
 * @see app/Http/Controllers/Admin/MenuController.php:266
 * @route '/menu/categories/{id}'
 */
updateCategory.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateCategory.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MenuController::updateCategory
 * @see app/Http/Controllers/Admin/MenuController.php:266
 * @route '/menu/categories/{id}'
 */
updateCategory.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateCategory.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\MenuController::updateCategory
 * @see app/Http/Controllers/Admin/MenuController.php:266
 * @route '/menu/categories/{id}'
 */
updateCategory.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateCategory.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\MenuController::updateCategory
 * @see app/Http/Controllers/Admin/MenuController.php:266
 * @route '/menu/categories/{id}'
 */
    const updateCategoryForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateCategory.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\MenuController::updateCategory
 * @see app/Http/Controllers/Admin/MenuController.php:266
 * @route '/menu/categories/{id}'
 */
        updateCategoryForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateCategory.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\MenuController::updateCategory
 * @see app/Http/Controllers/Admin/MenuController.php:266
 * @route '/menu/categories/{id}'
 */
        updateCategoryForm.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateCategory.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateCategory.form = updateCategoryForm
/**
* @see \App\Http\Controllers\Admin\MenuController::deleteCategory
 * @see app/Http/Controllers/Admin/MenuController.php:281
 * @route '/menu/categories/{id}'
 */
export const deleteCategory = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteCategory.url(args, options),
    method: 'delete',
})

deleteCategory.definition = {
    methods: ["delete"],
    url: '/menu/categories/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\MenuController::deleteCategory
 * @see app/Http/Controllers/Admin/MenuController.php:281
 * @route '/menu/categories/{id}'
 */
deleteCategory.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return deleteCategory.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MenuController::deleteCategory
 * @see app/Http/Controllers/Admin/MenuController.php:281
 * @route '/menu/categories/{id}'
 */
deleteCategory.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteCategory.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\MenuController::deleteCategory
 * @see app/Http/Controllers/Admin/MenuController.php:281
 * @route '/menu/categories/{id}'
 */
    const deleteCategoryForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: deleteCategory.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\MenuController::deleteCategory
 * @see app/Http/Controllers/Admin/MenuController.php:281
 * @route '/menu/categories/{id}'
 */
        deleteCategoryForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: deleteCategory.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    deleteCategory.form = deleteCategoryForm
/**
* @see \App\Http\Controllers\Admin\MenuController::reorderCategories
 * @see app/Http/Controllers/Admin/MenuController.php:295
 * @route '/menu/categories/reorder'
 */
export const reorderCategories = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorderCategories.url(options),
    method: 'post',
})

reorderCategories.definition = {
    methods: ["post"],
    url: '/menu/categories/reorder',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\MenuController::reorderCategories
 * @see app/Http/Controllers/Admin/MenuController.php:295
 * @route '/menu/categories/reorder'
 */
reorderCategories.url = (options?: RouteQueryOptions) => {
    return reorderCategories.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MenuController::reorderCategories
 * @see app/Http/Controllers/Admin/MenuController.php:295
 * @route '/menu/categories/reorder'
 */
reorderCategories.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorderCategories.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\MenuController::reorderCategories
 * @see app/Http/Controllers/Admin/MenuController.php:295
 * @route '/menu/categories/reorder'
 */
    const reorderCategoriesForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reorderCategories.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\MenuController::reorderCategories
 * @see app/Http/Controllers/Admin/MenuController.php:295
 * @route '/menu/categories/reorder'
 */
        reorderCategoriesForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reorderCategories.url(options),
            method: 'post',
        })
    
    reorderCategories.form = reorderCategoriesForm
/**
* @see \App\Http\Controllers\Admin\MenuController::show
 * @see app/Http/Controllers/Admin/MenuController.php:146
 * @route '/menu/items/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/menu/items/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MenuController::show
 * @see app/Http/Controllers/Admin/MenuController.php:146
 * @route '/menu/items/{id}'
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
* @see \App\Http\Controllers\Admin\MenuController::show
 * @see app/Http/Controllers/Admin/MenuController.php:146
 * @route '/menu/items/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\MenuController::show
 * @see app/Http/Controllers/Admin/MenuController.php:146
 * @route '/menu/items/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\MenuController::show
 * @see app/Http/Controllers/Admin/MenuController.php:146
 * @route '/menu/items/{id}'
 */
    const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\MenuController::show
 * @see app/Http/Controllers/Admin/MenuController.php:146
 * @route '/menu/items/{id}'
 */
        showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\MenuController::show
 * @see app/Http/Controllers/Admin/MenuController.php:146
 * @route '/menu/items/{id}'
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
* @see \App\Http\Controllers\Admin\MenuController::edit
 * @see app/Http/Controllers/Admin/MenuController.php:159
 * @route '/menu/items/{id}/edit'
 */
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/menu/items/{id}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MenuController::edit
 * @see app/Http/Controllers/Admin/MenuController.php:159
 * @route '/menu/items/{id}/edit'
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
* @see \App\Http\Controllers\Admin\MenuController::edit
 * @see app/Http/Controllers/Admin/MenuController.php:159
 * @route '/menu/items/{id}/edit'
 */
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\MenuController::edit
 * @see app/Http/Controllers/Admin/MenuController.php:159
 * @route '/menu/items/{id}/edit'
 */
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\MenuController::edit
 * @see app/Http/Controllers/Admin/MenuController.php:159
 * @route '/menu/items/{id}/edit'
 */
    const editForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\MenuController::edit
 * @see app/Http/Controllers/Admin/MenuController.php:159
 * @route '/menu/items/{id}/edit'
 */
        editForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\MenuController::edit
 * @see app/Http/Controllers/Admin/MenuController.php:159
 * @route '/menu/items/{id}/edit'
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
* @see \App\Http\Controllers\Admin\MenuController::update
 * @see app/Http/Controllers/Admin/MenuController.php:178
 * @route '/menu/items/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/menu/items/{id}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\MenuController::update
 * @see app/Http/Controllers/Admin/MenuController.php:178
 * @route '/menu/items/{id}'
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
* @see \App\Http\Controllers\Admin\MenuController::update
 * @see app/Http/Controllers/Admin/MenuController.php:178
 * @route '/menu/items/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\MenuController::update
 * @see app/Http/Controllers/Admin/MenuController.php:178
 * @route '/menu/items/{id}'
 */
update.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\MenuController::update
 * @see app/Http/Controllers/Admin/MenuController.php:178
 * @route '/menu/items/{id}'
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
* @see \App\Http\Controllers\Admin\MenuController::update
 * @see app/Http/Controllers/Admin/MenuController.php:178
 * @route '/menu/items/{id}'
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
* @see \App\Http\Controllers\Admin\MenuController::update
 * @see app/Http/Controllers/Admin/MenuController.php:178
 * @route '/menu/items/{id}'
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
* @see \App\Http\Controllers\Admin\MenuController::destroy
 * @see app/Http/Controllers/Admin/MenuController.php:193
 * @route '/menu/items/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/menu/items/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\MenuController::destroy
 * @see app/Http/Controllers/Admin/MenuController.php:193
 * @route '/menu/items/{id}'
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
* @see \App\Http\Controllers\Admin\MenuController::destroy
 * @see app/Http/Controllers/Admin/MenuController.php:193
 * @route '/menu/items/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\MenuController::destroy
 * @see app/Http/Controllers/Admin/MenuController.php:193
 * @route '/menu/items/{id}'
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
* @see \App\Http\Controllers\Admin\MenuController::destroy
 * @see app/Http/Controllers/Admin/MenuController.php:193
 * @route '/menu/items/{id}'
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
* @see \App\Http\Controllers\Admin\MenuController::toggleAvailability
 * @see app/Http/Controllers/Admin/MenuController.php:215
 * @route '/menu/items/{id}/toggle-availability'
 */
export const toggleAvailability = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleAvailability.url(args, options),
    method: 'post',
})

toggleAvailability.definition = {
    methods: ["post"],
    url: '/menu/items/{id}/toggle-availability',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\MenuController::toggleAvailability
 * @see app/Http/Controllers/Admin/MenuController.php:215
 * @route '/menu/items/{id}/toggle-availability'
 */
toggleAvailability.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return toggleAvailability.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MenuController::toggleAvailability
 * @see app/Http/Controllers/Admin/MenuController.php:215
 * @route '/menu/items/{id}/toggle-availability'
 */
toggleAvailability.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleAvailability.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\MenuController::toggleAvailability
 * @see app/Http/Controllers/Admin/MenuController.php:215
 * @route '/menu/items/{id}/toggle-availability'
 */
    const toggleAvailabilityForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleAvailability.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\MenuController::toggleAvailability
 * @see app/Http/Controllers/Admin/MenuController.php:215
 * @route '/menu/items/{id}/toggle-availability'
 */
        toggleAvailabilityForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleAvailability.url(args, options),
            method: 'post',
        })
    
    toggleAvailability.form = toggleAvailabilityForm
const MenuController = { index, list, create, store, categories, storeCategory, updateCategory, deleteCategory, reorderCategories, show, edit, update, destroy, toggleAvailability }

export default MenuController