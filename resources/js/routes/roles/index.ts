import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\UserController::matrix
 * @see app/Http/Controllers/Admin/UserController.php:199
 * @route '/roles/matrix'
 */
export const matrix = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: matrix.url(options),
    method: 'get',
})

matrix.definition = {
    methods: ["get","head"],
    url: '/roles/matrix',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\UserController::matrix
 * @see app/Http/Controllers/Admin/UserController.php:199
 * @route '/roles/matrix'
 */
matrix.url = (options?: RouteQueryOptions) => {
    return matrix.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\UserController::matrix
 * @see app/Http/Controllers/Admin/UserController.php:199
 * @route '/roles/matrix'
 */
matrix.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: matrix.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\UserController::matrix
 * @see app/Http/Controllers/Admin/UserController.php:199
 * @route '/roles/matrix'
 */
matrix.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: matrix.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\UserController::matrix
 * @see app/Http/Controllers/Admin/UserController.php:199
 * @route '/roles/matrix'
 */
    const matrixForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: matrix.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\UserController::matrix
 * @see app/Http/Controllers/Admin/UserController.php:199
 * @route '/roles/matrix'
 */
        matrixForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: matrix.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\UserController::matrix
 * @see app/Http/Controllers/Admin/UserController.php:199
 * @route '/roles/matrix'
 */
        matrixForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: matrix.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    matrix.form = matrixForm