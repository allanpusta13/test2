import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\LocaleController::set
 * @see app/Http/Controllers/LocaleController.php:16
 * @route '/locale/{locale}'
 */
export const set = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: set.url(args, options),
    method: 'get',
})

set.definition = {
    methods: ["get","head"],
    url: '/locale/{locale}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LocaleController::set
 * @see app/Http/Controllers/LocaleController.php:16
 * @route '/locale/{locale}'
 */
set.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { locale: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                }

    return set.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LocaleController::set
 * @see app/Http/Controllers/LocaleController.php:16
 * @route '/locale/{locale}'
 */
set.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: set.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LocaleController::set
 * @see app/Http/Controllers/LocaleController.php:16
 * @route '/locale/{locale}'
 */
set.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: set.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LocaleController::set
 * @see app/Http/Controllers/LocaleController.php:16
 * @route '/locale/{locale}'
 */
    const setForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: set.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LocaleController::set
 * @see app/Http/Controllers/LocaleController.php:16
 * @route '/locale/{locale}'
 */
        setForm.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: set.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LocaleController::set
 * @see app/Http/Controllers/LocaleController.php:16
 * @route '/locale/{locale}'
 */
        setForm.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: set.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    set.form = setForm
/**
* @see \App\Http\Controllers\LocaleController::update
 * @see app/Http/Controllers/LocaleController.php:16
 * @route '/locale/{locale}'
 */
export const update = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/locale/{locale}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\LocaleController::update
 * @see app/Http/Controllers/LocaleController.php:16
 * @route '/locale/{locale}'
 */
update.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { locale: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                }

    return update.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LocaleController::update
 * @see app/Http/Controllers/LocaleController.php:16
 * @route '/locale/{locale}'
 */
update.post = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\LocaleController::update
 * @see app/Http/Controllers/LocaleController.php:16
 * @route '/locale/{locale}'
 */
    const updateForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\LocaleController::update
 * @see app/Http/Controllers/LocaleController.php:16
 * @route '/locale/{locale}'
 */
        updateForm.post = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
const locale = {
    set: Object.assign(set, set),
update: Object.assign(update, update),
}

export default locale