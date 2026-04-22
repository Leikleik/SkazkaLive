import { useState } from "react";

interface Group {
  id: number;
  name: string;
  color: string;
  emoji: string;
  children: number;
  completedLessons: number;
  totalScore: number;
  avgScore: number;
}

const GROUPS: Group[] = [
  {
    id: 1,
    name: "Солнышки",
    color: "#FFE66D",
    emoji: "☀️",
    children: 24,
    completedLessons: 45,
    totalScore: 1080,
    avgScore: 92,
  },
  {
    id: 2,
    name: "Звёздочки",
    color: "#A29BFE",
    emoji: "⭐",
    children: 22,
    completedLessons: 38,
    totalScore: 950,
    avgScore: 88,
  },
  {
    id: 3,
    name: "Радуга",
    color: "#4ECDC4",
    emoji: "🌈",
    children: 26,
    completedLessons: 52,
    totalScore: 1240,
    avgScore: 95,
  },
  {
    id: 4,
    name: "Бабочки",
    color: "#FF6B6B",
    emoji: "🦋",
    children: 20,
    completedLessons: 30,
    totalScore: 780,
    avgScore: 85,
  },
];

const RECENT_ACTIVITIES = [
  {
    group: "Радуга",
    tale: "Красная Шапочка",
    emoji: "🐺",
    score: 98,
    date: "Сегодня, 10:30",
    color: "#4ECDC4",
  },
  {
    group: "Солнышки",
    tale: "Золушка",
    emoji: "👸",
    score: 95,
    date: "Сегодня, 09:15",
    color: "#FFE66D",
  },
  {
    group: "Звёздочки",
    tale: "Три медведя",
    emoji: "🐻",
    score: 90,
    date: "Вчера, 15:45",
    color: "#A29BFE",
  },
  {
    group: "Бабочки",
    tale: "Колобок",
    emoji: "🦊",
    score: 87,
    date: "Вчера, 14:20",
    color: "#FF6B6B",
  },
];

