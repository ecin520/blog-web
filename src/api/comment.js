import request from '../utils/request'

export function deleteCommentById(id) {
    return request({
        url: '/admin/comment/deleteCommentById',
        method: 'get',
        params: {id}
    })
}

export function getCommentById(id) {
    return request({
        url: '/comment/getCommentById',
        method: 'get',
        params: {id}
    })
}

export function listAllCommentsByArticleId(id) {
    return request({
        url: '/comment/listAllCommentsByArticleId',
        method: 'get',
        params: {id}
    })
}

export function insertComment(comment) {
    return request({
        url: '/comment/insertComment',
        method: 'post',
        data: comment
    })
}


export function insertReply(reply) {
    return request({
        url: '/reply/insertReply',
        method: 'post',
        data: reply
    })
}

export function listAllReplysByCommentId() {
    return request({
        url: '/reply/listAllReplysByCommentId',
        method: 'get'
    })
}
