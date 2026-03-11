export const zone2FlowLinks = [
  { path: "/zone2/list", label: "13 关系列表", type: "主页面" },
  { path: "/zone2/detail/zoe", label: "14 关系详情", type: "主页面" }
];

export const zone2CompletionNotes = [
  "关系 Tab 保留，但只做最小关系承接，不再展开成长时间线。",
  "让用户知道谁已经进入自己的人生，而不是把关系经营做深。",
  "保留 1 个详情页即可表达“关系存在感”，其他沉淀能力后置。"
];

export const bondSummaries = [
  {
    id: "zoe",
    name: "Zoe",
    status: "最常影响今晚",
    currentScene: "机车部夜场",
    mood: "在等你决定要不要继续靠近",
    reason: "她是当前最容易把你的主线从旁观推向互动的人。",
    lastSignal: "她刚把一句和你有关的话留在了夜场边。"
  },
  {
    id: "nova",
    name: "NOVA",
    status: "世界线高度重叠",
    currentScene: "雪山营地",
    mood: "仍在观察这条夜路会不会继续",
    reason: "她更像会在后续版本里继续长出来的一段关系。",
    lastSignal: "她还停留在世界线重叠的早期阶段。"
  }
];

export const bondHighlights = {
  zoe: {
    title: "她为什么会被放到关系页最前面",
    summary: "Zoe 不是联系人，而是这段夜场主线里最容易继续影响你的人。",
    bullets: [
      "她的回响已经进入你的首页主线",
      "她是最可能从消息推进到关系的人",
      "如果你下线，她也最可能继续影响 Zero 的后续活动"
    ]
  },
  nova: {
    title: "她为什么暂时仍是轻量关系",
    summary: "NOVA 仍更接近命定之人的延长线，关系还没有完全沉淀下来。",
    bullets: [
      "更多是世界线重叠，不是稳定关系",
      "她会影响后续命定之人和广场体验",
      "更深入的承接放到 P2 再做"
    ]
  }
};

export const bondStorylines = {
  zoe: [
    {
      time: "昨夜",
      title: "引擎声里的第一句",
      snippet: "AIGC 根据你们在机车部的重叠动线，生成了这段：她先听到引擎声，然后想起你说过想骑到看不见灯的地方。",
      imageLabel: "机车部"
    },
    {
      time: "今天凌晨",
      title: "夜场边的半句话",
      snippet: "双方留下的碎片被拼成一条短故事线：谁先停步、谁先开口，以及那句未说完的「你要是真的回来」。",
      imageLabel: "夜场边"
    },
    {
      time: "刚刚",
      title: "还未写完的下一章",
      snippet: "故事线在这里等你接上——下一次你们同时在线时，会从这条 AIGC 小故事继续长下去。",
      imageLabel: "下一章"
    }
  ],
  nova: [
    {
      time: "前一阵",
      title: "雪山坐标第一次重叠",
      snippet: "AIGC 把你们两条世界线交叠的瞬间写成了一小段：她提到夜路时，发现那正是你分身常走的那条。",
      imageLabel: "雪山"
    },
    {
      time: "待续",
      title: "故事线还在生长",
      snippet: "关系尚未沉淀到多段小故事，后续会随互动自动生成并接续。",
      imageLabel: "待续"
    }
  ]
};
