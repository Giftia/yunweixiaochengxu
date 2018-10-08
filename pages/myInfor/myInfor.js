// pages/myInfor/myInfor.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  wx.showLoading({
    title: '加载中...',
  })
  wx.request({
    url: app.globalData.url + '/repair/msgType.action',
    data:{
      openId: wx.getStorageSync('openid')
    },
    success:(res)=>{
      if(res.statusCode !== 200){
        wx.showModal({
          title: '提示',
          content: '服务器状态码' + res.statusCode + ',请联系客服处理',
          showCancel:false
        })
        return
      }
      if (res.data.code == 1) {
        wx.hideLoading()
        this.setData({
          orderMsgCount: res.data.orderMsgCount,	//订单发货消息
          siteMsgCount: res.data.siteMsgCount,	//站点审核通知
          servingMsgCount: res.data.servingMsgCount,	//车辆出入审核
          msgCount: res.data.msgCount,	//消息
        })
      } else {
        wx.showModal({
          title: '',
          content: res.data.msg,
          showCancel: false
        })
      }
    }
  })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})