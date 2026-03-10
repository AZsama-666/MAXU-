export const preferenceOptions = [
  "倾向异性",
  "倾向同性",
  "双性倾向",
  "保密（仅公海）"
];

export const personaQuestions = [
  {
    id: 1,
    prompt: "周末临时空出来，你更想把分身投放到哪里？",
    options: ["在家躺平，慢慢回血", "去新开的 livehouse 碰运气"]
  },
  {
    id: 2,
    prompt: "如果夜晚的城市只剩下一条路，你会怎么走？",
    options: ["戴耳机独自骑行", "找一个能一起出发的人"]
  },
  {
    id: 3,
    prompt: "你更想让分身先留下哪种痕迹？",
    options: ["一段被记住的对话", "一个被发现的场景"]
  },
  {
    id: 4,
    prompt: "面对陌生的灵魂时，你习惯？",
    options: ["先旁观，再决定靠近", "先破冰，感受回应"]
  },
  {
    id: 5,
    prompt: "你最想和谁在 MAXU 相遇？",
    options: ["与我气质共振的人", "能带我进入新场域的人"]
  },
  {
    id: 6,
    prompt: "如果要留下一个世界坐标，你会选？",
    options: ["雪山篝火旁", "午夜公路尽头"]
  },
  {
    id: 7,
    prompt: "你希望分身离线后继续做什么？",
    options: ["保持克制，只做低扰动互动", "主动探索并制造新相遇"]
  },
  {
    id: 8,
    prompt: "你希望别人最先感知到你的哪一面？",
    options: ["稳定、冷静、值得信任", "锋利、好奇、难以预测"]
  }
];

export const quickFlowLinks = [
  { path: "/zone0/login", label: "01 登录/注册", type: "主流程" },
  { path: "/zone0/otp", label: "02 OTP 验证码", type: "主流程" },
  { path: "/zone0/preference", label: "03 初始偏好采集", type: "主流程" },
  { path: "/zone0/persona-intro", label: "04 人格测试引导", type: "主流程" },
  { path: "/zone0/questions/1", label: "05 人格问答", type: "主流程" },
  { path: "/zone0/ai-dialog", label: "06 AI 自我对话", type: "可跳过" },
  { path: "/zone0/media", label: "07 声纹与照片", type: "主流程" },
  { path: "/zone0/loading", label: "08 抽取加载页", type: "主流程" },
  { path: "/zone0/identity", label: "09 分身确立与命名", type: "主流程" },
  { path: "/zone1/opening", label: "10 跳转 Zone1 开屏", type: "衔接页" }
];

export const completionNotes = [
  "补充验证码发送失败、重发和返回改手机号。",
  "补充人格问答 1-8 的进度与上一题/下一题。",
  "在性格测试后加入可跳过的 AI 自我对话，降低首次进入割裂感。",
  "补充照片/声纹跳过确认及稍后补全说明。",
  "补充进入宇宙后的 Zone1 开屏衔接，验证首页主线已打通。"
];

export const aiDialogue = [
  { role: "AI", text: "我已经大概看见你的行动偏好了。你更像会先感受，再决定是否靠近。" },
  { role: "你", text: "所以你会怎么开始我的分身人生？" },
  { role: "AI", text: "先不替你决定。我只会先替你把那道门打开，真正接管还是交给你自己。" }
];
