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
import { AppShell } from "../../components/AppShell";
import { PhoneFrame } from "../../components/PhoneFrame";
import {
  controlStateMeta,
  echoDetails,
  fateCandidatesByRoute,
  feedComments,
  homeUnmaskingPreview,
  lifeSegments,
  offlineInstructionPresets,
  openingTasks,
  publishSceneOptions,
  relevantUpdatesByRoute,
  takeoverOptions,
  taskBundlesByRoute,
  twinProfile,
  worldBackgroundFeed,
  worldEntriesByRoute,
  zone1CompletionNotes,
  zone1FlowLinks
} from "./data";

const defaultRouteId = takeoverOptions[0].id;

function matchFlowLink(pathname) {
  if (pathname.startsWith("/zone1/echo/")) {
    return zone1FlowLinks.find((item) => item.path.startsWith("/zone1/echo/"));
  }

  if (pathname.startsWith("/zone1/detail/")) {
    return zone1FlowLinks.find((item) => item.path.startsWith("/zone1/detail/"));
  }

  return zone1FlowLinks.find((item) => pathname.startsWith(item.path)) || zone1FlowLinks[0];
}

function getRouteInstruction(routeId) {
  return (
    offlineInstructionPresets.find((item) => item.routePreference === routeId) ||
    offlineInstructionPresets[0]
  );
}

