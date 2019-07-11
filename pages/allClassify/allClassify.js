// pages/allClassify/allClassify.js
import { getAllNodes } from '../../utils/api';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'节点类别',
    allNodes: [] //全部节点
  },

  //获取全部节点
  getAllNodes:function(){
    var that = this;
    wx.showLoading({
      title: "正在加载中",
      mask: true,
    });
    wx.request({
      url: getAllNodes(),
      data: {},
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        wx.hideLoading();
        // console.log(result.data);
        that.setData({
          allNodes: result.data
        })
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllNodes();
  },

   //点击跳转详情页面
   jumpDetail:function(e){
    // console.log(e);
    let id = e.currentTarget.id;
    let name = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../topicsDetail/topicsDetail?id=' + id + '&name=' + name
    });
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