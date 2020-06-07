import request from '../utils/request'

export function deleteCategoriesById(id) {
    return request({
        url: '/admin/categories/deleteCategoriesById',
        method: 'get',
        params: {id}
    })
}

export function getCategoriesById(id) {
    return request({
        url: '/categories/getCategoriesById',
        method: 'get',
        params: {id}
    })
}

export function getCategoriesByName(name) {
    return request({
        url: '/categories/getCategoriesByName',
        method: 'get',
        params: {name}
    })
}

export function listAllCategoriesByArticleId(id) {
    return request({
        url: '/categories/listAllCategoriesByArticleId',
        method: 'get',
        params: {id}
    })
}

export function listAllCategories() {
    return request({
        url: '/categories/listAllCategories',
        method: 'get'
    })
}

export function insertArticleCategories(articleCategories) {
    return request({
        url: '/admin/categories/insertArticleCategories',
        method: 'post',
        data: articleCategories
    })
}

export function insertArticleCategoriesList(articleCategoriesList) {
    return request({
        url: '/admin/categories/insertArticleCategoriesList',
        method: 'post',
        data: articleCategoriesList
    })
}

export function insertCategories(categories) {
    return request({
        url: '/admin/categories/insertCategories',
        method: 'post',
        data: categories
    })
}

export function updateCategories(categories) {
    return request({
        url: '/admin/categories/updateCategories',
        method: 'post',
        data: categories
    })
}

export function countArticlesByCategoriesName(name) {
    return request({
        url: '/categories/countArticlesByCategoriesName',
        method: 'get',
        params: {
            name
        }
    })
}


export function listArticlesByCategoriesName(pageNum, pageSize, name) {
    return request({
        url: '/categories/listArticlesByCategoriesName',
        method: 'get',
        params: {
            pageNum, pageSize, name
        }
    })
}

