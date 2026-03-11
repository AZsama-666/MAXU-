import { useMemo, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AppShell } from "../../components/AppShell";
import { GlobalBottomNav } from "../../components/GlobalBottomNav";
import { PhoneFrame } from "../../components/PhoneFrame";
import {
  alignTools,
  reportHistory,
  signoffOptions,
  userProfile,
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
          <p>我的页以用户资料为主体，顶部 AI 分身调教区域可展开，点击进入 AI 功能中心。</p>
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
            <p>顶部机器人区域可下拉展开，点击进入 AI 功能中心；下方是用户个人资料与动态。</p>
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
                  onGoAiHub={() => navigate("/zone4/ai-hub")}
                />
              }
            />
            <Route
              path="ai-hub"
              element={
                <AiHubPage
                  onBack={() => navigate("/zone4/hub")}
                  onGoReports={() => navigate("/zone4/reports")}
                  onGoAlign={() => navigate("/zone4/align")}
                  onGoSignoff={() => navigate("/zone4/signoff")}
                  onPublish={() => navigate("/zone1/publish")}
                />
              }
            />
            <Route
              path="reports"
              element={<ReportsPage onBack={() => navigate("/zone4/ai-hub")} reports={reportHistory} />}
            />
            <Route
              path="align"
              element={<AlignPage onBack={() => navigate("/zone4/ai-hub")} tools={alignTools} />}
            />
            <Route
              path="signoff"
              element={
                <SignoffPage
                  selectedOption={selectedOption}
                  onSelectOption={setSelectedOption}
                  onBack={() => navigate("/zone4/ai-hub")}
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

/* ─── 卡通数字人头像 ─────────────────────────────────────── */
function AvatarIllustration({ expanded }) {
  const size = expanded ? 120 : 80;
  return (
    <svg
      viewBox="0 0 160 180"
      width={size}
      height={size}
      className="zone4-avatar-svg"
      aria-label="AI 分身数字人"
    >
      <defs>
        <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#7c5cff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="faceGrad" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#fff8dc" />
          <stop offset="100%" stopColor="#ffe066" />
        </radialGradient>
        <radialGradient id="bodyGrad" cx="50%" cy="20%" r="70%">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="100%" stopColor="#7c5cff" />
        </radialGradient>
      </defs>

      {/* 光晕 */}
      <ellipse cx="80" cy="90" rx="72" ry="72" fill="url(#glowGrad)" />

      {/* 身体 */}
      <rect x="52" y="126" width="56" height="36" rx="12" fill="url(#bodyGrad)" opacity="0.9" />
      <rect x="60" y="134" width="16" height="22" rx="8" fill="#a78bfa" opacity="0.6" />
      <rect x="84" y="134" width="16" height="22" rx="8" fill="#a78bfa" opacity="0.6" />

      {/* 领口 */}
      <ellipse cx="80" cy="126" rx="20" ry="7" fill="#7c5cff" opacity="0.5" />

      {/* 左耳 */}
      <circle cx="30" cy="84" r="11" fill="#ffe066" stroke="#ffd43b" strokeWidth="2.5" />
      <circle cx="30" cy="84" r="6" fill="#ffb3c6" opacity="0.65" />
      {/* 右耳 */}
      <circle cx="130" cy="84" r="11" fill="#ffe066" stroke="#ffd43b" strokeWidth="2.5" />
      <circle cx="130" cy="84" r="6" fill="#ffb3c6" opacity="0.65" />

      {/* 脸 */}
      <circle cx="80" cy="84" r="48" fill="url(#faceGrad)" stroke="#ffd43b" strokeWidth="2.5" />

      {/* 左眼 */}
      <ellipse cx="63" cy="76" rx="9" ry="11" fill="#1a1d2e" />
      <circle cx="67" cy="72" r="3" fill="#ffffff" />
      <circle cx="65" cy="78" r="1.5" fill="#ffffff" opacity="0.4" />
      {/* 右眼 */}
      <ellipse cx="97" cy="76" rx="9" ry="11" fill="#1a1d2e" />
      <circle cx="101" cy="72" r="3" fill="#ffffff" />
      <circle cx="99" cy="78" r="1.5" fill="#ffffff" opacity="0.4" />

      {/* 笑容 */}
      <path d="M62 95 Q80 113 98 95" stroke="#c2410c" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7" />

      {/* 腮红 */}
      <ellipse cx="50" cy="91" rx="10" ry="6" fill="#ffb3c6" opacity="0.5" />
      <ellipse cx="110" cy="91" rx="10" ry="6" fill="#ffb3c6" opacity="0.5" />

      {/* 发型 */}
      <ellipse cx="55" cy="40" rx="14" ry="11" fill="#ffd43b" stroke="#ffba08" strokeWidth="1.5" />
      <ellipse cx="80" cy="36" rx="14" ry="11" fill="#ffd43b" stroke="#ffba08" strokeWidth="1.5" />
      <ellipse cx="105" cy="40" rx="14" ry="11" fill="#ffd43b" stroke="#ffba08" strokeWidth="1.5" />

      {/* 天线 */}
      <line x1="80" y1="37" x2="80" y2="16" stroke="#7c5cff" strokeWidth="4" strokeLinecap="round" />
      <circle cx="80" cy="11" r="8" fill="#7c5cff" />
      <circle cx="80" cy="11" r="4.5" fill="#c4b5fd" />

      {/* 数字装饰点 */}
      <circle cx="40" cy="55" r="4" fill="#3ecfb4" opacity="0.7" />
      <circle cx="120" cy="55" r="4" fill="#7c5cff" opacity="0.7" />
      <circle cx="30" cy="110" r="3" fill="#ffd43b" opacity="0.6" />
      <circle cx="130" cy="110" r="3" fill="#ffd43b" opacity="0.6" />
    </svg>
  );
}

/* ─── 我的主页 ─────────────────────────────────────────── */
function MinePage({ onGoAiHub }) {
  const [expanded, setExpanded] = useState(false);
  const [dragStartY, setDragStartY] = useState(null);
  const [activePostTab, setActivePostTab] = useState("published");

  const handleTouchStart = (e) => setDragStartY(e.touches[0].clientY);
  const handleTouchEnd = (e) => {
    if (dragStartY === null) return;
    const delta = e.changedTouches[0].clientY - dragStartY;
    if (delta > 40) setExpanded(true);
    if (delta < -40) setExpanded(false);
    setDragStartY(null);
  };

  return (
    <div className="zone4-mine-page">
      {/* 顶部 AI 调教横幅 */}
      <div
        className={`zone4-mine-banner${expanded ? " zone4-mine-banner-expanded" : ""}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button type="button" className="zone4-mine-banner-body" onClick={onGoAiHub}>
          <div className="zone4-mine-robot">
            <AvatarIllustration expanded={expanded} />
            {expanded && (
              <p className="zone4-mine-banner-expand-hint">
                点击进入 AI 分身调教中心
              </p>
            )}
          </div>
          <h2 className="zone4-mine-banner-title">AI分身调教</h2>
          <p className="zone4-mine-banner-sub">塑造你的分身</p>
        </button>
        <button
          type="button"
          className="zone4-mine-banner-handle"
          onClick={() => setExpanded((v) => !v)}
          aria-label={expanded ? "收起" : "展开"}
        >
          <span className="zone4-mine-handle-bar" />
          <span className="zone4-mine-handle-label">{expanded ? "收起 ∧" : "下拉展开 ∨"}</span>
        </button>
      </div>

      {/* 个人资料与动态 */}
      <div className="zone4-mine-scroll">
        <div className="zone4-profile-actions">
          <button type="button" className="zone4-profile-btn">编辑资料</button>
          <button type="button" className="zone4-profile-btn">▣ 钱包</button>
        </div>

        <div className="zone4-profile-info">
          <h3 className="zone4-profile-name">{userProfile.name}</h3>
          <p className="zone4-profile-bio">{userProfile.bio}</p>
          <div className="zone4-profile-stats">
            <span><strong>{userProfile.following}</strong><em>关注</em></span>
            <span><strong>{userProfile.followers}</strong><em>粉丝</em></span>
            <span><strong>{userProfile.posts}</strong><em>动态</em></span>
          </div>
          <p className="zone4-profile-id">玛薯号: {userProfile.handle}</p>
        </div>

        <div className="zone4-posts-section">
          <div className="zone4-posts-tab-bar">
            <button
              type="button"
              className={`zone4-posts-tab${activePostTab === "published" ? " zone4-posts-tab-active" : ""}`}
              onClick={() => setActivePostTab("published")}
            >
              发布
            </button>
            <button
              type="button"
              className={`zone4-posts-tab${activePostTab === "liked" ? " zone4-posts-tab-active" : ""}`}
              onClick={() => setActivePostTab("liked")}
            >
              赞过
            </button>
          </div>
          <div className="zone4-posts-empty-state">
            <p className="zone4-posts-empty-text">还没有发布过动态</p>
            <button type="button" className="zone4-posts-cta">发点什么</button>
          </div>
        </div>
      </div>

      <div className="app-shell-footer-stack">
        <GlobalBottomNav activeTab="mine" />
      </div>
    </div>
  );
}

/* ─── AI 分身调教中心 ──────────────────────────────────── */
const AI_HUB_ITEMS = [
  { id: "reports", icon: "◉", title: "每日战报", desc: "查看分身在玛薯宇宙留下的痕迹" },
  { id: "align", icon: "◎", title: "与分身对齐", desc: "对话、选择类测试，让分身更贴近你" },
  { id: "signoff", icon: "◐", title: "离线挂机指令", desc: "设置下线后分身的活动倾向" },
  { id: "publish", icon: "◑", title: "让分身发一条内容", desc: "选场景配图，由你确认后发布到广场" }
];

function AiHubPage({ onBack, onGoReports, onGoAlign, onGoSignoff, onPublish }) {
  const handlers = { reports: onGoReports, align: onGoAlign, signoff: onGoSignoff, publish: onPublish };

  return (
    <AppShell
      title="AI分身调教"
      subtitle="塑造你的分身"
      onBack={onBack}
      bottomNav={{ activeTab: "mine" }}
    >
      <div className="zone4-ai-hub-list">
        {AI_HUB_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className="zone4-ai-hub-item"
            onClick={handlers[item.id]}
          >
            <span className="zone4-ai-hub-icon">{item.icon}</span>
            <div className="zone4-ai-hub-text">
              <strong>{item.title}</strong>
              <p>{item.desc}</p>
            </div>
            <span className="zone4-ai-hub-arrow">›</span>
          </button>
        ))}
      </div>
    </AppShell>
  );
}

/* ─── 每日战报 ─────────────────────────────────────────── */
function ReportsPage({ onBack, reports }) {
  return (
    <AppShell
      title="每日战报"
      subtitle="查看往期分身在玛薯宇宙留下的痕迹。"
      onBack={onBack}
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

/* ─── 与分身对齐 ───────────────────────────────────────── */
function AlignPage({ onBack, tools }) {
  return (
    <AppShell
      title="与分身对齐"
      subtitle="通过对话、选择类测试让分身更贴近你。"
      onBack={onBack}
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
      </div>
    </AppShell>
  );
}

/* ─── 离线挂机指令 ─────────────────────────────────────── */
function SignoffPage({ selectedOption, onSelectOption, onBack, onGoHome }) {
  return (
    <AppShell
      title="离线挂机指令"
      subtitle="选一个方向，或者保持默认自己玩。"
      onBack={onBack}
      dark
      bottomNav={{ activeTab: "mine" }}
      footerTone="dark"
      primaryAction={{ label: "确认并回首页", onClick: onGoHome }}
      secondaryAction={{ label: "返回", onClick: onBack }}
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
