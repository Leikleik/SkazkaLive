import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { HomeScreen } from "./components/HomeScreen";
import { LessonSetupScreen } from "./components/LessonSetupScreen";
import { ReadingScreen } from "./components/ReadingScreen";
import { QuestionScreen } from "./components/QuestionScreen";
import { ResultsScreen } from "./components/ResultsScreen";

type Screen = "home" | "setup" | "reading" | "question" | "results";

interface Tale {
  id: number;
  emoji: string;
  title: string;
  duration: string;
  difficulty: number;
  age: string;
  tags: string[];
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedTale, setSelectedTale] = useState<Tale | null>(null);

  const navigate = (s: Screen) => setScreen(s);

  const handleSelectTale = (tale: Tale) => {
    setSelectedTale(tale);
    navigate("setup");
  };

  const handleStartLesson = () => navigate("reading");
  const handleQuestion = () => navigate("question");
  const handleAnswer = () => navigate("reading");
  const handleFinish = () => navigate("results");
  const handleRestart = () => {
    setSelectedTale(null);
    navigate("home");
  };

  return (
    <div
      className="flex w-screen h-screen overflow-hidden"
      style={{ fontFamily: "Nunito, sans-serif", background: "#FFF9F0" }}
    >
      {/* Sidebar */}
      <Sidebar
        screen={screen}
        onNavigate={navigate}
        hasSelectedTale={!!selectedTale}
      />

      {/* Main content */}
      <main className="flex-1 h-screen overflow-hidden flex flex-col">
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-8 py-4 flex-shrink-0"
          style={{
            background: "#fff",
            borderBottom: "1px solid #f0ebe3",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            <span style={{ fontSize: "16px" }}>
              {screen === "home" && "🏠"}
              {screen === "setup" && "⚙️"}
              {screen === "reading" && "📖"}
              {screen === "question" && "❓"}
              {screen === "results" && "🏆"}
            </span>
            <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "16px", color: "#222" }}>
              {screen === "home" && "Каталог сказок"}
              {screen === "setup" && "Настройка урока"}
              {screen === "reading" && "Режим чтения"}
              {screen === "question" && "Вопросы по тексту"}
              {screen === "results" && "Результаты занятия"}
            </p>
            {selectedTale && screen !== "home" && (
              <>
                <span style={{ color: "#ccc", fontWeight: 400, fontSize: "16px" }}>›</span>
                <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "14px", color: "#aaa" }}>
                  {selectedTale.emoji} {selectedTale.title}
                </p>
              </>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Date */}
            <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "13px", color: "#bbb" }}>
              Вторник, 21 апреля 2026
            </p>

            {/* Notification badge */}
            <div
              className="relative w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer"
              style={{ background: "#f8f5f2" }}
            >
              <span style={{ fontSize: "16px" }}>🔔</span>
              <div
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ background: "#FF6B6B" }}
              />
            </div>

            {/* Help */}
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer"
              style={{ background: "#f8f5f2" }}
            >
              <span style={{ fontSize: "16px" }}>💬</span>
            </div>

            {/* Avatar */}
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #FF6B6B, #FFE66D)" }}
            >
              <span style={{ fontSize: "16px" }}>👩‍🏫</span>
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div className="flex-1 overflow-hidden">
          {screen === "home" && (
            <HomeScreen onSelect={handleSelectTale} />
          )}
          {screen === "setup" && selectedTale && (
            <LessonSetupScreen
              tale={selectedTale}
              onStart={handleStartLesson}
              onBack={() => navigate("home")}
            />
          )}
          {screen === "reading" && selectedTale && (
            <ReadingScreen
              tale={selectedTale}
              onQuestion={handleQuestion}
              onFinish={handleFinish}
              onBack={() => navigate("setup")}
            />
          )}
          {screen === "question" && (
            <QuestionScreen
              onAnswer={handleAnswer}
              onBack={() => navigate("reading")}
            />
          )}
          {screen === "results" && (
            <ResultsScreen onRestart={handleRestart} />
          )}
        </div>
      </main>
    </div>
  );
}
