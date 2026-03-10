import { useEffect, useMemo, useState } from "react";
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
  aiDialogue,
  completionNotes,
  personaQuestions,
  preferenceOptions,
  quickFlowLinks
} from "./data";

const defaultTwinNames = ["Zero", "Nova", "Kilo", "Echo", "Vanta"];

export function Zone0Prototype() {
  const navigate = useNavigate();
  const location = useLocation();
  const [phone, setPhone] = useState("13800138000");
  const [loginError, setLoginError] = useState("");
  const [loginStatus, setLoginStatus] = useState("idle");
  const [otpCode, setOtpCode] = useState("");
  const [otpError, setOtpError] = useState("");
  const [resentCount, setResentCount] = useState(0);
  const [preference, setPreference] = useState(preferenceOptions[0]);
  const [answers, setAnswers] = useState({});
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [voiceUploaded, setVoiceUploaded] = useState(false);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const [twinName, setTwinName] = useState("Zero");

  const currentLink = useMemo(() => {
    return (
      quickFlowLinks.find((item) => location.pathname.startsWith(item.path)) ||
      quickFlowLinks[0]
    );
  }, [location.pathname]);

  const sendOtp = (shouldFail = false) => {
    if (!/^1\d{10}$/.test(phone)) {
      setLoginStatus("error");
      setLoginError("请输入正确的 11 位手机号。");
      return;
    }

    setLoginStatus("loading");
    setLoginError("");

    window.setTimeout(() => {
      if (shouldFail) {
        setLoginStatus("error");
        setLoginError("验证码下发失败，请检查网络后重试。");
        return;
      }

      setLoginStatus("success");
      navigate("/zone0/otp");
    }, 600);
  };

  const verifyOtp = () => {
    if (otpCode === "1024") {
      setOtpError("");
      navigate("/zone0/preference");
      return;
    }

    setOtpError("验证码错误，请重新输入或重新发送。");
  };

  const gotoQuestion = (step) => {
    navigate(`/zone0/questions/${step}`);
  };

  const randomizeTwinName = () => {
    const next = defaultTwinNames[Math.floor(Math.random() * defaultTwinNames.length)];
    setTwinName(next);
  };

  return (
    <div className="prototype-layout">
      <aside className="prototype-sidebar">
        <div className="sidebar-card">
          <span className="sidebar-eyebrow">MAXU Prototype</span>
          <h1>Zone0 工程化原型</h1>
          <p>
            先完成入世流程闭环，再为后续 `Zone1-Zone4` 复用手机壳、流程组件和页面结构。
          </p>
        </div>

        <div className="sidebar-card">
          <div className="sidebar-section-title">流程子页面</div>
          <div className="flow-link-list">
            {quickFlowLinks.map((item) => (
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
          <div className="sidebar-section-title">文档补全项</div>
          <ul className="completion-list">
            {completionNotes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="prototype-stage">
        <div className="stage-head">
          <div>
            <span className="sidebar-eyebrow">Onboarding Flow</span>
            <h2>Zone0: 账号入世与唤醒</h2>
            <p>所有页面均在 APP 手机壳内展示，且每一步都有明确跳转和回退路径。</p>
          </div>
          <div className="stage-badge">App 模拟环境</div>
        </div>

        <PhoneFrame>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/zone0/login" replace />}
            />
            <Route
              path="login"
              element={
                <LoginPage
                  phone={phone}
                  setPhone={setPhone}
                  status={loginStatus}
                  error={loginError}
                  onSubmit={() => sendOtp(false)}
                  onMockFail={() => sendOtp(true)}
                />
              }
            />
            <Route
              path="otp"
              element={
                <OtpPage
                  phone={phone}
                  code={otpCode}
                  setCode={setOtpCode}
                  error={otpError}
                  resentCount={resentCount}
                  onBack={() => navigate("/zone0/login")}
                  onVerify={verifyOtp}
                  onResend={() => {
                    setOtpCode("");
                    setOtpError("");
                    setResentCount((count) => count + 1);
                  }}
                />
              }
            />
            <Route
              path="preference"
              element={
                <PreferencePage
                  preference={preference}
                  setPreference={setPreference}
                  onBack={() => navigate("/zone0/otp")}
                  onNext={() => navigate("/zone0/persona-intro")}
                />
              }
            />
            <Route
              path="persona-intro"
              element={
                <PersonaIntroPage
                  onBack={() => navigate("/zone0/preference")}
                  onNext={() => gotoQuestion(1)}
                />
              }
            />
            <Route
              path="questions/:step"
              element={
                <QuestionPage
                  answers={answers}
                  setAnswers={setAnswers}
                  onBackToIntro={() => navigate("/zone0/persona-intro")}
                  onComplete={() => navigate("/zone0/ai-dialog")}
                />
              }
            />
            <Route
              path="ai-dialog"
              element={
                <AiDialogPage
                  onBack={() => gotoQuestion(personaQuestions.length)}
                  onNext={() => navigate("/zone0/media")}
                  onSkip={() => navigate("/zone0/media")}
                />
              }
            />
            <Route
              path="media"
              element={
                <MediaPage
                  photoUploaded={photoUploaded}
                  voiceUploaded={voiceUploaded}
                  showSkipConfirm={showSkipConfirm}
                  setShowSkipConfirm={setShowSkipConfirm}
                  onBack={() => navigate("/zone0/ai-dialog")}
                  onTogglePhoto={() => setPhotoUploaded((value) => !value)}
                  onToggleVoice={() => setVoiceUploaded((value) => !value)}
                  onNext={() => navigate("/zone0/loading")}
                  onSkipConfirm={() => {
                    setShowSkipConfirm(false);
                    navigate("/zone0/loading");
                  }}
                />
              }
            />
            <Route
              path="loading"
              element={
                <LoadingPage
                  onBack={() => navigate("/zone0/media")}
                  onNext={() => navigate("/zone0/identity")}
                />
              }
            />
            <Route
              path="identity"
              element={
                <IdentityPage
                  twinName={twinName}
                  setTwinName={setTwinName}
                  preference={preference}
                  uploadCount={[photoUploaded, voiceUploaded].filter(Boolean).length}
                  onBack={() => navigate("/zone0/loading")}
                  onRandomize={randomizeTwinName}
                  onNext={() => navigate("/zone1/opening")}
                />
              }
            />
          </Routes>
        </PhoneFrame>
      </main>
    </div>
  );
}

function LoginPage({ phone, setPhone, status, error, onSubmit, onMockFail }) {
  return (
    <AppShell
      title="登录 / 注册"
      subtitle="输入手机号，进入你的 MAXU 世界入口。"
      onBack={() => {}}
      primaryAction={{
        label: status === "loading" ? "发送中..." : "获取验证码",
        onClick: onSubmit,
        disabled: status === "loading"
      }}
    >
      <div className="hero-logo">MAXU</div>
      <div className="hero-subcopy">
        你的分身将不是工具，而是会持续活动的世界居民。
      </div>

      <div className="field-card">
        <label htmlFor="phone">手机号</label>
        <input
          id="phone"
          className="text-input"
          value={phone}
          onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 11))}
          placeholder="请输入 11 位手机号"
        />
        <div className="helper-row">
          <span className={error ? "helper-text helper-text-error" : "helper-text"}>
            {error || "首次登录即代表注册，当前为模拟验证码流程。"}
          </span>
          <button type="button" className="text-link" onClick={onMockFail}>
            模拟发送失败
          </button>
        </div>
      </div>
    </AppShell>
  );
}

function OtpPage({
  phone,
  code,
  setCode,
  error,
  resentCount,
  onBack,
  onVerify,
  onResend
}) {
  return (
    <AppShell
      title="OTP 验证码"
      subtitle={`验证码已发送至 ${phone.slice(0, 3)}****${phone.slice(-4)}`}
      onBack={onBack}
      primaryAction={{ label: "验证并继续", onClick: onVerify, disabled: code.length < 4 }}
      secondaryAction={{ label: "返回改手机号", onClick: onBack }}
    >
      <div className="otp-box-list">
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className={`otp-box ${code[index] ? "otp-box-filled" : ""}`}>
            {code[index] || ""}
          </div>
        ))}
      </div>
      <input
        className="otp-hidden-input"
        inputMode="numeric"
        maxLength={4}
        value={code}
        onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 4))}
        placeholder="输入验证码，正确码为 1024"
      />

      <div className="status-card">
        <strong>当前状态</strong>
        <p>{error || "已发送验证码，支持错误重输与重新发送。"}</p>
      </div>

      <div className="split-actions">
        <button type="button" className="ghost-button" onClick={() => setCode("1024")}>
          一键填入正确验证码
        </button>
        <button type="button" className="ghost-button" onClick={onResend}>
          重新发送{resentCount > 0 ? ` (${resentCount})` : ""}
        </button>
      </div>
    </AppShell>
  );
}

