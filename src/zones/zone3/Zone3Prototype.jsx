import { useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { AppShell } from "../../components/AppShell";
import { GlobalBottomNav } from "../../components/GlobalBottomNav";
import { PhoneFrame } from "../../components/PhoneFrame";
import {
  AI_GREETINGS_BY_STYLE,
  AI_REPLIES_BY_STYLE,
  AI_STYLES,
  basicChat,
  messageThreads,
  revealState,
  scenePresets,
  SCENE_ENTER_MAX,
  SCENE_REFRESH_MAX,
  sceneStoryPresets,
  zone3CompletionNotes,
  zone3FlowLinks
} from "./data";

function matchFlowLink(pathname) {
  return zone3FlowLinks.find((item) => pathname.startsWith(item.path)) || zone3FlowLinks[0];
}

export function Zone3Prototype() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentLink = useMemo(() => matchFlowLink(location.pathname), [location.pathname]);

  return (
    <div className="prototype-layout">
      <aside className="prototype-sidebar">
        <div className="sidebar-card">
          <span className="sidebar-eyebrow">MAXU Prototype</span>
          <h1>Zone3 消息</h1>
          <p>消息先做最基础的承接：看到谁、基础揭面、开始聊天。</p>
        </div>

        <div className="sidebar-card">
          <div className="sidebar-section-title">流程子页面</div>
          <div className="flow-link-list">
            {zone3FlowLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={
                  item.path === currentLink.path ? "flow-link flow-link-active" : "flow-link"
                }
              >
                <span>{item.label}</span>
                <span className="flow-link-type">{item.type}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="sidebar-card">
          <div className="sidebar-section-title">本轮收敛重点</div>
          <ul className="completion-list">
            {zone3CompletionNotes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="prototype-stage">
        <div className="stage-head">
          <div>
            <span className="sidebar-eyebrow">Tab 3: Message</span>
            <h2>Zone3: 消息</h2>
            <p>先保留最小路径，让命定之人和熟人关系都能被快速接住。</p>
          </div>
          <div className="stage-badge zone-badge zone-badge-messages">Message</div>
        </div>

        <PhoneFrame>
          <Routes>
            <Route path="/" element={<Navigate to="/zone3/inbox" replace />} />
            <Route
              path="inbox"
              element={
                <InboxPage
                  onBack={() => navigate("/zone1/home")}
                  onOpenReveal={() => navigate("/zone3/reveal")}
                  onOpenChat={() => navigate("/zone3/chat")}
                  onGoToRelation={(bondId) => navigate(`/zone2/detail/${bondId || "zoe"}`)}
                />
              }
            />
            <Route
              path="reveal"
              element={
                <RevealPage
                  onBack={() => navigate("/zone3/inbox")}
                  onNext={() => navigate("/zone3/chat")}
                />
              }
            />
            <Route
              path="chat"
              element={
                <ChatPage
                  onBack={() => navigate("/zone3/inbox")}
                  onGoRelation={() => navigate("/zone2/detail/zoe")}
                  onOpenSceneSelect={() => navigate("/zone3/scene-select")}
                />
              }
            />
            <Route
              path="scene-select"
              element={
                <SceneSelectPage
                  onBack={() => navigate("/zone3/chat")}
                  onSelectScene={(sceneId) => navigate(`/zone3/scene/${sceneId}`)}
                />
              }
            />
            <Route
              path="scene/:sceneId"
              element={
                <SceneRoomPage
                  onEndScene={() => navigate("/zone3/chat")}
                  onGoRelation={() => navigate("/zone2/detail/zoe")}
                />
              }
            />
            <Route path="*" element={<Navigate to="/zone3/inbox" replace />} />
          </Routes>
        </PhoneFrame>
      </main>
    </div>
  );
}

const INBOX_FILTERS = [
  { id: "reply", label: "回复我的", icon: "💬" },
  { id: "like", label: "赞和收藏", icon: "✦" },
  { id: "at", label: "@ 我", icon: "@" }
];

const PEER_NAME = "Zoe";

function InboxPage({ onBack, onOpenReveal, onOpenChat, onGoToRelation }) {
  const [activeFilter, setActiveFilter] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.trigger === "storyContinue") {
      const bondId = location.state?.bondId || null;
      navigate(location.pathname, { replace: true, state: {} });
      navigate("/zone3/chat", { state: { autoStory: true, bondId } });
    }
  }, [location.state?.trigger, location.state?.bondId, location.pathname, navigate]);

  return (
    <div className="zone3-inbox-page">
      {/* 标题区 */}
      <div className="zone3-inbox-header">
        <h2 className="zone3-inbox-title">消息</h2>
      </div>

      {/* 三个快捷筛选图标 */}
      <div className="zone3-inbox-filters">
        {INBOX_FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`zone3-filter-btn${activeFilter === f.id ? " zone3-filter-btn-active" : ""}`}
            onClick={() => setActiveFilter(activeFilter === f.id ? null : f.id)}
          >
            <span className="zone3-filter-icon">{f.icon}</span>
            <span className="zone3-filter-label">{f.label}</span>
          </button>
        ))}
      </div>

      {/* 会话列表 */}
      <div className="zone3-thread-list">
        {messageThreads.map((item) => (
          <button
            key={item.id}
            type="button"
            className="zone3-thread-row"
            onClick={item.type === "命定之人" ? onOpenReveal : onOpenChat}
          >
            <div
              className="zone3-thread-avatar"
              style={{ background: item.avatarColor }}
            >
              {item.avatarText}
              {item.unread > 0 && (
                <span className="zone3-thread-unread">{item.unread}</span>
              )}
            </div>
            <div className="zone3-thread-content">
              <span className="zone3-thread-name">
                {item.title}
                {item.type === "命定之人" && (
                  <span className="zone3-thread-countdown"> · {revealState.countdown}</span>
                )}
              </span>
              <span className="zone3-thread-preview">{item.preview}</span>
            </div>
            <span className="zone3-thread-time">{item.time}</span>
          </button>
        ))}
      </div>

      <div className="app-shell-footer-stack">
        <GlobalBottomNav activeTab="messages" />
      </div>
    </div>
  );
}

