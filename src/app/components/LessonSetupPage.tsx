import { useState } from "react";
import { useParams, useNavigate } from "react-router";

const GROUPS = [
  { id: 1, name: "Солнышки", emoji: "☀️", color: "#FFE66D" },
  { id: 2, name: "Звёздочки", emoji: "⭐", color: "#A29BFE" },
  { id: 3, name: "Радуга", emoji: "🌈", color: "#4ECDC4" },
  { id: 4, name: "Бабочки", emoji: "🦋", color: "#FF6B6B" },
];

const LEARNING_GOALS = [
  { id: 1, emoji: "🗣️", title: "Развитие речи", description: "Обогащение словарного запаса" },
  { id: 2, emoji: "🧠", title: "Логическое мышление", description: "Учимся анализировать ситуации" },
  { id: 3, emoji: "❤️", title: "Эмоциональный интеллект", description: "Распознавание и понимание эмоций" },
  { id: 4, emoji: "🎭", title: "Творческое воображение", description: "Развитие фантазии и креативности" },
];

const TALES: Record<string, any> = {
  "1": { emoji: "🐺", title: "Красная Шапочка", color: "#FF6B6B" },
  "2": { emoji: "👸", title: "Золушка", color: "#A29BFE" },
  "3": { emoji: "🐻", title: "Три медведя", color: "#4ECDC4" },
  "4": { emoji: "🦁", title: "Король Лев", color: "#FFE66D" },
  "5": { emoji: "🧜‍♀️", title: "Русалочка", color: "#74B9FF" },
  "6": { emoji: "🐉", title: "Храбрый рыцарь", color: "#FF6B6B" },
  "7": { emoji: "🦊", title: "Колобок", color: "#FFE66D" },
  "8": { emoji: "🌟", title: "Звёздная принцесса", color: "#A29BFE" },
};

