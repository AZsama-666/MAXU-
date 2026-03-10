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
  coTravelPlan,
  sceneDetails,
  sceneEntryState,
  sceneEvents,
  scenePasses,
  tonightRouteOptions,
  worldOperationHighlights,
  worldScenes,
  zone5CompletionNotes,
  zone5FlowLinks
} from "./data";

function matchFlowLink(pathname) {
  if (pathname.startsWith("/zone5/scene/")) {
    return zone5FlowLinks.find((item) => item.path.startsWith("/zone5/scene/"));
  }
  if (pathname.startsWith("/zone5/entry/")) {
    return zone5FlowLinks.find((item) => item.path.startsWith("/zone5/entry/"));
  }
  if (pathname.startsWith("/zone5/event/")) {
    return zone5FlowLinks.find((item) => item.path.startsWith("/zone5/event/"));
  }
  return zone5FlowLinks.find((item) => pathname.startsWith(item.path)) || zone5FlowLinks[0];
}

function useScene() {
  const { sceneId = "motor-club" } = useParams();
  return worldScenes.find((item) => item.id === sceneId) || worldScenes[0];
}

export function Zone5Prototype() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentLink = useMemo(() => matchFlowLink(location.pathname), [location.pathname]);

  return (
    <div className="prototype-layout">
      <aside className="prototype-sidebar">
        <div className="sidebar-card">
          <span className="sidebar-eyebrow">MAXU Prototype</span>
          <h1>Zone5 场景与世界</h1>
          <p>场景不是背景图，而是接管、关系、消息、双生和同游真正落地的世界主梁。</p>
        </div>

        <div className="sidebar-card">
          <div className="sidebar-section-title">流程子页面</div>
          <div className="flow-link-list">
            {zone5FlowLinks.map((item) => (
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
            {zone5CompletionNotes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="prototype-stage">
        <div className="stage-head">
          <div>
            <span className="sidebar-eyebrow">World Layer</span>
            <h2>Zone5: 场景探索 / 同游 / 世界运营感</h2>
            <p>这里回答的不是“看什么”，而是“接下来去哪里、和谁一起去、这个世界为什么是真的”。</p>
          </div>
          <div className="stage-badge zone-badge zone-badge-world">Scene Driven World</div>
        </div>

        <PhoneFrame>
          <Routes>
            <Route path="/" element={<Navigate to="/zone5/map" replace />} />
            <Route
              path="map"
              element={
                <MapPage
                  onBack={() => navigate("/zone1/world-entry")}
                  onOpenScene={(sceneId) => navigate(`/zone5/scene/${sceneId}`)}
                  onGoTonight={() => navigate("/zone5/tonight")}
                />
              }
            />
            <Route
              path="scene/:sceneId"
              element={
                <ScenePage
                  onBack={() => navigate("/zone5/map")}
                  onNext={(sceneId) => navigate(`/zone5/entry/${sceneId}`)}
                />
              }
            />
            <Route
              path="entry/:sceneId"
              element={
                <SceneEntryPage
                  onBack={(sceneId) => navigate(`/zone5/scene/${sceneId}`)}
                  onNext={() => navigate("/zone5/tonight")}
                />
              }
            />
            <Route
              path="tonight"
              element={
                <TonightPage
                  onBack={() => navigate("/zone5/map")}
                  onNext={() => navigate("/zone5/cotravel")}
                />
              }
            />
            <Route
              path="cotravel"
              element={
                <CoTravelPage
                  onBack={() => navigate("/zone5/tonight")}
                  onNext={() => navigate("/zone5/event/motor-night")}
                />
              }
            />
            <Route
              path="event/:eventId"
              element={
                <EventPage
                  onBack={() => navigate("/zone5/cotravel")}
                  onNext={() => navigate("/zone5/operations")}
                />
              }
            />
            <Route
              path="operations"
              element={
                <OperationsPage
                  onBack={() => navigate("/zone5/event/motor-night")}
                  onNext={() => navigate("/zone5/pass")}
                />
              }
            />
            <Route
              path="pass"
              element={
                <PassPage
                  onBack={() => navigate("/zone5/operations")}
                  onGoZone1={() => navigate("/zone1/home-life")}
                  onGoZone4={() => navigate("/zone4/release")}
                />
              }
            />
            <Route path="*" element={<Navigate to="/zone5/map" replace />} />
          </Routes>
        </PhoneFrame>
      </main>
    </div>
  );
}

function MapPage({ onBack, onOpenScene, onGoTonight }) {
  return (
    <AppShell
      title="探险版图"
      subtitle="地图不是摆设，而是帮助用户理解：分身此刻在哪，接下来还能去哪。"
      onBack={onBack}
      progress="38 / 45"
      bottomNav={{ activeTab: "home" }}
      primaryAction={{ label: "去设置今晚去向", onClick: onGoTonight }}
    >
      <div className="zoneX-card-grid zone5-map-grid">
        {worldScenes.map((item) => (
          <button
            key={item.id}
            type="button"
            className="home-card zoneX-button-card zone5-scene-card"
            onClick={() => onOpenScene(item.id)}
          >
            <span className="home-card-badge">{item.heat}</span>
            <h4>{item.name}</h4>
            <p>{item.desc}</p>
            <div className="zone1-inline-meta">
              <span>{item.status}</span>
              <span>{item.gate}</span>
            </div>
          </button>
        ))}
      </div>
    </AppShell>
  );
}

function ScenePage({ onBack, onNext }) {
  const scene = useScene();
  const detail = sceneDetails[scene.id];

  return (
    <AppShell
      title="场景详情页"
      subtitle="场景详情需要告诉用户：这里为什么值得进入，它会改变什么主线。"
      onBack={onBack}
      progress="39 / 45"
      bottomNav={{ activeTab: "home" }}
      primaryAction={{ label: "继续到场景进入页", onClick: () => onNext(scene.id) }}
    >
      <div className="home-card zone5-scene-detail-card">
        <span className="home-card-badge">{scene.heat}</span>
        <h4>{detail.title}</h4>
        <p>{detail.desc}</p>
      </div>

      <div className="selection-list">
        {detail.cues.map((item) => (
          <div key={item} className="selection-item">
            <div>
              <strong>{item}</strong>
            </div>
            <span className="zone1-inline-tag">场景线索</span>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

function SceneEntryPage({ onBack, onNext }) {
  const scene = useScene();
  const entry = sceneEntryState[scene.id];

  return (
    <AppShell
      title="场景进入 / 排队"
      subtitle="进入页负责把抽象兴趣翻译成真实世界门槛，让场景像真的在运转。"
      onBack={() => onBack(scene.id)}
      progress="40 / 45"
      bottomNav={{ activeTab: "home" }}
      primaryAction={{ label: "继续设置今晚去向", onClick: onNext }}
    >
      <div className="status-card">
        <strong>{scene.name}</strong>
        <p>{entry.status}</p>
      </div>

      <div className="home-card zone5-entry-card">
        <span className="home-card-badge">等待 / 准入</span>
        <h4>{entry.wait}</h4>
        <p>{entry.note}</p>
      </div>
    </AppShell>
  );
}

function TonightPage({ onBack, onNext }) {
  return (
    <AppShell
      title="今晚去向设置"
      subtitle="去向不是一个小设置，而是所有关系和场景推进的前置条件。"
      onBack={onBack}
      progress="41 / 45"
      bottomNav={{ activeTab: "home" }}
      primaryAction={{ label: "继续发起同游", onClick: onNext }}
    >
      <div className="selection-list zone5-route-list">
        {tonightRouteOptions.map((item) => (
          <div key={item.title} className="selection-item">
            <div>
              <strong>{item.title}</strong>
              <p className="zone1-copy-muted">{item.desc}</p>
            </div>
            <span className="zone1-inline-tag">路线决策</span>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

function CoTravelPage({ onBack, onNext }) {
  return (
    <AppShell
      title="同游发起"
      subtitle="同游不是附属功能，而是让关系、场景和时间线真正并行的一次推进。"
      onBack={onBack}
      progress="42 / 45"
      bottomNav={{ activeTab: "home" }}
      primaryAction={{ label: "继续看场景事件", onClick: onNext }}
    >
      <div className="home-card zone5-cotravel-card">
        <span className="home-card-badge">多人并行入口</span>
        <h4>{coTravelPlan.title}</h4>
        <p>{coTravelPlan.desc}</p>
      </div>

      <div className="zoneX-card-grid">
        <div className="field-card">
          <strong>可邀请对象</strong>
          <p className="zone1-copy-muted">{coTravelPlan.people.join(" / ")}</p>
        </div>
        <div className="field-card">
          <strong>可同游目的地</strong>
          <p className="zone1-copy-muted">{coTravelPlan.destinations.join(" / ")}</p>
        </div>
      </div>
    </AppShell>
  );
}

function EventPage({ onBack, onNext }) {
  const { eventId = "motor-night" } = useParams();
  const event = sceneEvents[eventId] || sceneEvents["motor-night"];

  return (
    <AppShell
      title="场景事件页"
      subtitle="事件页负责证明世界不是静态地图，而会临时改写热度、关系推进和场景价值。"
      onBack={onBack}
      dark
      progress="43 / 45"
      bottomNav={{ activeTab: "home" }}
      footerTone="dark"
      primaryAction={{ label: "继续看世界热点", onClick: onNext }}
    >
      <div className="cosmic-panel zone5-event-panel">
        <span className="dark-badge">临时事件</span>
        <h3>{event.title}</h3>
        <p>{event.desc}</p>
      </div>

      <div className="field-card field-card-dark">
        <strong>对主线的影响</strong>
        <p className="zone1-copy-muted">{event.effect}</p>
      </div>
    </AppShell>
  );
}

function OperationsPage({ onBack, onNext }) {
  return (
    <AppShell
      title="世界热点 / 运营事件"
      subtitle="运营感不是抢走首页，而是在后层证明这个世界真的有自己的节奏和供给。"
      onBack={onBack}
      progress="44 / 45"
      bottomNav={{ activeTab: "home" }}
      primaryAction={{ label: "继续看场域信物", onClick: onNext }}
    >
      <div className="zoneX-card-grid zone5-ops-grid">
        {worldOperationHighlights.map((item) => (
          <div key={item.title} className="status-card zone5-ops-card">
            <strong>{item.title}</strong>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

function PassPage({ onBack, onGoZone1, onGoZone4 }) {
  return (
    <AppShell
      title="场域信物页"
      subtitle="场域信物负责让世界准入和场景价值变得可被感知，而不是抽象说明。"
      onBack={onBack}
      progress="45 / 45"
      bottomNav={{ activeTab: "home" }}
      primaryAction={{ label: "回 Zone1 看接管主线", onClick: onGoZone1 }}
      secondaryAction={{ label: "去双生安排下线", onClick: onGoZone4 }}
    >
      <div className="zoneX-card-grid zone5-pass-grid">
        {scenePasses.map((item) => (
          <div key={item.title} className="home-card zone5-pass-card">
            <span className="home-card-badge">场域信物</span>
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="field-card">
        <strong>世界层的出口</strong>
        <p className="zone1-copy-muted">
          你可以回 Zone1 继续看人生主线，也可以回双生安排这段世界接下来如何被交还。
        </p>
      </div>
    </AppShell>
  );
}
