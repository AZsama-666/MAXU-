export const zone1FlowLinks = [
  { path: "/zone1/opening", label: "09 常规开屏", type: "入口页" },
  { path: "/zone1/reactivation", label: "10 打捞召回开屏", type: "回流页" },
  { path: "/zone1/home-life", label: "11 分身此刻状态", type: "主页面" },
  { path: "/zone1/enter-life", label: "12 接管 / 继续观察", type: "主页面" },
  { path: "/zone1/today-tasks", label: "13 今日最值得做的事", type: "主页面" },
  { path: "/zone1/fate", label: "14 命运机会", type: "主页面" },
  { path: "/zone1/close-updates", label: "15 强相关动态", type: "主页面" },
  { path: "/zone1/echo/club-zoe", label: "16 回响详情", type: "子页面" },
  { path: "/zone1/world-entry", label: "17 世界背景入口", type: "转场页" },
  { path: "/zone1/plaza", label: "18 公共世界背景", type: "背景层" },
  { path: "/zone1/post", label: "19 发布背景动态", type: "子页面" },
  { path: "/zone1/detail/post-1", label: "20 背景动态详情", type: "子页面" }
];

export const zone1CompletionNotes = [
  "统一复用 Zone0 的 PhoneFrame、AppShell、PageHeader 和 BottomActionBar。",
  "首页先回答分身现在在做什么，再决定是否接管和今晚要往哪里推进。",
  "路线选择必须真实影响任务、命运机会、强相关动态和背景世界提示。",
  "补上离线自治 / 离线指令预演，为后续双生联动留结构。"
];

export const controlStateMeta = {
  takeover_pending: {
    label: "等待接管",
    description: "Zero 正在继续生活，你可以随时接手这段人生。",
    tone: "accent"
  },
  user_driving: {
    label: "用户主导中",
    description: "你已经接管当前片段，后续任务会按你的选择推进。",
    tone: "success"
  },
  twin_autonomous: {
    label: "自由意志托管",
    description: "如果你现在下线，Zero 会按自己的意志继续生活。",
    tone: "muted"
  },
  twin_directed: {
    label: "离线指令已生效",
    description: "如果你现在下线，Zero 会按你预设的生活方向继续推进。",
    tone: "warning"
  }
};

export const openingTasks = [
  {
    title: "先看到 Zero 的此刻",
    desc: "不是先刷公共流，而是先知道他现在在哪、刚发生了什么、你最值得接管哪一段人生。"
  },
  {
    title: "决定今晚向哪里推进",
    desc: "你选雪山还是机车部，会直接改变接下来看到的任务、命运机会和关系回响。"
  },
  {
    title: "决定下线后让他怎么活",
    desc: "如果你不下指令，Zero 就按自由意志生活；如果你下了指令，他会沿着你给的方向继续推进。"
  }
];

export const homeUnmaskingPreview = {
  title: "72 小时揭面窗口已经存在",
  badge: "陌生关系机制",
  countdown: "剩余 18 小时 24 分",
  desc:
    "K 的游离态世界线已经进入可推进阶段。它不该只躺在消息列表里，而应作为首页能被你感知到的机制提醒：如果你今晚继续把主线推向陌生关系，这次揭面可能会从试探推进成正式进入你的关系层。",
  cta: "去消息看揭面进度"
};

export const twinProfile = {
  twinName: "Zero",
  onlineStatus: "离线托管中",
  currentScene: "66号公路入口",
  stayTime: "已停留 14 分钟",
  weather: "午夜有雾",
  mood: "轻微犹豫，但好奇心在上升",
  identityLine: "他不是资料卡，而是在这个世界里真实生活的居民。",
  summary:
    "Zero 刚在加油站外和机车部的人打完一个照面，下一步还没有最终决定。这个犹豫本身，就是你最值得进入的那段人生。"
};