function PreferencePage({ preference, setPreference, onBack, onNext }) {
  return (
    <AppShell
      title="初始偏好采集"
      subtitle="这个选择决定系统优先为你打开哪类命运入口。"
      onBack={onBack}
      primaryAction={{ label: "继续唤醒分身", onClick: onNext }}
    >
      <div className="selection-list">
        {preferenceOptions.map((item) => (
          <button
            key={item}
            type="button"
            className={item === preference ? "selection-item selection-item-active" : "selection-item"}
            onClick={() => setPreference(item)}
          >
            <span>{item}</span>
            <span>{item === preference ? "已选择" : "选择"}</span>
          </button>
        ))}
      </div>
    </AppShell>
  );
}

function PersonaIntroPage({ onBack, onNext }) {
  return (
    <AppShell
      title="人格测试引导"
      subtitle="完成 8 道命运残卷，复刻你的灵魂偏向。"
      onBack={onBack}
      dark
      primaryAction={{ label: "开始共鸣", onClick: onNext }}
      footerTone="dark"
    >
      <div className="cosmic-panel">
        <div className="cosmic-icon">◎</div>
        <h3>唤醒赛博分身</h3>
        <p>
          我们不会替你定义人格，只会用问题收集边界、偏好和世界中的行动倾向。
        </p>
        <div className="badge-row">
          <span className="dark-badge">8 道题</span>
          <span className="dark-badge">约 2 分钟</span>
          <span className="dark-badge">可回退修改</span>
        </div>
      </div>
    </AppShell>
  );
}

