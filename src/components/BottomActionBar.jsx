export function BottomActionBar({
  primaryLabel,
  onPrimary,
  primaryDisabled = false,
  secondaryLabel,
  onSecondary,
  tone = "light"
}) {
  return (
    <div className={`bottom-action-bar bottom-action-bar-${tone}`}>
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