export const lifeSegments = {
  "route-club": {
    id: "segment-club-001",
    sceneId: "motor-club",
    sceneName: "机车部夜场",
    takeoverWindow: "现在进入，会接住 Zero 刚刚得到的一次关系机会。",
    recentAction: "Zero 刚收到机车部临时入场牌，对方问他要不要跟着去看今晚最响的那台车。",
    summary:
      "这条路线更偏关系推进和现实氛围。你接管后，会先遇到与你强相关的人和已经开始发酵的夜场线索。",
    whyNow: "如果你现在不接，Zoe 那条和你有关的夜场回响会先沉到背景层。",
    recommendedInstructionId: "instruction-friends"
  },
  "route-snow": {
    id: "segment-snow-001",
    sceneId: "snow-camp",
    sceneName: "雪山营地",
    takeoverWindow: "现在进入，会把今晚导向更宿命、更陌生的相遇线。",
    recentAction: "Zero 看着公路尽头的雪线，准备顺着临时路标继续往营地方向推进。",
    summary:
      "这条路线更偏世界探索和命运型关系。你接管后，会更早遇到游离态对象与世界线重叠的窗口。",
    whyNow: "如果你继续向雪山推进，NOVA 留下的那段路线坐标会立刻变成主线线索。",
    recommendedInstructionId: "instruction-social"
  }
};

export const takeoverOptions = [
  {
    id: "route-club",
    title: "转入机车部夜场",
    desc: "更快接触到强相关关系动态和现实氛围。",
    impact: "后续会优先看到 Zoe 的夜场回响、关系更新和可立即接住的互动窗口。"
  },
  {
    id: "route-snow",
    title: "继续沿路去雪山",
    desc: "保持今晚的神秘感，更容易遇见宿命型关系。",
    impact: "后续会优先看到雪山世界线、游离态对象和更强的探索式命运机会。"
  }
];

export const taskBundlesByRoute = {
  "route-club": [
    {
      id: "club-task-1",
      eyebrow: "接管后第一步",
      title: "先接住 Zoe 留下的夜场回响",
      desc: "她已经先于你在机车部留下了一条和你强相关的世界痕迹，这会直接影响今晚关系线要不要升温。",
      cta: "先看强相关动态",
      destination: "updates"
    },
    {
      id: "club-task-2",
      eyebrow: "接管后第二步",
      title: "判断今晚要不要主动破冰",
      desc: "机车部的现实氛围已经就位，如果你愿意继续主导，这一晚可以很快从关系回响推进到主动接触。",
      cta: "继续到命运机会",
      destination: "fate"
    }
  ],
  "route-snow": [
    {
      id: "snow-task-1",
      eyebrow: "接管后第一步",
      title: "先确认雪山路线是否真的与你重叠",
      desc: "NOVA 提起的坐标并不是公共噪音，而是一条会把你拉进更深世界线的入口。",
      cta: "先看强相关动态",
      destination: "updates"
    },
    {
      id: "snow-task-2",
      eyebrow: "接管后第二步",
      title: "抓住短暂打开的命运窗口",
      desc: "雪山路线会更早暴露游离态对象的真实气质，适合把今晚推向一次宿命式相遇。",
      cta: "继续到命运机会",
      destination: "fate"
    }
  ]
};

export const fateCandidatesByRoute = {
  "route-club": {
    code: "[夜路] Zoe",
    score: "同步度 92%",
    desc: "你一旦进入机车部，这条关系线就会从回响状态切到可被你亲自接住的现实窗口。",
    sceneTags: ["机车部", "夜场", "引擎声"],
    moment: "这不是普通推荐，而是你接管后最有可能马上发生变化的一段关系机会。",
    cta: "继续接住相关动态"
  },
  "route-snow": {
    code: "[游离] K",
    score: "契合度 95%",
    desc: "对方的数字人刚从雪山侧进入公路边缘，你们的世界线出现了只持续一小段时间的重叠。",
    sceneTags: ["雪山", "夜路", "午夜出发"],
    moment: "如果你继续向雪山推进，这会成为今晚最值得被你亲自决定的一次命运窗口。",
    cta: "继续看强相关动态"
  }
};

