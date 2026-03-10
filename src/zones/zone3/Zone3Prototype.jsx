import { useMemo } from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AppShell } from "../../components/AppShell";
import { PhoneFrame } from "../../components/PhoneFrame";
import {
  blindboxDialogue,
  bondedDialogue,
  messageThreads,
  transitionSummary,
  unmaskingState,
  zone3CompletionNotes,
  zone3FlowLinks
} from "./data";

function matchFlowLink(pathname) {
  if (pathname.startsWith("/zone3/blindbox/")) {
    return zone3FlowLinks.find((item) => item.path.startsWith("/zone3/blindbox/"));
  }
  if (pathname.startsWith("/zone3/bonded/")) {
    return zone3FlowLinks.find((item) => item.path.startsWith("/zone3/bonded/"));
  }
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
          <p>消息承接的是沟通，不是世界本体。它必须把用户重新送回关系推进和场景主线。</p>
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
          <div className="sidebar-section-title">本轮重构重点</div>
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
            <span className="sidebar-eyebrow">Tab 3: Messages</span>
            <h2>Zone3: 沟通承接层</h2>
            <p>这里承接接管后真正发生的对话，但不取代关系页、场景页和世界主线。</p>
          </div>
          <div className="stage-badge zone-badge zone-badge-messages">Message Flow</div>
        </div>

        <PhoneFrame>
          <Routes>
            <Route path="/" element={<Navigate to="/zone3/inbox" replace />} />
            <Route
              path="inbox"
              element={
                <InboxPage
                  onBack={() => navigate("/zone2/list")}
                  onOpenBlindbox={() => navigate("/zone3/blindbox/echo-k")}
                  onOpenBonded={() => navigate("/zone3/bonded/zoe")}
                />
              }
            />
            <Route
              path="blindbox/:threadId"
              element={
                <BlindboxPage
                  onBack={() => navigate("/zone3/inbox")}
                  onNext={() => navigate("/zone3/unmask")}
                />
              }
            />
            <Route
              path="unmask"
              element={
                <UnmaskPage
                  onBack={() => navigate("/zone3/blindbox/echo-k")}
                  onNext={() => navigate("/zone3/transition")}
                />
              }
            />
            <Route
              path="bonded/:threadId"
              element={
                <BondedChatPage
                  onBack={() => navigate("/zone3/inbox")}
                  onNext={() => navigate("/zone3/transition")}
                />
              }
            />
            <Route
              path="transition"
              element={
                <TransitionPage
                  onBack={() => navigate("/zone3/inbox")}
                  onGoZone2={() => navigate("/zone2/detail/zoe")}
                  onGoZone5={() => navigate("/zone5/scene/motor-club")}
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

function InboxPage({ onBack, onOpenBlindbox, onOpenBonded }) {
  return (
    <AppShell
      title="混合消息列表"
      subtitle="这里同时承接游离态试探和羁绊态沟通，但它们不应被做成同一种普通聊天。"
      onBack={onBack}
      progress="33 / 37"
      bottomNav={{ activeTab: "messages" }}
      primaryAction={{ label: "打开游离态盲盒聊天室", onClick: onOpenBlindbox }}
      secondaryAction={{ label: "打开羁绊态正式聊天", onClick: onOpenBonded }}
    >
      <div className="zoneX-card-grid">
        {messageThreads.map((item) => (
          <button
            key={item.id}
            type="button"
            className="home-card zoneX-button-card zone3-thread-card"
            onClick={item.type === "游离态" ? onOpenBlindbox : onOpenBonded}
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

function BlindboxPage({ onBack, onNext }) {
  return (
    <AppShell
      title="游离态盲盒聊天室"
      subtitle="游离态沟通的重点不是聊得久，而是保留试探、克制和世界线重叠感。"
      onBack={onBack}
      dark
      progress="34 / 37"
      bottomNav={{ activeTab: "messages" }}
      footerTone="dark"
      primaryAction={{ label: "去 72 小时揭面中心", onClick: onNext }}
    >
      <div className="zoneX-chat-list zone3-chat-list">
        {blindboxDialogue.map((item, index) => (
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

function UnmaskPage({ onBack, onNext }) {
  return (
    <AppShell
      title="72 小时揭面中心"
      subtitle="揭面不是为了结束神秘，而是为了把一条仍在发生中的世界线推进进正式关系层。"
      onBack={onBack}
      progress="35 / 37"
      bottomNav={{ activeTab: "messages" }}
      primaryAction={{ label: "继续到关系切换提示", onClick: onNext }}
    >
      <div className="home-card zone3-unmask-card">
        <span className="home-card-badge">陌生关系高光</span>
        <h4>{unmaskingState.title}</h4>
        <p>{unmaskingState.desc}</p>
      </div>

      <div className="status-card">
        <strong>剩余时间</strong>
        <p>{unmaskingState.countdown}</p>
      </div>

      <div className="field-card">
        <strong>触发条件</strong>
        <p className="zone1-copy-muted">{unmaskingState.trigger}</p>
      </div>
    </AppShell>
  );
}

function BondedChatPage({ onBack, onNext }) {
  return (
    <AppShell
      title="羁绊态正式聊天室"
      subtitle="一旦关系进入羁绊层，消息就不再只是试探，而会反过来改变后续主线。"
      onBack={onBack}
      progress="36 / 37"
      bottomNav={{ activeTab: "messages" }}
      primaryAction={{ label: "看这段关系如何回流主线", onClick: onNext }}
    >
      <div className="zoneX-chat-list zone3-chat-list">
        {bondedDialogue.map((item, index) => (
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

function TransitionPage({ onBack, onGoZone2, onGoZone5 }) {
  return (
    <AppShell
      title="关系切换提示"
      subtitle="消息最终的职责，是把用户重新送回关系页和场景页，而不是自己变成终点。"
      onBack={onBack}
      dark
      progress="37 / 37"
      bottomNav={{ activeTab: "messages" }}
      footerTone="dark"
      primaryAction={{ label: "回到羁绊主页", onClick: onGoZone2 }}
      secondaryAction={{ label: "去场景里继续推进", onClick: onGoZone5 }}
    >
      <div className="cosmic-panel zone3-transition-panel">
        <span className="dark-badge">沟通承接已完成</span>
        <h3>{transitionSummary.title}</h3>
        <p>{transitionSummary.desc}</p>
      </div>

      <div className="zone1-quick-nav-grid">
        <button type="button" className="ghost-button ghost-button-dark" onClick={onGoZone2}>
          回关系主页
        </button>
        <button type="button" className="ghost-button ghost-button-dark" onClick={onGoZone5}>
          去场景继续推进
        </button>
      </div>
    </AppShell>
  );
}
