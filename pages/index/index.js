// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    longitude:"",
    latitude:"",
    markers:[]
  },
  // 获取用户信息
  getMyLocation:function(){
    var that=this;
    wx.getLocation({
      //返回gps坐标，gcj02可返回用于openLocation函数的坐标，我这里不去，只展示
      type: 'wgs84',
      success (res) {
        that.setData({
          latitude:res.latitude,
          longitude:res.longitude,
          markers: [{
            iconPath: "/images/location.png",
            id: 0,
            latitude: res.latitude,
            longitude: res.longitude
          }],
        });
      }
     })
  },
  onLoad: function (options) {
    var that=this;
    //获取用户当前的授权状态
    wx.getSetting({
      success(res) {
        //若用户没有授权地理位置
        if (!res.authSetting['scope.userLocation']) {
          //在调用需授权 API 之前，提前向用户发起授权请求
          wx.authorize({
            scope: 'scope.userLocation',
            //用户同意授权
            success () {
              // 用户已经同意小程序使用地理位置，后续调用 wx.getLocation 接口不会弹窗询问
              that.getMyLocation();
            },
            //用户不同意授权
            fail(){
                wx.showModal({
                  title: '提示',
                  content: '此功能需获取位置信息，请授权',
                  success: function (res) {
                    if (res.confirm == false) {
                      return false;
                    }
                    wx.openSetting({
                      success(res) {
                        //如果再次拒绝则返回页面并提示
                        if (!res.authSetting['scope.userLocation']) {
                          wx.showToast({
                            title: '此功能需获取位置信息，请重新设置',
                            duration: 3000,
                            icon: 'none'
                          })
                        } else {
                          //允许授权，调用地图
                          that.onLoad()
                        }
                      }
                    })
                  }
                }) 
            }
          })
        }
        else{
          that.getMyLocation();
        }
      }
    })
  },
})