function QuestionPage({ answers, setAnswers, onBackToIntro, onComplete }) {
  const navigate = useNavigate();
  const { step } = useParams();
  const stepNumber = Number(step);
  const question = personaQuestions[stepNumber - 1];

  if (!question) {
    return <Navigate to="/zone0/questions/1" replace />;
  }

  const selectedAnswer = answers[question.id];

  const goNext = () => {
    if (!selectedAnswer) return;
    if (stepNumber === personaQuestions.length) {
      onComplete();
      return;
    }
    navigate(`/zone0/questions/${stepNumber + 1}`);
  };

  const goPrevious = () => {
    if (stepNumber === 1) {
      onBackToIntro();
      return;
    }
    navigate(`/zone0/questions/${stepNumber - 1}`);
  };

  return (
    <AppShell
      title="人格问答"
      subtitle="每一题都在为分身的行动偏好建立初始坐标。"
      onBack={goPrevious}
      dark
      progress={`${stepNumber} / ${personaQuestions.length}`}
      primaryAction={{
        label: stepNumber === personaQuestions.length ? "完成问答" : "下一题",
        onClick: goNext,
        disabled: !selectedAnswer
      }}
      secondaryAction={{ label: "上一题", onClick: goPrevious }}
      footerTone="dark"
    >
      <div className="question-progress">
        <div className="question-progress-track">
          <div
            className="question-progress-fill"
            style={{ width: `${(stepNumber / personaQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="question-card">
        <span className="question-tag">命运残卷 {question.id}</span>
        <h3>{question.prompt}</h3>
      </div>

      <div className="selection-list">
        {question.options.map((option) => (
          <button
            key={option}
            type="button"
            className={
              selectedAnswer === option
                ? "selection-item selection-item-dark selection-item-active"
                : "selection-item selection-item-dark"
            }
            onClick={() =>
              setAnswers((current) => ({
                ...current,
                [question.id]: option
              }))
            }
          >
            <span>{option}</span>
            <span>{selectedAnswer === option ? "已共鸣" : "选择"}</span>
          </button>
        ))}
      </div>
    </AppShell>
  );
}

function MediaPage({
  photoUploaded,
  voiceUploaded,
  showSkipConfirm,
  setShowSkipConfirm,
  onBack,
  onTogglePhoto,
  onToggleVoice,
  onNext,
  onSkipConfirm
}) {
  return (
    <AppShell
      title="声纹与照片"
      subtitle="可先塑造形象，也可以稍后补全。"
      onBack={onBack}
      dark
      primaryAction={{
        label: photoUploaded || voiceUploaded ? "完成塑造" : "直接进入下一步",
        onClick: onNext
      }}
      secondaryAction={{ label: "以后再说", onClick: () => setShowSkipConfirm(true) }}
      footerTone="dark"
    >
      <div className="media-preview-card">
        <div className={`upload-avatar ${photoUploaded ? "upload-avatar-active" : ""}`}>
          {photoUploaded ? "照片已录入" : "上传照片"}
        </div>
        <div className="media-actions">
          <button type="button" className="ghost-button ghost-button-dark" onClick={onTogglePhoto}>
            {photoUploaded ? "移除照片" : "模拟上传照片"}
          </button>
          <button type="button" className="ghost-button ghost-button-dark" onClick={onToggleVoice}>
            {voiceUploaded ? "删除声纹" : "模拟录入声纹"}
          </button>
        </div>
        <div className="upload-status-grid">
          <div className="status-card status-card-dark">
            <strong>照片</strong>
            <p>{photoUploaded ? "已完成上传，可用于分身初始形象。" : "当前未上传，仍可继续流程。"}</p>
          </div>
          <div className="status-card status-card-dark">
            <strong>声纹</strong>
            <p>{voiceUploaded ? "已录入样本，后续可生成语音分身。" : "当前未录入，后续可在双生舱补全。"}</p>
          </div>
        </div>
      </div>

      {showSkipConfirm ? (
        <div className="overlay">
          <div className="overlay-card">
            <h3>确认稍后补全？</h3>
            <p>按照文档规则，Zone0 允许跳过照片和声纹，但会在后续控制舱中提醒补齐。</p>
            <div className="overlay-actions">
              <button
                type="button"
                className="ghost-button"
                onClick={() => setShowSkipConfirm(false)}
              >
                继续补全
              </button>
              <button type="button" className="primary-button" onClick={onSkipConfirm}>
                确认跳过
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </AppShell>
  );
}

function AiDialogPage({ onBack, onNext, onSkip }) {
  return (
    <AppShell
      title="与 AI 的自我对话"
      subtitle="这一步可跳过，只是让你的分身苏醒得更自然。"
      onBack={onBack}
      dark
      primaryAction={{ label: "继续补充形象", onClick: onNext }}
      secondaryAction={{ label: "跳过", onClick: onSkip }}
      footerTone="dark"
    >
      <div className="zoneX-chat-list zone3-chat-list">
        {aiDialogue.map((item, index) => (
          <div
            key={`${item.role}-${index}`}
            className={item.role === "你" ? "zoneX-chat-bubble zoneX-chat-self" : "zoneX-chat-bubble"}
          >
            <strong>{item.role}</strong>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

function LoadingPage({ onBack, onNext }) {
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((value) => {
        if (value >= 100) {
          window.clearInterval(timer);
          return 100;
        }
        return value + 17;
      });
    }, 320);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = window.setTimeout(onNext, 450);
      return () => window.clearTimeout(timeout);
    }
    return undefined;
  }, [onNext, progress]);

  return (
    <AppShell
      title="抽取加载页"
      subtitle="人格向量正在收束，赛博分身即将苏醒。"
      onBack={onBack}
      dark
      primaryAction={{
        label: progress >= 100 ? "立即查看结果" : "解析中...",
        onClick: onNext,
        disabled: progress < 100
      }}
      footerTone="dark"
    >
      <div className="loading-orb">◌</div>
      <div className="loading-copy">
        <h3>解析人格数据...</h3>
        <p>正在把你的偏好、边界与行动倾向折叠为一个可进入世界的居民形象。</p>
      </div>
      <div className="question-progress-track">
        <div className="question-progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="loading-percent">{progress}%</div>
    </AppShell>
  );
}

function IdentityPage({
  twinName,
  setTwinName,
  preference,
  uploadCount,
  onBack,
  onRandomize,
  onNext
}) {
  return (
    <AppShell
      title="分身确立与命名"
      subtitle="你可以输入代号，也可以先用系统推荐名。"
      onBack={onBack}
      dark
      primaryAction={{
        label: "进入宇宙",
        onClick: onNext,
        disabled: !twinName.trim()
      }}
      secondaryAction={{ label: "随机代号", onClick: onRandomize }}
      footerTone="dark"
    >
      <div className="identity-hero">
        <div className="identity-avatar">{twinName.slice(0, 1).toUpperCase()}</div>
        <p>你的分身已苏醒</p>
      </div>
      <div className="field-card field-card-dark">
        <label htmlFor="twinName">分身代号</label>
        <input
          id="twinName"
          className="text-input text-input-dark"
          value={twinName}
          onChange={(event) => setTwinName(event.target.value.slice(0, 16))}
          placeholder="输入分身代号"
        />
      </div>
      <div className="upload-status-grid">
        <div className="status-card status-card-dark">
          <strong>世界偏好</strong>
          <p>{preference}</p>
        </div>
        <div className="status-card status-card-dark">
          <strong>已补全素材</strong>
          <p>{uploadCount} 项</p>
        </div>
      </div>
    </AppShell>
  );
}

