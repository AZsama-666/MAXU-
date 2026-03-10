import { useMemo, useState } from "react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";
import { PhoneFrame } from "../../components/PhoneFrame";
import {
  feedComments,
  feedSeeds,
  taskCards,
  zone1CompletionNotes,
  zone1FlowLinks
} from "./data";

export function Zone1Prototype() {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setPosts] = useState(feedSeeds);
  const [draft, setDraft] = useState(
    "记录玛薯宇宙的日常：今晚想把分身投放到 livehouse 门口，看看会遇见谁。"
  );
  const [publishScene, setPublishScene] = useState("livehouse");
  const [icebreakOpened, setIcebreakOpened] = useState(false);

  const currentLink = useMemo(() => {
    return (
      zone1FlowLinks.find((item) => location.pathname.startsWith(item.path.replace("/post-1", ""))) ||
      zone1FlowLinks.find((item) => item.path === location.pathname) ||
      zone1FlowLinks[0]
    );
  }, [location.pathname]);

  const publishPost = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;

    const nextPost = {
      id: `post-${posts.length + 1}`,
      author: "你",
      scene: publishScene,
      time: "刚刚",
      title: "我也想把今晚的世界痕迹记录下来",
      content: trimmed,
      stats: { likes: 0, comments: 0, echoes: 0 }
    };

    setPosts((current) => [nextPost, ...current]);
    navigate(`/zone1/detail/${nextPost.id}`);
  };

  return (
    <div className="prototype-layout">
      <aside className="prototype-sidebar">
        <div className="sidebar-card">
          <span className="sidebar-eyebrow">MAXU Prototype</span>
          <h1>Zone1 首页与广场流</h1>
          <p>当前按高保真演示版推进，保留“开屏入口到命运推荐、动态广场、发布、动态详情”的完整展示路径。</p>
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
          <div className="sidebar-section-title">本轮补强重点</div>
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
            <h2>Zone1: 首页与广场流</h2>
            <p>同时支持常规开屏和回流入口，所有页面都在 APP 手机壳里高保真演示。</p>
          </div>
          <div className="stage-badge">High Fidelity Showcase</div>
        </div>

        <PhoneFrame>
          <Routes>
            <Route path="/" element={<Navigate to="/zone1/opening" replace />} />
            <Route
              path="opening"
              element={
                <OpeningPage
                  onNext={() => navigate("/zone1/recommend")}
                  onGoReactivation={() => navigate("/zone1/reactivation")}
                />
              }
            />
            <Route
              path="reactivation"
              element={
                <ReactivationPage
                  onNext={() => navigate("/zone1/recommend")}
                  onGoOpening={() => navigate("/zone1/opening")}
                />
              }
            />
            <Route
              path="recommend"
              element={
                <RecommendPage
                  onBackToZone0={() => navigate("/zone0/login")}
                  onOpenPlaza={() => navigate("/zone1/plaza")}
                  onOpenReactivation={() => navigate("/zone1/reactivation")}
                  onStartIcebreak={() => setIcebreakOpened(true)}
                  icebreakOpened={icebreakOpened}
                  onCloseIcebreak={() => setIcebreakOpened(false)}
                />
              }
            />
            <Route
              path="plaza"
              element={
                <PlazaPage
                  posts={posts}
                  onGoRecommend={() => navigate("/zone1/recommend")}
                  onOpenComposer={() => navigate("/zone1/post")}
                  onOpenDetail={(postId) => navigate(`/zone1/detail/${postId}`)}
                />
              }
            />
            <Route
              path="post"
              element={
                <PostComposerPage
                  draft={draft}
                  setDraft={setDraft}
                  publishScene={publishScene}
                  setPublishScene={setPublishScene}
                  onBack={() => navigate("/zone1/plaza")}
                  onPublish={publishPost}
                />
              }
            />
            <Route
              path="detail/:postId"
              element={
                <DetailPage
                  posts={posts}
                  onBack={() => navigate("/zone1/plaza")}
                  onReply={() => navigate("/zone1/post")}
                />
              }
            />
            <Route path="*" element={<Navigate to="/zone1/opening" replace />} />
          </Routes>
        </PhoneFrame>
      </main>
    </div>
  );
}

