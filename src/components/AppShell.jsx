import { BottomActionBar } from "./BottomActionBar";
import { GlobalBottomNav } from "./GlobalBottomNav";
import { PageHeader } from "./PageHeader";

export function AppShell({
  title,
  subtitle,
  onBack,
  dark = false,
  children,
  primaryAction,
  secondaryAction,
  footerTone,
  progress,
  bottomNav,
  headerRight
}) {
  const hasActions = Boolean(primaryAction || secondaryAction);
  const hasBottomNav = Boolean(bottomNav?.activeTab);

  const rightSlot =
    headerRight != null
      ? headerRight
      : typeof progress === "string"
        ? (
            <span className={`header-progress ${dark ? "header-progress-dark" : ""}`}>
              {progress}
            </span>
          )
        : null;

  return (
    <section className={`app-shell ${dark ? "app-shell-dark" : ""}`}>
      <PageHeader
        title={title}
        subtitle={subtitle}
        onBack={onBack}
        dark={dark}
        rightSlot={rightSlot}
      />
      <div
        className={`app-shell-body ${hasActions ? "app-shell-body-with-actions" : ""} ${
          hasBottomNav ? "app-shell-body-with-nav" : ""
        }`}
      >
        {children}
      </div>
      {(hasActions || hasBottomNav) && (
        <div className="app-shell-footer-stack">
          {hasActions ? (
            <BottomActionBar
              primaryLabel={primaryAction?.label}
              onPrimary={primaryAction?.onClick}
              primaryDisabled={primaryAction?.disabled}
              secondaryLabel={secondaryAction?.label}
              onSecondary={secondaryAction?.onClick}
              tone={footerTone || (dark ? "dark" : "light")}
              withBottomNav={hasBottomNav}
            />
          ) : null}
          {hasBottomNav ? <GlobalBottomNav activeTab={bottomNav.activeTab} dark={dark} /> : null}
        </div>
      )}
    </section>
  );
}
