import { useMemo, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AppShell } from "../../components/AppShell";
import { PhoneFrame } from "../../components/PhoneFrame";
import {
  alignTools,
  mineSnapshot,
  reportHistory,
  signoffOptions,
  zone4CompletionNotes,
  zone4FlowLinks
} from "./data";

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
                  onGoReports={() => navigate("/zone4/reports")}
                  onGoAlign={() => navigate("/zone4/align")}
                  currentOption={currentOption}
                />
              }
            />
            <Route
              path="reports"
              element={
                <ReportsPage
                  onBack={() => navigate("/zone4/hub")}
                  reports={reportHistory}
                />
              }
            />
            <Route
              path="align"
              element={
                <AlignPage
                  onBack={() => navigate("/zone4/hub")}
                  tools={alignTools}
                  onPublish={() => navigate("/zone1/publish")}
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

function MinePage({ onBack, onGoSignoff, onGoReports, onGoAlign, currentOption }) {
  return (
    <AppShell
      title="我的"
      subtitle="分身状态、战报收纳与对齐调教。"
      onBack={onBack}
      progress="18 / 21"
      bottomNav={{ activeTab: "mine" }}
      primaryAction={{ label: "设置下线倾向", onClick: onGoSignoff }}
    >
      <div className="home-card zone4-hub-card">
        <span className="home-card-badge">当前状态</span>
        <h4>{mineSnapshot.twinName}</h4>
        <p>{mineSnapshot.currentStatus}</p>
      </div>

      <div className="zone4-mine-entries">
        <button type="button" className="zone4-entry-card" onClick={onGoReports}>
          <span className="zone4-entry-title">每日战报</span>
          <p className="zone1-copy-muted">收纳往期离线战报，查看分身在玛薯宇宙留下的痕迹。</p>
        </button>
        <button type="button" className="zone4-entry-card" onClick={onGoAlign}>
          <span className="zone4-entry-title">与分身对齐</span>
          <p className="zone1-copy-muted">通过对话、选择类测试调教分身，让 ta 更贴近你。</p>
        </button>
      </div>

      <div className="status-card">
        <strong>当前下线倾向</strong>
        <p>{currentOption.title}</p>
      </div>
    </AppShell>
  );
}

function ReportsPage({ onBack, reports }) {
  return (
    <AppShell
      title="每日战报"
      subtitle="战报收纳在“我的”内，这里可查看往期。"
      onBack={onBack}
      progress="19 / 21"
      bottomNav={{ activeTab: "mine" }}
    >
      <div className="zone4-report-list">
        {reports.map((r) => (
          <div key={r.id} className="zone4-report-item">
            <span className="zone4-report-date">{r.date}</span>
            <span className="zone4-report-summary">{r.summary}</span>
            <p className="zone1-copy-muted">{r.period}</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

function AlignPage({ onBack, tools, onPublish }) {
  return (
    <AppShell
      title="与分身对齐"
      subtitle="通过对话、选择类测试让分身更贴近你。"
      onBack={onBack}
      progress="20 / 21"
      bottomNav={{ activeTab: "mine" }}
    >
      <div className="zone4-align-list">
        {tools.map((t) => (
          <div key={t.id} className="zone4-align-item">
            <strong>{t.title}</strong>
            <p className="zone1-copy-muted">{t.desc}</p>
            <span className="zone1-inline-tag">{t.status}</span>
          </div>
        ))}
        <button type="button" className="zone4-align-item zone4-align-publish-entry" onClick={onPublish}>
          <strong>让分身发一条内容</strong>
          <p className="zone1-copy-muted">选择场景与配图，由你最终确认发布到广场。</p>
          <span className="zone1-inline-tag">AI 代发</span>
        </button>
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