function RevealPage({ onBack, onNext }) {
  return (
    <AppShell
      title="基础揭面"
      subtitle="先保留基本反馈，关系深化以后再长。"
      onBack={onBack}
      progress="16 / 17"
      bottomNav={{ activeTab: "messages" }}
      primaryAction={{ label: "开始聊天", onClick: onNext }}
      secondaryAction={{ label: "返回消息", onClick: onBack }}
    >
      <div className="home-card zone3-unmask-card">
        <span className="home-card-badge">命定之人</span>
        <h4>{revealState.title}</h4>
        <p>{revealState.desc}</p>
      </div>

      <div className="status-card">
        <strong>剩余时间</strong>
        <p>{revealState.countdown}</p>
      </div>

      <div className="field-card">
        <strong>当前结果</strong>
        <p className="zone1-copy-muted">{revealState.result}</p>
      </div>
    </AppShell>
  );
}

const CHAT_PLUS_ITEMS = [
  { id: "photo", icon: "🖼", label: "照片" },
  { id: "capture", icon: "📷", label: "拍摄" },
  { id: "location", icon: "📍", label: "位置" },
  { id: "voice", icon: "🎤", label: "语音输入" },
  { id: "favorite", icon: "📦", label: "收藏" },
  { id: "card", icon: "👤", label: "个人名片" },
  { id: "file", icon: "📁", label: "文件" },
  { id: "music", icon: "🎵", label: "音乐" },
  { id: "storyContinue", icon: "📖", label: "发起续写" },
  { id: "virtualScene", icon: "🎭", label: "虚拟场景" }
];

let _storyMsgIdCounter = 0;
function makeStoryRequestMsg(initiator) {
  _storyMsgIdCounter += 1;
  return { role: "storyRequest", id: `story-${_storyMsgIdCounter}`, state: "pending", initiator };
}

