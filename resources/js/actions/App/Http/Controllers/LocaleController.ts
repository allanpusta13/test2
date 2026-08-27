import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\LocaleController::setLocale
 * @see app/Http/Controllers/LocaleController.php:16
 * @route '/locale/{locale}'
 */
const setLocale752637c4837a5686d7fd25c564df28aa = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: setLocale752637c4837a5686d7fd25c564df28aa.url(args, options),
    method: 'get',
})

setLocale752637c4837a5686d7fd25c564df28aa.definition = {
    methods: ["get","head"],
    url: '/locale/{locale}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LocaleController::setLocale
 * @see app/Http/Controllers/LocaleController.php:16
 * @route '/locale/{locale}'
 */
setLocale752637c4837a5686d7fd25c564df28aa.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return setLocale752637c4837a5686d7fd25c564df28aa.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LocaleController::setLocale
 * @see app/Http/Controllers/LocaleController.php:16
 * @route '/locale/{locale}'
 */
setLocale752637c4837a5686d7fd25c564df28aa.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: setLocale752637c4837a5686d7fd25c564df28aa.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LocaleController::setLocale
 * @see app/Http/Controllers/LocaleController.php:16
 * @route '/locale/{locale}'
 */
setLocale752637c4837a5686d7fd25c564df28aa.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: setLocale752637c4837a5686d7fd25c564df28aa.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LocaleController::setLocale
 * @see app/Http/Controllers/LocaleController.php:16
 * @route '/locale/{locale}'
 */
    const setLocale752637c4837a5686d7fd25c564df28aaForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: setLocale752637c4837a5686d7fd25c564df28aa.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LocaleController::setLocale
 * @see app/Http/Controllers/LocaleController.php:16
 * @route '/locale/{locale}'
 */
        setLocale752637c4837a5686d7fd25c564df28aaForm.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: setLocale752637c4837a5686d7fd25c564df28aa.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LocaleController::setLocale
 * @see app/Http/Controllers/LocaleController.php:16
 * @route '/locale/{locale}'
 */
        setLocale752637c4837a5686d7fd25c564df28aaForm.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: setLocale752637c4837a5686d7fd25c564df28aa.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    setLocale752637c4837a5686d7fd25c564df28aa.form = setLocale752637c4837a5686d7fd25c564df28aaForm
    /**
* @see \App\Http\Controllers\LocaleController::setLocale
 * @see app/Http/Controllers/LocaleController.php:16
 * @route '/locale/{locale}'
 */
const setLocale752637c4837a5686d7fd25c564df28aa = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setLocale752637c4837a5686d7fd25c564df28aa.url(args, options),
    method: 'post',
})

setLocale752637c4837a5686d7fd25c564df28aa.definition = {
    methods: ["post"],
    url: '/locale/{locale}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\LocaleController::setLocale
 * @see app/Http/Controllers/LocaleController.php:16
 * @route '/locale/{locale}'
 */
setLocale752637c4837a5686d7fd25c564df28aa.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return setLocale752637c4837a5686d7fd25c564df28aa.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LocaleController::setLocale
 * @see app/Http/Controllers/LocaleController.php:16
 * @route '/locale/{locale}'
 */
setLocale752637c4837a5686d7fd25c564df28aa.post = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setLocale752637c4837a5686d7fd25c564df28aa.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\LocaleController::setLocale
 * @see app/Http/Controllers/LocaleController.php:16
 * @route '/locale/{locale}'
 */
    const setLocale752637c4837a5686d7fd25c564df28aaForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: setLocale752637c4837a5686d7fd25c564df28aa.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\LocaleController::setLocale
 * @see app/Http/Controllers/LocaleController.php:16
 * @route '/locale/{locale}'
 */
        setLocale752637c4837a5686d7fd25c564df28aaForm.post = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: setLocale752637c4837a5686d7fd25c564df28aa.url(args, options),
            method: 'post',
        })
    
    setLocale752637c4837a5686d7fd25c564df28aa.form = setLocale752637c4837a5686d7fd25c564df28aaForm

/**
* Multiple routes resolve to \App\Http\Controllers\LocaleController::setLocale, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `setLocale['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const setLocale = {
    '/locale/{locale}': setLocale752637c4837a5686d7fd25c564df28aa,
    '/locale/{locale}': setLocale752637c4837a5686d7fd25c564df28aa,
}

/**
* @see \App\Http\Controllers\LocaleController::translations
 * @see app/Http/Controllers/LocaleController.php:34
 * @route '/translations/{locale?}'
 */
export const translations = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: translations.url(args, options),
    method: 'get',
})

translations.definition = {
    methods: ["get","head"],
    url: '/translations/{locale?}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LocaleController::translations
 * @see app/Http/Controllers/LocaleController.php:34
 * @route '/translations/{locale?}'
 */
translations.url = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { locale: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "locale",
        ])

    const parsedArgs = {
                        locale: args?.locale,
                }

    return translations.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LocaleController::translations
 * @see app/Http/Controllers/LocaleController.php:34
 * @route '/translations/{locale?}'
 */
translations.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: translations.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LocaleController::translations
 * @see app/Http/Controllers/LocaleController.php:34
 * @route '/translations/{locale?}'
 */
translations.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: translations.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LocaleController::translations
 * @see app/Http/Controllers/LocaleController.php:34
 * @route '/translations/{locale?}'
 */
    const translationsForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: translations.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LocaleController::translations
 * @see app/Http/Controllers/LocaleController.php:34
 * @route '/translations/{locale?}'
 */
        translationsForm.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: translations.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LocaleController::translations
 * @see app/Http/Controllers/LocaleController.php:34
 * @route '/translations/{locale?}'
 */
        translationsForm.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: translations.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    translations.form = translationsForm
const LocaleController = { setLocale, translations }

export default LocaleController