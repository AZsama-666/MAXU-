import { useMemo } from "react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";
import { AppShell } from "../../components/AppShell";
import { PhoneFrame } from "../../components/PhoneFrame";
import {
  bondGenesis,
  bondPermissions,
  bondSummaries,
  bondTimeline,
  coTravelPlans,
  zone2CompletionNotes,
  zone2FlowLinks
} from "./data";

function matchFlowLink(pathname) {
  if (pathname.startsWith("/zone2/detail/")) {
    return zone2FlowLinks.find((item) => item.path.startsWith("/zone2/detail/"));
  }
  if (pathname.startsWith("/zone2/genesis/")) {
    return zone2FlowLinks.find((item) => item.path.startsWith("/zone2/genesis/"));
  }
  if (pathname.startsWith("/zone2/timeline/")) {
    return zone2FlowLinks.find((item) => item.path.startsWith("/zone2/timeline/"));
  }
  if (pathname.startsWith("/zone2/cotravel/")) {
    return zone2FlowLinks.find((item) => item.path.startsWith("/zone2/cotravel/"));
  }
  if (pathname.startsWith("/zone2/permissions/")) {
    return zone2FlowLinks.find((item) => item.path.startsWith("/zone2/permissions/"));
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
          <h1>Zone2 羁绊</h1>
          <p>这里展示的不是联系人列表，而是会反向影响你人生主线和下一次上线入口的关系世界。</p>
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
          <div className="sidebar-section-title">本轮重构重点</div>
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
            <span className="sidebar-eyebrow">Tab 2: Bonds</span>
            <h2>Zone2: 关系存在感中心</h2>
            <p>羁绊不是通讯录，而是“谁正在改变我人生主线”的关系层。</p>
          </div>
          <div className="stage-badge zone-badge zone-badge-bonds">Bonded World</div>
        </div>

        <PhoneFrame>
          <Routes>
            <Route path="/" element={<Navigate to="/zone2/list" replace />} />
            <Route
              path="list"
              element={
                <BondListPage
                  onBack={() => navigate("/zone1/close-updates")}
                  onOpenBond={(bondId) => navigate(`/zone2/detail/${bondId}`)}
                />
              }
            />
            <Route
              path="detail/:bondId"
              element={
                <BondDetailPage
                  onBack={() => navigate("/zone2/list")}
                  onGoGenesis={(bondId) => navigate(`/zone2/genesis/${bondId}`)}
                  onGoTimeline={(bondId) => navigate(`/zone2/timeline/${bondId}`)}
                />
              }
            />
            <Route
              path="genesis/:bondId"
              element={
                <GenesisPage
                  onBack={(bondId) => navigate(`/zone2/detail/${bondId}`)}
                  onNext={(bondId) => navigate(`/zone2/timeline/${bondId}`)}
                />
              }
            />
            <Route
              path="timeline/:bondId"
              element={
                <TimelinePage
                  onBack={(bondId) => navigate(`/zone2/genesis/${bondId}`)}
                  onNext={(bondId) => navigate(`/zone2/cotravel/${bondId}`)}
                />
              }
            />
            <Route
              path="cotravel/:bondId"
              element={
                <CoTravelPage
                  onBack={(bondId) => navigate(`/zone2/timeline/${bondId}`)}
                  onNext={(bondId) => navigate(`/zone2/permissions/${bondId}`)}
                />
              }
            />
            <Route
              path="permissions/:bondId"
              element={
                <PermissionsPage
                  onBack={(bondId) => navigate(`/zone2/cotravel/${bondId}`)}
                  onGoZone3={() => navigate("/zone3/inbox")}
                  onGoZone5={() => navigate("/zone5/tonight")}
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
      title="羁绊列表"
      subtitle="这些关系不是沉淀在过去，而是在持续影响你接下来会先进入哪段人生。"
      onBack={onBack}
      progress="27 / 32"
      bottomNav={{ activeTab: "bonds" }}
      primaryAction={{ label: `打开 ${bondSummaries[0].name} 的关系主页`, onClick: () => onOpenBond(bondSummaries[0].id) }}
      secondaryAction={{ label: `看看 ${bondSummaries[1].name}`, onClick: () => onOpenBond(bondSummaries[1].id) }}
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

function BondDetailPage({ onBack, onGoGenesis, onGoTimeline }) {
  const bond = useBond();

  return (
    <AppShell
      title="好友羁绊主页"
      subtitle="关系页不是展示谁和我认识，而是展示这段关系为什么会优先进入我的主线。"
      onBack={onBack}
      progress="28 / 32"
      bottomNav={{ activeTab: "bonds" }}
      primaryAction={{ label: "看创世记忆", onClick: () => onGoGenesis(bond.id) }}
      secondaryAction={{ label: "直接看共同时间线", onClick: () => onGoTimeline(bond.id) }}
    >
      <div className="home-card zone2-hero-card">
        <span className="home-card-badge">{bond.status}</span>
        <h4>{bond.name}</h4>
        <p>{bond.lastSignal}</p>
      </div>

      <div className="status-card">
        <strong>为什么他 / 她会先出现</strong>
        <p>{bond.reason}</p>
      </div>

      <div className="field-card">
        <strong>当前关系对主线的影响</strong>
        <p className="zone1-copy-muted">
          当你下次上线时，这段关系更可能以强相关动态、回响或同游机会的形式被优先抬到首页。
        </p>
      </div>

      <div className="zone1-quick-nav-grid">
        <button type="button" className="ghost-button" onClick={() => onGoTimeline(bond.id)}>
          继续看时间线
        </button>
        <button type="button" className="ghost-button" onClick={() => onGoGenesis(bond.id)}>
          回看创世记忆
        </button>
      </div>
    </AppShell>
  );
}

function GenesisPage({ onBack, onNext }) {
  const bond = useBond();
  const content = bondGenesis[bond.id];

  return (
    <AppShell
      title="创世记忆"
      subtitle="创世记忆负责回答：为什么这段关系会在今天被重新点亮。"
      onBack={() => onBack(bond.id)}
      dark
      progress="29 / 32"
      bottomNav={{ activeTab: "bonds" }}
      footerTone="dark"
      primaryAction={{ label: "继续看共同时间线", onClick: () => onNext(bond.id) }}
    >
      <div className="cosmic-panel zone2-memory-panel">
        <span className="dark-badge">{bond.name}</span>
        <h3>{content.title}</h3>
        <p>{content.memory}</p>
      </div>

      <div className="field-card field-card-dark">
        <strong>为什么重要</strong>
        <p className="zone1-copy-muted">{content.evidence}</p>
      </div>
    </AppShell>
  );
}

function TimelinePage({ onBack, onNext }) {
  const bond = useBond();
  const timeline = bondTimeline[bond.id];

  return (
    <AppShell
      title="共同经历时间线"
      subtitle="时间线把这段关系从抽象好感，变成能被追溯的世界证据。"
      onBack={() => onBack(bond.id)}
      progress="30 / 32"
      bottomNav={{ activeTab: "bonds" }}
      primaryAction={{ label: "继续到同游发起", onClick: () => onNext(bond.id) }}
    >
      <div className="zoneX-timeline">
        {timeline.map((item, index) => (
          <div key={item.title} className="zoneX-timeline-item">
            <div className="zoneX-timeline-marker">{index + 1}</div>
            <div className="field-card">
              <div className="zone1-card-head">
                <strong>{item.title}</strong>
                <span className="zone1-inline-tag">{item.tag}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

function CoTravelPage({ onBack, onNext }) {
  const bond = useBond();
  const plan = coTravelPlans[bond.id];

  return (
    <AppShell
      title="同游发起"
      subtitle="同游不是附属玩法，而是把关系和场景真正推进到一起。"
      onBack={() => onBack(bond.id)}
      progress="31 / 32"
      bottomNav={{ activeTab: "bonds" }}
      primaryAction={{ label: "继续看分身边界", onClick: () => onNext(bond.id) }}
    >
      <div className="home-card">
        <span className="home-card-badge">关系推进动作</span>
        <h4>{plan.title}</h4>
        <p>{plan.desc}</p>
      </div>

      <div className="selection-list">
        {plan.options.map((item) => (
          <div key={item} className="selection-item">
            <div>
              <strong>{item}</strong>
            </div>
            <span className="zone1-inline-tag">可发起</span>
          </div>
        ))}
      </div>

      <div className="status-card zone2-impact-card">
        <strong>为什么要在羁绊里发起</strong>
        <p>{plan.impact}</p>
      </div>
    </AppShell>
  );
}

function PermissionsPage({ onBack, onGoZone3, onGoZone5 }) {
  const bond = useBond();
  const permissions = bondPermissions[bond.id];

  return (
    <AppShell
      title="分身边界权限"
      subtitle="关系推进仍然要被边界约束，分身不能越过你的设定替你完成所有事。"
      onBack={() => onBack(bond.id)}
      progress="32 / 32"
      bottomNav={{ activeTab: "bonds" }}
      primaryAction={{ label: "去消息继续承接", onClick: onGoZone3 }}
      secondaryAction={{ label: "去场景里发起同游", onClick: onGoZone5 }}
    >
      <div className="selection-list">
        {permissions.map((item) => (
          <div key={item} className="selection-item">
            <div>
              <strong>{item}</strong>
            </div>
            <span className="zone1-inline-tag">边界规则</span>
          </div>
        ))}
      </div>

      <div className="field-card">
        <strong>关系页的下一步</strong>
        <p className="zone1-copy-muted">
          关系沉淀完之后，下一步通常不是停留在这里，而是回到消息承接或场景推进。
        </p>
      </div>
    </AppShell>
  );
}
