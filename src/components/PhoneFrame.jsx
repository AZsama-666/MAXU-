export function PhoneFrame({ children }) {
  return (
    <div className="phone-frame">
      <div className="phone-hardware">
        <div className="phone-notch" />
        <div className="phone-statusbar">
          <span>9:41</span>
          <div className="phone-status-icons">
            <span>5G</span>
            <span>88%</span>
          </div>
        </div>
        <div className="phone-screen">{children}</div>
      </div>
    </div>
  );
}
