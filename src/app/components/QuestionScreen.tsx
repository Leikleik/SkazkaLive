import React, { useState } from "react";

const questions = [
  {
    id: 1,
    chapter: "Глава 1",
    text: "Сколько поросят жило в лесу?",
    answers: [
      { id: "a", text: "Двое — Ниф-Ниф и Нуф-Нуф" },
      { id: "b", text: "Трое — Ниф-Ниф, Нуф-Нуф и Наф-Наф" },
      { id: "c", text: "Четверо поросят" },
    ],
    correct: "b",
    explanation: "В сказке живут три брата-поросёнка: Ниф-Ниф, Нуф-Нуф и Наф-Наф.",
  },
  {
    id: 2,
    chapter: "Глава 2",
    text: "Почему домик Наф-Нафа оказался самым крепким?",
    answers: [
      { id: "a", text: "Он был самым большим по размеру" },
      { id: "b", text: "Его помогли построить все друзья" },
      { id: "c", text: "Наф-Наф трудолюбиво строил из кирпича" },
    ],
    correct: "c",
    explanation: "Наф-Наф не ленился и строил из прочного материала — кирпича. Труд и старание всегда дают хороший результат!",
  },
];

const emotions = [
  { emoji: "😊", label: "Радость", color: "#FFE66D" },
  { emoji: "😢", label: "Грусть", color: "#74B9FF" },
  { emoji: "😨", label: "Страх", color: "#A29BFE" },
  { emoji: "😌", label: "Спокойствие", color: "#4ECDC4" },
  { emoji: "😠", label: "Злость", color: "#FF6B6B" },
  { emoji: "🤩", label: "Восторг", color: "#FF6B6B" },
];

interface QuestionScreenProps {
  onAnswer: () => void;
  onBack: () => void;
}