export function DashboardPage() {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

  return (
    <div
      className="w-full h-full overflow-y-auto"
      style={{ background: "#FFF9F0" }}
    >
      {/* Header */}
      <div
        className="px-16 py-12"
        style={{
          background: "linear-gradient(135deg, #A29BFE, #74B9FF)",
        }}
      >
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
          👩‍🏫 Личный кабинет
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
          Мария Петровна · Воспитатель
        </p>
      </div>

      <div className="px-16 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-6 mb-12">
          <div
            className="p-6 rounded-3xl"
            style={{
              background: "#fff",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              border: "3px solid #4ECDC4",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span style={{ fontSize: "32px" }}>👥</span>
              <p
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "#999",
                }}
              >
                Всего групп
              </p>
            </div>
            <p
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 900,
                fontSize: "48px",
                color: "#4ECDC4",
              }}
            >
              {GROUPS.length}
            </p>
          </div>

          <div
            className="p-6 rounded-3xl"
            style={{
              background: "#fff",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              border: "3px solid #FFE66D",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span style={{ fontSize: "32px" }}>👶</span>
              <p
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "#999",
                }}
              >
                Детей
              </p>
            </div>
            <p
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 900,
                fontSize: "48px",
                color: "#FFE66D",
              }}
            >
              {GROUPS.reduce((sum, g) => sum + g.children, 0)}
            </p>
          </div>

          <div
            className="p-6 rounded-3xl"
            style={{
              background: "#fff",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              border: "3px solid #A29BFE",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span style={{ fontSize: "32px" }}>📚</span>
              <p
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "#999",
                }}
              >
                Уроков проведено
              </p>
            </div>
            <p
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 900,
                fontSize: "48px",
                color: "#A29BFE",
              }}
            >
              {GROUPS.reduce((sum, g) => sum + g.completedLessons, 0)}
            </p>
          </div>

          <div
            className="p-6 rounded-3xl"
            style={{
              background: "#fff",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              border: "3px solid #FF6B6B",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span style={{ fontSize: "32px" }}>⭐</span>
              <p
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "#999",
                }}
              >
                Средний балл
              </p>
            </div>
            <p
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 900,
                fontSize: "48px",
                color: "#FF6B6B",
              }}
            >
              {Math.round(
                GROUPS.reduce((sum, g) => sum + g.avgScore, 0) / GROUPS.length
              )}
            </p>
          </div>
        </div>

        {/* Groups Section */}
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
            📊 Мои группы
          </h2>

          <div className="grid grid-cols-2 gap-6">
            {GROUPS.map((group) => (
              <div
                key={group.id}
                className="p-8 rounded-3xl cursor-pointer transition-transform hover:scale-105"
                style={{
                  background: "#fff",
                  boxShadow:
                    selectedGroup === group.id
                      ? `0 12px 32px ${group.color}40`
                      : "0 8px 24px rgba(0,0,0,0.08)",
                  border: `3px solid ${group.color}`,
                }}
                onClick={() =>
                  setSelectedGroup(selectedGroup === group.id ? null : group.id)
                }
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-20 h-20 rounded-3xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${group.color}, ${group.color}dd)`,
                      boxShadow: `0 4px 16px ${group.color}40`,
                    }}
                  >
                    <span style={{ fontSize: "48px" }}>{group.emoji}</span>
                  </div>
                  <div>
                    <h3
                      className="mb-1"
                      style={{
                        fontFamily: "Nunito, sans-serif",
                        fontWeight: 900,
                        fontSize: "28px",
                        color: "#333",
                      }}
                    >
                      {group.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "Nunito, sans-serif",
                        fontWeight: 700,
                        fontSize: "14px",
                        color: "#999",
                      }}
                    >
                      {group.children} детей
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p
                      className="mb-1"
                      style={{
                        fontFamily: "Nunito, sans-serif",
                        fontWeight: 600,
                        fontSize: "12px",
                        color: "#999",
                      }}
                    >
                      Уроков
                    </p>
                    <p
                      style={{
                        fontFamily: "Nunito, sans-serif",
                        fontWeight: 900,
                        fontSize: "24px",
                        color: group.color,
                      }}
                    >
                      {group.completedLessons}
                    </p>
                  </div>
                  <div>
                    <p
                      className="mb-1"
                      style={{
                        fontFamily: "Nunito, sans-serif",
                        fontWeight: 600,
                        fontSize: "12px",
                        color: "#999",
                      }}
                    >
                      Очков
                    </p>
                    <p
                      style={{
                        fontFamily: "Nunito, sans-serif",
                        fontWeight: 900,
                        fontSize: "24px",
                        color: group.color,
                      }}
                    >
                      {group.totalScore}
                    </p>
                  </div>
                  <div>
                    <p
                      className="mb-1"
                      style={{
                        fontFamily: "Nunito, sans-serif",
                        fontWeight: 600,
                        fontSize: "12px",
                        color: "#999",
                      }}
                    >
                      Средний балл
                    </p>
                    <p
                      style={{
                        fontFamily: "Nunito, sans-serif",
                        fontWeight: 900,
                        fontSize: "24px",
                        color: group.color,
                      }}
                    >
                      {group.avgScore}%
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div
                    className="w-full h-3 rounded-full overflow-hidden"
                    style={{ background: "#f0f0f0" }}
                  >
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${group.avgScore}%`,
                        background: `linear-gradient(90deg, ${group.color}, ${group.color}dd)`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2
            className="mb-6"
            style={{
              fontFamily: "Nunito, sans-serif",
              fontWeight: 900,
              fontSize: "32px",
              color: "#333",
            }}
          >
            🕐 Последние занятия
          </h2>

          <div className="flex flex-col gap-4 pb-16">
            {RECENT_ACTIVITIES.map((activity, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl flex items-center gap-6"
                style={{
                  background: "#fff",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  border: `2px solid ${activity.color}`,
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${activity.color}, ${activity.color}dd)`,
                  }}
                >
                  <span style={{ fontSize: "32px" }}>{activity.emoji}</span>
                </div>

                <div className="flex-1">
                  <h3
                    className="mb-1"
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: 800,
                      fontSize: "18px",
                      color: "#333",
                    }}
                  >
                    {activity.tale}
                  </h3>
                  <p
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "#999",
                    }}
                  >
                    Группа: {activity.group} · {activity.date}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span style={{ fontSize: "24px" }}>⭐</span>
                  <p
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: 900,
                      fontSize: "32px",
                      color: activity.color,
                    }}
                  >
                    {activity.score}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
