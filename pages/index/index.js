//index.js
//获取应用实例
const app = getApp()
Page({
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.url + '/repair/mainPage.action',
      data: {
        openId: wx.getStorageSync('openid')
      },
      success:(res)=>{
        if (res.statusCode != 200) {
          wx.showModal({
            title: '提示 ',
            content: '服务器状态码' + res.statusCode + ',请联系客服处理',
            showCancel: false
          })
          return
        }
        if(res.data.code == 1){
          wx.hideLoading()
          this.setData({
            msgCount: res.data.msgCount,//未读消息数
            reCount: res.data.reCount,	//未处理的维护车辆数目
            findCount: res.data.findCount,	//找车任务
            fbCount: res.data.fbCount,	//故障上报数
          })
        }else{
          wx.showModal({
            title: '',
            content: res.data.msg,
            showCancel:false
          })
        }

      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

})