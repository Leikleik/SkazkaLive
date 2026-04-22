import { Outlet, NavLink } from "react-router";
import { StarMascot } from "./StarMascot";

export function RootLayout() {
  return (
    <div
      className="flex w-screen h-screen overflow-hidden"
      style={{ fontFamily: "Nunito, sans-serif", background: "#FFF9F0" }}
    >
      {/* Sidebar Navigation */}
      <aside
        className="w-72 h-screen flex flex-col flex-shrink-0"
        style={{
          background: "linear-gradient(180deg, #A29BFE 0%, #74B9FF 100%)",
          boxShadow: "4px 0 20px rgba(0,0,0,0.1)",
        }}
      >
        {/* Logo */}
        <div className="px-6 py-8 flex flex-col items-center gap-3">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center relative"
            style={{
              background: "linear-gradient(135deg, #FFE66D, #FF6B6B)",
              boxShadow: "0 8px 24px rgba(255, 107, 107, 0.3)",
            }}
          >
            <span style={{ fontSize: "48px" }}>✨</span>
          </div>
          <h1
            className="text-center"
            style={{
              fontFamily: "Nunito, sans-serif",
              fontWeight: 900,
              fontSize: "26px",
              color: "#fff",
              textShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            СказкаЛайв
          </h1>
          <p
            className="text-center"
            style={{
              fontFamily: "Nunito, sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            Интерактивные сказки для детей 🌟
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="px-4 flex-1 flex flex-col gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-5 py-4 rounded-2xl flex items-center gap-3 transition-all ${
                isActive ? "scale-105" : "hover:scale-102"
              }`
            }
            style={({ isActive }) => ({
              background: isActive
                ? "rgba(255,255,255,0.25)"
                : "rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
              boxShadow: isActive ? "0 4px 16px rgba(0,0,0,0.1)" : "none",
            })}
          >
            <span style={{ fontSize: "24px" }}>🏠</span>
            <span
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                color: "#fff",
              }}
            >
              Главная
            </span>
          </NavLink>

          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              `px-5 py-4 rounded-2xl flex items-center gap-3 transition-all ${
                isActive ? "scale-105" : "hover:scale-102"
              }`
            }
            style={({ isActive }) => ({
              background: isActive
                ? "rgba(255,255,255,0.25)"
                : "rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
              boxShadow: isActive ? "0 4px 16px rgba(0,0,0,0.1)" : "none",
            })}
          >
            <span style={{ fontSize: "24px" }}>📚</span>
            <span
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                color: "#fff",
              }}
            >
              Каталог сказок
            </span>
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `px-5 py-4 rounded-2xl flex items-center gap-3 transition-all ${
                isActive ? "scale-105" : "hover:scale-102"
              }`
            }
            style={({ isActive }) => ({
              background: isActive
                ? "rgba(255,255,255,0.25)"
                : "rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
              boxShadow: isActive ? "0 4px 16px rgba(0,0,0,0.1)" : "none",
            })}
          >
            <span style={{ fontSize: "24px" }}>👩‍🏫</span>
            <span
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                color: "#fff",
              }}
            >
              Личный кабинет
            </span>
          </NavLink>
        </nav>

        {/* Footer with Mascot */}
        <div className="px-6 py-6">
          <div
            className="px-4 py-4 rounded-2xl flex items-center gap-3"
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #FFE66D, #FF6B6B)",
              }}
            >
              <span style={{ fontSize: "24px" }}>👩‍🏫</span>
            </div>
            <div className="flex-1">
              <p
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 800,
                  fontSize: "14px",
                  color: "#fff",
                }}
              >
                Воспитатель
              </p>
              <p
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Мария Петровна
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-hidden flex flex-col relative">
        {/* Mascot Overlay */}
        <StarMascot />

        <Outlet />
      </main>
    </div>
  );
}
