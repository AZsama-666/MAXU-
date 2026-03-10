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
    preview: "我把那条夜路补完了一半，另一半等你上线。",
    status: "可揭面",
    routeHint: "来自本轮 8 小时命定之人"
  },
  {
    id: "zoe",
    type: "熟人关系",
    title: "Zoe",
    preview: "你如果真回来，就别只在门口停一下。",
    status: "可继续聊天",
    routeHint: "来自当前主线的基础消息承接"
  }
];

export const revealState = {
  title: "基础揭面",
  desc: "MVP 先保留最基础的揭面反馈，让用户知道这段陌生关系已经不是纯路过。",
  countdown: "剩余 18 小时 24 分",
  result: "你看到了对方更真实的一面，但关系沉淀与后续机制放到 P2。"
};

export const basicChat = [
  { role: "K", text: "你上线了，所以这次我不想只留一句话。" },
  { role: "你", text: "那就别再停在边界，把今晚继续往前推一点。" },
  { role: "K", text: "好，先从真正认识彼此开始。" }
];
