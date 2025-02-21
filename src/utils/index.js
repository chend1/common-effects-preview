/**
 * 限制接口同步请求数量，防止接口请求过多，出现阻塞
 *
 * @param {Number} maxNum 最大请求数量
 * @param {Number} failNumLimit 每次请求失败次数上限
 * @return
 *
 */
export class LimitRequest {
  constructor(maxNum, failNumLimit) {
    // 所有请求，用于定位请求顺序
    this.allRequest = []
    // 请求队列
    this.requestQueue = []
    // 最大请求数
    this.maxNum = maxNum || 30
    // 当前正在执行的请求数量
    this.currentNum = 0
    // 失败次数上限
    this.failNumLimit = failNumLimit || 3
    // 失败队列
    this.failQueue = []
    // 请求结果
    this.result = []
    // 结束回调
    this.endCallback = () => {}
  }
  // 添加请求
  addRequest(request) {
    this.requestQueue.push({
      index: this.allRequest.length,
      request,
    })
    this.allRequest.push(request)
    this.executeRequest()
  }

  // 执行请求
  executeRequest() {
    while (this.currentNum < this.maxNum && this.requestQueue.length > 0) {
      const { index, request } = this.requestQueue.shift()
      this.currentNum++
      request
        .then((res) => {
          this.result[index] = res
          this.currentNum--
          this.executeRequest()
          this.checkRequestEnd()
        })
        .catch(async () => {
          let failNum = 1
          let reqType = true
          while (reqType && failNum <= this.failNumLimit) {
            failNum++
            try {
              const res = await request()
              this.result[index] = res
              reqType = false
              this.currentNum--
              this.executeRequest()
              this.checkRequestEnd()
            } catch (e) {
              reqType = true
            }
          }
          if (failNum > this.failNumLimit) {
            this.failQueue.push({
              index,
              request,
            })
            this.currentNum--
            this.executeRequest()
            this.checkRequestEnd()
          }
        })
    }
  }

  // 检查请求是否结束
  checkRequestEnd() {
    if (this.requestQueue.length === 0 && this.currentNum === 0) {
      this.endCallback(this.result)
    }
  }

  // 结束请求
  onFinish(callback) {
    this.endCallback = callback
  }
}
