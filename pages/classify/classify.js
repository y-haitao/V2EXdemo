// pages/classify/classify.js
import { getAllNodes } from '../../utils/api';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "节点",
    nodes: [], //全部节点分类
    newNodeArray:[], //新的合并数组

    programmer:[], //程序员
    computer:[], //电脑
    linux:[], //linux
    js:[], //js
    editors:[], //编辑器
    life:[], //生活
    work:[], //工作
    cn:[], //城市
    v2ex:[] //问与答
  },

  //获取全部节点分类
  getAllClassify:function(){
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
        // that.setData({
        //   nodes: result.data
        // })
        //节点按照 parent_node_name 为主分类
        var oldData = result.data;
        // 把源数据先变成目标数据的规则
        var oldDataRule = []
        oldData.forEach(el => {
          var oldObj = {
            parent_node_name: el.parent_node_name,
            childNode:[]
          }
          var childObj = {
            // avatar_large:el.avatar_large,
            // avatar_mini:el.avatar_mini,
            avatar_normal:el.avatar_normal,
            // footer:el.footer,
            // header:el.header,
            id: el.id,
            // name:el.name,
            // root:el.root,
            // stars:el.stars,
            title: el.title,
            // title_alternative:el.title_alternative,
            topics: el.topics,
            // url:el.url
          }
          oldObj.childNode.push(childObj)
          oldDataRule.push(oldObj)
        })
        //先去重，后合并
        var newData = [];
        var newObj = {};
        oldDataRule.forEach((el, i) => {
          if(!newObj[el.parent_node_name]){
            newData.push(el);
            newObj[el.parent_node_name] = true;
          }else{
            newData.forEach(el => {
              if(el.parent_node_name === oldDataRule[i].parent_node_name){
                el.childNode = el.childNode.concat(oldDataRule[i].childNode);
              }
            })
          }
        })
        // console.log(newData);
        //获取数组一部分分类节点（因为太多了，所以只取一部分）
        //程序员
        var programmer = newData.find(function(item){
          return item.parent_node_name === "programmer"
        })
        //电脑
        var computer = newData.find(function(item){
          return item.parent_node_name === "computer"
        })
        //linux
        var linux = newData.find(function(item){
          return item.parent_node_name === "linux"
        })
        //js
        var js = newData.find(function(item){
          return item.parent_node_name === "js"
        })
        //编辑器 editors
        var editors = newData.find(function(item){
          return item.parent_node_name === "editors"
        })
        //生活
        var life = newData.find(function(item){
          return item.parent_node_name === "life"
        })
        //工作 work
        var work = newData.find(function(item){
          return item.parent_node_name === "work"
        })
        //城市
        var cn = newData.find(function(item){
          return item.parent_node_name === "cn"
        })
        //问与答
        var v2ex = newData.find(function(item){
          return item.parent_node_name === "v2ex"
        })

        //然后将这几个数组合并成一个新的数值 newNodeArray
        //concat() 连接两个或更多的数组，并返回结果
        var newNodeArray = [];
        newNodeArray = newNodeArray.concat(programmer).concat(computer).concat(linux).concat(js).concat(editors).concat(life).concat(work).concat(cn).concat(v2ex)

        that.setData({
          nodes: newData, //全部节点
          newNodeArray:newNodeArray, //新的合并数组
          programmer:programmer.childNode, //程序员
          computer:computer.childNode, //电脑
          linux:linux.childNode, //linux
          js:js.childNode, //js
          editors:editors.childNode, //编辑器
          life:life.childNode,  //生活
          work:work.childNode, //工作
          cn:cn.childNode, //城市
          v2ex:v2ex.childNode //问与答
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
    this.getAllClassify();
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

  //跳转全部节点分类页面
  jumpAllClassify:function(){
    wx.navigateTo({
      url: '../allClassify/allClassify'
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