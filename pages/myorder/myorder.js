//index.js
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
  bindplacedetail: function (e) {
    wx.navigateTo({
      url: '../place/place?pno=' + e.currentTarget.dataset.pno,
    })
  },
  bingredfund:function(e){

    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要退款吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          wx.request({
            url: config.host + '/krefund',
            method: 'GET',
            header: {
              'Authorization': "JWT ",
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            data: { oid: e.currentTarget.dataset.oid },
            success: function (res) {
              console.log(res);
              that.setData(res.data);
              app.reload();
            }
          })
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onLoad: function () {
    //app.getUserinfo();
    /*
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }*/
    var that = this;
    wx.request({
      url: config.host + '/korder_list',
      method: 'GET',
      header: {
        'Authorization': "JWT ",
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      data:{openid:wx.getStorageSync('openid')},
      success: function (res) {
        console.log(res);
        that.setData(res.data);
      }
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
