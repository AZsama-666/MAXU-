import { useMemo, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AppShell } from "../../components/AppShell";
import { PhoneFrame } from "../../components/PhoneFrame";
import {
  fateState,
  homeSnapshot,
  openingPopup,
  plazaFeed,
  plazaFeedTabs,
  quickSceneryPresets,
  twinReport,
  zone1CompletionNotes,
  zone1FlowLinks
} from "./data";

function matchFlowLink(pathname) {
  return zone1FlowLinks.find((item) => pathname.startsWith(item.path)) || zone1FlowLinks[0];
}

export function Zone1Prototype() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentLink = useMemo(() => matchFlowLink(location.pathname), [location.pathname]);
  const [posts, setPosts] = useState(plazaFeed);

  const confirmPublish = (preset, caption) => {
    const isImageText = Boolean(preset.imageLabel);
    const nextPost = isImageText
      ? {
          id: `post-${Date.now().toString(36)}`,
          type: "imageText",
          imageLabel: preset.imageLabel || preset.scene,
          title: caption || preset.title || preset.content,
          author: "你的分身",
          shareCount: 0,
          likeCount: 0
        }
      : {
          id: `post-${Date.now().toString(36)}`,
          type: "text",
          content: caption || preset.content,
          author: "你的分身",
          shareCount: 0,
          likeCount: 0
        };
    setPosts((current) => [nextPost, ...current]);
  };

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
        <div className="sidebar-card sidebar-build-id">
          部署版本: {typeof __BUILD_ID__ !== "undefined" ? __BUILD_ID__ : "—"}
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
                  onGoToReports={() => navigate("/zone4/reports")}
                  onOpenPublish={() => navigate("/zone1/publish")}
                  posts={posts}
                />
              }
            />
            <Route
              path="publish"
              element={
                <PublishFlowPage
                  onBack={() => navigate("/zone1/home")}
                  onConfirm={confirmPublish}
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
            <Route path="plaza" element={<Navigate to="/zone1/home" replace />} />
            <Route path="*" element={<Navigate to="/zone1/opening" replace />} />
          </Routes>
        </PhoneFrame>
      </main>
    </div>
  );
}

function OpeningPage({ onBack, onNext }) {
  const [popupOpen, setPopupOpen] = useState(true);
  return (
    <AppShell
      title="你的分身已经重新上线"
      subtitle="先接住此刻，再决定今晚要往哪里走。"
      onBack={onBack}
      dark
      progress="09 / 11"
      footerTone="dark"
      primaryAction={{ label: "进入首页", onClick: onNext }}
    >
      {popupOpen && (
        <div className="zone1-opening-popup-overlay" role="dialog" aria-modal="true">
          <div className="zone1-opening-popup">
            <button
              type="button"
              className="zone1-opening-popup-close"
              onClick={() => setPopupOpen(false)}
              aria-label="关闭"
            >
              ×
            </button>
            <div className="zone1-opening-popup-countdown">{openingPopup.countdown}</div>
            <p className="zone1-opening-popup-line">{openingPopup.fateSummary}</p>
            <p className="zone1-opening-popup-line zone1-opening-popup-muted">
              {openingPopup.reportSummary}
            </p>
            <button
              type="button"
              className="zone1-opening-popup-dismiss"
              onClick={() => setPopupOpen(false)}
            >
              知道了
            </button>
          </div>
        </div>
      )}
      <div className="cosmic-panel zone1-panel-glow">
        <div className="zone1-hero-icon">◎</div>
        <span className="dark-badge">上线 = 接管分身</span>
        <h3>{homeSnapshot.twinName} 已经开始今晚的人生</h3>
        <p>{homeSnapshot.sentence}</p>
      </div>
    </AppShell>
  );
}

