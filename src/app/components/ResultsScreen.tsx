import React, { useState, useEffect } from "react";

const highlights = [
  { emoji: "🗣️", text: "Дети правильно назвали трёх поросят по именам", positive: true },
  { emoji: "💡", text: "Группа обсудила важность трудолюбия и старания", positive: true },
  { emoji: "🎭", text: "Разыграли сценку: волк пытается сдуть домики", positive: true },
  { emoji: "🌟", text: "Все угадали, чей домик самый крепкий и почему", positive: true },
  { emoji: "📝", text: "2 ребёнка затруднились ответить на 1-й вопрос", positive: false },
  { emoji: "🔄", text: "Рекомендуется повторить тему «материалы для строительства»", positive: false },
];

const childEmotions = [
  { emoji: "😊", label: "Радость", count: 12, color: "#FFE66D" },
  { emoji: "🤔", label: "Интерес", count: 4, color: "#4ECDC4" },
  { emoji: "😮", label: "Удивление", count: 2, color: "#A29BFE" },
  { emoji: "😢", label: "Грусть", count: 0, color: "#74B9FF" },
];

interface ResultsScreenProps {
  onRestart: () => void;
}

export function ResultsScreen({ onRestart }: ResultsScreenProps) {
  const [trophyVisible, setTrophyVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setTrophyVisible(true), 100);
    setTimeout(() => setStatsVisible(true), 500);
    setTimeout(() => setContentVisible(true), 900);
  }, []);

  const stats = [
    { emoji: "⏱️", label: "Время занятия", value: "24 мин", sub: "+4 мин к норме", color: "#4ECDC4", bg: "linear-gradient(135deg, #e8fff9, #d0f5ff)" },
    { emoji: "❓", label: "Вопросов задано", value: "6", sub: "2 блока вопросов", color: "#A29BFE", bg: "linear-gradient(135deg, #f0e8ff, #ede5ff)" },
    { emoji: "✅", label: "Правильных ответов", value: "83%", sub: "5 из 6 вопросов", color: "#FF6B6B", bg: "linear-gradient(135deg, #fff3f3, #ffe8e8)" },
    { emoji: "🌈", label: "Настроение группы", value: "😊", sub: "Преобладает радость", color: "#FFE66D", bg: "linear-gradient(135deg, #fffde8, #fff9d0)" },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: "#FFF9F0" }}>
      {/* Hero */}
      <div
        className="relative px-10 pt-10 pb-12 flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #FFE66D 0%, #4ECDC4 100%)" }}
      >
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 bg-white" style={{ transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-24 w-32 h-32 rounded-full opacity-10 bg-white" style={{ transform: "translateY(40%)" }} />

        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Trophy + title */}
          <div className="flex items-center gap-8">
            <div
              className="transition-all duration-700"
              style={{
                opacity: trophyVisible ? 1 : 0,
                transform: trophyVisible ? "scale(1) rotate(0deg)" : "scale(0.5) rotate(-10deg)",
              }}
            >
              <div
                className="w-28 h-28 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.3)", backdropFilter: "blur(12px)", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
              >
                <span style={{ fontSize: "64px" }}>🏆</span>
              </div>
            </div>
            <div>
              <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "14px", color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                Занятие завершено
              </p>
              <h1 style={{ fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "36px", color: "#fff", marginTop: "4px" }}>
                Отличная работа! 🎉
              </h1>
              <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "16px", color: "rgba(255,255,255,0.85)", marginTop: "6px" }}>
                🐷 «Три поросёнка» · Младшая группа · 18 детей
              </p>
              <div className="flex gap-2 mt-3">
                {["⭐", "⭐", "⭐", "⭐", "⭐"].map((s, i) => (
                  <span
                    key={i}
                    className="transition-all duration-300"
                    style={{
                      fontSize: "22px",
                      opacity: trophyVisible ? 1 : 0,
                      transitionDelay: `${600 + i * 100}ms`,
                      transform: trophyVisible ? "scale(1)" : "scale(0)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex gap-3">
            {[
              { emoji: "📱", label: "QR для родителей", color: "#A29BFE" },
              { emoji: "💾", label: "Сохранить отчёт", color: "#4ECDC4" },
              { emoji: "📤", label: "Поделиться", color: "#FF6B6B" },
            ].map((btn) => (
              <button
                key={btn.label}
                className="flex flex-col items-center gap-2 px-5 py-4 rounded-2xl transition-all"
                style={{
                  background: "rgba(255,255,255,0.25)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.25)";
                }}
              >
                <span style={{ fontSize: "26px" }}>{btn.emoji}</span>
                <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "12px", color: "#fff", textAlign: "center" }}>
                  {btn.label}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div
        className="px-10 py-8 max-w-7xl mx-auto w-full transition-all duration-700"
        style={{ opacity: statsVisible ? 1 : 0, transform: statsVisible ? "translateY(0)" : "translateY(20px)" }}
      >
        <div className="grid grid-cols-4 gap-5 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl p-6 flex items-start gap-4"
              style={{ background: stat.bg, border: `2px solid ${stat.color}25`, boxShadow: `0 4px 20px ${stat.color}18` }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${stat.color}22` }}
              >
                <span style={{ fontSize: "28px" }}>{stat.emoji}</span>
              </div>
              <div>
                <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "28px", color: stat.color, lineHeight: 1 }}>
                  {stat.value}
                </p>
                <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "13px", color: "#333", marginTop: "4px" }}>
                  {stat.label}
                </p>
                <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "11px", color: "#aaa", marginTop: "2px" }}>
                  {stat.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom section — 3 columns */}
        <div
          className="grid gap-6 transition-all duration-700"
          style={{
            gridTemplateColumns: "1fr 1fr 320px",
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {/* Highlights */}
          <div
            className="bg-white rounded-3xl p-6"
            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.07)", border: "2px solid #f0ebe3" }}
          >
            <h3 style={{ fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "18px", color: "#222", marginBottom: "16px" }}>
              ✨ Итоги занятия
            </h3>
            <div className="flex flex-col gap-2">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-2xl"
                  style={{ background: item.positive ? "#f0fffe" : "#fff9f5", border: `1px solid ${item.positive ? "#c8eeec" : "#fde8d8"}` }}
                >
                  <span style={{ fontSize: "18px", flexShrink: 0 }}>{item.emoji}</span>
                  <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "13px", color: item.positive ? "#445" : "#776", lineHeight: 1.5 }}>
                    {item.text}
                  </p>
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                    style={{ background: item.positive ? "#4ECDC4" : "#FF6B6B" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Goals achieved */}
          <div
            className="bg-white rounded-3xl p-6"
            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.07)", border: "2px solid #f0ebe3" }}
          >
            <h3 style={{ fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "18px", color: "#222", marginBottom: "16px" }}>
              🎯 Достижение целей
            </h3>
            {[
              { label: "Речь", percent: 88, color: "#4ECDC4" },
              { label: "Нравственность", percent: 92, color: "#FF6B6B" },
              { label: "Логика", percent: 75, color: "#A29BFE" },
              { label: "Эмоц. интеллект", percent: 83, color: "#FFE66D" },
            ].map((goal) => (
              <div key={goal.label} className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "13px", color: "#444" }}>{goal.label}</p>
                  <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "14px", color: goal.color }}>{goal.percent}%</p>
                </div>
                <div className="w-full h-3 rounded-full" style={{ background: "#f0ebe3" }}>
                  <div
                    className="h-3 rounded-full transition-all duration-1000"
                    style={{ width: contentVisible ? `${goal.percent}%` : "0%", background: goal.color }}
                  />
                </div>
              </div>
            ))}

            {/* Emotion distribution */}
            <h3 style={{ fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "16px", color: "#222", marginTop: "20px", marginBottom: "12px" }}>
              😊 Эмоции детей
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {childEmotions.map((e) => (
                <div
                  key={e.label}
                  className="flex flex-col items-center p-3 rounded-2xl"
                  style={{ background: `${e.color}18`, border: `2px solid ${e.color}30` }}
                >
                  <span style={{ fontSize: "22px" }}>{e.emoji}</span>
                  <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "18px", color: e.color, lineHeight: 1, marginTop: "4px" }}>{e.count}</p>
                  <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "9px", color: "#aaa", textAlign: "center", marginTop: "2px" }}>{e.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4">
            <div
              className="rounded-3xl p-6"
              style={{ background: "linear-gradient(135deg, #f0fffe, #e8f4ff)", border: "2px solid #c8eeec" }}
            >
              <h3 style={{ fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "16px", color: "#4ECDC4", marginBottom: "4px" }}>
                📋 Рекомендации
              </h3>
              <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "13px", color: "#888", marginBottom: "12px", lineHeight: 1.5 }}>
                На следующем занятии рекомендуется:
              </p>
              {[
                "Повторить материалы для строительства",
                "Сыграть в ролевую игру «Волк и поросята»",
                "Закрепить слова: трудолюбивый, ленивый",
              ].map((rec, i) => (
                <div key={i} className="flex items-start gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "#4ECDC4" }}>
                    <span style={{ color: "#fff", fontSize: "10px" }}>{i + 1}</span>
                  </div>
                  <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "12px", color: "#555", lineHeight: 1.4 }}>{rec}</p>
                </div>
              ))}
            </div>

            <button
              onClick={onRestart}
              className="w-full py-5 rounded-2xl flex items-center justify-center gap-3 transition-all"
              style={{
                background: "linear-gradient(135deg, #FFE66D 0%, #4ECDC4 100%)",
                boxShadow: "0 8px 24px rgba(78,205,196,0.4)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 32px rgba(78,205,196,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(78,205,196,0.4)";
              }}
            >
              <span style={{ fontSize: "22px" }}>📖</span>
              <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "17px", color: "#fff" }}>
                Следующая сказка
              </span>
            </button>

            <button
              className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 transition-all"
              style={{
                background: "#fff",
                border: "2px solid #f0ebe3",
                boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
              }}
            >
              <span style={{ fontSize: "18px" }}>📊</span>
              <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "15px", color: "#555" }}>
                Полный отчёт PDF
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
