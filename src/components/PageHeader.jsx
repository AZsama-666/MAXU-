export function PageHeader({
  title,
  subtitle,
  onBack,
  rightSlot,
  dark = false
}) {
  return (
    <header className={`page-header ${dark ? "page-header-dark" : ""}`}>
      <button
        type="button"
        className="icon-button"
        onClick={onBack}
        aria-label="返回上一页"
      >
        ←
      </button>
      <div className="page-header-copy">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      <div className="page-header-right">{rightSlot}</div>
    </header>
  );
}
