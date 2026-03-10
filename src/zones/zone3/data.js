export const zone3FlowLinks = [
  { path: "/zone3/inbox", label: "33 混合消息列表", type: "主页面" },
  { path: "/zone3/blindbox/echo-k", label: "34 游离态盲盒聊天室", type: "主页面" },
  { path: "/zone3/unmask", label: "35 72小时揭面中心", type: "关键机制" },
  { path: "/zone3/bonded/zoe", label: "36 羁绊态正式聊天室", type: "主页面" },
  { path: "/zone3/transition", label: "37 关系切换提示页", type: "收口页" }
];

export const zone3CompletionNotes = [
  "消息页只承接沟通，不再取代世界主线本身。",
  "游离态与羁绊态要清楚分层，不能混成一个普通 IM。",
  "72 小时揭面仍然要保留高光，但只作用于陌生关系路径。",
  "消息最终要把用户重新送回关系页或场景页，而不是自己成为终点。"
];

export const messageThreads = [
  {
    id: "echo-k",
    type: "游离态",
    title: "K",
    preview: "如果今晚继续往前走，最好别一个人决定。",
    status: "72小时内可揭面",
    routeHint: "来自雪山路线的命运窗口"
  },
  {
    id: "zoe",
    type: "羁绊态",
    title: "Zoe",
    preview: "你要是真的回到机车部，我就知道你不是路过。",
    status: "已进入羁绊层",
    routeHint: "来自机车部主线的关系承接"
  }
];

export const blindboxDialogue = [
  { role: "对方", text: "如果今晚真的还要往前走，你会继续朝雪线走，还是回头？" },
  { role: "你", text: "如果我不是一个人决定，也许会继续往前。" },
  { role: "对方", text: "那就别让这段夜路只停在一句话里。" }
];

export const unmaskingState = {
  title: "72 小时揭面中心",
  desc:
    "揭面不是为了把陌生关系变成普通聊天，而是把一条仍在发生中的世界线，从试探推进到正式进入你的关系层。",
  countdown: "剩余 18 小时 24 分",
  trigger: "双方连续回应 + 世界线持续重叠 + 未触发边界限制"
};

export const bondedDialogue = [
  { role: "Zoe", text: "你如果今晚真回机车部，就说明那段引擎声还没从你身上过去。" },
  { role: "你", text: "我不是回来刷热闹，我是回来接住这条主线。" },
  { role: "Zoe", text: "那就别只说，去把今晚真的推下去。" }
];

export const transitionSummary = {
  title: "这条沟通已经不再只是消息",
  desc:
    "当关系从游离态进入羁绊态，消息就不再只是试探，而开始反过来改变你下一次上线会先进入哪段人生。"
};
