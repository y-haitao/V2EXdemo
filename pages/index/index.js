// pages/index/index.js
import { getLatestTopics } from '../../utils/api';
import { formatTime, transTime } from '../../utils/util';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    latest: [], //最新主题
    title: "最新主题"
  },

  //获取最新主题
  getNewest: function () {
    var that = this;
    wx.showLoading({
      title: "正在加载中",
      mask: true
    });
    wx.request({
      url: getLatestTopics({ page: 1 }),
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        wx.hideLoading();
        // console.log(result);
        result.data.forEach(item => item.created = formatTime(transTime(item.created))) //转换时间
        that.setData({
          latest: result.data
        })
      },
      fail: (result) => {
        wx.hideLoading();
        console.error(result);
      },
      complete: () => { }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNewest(() => (console.log("最新主题")));
  },

  //点击跳转详情页面
  jumpDetail: function (e) {
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: '../comDetail/comDetail?id=' + id
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
    this.getNewest(function () {
      wx.stopPullDownRefresh();
    })
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