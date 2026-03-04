import request from "@/utils/request";

// 登录
export const loginApi = (loginForm) => {
  return request({
    url: '/permission/login',
    method: 'post',
    data: loginForm
  })
}
