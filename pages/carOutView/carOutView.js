// pages/carOutView/carOutView.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [
      { "code": "01", "text": "text1", "type": "type1", "caozuo": "type1" },
      { "code": "02", "text": "text2", "type": "type2", "caozuo": "type1" },
      { "code": "02", "text": "text2", "type": "type2", "caozuo": "type1" },
      { "code": "02", "text": "text2", "type": "type2", "caozuo": "type1" },
      { "code": "03", "text": "text3", "type": "type3", "caozuo": "type1" }
    ],
    array: ['中国', '美国', '巴西', '日本'],
    carsarray: ['山地车', '测试车', '测试车2', '测试车3', '测试车4'],
    index: 0,
    ind: 0,
    narber:['车辆进入景区','车辆离开景区'],
    narberindex:0,
  },
  narberfun:function(e){
    this.setData({
      narberindex: e.currentTarget.dataset.index
    })
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
  goDel:function(e){
    let delIndex = e.currentTarget.dataset.index;
    let newlist = this.data.listData;
    newlist.splice(delIndex,1)
    this.setData({
      listData: newlist
    })
    console.log("123", delIndex)
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