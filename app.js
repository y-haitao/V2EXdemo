//app.js
App({
  onLaunch: function () {

  },
  globalData: {
    userInfo: null, //用户信息
    tabBar: {
      "color": "#000",
      "selectedColor": "#3498DB",
      "backgroundColor": "#fff",
      "list": [
        {
          "pagePath": "/pages/index/index",
          "text": "最新",
          "iconPath": "/images/latest.png",
          "selectedIconPath": "/images/latest_on.png"
        },
        {
          "pagePath": "/pages/hotest/hotest",
          "text": "热门",
          "iconPath": "/images/hotest.png",
          "selectedIconPath": "/images/hotest_on.png"
        },
        {
          "pagePath": "/pages/classify/classify",
          "text": "节点",
          "iconPath": "/images/classify.png",
          "selectedIconPath": "/images/classify_on.png"
        }
      ]
    }
  }
})