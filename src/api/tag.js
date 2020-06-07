import request from '../utils/request'

export function deleteTagById(id) {
    return request({
        url: '/admin/tag/deleteTagById',
        method: 'get',
        params: {id}
    })
}

export function getTagById(id) {
    return request({
        url: '/tag/getTagById',
        method: 'get',
        params: {id}
    })
}

export function getTagByName(name) {
    return request({
        url: '/tag/getTagByName',
        method: 'get',
        params: {name}
    })
}

export function listAllTagsByArticleId(id) {
    return request({
        url: '/tag/listAllTagsByArticleId',
        method: 'get',
        params: {id}
    })
}

export function listAllTags() {
    return request({
        url: '/tag/listAllTags',
        method: 'get'
    })
}

export function insertArticleTag(articleTag) {
    return request({
        url: '/admin/tag/insertArticleTag',
        method: 'post',
        data: articleTag
    })
}

export function insertArticleTagList(articleTagList) {
    return request({
        url: '/admin/tag/insertArticleTagList',
        method: 'post',
        data: articleTagList
    })
}

export function insertTag(tag) {
    return request({
        url: '/admin/tag/insertTag',
        method: 'post',
        data: tag
    })
}

export function updateTag(tag) {
    return request({
        url: '/admin/tag/updateTag',
        method: 'post',
        data: tag
    })
}

export function countArticlesByTagName(name) {
    return request({
        url: '/tag/countArticlesByTagName',
        method: 'get',
        params: {
            name
        }
    })
}

export function listArticlesByTagName(pageNum, pageSize, name) {
    return request({
        url: '/tag/listArticlesByTagName',
        method: 'get',
        params: {
            pageNum, pageSize, name
        }
    })
}



