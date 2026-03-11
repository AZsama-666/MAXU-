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
      time: "三天前 · 夜",
      title: "引擎声里的第一句",
      snippet: "她先听到引擎声，然后想起 Zero 说过：想骑到看不见灯的地方去。那个晚上机车部的灯是亮的，她没走。",
      imageLabel: "机车部"
    },
    {
      time: "昨天凌晨",
      title: "夜场边的半句话",
      snippet: "谁先停步、谁先开口——AIGC 把这个时刻补全了：那句未说完的「你要是真的回来」，被写成了路灯下的两个背影。",
      imageLabel: "夜场边"
    },
    {
      time: "今晨",
      title: "留在广场上的一段话",
      snippet: "Zero 把今晨的状态发在了广场。Zoe 点了一个喜欢，没说话。AIGC 把这个动作写成：她在用沉默留下一个入口。",
      imageLabel: "广场留言"
    },
    {
      time: "刚刚",
      title: "还未写完的下一章",
      snippet: "故事线在这里等你接上。下一次你们同时在线，AI 会从这里继续把故事往前推进一段。",
      imageLabel: "下一章"
    }
  ],
  nova: [
    {
      time: "上周",
      title: "雪山坐标第一次重叠",
      snippet: "她说起夜路时，Zero 发现那正是自己分身常走的那条。AIGC 把这个重叠写成了一段：两条独行的线，悄悄靠近了一厘米。",
      imageLabel: "雪山营地"
    },
    {
      time: "三天前",
      title: "篝火边的对视",
      snippet: "雪山营地那晚，有人重新点亮了篝火边界。Nova 在广场发了那张照片，Zero 的分身路过时停了下来。AI 把这次停留记录成了第二段故事的开头。",
      imageLabel: "篝火夜"
    }
  ]
};
