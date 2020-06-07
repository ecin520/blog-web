import request from '../utils/request'

export function deleteArticleById(id) {
    return request({
        url: '/admin/article/deleteArticleById',
        method: 'get',
        params: {id}
    })
}

export function insertArticle(articleDTO) {
    return request({
        url: '/admin/article/insertArticle',
        method: 'post',
        data: articleDTO
    })
}

export function updateArticle(articleDTO) {
    return request({
        url: '/admin/article/updateArticle',
        method: 'post',
        data: articleDTO
    })
}

export function getArticleById(id) {
    return request({
        url: '/article/getArticleById',
        method: 'get',
        params: {id}
    })
}

export function countArticles() {
    return request({
        url: '/article/countArticles',
        method: 'get'
    })
}

export function listArticles(pageNum, pageSize) {
    return request({
        url: '/article/listArticles',
        method: 'get',
        params: {
            pageNum,
            pageSize
        }
    })
}

export function listRecommendArticles() {
    return request({
        url: '/article/listRecommendArticles',
        method: 'get'
    })
}

export function listArticleYears() {
    return request({
        url: '/article/listArticleYears',
        method: 'get'
    })
}

export function listArticleDtosByYear(pageNum, pageSize, year) {
    return request({
        url: '/article/listArticleDtosByYear',
        method: 'get',
        params: {
            pageNum,
            pageSize,
            year
        }
    })
}

export function countYearArticles(year) {
    return request({
        url: '/article/countYearArticles',
        method: 'get',
        params: {
            year
        }
    })
}