export const relevantUpdatesByRoute = {
  "route-club": [
    {
      id: "club-zoe",
      author: "Zoe",
      relation: "重点关注",
      scene: "机车部",
      time: "2 分钟前",
      title: "她刚把一段和你有关的引擎声写进动态",
      content:
        "Zoe 没有先发车照，而是先写下：今晚这台车的轰鸣，很像你第一次说想离开城市的那个夜晚。",
      relevance: "因为你选择机车部路线，这条关系证据被抬到了主线，而不是掉进公共背景层。",
      cta: "查看她的回响"
    },
    {
      id: "club-rio",
      author: "RIO",
      relation: "场景熟人",
      scene: "机车部",
      time: "7 分钟前",
      title: "有人已经在问 Zero 今晚到底会不会留下来",
      content:
        "RIO 在俱乐部门口看到 Zero 停下后，给你们共同认识的人留了一句：他今晚看起来不像只是路过。",
      relevance: "这是对当前人生片段的场景证据，说明世界已经开始围绕你的选择给出反馈。",
      cta: "看场景回响"
    }
  ],
  "route-snow": [
    {
      id: "snow-nova",
      author: "NOVA",
      relation: "强相关",
      scene: "雪山营地",
      time: "16 分钟前",
      title: "与你有关的路线坐标刚被提起",
      content:
        "NOVA 在雪山篝火边提到了你最常走的那条夜路，这不是热闹内容，而是会把你拉进这条世界线的证据。",
      relevance: "因为你继续向雪山推进，这条动态变成了当前主线最先该看的那条回响。",
      cta: "查看路线回响"
    },
    {
      id: "snow-k",
      author: "K",
      relation: "游离态对象",
      scene: "雪线外侧",
      time: "刚刚",
      title: "有人也在看着同一段夜路边界",
      content:
        "K 的数字人刚从雪线外侧停住，留下了一句很短的话：如果今晚真要继续往前走，最好别一个人决定。",
      relevance: "这是一条正在形成中的命运证据，说明你的路线选择已经开始触发陌生关系窗口。",
      cta: "看命运回响"
    }
  ]
};

export const echoDetails = {
  "club-zoe": {
    title: "Zoe 的夜场回响",
    scene: "机车部",
    author: "Zoe",
    detail:
      "她本来可以先发一张车照，但她先想到的却是你说过的那句“想先骑到看不见灯的地方”。这意味着这条动态不是给所有人看的，而是在把你重新拖回她刚刚经历的那一刻。",
    proof: "这是一条关系证据，而不是一条普通内容。",
    effect: "如果你继续主导这条路线，下一步最自然的动作就是接住她的这段现实回响。"
  },
  "club-rio": {
    title: "RIO 的场景回响",
    scene: "机车部",
    author: "RIO",
    detail:
      "RIO 不是在发布什么重要内容，他只是把 Zero 停在门口那一刻当成了一个会影响今晚走向的场景信号。这说明你的分身已经不再是背景路人。",
    proof: "这是一条场景位面证据，证明世界会对你的进入做出反馈。",
    effect: "继续停留在机车部，会让更多角色开始把 Zero 视为今晚的参与者。"
  },
  "snow-nova": {
    title: "NOVA 的雪山坐标",
    scene: "雪山营地",
    author: "NOVA",
    detail:
      "NOVA 在篝火边提到你留下过的路线偏好时，并不知道你会在这一刻上线。但因为 Zero 正向雪山推进，这条坐标从公共内容变成了与你世界线直接相关的回响。",
    proof: "这是一条强相关世界证据，说明你正在进入的不是空白场景，而是已经发生过事情的世界片段。",
    effect: "如果你继续往前走，雪山路线会优先把与你相关的人和世界证据推到台前。"
  },
  "snow-k": {
    title: "K 的边界回响",
    scene: "雪线外侧",
    author: "K",
    detail:
      "K 的数字人没有直接破冰，而是先把“别一个人决定”这句极短的话留在边界位置。这种克制本身，正是你们世界线开始短暂重叠的证据。",
    proof: "这是一条命运位面证据，说明陌生关系窗口已经打开，但还没有被你亲自接住。",
    effect: "如果你保持这条路线，接下来最值得做的是决定要不要主动把这次重叠变成相遇。"
  }
};