export function LessonSetupPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tale = id ? TALES[id] : null;

  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [selectedGoals, setSelectedGoals] = useState<number[]>([]);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [interactiveMode, setInteractiveMode] = useState(true);

  if (!tale) {
    return <div>Сказка не найдена</div>;
  }

  const handleStartLesson = () => {
    if (selectedGroup) {
      navigate(`/story/${id}`);
    }
  };

  const toggleGoal = (goalId: number) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId)
        ? prev.filter((id) => id !== goalId)
        : [...prev, goalId]
    );
  };

  return (
    <div
      className="w-full h-full overflow-y-auto"
      style={{ background: "#FFF9F0" }}
    >
      {/* Header */}
      <div
        className="px-16 py-12"
        style={{
          background: `linear-gradient(135deg, ${tale.color}, ${tale.color}dd)`,
        }}
      >
        <div className="flex items-center gap-6 mb-4">
          <div
            className="w-24 h-24 rounded-3xl flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.25)",
              backdropFilter: "blur(10px)",
            }}
          >
            <span style={{ fontSize: "64px" }}>{tale.emoji}</span>
          </div>
          <div>
            <h1
              className="mb-2"
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 900,
                fontSize: "56px",
                color: "#fff",
                textShadow: "0 4px 16px rgba(0,0,0,0.2)",
              }}
            >
              {tale.title}
            </h1>
            <p
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                color: "rgba(255,255,255,0.9)",
                textShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              ⚙️ Настройка урока
            </p>
          </div>
        </div>
      </div>

      <div className="px-16 py-8">
        {/* Select Group */}
        <div className="mb-12">
          <h2
            className="mb-6"
            style={{
              fontFamily: "Nunito, sans-serif",
              fontWeight: 900,
              fontSize: "32px",
              color: "#333",
            }}
          >
            👥 Выберите группу
          </h2>

          <div className="grid grid-cols-4 gap-6">
            {GROUPS.map((group) => (
              <button
                key={group.id}
                onClick={() => setSelectedGroup(group.id)}
                className="p-8 rounded-3xl transition-transform hover:scale-105"
                style={{
                  background: "#fff",
                  boxShadow:
                    selectedGroup === group.id
                      ? `0 12px 32px ${group.color}40`
                      : "0 8px 24px rgba(0,0,0,0.08)",
                  border: `3px solid ${
                    selectedGroup === group.id ? group.color : "#e0e0e0"
                  }`,
                }}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div
                    className="w-20 h-20 rounded-3xl flex items-center justify-center"
                    style={{
                      background:
                        selectedGroup === group.id
                          ? `linear-gradient(135deg, ${group.color}, ${group.color}dd)`
                          : "#f0f0f0",
                      transform:
                        selectedGroup === group.id ? "scale(1.1)" : "scale(1)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <span style={{ fontSize: "48px" }}>{group.emoji}</span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: 800,
                      fontSize: "22px",
                      color: selectedGroup === group.id ? group.color : "#333",
                    }}
                  >
                    {group.name}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Learning Goals */}
        <div className="mb-12">
          <h2
            className="mb-6"
            style={{
              fontFamily: "Nunito, sans-serif",
              fontWeight: 900,
              fontSize: "32px",
              color: "#333",
            }}
          >
            🎯 Цели обучения (можно выбрать несколько)
          </h2>

          <div className="grid grid-cols-2 gap-6">
            {LEARNING_GOALS.map((goal) => (
              <button
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className="p-6 rounded-3xl text-left transition-transform hover:scale-105"
                style={{
                  background: "#fff",
                  boxShadow: selectedGoals.includes(goal.id)
                    ? "0 12px 32px rgba(78, 205, 196, 0.3)"
                    : "0 8px 24px rgba(0,0,0,0.08)",
                  border: selectedGoals.includes(goal.id)
                    ? "3px solid #4ECDC4"
                    : "3px solid #e0e0e0",
                }}
              >
                <div className="flex items-center gap-4">
                  <span style={{ fontSize: "48px" }}>{goal.emoji}</span>
                  <div className="flex-1">
                    <h3
                      className="mb-1"
                      style={{
                        fontFamily: "Nunito, sans-serif",
                        fontWeight: 800,
                        fontSize: "20px",
                        color: selectedGoals.includes(goal.id)
                          ? "#4ECDC4"
                          : "#333",
                      }}
                    >
                      {goal.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "Nunito, sans-serif",
                        fontWeight: 600,
                        fontSize: "14px",
                        color: "#999",
                      }}
                    >
                      {goal.description}
                    </p>
                  </div>
                  {selectedGoals.includes(goal.id) && (
                    <span style={{ fontSize: "32px" }}>✅</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="mb-12">
          <h2
            className="mb-6"
            style={{
              fontFamily: "Nunito, sans-serif",
              fontWeight: 900,
              fontSize: "32px",
              color: "#333",
            }}
          >
            ⚙️ Настройки урока
          </h2>

          <div className="grid grid-cols-2 gap-6">
            <button
              onClick={() => setMusicEnabled(!musicEnabled)}
              className="p-6 rounded-3xl flex items-center justify-between transition-transform hover:scale-105"
              style={{
                background: "#fff",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                border: `3px solid ${musicEnabled ? "#A29BFE" : "#e0e0e0"}`,
              }}
            >
              <div className="flex items-center gap-4">
                <span style={{ fontSize: "48px" }}>🎵</span>
                <div>
                  <h3
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: 800,
                      fontSize: "20px",
                      color: musicEnabled ? "#A29BFE" : "#333",
                    }}
                  >
                    Фоновая музыка
                  </h3>
                  <p
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "#999",
                    }}
                  >
                    {musicEnabled ? "Включена" : "Выключена"}
                  </p>
                </div>
              </div>
              <div
                className="w-16 h-8 rounded-full flex items-center px-1 transition-all"
                style={{
                  background: musicEnabled ? "#A29BFE" : "#e0e0e0",
                }}
              >
                <div
                  className="w-6 h-6 rounded-full transition-all"
                  style={{
                    background: "#fff",
                    transform: musicEnabled
                      ? "translateX(32px)"
                      : "translateX(0)",
                  }}
                />
              </div>
            </button>

            <button
              onClick={() => setInteractiveMode(!interactiveMode)}
              className="p-6 rounded-3xl flex items-center justify-between transition-transform hover:scale-105"
              style={{
                background: "#fff",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                border: `3px solid ${interactiveMode ? "#FF6B6B" : "#e0e0e0"}`,
              }}
            >
              <div className="flex items-center gap-4">
                <span style={{ fontSize: "48px" }}>🎮</span>
                <div>
                  <h3
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: 800,
                      fontSize: "20px",
                      color: interactiveMode ? "#FF6B6B" : "#333",
                    }}
                  >
                    Интерактивный режим
                  </h3>
                  <p
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "#999",
                    }}
                  >
                    {interactiveMode ? "С опросами" : "Только чтение"}
                  </p>
                </div>
              </div>
              <div
                className="w-16 h-8 rounded-full flex items-center px-1 transition-all"
                style={{
                  background: interactiveMode ? "#FF6B6B" : "#e0e0e0",
                }}
              >
                <div
                  className="w-6 h-6 rounded-full transition-all"
                  style={{
                    background: "#fff",
                    transform: interactiveMode
                      ? "translateX(32px)"
                      : "translateX(0)",
                  }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-6 pb-16">
          <button
            onClick={() => navigate("/catalog")}
            className="px-10 py-5 rounded-3xl flex items-center gap-3 transition-transform hover:scale-105"
            style={{
              background: "rgba(0,0,0,0.05)",
              border: "2px solid #e0e0e0",
            }}
          >
            <span style={{ fontSize: "24px" }}>👈</span>
            <span
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 800,
                fontSize: "18px",
                color: "#666",
              }}
            >
              Назад к каталогу
            </span>
          </button>

          <button
            onClick={handleStartLesson}
            disabled={!selectedGroup}
            className="flex-1 px-10 py-5 rounded-3xl flex items-center justify-center gap-3 transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: selectedGroup
                ? `linear-gradient(135deg, ${tale.color}, ${tale.color}dd)`
                : "#e0e0e0",
              boxShadow: selectedGroup
                ? `0 8px 24px ${tale.color}40`
                : "none",
            }}
          >
            <span style={{ fontSize: "32px" }}>🚀</span>
            <span
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 900,
                fontSize: "24px",
                color: "#fff",
                textShadow: "0 2px 4px rgba(0,0,0,0.15)",
              }}
            >
              Начать урок!
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
