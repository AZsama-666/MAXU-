import { useMemo, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AppShell } from "../../components/AppShell";
import { PhoneFrame } from "../../components/PhoneFrame";
import { mineSnapshot, signoffOptions, zone4CompletionNotes, zone4FlowLinks } from "./data";

function matchFlowLink(pathname) {
  return zone4FlowLinks.find((item) => pathname.startsWith(item.path)) || zone4FlowLinks[0];
}

export function Zone4Prototype() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState(signoffOptions[2].id);
  const currentLink = useMemo(() => matchFlowLink(location.pathname), [location.pathname]);
  const currentOption = signoffOptions.find((item) => item.id === selectedOption) || signoffOptions[2];

  return (
    <div className="prototype-layout">
      <aside className="prototype-sidebar">
        <div className="sidebar-card">
          <span className="sidebar-eyebrow">MAXU Prototype</span>
          <h1>Zone4 我的</h1>
          <p>我的页在 v3.0 先回到最简单的职责：看状态、选倾向、交还主导权。</p>
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
          <div className="sidebar-section-title">本轮收敛重点</div>
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
            <span className="sidebar-eyebrow">Tab 4: Mine</span>
            <h2>Zone4: 我的</h2>
            <p>这里不再是复杂控制舱，而是用户下线前最必要的交还入口。</p>
          </div>
          <div className="stage-badge zone-badge zone-badge-twin">Mine</div>
        </div>

        <PhoneFrame>
          <Routes>
            <Route path="/" element={<Navigate to="/zone4/hub" replace />} />
            <Route
              path="hub"
              element={
                <MinePage
                  onBack={() => navigate("/zone1/home")}
                  onGoSignoff={() => navigate("/zone4/signoff")}
                  currentOption={currentOption}
                />
              }
            />
            <Route
              path="signoff"
              element={
                <SignoffPage
                  selectedOption={selectedOption}
                  onSelectOption={setSelectedOption}
                  onBack={() => navigate("/zone4/hub")}
                  onGoHome={() => navigate("/zone1/home")}
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

function MinePage({ onBack, onGoSignoff, currentOption }) {
  return (
    <AppShell
      title="我的"
      subtitle="先看分身状态，再决定下线后怎么继续。"
      onBack={onBack}
      progress="18 / 19"
      bottomNav={{ activeTab: "mine" }}
      primaryAction={{ label: "设置下线倾向", onClick: onGoSignoff }}
    >
      <div className="home-card zone4-hub-card">
        <span className="home-card-badge">当前状态</span>
        <h4>{mineSnapshot.twinName}</h4>
        <p>{mineSnapshot.currentStatus}</p>
      </div>

      <div className="status-card">
        <strong>当前场景</strong>
        <p>{mineSnapshot.currentScene}</p>
      </div>

      <div className="status-card">
        <strong>当前下线倾向</strong>
        <p>{currentOption.title}</p>
      </div>

      <div className="field-card">
        <strong>为什么先这样收敛</strong>
        <p className="zone1-copy-muted">{mineSnapshot.note}</p>
      </div>
    </AppShell>
  );
}

function SignoffPage({ selectedOption, onSelectOption, onBack, onGoHome }) {
  return (
    <AppShell
      title="下线倾向"
      subtitle="选一个方向，或者保持默认自己玩。"
      onBack={onBack}
      dark
      progress="19 / 19"
      bottomNav={{ activeTab: "mine" }}
      footerTone="dark"
      primaryAction={{ label: "确认并回首页", onClick: onGoHome }}
      secondaryAction={{ label: "返回我的", onClick: onBack }}
    >
      <div className="selection-list">
        {signoffOptions.map((item) => (
          <button
            key={item.id}
            type="button"
            className={
              selectedOption === item.id
                ? "selection-item selection-item-dark selection-item-active"
                : "selection-item selection-item-dark"
            }
            onClick={() => onSelectOption(item.id)}
          >
            <div>
              <strong>{item.title}</strong>
              <p className="zone1-copy-muted">{item.desc}</p>
            </div>
            <span className="zone1-inline-tag">下线后生效</span>
          </button>
        ))}
      </div>
    </AppShell>
  );
}
