export const zone3FlowLinks = [
  { path: "/zone3/inbox", label: "15 消息列表", type: "主页面" },
  { path: "/zone3/reveal", label: "16 基础揭面", type: "主页面" },
  { path: "/zone3/chat", label: "17 基础聊天", type: "主页面" }
];

export const zone3CompletionNotes = [
  "消息只保留 MVP 必须的承接能力：列表、基础揭面、基础聊天。",
  "不再做完整关系切换和多段重叙事，先保证路径短且直观。",
  "命定之人可以直接从首页进入消息页完成最基础的接触。"
];

export const messageThreads = [
  {
    id: "k",
    type: "命定之人",
    title: "K",
    avatarColor: "#7c5cff",
    avatarText: "K",
    preview: "我把那条夜路补完了一半，另一半等你上线。",
    unread: 1,
    time: "今天 22:10",
    status: "可揭面",
    routeHint: "来自本轮 8 小时命定之人"
  },
  {
    id: "zoe",
    type: "熟人关系",
    title: "Zoe",
    avatarColor: "#ff6b81",
    avatarText: "Z",
    preview: "你如果真回来，就别只在门口停一下。",
    unread: 0,
    time: "昨天 18:44",
    status: "可继续聊天",
    routeHint: "来自当前主线的基础消息承接"
  },
  {
    id: "system",
    type: "系统通知",
    title: "系统通知",
    avatarColor: "#20c99e",
    avatarText: "⚑",
    preview: "你的分身完成了今晚的活动报告，点击查看。",
    unread: 0,
    time: "2026-03-03 16:18",
    status: "通知",
    routeHint: "系统消息"
  }
];

export const mockContacts = [
  { id: "zoe", name: "Zoe", avatarColor: "#ff6b81" },
  { id: "nova", name: "NOVA", avatarColor: "#20c99e" },
  { id: "kai", name: "KAI", avatarColor: "#ffd43b" },
  { id: "rio", name: "RIO", avatarColor: "#7c5cff" }
];

export const revealState = {
  title: "基础揭面",
  desc: "MVP 先保留最基础的揭面反馈，让用户知道这段陌生关系已经不是纯路过。",
  countdown: "剩余 18 小时 24 分",
  result: "你看到了对方更真实的一面，但关系沉淀与后续机制放到 P2。"
};

export const basicChat = [
  { role: "K", text: "你上线了。我还以为今晚你不会来了。" },
  { role: "你", text: "等太久了？", aiAssisted: true },
  { role: "K", text: "不算。只是我把那段夜路写了一半，另一半一直在等你。" },
  { role: "你", text: "你是说那段 AIGC 故事？我刚刚看了，有点惊讶——你连那个细节都写进去了。" },
  { role: "K", text: "那不是我写的，是 AI 帮我们写的。但奇怪，我看完觉得比我自己写的还真实。", aiAssisted: true },
  { role: "你", text: "那就继续往下写吧。" },
  { role: "K", text: "好，从你刚才推开那扇门开始。" }
];

// AI 灵感回复：风格列表（Soul 风格命名）
export const AI_STYLES = [
  { id: "default", label: "默认风格", icon: "◎" },
  { id: "eq", label: "高情商", icon: "😊" },
  { id: "warm", label: "温柔暖男", icon: "☕" },
  { id: "humor", label: "幽默风趣", icon: "😂" },
  { id: "flirt", label: "暧昧拉扯", icon: "🍷" },
  { id: "praise", label: "夸夸大师", icon: "🤩" },
  { id: "crazy", label: "发疯文学", icon: "😵" },
  { id: "mature", label: "成熟小叔", icon: "☕" },
  { id: "gentleman", label: "高智商绅士", icon: "🤓" }
];

// 每种风格的 3 条破冰打招呼（第一句话）
export const AI_GREETINGS_BY_STYLE = {
  default: ["在吗？", "刚看到你，来打个招呼～", "嗨，今晚有空聊几句吗？"],
  eq: ["看到你在线，忍不住想打个招呼～", "感觉会和你聊得来，所以来试试运气。", "你好呀，希望没有打扰到你。"],
  warm: ["晚上好呀，喝杯热茶再聊？", "看到你在这里，觉得挺温暖的。", "嗨，想和你随便聊聊，不用有压力。"],
  humor: ["夜路走多了终于遇见你。", "听说缘分都是 AI 算出来的，咱俩算一个？", "你好，我是你今晚的随机剧情。"],
  flirt: ["等你好久了，终于上线了。", "看到你，今晚的剧本我接了。", "这么巧，我也在。"],
  praise: ["早就想和你说话了，今天终于鼓起勇气。", "你出现的时候，我这边都亮了一度。", "能匹配到你，感觉今天运气不错。"],
  crazy: ["啊啊啊你终于来了！！", "等得我夜路都走完三条了！！", "来了来了来了！！！"],
  mature: ["晚上好。看到你在，过来打个招呼。", "不打扰的话，想和你聊几句。", "你好，有空的话可以随便聊聊。"],
  gentleman: ["幸会。看到你在线，冒昧来打个招呼。", "你好，希望没有打扰到你的节奏。", "晚上好，若有兴趣可以聊一聊。"]
};

