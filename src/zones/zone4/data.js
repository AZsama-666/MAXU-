export const zone4FlowLinks = [
  { path: "/zone4/hub", label: "18 我的主页", type: "主页面" },
  { path: "/zone4/ai-hub", label: "19 AI分身调教", type: "AI入口" },
  { path: "/zone4/reports", label: "20 每日战报", type: "收纳" },
  { path: "/zone4/align", label: "21 与分身对齐", type: "调教" },
  { path: "/zone4/signoff", label: "22 离线挂机指令", type: "主页面" }
];

export const userProfile = {
  name: "Zero",
  bio: "暂无简介",
  following: 2,
  followers: 1,
  posts: 0,
  handle: "JefferyW"
};

export const zone4CompletionNotes = [
  "Tab 改成“我的”，降低理解成本，不再叫双生控制舱。",
  "每日战报收纳在“我的”内，首页只做极简战报条提醒。",
  "“我的”提供与分身对齐/调教入口：对话、选择类测试。"
];

export const reportHistory = [
  { id: "r1", date: "今天", summary: "2人 · 5条 · 3处", period: "过去这段离线期间" },
  { id: "r2", date: "昨天", summary: "1人 · 3条 · 2处", period: "昨日离线期间" },
  { id: "r3", date: "3月8日", summary: "0人 · 2条 · 4处", period: "当日离线期间" }
];

export const alignTools = [
  { id: "chat", title: "通过对话对齐", desc: "和分身聊天，校准 ta 的回应方式与边界。", status: "MVP 占位" },
  { id: "test", title: "选择类测试", desc: "用选择题让分身更贴近你的偏好与价值观。", status: "MVP 占位" },
  { id: "voice", title: "补录声纹", desc: "补录或更新声纹，用于语音分身。", status: "可进入" },
  { id: "avatar", title: "上传真人照片生成数字人形象", desc: "上传真人照片，生成并设置为你的 AI 分身数字人形象。", status: "可进入" }
];

export const mineSnapshot = {
  twinName: "Zero",
  currentScene: "机车部夜场",
  currentStatus: "你刚接住今晚的主线，现在准备把人生交还给分身。",
  note: "MVP 先把“下线怎么交还”做好，不把我的页做成复杂控制台。"
};

export const signoffOptions = [
  {
    id: "meet-people",
    title: "去见人",
    desc: "让 Zero 优先沿着今晚已经打开的陌生关系继续活动。"
  },
  {
    id: "go-plaza",
    title: "去广场",
    desc: "让 Zero 先回到广场，看看这个世界今晚还在发生什么。"
  },
  {
    id: "free-play",
    title: "自己玩",
    desc: "不指定方向，分身会按自己的认知继续活动。"
  }
];
