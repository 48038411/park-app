const request = require("request");

//统一接口封装
const API_BASE_URL = 'https://api.soft1841.cn';
const app = getApp()

const get = (url, data) => { 
  let _url = API_BASE_URL  + url;
  return new Promise((resolve, reject) => {
    // wx.showLoading({
    //   title: "正在加载中...",
    // })
    wx.request({
      url: _url,
      method: "get",
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': app.globalData.token
      },
      success(request) {
        wx.hideLoading();
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      }
    })
  });
}
const postList = (url) => { 
  let _url = API_BASE_URL  + url;
  return new Promise((resolve, reject) => {
    // wx.showLoading({
    //   title: "正在加载中...",
    // })
    wx.request({
      url: _url,
      method: "POST",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': app.globalData.token
      },
      success(request) {
        wx.hideLoading();
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      }
    })
  });
}
const postParams = (url, data) => { 
  let _url = url;
  return new Promise((resolve, reject) => {
    // wx.showLoading({
    //   title: "正在加载中...",
    // })
    wx.request({
      url: _url,
      method: "POST",
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(request) {
        wx.hideLoading();
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      }
    })
  });
}
 const post = (url, data,contentType) => {
  let _url = API_BASE_URL  + url;
  switch(contentType){
    case "form" :
      var headerObj = {'content-type' : 'application/x-www-form-urlencoded'};
    break;
    case "json" : 
      var headerObj = {
        'Authorization': app.globalData.token,
        'content-type' : 'application/json'};
        
        
    break;
    default :
      var headerObj = {'content-type' : 'application/json'};
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url      : _url,
      data     : data,
      method   : "POST",
      dataType : JSON,
      header: headerObj,
      success(request) {  
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      }
    })
  });
}
const postnotoken = (url, data,contentType) => {
 let _url = API_BASE_URL  + url;
 switch(contentType){
   case "form" :
     var headerObj = {'content-type' : 'application/x-www-form-urlencoded'};
   break;
   case "json" : 
     var headerObj = {
       'content-type' : 'application/json'};
       
       
   break;
   default :
     var headerObj = {'content-type' : 'application/json'};
 }
 return new Promise((resolve, reject) => {
   wx.request({
     url      : _url,
     data     : data,
     method   : "POST",
     dataType : JSON,
     header: headerObj,
     success(request) {  
       resolve(request.data)
     },
     fail(error) {
       reject(error)
     }
   })
 });
}
const generatCode = (url, data,contentType) => {
  let _url =  url;
  switch(contentType){
    case "form" :
      var headerObj = {'content-type' : 'application/x-www-form-urlencoded'};
    break;
    case "json" : 
      var headerObj = {
        'content-type' : 'application/json'};
        
        
    break;
    default :
      var headerObj = {'content-type' : 'application/json'};
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url      : _url,
      data     : data,
      method   : "POST",
      dataType : JSON,
      header: headerObj,
      success(request) {  
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      }
    })
  });
 }
const put = (url, data,contentType) => {
  let _url = API_BASE_URL  + url;
  switch(contentType){
    case "form" :
      var headerObj = {'content-type' : 'application/x-www-form-urlencoded'};
    break;
    case "json" : 
      var headerObj = {
        'X-Token': app.globalData.token,
        'content-type' : 'application/json'};
    break;
    default :
      var headerObj = {'content-type' : 'application/json'};
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url      : _url,
      data     : data,
      method   : "PUT",
      dataType : JSON,
      header: headerObj,
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      }
    })
  });
}
module.exports ={
  login:(data) =>{
    console.log("登录")
    return post('/user/login',data,'json') //
  },
  aroundlist:(data) => {
    console.log("查找周围点")
    return postnotoken('/parking/list',data,'json')
  },
  getAppInfo:() => {
    return post('/common/info',null,'json')
  },
  getAccessToken: () => {
    console.log("获取接口凭证")
    return post('/common/getToken',null,'json')
  },
  getWxCode: (data) => {
    console.log("生成二维码")
    return post('/common/getCode',data,'json')
  },
  getCode: (data) => {
    console.log("发送二维码")
    return post('/common/sendMsg',data,'json')
  },
  bindPhone: (data) => {
    console.log("绑定手机号")
    return post('/user/bindPhone',data,'json')
  },
  getInfo: (data) => {
    console.log("查看个人信息")
    return post('/user/getInfo',data,'json')
  },
  getLogs: (data) => {
    console.log("获取预约记录")
    return post('/order/getLogs',data,'json')
  },
  getCharge: () => {
    console.log("查找费率规则")
    return postList('/charge/getFee')
  },
  getCars: (data) => {
    console.log("查找用户车辆")
    return post('/cars/list',data,'json')
  },
  addCar: (data) => {
    console.log("添加车辆")
    return post('/cars/add',data,'json')
  },
  addPrepay: (data) => {
    console.log("添加预订单")
    return post('/order/prepare',data,'json')
  }
}