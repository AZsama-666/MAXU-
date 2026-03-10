import { useMemo } from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AppShell } from "../../components/AppShell";
import { PhoneFrame } from "../../components/PhoneFrame";
import { basicChat, messageThreads, revealState, zone3CompletionNotes, zone3FlowLinks } from "./data";

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

function InboxPage({ onBack, onOpenReveal, onOpenChat }) {
  return (
    <AppShell
      title="消息列表"
      subtitle="先知道谁在等你，再决定要不要继续。"
      onBack={onBack}
      progress="15 / 17"
      bottomNav={{ activeTab: "messages" }}
    >
      <div className="zoneX-card-grid">
        {messageThreads.map((item) => (
          <button
            key={item.id}
            type="button"
            className="home-card zoneX-button-card zone3-thread-card"
            onClick={item.type === "命定之人" ? onOpenReveal : onOpenChat}
          >
            <span className="home-card-badge">{item.type}</span>
            <h4>{item.title}</h4>
            <p>{item.preview}</p>
            <div className="zone1-inline-meta">
              <span>{item.status}</span>
              <span>{item.routeHint}</span>
            </div>
          </button>
        ))}
      </div>
    </AppShell>
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

function ChatPage({ onBack, onGoRelation }) {
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
      <div className="zoneX-chat-list zone3-chat-list">
        {basicChat.map((item, index) => (
          <div
            key={`${item.role}-${index}`}
            className={item.role === "你" ? "zoneX-chat-bubble zoneX-chat-self" : "zoneX-chat-bubble"}
          >
            <strong>{item.role}</strong>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
