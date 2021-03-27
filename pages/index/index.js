// index.js
// 获取应用实例
// 引入SDK核心类，js文件根据自己业务，位置可自行放置
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
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
      type: 'gcj02',
      success (res) {
        console.log(res.longitude)
        console.log(res.latitude)
        that.setData({
          latitude:res.latitude,
          longitude:res.longitude,
          markers: [{
            iconPath: "/images/location.png",
            id: 0,
            latitude: res.latitude,
            longitude: res.longitude,
            width:30,
            height:30
          }],
        });
      }
     })
  },
  onLoad: function (options) {
    var that=this;
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
            success () {
              // 用户已经同意小程序使用地理位置，后续调用 wx.getLocation 接口不会弹窗询问
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
  onShow(){
    var that = this;
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        console.log(res)
        that.setData({
          latitude:res.latitude,
          longitude:res.longitude,
          markers: [{
            iconPath: "/images/location.png",
            id: 0,
            latitude: res.latitude,
            longitude: res.longitude,
            width:30,
            height:30
          }],
        });
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: that.data.latitude,
            longitude: that.data.longitude
          },
          success: function (res) {
            console.log(res.result.address)
            console.log(res.result.address_component.city)
            console.log(res.result.address_component.district)
            console.log(res.result.address_component.nation)
            console.log(res.result.address_component.province)
            console.log(res.result.address_component.street)
            console.log(res.result.address_component.street_number)
            console.log(res.result.formatted_addresses.recommend)



            console.log("获取地址成功：" + res.result.ad_info.city);
          },
          fail: function (res) {
            console.log("逆向解析地理位置服务异常,获取地址失败" + res);
          },
          complete: function (res) {
            console.log(res);
          }
        });
      }, 
      fail:function(e){
        console.log("由于未授权地理位置服务,获取地址失败" + e);
        // that.setData({ isFixed: 'fixed', allowLayer:false});
      }
    　})
  }
})
