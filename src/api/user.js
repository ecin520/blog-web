import request from '../utils/request'

export function login(username, password) {
    return request({
        url: '/login',
        method: 'get',
        params: {username, password}
    })
}

export function logout() {
    return request({
        url: '/logout',
        method: 'get'
    })
}

export function getUserById(id) {
    return request({
        url: '/getUserById',
        method: 'get',
        params: {id}
    })
}

export function getUserByUsername(username) {
    return request({
        url: '/getUserByUsername',
        method: 'get',
        params: {username}
    })
}

export function updateUser(user) {
    return request({
        url: '/updateUser',
        method: 'post',
        data: user
    })
}