// pages/lookingCar/lookingCar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['中国', '美国', '巴西', '日本'],
    carsarray: ['山地车', '测试车', '测试车2', '测试车3', '测试车4'],
    carlist: [{ number: '123', type: '测试车1' }, { number: '123', type: '测试车1' },{ number: '123', type: '测试车1' }]
  },
  //选择景区
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  //选择车型
  bindPickerChangeCars: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      ind: e.detail.value
    })
  },
  goCarseek:function(){
    wx.navigateTo({
      url: '/pages/carseek/carseek',
    })
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