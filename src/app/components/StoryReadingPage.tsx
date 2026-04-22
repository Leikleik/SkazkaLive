import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
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

const STORY_PARTS = [
  {
    text: "Жила-была маленькая девочка, которую все звали Красной Шапочкой, потому что она всегда носила красную шапочку.",
    keywords: ["маленькая девочка", "Красной Шапочкой", "красную шапочку"],
  },
  {
    text: "Однажды мама попросила её отнести пирожки бабушке, которая жила на другом краю леса.",
    keywords: ["пирожки", "бабушке", "леса"],
  },
  {
    text: "Красная Шапочка весело шла по лесной тропинке, собирая цветы и напевая песенку.",
    keywords: ["весело шла", "собирая цветы", "песенку"],
    question: {
      text: "Как вы думаете, что чувствовала Красная Шапочка?",
      options: [
        { emoji: "😊", text: "Радость", correct: true },
        { emoji: "😢", text: "Грусть", correct: false },
        { emoji: "😱", text: "Страх", correct: false },
        { emoji: "😴", text: "Усталость", correct: false },
      ],
    },
  },
  {
    text: "Вдруг на тропинке появился серый волк. Он спросил: 'Куда ты идёшь, девочка?'",
    keywords: ["серый волк", "спросил"],
  },
  {
    text: "Красная Шапочка, не зная, что волки опасны, рассказала ему про бабушку.",
    keywords: ["не зная", "опасны", "рассказала"],
    question: {
      text: "Правильно ли поступила Красная Шапочка?",
      options: [
        { emoji: "❌", text: "Нет, нельзя разговаривать с незнакомцами", correct: true },
        { emoji: "✅", text: "Да, волк был добрым", correct: false },
        { emoji: "🤔", text: "Можно немного поболтать", correct: false },
      ],
    },
  },
  {
    text: "Но охотники услышали шум и спасли Красную Шапочку и бабушку! Все были счастливы.",
    keywords: ["охотники", "спасли", "счастливы"],
  },
];

