// index.js
// 获取应用实例
// 引入SDK核心类，js文件根据自己业务，位置可自行放置
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var amapFile = require('../../libs/amap-wx');
var qqmapsdk;
const app = getApp()

Page({
  data: {
    longitude: "",
    latitude: "",
    markers: [],
    gaodeAddress: ""
  },
  //高德地图获取定位
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
  gaodeGetLocation: function () {
    var that = this;

    var myAmapFun = new amapFile.AMapWX({
      key: '4ca3660bbd1986f8acc638ba8bf78e7e'
    });

    myAmapFun.getRegeo({
      success: (res) => {
        console.log("高德地图获取定位:" + JSON.stringify(res), res[0].regeocodeData.formatted_address, res[0].longitude);

        //计算两个经纬度距离

        that.setData({
          longitude: res[0].longitude,
          latitude: res[0].latitude,
          markers: [{
            iconPath: "/images/location.png",
            id: 0,
            latitude: res[0].latitude,
            longitude: res[0].longitude,
            width: 30,
            height: 30
          }],
        })
        var jl = that.distance(32.101352, 118.945995, res[0].latitude, res[0].longitude);

        console.log("打印计算两个点的距离:" + jl);

        this.setData({
          gaodeAddress: res[0].regeocodeData.formatted_address
        })

      }

    })

  },
  onLoad: function (options) {
    var that = this;
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'FSLBZ-WIXKX-UXY4I-TUO64-3MNZT-UKBEX'
    });
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
          that.gaodeGetLocation()
        }
      }
    })
  },
  onShow() {
    this.gaodeGetLocation()

  }
})