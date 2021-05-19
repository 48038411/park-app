const API = require('../../../utils/request')
const app = getApp()
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    currtab: 0,
    swipertab: [{ name: '待支付', index: 0 }, { name: '进行中', index: 1 }, { name: '已完成', index: 2 }],
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
    // 页面渲染完成
    this.getDeviceInfo()
    this.orderShow()
  },
 
  getDeviceInfo: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })
      }
    })
  },
 
  /**
  * @Explain：选项卡点击切换
  */
  tabSwitch: function (e) {
    var that = this
    if (this.data.currtab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currtab: e.target.dataset.current
      })
    }
  },
 
  tabChange: function (e) {
    this.setData({ currtab: e.detail.current })
    this.orderShow()
  },
 
  orderShow: function () {
    let that = this
    switch (this.data.currtab) {
      case 0:
        that.alreadyShow()
        break
      case 1:
        that.waitPayShow()
        break
      case 2:
        that.lostShow()
        break
    }
  },
  alreadyShow: function(){
    API.getUnFinish({pkId: app.globalData.pkId}).then(res => {
      console.log(res)
      var rep = JSON.parse(res)
      console.log(rep.code == 0)
      console.log(rep.data)
      if(rep.code == 0){
        this.setData({
          alreadyOrder: rep.data
        })
      }else{
        wx.showToast({
          title: rep.msg,
          icon: 'none'
        })
      }
    })

  },
 
  waitPayShow:function(){
    API.getUnFinish({pkId: app.globalData.pkId}).then(res => {
      console.log(res)
      var rep = JSON.parse(res)
      console.log(rep.code == 0)
      console.log(rep.data)
      if(rep.code == 0){
        this.setData({
          waitPayOrder: rep.data
        })
      }else{
        wx.showToast({
          title: rep.msg,
          icon: 'none'
        })
      }
    })
  },
 
  lostShow: function () {
    this.setData({
      lostOrder: [{ name: "停车场", state: "已完成", time: "2018-10-4 10:00-12:00", status: "未开始", url: "/images/mobile_02.png", money: "122" }],
    })
  },
 
  
})