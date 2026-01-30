import request from "@/utils/request";

// 获取首页table表格内容api
export const getTableDataApi = () => {
  return request({
    url: '/api/home/getTableData',
    method: 'get'
  })
}

// 获取首页数量卡片数据api
export const getCountDataApi = () => {
  return request({
    url: '/api/home/getCountData',
    method: 'get'
  })
}

// 获取Echarts图表数据api
export const getEchartsDataApi = () => {
  return request({
    url: '/api/home/getEchartsData',
    method: 'get'
  })
}
