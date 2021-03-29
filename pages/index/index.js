// index.js
// 获取应用实例
// 引入SDK核心类，js文件根据自己业务，位置可自行放置
var amapFile = require('../../libs/amap-wx');
var QQMapWX = require('../../libs/qqmap-wx-jssdk');
const app = getApp()
var qqmapsdk = new QQMapWX({
  key: 'FSLBZ-WIXKX-UXY4I-TUO64-3MNZT-UKBEX' //申请的开发者秘钥key
});
Page({
  data: {
    longitude: "",
    latitude: "",
    markers: [],
    subkey: "FSLBZ-WIXKX-UXY4I-TUO64-3MNZT-UKBEX",
    gaodeAddress: ""
  },
  //跳转到选点页面(引用的插件)
  test() {
    const key = 'FSLBZ-WIXKX-UXY4I-TUO64-3MNZT-UKBEX'; //使用在腾讯位置服务申请的key
    const referer = '我的地图'; //调用插件的app的名称
    const location = JSON.stringify({
      latitude: this.data.latitude,
      longitude: this.data.longitude
    });
    const category = '生活服务,娱乐休闲';

    wx.navigateTo({
      url: `plugin://chooseLocation/index?key=${key}&referer=${referer}&location=${location}&category=${category}`
    });
  },
  //通过两点经纬度计算距离（KM）  
  distance: function (la1, lo1, la2, lo2) {
    var La1 = la1 * Math.PI / 180.0;
    var La2 = la2 * Math.PI / 180.0;
    var La3 = La1 - La2;
    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
    s = s * 6378.137; //地球半径
    s = Math.round(s * 10000) / 10000;
    console.log("计算结果", s);
    return s;
  },
  onLoad: function (options) {
    var that = this;
    //获取用户当前的授权状态
    wx.getSetting({
      success(res) {
        //若用户没有授权地理位置
        if (!res.authSetting['scope.userLocation']) {
          //在调用需授权 API 之前，提前向用户发起授权请求
          wx.authorize({
            scope: 'scope.userLocation',
            //用户同意授权
            success() {

              // 用户已经同意小程序使用地理位置，后续调用 wx.getLocation 接口不会弹窗询问
            },
            //用户不同意授权
            fail() {
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
        } else {
          that.getLocation()
        }
      }
    })
  },
  getLocation() {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        // 调用sdk接口
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) {
            that.setData({
              longitude: res.result.location.lng,
              latitude: res.result.location.lat,
              //先不设置标记点，只显示自己位置，搜索了在设置markers
              // markers: [{
              //   iconPath: "/images/location.png",
              //   id: 0,
              //   latitude: res.result.location.lat,
              //   longitude: res.result.location.lng,
              //   width: 30,
              //   height: 30
              // }],
            })
            console.log(res.result.location) //获取成功
          }
        })
      }
    })
  },
  onShow() {
    this.getLocation()
  }
})