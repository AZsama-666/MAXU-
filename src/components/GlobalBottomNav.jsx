import { Link } from "react-router-dom";

const navItems = [
  { id: "home", label: "首页", to: "/zone1/home" },
  { id: "relations", label: "关系", to: "/zone2/list" },
  { id: "messages", label: "消息", to: "/zone3/inbox" },
  { id: "mine", label: "我的", to: "/zone4/hub" }
];

export function GlobalBottomNav({ activeTab, dark = false }) {
  return (
    <nav className={`bottom-tabbar ${dark ? "bottom-tabbar-dark" : ""}`} aria-label="全局底部导航">
      {navItems.map((item) => (
        <Link
          key={item.id}
          to={item.to}
          className={
            item.id === activeTab ? "tabbar-item tabbar-item-active" : "tabbar-item"
          }
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
