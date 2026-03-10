import { useMemo } from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AppShell } from "../../components/AppShell";
import { PhoneFrame } from "../../components/PhoneFrame";
import { fateState, homeSnapshot, plazaFeed, twinReport, zone1CompletionNotes, zone1FlowLinks } from "./data";

function matchFlowLink(pathname) {
  return zone1FlowLinks.find((item) => pathname.startsWith(item.path)) || zone1FlowLinks[0];
}

export function Zone1Prototype() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentLink = useMemo(() => matchFlowLink(location.pathname), [location.pathname]);

  return (
    <div className="prototype-layout">
      <aside className="prototype-sidebar">
        <div className="sidebar-card">
          <span className="sidebar-eyebrow">MAXU Prototype</span>
          <h1>Zone1 首页</h1>
          <p>v3.0 首页只保留一句状态、两个有效去向和一个下线入口，先让用户快速做决定。</p>
        </div>

        <div className="sidebar-card">
          <div className="sidebar-section-title">流程子页面</div>
          <div className="flow-link-list">
            {zone1FlowLinks.map((item) => (
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
            {zone1CompletionNotes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="prototype-stage">
        <div className="stage-head">
          <div>
            <span className="sidebar-eyebrow">Tab 1: Home</span>
            <h2>Zone1: 接管分身此刻</h2>
            <p>不再用长剧情解释首页，而是直接让用户知道：分身现在在做什么，接下来去哪。</p>
          </div>
          <div className="stage-badge">MVP Home</div>
        </div>

        <PhoneFrame>
          <Routes>
            <Route path="/" element={<Navigate to="/zone1/opening" replace />} />
            <Route
              path="opening"
              element={
                <OpeningPage
                  onBack={() => navigate("/zone0/identity")}
                  onNext={() => navigate("/zone1/home")}
                />
              }
            />
            <Route
              path="home"
              element={
                <HomePage
                  onBack={() => navigate("/zone0/identity")}
                  onOpenFate={() => navigate("/zone1/fate")}
                  onOpenPlaza={() => navigate("/zone1/plaza")}
                  onOpenMine={() => navigate("/zone4/hub")}
                />
              }
            />
            <Route
              path="fate"
              element={
                <FatePage
                  onBack={() => navigate("/zone1/home")}
                  onOpenMessages={() => navigate("/zone3/reveal")}
                />
              }
            />
            <Route
              path="plaza"
              element={<PlazaPage onBack={() => navigate("/zone1/home")} />}
            />
            <Route path="*" element={<Navigate to="/zone1/opening" replace />} />
          </Routes>
        </PhoneFrame>
      </main>
    </div>
  );
}

function OpeningPage({ onBack, onNext }) {
  return (
    <AppShell
      title="你的分身已经重新上线"
      subtitle="先接住此刻，再决定今晚要往哪里走。"
      onBack={onBack}
      dark
      progress="09 / 12"
      footerTone="dark"
      primaryAction={{ label: "进入首页", onClick: onNext }}
    >
      <div className="cosmic-panel zone1-panel-glow">
        <div className="zone1-hero-icon">◎</div>
        <span className="dark-badge">上线 = 接管分身</span>
        <h3>{homeSnapshot.twinName} 已经开始今晚的人生</h3>
        <p>{homeSnapshot.sentence}</p>
      </div>
    </AppShell>
  );
}

function HomePage({ onBack, onOpenFate, onOpenPlaza, onOpenMine }) {
  return (
    <AppShell
      title="首页"
      subtitle="一句状态，一个决定。"
      onBack={onBack}
      progress="10 / 12"
    >
      <div className="home-card zone1-life-card-soft">
        <span className="home-card-badge">分身此刻</span>
        <h4>{homeSnapshot.twinName}</h4>
        <p>{homeSnapshot.sentence}</p>
        <div className="zone1-inline-meta">
          <span>{homeSnapshot.scene}</span>
          <span>{homeSnapshot.mood}</span>
        </div>
      </div>

      <div className="home-card zone1-report-card">
        <span className="home-card-badge">{twinReport.title}</span>
        <p className="zone1-report-period">{twinReport.period}</p>
        <div className="zone1-report-stats">
          {twinReport.items.map((item) => (
            <div key={item.label} className="zone1-report-stat">
              <span className="zone1-report-value">{item.value}{item.unit}</span>
              <span className="zone1-report-label">{item.label}</span>
            </div>
          ))}
        </div>
        <p className="zone1-copy-muted zone1-report-hint">{twinReport.hint}</p>
      </div>

      <div className="status-card">
        <strong>当前状态</strong>
        <p>{homeSnapshot.status}</p>
      </div>

      <div className="zone1-quick-nav-grid">
        <button type="button" className="ghost-button" onClick={onOpenFate}>
          见命定之人
        </button>
        <button type="button" className="ghost-button" onClick={onOpenPlaza}>
          逛广场
        </button>
        <button type="button" className="ghost-button" onClick={onOpenMine}>
          下线前去向
        </button>
      </div>
    </AppShell>
  );
}

function FatePage({ onBack, onOpenMessages }) {
  return (
    <AppShell
      title="命定之人"
      subtitle="单条呈现，不做列表堆叠。"
      onBack={onBack}
      dark
      progress="11 / 12"
      bottomNav={{ activeTab: "home" }}
      footerTone="dark"
      primaryAction={
        fateState.available ? { label: fateState.card.cta, onClick: onOpenMessages } : undefined
      }
      secondaryAction={{ label: "返回首页", onClick: onBack }}
    >
      {fateState.available ? (
        <>
          <div className="zone1-fate-card zone1-fate-card-left">
            <div className="zone1-card-copy">
              <span className="zone1-pill">{fateState.card.tag}</span>
              <h4>{fateState.card.name}</h4>
              <p>{fateState.card.title}</p>
            </div>
          </div>
          <div className="field-card field-card-dark zone1-fate-countdown">
            <strong>{fateState.card.countdown}</strong>
            <p className="zone1-fate-miss">{fateState.missHint}</p>
            <p className="zone1-copy-muted">{fateState.card.story}</p>
            <p className="zone1-fate-push-note">{fateState.pushCycleNote}</p>
          </div>
        </>
      ) : (
        <div className="field-card field-card-dark">
          <strong>{fateState.emptyTitle}</strong>
          <p className="zone1-copy-muted">{fateState.emptyDesc}</p>
        </div>
      )}
    </AppShell>
  );
}

function PlazaPage({ onBack }) {
  return (
    <AppShell
      title="广场"
      subtitle="只保留浏览，用来证明世界还在发生。"
      onBack={onBack}
      progress="12 / 12"
      bottomNav={{ activeTab: "home" }}
      primaryAction={{ label: "返回首页", onClick: onBack }}
    >
      <div className="zone1-feed-list">
        {plazaFeed.map((post) => (
          <div key={post.id} className="zone1-feed-card zone1-feed-card-muted">
            <div className="zone1-feed-head">
              <div className="zone1-feed-avatar">{post.author.slice(0, 1)}</div>
              <div className="zone1-feed-meta">
                <strong>{post.author}</strong>
                <span>
                  {post.scene} · {post.time}
                </span>
              </div>
            </div>
            <h4>{post.title}</h4>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
