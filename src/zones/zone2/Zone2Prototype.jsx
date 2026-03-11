import { useMemo, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { AppShell } from "../../components/AppShell";
import { PhoneFrame } from "../../components/PhoneFrame";
import { bondSummaries, bondStorylines, zone2CompletionNotes, zone2FlowLinks } from "./data";

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
      title="关系"
      onBack={onBack}
      progress="13 / 17"
      bottomNav={{ activeTab: "relations" }}
    >
      <div className="zone2-list-single">
        {bondSummaries.map((item) => {
          const storyCount = (bondStorylines[item.id] || []).length;
          const firstStory = (bondStorylines[item.id] || [])[0];
          const lastStory = (bondStorylines[item.id] || []).slice(-1)[0];
          return (
            <button
              key={item.id}
              type="button"
              className="zone2-bond-card-clean"
              onClick={() => onOpenBond(item.id)}
            >
              <div className="zone2-bond-card-top">
                <span className="zone2-bond-name">{item.name}</span>
              </div>
              {storyCount > 0 ? (
                <div className="zone2-bond-story-hint">
                  <span className="zone2-bond-story-count">{storyCount} 条故事</span>
                  {firstStory && (
                    <span className="zone2-bond-story-range">
                      {firstStory.time} → {lastStory?.time || firstStory.time}
                    </span>
                  )}
                </div>
              ) : (
                <p className="zone2-bond-story-hint zone2-bond-no-story">暂无故事线</p>
              )}
            </button>
          );
        })}
      </div>
    </AppShell>
  );
}

const STORY_PAGE_SIZE = 4;

function BondDetailPage({ onBack, onGoMessages }) {
  const bond = useBond();
  const storyline = bondStorylines[bond.id] || [];
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(storyline.length / STORY_PAGE_SIZE));
  const start = (page - 1) * STORY_PAGE_SIZE;
  const pageItems = storyline.slice(start, start + STORY_PAGE_SIZE);
  const firstStory = storyline[0];
  const lastStory = storyline[storyline.length - 1];

  return (
    <AppShell
      title="关系详情"
      onBack={onBack}
      progress="14 / 17"
      bottomNav={{ activeTab: "relations" }}
      primaryAction={{ label: "续写下一章", onClick: onGoMessages }}
    >
      {storyline.length > 0 && (
        <div className="zone2-story-meta">
          <span className="zone2-story-meta-count">{storyline.length} 条故事</span>
          <span className="zone2-story-meta-range">
            {firstStory.time} · 最近停在 {lastStory.time}
          </span>
        </div>
      )}

      {storyline.length === 0 ? (
        <p className="zone2-story-empty">暂无小故事，等待双方继续互动生成。</p>
      ) : (
        <>
          <div className="zone2-story-grid">
            {pageItems.map((node, index) => (
              <div key={start + index} className="zone2-story-card">
                <div
                  className="zone2-story-card-image"
                  style={{
                    ["--thumb-label"]: `"${(node.imageLabel || "故事").slice(0, 4)}"`
                  }}
                />
                <p className="zone2-story-card-snippet">{node.snippet}</p>
                <span className="zone2-story-card-time">{node.time}</span>
              </div>
            ))}
          </div>
          <div className="zone2-story-pagination">
            {page > 1 && (
              <button type="button" onClick={() => setPage((p) => p - 1)}>
                上一页
              </button>
            )}
            <span className="zone2-story-page-indicator">
              {page}/{totalPages} Page
            </span>
            {page < totalPages && (
              <button type="button" onClick={() => setPage((p) => p + 1)}>
                下一页
              </button>
            )}
          </div>
        </>
      )}
    </AppShell>
  );
}
