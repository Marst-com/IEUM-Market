import { useState } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import {
  Home,
  ShoppingBag,
  MapPin,
  PlusCircle,
  MessageCircle,
  Wallet,
  UserRound,
  Search,
  Menu,
  X,
  Store,
} from "lucide-react";

import HomePage from "./pages/HomePage";
import MarketPage from "./pages/MarketPage";
import LocalPage from "./pages/LocalPage";
import SellPage from "./pages/SellPage";
import ChatPage from "./pages/ChatPage";
import WalletPage from "./pages/WalletPage";
import ProfilePage from "./pages/ProfilePage";

const navigation = [
  { to: "/", label: "홈", icon: Home, end: true },
  { to: "/market", label: "전체 마켓", icon: ShoppingBag },
  { to: "/local", label: "동네거래", icon: MapPin },
  { to: "/sell", label: "판매하기", icon: PlusCircle },
  { to: "/chat", label: "채팅", icon: MessageCircle },
  { to: "/wallet", label: "내 지갑", icon: Wallet },
  { to: "/profile", label: "마이페이지", icon: UserRound },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  function closeMenu() {
    setMobileMenuOpen(false);
  }

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = search.trim();

    if (query) {
      window.location.href = `/market?q=${encodeURIComponent(query)}`;
    } else {
      window.location.href = "/market";
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button
          className="icon-button mobile-menu-button"
          aria-label="메뉴 열기"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-symbol">
            <Store size={22} />
          </span>
          <span className="brand-text">
            <strong>IEUM</strong>
            <small>MARKET</small>
          </span>
        </Link>

        <form className="header-search" onSubmit={handleSearch}>
          <Search size={19} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="어떤 물건을 찾고 있어?"
            aria-label="상품 검색"
          />
          <button type="submit">검색</button>
        </form>

        <div className="header-actions">
          <Link to="/sell" className="header-sell-button">
            <PlusCircle size={17} />
            상품 등록
          </Link>
          <Link to="/profile" className="avatar-button" aria-label="마이페이지">
            <UserRound size={19} />
          </Link>
        </div>
      </header>

      <div className="layout">
        <aside className={`sidebar ${mobileMenuOpen ? "sidebar-open" : ""}`}>
          <div className="sidebar-heading">MARKETPLACE</div>

          <nav className="side-navigation">
            {navigation.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link-active" : ""}`
                }
              >
                <Icon size={19} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="sidebar-promo">
            <span className="promo-icon">✨</span>
            <strong>아이디어를 거래해 봐</strong>
            <p>그림부터 디지털 상품까지, 네 아이디어가 상품이 될 수 있어.</p>
            <Link to="/sell" onClick={closeMenu}>
              판매 시작하기 →
            </Link>
          </div>

          <div className="sidebar-footer">
            <span>IEUM Market</span>
            <span>아이디어와 결과물을 잇습니다.</span>
          </div>
        </aside>

        {mobileMenuOpen && (
          <button
            className="mobile-overlay"
            aria-label="메뉴 닫기"
            onClick={closeMenu}
          />
        )}

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/market" element={<MarketPage />} />
            <Route path="/local" element={<LocalPage />} />
            <Route path="/sell" element={<SellPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="*"
              element={
                <section className="empty-state">
                  <h2>페이지를 찾을 수 없어.</h2>
                  <Link to="/">홈으로 돌아가기</Link>
                </section>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}
