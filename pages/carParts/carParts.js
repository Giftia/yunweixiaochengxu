// pages/carParts/carParts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:12,
    array: ['中国', '美国', '巴西', '日本'],
    carsarray: ['山地车', '测试车', '测试车2', '测试车3', '测试车4'],
    index: 0,
    ind: 0,
    carrsList: [{
      id: 1,
      name: '把套',
      num: 0,
      isdisabled:true
    },
      {
        id: 2,
        name: '刹把',
        num: 0,
        isdisabled: true
      },
      {
        id: 3,
        name: '后拔链器',
        num: 0,
        isdisabled: true
      },
      {
        id: 4,
        name: '右变速手柄',
        num: 0,
        isdisabled: true
      },
      {
        id: 5,
        name: '变速线管',
        num: 0,
        isdisabled: true
      },
      {
        id: 6,
        name: '鞍管快拆螺丝',
        num: 0,
        isdisabled: true
      },
      {
        id: 7,
        name: '停车架',
        num: 0,
        isdisabled: true
      },
      {
        id: 8,
        name: '链条',
        num: 0,
        isdisabled: true
      },
      {
        id: 9,
        name: '脚踏',
        num: 0,
        isdisabled: true
      },
      {
        id: 10,
        name: '前刹车器',
        num: 0,
        isdisabled: true
      },
      {
        id: 11,
        name: '后刹车器',
        num: 0,
        isdisabled: true
      },
      {
        id: 12,
        name: '鞍座',
        num: 0,
        isdisabled: true
      },
      ],
  },
  //添加
  addList: function () {
    var that= this
    var lists = that.data.carrsList;

    lists.push({
      id: that.data.num+1,
      name: '',
      num: 0,
    });
    this.setData({
      carrsList: lists,
      num: that.data.num+1,
    })

  },
  bindkeyinput:function(e){
    console.log("???????????", e.currentTarget.dataset.userid)
    var that=this
    that.data.carrsList.forEach(function (v, i) {
      if (v.id == e.currentTarget.dataset.userid) {
         v.name = e.detail.value;
        that.setData({
          carrsList: that.data.carrsList
        })
      }
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
  bindPickerChangeCars:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      ind: e.detail.value
    })
  },
  //数量++
  tapAddCart:function(e){
    let that= this
    console.log(e)
    that.data.carrsList.forEach(function(v,i){
      if (v.id == e.target.dataset.id){
      let num = v.num++;    
        that.setData({
          carrsList: that.data.carrsList
        })
      }
    })  
  },
    //数量--
  tapDelCart:function(e){
    let that = this
    console.log(e)
    that.data.carrsList.forEach(function (v, i) {
      if (v.id == e.target.dataset.id) {
        if(v.num >0){
          let num = v.num--;
          that.setData({
            carrsList: that.data.carrsList
          })
        }
      }
    }) 
  },
    //提交申请
  formSubmit(e){
    let newarr = new Array()
    console.log("123456", this.data.carrsList)
    let carrsList = this.data.carrsList
    for (var i = 0; i < carrsList.length;i++){
      if (carrsList[i].num>0){
        newarr.push(carrsList[i]);
      }
    }
    this.setData({
      newarr: newarr
    })
    wx.navigateTo({
      url: '/pages/order/order?newarr=' + JSON.stringify(this.data.newarr),
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    console.log("bbbbb", newarr)
    
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