export function Zone1Prototype() {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setPosts] = useState(worldBackgroundFeed);
  const [draft, setDraft] = useState(
    "我决定先把这段夜晚当作背景证据留下来：刚从机车部门口转身，整个世界都像还在响。"
  );
  const [publishScene, setPublishScene] = useState(publishSceneOptions[0]);
  const [selectedRoute, setSelectedRoute] = useState(defaultRouteId);
  const [controlState, setControlState] = useState("takeover_pending");
  const [currentLifeSegment, setCurrentLifeSegment] = useState(lifeSegments[defaultRouteId]);
  const [activeRelevantUpdate, setActiveRelevantUpdate] = useState(
    relevantUpdatesByRoute[defaultRouteId][0].id
  );
  const [activeInstructionPreview, setActiveInstructionPreview] = useState(
    getRouteInstruction(defaultRouteId).id
  );
  const [observeOnly, setObserveOnly] = useState(false);
  const [showTwinBridge, setShowTwinBridge] = useState(false);

  const currentLink = useMemo(() => matchFlowLink(location.pathname), [location.pathname]);
  const controlStateInfo = controlStateMeta[controlState];
  const currentTasks = taskBundlesByRoute[selectedRoute];
  const currentFate = fateCandidatesByRoute[selectedRoute];
  const currentUpdates = relevantUpdatesByRoute[selectedRoute];
  const currentWorldEntry = worldEntriesByRoute[selectedRoute];
  const currentInstruction =
    offlineInstructionPresets.find((item) => item.id === activeInstructionPreview) ||
    offlineInstructionPresets[0];

  const applyRoute = (routeId) => {
    setSelectedRoute(routeId);
    setCurrentLifeSegment(lifeSegments[routeId]);
    setActiveRelevantUpdate(relevantUpdatesByRoute[routeId][0].id);
    setActiveInstructionPreview(getRouteInstruction(routeId).id);
  };

  const goFromTask = (destination) => {
    navigate(destination === "fate" ? "/zone1/fate" : "/zone1/close-updates");
  };

  const handleTakeoverContinue = () => {
    setControlState("user_driving");
    setObserveOnly(false);
    navigate("/zone1/today-tasks");
  };

  const handleObserveContinue = () => {
    setControlState("takeover_pending");
    setObserveOnly(true);
    navigate("/zone1/today-tasks");
  };

  const handleOpenEcho = (echoId) => {
    setActiveRelevantUpdate(echoId);
    navigate(`/zone1/echo/${echoId}`);
  };

  const handlePreviewInstruction = (instructionId) => {
    setActiveInstructionPreview(instructionId);
    setControlState("twin_directed");
  };

  const handlePreviewAutonomous = () => {
    setControlState("twin_autonomous");
  };

  const publishPost = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;

    const nextPost = {
      id: `post-${posts.length + 1}`,
      author: "你",
      scene: publishScene,
      time: "刚刚",
      title: `我在 ${publishScene} 留下一条背景记录`,
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
          <h1>Zone1 工程化重做</h1>
          <p>
            这版不再把首页做成模块堆叠，而是像 Zone0 一样拆成连续分镜：先看到
            Zero 的此刻，再决定接管、今晚去向、关系机会和背景世界。
          </p>
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
          <div className="sidebar-section-title">本轮重构重点</div>
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
            <h2>Zone1: 接管分身人生主线</h2>
            <p>
              首页先看分身正在经历什么，再由你的选择决定任务、命运机会、相关动态和下线后的生活方向。
            </p>
          </div>
          <div className="zone1-stage-badges">
            <div className="stage-badge stage-badge-small">{controlStateInfo.label}</div>
            <div className="stage-badge stage-badge-small">{currentLifeSegment.sceneName}</div>
          </div>
        </div>

        <PhoneFrame>
          <Routes>
            <Route path="/" element={<Navigate to="/zone1/opening" replace />} />
            <Route
              path="opening"
              element={
                <OpeningPage
                  controlStateInfo={controlStateInfo}
                  onBack={() => navigate("/zone0/identity")}
                  onNext={() => navigate("/zone1/home-life")}
                  onGoReactivation={() => navigate("/zone1/reactivation")}
                />
              }
            />
            <Route
              path="reactivation"
              element={
                <ReactivationPage
                  controlStateInfo={controlStateInfo}
                  onBack={() => navigate("/zone0/identity")}
                  onNext={() => navigate("/zone1/home-life")}
                  onGoOpening={() => navigate("/zone1/opening")}
                />
              }
            />
            <Route
              path="home-life"
              element={
                <HomeLifePage
                  controlStateInfo={controlStateInfo}
                  currentLifeSegment={currentLifeSegment}
                  homeUnmaskingPreview={homeUnmaskingPreview}
                  instructionPreview={currentInstruction}
                  onBackToZone0={() => navigate("/zone0/identity")}
                  onOpenWorldEntry={() => navigate("/zone1/world-entry")}
                  onNext={() => navigate("/zone1/enter-life")}
                  onOpenTwinBridge={() => setShowTwinBridge(true)}
                  onOpenBonds={() => navigate("/zone2/list")}
                  onOpenMessages={() => navigate("/zone3/inbox")}
                  onOpenUnmask={() => navigate("/zone3/unmask")}
                  onOpenTwin={() => navigate("/zone4/hub")}
                  onOpenWorldMap={() => navigate("/zone5/map")}
                />
              }
            />
            <Route
              path="enter-life"
              element={
                <EnterLifePage
                  controlStateInfo={controlStateInfo}
                  currentLifeSegment={currentLifeSegment}
                  selectedRoute={selectedRoute}
                  onSelectRoute={applyRoute}
                  onBack={() => navigate("/zone1/home-life")}
                  onTakeover={handleTakeoverContinue}
                  onObserve={handleObserveContinue}
                />
              }
            />
            <Route
              path="today-tasks"
              element={
                <TodayTasksPage
                  controlStateInfo={controlStateInfo}
                  currentLifeSegment={currentLifeSegment}
                  observeOnly={observeOnly}
                  tasks={currentTasks}
                  onBack={() => navigate("/zone1/enter-life")}
                  onPrimary={() => goFromTask(currentTasks[0].destination)}
                  onSecondary={() => goFromTask(currentTasks[1].destination)}
                  onOpenTask={goFromTask}
                />
              }
            />
            <Route
              path="fate"
              element={
                <FatePage
                  controlStateInfo={controlStateInfo}
                  currentLifeSegment={currentLifeSegment}
                  fate={currentFate}
                  onBack={() => navigate("/zone1/today-tasks")}
                  onNext={() => navigate("/zone1/close-updates")}
                />
              }
            />
            <Route
              path="close-updates"
              element={
                <CloseUpdatesPage
                  currentLifeSegment={currentLifeSegment}
                  updates={currentUpdates}
                  onBack={() => navigate("/zone1/fate")}
                  onOpenDetail={handleOpenEcho}
                />
              }
            />
            <Route
              path="echo/:echoId"
              element={
                <EchoDetailPage
                  updates={currentUpdates}
                  currentLifeSegment={currentLifeSegment}
                  onBack={() => navigate("/zone1/close-updates")}
                  onNext={() => navigate("/zone1/world-entry")}
                  onOpenOtherEcho={handleOpenEcho}
                />
              }
            />
            <Route
              path="world-entry"
              element={
                <WorldEntryPage
                  controlState={controlState}
                  currentInstruction={currentInstruction}
                  currentWorldEntry={currentWorldEntry}
                  onBack={() => navigate(`/zone1/echo/${activeRelevantUpdate}`)}
                  onNext={() => navigate("/zone1/plaza")}
                  onPreviewInstruction={handlePreviewInstruction}
                  onPreviewAutonomous={handlePreviewAutonomous}
                  onOpenTwinBridge={() => setShowTwinBridge(true)}
                  onOpenTwin={() => navigate("/zone4/hub")}
                  onOpenWorldMap={() => navigate("/zone5/map")}
                />
              }
            />
            <Route
              path="plaza"
              element={
                <PlazaPage
                  controlStateInfo={controlStateInfo}
                  currentLifeSegment={currentLifeSegment}
                  posts={posts}
                  onGoHomeLife={() => navigate("/zone1/home-life")}
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
                  publishScene={publishScene}
                  setDraft={setDraft}
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

          {showTwinBridge ? (
            <TwinBridgeOverlay
              instruction={currentInstruction}
              onClose={() => setShowTwinBridge(false)}
              onStayAutonomous={() => {
                handlePreviewAutonomous();
                setShowTwinBridge(false);
              }}
              onKeepDirected={() => {
                handlePreviewInstruction(currentInstruction.id);
                setShowTwinBridge(false);
              }}
            />
          ) : null}
        </PhoneFrame>
      </main>
    </div>
  );
}

