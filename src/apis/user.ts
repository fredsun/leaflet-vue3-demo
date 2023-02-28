// 导入axios实例
import request from '@/request/index'
// import request from '../request/index'

// 定义接口的传参
interface UserInfoParam {
    userID: string,
    userName: string
}

// 获取用户信息
export function apiGetUserInfo(param: UserInfoParam) {
    return request({
        url: 'http://www.baidu.com',
        method: 'post',
        data: param,
    })
}
