import { Link } from "react-router";
import { useEffect } from "react";
import { showMascot } from "./StarMascot";

export function HomePage() {
  useEffect(() => {
    showMascot("Привет! Я Звёздочка, твой помощник в мире сказок! ✨", "happy");
  }, []);

  return (
    <div className="w-full h-full overflow-y-auto">
      {/* Hero Section */}
      <div
        className="relative px-16 py-20 flex flex-col items-center text-center"
        style={{
          background: "linear-gradient(135deg, #A29BFE, #74B9FF, #4ECDC4)",
        }}
      >
        {/* Decorative elements */}
        <div
          className="absolute top-10 left-20"
          style={{ fontSize: "48px", opacity: 0.3 }}
        >
          🌟
        </div>
        <div
          className="absolute top-20 right-32"
          style={{ fontSize: "64px", opacity: 0.3 }}
        >
          ✨
        </div>
        <div
          className="absolute bottom-16 left-40"
          style={{ fontSize: "40px", opacity: 0.3 }}
        >
          🎭
        </div>
        <div
          className="absolute bottom-10 right-24"
          style={{ fontSize: "56px", opacity: 0.3 }}
        >
          📖
        </div>

        <h1
          className="mb-4"
          style={{
            fontFamily: "Nunito, sans-serif",
            fontWeight: 900,
            fontSize: "72px",
            color: "#fff",
            textShadow: "0 4px 16px rgba(0,0,0,0.2)",
            lineHeight: 1.1,
          }}
        >
          Добро пожаловать в СказкаЛайв! 🌈
        </h1>

        <p
          className="mb-12 max-w-3xl"
          style={{
            fontFamily: "Nunito, sans-serif",
            fontWeight: 700,
            fontSize: "24px",
            color: "rgba(255,255,255,0.95)",
            textShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          Интерактивная платформа для чтения сказок с опросами, музыкой и
          волшебными приключениями для детей 3-7 лет
        </p>

        <div className="flex gap-6">
          <Link
            to="/catalog"
            className="px-10 py-5 rounded-3xl flex items-center gap-3 transition-transform hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #FF6B6B, #FFE66D)",
              boxShadow: "0 8px 24px rgba(255, 107, 107, 0.4)",
            }}
          >
            <span style={{ fontSize: "32px" }}>📚</span>
            <span
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 800,
                fontSize: "20px",
                color: "#fff",
                textShadow: "0 2px 4px rgba(0,0,0,0.15)",
              }}
            >
              Выбрать сказку
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
            <span style={{ fontSize: "32px" }}>👩‍🏫</span>
            <span
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 800,
                fontSize: "20px",
                color: "#fff",
                textShadow: "0 2px 4px rgba(0,0,0,0.15)",
              }}
            >
              Мой кабинет
            </span>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-16 py-16" style={{ background: "#FFF9F0" }}>
        <h2
          className="text-center mb-12"
          style={{
            fontFamily: "Nunito, sans-serif",
            fontWeight: 900,
            fontSize: "48px",
            color: "#333",
          }}
        >
          Что умеет СказкаЛайв? 🎪
        </h2>

        <div className="grid grid-cols-3 gap-8">
          {[
            {
              emoji: "🎬",
              color: "#FF6B6B",
              title: "Видеоряды на проекторе",
              description:
                "Показывайте сказки на большом экране с текстом и анимациями",
            },
            {
              emoji: "❓",
              color: "#FFE66D",
              title: "Опросы по ходу сказки",
              description:
                "Интерактивные вопросы помогают детям лучше понимать историю",
            },
            {
              emoji: "🎵",
              color: "#4ECDC4",
              title: "Фоновая музыка",
              description:
                "Атмосферное музыкальное сопровождение для каждой сказки",
            },
            {
              emoji: "🎉",
              color: "#A29BFE",
              title: "Празднование успехов",
              description:
                "Конфетти и маскот радуются при правильных ответах детей",
            },
            {
              emoji: "👥",
              color: "#74B9FF",
              title: "Группы и статистика",
              description:
                "Отслеживайте прогресс каждой группы детского сада",
            },
            {
              emoji: "🎨",
              color: "#FF6B6B",
              title: "Яркий интерфейс",
              description:
                "Красочный дизайн без минимализма — весело и понятно детям",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl transition-transform hover:scale-105"
              style={{
                background: "#fff",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                border: `3px solid ${feature.color}`,
              }}
            >
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
                style={{
                  background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)`,
                  boxShadow: `0 4px 16px ${feature.color}40`,
                }}
              >
                <span style={{ fontSize: "48px" }}>{feature.emoji}</span>
              </div>
              <h3
                className="mb-3"
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 800,
                  fontSize: "22px",
                  color: "#333",
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#666",
                  lineHeight: 1.5,
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div
        className="px-16 py-20 flex flex-col items-center text-center"
        style={{
          background: "linear-gradient(135deg, #FFE66D, #FF6B6B)",
        }}
      >
        <span style={{ fontSize: "80px", marginBottom: "24px" }}>🚀</span>
        <h2
          className="mb-6"
          style={{
            fontFamily: "Nunito, sans-serif",
            fontWeight: 900,
            fontSize: "56px",
            color: "#fff",
            textShadow: "0 4px 16px rgba(0,0,0,0.2)",
          }}
        >
          Начни волшебное путешествие!
        </h2>
        <p
          className="mb-10 max-w-2xl"
          style={{
            fontFamily: "Nunito, sans-serif",
            fontWeight: 700,
            fontSize: "22px",
            color: "rgba(255,255,255,0.95)",
            textShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          Выбери сказку из нашего каталога и отправляйся в интерактивное
          приключение вместе с детьми!
        </p>
        <Link
          to="/catalog"
          className="px-12 py-6 rounded-3xl flex items-center gap-4 transition-transform hover:scale-105"
          style={{
            background: "#fff",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          }}
        >
          <span style={{ fontSize: "36px" }}>📚</span>
          <span
            style={{
              fontFamily: "Nunito, sans-serif",
              fontWeight: 900,
              fontSize: "24px",
              color: "#FF6B6B",
            }}
          >
            Открыть каталог сказок
          </span>
        </Link>
      </div>
    </div>
  );
}
