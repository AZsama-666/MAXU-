export const zone5FlowLinks = [
  { path: "/zone5/map", label: "38 探险版图", type: "主页面" },
  { path: "/zone5/scene/motor-club", label: "39 场景详情页", type: "主页面" },
  { path: "/zone5/entry/motor-club", label: "40 场景进入 / 排队", type: "子页面" },
  { path: "/zone5/tonight", label: "41 今晚去向设置", type: "主页面" },
  { path: "/zone5/cotravel", label: "42 同游发起", type: "子页面" },
  { path: "/zone5/event/motor-night", label: "43 场景事件页", type: "子页面" },
  { path: "/zone5/operations", label: "44 世界热点 / 运营事件", type: "世界层" },
  { path: "/zone5/pass", label: "45 场域信物页", type: "资产页" }
];

export const zone5CompletionNotes = [
  "场景不是背景图，而是让人生接力真正发生的主梁。",
  "世界地图、场景详情、进入页、今晚去向和同游必须形成可点击闭环。",
  "世界热点和场域信物要一起出现，才能体现世界真的在运转。",
  "Zone5 要和 Zone1、羁绊、消息、双生都能接上，而不是独立漂着。"
];

export const worldScenes = [
  {
    id: "motor-club",
    name: "机车部夜场",
    heat: "高热",
    desc: "今晚最强的现实氛围场景，关系线和临时事件都在持续升温。",
    status: "可进入",
    gate: "持临时入场牌可直接进入"
  },
  {
    id: "snow-camp",
    name: "雪山营地",
    heat: "中高",
    desc: "更偏命运型相遇和世界边界探索，适合继续夜路主线。",
    status: "短时开放",
    gate: "需要在当前时段内到达"
  },
  {
    id: "livehouse",
    name: "livehouse",
    heat: "上升中",
    desc: "适合把同游和关系推进落到更强烈的现实感里。",
    status: "排队中",
    gate: "需等候 12 分钟"
  }
];

export const sceneDetails = {
  "motor-club": {
    title: "机车部夜场",
    desc: "这个场景不是世界背景，而是会直接改变今晚关系推进速度的现实现场。",
    cues: [
      "Zoe 的夜场回响就发生在这里",
      "Zero 已经拿到了临时入场牌",
      "如果你现在进入，同游和现实氛围会比雪山路线更快升温"
    ]
  },
  "snow-camp": {
    title: "雪山营地",
    desc: "这里是命运窗口和世界探索更容易发生重叠的地方。",
    cues: [
      "NOVA 的路线坐标在这里继续发酵",
      "游离态对象更可能在边界位置出现",
      "如果你继续往前走，主线会更偏探索和相遇"
    ]
  },
  livehouse: {
    title: "livehouse",
    desc: "这个场景适合同游和临时热度聚合，也是关系进一步现实化的一个中继站。",
    cues: [
      "适合同步多人关系节奏",
      "世界热度更高，但也更嘈杂",
      "适合作为从背景层回到关系推进的中转"
    ]
  }
};

export const tonightRouteOptions = [
  {
    title: "继续把今晚留在机车部",
    desc: "优先接住现实氛围和已开始升温的关系主线。"
  },
  {
    title: "把今晚重新推回雪山",
    desc: "把路线重新导向探索和命运型相遇。"
  },
  {
    title: "先把今晚交给背景世界",
    desc: "不立即深推某条主线，让世界热度先继续流动。"
  }
];

export const sceneEntryState = {
  "motor-club": {
    status: "可立即进入",
    wait: "0 分钟",
    note: "你已有临时入场牌，当前场景最适合关系推进。"
  },
  "snow-camp": {
    status: "短时开放中",
    wait: "需要在 8 分钟内到达",
    note: "如果你犹豫太久，这条世界边界会先合上。"
  },
  livehouse: {
    status: "排队中",
    wait: "12 分钟",
    note: "适合和同游对象一起切进来，单独进入收益一般。"
  }
};

export const coTravelPlan = {
  title: "发起今夜同游",
  desc: "同游不是附属玩法，而是把关系、场景和世界时间线真正绑定在一起。",
  people: ["Zoe", "NOVA", "KAI"],
  destinations: ["机车部夜场", "livehouse", "66号公路", "雪山营地"]
};

export const sceneEvents = {
  "motor-night": {
    title: "机车部临时夜场加开",
    desc: "一台改装车刚刚被推到场中央，原本要结束的热度又被点燃了一次。",
    effect: "这会让机车部路线的关系推进速度显著上升。"
  },
  "snow-window": {
    title: "雪线窗口再次打开",
    desc: "篝火边突然有人提出要继续往更深的方向走，夜路主线被重新拉长。",
    effect: "这会让探索型关系和命运窗口更容易同时出现。"
  }
};

export const worldOperationHighlights = [
  {
    title: "世界热点：机车部热度飙升",
    desc: "今晚引擎声正在成为一条公共热度主线，但它不该盖过你的个人主线。"
  },
  {
    title: "世界热点：雪山坐标被多人提起",
    desc: "这证明你的世界线并不是孤立剧情，而是真在世界里被谈论。"
  },
  {
    title: "运营事件：livehouse 临时联动",
    desc: "世界运营可以临时改写场景热度与人流，但用户主线仍应优先。"
  }
];

export const scenePasses = [
  {
    title: "机车部临时入场牌",
    desc: "允许 Zero 在当前时段直接进入夜场，降低关系推进的现实门槛。"
  },
  {
    title: "雪线临时坐标",
    desc: "允许你在窗口关闭前快速切回雪山路线。"
  },
  {
    title: "同游联名通行证",
    desc: "当你发起同游时，可降低多人同时进入场景的摩擦。"
  }
];
