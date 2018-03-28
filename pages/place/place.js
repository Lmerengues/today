//place.js
//获取应用实例
const util = require('../../utils/util.js')
var config = require("../../config.js")
var app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      '../../images/girl2.jpeg',
      '../../images/girl.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493698928333&di=99be91f1067ce820af8235607706813a&imgtype=0&src=http%3A%2F%2Fimg.tupianzj.com%2Fuploads%2Fallimg%2F160412%2F9-160412091538.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493698928333&di=ae56672831512cc7d4cd1e26d31269aa&imgtype=0&src=http%3A%2F%2Fimg.tupianzj.com%2Fuploads%2Fallimg%2F160412%2F9-160412091540.jpg'
    ],
    indicatorDots: true,

    autoplay: false,
    interval: 5000,
    duration: 1000,
  },
  //事件处理函数
  binddetail: function (e) {
    console.log(e);

    wx.navigateTo({
      url: '../detail/detail?ano=' + e.currentTarget.dataset.ano
    })
  },
  onLoad: function (options) {
    this.setData({pno:20});
    //this.setData(options);

    var that = this;
    wx.request({
      url: config.host + '/kplace_index',
      method: 'GET',
      data:{'pno':that.data.pno},
      header: {
        'Authorization': "JWT ",
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      success: function (res) {
        console.log(res);
        that.setData(res.data);
      }
    })

    

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  to_list:function(e){
    wx.navigateTo({
      url: '../list/list?pno='+this.data.pno,
    })
  },
  to_food: function (e) {
    wx.navigateTo({
      url: '../food/food?pno=' + this.data.pno,
    })
  }
})
