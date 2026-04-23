import React from "react";

type Screen = "home" | "setup" | "reading" | "question" | "results";

const navItems = [
  { id: "home", emoji: "🏠", label: "Каталог сказок" },
  { id: "setup", emoji: "⚙️", label: "Настройка урока" },
  { id: "reading", emoji: "📖", label: "Режим чтения" },
  { id: "question", emoji: "❓", label: "Вопросы" },
  { id: "results", emoji: "🏆", label: "Результаты" },
];

interface SidebarProps {
  screen: Screen;
  onNavigate: (s: Screen) => void;
  hasSelectedTale: boolean;
}

export function Sidebar({ screen, onNavigate, hasSelectedTale }: SidebarProps) {
  return (
    <aside
      className="flex flex-col h-screen sticky top-0"
      style={{
        width: "260px",
        minWidth: "260px",
        background: "#1a1a2e",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo */}
      <div className="px-6 pt-8 pb-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #4ECDC4, #74B9FF)" }}
          >
            <span style={{ fontSize: "24px" }}>📚</span>
          </div>
          <div>
            <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "18px", color: "#fff" }}>
              СказкаЛайв
            </p>
            <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>
              для педагогов
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-5 flex flex-col gap-1">
        <p
          className="px-2 mb-3"
          style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}
        >
          Навигация
        </p>
        {navItems.map((item) => {
          const isActive = screen === item.id;
          const isDisabled = item.id !== "home" && !hasSelectedTale;
          return (
            <button
              key={item.id}
              onClick={() => !isDisabled && onNavigate(item.id as Screen)}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl w-full text-left transition-all"
              style={{
                background: isActive
                  ? "linear-gradient(135deg, rgba(78,205,196,0.25), rgba(116,185,255,0.15))"
                  : "transparent",
                border: isActive ? "1px solid rgba(78,205,196,0.3)" : "1px solid transparent",
                opacity: isDisabled ? 0.35 : 1,
                cursor: isDisabled ? "not-allowed" : "pointer",
              }}
            >
              <span style={{ fontSize: "18px" }}>{item.emoji}</span>
              <span
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: isActive ? 800 : 600,
                  fontSize: "14px",
                  color: isActive ? "#4ECDC4" : "rgba(255,255,255,0.6)",
                }}
              >
                {item.label}
              </span>
              {isActive && (
                <div
                  className="ml-auto w-1.5 h-1.5 rounded-full"
                  style={{ background: "#4ECDC4" }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Teacher card */}
      <div className="px-4 py-5" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div
          className="p-4 rounded-2xl flex items-center gap-3"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #FF6B6B, #FFE66D)" }}
          >
            <span style={{ fontSize: "18px" }}>👩‍🏫</span>
          </div>
          <div className="overflow-hidden">
            <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "13px", color: "#fff" }}>
              Анна Петровна
            </p>
            <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>
              Воспитатель · Группа №4
            </p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { label: "Уроков", value: "47" },
            { label: "Сказок", value: "12" },
            { label: "Детей", value: "18" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "16px", color: "#4ECDC4" }}>
                {stat.value}
              </p>
              <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "10px", color: "rgba(255,255,255,0.35)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
