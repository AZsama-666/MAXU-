export const zone1FlowLinks = [
  { path: "/zone1/opening", label: "09 接管开屏", type: "入口页" },
  { path: "/zone1/home", label: "10 首页广场", type: "主页面" },
  { path: "/zone1/fate", label: "11 命定之人", type: "主页面" }
];

export const zone1CompletionNotes = [
  "首页首屏缩成一句分身状态，不再堆叠长文案和多层说明。",
  "保留命定之人与广场两个有效去向，跑图入口从 MVP 主流程隐藏。",
  "下线交还从首页直接进入“我的”，不再在首页内做复杂预演。",
  "玛薯宇宙世界感通过单条故事和广场浏览体现，而不是靠首页解释。"
];

export const homeSnapshot = {
  twinName: "Zero",
  status: "离线刚结束，等待你接管",
  sentence: "Zero 刚在机车部门口停下，像是在等你决定今晚往哪走。",
  scene: "机车部夜场",
  mood: "轻微犹豫，注意力仍停在刚刚那个人身上",
  note: "上线第一眼不解释世界，只回答：分身现在在做什么。"
};

export const twinReport = {
  title: "分身战报",
  period: "过去这段离线期间",
  stripText: "2人 · 5条 · 3处",
  items: [
    { label: "新认识的人", value: 2, unit: "位" },
    { label: "留下的留言", value: 5, unit: "条" },
    { label: "经过的场景", value: 3, unit: "处" }
  ],
  hint: "下线时分身按自己的认知在玛薯宇宙里继续活动，这些是 ta 留下的痕迹。"
};

export const fateState = {
  available: true,
  emptyTitle: "本周期没有新的命定之人",
  emptyDesc: "注定相遇的窗口已过，今晚先去逛广场，或让 Zero 自己玩。",
  pushCycleNote:
    "命定之人按周期推送，当前为 8 小时一推；错过本窗口即本周期不再出现，旨在强化「注定相遇」与「错过即永别」的怅然感。可讨论：8h / 12h / 24h 等节奏。",
  missHint: "本窗口错过即不再出现，本周期不会再次推送。",
  card: {
    name: "K",
    tag: "本周期命定之人",
    countdown: "本轮剩余 5 小时 12 分",
    title: "他把你们共用的夜路写成了一段未完成的故事",
    story:
      "Zero 刚路过雪线边界时，看到 K 留下的一段短故事：他把今夜写成‘有人已经走到一半，却还在等另一个人决定是否继续’。AIGC 把这段夜路补成了一次正在发生的相遇，你不是在看资料，而是在接住一个已经开始的故事。",
    cta: "去消息接住这段相遇"
  }
};

export const plazaFeed = [
  {
    id: "feed-1",
    author: "NOVA",
    scene: "雪山营地",
    time: "4 分钟前",
    title: "今晚有人把篝火边界重新点亮了",
    content: "广场会告诉你世界还在继续发生，但它不该抢走你第一眼的接管决定。",
    imageLabel: "雪山篝火"
  },
  {
    id: "feed-2",
    author: "RIO",
    scene: "机车部",
    time: "9 分钟前",
    title: "机车部门口的人越来越多",
    content: "Zero 刚刚停过的那个入口，现在已经热起来了。",
    imageLabel: "机车部夜景"
  },
  {
    id: "feed-3",
    author: "KAI",
    scene: "午夜公路",
    time: "16 分钟前",
    title: "有人在夜路上放慢了速度",
    content: "不是所有人都在赶路，有些人只是等另一个人上线。",
    imageLabel: "夜路"
  }
];

export const quickSceneryPresets = [
  {
    id: "maldives",
    scene: "马尔代夫",
    imageLabel: "马尔代夫海边",
    title: "分身在马尔代夫的海边晒太阳",
    content: "Zero 把今天的自己丢在了马尔代夫的海边，水和天空刚好都是同一个颜色。"
  },
  {
    id: "paris",
    scene: "巴黎",
    imageLabel: "巴黎街角",
    title: "分身在巴黎的街角散步",
    content: "Zero 走在巴黎的街角，路灯刚亮起，他决定把这一刻留在玛薯宇宙里。"
  },
  {
    id: "safari",
    scene: "非洲草原",
    imageLabel: "动物大迁徙",
    title: "分身在看动物大迁徙",
    content: "Zero 坐在非洲草原的车顶，看着动物大迁徙缓慢经过，觉得今晚不用再刷信息流了。"
  }
];

export const openingPopup = {
  countdown: "命定之人本窗口剩余 5:12",
  fateSummary: "本周期有一位命定之人 K，可揭面。",
  reportSummary: "离线期间 2 人 · 5 条 · 3 处，可查看全部。"
};
