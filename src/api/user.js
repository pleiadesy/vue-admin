import request from "@/utils/request";

// 获取用户数据
export const getUserDataApi = (paramsData) => {
  return request({
    url: '/api/user/getUserData',
    method: 'get',
    params: paramsData
  })
}

// 删除用户
export const deleteUserApi = (id) => {
  return request({
    url: '/api/user/delete',
    method: 'get',
    params: {
      id
    }
  })
}

// 新增用户
export const addUserApi = (userData) => {
  return request({
    url: '/api/user/addUser',
    method: 'post',
    data: userData
  })
}

// 编辑用户
export const updateUserApi = (userData) => {
  return request({
    url: '/api/user/updateUser',
    method: 'post',
    data: userData
  })
}
