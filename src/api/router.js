import request from '../request/request'

export function getNav(){
    return request({
        url:'api/nav',
        method:'get'
    })
}