export const worldEntriesByRoute = {
  "route-club": {
    title: "你的主线已经先走进了关系现场",
    desc:
      "到这里之前，你已经先看过 Zero 今晚最值得接住的关系线。现在再去看公共世界，才像是在确认这个夜晚还有哪些背景热度在同时发生。",
    evidence: [
      "机车部热度正在上升，公共讨论会比首页主线更嘈杂。",
      "与你相关的关系线已经先被抬到前台，背景层只负责补充世界证据。",
      "如果你现在下线，也可以先在双生里决定让 Zero 继续把哪条关系线推进下去。"
    ]
  },
  "route-snow": {
    title: "你的主线已经先走进了世界边界",
    desc:
      "到这里之前，你已经先看过 Zero 正在经历的世界线和命运窗口。现在再去看公共世界，应该只是补一层世界证据，而不是让热闹盖过你的主线。",
    evidence: [
      "雪山营地的公共热度会告诉你世界还在继续运转，但不是你最该先看的内容。",
      "与你路线直接相关的坐标和回响已经先被抬到主线。",
      "如果你现在下线，也可以决定让 Zero 是继续探索，还是改回关系优先。"
    ]
  }
};

export const offlineInstructionPresets = [
  {
    id: "instruction-friends",
    goalType: "friend_interaction",
    routePreference: "route-club",
    title: "下线后继续去和好朋友互动",
    desc: "优先回到机车部和已经与你强相关的关系继续推进，不让今晚的现实氛围断掉。",
    scenePreference: "机车部 / livehouse",
    relationPreference: "Zoe / 同游关系",
    whenToUse: "适合你已经决定今晚要先把关系线推深。"
  },
  {
    id: "instruction-social",
    goalType: "social_discovery",
    routePreference: "route-snow",
    title: "下线后继续聊天交友",
    desc: "让 Zero 沿着雪山和夜路去接更多陌生世界线，把今晚继续推向新的命运窗口。",
    scenePreference: "雪山营地 / 夜路边界",
    relationPreference: "游离态对象 / 新相遇",
    whenToUse: "适合你想保留探索感，不想让主线只停在已知关系里。"
  },
  {
    id: "instruction-world",
    goalType: "public_world_browse",
    routePreference: "route-club",
    title: "下线后先去公共世界看看",
    desc: "把今晚先交还给世界背景层，让 Zero 去看哪里更热闹，再决定下一步要回到谁身边。",
    scenePreference: "公共世界热点场景",
    relationPreference: "低强相关 / 世界漫游",
    whenToUse: "适合你暂时不想继续深推当前主线，但也不希望世界停住。"
  }
];

export const worldBackgroundFeed = [
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
  },
  {
    id: "post-3",
    author: "KAI",
    scene: "livehouse",
    time: "25 分钟前",
    title: "低频鼓点让整个夜晚像悬在空中",
    content: "刚从 livehouse 出来，耳朵里还带着没散掉的轰鸣。",
    stats: { likes: 11, comments: 4, echoes: 0 }
  }
];

export const publishSceneOptions = ["机车部", "66号公路", "雪山营地", "livehouse"];

export const feedComments = [
  "太酷了吧，求带我一起去。",
  "这个场景今晚还开放吗？",
  "你们分身昨晚应该已经提前踩点了。"
];
