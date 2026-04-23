import React, { useState } from "react";

const pages = [
  {
    illustration: "🐺🌲🏡",
    title: "Глава 1: Три братца",
    text: "В густом лесу стояли три маленьких домика. В них жили три <b>поросёнка</b>: Ниф-Ниф, Нуф-Нуф и Наф-Наф. Они были братьями и очень любили играть вместе на солнечной лужайке.",
    hint: "Попросите детей показать пальцем: где лес? Сколько домиков? Как зовут поросят?",
    keywords: ["поросёнка"],
    vocab: [
      { word: "Поросята", def: "Маленькие свиньи" },
      { word: "Густой лес", def: "Лес с большим количеством деревьев" },
    ],
  },
  {
    illustration: "🐷🥬🏚️",
    title: "Глава 2: Дом из соломы",
    text: "Ниф-Ниф был <b>ленивым</b>. Он построил домик из соломы очень быстро и пошёл играть на лужайку. «Зачем стараться?» — сказал он братьям.",
    hint: "Спросите: почему домик из соломы ненадёжный? Как вы думаете, что случится?",
    keywords: ["ленивым"],
    vocab: [
      { word: "Солома", def: "Сухие стебли злаков" },
      { word: "Ленивый", def: "Тот, кто не любит трудиться" },
    ],
  },
  {
    illustration: "🐷🪵🏠",
    title: "Глава 3: Дом из веток",
    text: "Нуф-Нуф был <b>торопливым</b>. Он сложил стены из веток и тоже убежал веселиться в лес. «Успею достроить потом!» — крикнул он.",
    hint: "Что значит «торопливый»? Попросите детей показать жестами. Хорошо ли это — торопиться?",
    keywords: ["торопливым"],
    vocab: [
      { word: "Ветки", def: "Части дерева, растущие от ствола" },
      { word: "Торопливый", def: "Тот, кто делает всё быстро и небрежно" },
    ],
  },
  {
    illustration: "🐷🧱🏰",
    title: "Глава 4: Крепкий дом",
    text: "Только <b>трудолюбивый</b> Наф-Наф целый день укладывал кирпичи. Его домик получился крепким и надёжным. «Хороший дом строится с усердием», — говорил Наф-Наф.",
    hint: "Спросите: чей домик самый надёжный и почему? Как вы помогаете дома?",
    keywords: ["трудолюбивый"],
    vocab: [
      { word: "Кирпичи", def: "Строительные блоки из обожжённой глины" },
      { word: "Трудолюбивый", def: "Тот, кто любит и умеет хорошо трудиться" },
    ],
  },
];

interface Tale {
  emoji: string;
  title: string;
}

interface ReadingScreenProps {
  tale: Tale;
  onQuestion: () => void;
  onFinish: () => void;
  onBack: () => void;
}