export function StoryReadingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tale = id ? TALES[id] : null;

  const [currentPart, setCurrentPart] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const part = STORY_PARTS[currentPart];

  useEffect(() => {
    if (part.question && !showQuestion && isPlaying) {
      const timer = setTimeout(() => {
        setShowQuestion(true);
        setIsPlaying(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentPart, showQuestion, isPlaying, part.question]);

  if (!tale) {
    return <div>Сказка не найдена</div>;
  }

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setScore(score + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FF6B6B", "#FFE66D", "#4ECDC4", "#A29BFE", "#74B9FF"],
      });
      showMascot("Отлично! Правильный ответ! 🎉", "celebrate", 2000);
    } else {
      showMascot("Не страшно! Попробуем ещё раз! 💪", "idle", 2000);
    }
    setTotalQuestions(totalQuestions + 1);
    setShowQuestion(false);

    if (currentPart < STORY_PARTS.length - 1) {
      setTimeout(() => {
        setCurrentPart(currentPart + 1);
        setIsPlaying(true);
      }, 1000);
    } else {
      setTimeout(() => {
        navigate(`/results/${id}`);
      }, 2000);
    }
  };

  const handleContinue = () => {
    if (currentPart < STORY_PARTS.length - 1) {
      setCurrentPart(currentPart + 1);
      setIsPlaying(true);
    } else {
      navigate(`/results/${id}`);
    }
  };

  const highlightKeywords = (text: string, keywords: string[]) => {
    let highlightedText = text;
    keywords.forEach((keyword) => {
      const regex = new RegExp(`(${keyword})`, "gi");
      highlightedText = highlightedText.replace(
        regex,
        '<mark style="background: linear-gradient(135deg, #FFE66D, #FF6B6B); padding: 2px 8px; border-radius: 8px; font-weight: 800; color: #fff; text-shadow: 0 2px 4px rgba(0,0,0,0.15);">$1</mark>'
      );
    });
    return highlightedText;
  };

  return (
    <div
      className="w-full h-full overflow-y-auto relative"
      style={{ background: "#FFF9F0" }}
    >
      {/* Progress Bar */}
      <div
        className="sticky top-0 z-10"
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}
      >
        <div className="px-16 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span style={{ fontSize: "32px" }}>{tale.emoji}</span>
            <div>
              <h2
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 800,
                  fontSize: "20px",
                  color: "#333",
                }}
              >
                {tale.title}
              </h2>
              <p
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#999",
                }}
              >
                Часть {currentPart + 1} из {STORY_PARTS.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span style={{ fontSize: "24px" }}>⭐</span>
              <span
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 900,
                  fontSize: "20px",
                  color: tale.color,
                }}
              >
                {score} / {totalQuestions}
              </span>
            </div>
          </div>
        </div>

        <div
          className="w-full h-2"
          style={{ background: "#f0f0f0" }}
        >
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${((currentPart + 1) / STORY_PARTS.length) * 100}%`,
              background: `linear-gradient(90deg, ${tale.color}, ${tale.color}dd)`,
            }}
          />
        </div>
      </div>

      {/* Story Content */}
      {!showQuestion ? (
        <div className="px-16 py-12 flex flex-col items-center">
          {/* Story Scene */}
          <div
            className="w-full max-w-5xl p-16 rounded-3xl mb-8"
            style={{
              background: `linear-gradient(135deg, ${tale.color}20, ${tale.color}10)`,
              border: `4px solid ${tale.color}`,
              boxShadow: `0 12px 32px ${tale.color}30`,
            }}
          >
            {/* Illustration */}
            <div
              className="w-full h-64 rounded-3xl flex items-center justify-center mb-8"
              style={{
                background: `linear-gradient(135deg, ${tale.color}, ${tale.color}dd)`,
              }}
            >
              <span style={{ fontSize: "160px" }}>{tale.emoji}</span>
            </div>

            {/* Story Text */}
            <div
              className="p-10 rounded-3xl"
              style={{
                background: "#fff",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              }}
            >
              <p
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 700,
                  fontSize: "28px",
                  color: "#333",
                  lineHeight: 1.8,
                  textAlign: "center",
                }}
                dangerouslySetInnerHTML={{
                  __html: highlightKeywords(part.text, part.keywords || []),
                }}
              />
            </div>

            {/* Music Indicator */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <span style={{ fontSize: "24px" }}>🎵</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-2 rounded-full"
                    style={{
                      height: `${Math.random() * 20 + 10}px`,
                      background: tale.color,
                      animation: "pulse 0.6s ease-in-out infinite",
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
              <span
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#999",
                }}
              >
                Фоновая музыка играет...
              </span>
            </div>
          </div>

          {/* Continue Button */}
          {!part.question && (
            <button
              onClick={handleContinue}
              className="px-12 py-6 rounded-3xl flex items-center gap-4 transition-transform hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${tale.color}, ${tale.color}dd)`,
                boxShadow: `0 8px 24px ${tale.color}40`,
              }}
            >
              <span
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 900,
                  fontSize: "24px",
                  color: "#fff",
                  textShadow: "0 2px 4px rgba(0,0,0,0.15)",
                }}
              >
                {currentPart < STORY_PARTS.length - 1 ? "Продолжить" : "Завершить"}
              </span>
              <span style={{ fontSize: "32px" }}>👉</span>
            </button>
          )}
        </div>
      ) : (
        /* Question Screen */
        <div className="px-16 py-12 flex flex-col items-center">
          <div className="w-full max-w-4xl">
            <div
              className="p-12 rounded-3xl mb-8 text-center"
              style={{
                background: `linear-gradient(135deg, ${tale.color}, ${tale.color}dd)`,
                boxShadow: `0 12px 32px ${tale.color}40`,
              }}
            >
              <span
                style={{ fontSize: "80px", display: "block", marginBottom: "24px" }}
              >
                🤔
              </span>
              <h2
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 900,
                  fontSize: "36px",
                  color: "#fff",
                  textShadow: "0 4px 16px rgba(0,0,0,0.2)",
                  marginBottom: "16px",
                }}
              >
                Вопрос по сказке
              </h2>
              <p
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  color: "rgba(255,255,255,0.95)",
                  textShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              >
                {part.question?.text}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {part.question?.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(option.correct)}
                  className="p-10 rounded-3xl transition-transform hover:scale-105"
                  style={{
                    background: "#fff",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    border: `3px solid ${tale.color}`,
                  }}
                >
                  <span
                    style={{
                      fontSize: "64px",
                      display: "block",
                      marginBottom: "16px",
                    }}
                  >
                    {option.emoji}
                  </span>
                  <p
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: 800,
                      fontSize: "22px",
                      color: "#333",
                    }}
                  >
                    {option.text}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
