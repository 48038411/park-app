
const app = getApp();
 const API = require('../../utils/request')
Page({
 
 
  data: {
    // 验证手机号
    loginPhone: false,
    loginPwd: false,
    loveChange: true,
    hongyzphone: '',
    // 验证码是否正确
    zhengLove: true,
    huoLove: '',
    getText2: '获取验证码',
  },
  lovePhone: function (e) {
    let phone = e.detail.value;
    this.setData({ hongyzphone: phone })
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      this.setData({
        lovePhone: false
      })
      console.log(phone.length)
      if (phone.length >= 11) {
        wx.showToast({
          title: '手机号有误',
          icon: 'none',
          duration: 1000
        })
      }
    } else {
      this.setData({
        lovePhone: true
 
      })
    }
  },
  // 验证码输入
  yanLoveInput: function (e) {
    let that = this;
    let yanLove = e.detail.value;
    // let huoLove = this.data.huoLove;
    that.setData({
      yanLove: yanLove,
      zhengLove: false
    })
 
  },
  // 验证码按钮
  yanLoveBtn: function () {
    let loveChange = this.data.loveChange;
    console.log(loveChange)
    let lovePhone = this.data.lovePhone;
    console.log(lovePhone)
    let phone = this.data.hongyzphone;
    console.log(phone)
    let n = 59;
    let that = this;
    if (!lovePhone) {
      wx.showToast({
        title: '手机号有误',
        icon: 'success',
        duration: 1000
      })
    } else {
      if (loveChange) {
        this.setData({
          loveChange: false
        })
        let lovetime = setInterval(function () {
          let str = '(' + n + ')' + '重新获取'
          that.setData({
            getText2: str
          })
          if (n <= 0) {
            that.setData({
              loveChange: true,
              getText2: '重新获取'
            })
            clearInterval(lovetime);
          }
          n--;
        }, 1000);
 
        API.getCode({
    phone: this.data.hongyzphone
        }).then(res => {
          console.log(res)
          var rep = JSON.parse(res)
          if(rep.code == 0){
            wx.showToast({
              title: '发送成功',
              icon: 'success'
            })
          }else{
            wx.showToast({
              title: rep.msg,
              icon: 'none'
            })
          }
        })
      }
    }
  },
  formSubmit(e){
    let val = e.detail.value 
    console.log('val', val)
    var phone = val.phone 
    var phoneCode = val.phoneCode 
    API.bindPhone({
      phone: phone,
      code: phoneCode,
      pkId: app.globalData.pkId
    }).then(res => {
      wx.showToast({
        title: '绑定成功',
      })
      wx.navigateBack({
        delta: 0,
      })
    })
  },
})