function StoryRequestCard({ msg, onUpdateState, onGoRelation }) {
  const { state, initiator, id } = msg;

  const update = (newState) => {
    onUpdateState(id, newState);
  };

  if (state === "pending") {
    return (
      <div className="zone3-story-request-card zone3-story-request-pending">
        <p className="zone3-src-label">📖 续写邀请</p>
        <p className="zone3-src-title">{initiator} 邀请你一起续写故事</p>
        <p className="zone3-src-hint">双方同意后，240 分钟后自动生成故事并归入关系页</p>
        <div className="zone3-src-actions">
          <button type="button" className="zone3-src-btn zone3-src-no" onClick={() => update("rejected")}>
            NO
          </button>
          <button type="button" className="zone3-src-btn zone3-src-yes" onClick={() => update("countdown")}>
            YES
          </button>
        </div>
      </div>
    );
  }

  if (state === "countdown") {
    return (
      <button
        type="button"
        className="zone3-story-request-card zone3-story-request-countdown"
        onClick={() => update("done")}
      >
        <p className="zone3-src-label">⏳ 续写中</p>
        <p className="zone3-src-countdown">240 分钟</p>
        <p className="zone3-src-hint">点击此处完成（模拟 240 分钟后）</p>
      </button>
    );
  }

  if (state === "done") {
    return (
      <div className="zone3-story-request-card zone3-story-request-done">
        <p className="zone3-src-label">✓ 故事已生成</p>
        <p className="zone3-src-title">已归入关系页</p>
        <button type="button" className="zone3-src-btn zone3-src-go" onClick={onGoRelation}>
          去关系页看看
        </button>
      </div>
    );
  }

  if (state === "rejected") {
    return (
      <div className="zone3-story-request-card zone3-story-request-rejected">
        <p className="zone3-src-label">续写邀请</p>
        <p className="zone3-src-title">已拒绝</p>
      </div>
    );
  }

  return null;
}

