// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    isLogin: false,
    userInfo: null,
    pkId: 0,
    wxId: '',
    code: '',
    token: '',
    //微信小程序接口调用凭证
    accessToken: ''
  }
})