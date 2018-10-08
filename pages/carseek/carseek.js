// pages/carseek/carseek.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: '',
    longitude: '',
    markers:[],
  },
  markertap:function(){
    wx.showModal({
      title: '',
      content: '确定要导航到该站点？',
      confirmText: '导航',
      confconfirmColor: "#50cc99",
      success: function (res) {
        if (res.confirm) {
          wx.openLocation({
            latitude: 30.25727,
            longitude: 120.20523,
            scale: 13
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        latitude: options.latitude,
        longitude:options.longitude,
      markers: [{
        id: 1,
        latitude: options.latitude,
        longitude: options.longitude,
        iconPath: "../image/carweizhi-icon.png",
        width: 50,
        height: 50
      }]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('map')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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