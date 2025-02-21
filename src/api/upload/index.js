import request from '../request'

// 上传切片
export const uploadBig = (data) => {
  return request.post('/upload/big', data)
}


// 合并切片
export const mergeBig = (data) => {
  return request.post('/upload/merge', data)
}

// 取消上传
export const cancelUpload = (data) => {
  return request.post('/upload/cancel', data)
}