function ChatPage({ onBack, onGoRelation, onOpenSceneSelect }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [plusOpen, setPlusOpen] = useState(false);
  const [messages, setMessages] = useState(basicChat);
  const [inputText, setInputText] = useState("");
  const [lightbulbOpen, setLightbulbOpen] = useState(false);
  const [aiStyle, setAiStyle] = useState("default");
  const nextSendAiAssisted = useRef(false);

  const hasUserSent = messages.some((m) => m.role === "你");
  const greetingLines = AI_GREETINGS_BY_STYLE[aiStyle] || AI_GREETINGS_BY_STYLE.default;
  const replySets = AI_REPLIES_BY_STYLE[aiStyle] || AI_REPLIES_BY_STYLE.default;
  const replyLines = replySets[0] || ["嗯嗯", "有道理", "然后呢？"];

  const fillFromAi = (text) => {
    setInputText(text);
    nextSendAiAssisted.current = true;
    setLightbulbOpen(false);
  };

  const handleSendMessage = () => {
    const t = inputText.trim();
    if (!t) return;
    const aiAssisted = nextSendAiAssisted.current;
    nextSendAiAssisted.current = false;
    setMessages((prev) => [...prev, { role: "你", text: t, ...(aiAssisted ? { aiAssisted: true } : {}) }]);
    setInputText("");
  };

  useEffect(() => {
    if (location.state?.autoStory) {
      navigate(location.pathname, { replace: true, state: {} });
      setMessages((prev) => [...prev, makeStoryRequestMsg("你")]);
    }
  }, [location.state?.autoStory, location.pathname, navigate]);

  const updateStoryMsgState = (id, newState) => {
    setMessages((prev) =>
      prev.map((m) => (m.role === "storyRequest" && m.id === id ? { ...m, state: newState } : m))
    );
  };

  const handlePlusItem = (item) => {
    setPlusOpen(false);
    if (item.id === "storyContinue") {
      setMessages((prev) => [...prev, makeStoryRequestMsg("你")]);
      return;
    }
    if (item.id === "virtualScene") {
      onOpenSceneSelect?.();
      return;
    }
    if (item.id === "photo" || item.id === "capture") {
      setMessages((prev) => [...prev, { role: "你", text: `[已发送${item.label}]` }]);
    } else if (item.id === "voice") {
      setMessages((prev) => [...prev, { role: "你", text: "[语音消息]" }]);
    } else {
      setMessages((prev) => [...prev, { role: "你", text: `[${item.label}]` }]);
    }
  };

  return (
    <AppShell
      title="基础聊天"
      subtitle="MVP 先证明你已经能接住这段关系。"
      onBack={onBack}
      progress="17 / 17"
      bottomNav={{ activeTab: "messages" }}
      primaryAction={{ label: "回到关系页", onClick: onGoRelation }}
      secondaryAction={{ label: "返回消息", onClick: onBack }}
    >
      <div className="zone3-chat-page-wrap">
        <div className="zoneX-chat-list zone3-chat-list">
          {messages.map((item, index) => {
            if (item.role === "storyRequest") {
              return (
                <StoryRequestCard
                  key={item.id}
                  msg={item}
                  onUpdateState={updateStoryMsgState}
                  onGoRelation={onGoRelation}
                />
              );
            }
            return (
              <div
                key={`${item.role}-${index}`}
                className={
                  item.role === "你"
                    ? "zoneX-chat-bubble zoneX-chat-self"
                    : item.role === "system"
                      ? "zoneX-chat-bubble zoneX-chat-system"
                      : "zoneX-chat-bubble"
                }
              >
                <div className="zone3-chat-bubble-head">
                  {item.role !== "system" && <strong>{item.role}</strong>}
                  {item.aiAssisted && <span className="zone3-ai-tag">AI</span>}
                </div>
                <p>{item.text}</p>
              </div>
            );
          })}
        </div>

        {!hasUserSent && (
          <div className="zone3-ai-greeting-area">
            <p className="zone3-ai-greeting-hint">灵感回复可提升回复率哦</p>
            <div className="zone3-ai-style-tabs">
              {AI_STYLES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`zone3-ai-style-tab${aiStyle === s.id ? " zone3-ai-style-tab-active" : ""}`}
                  onClick={() => setAiStyle(s.id)}
                >
                  {s.icon} {s.label}
                </button>
              ))}
            </div>
            <div className="zone3-ai-suggestions">
              {greetingLines.map((line, i) => (
                <button key={i} type="button" className="zone3-ai-suggestion-card" onClick={() => fillFromAi(line)}>
                  {line}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="zone3-chat-input-bar">
          <button type="button" className="zone3-chat-input-icon" aria-label="语音">
            🎙
          </button>
          <input
            type="text"
            className="zone3-chat-input-field"
            placeholder="输入消息"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button type="button" className="zone3-chat-input-icon zone3-chat-input-send" onClick={handleSendMessage}>
            发送
          </button>
          <button
            type="button"
            className="zone3-chat-input-icon zone3-chat-input-lightbulb"
            aria-label="灵感回复"
            onClick={() => setLightbulbOpen((v) => !v)}
            title="灵感回复"
          >
            💡
          </button>
          <button type="button" className="zone3-chat-input-icon" aria-label="表情">
            😊
          </button>
          <button
            type="button"
            className="zone3-chat-input-plus"
            aria-label="更多"
            onClick={() => setPlusOpen((v) => !v)}
          >
            +
          </button>
        </div>

        {lightbulbOpen && (
          <div className="zone3-lightbulb-overlay" onClick={() => setLightbulbOpen(false)}>
            <div className="zone3-lightbulb-panel" onClick={(e) => e.stopPropagation()}>
              <p className="zone3-lightbulb-title">灵感回复</p>
              <div className="zone3-ai-style-tabs zone3-lightbulb-styles">
                {AI_STYLES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`zone3-ai-style-tab${aiStyle === s.id ? " zone3-ai-style-tab-active" : ""}`}
                    onClick={() => setAiStyle(s.id)}
                  >
                    {s.icon} {s.label}
                  </button>
                ))}
              </div>
              <div className="zone3-ai-suggestions">
                {replyLines.map((line, i) => (
                  <button key={i} type="button" className="zone3-ai-suggestion-card" onClick={() => fillFromAi(line)}>
                    {line}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {plusOpen && (
          <div className="zone3-chat-plus-overlay" onClick={() => setPlusOpen(false)}>
            <div className="zone3-chat-plus-grid zone3-chat-plus-grid-9" onClick={(e) => e.stopPropagation()}>
              {CHAT_PLUS_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="zone3-chat-plus-item"
                  onClick={() => handlePlusItem(item)}
                >
                  <span className="zone3-chat-plus-icon">{item.icon}</span>
                  <span className="zone3-chat-plus-label">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

function shuffleArr(arr) {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function SceneSelectPage({ onBack, onSelectScene }) {
  const [displayScenes, setDisplayScenes] = useState(scenePresets);
  const [refreshLeft, setRefreshLeft] = useState(SCENE_REFRESH_MAX);
  const [enterLeft, setEnterLeft] = useState(SCENE_ENTER_MAX);

  const handleRefresh = () => {
    if (refreshLeft <= 0) return;
    setRefreshLeft((n) => n - 1);
    setDisplayScenes(shuffleArr(scenePresets));
  };

  const handleSelectScene = (sceneId) => {
    if (enterLeft <= 0) return;
    setEnterLeft((n) => n - 1);
    onSelectScene(sceneId);
  };

  return (
    <AppShell
      title="虚拟场景"
      subtitle="选择场景与剧本，AI 会给出话题提示，可随时结束。"
      onBack={onBack}
      progress="场景"
      primaryAction={undefined}
    >
      <div className="zone3-scene-select-meta">
        <span className="zone3-scene-enter-count">进入剧本 剩余 {enterLeft} 次</span>
      </div>
      <div className="zone3-scene-select-list">
        {displayScenes.map((scene) => (
          <button
            key={scene.id}
            type="button"
            className={`zone3-scene-select-card${enterLeft <= 0 ? " zone3-scene-select-card-disabled" : ""}`}
            onClick={() => handleSelectScene(scene.id)}
            disabled={enterLeft <= 0}
          >
            <span className="zone3-scene-select-name">{scene.name}</span>
            <p className="zone3-scene-select-intro">{scene.intro}</p>
          </button>
        ))}
      </div>
      <button
        type="button"
        className={`zone3-scene-refresh-btn${refreshLeft <= 0 ? " zone3-scene-refresh-btn-disabled" : ""}`}
        onClick={handleRefresh}
        disabled={refreshLeft <= 0}
      >
        换一批场景
        <span className="zone3-scene-refresh-count">
          {refreshLeft > 0 ? `剩余 ${refreshLeft} 次` : "今日已用完"}
        </span>
      </button>
    </AppShell>
  );
}

function SceneRoomPage({ onEndScene, onGoRelation }) {
  const { sceneId } = useParams();
  const scene = scenePresets.find((s) => s.id === sceneId) || scenePresets[0];
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showStoryResult, setShowStoryResult] = useState(false);
  const [lightbulbOpen, setLightbulbOpen] = useState(false);
  const [aiStyle, setAiStyle] = useState("default");
  const nextSendAiAssisted = useRef(false);

  const hasUserSent = messages.some((m) => m.role === "你");
  const greetingLines = AI_GREETINGS_BY_STYLE[aiStyle] || AI_GREETINGS_BY_STYLE.default;
  const replySets = AI_REPLIES_BY_STYLE[aiStyle] || AI_REPLIES_BY_STYLE.default;
  const replyLines = replySets[0] || ["嗯嗯", "有道理", "然后呢？"];

  const fillFromAi = (text) => {
    setInputText(text);
    nextSendAiAssisted.current = true;
    setLightbulbOpen(false);
  };

  const handleSend = () => {
    const t = inputText.trim();
    if (!t) return;
    const aiAssisted = nextSendAiAssisted.current;
    nextSendAiAssisted.current = false;
    setMessages((prev) => [...prev, { role: "你", text: t, ...(aiAssisted ? { aiAssisted: true } : {}) }]);
    setInputText("");
  };

  const storyResult =
    sceneStoryPresets.find((s) => s.sceneId === scene.id) ||
    sceneStoryPresets[Math.floor(Math.random() * sceneStoryPresets.length)];

  const handleEndScene = () => {
    setShowStoryResult(true);
  };

  const handleCloseStory = () => {
    setShowStoryResult(false);
    onEndScene();
  };

  return (
    <AppShell
      title={scene.name}
      subtitle="AI 主持 · 可随时结束"
      onBack={onEndScene}
      progress="场景中"
      primaryAction={{ label: "结束场景", onClick: handleEndScene }}
    >
      <div className="zone3-scene-room-wrap">
        <div className="zone3-scene-room">
          <div className="zone3-scene-room-intro">
            <span className="zone3-scene-room-badge">剧本</span>
            <p className="zone3-scene-room-prompt">{scene.intro}</p>
          </div>
          <p className="zone3-scene-room-hint">在此与对方自由聊天，AI 会适时插入话题提示。本场可随时结束。</p>

          {messages.length > 0 && (
            <div className="zone3-scene-room-messages">
              {messages.map((item, index) => (
                <div
                  key={index}
                  className={item.role === "你" ? "zoneX-chat-bubble zoneX-chat-self" : "zoneX-chat-bubble"}
                >
                  <div className="zone3-chat-bubble-head">
                    {item.role !== "你" && <strong>{item.role}</strong>}
                    {item.aiAssisted && <span className="zone3-ai-tag">AI</span>}
                  </div>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          )}

          {!hasUserSent && (
            <div className="zone3-ai-greeting-area">
              <p className="zone3-ai-greeting-hint">灵感回复可提升回复率哦</p>
              <div className="zone3-ai-style-tabs">
                {AI_STYLES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`zone3-ai-style-tab${aiStyle === s.id ? " zone3-ai-style-tab-active" : ""}`}
                    onClick={() => setAiStyle(s.id)}
                  >
                    {s.icon} {s.label}
                  </button>
                ))}
              </div>
              <div className="zone3-ai-suggestions">
                {greetingLines.map((line, i) => (
                  <button key={i} type="button" className="zone3-ai-suggestion-card" onClick={() => fillFromAi(line)}>
                    {line}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="zone3-scene-room-input-bar">
            <input
              type="text"
              className="zone3-scene-room-input"
              placeholder="输入消息"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button type="button" className="zone3-chat-input-icon zone3-chat-input-lightbulb" aria-label="灵感回复" onClick={() => setLightbulbOpen((v) => !v)} title="灵感回复">
              💡
            </button>
            <button type="button" className="zone3-scene-room-send" onClick={handleSend}>
              发送
            </button>
          </div>

          {lightbulbOpen && (
            <div className="zone3-lightbulb-overlay" onClick={() => setLightbulbOpen(false)}>
              <div className="zone3-lightbulb-panel" onClick={(e) => e.stopPropagation()}>
                <p className="zone3-lightbulb-title">灵感回复</p>
                <div className="zone3-ai-style-tabs zone3-lightbulb-styles">
                  {AI_STYLES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      className={`zone3-ai-style-tab${aiStyle === s.id ? " zone3-ai-style-tab-active" : ""}`}
                      onClick={() => setAiStyle(s.id)}
                    >
                      {s.icon} {s.label}
                    </button>
                  ))}
                </div>
                <div className="zone3-ai-suggestions">
                  {replyLines.map((line, i) => (
                    <button key={i} type="button" className="zone3-ai-suggestion-card" onClick={() => fillFromAi(line)}>
                      {line}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showStoryResult && (
        <div className="zone3-scene-story-overlay" onClick={handleCloseStory}>
          <div className="zone3-scene-story-card" onClick={(e) => e.stopPropagation()}>
            <p className="zone3-scene-story-title">AIGC 纪念</p>
            <h3 className="zone3-scene-story-heading">{storyResult.title}</h3>
            <div
              className="zone3-scene-story-thumb"
              style={{ ["--thumb-label"]: `"${(storyResult.imageLabel || "故事").slice(0, 4)}"` }}
            />
            <p className="zone3-scene-story-snippet">{storyResult.snippet}</p>
            <div className="zone3-scene-story-actions">
              {onGoRelation && (
                <button type="button" className="zone3-scene-story-btn zone3-scene-story-primary" onClick={() => { setShowStoryResult(false); onGoRelation?.(); }}>
                  去关系页
                </button>
              )}
              <button type="button" className="zone3-scene-story-btn" onClick={handleCloseStory}>
                返回聊天
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