function HomePage({ onBack, onOpenFate, onGoToReports, onOpenPublish, posts }) {
  const [activeTab, setActiveTab] = useState("discover");
  return (
    <AppShell
      title="广场"
      onBack={onBack}
      progress="10 / 11"
      bottomNav={{ activeTab: "home" }}
    >
      <div className="zone1-plaza-top">
        <div className="zone1-plaza-tabs">
          {plazaFeedTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`zone1-plaza-tab ${activeTab === tab.id ? "zone1-plaza-tab-active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button type="button" className="zone1-plaza-search" aria-label="搜索">
          🔍
        </button>
      </div>

      <div className="zone1-report-strip">
        <button type="button" className="zone1-report-strip-inner" onClick={onGoToReports}>
          <span className="zone1-report-strip-label">{twinReport.stripLabel}</span>
          <span className="zone1-report-strip-values">
            {twinReport.stripValue}
            {twinReport.stripUnit}
          </span>
          {twinReport.stripLinkText ? (
            <span className="zone1-report-strip-more">{twinReport.stripLinkText}</span>
          ) : null}
        </button>
        <button type="button" className="zone1-report-strip-fate" onClick={onOpenFate}>
          命定之人
        </button>
      </div>

      <div className="zone1-quick-post-row">
        <button type="button" className="zone1-publish-entry-btn" onClick={onOpenPublish}>
          发布分身动态
        </button>
      </div>

      <div className="zone1-feed-grid">
        {posts.map((item) => (
          <FeedCard key={item.id} item={item} />
        ))}
      </div>
    </AppShell>
  );
}

function FeedCard({ item }) {
  const type = item.type || "text";
  const footer = (
    <div className="zone1-feed-footer">
      <div className="zone1-feed-avatar zone1-feed-avatar-sm">{item.author?.slice(0, 1) || "?"}</div>
      <span className="zone1-feed-author">{item.author || ""}</span>
      <span className="zone1-feed-actions">
        <span>↗ {item.shareCount ?? 0}</span>
        <span>♥ {item.likeCount ?? 0}</span>
      </span>
    </div>
  );

  if (type === "imageText") {
    return (
      <article className="zone1-feed-item zone1-feed-image-text">
        <div
          className="zone1-feed-thumb zone1-feed-thumb-single"
          style={{ ["--thumb-label"]: `"${(item.imageLabel || "图").slice(0, 4)}"` }}
        />
        <p className="zone1-feed-item-title">{item.title || item.content || ""}</p>
        {footer}
      </article>
    );
  }
  if (type === "videoText") {
    return (
      <article className="zone1-feed-item zone1-feed-video-text">
        <div className="zone1-feed-video-wrap">
          <span className="zone1-feed-video-play" aria-hidden>▶</span>
          <span className="zone1-feed-video-label">{item.videoLabel || "视频"}</span>
        </div>
        <p className="zone1-feed-item-title">{item.title || item.content || ""}</p>
        {footer}
      </article>
    );
  }
  if (type === "voice") {
    return (
      <article className="zone1-feed-item zone1-feed-voice">
        <div className="zone1-voice-bar zone1-voice-bar-inline">
          <button type="button" className="zone1-voice-play" aria-label="播放">▶</button>
          <div className="zone1-voice-wave" />
          <span className="zone1-voice-duration">{item.duration || "0:18"}</span>
        </div>
        {footer}
      </article>
    );
  }
  const content = item.content || item.title || "";
  return (
    <article className="zone1-feed-item zone1-feed-text">
      <p className="zone1-feed-text-content">{content}</p>
      {item.time && <span className="zone1-feed-time">{item.time}</span>}
      {footer}
    </article>
  );
}

function PublishFlowPage({ onBack, onConfirm }) {
  const [step, setStep] = useState("select");
  const [selected, setSelected] = useState(null);
  const [caption, setCaption] = useState("");

  const handleSelect = (preset) => {
    setSelected(preset);
    setCaption(preset.content);
    setStep("confirm");
  };

  const handlePublish = () => {
    if (selected) {
      onConfirm(selected, caption);
      onBack();
    }
  };

  if (step === "confirm" && selected) {
    return (
      <AppShell
        title="确认发布"
        subtitle="配图与配文由你最终确认后发布。"
        onBack={() => setStep("select")}
        progress="发布"
        primaryAction={{ label: "确认发布", onClick: handlePublish }}
        secondaryAction={{ label: "返回", onClick: () => setStep("select") }}
      >
        <div className="zone1-publish-confirm">
          <div
            className="zone1-feed-thumb zone1-publish-preview-thumb"
            style={{ ["--thumb-label"]: `"${(selected.imageLabel || selected.scene).slice(0, 4)}"` }}
          />
          <label className="zone1-publish-label">配文（可编辑）</label>
          <textarea
            className="zone1-textarea zone1-publish-textarea"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="写下这一刻的文案"
            rows={4}
          />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell
      title="发布分身动态"
      subtitle="选择场景与配图，配文可下一步编辑并确认。"
      onBack={onBack}
      progress="配图+配文"
    >
      <div className="zone1-preset-grid">
        {quickSceneryPresets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className="zone1-preset-card"
            onClick={() => handleSelect(preset)}
          >
            <div
              className="zone1-feed-thumb zone1-preset-thumb"
              style={{ ["--thumb-label"]: `"${(preset.imageLabel || preset.scene).slice(0, 4)}"` }}
            />
            <div className="zone1-preset-text">
              <span className="zone1-preset-scene">{preset.scene}</span>
              <p className="zone1-preset-title">{preset.title}</p>
            </div>
          </button>
        ))}
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
      progress="11 / 11"
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

