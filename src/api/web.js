import request from '../utils/request'

export function getViews() {
    return request({
        url: '/getViews',
        method: 'get'
    })
}

export function selectAllValues() {
    return request({
        url: '/selectAllValues',
        method: 'get'
    })
}