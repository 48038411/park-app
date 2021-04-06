// pages/login/login.js
const app = getApp()
const API = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHide: !app.globalData.isLogin
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.isLogin)
    const isLogin  = app.globalData.isLogin
    var that = this;
    if(isLogin){
      wx.navigateTo({
        url: '/pages/mine/mine',
      })
    }
    //查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("用户授权了");
        } else {
          //用户没有授权
          console.log("用户没有授权");
        }
      }
    });

  },

  sureLogin: function (res) {
    if (res.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      let code
      wx.login({
        success: function (res) {
          code = res.code
          wx.getUserInfo({
            withCredentials: true,
            lang: 'zh_CN',
            success: function (res) {
              let iv = res.iv
              let encryptedData = res.encryptedData
              let data = {
                code: code,
                encryptedData: encryptedData,
                iv: iv,
              }
              API.login(data).then(res => {
                var rep = JSON.parse(res)
                if (rep.code == 0) {
                  app.globalData.pkId = rep.data.userId
                  app.globalData.wxId = rep.data.openId
                  app.globalData.token = rep.data.userToken
                  wx.setStorageSync('userId', rep.data.userId)
                  wx.setStorageSync('userToken', rep.data.userToken)
                  wx.setStorageSync('openId', rep.data.openId)
                  //设置登录标识为true，就是已登录
                  app.globalData.isLogin = true
                  that.setData({
                    isHide: !app.globalData.isLogin
                  })
                  if(rep.data.isBind == 0){
                    wx.showToast({
                      title: '请先绑定手机号！',
                      icon: 'none',
                      duration: 2000
                    })
                    wx.navigateTo({
                      url: '/pages/bindPhone/bindPhone',
                    })
                  }
                }
              })
           
            },
            fail: function (res) {
              wx.navigateBack({
                delta: 1,
              })
            },
            complete: function (res) {},
          })  
        }
    })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },

/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function () {

},

/**
 * 生命周期函数--监听页面显示
 */
onShow: function () {

},

/**
 * 生命周期函数--监听页面隐藏
 */
onHide: function () {

},

/**
 * 生命周期函数--监听页面卸载
 */
onUnload: function () {

},

/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function () {

},

/**
 * 页面上拉触底事件的处理函数
 */
onReachBottom: function () {

},

/**
 * 用户点击右上角分享
 */
onShareAppMessage: function () {

}
})