// pages/gowhere/gowhere.js
const API = require('../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parkinglot: null,
    longitude: '',
    latitude: '',
    subkey: "FSLBZ-WIXKX-UXY4I-TUO64-3MNZT-UKBEX",
  },
			//计算距离的方法（入参为两点的经纬度)
			distance(la1,lo1,la2,lo2){
				var La1 = (la1 * Math.PI) / 180.0;
				var La2 = (la2 * Math.PI) / 180.0;
				var La3 = La1 - La2;
				var Lb3 = (lo1 * Math.PI) / 180.0 - (lo2 * Math.PI) / 180.0;
				var s = 2 * Math.asin(
				Math.sqrt(
				Math.pow(Math.sin(La3 / 2),2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2),2)
				)
				);
				//地球半径
				s = s * 6378.137
				s = Math.round(s * 10000) / 10000;
				//保留一位小数
				s = s.toFixed(1);
				return s;
      },
      gothere(e){
        var parking = e.currentTarget.dataset.item
        wx.openLocation({
          latitude: parking.latitude,
          longitude: parking.longitude,
        })
      },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      longitude: options.longitude,
      latitude: options.latitude
    })
    API.aroundlist({
      longitude: options.longitude,
      latitude: options.latitude
    }).then(res => {
      console.log(res)
      var rep = JSON.parse(res)
      if(rep.code == 0){
        var list = rep.data.sort(function (a, b) {
          return (a.distance - b.distance);
      });
        this.setData({
          parkinglot: list
        })
      }
    })
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