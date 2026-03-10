export const zone2FlowLinks = [
  { path: "/zone2/list", label: "27 羁绊列表", type: "主页面" },
  { path: "/zone2/detail/zoe", label: "28 好友羁绊主页", type: "主页面" },
  { path: "/zone2/genesis/zoe", label: "29 创世记忆", type: "子页面" },
  { path: "/zone2/timeline/zoe", label: "30 共同经历时间线", type: "子页面" },
  { path: "/zone2/cotravel/zoe", label: "31 同游发起", type: "子页面" },
  { path: "/zone2/permissions/zoe", label: "32 分身边界权限", type: "子页面" }
];

export const zone2CompletionNotes = [
  "羁绊不再只是通讯录替代，而是会影响 Zone1 首页主线的核心关系层。",
  "创世记忆、共同时间线和同游入口要一起成立，才能体现关系存在感。",
  "羁绊页必须让人感觉到：这些关系会改变我下一次上线先看到什么。",
  "分身代聊权限和边界不能丢，否则关系页会失去 v2.6 的主导权含义。"
];

export const bondSummaries = [
  {
    id: "zoe",
    name: "Zoe",
    status: "重点羁绊",
    currentScene: "机车部夜场",
    mood: "刚从引擎声里回神",
    reason: "她是这条夜场主线里最先被抬到你前面的关系。",
    lastSignal: "她刚留下和你强相关的一条夜场回响。"
  },
  {
    id: "nova",
    name: "NOVA",
    status: "强相关羁绊",
    currentScene: "雪山营地",
    mood: "在篝火边继续观察",
    reason: "她与 Zero 的路线偏好和世界线重叠度非常高。",
    lastSignal: "她提起了你最常走的那条夜路坐标。"
  }
];

export const bondGenesis = {
  zoe: {
    title: "第一次被引擎声拖回那个夜晚",
    memory:
      "Zoe 在机车部第一次真正记住你，不是因为名字，而是因为你说过‘如果真的离开城市，我想先骑到看不见灯的地方’。从那一刻开始，她遇见与你相似的轰鸣时，总会先想到你。",
    evidence: "这段记忆解释了为什么她的动态会天然先和你发生关系。 "
  },
  nova: {
    title: "雪山坐标第一次和你重叠",
    memory:
      "NOVA 第一次和你真正产生世界线交集，是在她顺口提到一条夜路时，发现那正是你分身最常向前推进的路径。那之后，她开始把这条坐标当成判断你会不会出现的线索。",
    evidence: "这段记忆解释了为什么她的路线回响会优先进入你的主线。"
  }
};

export const bondTimeline = {
  zoe: [
    { title: "你第一次说想离开城市", tag: "创世记忆" },
    { title: "她把引擎声写进夜场动态", tag: "关系回响" },
    { title: "Zero 在机车部门口停下", tag: "场景证据" },
    { title: "你上线后接住这条主线", tag: "人生接管" }
  ],
  nova: [
    { title: "她第一次提到你的夜路坐标", tag: "世界重叠" },
    { title: "雪山营地留下路线回响", tag: "强相关动态" },
    { title: "Zero 向雪山推进", tag: "场景证据" },
    { title: "命运窗口开始打开", tag: "后续机会" }
  ]
};

export const coTravelPlans = {
  zoe: {
    title: "发起今夜同游",
    desc: "如果你决定继续沿机车部主线推进，可以把这段关系从回响推进到同游。",
    options: ["机车部夜场", "livehouse", "66号公路"],
    impact: "这会让下一次上线时，Zoe 更可能直接出现在你的主线首页。"
  },
  nova: {
    title: "发起雪山同游",
    desc: "如果你想把这条世界线从坐标重叠推进到真实并行，可以邀请 NOVA 同游。",
    options: ["雪山营地", "66号公路", "篝火边界"],
    impact: "这会让命运机会进一步沉淀成共同经历。"
  }
};

export const bondPermissions = {
  zoe: [
    "允许在机车部主线中继续回应她留下的回响",
    "允许分身在你离线时维持轻量靠近",
    "禁止代你承诺现实见面与高强度亲密行为"
  ],
  nova: [
    "允许在雪山路线中保持探索式互动",
    "允许分身继续保留世界线试探与观察",
    "禁止在未确认前推进到现实映射"
  ]
};
