import React, { useState } from "react";

const goals = [
  { id: "speech", emoji: "🗣️", label: "Речь", desc: "Расширение словарного запаса и развитие связной речи" },
  { id: "moral", emoji: "💛", label: "Нравственность", desc: "Понятия добра, честности, дружбы и взаимопомощи" },
  { id: "logic", emoji: "🧩", label: "Логика", desc: "Причинно-следственные связи и критическое мышление" },
  { id: "emotion", emoji: "🌈", label: "Эмоц. интеллект", desc: "Распознавание и управление эмоциями персонажей" },
];

const ageGroups = [
  { id: "toddler", emoji: "🌱", label: "Ясельная", range: "3–4 года", desc: "Простые слова, короткие предложения, базовые эмоции" },
  { id: "junior", emoji: "🌿", label: "Младшая", range: "4–5 лет", desc: "Развёрнутые вопросы, сравнения, пересказ эпизодов" },
  { id: "senior", emoji: "🌳", label: "Старшая", range: "5–7 лет", desc: "Анализ мотивов, моральные выводы, ролевые игры" },
];

const durations = ["15 мин", "25 мин", "40 мин"];

interface Tale {
  emoji: string;
  title: string;
  duration: string;
  difficulty: number;
  tags: string[];
}

interface LessonSetupScreenProps {
  tale: Tale;
  onStart: () => void;
  onBack: () => void;
}

