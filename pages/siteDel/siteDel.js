// pages/siteDel/siteDel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['中国', '美国', '巴西', '日本'],
    arraysite: ['123', '456', '1333'],
    listData: [
      { "code": "01", "text": "text1", "type": "type1", },
      { "code": "02", "text": "text2", "type": "type2", },
      { "code": "02", "text": "text2", "type": "type2", },
      { "code": "02", "text": "text2", "type": "type2",},
      { "code": "03", "text": "text3", "type": "type3", }
    ],
  },
  //选择景区
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  //选择站点
  bindPickerChangesite: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      ind: e.detail.value
    })
  },
  goDel: function (e) {
    let delIndex = e.currentTarget.dataset.index;
    let newlist = this.data.listData;
    newlist.splice(delIndex, 1)
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