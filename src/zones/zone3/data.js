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
  { role: "你", text: "等太久了？" },
  { role: "K", text: "不算。只是我把那段夜路写了一半，另一半一直在等你。" },
  { role: "你", text: "你是说那段 AIGC 故事？我刚刚看了，有点惊讶——你连那个细节都写进去了。" },
  { role: "K", text: "那不是我写的，是 AI 帮我们写的。但奇怪，我看完觉得比我自己写的还真实。" },
  { role: "你", text: "那就继续往下写吧。" },
  { role: "K", text: "好，从你刚才推开那扇门开始。" }
];

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