export function LessonSetupScreen({ tale, onStart, onBack }: LessonSetupScreenProps) {
  const [selectedGroup, setSelectedGroup] = useState("junior");
  const [selectedGoals, setSelectedGoals] = useState<string[]>(["speech"]);
  const [selectedDuration, setSelectedDuration] = useState("25 мин");

  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: "#FFF9F0" }}>
      {/* Header */}
      <div
        className="relative px-10 pt-10 pb-10"
        style={{ background: "linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)", flexShrink: 0 }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 bg-white" style={{ transform: "translate(30%, -30%)" }} />
        <div className="max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 mb-6"
            style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "14px", color: "rgba(255,255,255,0.85)" }}
          >
            ← Назад в каталог
          </button>

          <div className="flex items-center gap-6">
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(12px)" }}
            >
              <span style={{ fontSize: "52px" }}>{tale.emoji}</span>
            </div>
            <div>
              <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "13px", color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                Настройка урока
              </p>
              <h1 style={{ fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "30px", color: "#fff", marginTop: "4px" }}>
                {tale.title}
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>
                  ⏱ {tale.duration}
                </span>
                <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>
                  📊 Уровень {tale.difficulty}/4
                </span>
                {tale.tags?.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-xl"
                    style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "12px", background: "rgba(255,255,255,0.25)", color: "#fff" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content — two columns */}
      <div className="flex-1 px-10 py-8 max-w-7xl mx-auto w-full">
        <div className="grid gap-8" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {/* Left column */}
          <div className="flex flex-col gap-6">
            {/* Age Group */}
            <div
              className="bg-white rounded-3xl p-6"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.07)", border: "2px solid #f0ebe3" }}
            >
              <h2 style={{ fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "18px", color: "#222", marginBottom: "16px" }}>
                👥 Возрастная группа
              </h2>
              <div className="flex flex-col gap-3">
                {ageGroups.map((group) => {
                  const isSelected = selectedGroup === group.id;
                  return (
                    <button
                      key={group.id}
                      onClick={() => setSelectedGroup(group.id)}
                      className="flex items-center gap-4 p-4 rounded-2xl text-left transition-all"
                      style={{
                        background: isSelected ? "linear-gradient(135deg, #fff3f3, #fffbec)" : "#f8f5f2",
                        border: isSelected ? "2px solid #FFE66D" : "2px solid transparent",
                        boxShadow: isSelected ? "0 4px 16px rgba(255,230,109,0.25)" : "none",
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{ background: isSelected ? "linear-gradient(135deg, #FF6B6B, #FFE66D)" : "#e8e3df" }}
                      >
                        <span style={{ fontSize: "22px" }}>{group.emoji}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "15px", color: "#222" }}>
                            {group.label}
                          </p>
                          <span
                            className="px-2 py-0.5 rounded-lg"
                            style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "11px", background: "#f0ebe3", color: "#888" }}
                          >
                            {group.range}
                          </span>
                        </div>
                        <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "12px", color: "#aaa", marginTop: "3px" }}>
                          {group.desc}
                        </p>
                      </div>
                      <div
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                        style={{
                          borderColor: isSelected ? "#FF6B6B" : "#ddd",
                          background: isSelected ? "#FF6B6B" : "transparent",
                        }}
                      >
                        {isSelected && <span style={{ color: "#fff", fontSize: "10px" }}>✓</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Duration */}
            <div
              className="bg-white rounded-3xl p-6"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.07)", border: "2px solid #f0ebe3" }}
            >
              <h2 style={{ fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "18px", color: "#222", marginBottom: "16px" }}>
                ⏱ Длительность занятия
              </h2>
              <div className="flex gap-3">
                {durations.map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDuration(d)}
                    className="flex-1 py-4 rounded-2xl transition-all"
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: 800,
                      fontSize: "15px",
                      background: selectedDuration === d ? "linear-gradient(135deg, #FF6B6B, #FFE66D)" : "#f8f5f2",
                      color: selectedDuration === d ? "#fff" : "#888",
                      boxShadow: selectedDuration === d ? "0 4px 16px rgba(255,107,107,0.35)" : "none",
                      border: "2px solid transparent",
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {/* Goals */}
            <div
              className="bg-white rounded-3xl p-6"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.07)", border: "2px solid #f0ebe3" }}
            >
              <h2 style={{ fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "18px", color: "#222", marginBottom: "4px" }}>
                🎯 Цели занятия
              </h2>
              <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "13px", color: "#aaa", marginBottom: "16px" }}>
                Выберите одну или несколько целей
              </p>
              <div className="grid grid-cols-2 gap-3">
                {goals.map((goal) => {
                  const isSelected = selectedGoals.includes(goal.id);
                  return (
                    <button
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id)}
                      className="flex flex-col items-start p-4 rounded-2xl text-left transition-all"
                      style={{
                        background: isSelected ? "linear-gradient(135deg, #f0e8ff, #ede5ff)" : "#f8f5f2",
                        border: isSelected ? "2px solid #A29BFE" : "2px solid transparent",
                        boxShadow: isSelected ? "0 4px 16px rgba(162,155,254,0.25)" : "none",
                      }}
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <span style={{ fontSize: "26px" }}>{goal.emoji}</span>
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ background: isSelected ? "#A29BFE" : "#e0dbd6" }}
                        >
                          {isSelected && <span style={{ color: "#fff", fontSize: "10px" }}>✓</span>}
                        </div>
                      </div>
                      <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "14px", color: "#222" }}>
                        {goal.label}
                      </p>
                      <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "11px", color: "#aaa", marginTop: "3px", lineHeight: 1.4 }}>
                        {goal.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Summary + CTA */}
            <div
              className="rounded-3xl p-6"
              style={{ background: "linear-gradient(135deg, #f0fffe, #e8f4ff)", border: "2px solid #c8eeec" }}
            >
              <h3 style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "15px", color: "#4ECDC4", marginBottom: "12px" }}>
                📋 Сводка урока
              </h3>
              <div className="flex flex-col gap-2 mb-5">
                {[
                  { label: "Сказка", value: tale.title },
                  { label: "Группа", value: ageGroups.find(g => g.id === selectedGroup)?.label + " (" + ageGroups.find(g => g.id === selectedGroup)?.range + ")" },
                  { label: "Длительность", value: selectedDuration },
                  { label: "Целей выбрано", value: `${selectedGoals.length} из 4` },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "13px", color: "#888" }}>{item.label}</p>
                    <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "13px", color: "#333" }}>{item.value}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={onStart}
                className="w-full py-5 rounded-2xl flex items-center justify-center gap-3 transition-all"
                style={{
                  background: "linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)",
                  boxShadow: "0 8px 24px rgba(255,107,107,0.4)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 32px rgba(255,107,107,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(255,107,107,0.4)";
                }}
              >
                <span style={{ fontSize: "22px" }}>🚀</span>
                <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "18px", color: "#fff" }}>
                  Начать занятие
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
