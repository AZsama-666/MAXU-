import { useMemo, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AppShell } from "../../components/AppShell";
import { PhoneFrame } from "../../components/PhoneFrame";
import {
  boundaryRules,
  instructionPresets,
  releaseChecklist,
  twinAssets,
  twinHubSnapshot,
  twinStatusCards,
  zone4CompletionNotes,
  zone4FlowLinks
} from "./data";

function matchFlowLink(pathname) {
  return zone4FlowLinks.find((item) => pathname.startsWith(item.path)) || zone4FlowLinks[0];
}

export function Zone4Prototype() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedInstruction, setSelectedInstruction] = useState(instructionPresets[0].id);
  const [autonomousMode, setAutonomousMode] = useState(false);

  const currentLink = useMemo(() => matchFlowLink(location.pathname), [location.pathname]);
  const currentInstruction =
    instructionPresets.find((item) => item.id === selectedInstruction) || instructionPresets[0];

  return (
    <div className="prototype-layout">
      <aside className="prototype-sidebar">
        <div className="sidebar-card">
          <span className="sidebar-eyebrow">MAXU Prototype</span>
          <h1>Zone4 双生</h1>
          <p>
            双生不再只是“我的页”替代，而是把下线前的人生安排收进一个统一控制舱。
          </p>
        </div>

        <div className="sidebar-card">
          <div className="sidebar-section-title">流程子页面</div>
          <div className="flow-link-list">
            {zone4FlowLinks.map((item) => (
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
            {zone4CompletionNotes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="prototype-stage">
        <div className="stage-head">
          <div>
            <span className="sidebar-eyebrow">Tab 4: Twin</span>
            <h2>Zone4: 下线前安排分身人生</h2>
            <p>这里承接 Zone1 的“人生接管”，负责在你下线前安排 Zero 接下来怎么继续活。</p>
          </div>
          <div className="stage-badge zone-badge zone-badge-twin">Twin Control Flow</div>
        </div>

        <PhoneFrame>
          <Routes>
            <Route path="/" element={<Navigate to="/zone4/hub" replace />} />
            <Route
              path="hub"
              element={
                <TwinHubPage
                  instruction={currentInstruction}
                  onBack={() => navigate("/zone1/home-life")}
                  onGoStatus={() => navigate("/zone4/status")}
                  onGoInstruction={() => navigate("/zone4/instruction")}
                  onGoRelease={() => navigate("/zone4/release")}
                />
              }
            />
            <Route
              path="status"
              element={
                <TwinStatusPage
                  onBack={() => navigate("/zone4/hub")}
                  onNext={() => navigate("/zone4/instruction")}
                />
              }
            />
            <Route
              path="instruction"
              element={
                <InstructionPage
                  selectedInstruction={selectedInstruction}
                  onSelectInstruction={(id) => {
                    setSelectedInstruction(id);
                    setAutonomousMode(false);
                  }}
                  onAutonomous={() => setAutonomousMode(true)}
                  autonomousMode={autonomousMode}
                  onBack={() => navigate("/zone4/status")}
                  onNext={() => navigate("/zone4/boundaries")}
                />
              }
            />
            <Route
              path="boundaries"
              element={
                <BoundariesPage
                  instruction={currentInstruction}
                  onBack={() => navigate("/zone4/instruction")}
                  onNext={() => navigate("/zone4/assets")}
                />
              }
            />
            <Route
              path="assets"
              element={
                <AssetsPage
                  instruction={currentInstruction}
                  onBack={() => navigate("/zone4/boundaries")}
                  onNext={() => navigate("/zone4/release")}
                />
              }
            />
            <Route
              path="release"
              element={
                <ReleasePage
                  instruction={currentInstruction}
                  autonomousMode={autonomousMode}
                  onBack={() => navigate("/zone4/assets")}
                  onEditInstruction={() => navigate("/zone4/instruction")}
                  onEditBoundaries={() => navigate("/zone4/boundaries")}
                  onGoZone1={() => navigate("/zone1/home-life")}
                  onGoZone5={() => navigate("/zone5/map")}
                />
              }
            />
            <Route path="*" element={<Navigate to="/zone4/hub" replace />} />
          </Routes>
        </PhoneFrame>
      </main>
    </div>
  );
}

function TwinHubPage({ instruction, onBack, onGoStatus, onGoInstruction, onGoRelease }) {
  return (
    <AppShell
      title="双生首页"
      subtitle="Zone1 负责上线接管，双生负责下线前安排人生。"
      onBack={onBack}
      progress="21 / 26"
      bottomNav={{ activeTab: "twin" }}
      primaryAction={{ label: "去配离线指令", onClick: onGoInstruction }}
      secondaryAction={{ label: "先看分身状态", onClick: onGoStatus }}
    >
      <div className="home-card zone4-hub-card">
        <span className="home-card-badge">下线安排入口</span>
        <h4>{twinHubSnapshot.twinName}</h4>
        <p>{twinHubSnapshot.lifeSegment}</p>
      </div>

      <div className="status-card">
        <strong>当前场景</strong>
        <p>{twinHubSnapshot.currentScene}</p>
      </div>

      <div className="status-card">
        <strong>当前指令预览</strong>
        <p>{instruction.title}</p>
      </div>

      <div className="field-card">
        <strong>双生页意义</strong>
        <p className="zone1-copy-muted">{twinHubSnapshot.hint}</p>
      </div>

      <div className="zone1-quick-nav-grid">
        <button type="button" className="ghost-button" onClick={onGoRelease}>
          直接预演下线前确认
        </button>
        <button type="button" className="ghost-button" onClick={onGoInstruction}>
          先改离线指令
        </button>
      </div>
    </AppShell>
  );
}

function TwinStatusPage({ onBack, onNext }) {
  return (
    <AppShell
      title="分身状态中心"
      subtitle="先看清 Zero 当前处于什么人生阶段，再决定要不要给出明确指令。"
      onBack={onBack}
      progress="22 / 26"
      bottomNav={{ activeTab: "twin" }}
      primaryAction={{ label: "继续配置离线指令", onClick: onNext }}
    >
      <div className="zoneX-card-grid zone4-status-grid">
        {twinStatusCards.map((item) => (
          <div key={item.title} className="status-card zone4-status-card">
            <strong>{item.title}</strong>
            <div className="zoneX-card-value">{item.value}</div>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

function InstructionPage({
  selectedInstruction,
  onSelectInstruction,
  onAutonomous,
  autonomousMode,
  onBack,
  onNext
}) {
  return (
    <AppShell
      title="离线指令配置"
      subtitle="下线不等于暂停世界。你可以让 Zero 按自由意志继续活，也可以给他一个生活方向。"
      onBack={onBack}
      dark
      progress="23 / 26"
      bottomNav={{ activeTab: "twin" }}
      footerTone="dark"
      primaryAction={{ label: "继续到边界配置", onClick: onNext }}
      secondaryAction={{ label: "改成自由意志", onClick: onAutonomous }}
    >
      <div className="field-card field-card-dark zone4-mode-card">
        <strong>{autonomousMode ? "当前模式：自由意志" : "当前模式：带指令下线"}</strong>
        <p className="zone1-copy-muted">
          {autonomousMode
            ? "如果你现在下线，Zero 会按人格底色、场景热度和关系状态继续生活。"
            : "如果你现在下线，Zero 会按你选定的目标、场景和关系偏好继续推进。"}
        </p>
      </div>

      <div className="selection-list">
        {instructionPresets.map((item) => (
          <button
            key={item.id}
            type="button"
            className={
              !autonomousMode && selectedInstruction === item.id
                ? "selection-item selection-item-dark selection-item-active"
                : "selection-item selection-item-dark"
            }
            onClick={() => onSelectInstruction(item.id)}
          >
            <div>
              <strong>{item.title}</strong>
              <p className="zone1-copy-muted">{item.summary}</p>
              <p className="zone1-route-impact">{item.impact}</p>
            </div>
            <span className="zone1-inline-tag">{item.goal}</span>
          </button>
        ))}
      </div>
    </AppShell>
  );
}

function BoundariesPage({ instruction, onBack, onNext }) {
  return (
    <AppShell
      title="分身边界配置"
      subtitle="离线指令不是无限授权，Zero 的行动仍然要被你的边界与世界规则约束。"
      onBack={onBack}
      progress="24 / 26"
      bottomNav={{ activeTab: "twin" }}
      primaryAction={{ label: "继续看资产沉淀", onClick: onNext }}
    >
      <div className="status-card zone4-direction-card">
        <strong>当前离线方向</strong>
        <p>{instruction.title}</p>
      </div>

      <div className="zoneX-card-grid">
        {boundaryRules.map((item) => (
          <div key={item.title} className="field-card">
            <div className="zone1-card-head">
              <strong>{item.title}</strong>
              <span className="zone1-inline-tag">{item.status}</span>
            </div>
            <p className="zone1-copy-muted">{item.desc}</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

function AssetsPage({ instruction, onBack, onNext }) {
  return (
    <AppShell
      title="资产沉淀"
      subtitle="双生不仅设置未来，也要让你看见过去已经留下了什么世界痕迹。"
      onBack={onBack}
      progress="25 / 26"
      bottomNav={{ activeTab: "twin" }}
      primaryAction={{ label: "去下线前确认", onClick: onNext }}
      secondaryAction={{ label: "返回边界配置", onClick: onBack }}
    >
      <div className="status-card zone4-direction-card">
        <strong>本次下线后将沿此方向继续推进</strong>
        <p>{instruction.title}</p>
      </div>

      <div className="zoneX-card-grid">
        {twinAssets.map((item) => (
          <div key={item.title} className="home-card">
            <span className="home-card-badge">{item.title}</span>
            <h4>{item.value}</h4>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

function ReleasePage({
  instruction,
  autonomousMode,
  onBack,
  onEditInstruction,
  onEditBoundaries,
  onGoZone1,
  onGoZone5
}) {
  const handleEdit = (editTarget) => {
    if (editTarget === "instruction") onEditInstruction();
    else if (editTarget === "boundaries") onEditBoundaries();
  };

  return (
    <AppShell
      title="下线前确认"
      subtitle="点击任意一项可返回修改，确认无误后再交还。"
      onBack={onBack}
      dark
      progress="26 / 26"
      bottomNav={{ activeTab: "twin" }}
      footerTone="dark"
      primaryAction={{ label: "返回 Zone1 看接管主线", onClick: onGoZone1 }}
      secondaryAction={{ label: "去世界地图看后续场景", onClick: onGoZone5 }}
    >
      <div className="cosmic-panel zone4-release-panel">
        <span className="dark-badge">{autonomousMode ? "自由意志交还" : "带指令交还"}</span>
        <h3>{autonomousMode ? "Zero 将按自由意志继续生活" : instruction.title}</h3>
        <p>
          {autonomousMode
            ? "如果你现在下线，Zero 会依据人格、场景热度和关系状态继续推进这段夜晚。"
            : instruction.summary}
        </p>
      </div>

      <div className="selection-list release-checklist-editable">
        {releaseChecklist.map((item) => (
          <button
            key={item.label}
            type="button"
            className="selection-item selection-item-dark release-checklist-item"
            onClick={() => handleEdit(item.editTarget)}
          >
            <div>
              <strong>{item.label}</strong>
            </div>
            <span className="zone1-inline-tag release-edit-hint">{item.hint}</span>
          </button>
        ))}
      </div>
    </AppShell>
  );
}
