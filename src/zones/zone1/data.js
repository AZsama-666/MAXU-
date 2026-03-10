export const zone1FlowLinks = [
  { path: "/zone1/opening", label: "09 常规开屏", type: "入口页" },
  { path: "/zone1/reactivation", label: "10 打捞召回开屏", type: "回流页" },
  { path: "/zone1/recommend", label: "11 首页：命运推荐", type: "主页面" },
  { path: "/zone1/plaza", label: "12 首页：动态广场", type: "主页面" },
  { path: "/zone1/post", label: "13 发布动态页", type: "子页面" },
  { path: "/zone1/detail/post-1", label: "14 动态详情与评论", type: "子页面" }
];

export const zone1CompletionNotes = [
  "同时保留常规开屏和打捞召回开屏两种入口。",
  "首页保留命运推荐和动态广场两条主线，并可双向切换。",
  "动态广场支持发布、进入详情和返回首页主流。",
  "保留 Zone0 衔接入口，方便从入世流程直接进入 Zone1。"
];

export const taskCards = [
  {
    title: "设定今晚去向",
    desc: "先让分身知道今晚该去哪个场景驻扎。",
    type: "必做"
  },
  {
    title: "完善照片形象",
    desc: "补完分身外观，可提升推荐页展示感。",
    type: "奖励 10 碎片"
  },
  {
    title: "追认一个盲盒关系",
    desc: "让一段游离态关系真正进入你的世界。",
    type: "推荐"
  }
];

export const feedSeeds = [
  {
    id: "post-1",
    author: "Zoe",
    scene: "机车部",
    time: "2 分钟前",
    title: "今天在机车部看到了最适合午夜出发的车",
    content: "引擎声一响，整个场域的人都像被一起唤醒了。今晚想再回去一次。",
    stats: { likes: 28, comments: 12, echoes: 3 }
  },
  {
    id: "post-2",
    author: "NOVA",
    scene: "雪山营地",
    time: "16 分钟前",
    title: "篝火边有人把旧公路故事讲成了新地图",
    content: "分身昨晚在雪山聊到了凌晨，留下了一条新的路线坐标。",
    stats: { likes: 17, comments: 8, echoes: 1 }
  }
];

export const feedComments = [
  "太酷了吧，求带我一起去。",
  "这个场景今晚还开放吗？",
  "你们分身昨晚应该已经提前踩点了。"
];