function OpeningPage({ controlStateInfo, onBack, onNext, onGoReactivation }) {
  return (
    <AppShell
      title="你的数字人已经开始生活"
      subtitle="Zone1 先带你进入 Zero 正在经历的夜晚，而不是先刷公共流。"
      onBack={onBack}
      dark
      progress="09 / 20"
      footerTone="dark"
      primaryAction={{ label: "进入今日主线", onClick: onNext }}
      secondaryAction={{ label: "看回流打捞开屏", onClick: onGoReactivation }}
    >
      <div className="cosmic-panel zone1-panel-glow">
        <div className="zone1-hero-icon">◎</div>
        <span className="dark-badge">上线 = 接管分身人生</span>
        <h3>今天的首页不是“看热闹”</h3>
        <p>你会先看到 Zero 的此刻，再决定这段人生要往哪里推进。</p>
      </div>

      <div className="zone1-state-row">
        <span className="zone1-state-chip zone1-state-chip-accent">{controlStateInfo.label}</span>
        <span className="zone1-state-hint">{controlStateInfo.description}</span>
      </div>

      <div className="zone1-shell-stack">
        {openingTasks.map((item) => (
          <div key={item.title} className="field-card field-card-dark">
            <strong>{item.title}</strong>
            <p className="zone1-copy-muted">{item.desc}</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

function ReactivationPage({ controlStateInfo, onBack, onNext, onGoOpening }) {
  return (
    <AppShell
      title="今晚还有一段你没来得及进入的人生"
      subtitle="你回来，不是因为世界热闹，而是因为 Zero 的这段生活还没有被你接住。"
      onBack={onBack}
      dark
      progress="10 / 20"
      footerTone="dark"
      primaryAction={{ label: "回到他的此刻", onClick: onNext }}
      secondaryAction={{ label: "返回常规开屏", onClick: onGoOpening }}
    >
      <div className="cosmic-panel zone1-panel-gold">
        <div className="zone1-reactivation-icon">⏳</div>
        <span className="zone1-overline zone1-overline-gold">打捞召回开屏</span>
        <h3>主线还在继续</h3>
        <p>Zero 没有停在原地，这一夜仍在往前走。你现在回来，依然能接管关键节点。</p>
      </div>

      <div className="field-card field-card-dark">
        <strong>{controlStateInfo.label}</strong>
        <p className="zone1-copy-muted">
          这一步不是回首页看信息，而是直接回到他已经发生中的人生片段。
        </p>
      </div>
    </AppShell>
  );
}

function HomeLifePage({
  controlStateInfo,
  currentLifeSegment,
  homeUnmaskingPreview,
  instructionPreview,
  onBackToZone0,
  onOpenWorldEntry,
  onNext,
  onOpenTwinBridge,
  onOpenBonds,
  onOpenMessages,
  onOpenUnmask,
  onOpenTwin,
  onOpenWorldMap
}) {
  return (
    <AppShell
      title="首页：Zero 正在经历的此刻"
      subtitle="首页第一眼先告诉你他现在在哪、刚发生了什么，以及你最值得接管哪一段人生。"
      onBack={onBackToZone0}
      progress="11 / 20"
      bottomNav={{ activeTab: "home" }}
      primaryAction={{ label: "进入此刻生活", onClick: onNext }}
      secondaryAction={{ label: "背景世界后看", onClick: onOpenWorldEntry }}
    >
      <div className="zone1-life-card zone1-life-card-soft">
        <div className="zone1-life-top">
          <div>
            <span className="zone1-pill">数字人状态</span>
            <h4>{twinProfile.twinName}</h4>
            <p>{twinProfile.onlineStatus}</p>
          </div>
          <span className="zone1-state-chip zone1-state-chip-accent">{controlStateInfo.label}</span>
        </div>

        <div className="zone1-life-grid">
          <div className="zone1-life-metric">
            <strong>当前场景</strong>
            <span>{twinProfile.currentScene}</span>
          </div>
          <div className="zone1-life-metric">
            <strong>停留状态</strong>
            <span>{twinProfile.stayTime}</span>
          </div>
          <div className="zone1-life-metric">
            <strong>今晚天气</strong>
            <span>{twinProfile.weather}</span>
          </div>
        </div>

        <div className="zone1-life-grid zone1-life-grid-secondary">
          <div className="zone1-life-metric">
            <strong>情绪底色</strong>
            <span>{twinProfile.mood}</span>
          </div>
          <div className="zone1-life-metric zone1-life-metric-wide">
            <strong>当前人生片段</strong>
            <span>{twinProfile.summary}</span>
          </div>
        </div>
      </div>

      <div className="status-card">
        <strong>这段人生为什么值得你先看</strong>
        <p>{currentLifeSegment.takeoverWindow}</p>
      </div>

      <div className="field-card">
        <div className="zone1-card-head">
          <strong>刚刚发生的事</strong>
          <span className="zone1-inline-tag">{currentLifeSegment.sceneName}</span>
        </div>
        <p className="zone1-copy-muted">{currentLifeSegment.recentAction}</p>
      </div>

      <div className="field-card zone1-unmask-card">
        <div className="zone1-card-head">
          <strong>{homeUnmaskingPreview.title}</strong>
          <span className="zone1-inline-tag">{homeUnmaskingPreview.badge}</span>
        </div>
        <p className="zone1-copy-muted">{homeUnmaskingPreview.desc}</p>
        <div className="zone1-inline-meta">
          <span>{homeUnmaskingPreview.countdown}</span>
          <button type="button" className="text-link" onClick={onOpenUnmask}>
            {homeUnmaskingPreview.cta}
          </button>
        </div>
      </div>

      <div className="home-card">
        <div className="zone1-card-head">
          <strong>如果你现在下线</strong>
          <button type="button" className="ghost-button" onClick={onOpenTwinBridge}>
            去双生细设
          </button>
        </div>
        <p className="zone1-copy-muted">{instructionPreview.title}</p>
        <div className="zone1-inline-meta">
          <span>场景偏好：{instructionPreview.scenePreference}</span>
          <span>关系偏好：{instructionPreview.relationPreference}</span>
        </div>
      </div>

      <div className="field-card">
        <div className="zone1-card-head">
          <strong>这条主线接下来会流向哪里</strong>
        </div>
        <div className="zone1-quick-nav-grid">
          <button type="button" className="ghost-button" onClick={onOpenBonds}>
            去羁绊看关系沉淀
          </button>
          <button type="button" className="ghost-button" onClick={onOpenMessages}>
            去消息承接沟通
          </button>
          <button type="button" className="ghost-button" onClick={onOpenTwin}>
            去双生安排下线
          </button>
          <button type="button" className="ghost-button" onClick={onOpenWorldMap}>
            去场景地图看后续
          </button>
        </div>
      </div>
    </AppShell>
  );
}

function EnterLifePage({
  controlStateInfo,
  currentLifeSegment,
  selectedRoute,
  onSelectRoute,
  onBack,
  onTakeover,
  onObserve
}) {
  return (
    <AppShell
      title="进入此刻生活"
      subtitle="这一页不只是确认跳转，而是在决定今晚这段人生由谁主导、往哪里走。"
      onBack={onBack}
      dark
      progress="12 / 20"
      bottomNav={{ activeTab: "home" }}
      footerTone="dark"
      primaryAction={{ label: "接管并继续", onClick: onTakeover }}
      secondaryAction={{ label: "先继续观察", onClick: onObserve }}
    >
      <div className="zone1-enter-card">
        <span className="zone1-overline">接管确认</span>
        <h3>{currentLifeSegment.sceneName}</h3>
        <p>{currentLifeSegment.summary}</p>
      </div>

      <div className="zone1-state-row">
        <span className="zone1-state-chip zone1-state-chip-accent">{controlStateInfo.label}</span>
        <span className="zone1-state-hint">此刻你可以立即接管，也可以先保持旁观。</span>
      </div>

      <div className="selection-list">
        {takeoverOptions.map((item) => (
          <button
            key={item.id}
            type="button"
            className={
              selectedRoute === item.id
                ? "selection-item selection-item-dark selection-item-active"
                : "selection-item selection-item-dark"
            }
            onClick={() => onSelectRoute(item.id)}
          >
            <div>
              <strong>{item.title}</strong>
              <p className="zone1-copy-muted">{item.desc}</p>
              <p className="zone1-route-impact">{item.impact}</p>
            </div>
            <span className="zone1-inline-tag">影响后续主线</span>
          </button>
        ))}
      </div>

      <div className="field-card field-card-dark">
        <strong>为什么现在就要决定</strong>
        <p className="zone1-copy-muted">{currentLifeSegment.whyNow}</p>
      </div>
    </AppShell>
  );
}

function TodayTasksPage({
  controlStateInfo,
  currentLifeSegment,
  observeOnly,
  tasks,
  onBack,
  onPrimary,
  onSecondary,
  onOpenTask
}) {
  return (
    <AppShell
      title="今日最值得做的事"
      subtitle="你选择的路线已经生效，所以这里的建议不再是固定卡片，而是会跟着今晚的人生片段变化。"
      onBack={onBack}
      progress="13 / 20"
      bottomNav={{ activeTab: "home" }}
      primaryAction={{ label: tasks[0].cta, onClick: onPrimary }}
      secondaryAction={{ label: tasks[1].cta, onClick: onSecondary }}
    >
      <div className="status-card">
        <strong>{observeOnly ? "你还在旁观模式" : controlStateInfo.label}</strong>
        <p>
          {observeOnly
            ? "你没有完全接管，所以系统先以观察视角给出建议。你仍然可以在后续任何一页重新接手。"
            : `你已经选择把今晚推进到“${currentLifeSegment.sceneName}”，后续任务会围绕这段人生展开。`}
        </p>
      </div>

      <div className="zone1-task-grid">
        {tasks.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={index === 0 ? "zone1-focus-card zone1-focus-card-primary" : "zone1-focus-card"}
            onClick={() => onOpenTask(item.destination)}
          >
            <span className="zone1-overline">{item.eyebrow}</span>
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
            <span className="zone1-inline-cta">{item.cta} →</span>
          </button>
        ))}
      </div>
    </AppShell>
  );
}

function FatePage({ controlStateInfo, currentLifeSegment, fate, onBack, onNext }) {
  return (
    <AppShell
      title="命运机会"
      subtitle={`你现在看到的机会已经受“${currentLifeSegment.sceneName}”路线影响，不再是固定推荐。`}
      onBack={onBack}
      dark
      progress="14 / 20"
      bottomNav={{ activeTab: "home" }}
      footerTone="dark"
      primaryAction={{ label: fate.cta, onClick: onNext }}
      secondaryAction={{ label: "先看强相关动态", onClick: onNext }}
    >
      <div className="zone1-state-row">
        <span className="zone1-state-chip zone1-state-chip-success">{controlStateInfo.label}</span>
        <span className="zone1-state-hint">命运机会会跟着你刚才的路线和主导状态一起变化。</span>
      </div>

      <div className="zone1-fate-card zone1-fate-card-left">
        <div className="zone1-card-copy">
          <span className="zone1-pill">命运窗口</span>
          <h4>{fate.code}</h4>
          <p>{fate.desc}</p>
        </div>
        <div className="zone1-chip-row zone1-chip-row-left">
          {fate.sceneTags.map((tag) => (
            <span key={tag} className="zone1-chip">
              {tag}
            </span>
          ))}
        </div>
        <p className="zone1-moment-copy">{fate.moment}</p>
      </div>
    </AppShell>
  );
}

function CloseUpdatesPage({ currentLifeSegment, updates, onBack, onOpenDetail }) {
  return (
    <AppShell
      title="我关心的人动态"
      subtitle={`这些回响之所以被抬到前面，是因为你刚才把人生推进到了“${currentLifeSegment.sceneName}”。`}
      onBack={onBack}
      progress="15 / 20"
      bottomNav={{ activeTab: "home" }}
      primaryAction={{ label: `查看 ${updates[0].author} 的回响`, onClick: () => onOpenDetail(updates[0].id) }}
      secondaryAction={{
        label: `再看 ${updates[1].author} 的线索`,
        onClick: () => onOpenDetail(updates[1].id)
      }}
    >
      <div className="zone1-close-update-list">
        {updates.map((item) => (
          <button
            key={item.id}
            type="button"
            className="zone1-close-update-card"
            onClick={() => onOpenDetail(item.id)}
          >
            <div className="zone1-feed-head">
              <div className="zone1-feed-avatar">{item.author.slice(0, 1)}</div>
              <div className="zone1-feed-meta">
                <strong>{item.author}</strong>
                <span>
                  {item.relation} · {item.scene} · {item.time}
                </span>
              </div>
            </div>
            <h4>{item.title}</h4>
            <p>{item.content}</p>
            <div className="zone1-feed-relevance">{item.relevance}</div>
            <span className="zone1-inline-cta">{item.cta} →</span>
          </button>
        ))}
      </div>
    </AppShell>
  );
}

function EchoDetailPage({ updates, currentLifeSegment, onBack, onNext, onOpenOtherEcho }) {
  const { echoId } = useParams();
  const detail = echoDetails[echoId] || echoDetails[updates[0].id];
  const anotherUpdate = updates.find((item) => item.id !== echoId);

  return (
    <AppShell
      title="回响详情"
      subtitle={`你看的不是普通内容，而是会影响“${currentLifeSegment.sceneName}”主线的关系或世界证据。`}
      onBack={onBack}
      progress="16 / 20"
      bottomNav={{ activeTab: "home" }}
      primaryAction={{ label: "再看看这个世界还发生了什么", onClick: onNext }}
      secondaryAction={
        anotherUpdate
          ? {
              label: `切到 ${anotherUpdate.author} 的回响`,
              onClick: () => onOpenOtherEcho(anotherUpdate.id)
            }
          : undefined
      }
    >
      <div className="zone1-detail-card">
        <div className="zone1-feed-head">
          <div className="zone1-feed-avatar">{detail.author.slice(0, 1)}</div>
          <div className="zone1-feed-meta">
            <strong>{detail.author}</strong>
            <span>{detail.scene}</span>
          </div>
        </div>
        <h3>{detail.title}</h3>
        <p>{detail.detail}</p>
        <div className="zone1-detail-media" />
        <div className="zone1-proof-box">{detail.proof}</div>
      </div>

      <div className="status-card">
        <strong>这条回响会如何影响后续人生</strong>
        <p>{detail.effect}</p>
      </div>
    </AppShell>
  );
}

function WorldEntryPage({
  controlState,
  currentInstruction,
  currentWorldEntry,
  onBack,
  onNext,
  onPreviewInstruction,
  onPreviewAutonomous,
  onOpenTwinBridge,
  onOpenTwin,
  onOpenWorldMap
}) {
  return (
    <AppShell
      title="世界背景入口"
      subtitle="主线先走完，再决定要不要打开公共世界背景；同时也可以预演下线后分身要怎么继续生活。"
      onBack={onBack}
      progress="17 / 20"
      bottomNav={{ activeTab: "home" }}
      primaryAction={{ label: "打开公共世界背景", onClick: onNext }}
      secondaryAction={{ label: "去双生细设离线指令", onClick: onOpenTwinBridge }}
    >
      <div className="zone1-enter-card zone1-world-entry-card">
        <span className="zone1-overline">转入背景层</span>
        <h3>{currentWorldEntry.title}</h3>
        <p>{currentWorldEntry.desc}</p>
      </div>

      <div className="zone1-evidence-list">
        {currentWorldEntry.evidence.map((item) => (
          <div key={item} className="status-card">
            <strong>世界证据</strong>
            <p>{item}</p>
          </div>
        ))}
      </div>

      <div className="selection-list">
        <button
          type="button"
          className={
            controlState === "twin_directed"
              ? "selection-item selection-item-active"
              : "selection-item"
          }
          onClick={() => onPreviewInstruction(currentInstruction.id)}
        >
          <div>
            <strong>{currentInstruction.title}</strong>
            <p className="zone1-copy-muted">{currentInstruction.desc}</p>
            <p className="zone1-route-impact">
              场景偏好：{currentInstruction.scenePreference} · 关系偏好：
              {currentInstruction.relationPreference}
            </p>
          </div>
          <span className="zone1-inline-tag">预演指令下线</span>
        </button>

        <button
          type="button"
          className={
            controlState === "twin_autonomous"
              ? "selection-item selection-item-active"
              : "selection-item"
          }
          onClick={onPreviewAutonomous}
        >
          <div>
            <strong>保持自由意志</strong>
            <p className="zone1-copy-muted">
              如果你现在不下指令，Zero 会按自己的人格底色、场景热度和关系状态继续生活。
            </p>
          </div>
          <span className="zone1-inline-tag">预演自由托管</span>
        </button>
      </div>

      <div className="zone1-quick-nav-grid">
        <button type="button" className="ghost-button" onClick={onOpenTwin}>
          去双生正式配置
        </button>
        <button type="button" className="ghost-button" onClick={onOpenWorldMap}>
          去世界地图选场景
        </button>
        <button type="button" className="ghost-button" onClick={onOpenTwinBridge}>
          先看双生入口预告
        </button>
      </div>
    </AppShell>
  );
}

function PlazaPage({ controlStateInfo, currentLifeSegment, posts, onGoHomeLife, onOpenComposer, onOpenDetail }) {
  return (
    <AppShell
      title="公共世界背景"
      subtitle="这里保留公共动态，证明世界还在继续运转；但它已经被放到主线后段，不再吞掉首页注意力。"
      onBack={onGoHomeLife}
      progress="18 / 20"
      bottomNav={{ activeTab: "home" }}
      primaryAction={{ label: "记录背景动态", onClick: onOpenComposer }}
      secondaryAction={{ label: "返回主线首页", onClick: onGoHomeLife }}
    >
      <div className="zone1-scene-banner">
        <div>
          <span className="zone1-overline">主线已完成</span>
          <strong>
            当前主线：{currentLifeSegment.sceneName} · 当前状态：{controlStateInfo.label}
          </strong>
        </div>
      </div>

      <div className="zone1-feed-list">
        {posts.map((post) => (
          <button
            key={post.id}
            type="button"
            className="zone1-feed-card zone1-feed-card-muted"
            onClick={() => onOpenDetail(post.id)}
          >
            <div className="zone1-feed-head">
              <div className="zone1-feed-avatar">{post.author.slice(0, 1)}</div>
              <div className="zone1-feed-meta">
                <strong>{post.author}</strong>
                <span>
                  公共世界 · {post.scene} · {post.time}
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
    </AppShell>
  );
}

function PostComposerPage({
  draft,
  publishScene,
  setDraft,
  setPublishScene,
  onBack,
  onPublish
}) {
  return (
    <AppShell
      title="发布背景动态"
      subtitle="发布入口被保留下来，但它只属于世界背景分支，不再抢首页主叙事。"
      onBack={onBack}
      progress="19 / 20"
      bottomNav={{ activeTab: "home" }}
      primaryAction={{ label: "发布背景动态", onClick: onPublish, disabled: !draft.trim() }}
      secondaryAction={{ label: "返回背景层", onClick: onBack }}
    >
      <div className="field-card">
        <div className="zone1-post-intro">
          <span className="zone1-overline">不打断首页主线</span>
          <p>你仍然可以记录这个世界，但这一步已经被明确放在主线之后。</p>
        </div>
        <textarea
          className="zone1-textarea"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="记录玛薯宇宙的背景动态..."
        />
      </div>

      <div className="home-card">
        <strong>记录场景</strong>
        <div className="zone1-scene-selector zone1-scene-selector-left">
          {publishSceneOptions.map((scene) => (
            <button
              key={scene}
              type="button"
              className={
                scene === publishScene ? "zone1-scene-chip zone1-scene-chip-active" : "zone1-scene-chip"
              }
              onClick={() => setPublishScene(scene)}
            >
              {scene}
            </button>
          ))}
        </div>
      </div>

      <div className="zone1-upload-grid">
        <div className="zone1-upload-box">＋ 图片</div>
        <div className="zone1-upload-box">🎵 音频</div>
        <div className="zone1-upload-box">📍 场景定位</div>
      </div>
    </AppShell>
  );
}

function DetailPage({ posts, onBack, onReply }) {
  const { postId } = useParams();
  const post = posts.find((item) => item.id === postId) || posts[0];

  return (
    <AppShell
      title="背景动态详情"
      subtitle="这里承接的是世界背景层的内容，不再与首页主线争夺第一屏。"
      onBack={onBack}
      progress="20 / 20"
      bottomNav={{ activeTab: "home" }}
      primaryAction={{ label: "再写一条背景动态", onClick: onReply }}
      secondaryAction={{ label: "返回背景层", onClick: onBack }}
    >
      <div className="zone1-detail-card">
        <div className="zone1-feed-head">
          <div className="zone1-feed-avatar">{post.author.slice(0, 1)}</div>
          <div className="zone1-feed-meta">
            <strong>{post.author}</strong>
            <span>
              公共世界 · {post.scene} · {post.time}
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

      <div className="field-card">
        <strong>写下你的评论</strong>
        <input className="text-input" placeholder="写下你的评论..." />
      </div>
    </AppShell>
  );
}

function TwinBridgeOverlay({ instruction, onClose, onStayAutonomous, onKeepDirected }) {
  return (
    <div className="overlay">
      <div className="overlay-card">
        <h3>双生入口预告</h3>
        <p>
          本轮先在 Zone1 里预演下线后的生活方向。下一步会把这套指令配置正式接到双生页。
        </p>
        <div className="status-card">
          <strong>{instruction.title}</strong>
          <p>{instruction.desc}</p>
        </div>
        <div className="overlay-actions">
          <button type="button" className="secondary-button" onClick={onStayAutonomous}>
            先按自由意志
          </button>
          <button type="button" className="primary-button" onClick={onKeepDirected}>
            保持当前预设
          </button>
          <button type="button" className="text-link" onClick={onClose}>
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}
