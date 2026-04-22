import { useEffect } from "react";
import { useParams, Link } from "react-router";
import confetti from "canvas-confetti";
import { showMascot } from "./StarMascot";

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

export function ResultsPage() {
  const { id } = useParams();
  const tale = id ? TALES[id] : null;

  const score = 2;
  const totalQuestions = 2;
  const percentage = Math.round((score / totalQuestions) * 100);

  useEffect(() => {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.5 },
      colors: ["#FF6B6B", "#FFE66D", "#4ECDC4", "#A29BFE", "#74B9FF"],
    });

    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6, x: 0.3 },
        colors: ["#FF6B6B", "#FFE66D", "#4ECDC4", "#A29BFE", "#74B9FF"],
      });
    }, 300);

    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6, x: 0.7 },
        colors: ["#FF6B6B", "#FFE66D", "#4ECDC4", "#A29BFE", "#74B9FF"],
      });
    }, 600);

    showMascot("Урок завершён! Дети молодцы! 🎉", "celebrate", 4000);
  }, []);

  if (!tale) {
    return <div>Сказка не найдена</div>;
  }

  const getMessage = () => {
    if (percentage >= 90) {
      return {
        emoji: "🏆",
        title: "Превосходно!",
        message: "Дети отлично усвоили материал!",
        color: "#FFE66D",
      };
    } else if (percentage >= 70) {
      return {
        emoji: "⭐",
        title: "Отлично!",
        message: "Дети хорошо поработали!",
        color: "#4ECDC4",
      };
    } else if (percentage >= 50) {
      return {
        emoji: "👍",
        title: "Хорошо!",
        message: "Есть над чем поработать!",
        color: "#A29BFE",
      };
    } else {
      return {
        emoji: "💪",
        title: "Не сдавайся!",
        message: "Попробуем ещё раз!",
        color: "#FF6B6B",
      };
    }
  };

  const result = getMessage();

  return (
    <div
      className="w-full h-full overflow-y-auto"
      style={{
        background: "linear-gradient(135deg, #A29BFE, #74B9FF, #4ECDC4)",
      }}
    >
      <div className="px-16 py-12 flex flex-col items-center">
        {/* Trophy Animation */}
        <div className="mb-8">
          <span
            style={{
              fontSize: "200px",
              display: "block",
              animation: "bounce 1s ease-in-out infinite",
            }}
          >
            {result.emoji}
          </span>
        </div>

        {/* Result Card */}
        <div
          className="w-full max-w-4xl p-16 rounded-3xl mb-8"
          style={{
            background: "#fff",
            boxShadow: "0 16px 48px rgba(0,0,0,0.2)",
          }}
        >
          <div className="text-center mb-12">
            <h1
              className="mb-4"
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 900,
                fontSize: "64px",
                color: result.color,
              }}
            >
              {result.title}
            </h1>
            <p
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 700,
                fontSize: "28px",
                color: "#666",
              }}
            >
              {result.message}
            </p>
          </div>

          {/* Score Display */}
          <div
            className="p-12 rounded-3xl mb-12"
            style={{
              background: `linear-gradient(135deg, ${result.color}, ${result.color}dd)`,
              boxShadow: `0 8px 24px ${result.color}40`,
            }}
          >
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <p
                  className="mb-2"
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 700,
                    fontSize: "18px",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  Правильных ответов
                </p>
                <p
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 900,
                    fontSize: "72px",
                    color: "#fff",
                    textShadow: "0 4px 16px rgba(0,0,0,0.2)",
                  }}
                >
                  {score}
                </p>
              </div>

              <span
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 900,
                  fontSize: "72px",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                /
              </span>

              <div className="text-center">
                <p
                  className="mb-2"
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 700,
                    fontSize: "18px",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  Всего вопросов
                </p>
                <p
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 900,
                    fontSize: "72px",
                    color: "#fff",
                    textShadow: "0 4px 16px rgba(0,0,0,0.2)",
                  }}
                >
                  {totalQuestions}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between mb-2">
                <span
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 700,
                    fontSize: "18px",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  Успеваемость
                </span>
                <span
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 900,
                    fontSize: "32px",
                    color: "#fff",
                    textShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                >
                  {percentage}%
                </span>
              </div>
              <div
                className="w-full h-6 rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.3)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${percentage}%`,
                    background: "#fff",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-6 mb-12">
            <div
              className="p-6 rounded-3xl text-center"
              style={{
                background: "#f8f5f2",
              }}
            >
              <span
                style={{
                  fontSize: "48px",
                  display: "block",
                  marginBottom: "12px",
                }}
              >
                {tale.emoji}
              </span>
              <p
                className="mb-1"
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#999",
                }}
              >
                Сказка
              </p>
              <p
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 800,
                  fontSize: "18px",
                  color: "#333",
                }}
              >
                {tale.title}
              </p>
            </div>

            <div
              className="p-6 rounded-3xl text-center"
              style={{
                background: "#f8f5f2",
              }}
            >
              <span
                style={{
                  fontSize: "48px",
                  display: "block",
                  marginBottom: "12px",
                }}
              >
                👥
              </span>
              <p
                className="mb-1"
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#999",
                }}
              >
                Группа
              </p>
              <p
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 800,
                  fontSize: "18px",
                  color: "#333",
                }}
              >
                Солнышки ☀️
              </p>
            </div>

            <div
              className="p-6 rounded-3xl text-center"
              style={{
                background: "#f8f5f2",
              }}
            >
              <span
                style={{
                  fontSize: "48px",
                  display: "block",
                  marginBottom: "12px",
                }}
              >
                ⏱️
              </span>
              <p
                className="mb-1"
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#999",
                }}
              >
                Длительность
              </p>
              <p
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 800,
                  fontSize: "18px",
                  color: "#333",
                }}
              >
                15 минут
              </p>
            </div>
          </div>

          {/* Achievements */}
          <div
            className="p-8 rounded-3xl mb-8"
            style={{
              background: "linear-gradient(135deg, #FFE66D, #FF6B6B)",
            }}
          >
            <h3
              className="mb-6 text-center"
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 900,
                fontSize: "28px",
                color: "#fff",
                textShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              🎖️ Достижения урока
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {[
                { emoji: "📖", title: "Сказка прочитана" },
                { emoji: "🎯", title: "Все вопросы отвечены" },
                { emoji: "👏", title: "Активное участие" },
                { emoji: "🌟", title: "Отличная работа" },
              ].map((achievement, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl text-center"
                  style={{
                    background: "rgba(255,255,255,0.25)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "40px",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    {achievement.emoji}
                  </span>
                  <p
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: 700,
                      fontSize: "13px",
                      color: "#fff",
                      textShadow: "0 2px 4px rgba(0,0,0,0.15)",
                    }}
                  >
                    {achievement.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-6 pb-16">
          <Link
            to="/catalog"
            className="px-10 py-5 rounded-3xl flex items-center gap-3 transition-transform hover:scale-105"
            style={{
              background: "#fff",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            }}
          >
            <span style={{ fontSize: "32px" }}>📚</span>
            <span
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 800,
                fontSize: "20px",
                color: "#333",
              }}
            >
              Выбрать другую сказку
            </span>
          </Link>

          <Link
            to="/dashboard"
            className="px-10 py-5 rounded-3xl flex items-center gap-3 transition-transform hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.25)",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(255,255,255,0.4)",
            }}
          >
            <span style={{ fontSize: "32px" }}>📊</span>
            <span
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 800,
                fontSize: "20px",
                color: "#fff",
                textShadow: "0 2px 4px rgba(0,0,0,0.15)",
              }}
            >
              Посмотреть статистику
            </span>
          </Link>

          <Link
            to="/"
            className="px-10 py-5 rounded-3xl flex items-center gap-3 transition-transform hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(255,255,255,0.3)",
            }}
          >
            <span style={{ fontSize: "32px" }}>🏠</span>
            <span
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 800,
                fontSize: "20px",
                color: "#fff",
                textShadow: "0 2px 4px rgba(0,0,0,0.15)",
              }}
            >
              На главную
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
