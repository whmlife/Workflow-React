import { request, bus } from 'famc'

const { listen } = bus

const api = request.createRequest({
  hostProxy: {
    fm: 'http://df-gateway.v220.svc.cluster.local/fm-route',
  },
  
})
// 如果还需要额外的拦截器，则自行添加
api.interceptors.request.use((config) => {
  // 拦截处理
  bus.api.checkSessionTimeout(config)
  return config
}, Promise.reject)

export default api