function OpeningPage({ onNext, onGoReactivation }) {
  return (
    <div className="zone1-screen zone1-opening-screen">
      <div className="zone1-opening-content">
        <div className="zone1-hero-icon">◎</div>
        <div className="zone1-opening-copy">
          <span className="zone1-overline">开屏: 三态驱动</span>
          <h3>今日任务</h3>
          <p>先决定今晚去哪，分身的世界才会开始发生新的相遇和痕迹。</p>
        </div>

        <div className="zone1-task-list">
          {taskCards.map((item) => (
            <div key={item.title} className="zone1-task-card">
              <div>
                <strong>{item.title}</strong>
                <p>{item.desc}</p>
              </div>
              <span className="zone1-task-tag">{item.type}</span>
            </div>
          ))}
        </div>

        <div className="zone1-dual-actions">
          <button type="button" className="primary-button" onClick={onNext}>
            去完成
          </button>
          <button type="button" className="secondary-button" onClick={onGoReactivation}>
            看回流打捞开屏
          </button>
        </div>
      </div>
    </div>
  );
}

function ReactivationPage({ onNext, onGoOpening }) {
  return (
    <div className="zone1-screen zone1-reactivation-screen">
      <div className="zone1-reactivation-panel">
        <div className="zone1-reactivation-icon">⏳</div>
        <span className="zone1-overline zone1-overline-gold">打捞召回开屏</span>
        <h3>时空回溯打捞</h3>
        <p>
          你不在的 7 天，错过了 3 个高契合灵魂。今晚世界仍然愿意为你开一个回到命运里的入口。
        </p>
        <div className="zone1-dual-actions">
          <button type="button" className="primary-button zone1-gold-button" onClick={onNext}>
            复活一段宿命
          </button>
          <button type="button" className="secondary-button zone1-dark-secondary" onClick={onGoOpening}>
            返回常规开屏
          </button>
        </div>
      </div>
    </div>
  );
}

