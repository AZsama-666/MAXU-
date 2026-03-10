import { useMemo } from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { AppShell } from "../../components/AppShell";
import { PhoneFrame } from "../../components/PhoneFrame";
import { bondHighlights, bondSummaries, zone2CompletionNotes, zone2FlowLinks } from "./data";

function matchFlowLink(pathname) {
  if (pathname.startsWith("/zone2/detail/")) {
    return zone2FlowLinks.find((item) => item.path.startsWith("/zone2/detail/"));
  }
  return zone2FlowLinks.find((item) => pathname.startsWith(item.path)) || zone2FlowLinks[0];
}

function useBond() {
  const { bondId = "zoe" } = useParams();
  return bondSummaries.find((item) => item.id === bondId) || bondSummaries[0];
}

export function Zone2Prototype() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentLink = useMemo(() => matchFlowLink(location.pathname), [location.pathname]);

  return (
    <div className="prototype-layout">
      <aside className="prototype-sidebar">
        <div className="sidebar-card">
          <span className="sidebar-eyebrow">MAXU Prototype</span>
          <h1>Zone2 关系</h1>
          <p>关系页在 MVP 里只回答一件事：谁已经开始影响你的这段人生。</p>
        </div>

        <div className="sidebar-card">
          <div className="sidebar-section-title">流程子页面</div>
          <div className="flow-link-list">
            {zone2FlowLinks.map((item) => (
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
            {zone2CompletionNotes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="prototype-stage">
        <div className="stage-head">
          <div>
            <span className="sidebar-eyebrow">Tab 2: Relation</span>
            <h2>Zone2: 关系</h2>
            <p>保留结构，不做深经营，先让用户感知谁已经在这段人生里占了位置。</p>
          </div>
          <div className="stage-badge zone-badge zone-badge-bonds">Relation</div>
        </div>

        <PhoneFrame>
          <Routes>
            <Route path="/" element={<Navigate to="/zone2/list" replace />} />
            <Route
              path="list"
              element={
                <BondListPage
                  onBack={() => navigate("/zone1/home")}
                  onOpenBond={(bondId) => navigate(`/zone2/detail/${bondId}`)}
                />
              }
            />
            <Route
              path="detail/:bondId"
              element={
                <BondDetailPage
                  onBack={() => navigate("/zone2/list")}
                  onGoMessages={() => navigate("/zone3/inbox")}
                />
              }
            />
            <Route path="*" element={<Navigate to="/zone2/list" replace />} />
          </Routes>
        </PhoneFrame>
      </main>
    </div>
  );
}

function BondListPage({ onBack, onOpenBond }) {
  return (
    <AppShell
      title="关系列表"
      subtitle="先保留最基础的关系存在感。"
      onBack={onBack}
      progress="13 / 17"
      bottomNav={{ activeTab: "relations" }}
    >
      <div className="zoneX-card-grid">
        {bondSummaries.map((item) => (
          <button
            key={item.id}
            type="button"
            className="home-card zoneX-button-card zone2-bond-card"
            onClick={() => onOpenBond(item.id)}
          >
            <span className="home-card-badge">{item.status}</span>
            <h4>{item.name}</h4>
            <p>{item.reason}</p>
            <div className="zone1-inline-meta">
              <span>{item.currentScene}</span>
              <span>{item.mood}</span>
            </div>
          </button>
        ))}
      </div>
    </AppShell>
  );
}

function BondDetailPage({ onBack, onGoMessages }) {
  const bond = useBond();
  const content = bondHighlights[bond.id];

  return (
    <AppShell
      title="关系详情"
      subtitle="只保留最关键的关系解释，不再展开完整经营链路。"
      onBack={onBack}
      progress="14 / 17"
      bottomNav={{ activeTab: "relations" }}
      primaryAction={{ label: "去消息继续承接", onClick: onGoMessages }}
      secondaryAction={{ label: "返回列表", onClick: onBack }}
    >
      <div className="home-card zone2-hero-card">
        <span className="home-card-badge">{bond.status}</span>
        <h4>{bond.name}</h4>
        <p>{bond.lastSignal}</p>
      </div>

      <div className="status-card">
        <strong>{content.title}</strong>
        <p>{content.summary}</p>
      </div>

      <div className="selection-list">
        {content.bullets.map((item) => (
          <div key={item} className="selection-item">
            <div>
              <strong>{item}</strong>
            </div>
            <span className="zone1-inline-tag">关系影响</span>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
