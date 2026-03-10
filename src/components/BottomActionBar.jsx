export function BottomActionBar({
  primaryLabel,
  onPrimary,
  primaryDisabled = false,
  secondaryLabel,
  onSecondary,
  tone = "light",
  withBottomNav = false
}) {
  return (
    <div
      className={`bottom-action-bar bottom-action-bar-${tone} ${
        withBottomNav ? "bottom-action-bar-with-nav" : ""
      }`}
    >
      {secondaryLabel ? (
        <button type="button" className="secondary-button" onClick={onSecondary}>
          {secondaryLabel}
        </button>
      ) : null}
      <button
        type="button"
        className="primary-button"
        onClick={onPrimary}
        disabled={primaryDisabled}
      >
        {primaryLabel}
      </button>
    </div>
  );
}
