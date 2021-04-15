// pages/car/addCar/addCar.js
const API = require('../../../utils/request')
const app = getApp()
Page({
  data:{
     carNum: ''
  },
  carnum(e){
    console.log(e)
    this.setData({
      carNum: e.detail.value
    })
  },
  onLoad:function(options){
  },
  
  bindSuccess: function(e) {
    console.log(this.data.carNum)
    let reg = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/
    const careg = reg.test(this.data.carNum);
    if (!careg) {
      wx.showToast({
        icon: 'none',
        title: '请输入正确车牌号',
      })
      return;
    }
    API.addCar({
      userId: app.globalData.pkId,
      license: this.data.carNum
    }).then(res => {
      var rep = JSON.parse(res)
      console.log(rep)
      if(rep.code == 0){
        wx.showToast({
          title: '绑定成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
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
  
})