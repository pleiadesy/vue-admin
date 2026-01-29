import request from "@/utils/request";

// 获取首页table表格内容api
export const getTableDataApi = () => {
  return request({
    url: '/api/home/getTableData',
    method: 'get'
  })
}
