export const zone4FlowLinks = [
  { path: "/zone4/hub", label: "18 我的主页", type: "主页面" },
  { path: "/zone4/signoff", label: "19 下线倾向", type: "主页面" }
];

export const zone4CompletionNotes = [
  "Tab 改成“我的”，降低理解成本，不再叫双生控制舱。",
  "只保留当前状态与 3 个下线倾向，不再展开复杂指令配置。",
  "跳过选择时，默认让分身按自己的认知继续活动。"
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