export function ReadingScreen({ tale, onQuestion, onFinish, onBack }: ReadingScreenProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = pages.length;
  const page = pages[currentPage];
  const progress = ((currentPage + 1) / total) * 100;

  const nextPage = () => {
    if (currentPage < total - 1) {
      setCurrentPage((p) => p + 1);
    } else {
      onFinish();
    }
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage((p) => p - 1);
  };

  const renderText = (text: string) => {
    const parts = text.split(/(<b>.*?<\/b>)/g);
    return parts.map((part, i) => {
      if (part.startsWith("<b>") && part.endsWith("</b>")) {
        const word = part.slice(3, -4);
        return (
          <span
            key={i}
            className="px-1.5 py-0.5 rounded-lg"
            style={{ background: "#FFE66D", color: "#b36a00", fontWeight: 900 }}
          >
            {word}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "#FFF9F0" }}>
      {/* Top bar */}
      <div
        className="relative px-10 pt-8 pb-8 flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #A29BFE 0%, #4ECDC4 100%)" }}
      >
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 bg-white" style={{ transform: "translate(20%, -30%)" }} />

        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={onBack}
              style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "14px", color: "rgba(255,255,255,0.8)" }}
            >
              ← Настройки
            </button>

            <div className="flex items-center gap-3">
              <span style={{ fontSize: "20px" }}>{tale.emoji}</span>
              <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "16px", color: "#fff" }}>
                {tale.title}
              </p>
            </div>

            <div
              className="px-4 py-2 rounded-xl"
              style={{ background: "rgba(255,255,255,0.22)", backdropFilter: "blur(8px)" }}
            >
              <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "14px", color: "#fff" }}>
                Страница {currentPage + 1} из {total}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-3 rounded-full" style={{ background: "rgba(255,255,255,0.25)" }}>
            <div
              className="h-3 rounded-full transition-all duration-700"
              style={{ width: `${progress}%`, background: "#fff" }}
            />
          </div>

          {/* Chapter dots */}
          <div className="flex gap-3 mt-3 justify-center">
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className="transition-all"
                style={{
                  width: i === currentPage ? "32px" : "10px",
                  height: "10px",
                  borderRadius: "5px",
                  background: i <= currentPage ? "#fff" : "rgba(255,255,255,0.35)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main content — 3 columns */}
      <div className="flex-1 overflow-hidden flex gap-0">
        {/* Left: Illustration + vocab */}
        <div
          className="flex flex-col gap-5 p-6 overflow-y-auto"
          style={{ width: "320px", minWidth: "320px", borderRight: "1px solid #f0ebe3" }}
        >
          {/* Illustration */}
          <div
            className="w-full rounded-3xl flex flex-col items-center justify-center"
            style={{
              height: "240px",
              background: "linear-gradient(135deg, #f8f0ff 0%, #e8fff9 100%)",
              border: "2px solid #ede8ff",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: "72px", letterSpacing: "6px" }}>{page.illustration}</span>
            <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "12px", color: "#A29BFE", marginTop: "12px" }}>
              🎨 Иллюстрация к главе
            </p>
          </div>

          {/* Vocab */}
          <div
            className="rounded-2xl p-4"
            style={{ background: "#fff", border: "2px solid #f0ebe3", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
          >
            <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "13px", color: "#333", marginBottom: "10px" }}>
              📝 Слова урока
            </p>
            <div className="flex flex-col gap-2">
              {page.vocab.map((v) => (
                <div key={v.word} className="flex flex-col p-3 rounded-xl" style={{ background: "#f8f5f2" }}>
                  <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "13px", color: "#A29BFE" }}>{v.word}</p>
                  <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "11px", color: "#aaa" }}>{v.def}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chapter nav */}
          <div
            className="rounded-2xl p-4"
            style={{ background: "#fff", border: "2px solid #f0ebe3" }}
          >
            <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "13px", color: "#333", marginBottom: "10px" }}>
              📑 Главы
            </p>
            {pages.map((p, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className="w-full flex items-center gap-3 p-2 rounded-xl text-left mb-1 transition-all"
                style={{
                  background: i === currentPage ? "linear-gradient(135deg, #f0e8ff, #e8fff9)" : "transparent",
                }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: i < currentPage ? "#4ECDC4" : i === currentPage ? "#A29BFE" : "#e8e3df",
                  }}
                >
                  <span style={{ fontSize: "10px", color: i <= currentPage ? "#fff" : "#aaa" }}>
                    {i < currentPage ? "✓" : i + 1}
                  </span>
                </div>
                <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: i === currentPage ? 800 : 600, fontSize: "12px", color: i === currentPage ? "#A29BFE" : "#aaa" }}>
                  {p.title}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Center: Story */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-8">
            <h2 style={{ fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "22px", color: "#222", marginBottom: "20px" }}>
              {page.title}
            </h2>
            <p
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 600,
                fontSize: "22px",
                lineHeight: 1.8,
                color: "#333",
              }}
            >
              {renderText(page.text)}
            </p>

            {/* Teacher hint */}
            <div
              className="mt-8 p-5 rounded-2xl"
              style={{ background: "linear-gradient(135deg, #fff9e6, #fff3f3)", border: "2px dashed #FFE66D" }}
            >
              <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "14px", color: "#c47a00", marginBottom: "6px" }}>
                💡 Подсказка педагогу
              </p>
              <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "14px", color: "#888", lineHeight: 1.6 }}>
                {page.hint}
              </p>
            </div>
          </div>

          {/* Bottom controls */}
          <div
            className="flex-shrink-0 px-8 py-5 flex items-center gap-4"
            style={{ borderTop: "2px solid #f0ebe3", background: "#fff" }}
          >
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="px-6 py-3 rounded-2xl flex items-center gap-2 transition-all"
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 800,
                fontSize: "14px",
                background: currentPage === 0 ? "#f0ebe3" : "#f8f5f2",
                color: currentPage === 0 ? "#ccc" : "#666",
              }}
            >
              ← Назад
            </button>

            <button
              onClick={() => setIsPaused(!isPaused)}
              className="px-6 py-3 rounded-2xl flex items-center gap-2 transition-all"
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 800,
                fontSize: "14px",
                background: isPaused ? "linear-gradient(135deg, #A29BFE, #4ECDC4)" : "#f5f0ff",
                color: isPaused ? "#fff" : "#A29BFE",
                boxShadow: isPaused ? "0 4px 14px rgba(162,155,254,0.4)" : "none",
              }}
            >
              {isPaused ? "▶ Продолжить" : "⏸ Пауза"}
            </button>

            <button
              onClick={onQuestion}
              className="px-6 py-3 rounded-2xl flex items-center gap-2 transition-all"
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 800,
                fontSize: "14px",
                background: "#fff3f3",
                color: "#FF6B6B",
              }}
            >
              ❓ Задать вопрос
            </button>

            <div className="flex-1" />

            <button
              onClick={nextPage}
              className="px-8 py-3 rounded-2xl flex items-center gap-2 transition-all"
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 900,
                fontSize: "15px",
                background: "linear-gradient(135deg, #4ECDC4 0%, #74B9FF 100%)",
                color: "#fff",
                boxShadow: "0 6px 20px rgba(78,205,196,0.4)",
              }}
            >
              {currentPage === total - 1 ? "🏆 Завершить" : "Дальше →"}
            </button>
          </div>
        </div>

        {/* Right: Teacher panel */}
        <div
          className="flex flex-col gap-4 p-6 overflow-y-auto"
          style={{ width: "280px", minWidth: "280px", borderLeft: "1px solid #f0ebe3" }}
        >
          <div
            className="rounded-2xl p-4"
            style={{ background: "#fff", border: "2px solid #f0ebe3" }}
          >
            <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "13px", color: "#333", marginBottom: "10px" }}>
              📊 Прогресс урока
            </p>
            <div className="flex flex-col gap-3">
              {[
                { label: "Прочитано", value: `${currentPage + 1}/${total}`, color: "#4ECDC4" },
                { label: "Времени", value: `${(currentPage + 1) * 4} мин`, color: "#A29BFE" },
                { label: "Вопросов", value: "2/6", color: "#FF6B6B" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "#f8f5f2" }}>
                  <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "12px", color: "#888" }}>{s.label}</p>
                  <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "14px", color: s.color }}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-2xl p-4"
            style={{ background: "#fff", border: "2px solid #f0ebe3" }}
          >
            <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "13px", color: "#333", marginBottom: "10px" }}>
              😊 Настроение группы
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { emoji: "😊", label: "Радость", count: 12 },
                { emoji: "🤔", label: "Интерес", count: 5 },
                { emoji: "😮", label: "Удивление", count: 1 },
                { emoji: "😌", label: "Спокой", count: 0 },
              ].map((e) => (
                <div key={e.label} className="flex flex-col items-center p-2 rounded-xl" style={{ background: "#f8f5f2" }}>
                  <span style={{ fontSize: "20px" }}>{e.emoji}</span>
                  <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "10px", color: "#888", marginTop: "2px" }}>{e.label}</p>
                  <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "13px", color: "#333" }}>{e.count}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-2xl p-4"
            style={{ background: "linear-gradient(135deg, #f0fffe, #e8f4ff)", border: "2px solid #c8eeec" }}
          >
            <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "13px", color: "#4ECDC4", marginBottom: "8px" }}>
              🎯 Цели урока
            </p>
            {["Речь", "Нравственность"].map((g) => (
              <div key={g} className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ background: "#4ECDC4" }} />
                <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "12px", color: "#555" }}>{g}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
