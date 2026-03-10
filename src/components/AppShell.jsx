import { BottomActionBar } from "./BottomActionBar";
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
  progress
}) {
  return (
    <section className={`app-shell ${dark ? "app-shell-dark" : ""}`}>
      <PageHeader
        title={title}
        subtitle={subtitle}
        onBack={onBack}
        dark={dark}
        rightSlot={
          typeof progress === "string" ? (
            <span className={`header-progress ${dark ? "header-progress-dark" : ""}`}>
              {progress}
            </span>
          ) : null
        }
      />
      <div className="app-shell-body">{children}</div>
      {(primaryAction || secondaryAction) && (
        <BottomActionBar
          primaryLabel={primaryAction?.label}
          onPrimary={primaryAction?.onClick}
          primaryDisabled={primaryAction?.disabled}
          secondaryLabel={secondaryAction?.label}
          onSecondary={secondaryAction?.onClick}
          tone={footerTone || (dark ? "dark" : "light")}
        />
      )}
    </section>
  );
}
