// V2EX 代理接口
const baseUrl = "https://www.v2ex.com/api/";

// 所有节点
const all_nodes = "nodes/all.json";
// 通过节点 id , name 获取信息
const node_info = "nodes/show.json";

// 主题
const topics = "topics/show.json";
// 获取最新主题
const latest_topics = "topics/latest.json";
// 获取最热主题
const hotest_topics = "topics/hot.json";

// 获取回复
const replies = "replies/show.json";
// 获取用户信息
const user_info = "members/show.json";

const _encodeURL = (obj) => (
  Object.keys(obj).map(item => (
    encodeURIComponent(item) + '=' + encodeURIComponent(obj[item])
  ))
)

const getAllNodes = () => (baseUrl + all_nodes); //所有节点
const getNodeInfo = (obj) => (baseUrl + node_info + '?' + _encodeURL(obj));
const getTopicInfo = (obj) => (baseUrl + topics + '?' + _encodeURL(obj));
const getLatestTopics = (obj) => (baseUrl + latest_topics + '?' + _encodeURL(obj));
const getHotesInfo = (obj) => (baseUrl + hotest_topics + '?' + _encodeURL(obj));
const getReplies = (obj) => (baseUrl + replies + '?' + _encodeURL(obj));

module.exports = {
  getAllNodes,
  getNodeInfo,
  getTopicInfo,
  getLatestTopics,
  getHotesInfo,
  getReplies
}