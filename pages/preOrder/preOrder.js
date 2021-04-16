// pages/preOrder/preOrder.js
const API = require('../../utils/request')
const app = getApp()
Page({
  data:{
    parking: null,
    index: 0,
    date: '2021-01-01',
    time: '12:00',
    license: '',
    carsList: null,
    prepay: 0
  },
  getCars(){
    API.getCars({
      userId: app.globalData.pkId
    }).then(res => {
      console.log(res)
      var rep = JSON.parse(res)
      this.setData({
        carsList: rep.data
      })
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      license: this.data.carsList[e.detail.value].license
    })
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  addPrepare(){
    API.addPrepay({
      userId: app.globalData.pkId,
      parkingLotId: this.data.parking.pkId,
      license: this.data.license,
      startTime: this.data.date + " " + this.data.time+":00"
    }).then(res => {
      var rep = JSON.parse(res)
      if(rep.code == 0){
        wx.showToast({
          title: '预约成功！',
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/preOrder/detail/detail?prepareId='+rep.data.id,
          })
        }, 2000);
      }else {
        wx.showToast({
          title: rep.msg,
          icon: 'none'
        })
      }
    })
  },
  onLoad:function(options){
    var park = JSON.parse(options.park)
    var charge = JSON.parse(options.charge)
    console.log(charge)
    console.log(park)
    this.setData({
      parking: park,
      prepay: charge.prepay
    })
    wx.setNavigationBarTitle({
      title: '车位预约',
      success: function(res) {
        // success
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    this.getCars()
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})