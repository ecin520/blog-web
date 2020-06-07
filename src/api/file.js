import request from '../utils/request'

export function fileUpload(file) {
    return request({
        url: '/file/fileUpload',
        method: 'post',
        data: file
    })
}

export function imageUpload(file) {
    return request({
        url: '/file/imageUpload',
        method: 'post',
        data: file
    })
}