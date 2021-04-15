// pages/personal/record/record.js
const app = getApp()
const API = require("../../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    record: null
  },

  getLogs() {
    API.getLogs({
      pkId: app.globalData.pkId
    }).then(res => {
      var rep = JSON.parse(res)
      // 对状态重新赋值
      rep.data.forEach(l => {
        if(l.status == 0){
          l.status = '未完成'
        }if(l.status == 1){
          l.status = '已完成'
        }if(l.status == 2){
          l.status = '未完成'
        }
      })
      console.log(rep)
      this.setData({
        record: rep.data
      })
    })
  },
  gotoOrder(e) {
    console.log(e)
    var prepay = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/preOrder/detail/detail?prepareId='+prepay.pkId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

    this.getLogs()
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