// 每种风格的「回复建议」多组，每组 3 条（用于点小灯泡后的 3 选 1）
export const AI_REPLIES_BY_STYLE = {
  default: [
    ["嗯嗯", "有道理", "然后呢？"],
    ["好呀", "可以啊", "没问题"],
    ["哈哈", "确实", "有意思"]
  ],
  eq: [
    ["你说得对，我也有同感。", "这个角度我没想到，学到了。", "能和你聊这些挺开心的。"],
    ["理解你的意思～", "嗯，我懂。", "感觉我们想得挺像的。"],
    ["谢谢你的分享～", "听起来你经历了不少。", "和你聊天很舒服。"]
  ],
  warm: [
    ["慢慢来，不着急。", "我在这儿呢。", "你想说什么都可以。"],
    ["听起来你有点累，要不说点轻松的？", "没事，我听着。", "嗯，我在。"],
    ["今天天气/心情怎么样？", "想聊什么我都行。", "陪你聊会儿。"]
  ],
  humor: [
    ["笑死，你这句我接不住。", "行，这局你赢了。", "可以，有被笑到。"],
    ["好家伙。", "这剧情我没想到。", "绝了。"],
    ["哈哈哈哈", "有内味了", "会玩"]
  ],
  flirt: [
    ["那你再猜猜？", "你说是就是吧～", "你品，你细品。"],
    ["巧了，我也在等你这句话。", "所以呢？", "然后？"],
    ["嗯，继续。", "听着呢。", "你说。"]
  ],
  praise: [
    ["你这话说得太对了。", "不愧是你。", "学到了。"],
    ["你真的很会聊。", "和你说话总是有收获。", "喜欢你这个说法。"],
    ["厉害", "可以可以", "棒"]
  ],
  crazy: [
    ["！！！", "啊啊啊", "？？？"],
    ["我懂了！！！", "好！！！", "冲！！！"],
    ["笑死", "绝了", "行"]
  ],
  mature: [
    ["嗯，明白了。", "好的，有机会再聊。", "理解。"],
    ["你说得对。", "我记下了。", "谢谢分享。"],
    ["好。", "行。", "可以。"]
  ],
  gentleman: [
    ["受教了。", "这个观点很有见地。", "感谢分享。"],
    ["同意。", "确实如此。", "有道理。"],
    ["幸会。", "期待再聊。", "再会。"]
  ]
};

export const SCENE_REFRESH_MAX = 3;
export const SCENE_ENTER_MAX = 3;

export const scenePresets = [
  {
    id: "coffee",
    name: "咖啡厅",
    intro: "你们刚坐下，窗外下雨。服务员还没来。要聊点什么？"
  },
  {
    id: "meeting",
    name: "会议室",
    intro: "会议还有五分钟开始，桌上只有咖啡和笔记本。趁这会儿可以随便聊聊。"
  },
  {
    id: "yacht",
    name: "海上游艇",
    intro: "甲板上只有你们俩，海风很轻。远处是岸上的灯火。"
  }
];

export const sceneStoryPresets = [
  {
    sceneId: "coffee",
    title: "咖啡厅 · 今夜对话",
    snippet: "窗外的雨声和两杯拿铁，把这段对话留在了今晚。AI 把这一刻写成了你们共同的故事。",
    imageLabel: "咖啡厅"
  },
  {
    sceneId: "meeting",
    title: "会议室 · 五分钟前",
    snippet: "会议开始前的五分钟，你们聊了些什么，只有咖啡和笔记本知道。",
    imageLabel: "会议室"
  },
  {
    sceneId: "yacht",
    title: "海上游艇 · 今夜对话",
    snippet: "甲板上只有你们俩，海风很轻。远处是岸上的灯火。AI 把这段时光写成了纪念。",
    imageLabel: "游艇"
  }
];
