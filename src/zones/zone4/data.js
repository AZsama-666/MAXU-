export const zone4FlowLinks = [
  { path: "/zone4/hub", label: "21 双生首页", type: "主页面" },
  { path: "/zone4/status", label: "22 分身状态中心", type: "主页面" },
  { path: "/zone4/instruction", label: "23 离线指令配置", type: "主页面" },
  { path: "/zone4/boundaries", label: "24 分身边界配置", type: "主页面" },
  { path: "/zone4/assets", label: "25 资产沉淀", type: "主页面" },
  { path: "/zone4/release", label: "26 下线前确认", type: "收口页" }
];

export const zone4CompletionNotes = [
  "双生不再只是控制舱，而是用户下线前安排分身人生的地方。",
  "离线指令要和 Zone1 的接管主线连起来，而不是独立悬空。",
  "分身状态、边界配置、资产沉淀和下线确认都要进入同一条分镜式流程。",
  "所有页面继续使用 Zone0 / Zone1 的统一壳层和底部 CTA 收口。"
];

export const twinHubSnapshot = {
  twinName: "Zero",
  controlState: "用户主导后待交还",
  currentScene: "机车部夜场",
  lifeSegment: "你刚接住 Zoe 的夜场回响，今晚已经从旁观切到了关系推进线。",
  instructionPreview: "下线后继续去和好朋友互动",
  hint: "双生负责的是下线前安排人生，而不是取代 Zone1 的接管时刻。"
};

export const twinStatusCards = [
  {
    title: "当前主导权",
    value: "user_driving",
    desc: "你刚完成一次接管，当前人生片段还处于你主导后的待交还状态。"
  },
  {
    title: "当前场景",
    value: "机车部夜场",
    desc: "Zero 正停在入口附近，场景热度和关系机会都在上升。"
  },
  {
    title: "关系压力",
    value: "中高",
    desc: "Zoe 和 RIO 已开始把 Zero 视作今晚的参与者。"
  },
  {
    title: "推荐交还方式",
    value: "带指令交还",
    desc: "如果你不想让这条关系线冷掉，建议在下线前明确生活方向。"
  }
];

export const instructionPresets = [
  {
    id: "friends-night",
    title: "下线后继续去和好朋友互动",
    goal: "friend_interaction",
    summary: "优先回到机车部，把今晚已经升温的关系继续推进下去。",
    scenePreference: "机车部 / livehouse",
    relationPreference: "Zoe / 同游关系",
    style: "温和靠近，优先回应已经开始发酵的关系回响",
    impact: "适合你已经决定今晚关系线不能断。"
  },
  {
    id: "social-discovery",
    title: "下线后继续聊天交友",
    goal: "social_discovery",
    summary: "让 Zero 沿着夜路和雪山继续接触新的世界线与陌生关系。",
    scenePreference: "66号公路 / 雪山营地",
    relationPreference: "游离态对象 / 新相遇",
    style: "保留探索感，让分身先试探陌生人的边界和气质",
    impact: "适合你不想把今晚只停在已知关系中。"
  },
  {
    id: "public-world",
    title: "下线后先去公共世界看看",
    goal: "public_world_browse",
    summary: "让 Zero 先回到背景世界，观察哪些场景仍在升温，再决定回到哪条主线。",
    scenePreference: "世界热点场景",
    relationPreference: "低强相关 / 世界漫游",
    style: "保持轻量游走，不主动深推某段关系",
    impact: "适合你想把今晚暂时交还给世界。"
  }
];

export const boundaryRules = [
  {
    title: "关系推进边界",
    desc: "分身可以继续维持暧昧和轻量社交，但不得越过你设定的亲密边界。",
    status: "已开启提醒"
  },
  {
    title: "主动破冰边界",
    desc: "只允许在你已明确选择的场景和关系方向内主动开启新对话。",
    status: "仅对游离态开放"
  },
  {
    title: "现实映射边界",
    desc: "不得在未确认的情况下代你承诺现实见面、线下交换或敏感信息共享。",
    status: "严格限制"
  }
];

export const twinAssets = [
  {
    title: "场域信物",
    value: "机车部临时入场牌",
    desc: "证明 Zero 今晚已被场景真正接纳，不再只是路过。"
  },
  {
    title: "关系沉淀",
    value: "Zoe 夜场回响",
    desc: "这条回响已经进入你的主线，不再只是背景内容。"
  },
  {
    title: "世界痕迹",
    value: "66号公路路线偏好",
    desc: "这会继续影响后续世界线、命运窗口和同游推荐。"
  }
];

export const releaseChecklist = [
  "确认今晚是否继续沿当前场景推进",
  "确认分身是否按自由意志继续生活，还是按指令方向前进",
  "确认边界配置是否允许当前关系继续升温",
  "确认世界热点是否要被纳入分身下线后的漫游范围"
];