export function QuestionScreen({ onAnswer, onBack }: QuestionScreenProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [results, setResults] = useState<boolean[]>([]);

  const question = questions[currentQ];

  const handleAnswer = (id: string) => {
    if (answered) return;
    setSelected(id);
    setAnswered(true);
    setResults((r) => [...r, id === question.correct]);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      onAnswer();
    }
  };

  const getAnswerStyle = (id: string) => {
    if (!answered) return {
      background: "#fff",
      border: "2px solid #f0ebe3",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    };
    if (id === question.correct) return {
      background: "linear-gradient(135deg, #e8fff9, #d0ffe8)",
      border: "2px solid #4ECDC4",
      boxShadow: "0 4px 16px rgba(78,205,196,0.25)",
    };
    if (id === selected) return {
      background: "linear-gradient(135deg, #fff3f3, #ffe8e8)",
      border: "2px solid #FF6B6B",
      boxShadow: "0 4px 16px rgba(255,107,107,0.2)",
    };
    return { background: "#f5f5f5", border: "2px solid #eee", opacity: 0.5 };
  };

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "#FFF9F0" }}>
      {/* Header */}
      <div
        className="relative px-10 pt-8 pb-8 flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #FF6B6B 0%, #A29BFE 100%)" }}
      >
        <div className="absolute top-0 right-0 w-56 h-56 rounded-full opacity-10 bg-white" style={{ transform: "translate(20%, -30%)" }} />
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "14px", color: "rgba(255,255,255,0.8)" }}
            >
              ← Вернуться к чтению
            </button>
            <div className="flex items-center gap-3">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: i < results.length
                      ? (results[i] ? "#4ECDC4" : "#FF6B6B")
                      : i === currentQ ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)",
                    border: i === currentQ ? "2px solid #fff" : "none",
                  }}
                >
                  <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "12px", color: "#fff" }}>
                    {i < results.length ? (results[i] ? "✓" : "✗") : i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <span
              className="px-3 py-1 rounded-lg"
              style={{
                fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "12px",
                background: "rgba(255,255,255,0.2)", color: "#fff",
              }}
            >
              {question.chapter} · Вопрос {currentQ + 1} из {questions.length}
            </span>
            <h1 style={{ fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "26px", color: "#fff", marginTop: "10px", lineHeight: 1.3 }}>
              {question.text}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-10 py-8">
        <div className="max-w-7xl mx-auto grid gap-8" style={{ gridTemplateColumns: "1fr 380px" }}>
          {/* Left: Answers + explanation */}
          <div>
            {/* Mascot */}
            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #fff3f3, #ffe8e8)",
                  border: "3px solid #FFE66D",
                  boxShadow: "0 4px 16px rgba(255,107,107,0.2)",
                }}
              >
                <span style={{ fontSize: "34px" }}>🐷</span>
              </div>
              <div
                className="flex-1 p-5 rounded-3xl rounded-tl-none"
                style={{ background: "#fff", boxShadow: "0 4px 16px rgba(0,0,0,0.07)", border: "2px solid #f0ebe3" }}
              >
                <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "15px", color: "#555", lineHeight: 1.6 }}>
                  Привет! Я Наф-Наф 🏠 Я знаю правильный ответ, но не скажу! Подумайте сами и выберите лучший вариант!
                </p>
              </div>
            </div>

            {/* Answer options */}
            <div className="flex flex-col gap-3 mb-5">
              {question.answers.map((answer) => (
                <button
                  key={answer.id}
                  onClick={() => handleAnswer(answer.id)}
                  className="flex items-center gap-5 p-5 rounded-2xl text-left transition-all"
                  style={getAnswerStyle(answer.id)}
                  onMouseEnter={(e) => {
                    if (!answered) (e.currentTarget as HTMLButtonElement).style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateX(0)";
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all"
                    style={{
                      background: !answered
                        ? "linear-gradient(135deg, #f0e8ff, #e8f4ff)"
                        : answer.id === question.correct
                          ? "#4ECDC4"
                          : answer.id === selected
                            ? "#FF6B6B"
                            : "#e8e3df",
                    }}
                  >
                    <span style={{
                      fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "16px",
                      color: (!answered) ? "#A29BFE" : (answer.id === question.correct || answer.id === selected) ? "#fff" : "#bbb",
                    }}>
                      {answered && answer.id === question.correct ? "✓"
                        : answered && answer.id === selected && answer.id !== question.correct ? "✗"
                          : answer.id.toUpperCase()}
                    </span>
                  </div>
                  <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "16px", color: "#333", lineHeight: 1.4 }}>
                    {answer.text}
                  </p>
                </button>
              ))}
            </div>

            {/* Explanation */}
            {answered && (
              <div
                className="p-5 rounded-2xl"
                style={{
                  background: selected === question.correct
                    ? "linear-gradient(135deg, #e8fff9, #d0ffe8)"
                    : "linear-gradient(135deg, #fff3f3, #ffe8e8)",
                  border: `2px solid ${selected === question.correct ? "#4ECDC4" : "#FF6B6B"}`,
                }}
              >
                <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "15px", color: selected === question.correct ? "#4ECDC4" : "#FF6B6B", marginBottom: "6px" }}>
                  {selected === question.correct ? "🎉 Верно!" : "🤔 Не совсем..."}
                </p>
                <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "14px", color: "#555", lineHeight: 1.6 }}>
                  {question.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Right: Emotion picker + next */}
          <div className="flex flex-col gap-5">
            {/* Emotion picker */}
            <div
              className="rounded-3xl p-6"
              style={{ background: "#fff", border: "2px solid #f0ebe3", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}
            >
              <h3 style={{ fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "16px", color: "#333", marginBottom: "4px" }}>
                🌈 Настроение группы
              </h3>
              <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "13px", color: "#aaa", marginBottom: "16px" }}>
                Как чувствуют себя дети?
              </p>
              <div className="grid grid-cols-3 gap-3">
                {emotions.map((emotion) => (
                  <button
                    key={emotion.label}
                    onClick={() => setSelectedEmotion(emotion.label)}
                    className="flex flex-col items-center py-4 rounded-2xl transition-all"
                    style={{
                      background: selectedEmotion === emotion.label
                        ? `${emotion.color}22`
                        : "#f8f5f2",
                      border: selectedEmotion === emotion.label
                        ? `2px solid ${emotion.color}`
                        : "2px solid transparent",
                      boxShadow: selectedEmotion === emotion.label
                        ? `0 4px 14px ${emotion.color}40`
                        : "none",
                    }}
                  >
                    <span style={{ fontSize: "30px" }}>{emotion.emoji}</span>
                    <p
                      style={{
                        fontFamily: "Nunito, sans-serif",
                        fontWeight: 700,
                        fontSize: "10px",
                        color: selectedEmotion === emotion.label ? emotion.color : "#bbb",
                        marginTop: "6px",
                        textAlign: "center",
                      }}
                    >
                      {emotion.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Question stats */}
            <div
              className="rounded-3xl p-5"
              style={{ background: "#fff", border: "2px solid #f0ebe3" }}
            >
              <h3 style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "14px", color: "#333", marginBottom: "12px" }}>
                📊 Статистика ответов
              </h3>
              {[
                { label: "Ответили верно", value: results.filter(Boolean).length, total: results.length, color: "#4ECDC4" },
                { label: "Ошиблись", value: results.filter(r => !r).length, total: results.length, color: "#FF6B6B" },
              ].map((s) => (
                <div key={s.label} className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "12px", color: "#888" }}>{s.label}</p>
                    <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "14px", color: s.color }}>
                      {s.total === 0 ? "–" : `${s.value}/${s.total}`}
                    </p>
                  </div>
                  <div className="w-full h-2 rounded-full" style={{ background: "#f0ebe3" }}>
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: s.total === 0 ? "0%" : `${(s.value / s.total) * 100}%`,
                        background: s.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Continue button */}
            <button
              onClick={handleNext}
              disabled={!answered}
              className="w-full py-5 rounded-2xl flex items-center justify-center gap-3 transition-all"
              style={{
                background: answered
                  ? "linear-gradient(135deg, #A29BFE 0%, #FF6B6B 100%)"
                  : "#e8e3df",
                boxShadow: answered ? "0 8px 24px rgba(162,155,254,0.4)" : "none",
                cursor: answered ? "pointer" : "not-allowed",
              }}
            >
              <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "16px", color: answered ? "#fff" : "#bbb" }}>
                {!answered
                  ? "Выберите ответ"
                  : currentQ < questions.length - 1
                    ? "✨ Следующий вопрос"
                    : "🏆 Завершить блок вопросов"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