function RecommendPage({
  onBackToZone0,
  onOpenPlaza,
  onOpenReactivation,
  onStartIcebreak,
  icebreakOpened,
  onCloseIcebreak
}) {
  return (
    <div className="zone1-screen zone1-home-screen">
      <div className="zone1-home-header">
        <div>
          <span className="zone1-overline">玛薯</span>
          <h3>首页：命运推荐</h3>
        </div>
        <button type="button" className="zone1-map-pill" onClick={onOpenPlaza}>
          手帐地图 →
        </button>
      </div>

      <div className="zone1-status-ribbon">
        <span>分身在线</span>
        <span>今晚驻扎：66号公路</span>
      </div>

      <div className="zone1-fate-card">
        <div className="zone1-avatar-orb">
          <span>K</span>
          <div className="zone1-avatar-dot" />
        </div>
        <div className="zone1-card-copy">
          <span className="zone1-pill">游离态对象</span>
          <h4>[游离] K</h4>
          <p>契合度 95% · 都在寻找赛博朋克与夜间公路里的真实回响。</p>
        </div>
        <div className="zone1-chip-row">
          <span className="zone1-chip">雪山</span>
          <span className="zone1-chip">机车</span>
          <span className="zone1-chip">午夜出发</span>
        </div>
        <button type="button" className="primary-button" onClick={onStartIcebreak}>
          发起盲盒破冰
        </button>
      </div>

      <div className="zone1-section-card">
        <div className="zone1-section-head">
          <strong>双入口切换</strong>
          <button type="button" className="text-link" onClick={onOpenReactivation}>
            查看打捞召回开屏
          </button>
        </div>
        <p>常规用户从今日任务切入，回流用户可从打捞开屏重新进入世界主线。</p>
      </div>

      <div className="zone1-section-card">
        <div className="zone1-section-head">
          <strong>动态广场</strong>
          <button type="button" className="text-link" onClick={onOpenPlaza}>
            去看看 →
          </button>
        </div>
        <p>你也可以先从世界动态进入，看看今天大家都在什么场域留下了什么痕迹。</p>
      </div>

      <div className="bottom-tabbar">
        <button type="button" className="tabbar-item tabbar-item-active">
          首页
        </button>
        <button type="button" className="tabbar-item" onClick={onBackToZone0}>
          回 Zone0
        </button>
        <button type="button" className="tabbar-item" onClick={onOpenPlaza}>
          广场
        </button>
        <button type="button" className="tabbar-item">
          双生
        </button>
      </div>

      {icebreakOpened ? (
        <div className="overlay">
          <div className="overlay-card">
            <h3>盲盒破冰已发起</h3>
            <p>
              当前为了保持 Zone1 演示聚焦，盲盒会话入口先提示为已创建；后续会在 Zone3
              消息流中展开完整宿命链路。
            </p>
            <div className="overlay-actions">
              <button type="button" className="ghost-button" onClick={onCloseIcebreak}>
                继续留在首页
              </button>
              <button type="button" className="primary-button" onClick={onOpenPlaza}>
                去动态广场
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function PlazaPage({ posts, onGoRecommend, onOpenComposer, onOpenDetail }) {
  return (
    <div className="zone1-screen zone1-plaza-screen">
      <div className="zone1-plaza-header">
        <button type="button" className="zone1-tab-toggle" onClick={onGoRecommend}>
          推荐
        </button>
        <button type="button" className="zone1-tab-toggle zone1-tab-toggle-active">
          动态
        </button>
      </div>

      <div className="zone1-scene-banner">
        <div>
          <span className="zone1-overline">今日世界热度</span>
          <strong>机车部 / livehouse / 雪山营地</strong>
        </div>
        <button type="button" className="text-link" onClick={onGoRecommend}>
          返回命运推荐
        </button>
      </div>

      <div className="zone1-feed-list">
        {posts.map((post) => (
          <button
            key={post.id}
            type="button"
            className="zone1-feed-card"
            onClick={() => onOpenDetail(post.id)}
          >
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
            <div className="zone1-feed-stats">
              <span>赞 {post.stats.likes}</span>
              <span>评论 {post.stats.comments}</span>
              <span>回响 {post.stats.echoes}</span>
            </div>
          </button>
        ))}
      </div>

      <button type="button" className="zone1-floating-post" onClick={onOpenComposer}>
        ＋ 发布动态
      </button>

      <div className="bottom-tabbar">
        <button type="button" className="tabbar-item tabbar-item-active">
          首页
        </button>
        <button type="button" className="tabbar-item">
          羁绊
        </button>
        <button type="button" className="tabbar-item">
          消息
        </button>
        <button type="button" className="tabbar-item">
          双生
        </button>
      </div>
    </div>
  );
}

function PostComposerPage({
  draft,
  setDraft,
  publishScene,
  setPublishScene,
  onBack,
  onPublish
}) {
  return (
    <div className="zone1-screen zone1-post-screen">
      <div className="zone1-detail-header">
        <button type="button" className="icon-button" onClick={onBack}>
          ←
        </button>
        <strong>发布瞬间</strong>
        <button type="button" className="text-link" onClick={onPublish}>
          发布
        </button>
      </div>

      <div className="zone1-compose-card">
        <textarea
          className="zone1-textarea"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="记录玛薯宇宙的日常..."
        />
        <div className="zone1-scene-selector">
          {["机车部", "livehouse", "雪山营地"].map((scene) => (
            <button
              key={scene}
              type="button"
              className={
                scene === publishScene
                  ? "zone1-scene-chip zone1-scene-chip-active"
                  : "zone1-scene-chip"
              }
              onClick={() => setPublishScene(scene)}
            >
              {scene}
            </button>
          ))}
        </div>
        <div className="zone1-upload-grid">
          <div className="zone1-upload-box">＋ 图片</div>
          <div className="zone1-upload-box">🎵 音频</div>
          <div className="zone1-upload-box">📍 场景定位</div>
        </div>
      </div>
    </div>
  );
}

function DetailPage({ posts, onBack, onReply }) {
  const { postId } = useParams();
  const post = posts.find((item) => item.id === postId) || posts[0];

  return (
    <div className="zone1-screen zone1-detail-screen">
      <div className="zone1-detail-header">
        <button type="button" className="icon-button" onClick={onBack}>
          ←
        </button>
        <strong>动态详情</strong>
        <button type="button" className="text-link" onClick={onReply}>
          评论
        </button>
      </div>

      <div className="zone1-detail-card">
        <div className="zone1-feed-head">
          <div className="zone1-feed-avatar">{post.author.slice(0, 1)}</div>
          <div className="zone1-feed-meta">
            <strong>{post.author}</strong>
            <span>
              {post.scene} · {post.time}
            </span>
          </div>
        </div>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        <div className="zone1-detail-media" />
        <div className="zone1-feed-stats">
          <span>赞 {post.stats.likes}</span>
          <span>评论 {post.stats.comments}</span>
          <span>回响 {post.stats.echoes}</span>
        </div>
      </div>

      <div className="zone1-comments-card">
        <strong>评论区</strong>
        <div className="zone1-comment-list">
          {feedComments.map((comment) => (
            <div key={comment} className="zone1-comment-item">
              <div className="zone1-comment-avatar">·</div>
              <p>{comment}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="zone1-comment-bar">
        <input className="zone1-comment-input" placeholder="写下你的评论..." />
        <button type="button" className="primary-button" onClick={onReply}>
          发送
        </button>
      </div>
    </div>
  );
}
