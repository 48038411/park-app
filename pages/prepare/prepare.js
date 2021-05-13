// pages/detail/detail.js
const API = require('../../utils/request')
Page({
  data:{
    imgUrls: [
      '/images/logo/kk.png'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    parking: null,
    charge: null
  },
  onLoad:function(options){
    console.log(options)
    // 页面初始化 options为页面跳转所带来的参数
    const parking = JSON.parse(options.park)
    this.setData({
      parking: parking
    })
    this.getCharge()
  },
  getCharge() {
    API.getCharge().then(res => {
      console.log(res)
      this.setData({
        charge: res.data
      })
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  openLocation:function(e){
    console.log(e)
    var parking = e.currentTarget.dataset.item
    wx.openLocation({
      latitude: parking.latitude,
      longitude: parking.longitude,
      scale: 28,
      name: parking.name,
      address: parking.address
    })
  },
  preOrder:function(e){
    var parking = e.currentTarget.dataset.item
    var charge = this.data.charge
    wx.requestSubscribeMessage({
      tmplIds: ['GfwlHFU6DfCBTBMmYbuELEvpA1Qnpl2dM3sRMFqPHcc'],
      success (res) {
        wx.navigateTo({
          url: '../preOrder/preOrder?park='+JSON.stringify(parking)+'&charge='+JSON.stringify(charge)
        })
       }
    })
  }
  
})