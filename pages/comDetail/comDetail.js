// pages/comDetail/comDetail.js
import { getTopicInfo, getReplies } from '../../utils/api';
import { formatTime, transTime } from '../../utils/util';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titile: '话题详情',
    theme:{}, //主题
    id: '', //对应主题的id
    replies:[], //回复
    newRepliesDate:'' //最新回复时间
  },

  //获取对应的主题
  getTheme:function(id){
    var that = this;
    wx.showLoading({
      title: "正在加载中",
      mask: true
    });
    wx.request({
      url: getTopicInfo({id}),
      data: {},
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        // console.log(result);
        result.data.forEach(item => item.created = formatTime(transTime(item.created))) //转换时间
        that.setData({
          theme: result.data[0]
        })
        // 对应主题回复
        that.getThemeReplies(id);
      },
      fail: (result)=>{
        wx.hideLoading();
        console.error(result);
      },
      complete: ()=>{}
    });
  },

  //获取对应主题的回复
  getThemeReplies:function(id){
    var that = this;
    // wx.showLoading({
    //   title: "正在加载中",
    //   mask: true,
    // });
    wx.request({
      url: getReplies({topic_id: id}),
      data: {},
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        wx.hideLoading();
        // console.log(result);
        result.data.forEach(item => item.created = formatTime(transTime(item.created))) //转换时间
        that.setData({
          replies:result.data
        })
        //获取最新的回复时间
        var repliesArray = this.data.replies
        var repliesDate = [];
        for(var i = 0;i < repliesArray.length; i++ ){
          var getrepliesArray = repliesArray[i].last_modified;
          repliesDate.push(getrepliesArray)
        }
        var maxRepliesDate = Math.max.apply(null, repliesDate);
        // console.log(maxRepliesDate);
        var newRepliesDate = formatTime(transTime(maxRepliesDate))
        that.setData({
          newRepliesDate: newRepliesDate
        })
      },
      fail: (result)=>{
        wx.hideLoading();
        console.error(result);
      },
      complete: ()=>{}
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTheme(options.id);
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