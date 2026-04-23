import React, { useState } from "react";

const tales = [
  { id: 1, emoji: "🐷", title: "Три поросёнка", duration: "12 мин", difficulty: 2, age: "4-5", tags: ["Нравственность", "Логика"] },
  { id: 2, emoji: "🐺", title: "Красная шапочка", duration: "15 мин", difficulty: 3, age: "5-6", tags: ["Речь", "Эмоции"] },
  { id: 3, emoji: "🦆", title: "Гадкий утёнок", duration: "18 мин", difficulty: 3, age: "5-6", tags: ["Эмоции", "Нравственность"] },
  { id: 4, emoji: "🐟", title: "Золотая рыбка", duration: "10 мин", difficulty: 1, age: "3-4", tags: ["Речь", "Нравственность"] },
  { id: 5, emoji: "🏠", title: "Теремок", duration: "8 мин", difficulty: 1, age: "3-4", tags: ["Речь", "Логика"] },
  { id: 6, emoji: "🐸", title: "Царевна-лягушка", duration: "20 мин", difficulty: 4, age: "6-7", tags: ["Логика", "Эмоции"] },
  { id: 7, emoji: "🌹", title: "Аленький цветочек", duration: "22 мин", difficulty: 4, age: "6-7", tags: ["Нравственность", "Речь"] },
  { id: 8, emoji: "🐻", title: "Маша и медведь", duration: "9 мин", difficulty: 1, age: "3-4", tags: ["Речь", "Логика"] },
  { id: 9, emoji: "🦊", title: "Лиса и журавль", duration: "11 мин", difficulty: 2, age: "4-5", tags: ["Нравственность", "Речь"] },
  { id: 10, emoji: "🌊", title: "Дюймовочка", duration: "19 мин", difficulty: 3, age: "5-6", tags: ["Речь", "Эмоции"] },
  { id: 11, emoji: "❄️", title: "Снегурочка", duration: "14 мин", difficulty: 2, age: "4-5", tags: ["Эмоции", "Нравственность"] },
  { id: 12, emoji: "🔥", title: "Жар-птица", duration: "25 мин", difficulty: 4, age: "6-7", tags: ["Логика", "Речь"] },
];

const ages = ["Все", "3-4", "4-5", "5-6", "6-7"];
const diffColors = ["", "#4ECDC4", "#74B9FF", "#FFE66D", "#FF6B6B"];
const tagColors: Record<string, string> = {
  "Речь": "#4ECDC4",
  "Нравственность": "#FF6B6B",
  "Логика": "#A29BFE",
  "Эмоции": "#FFE66D",
};

interface HomeScreenProps {
  onSelect: (tale: typeof tales[0]) => void;
}

export function HomeScreen({ onSelect }: HomeScreenProps) {
  const [selectedAge, setSelectedAge] = useState("Все");
  const [search, setSearch] = useState("");

  const filtered = tales.filter((t) => {
    const matchAge = selectedAge === "Все" || t.age === selectedAge;
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    return matchAge && matchSearch;
  });

  return (
    <div className="flex flex-col h-full" style={{ background: "#FFF9F0" }}>
      {/* Hero header */}
      <div
        className="relative px-10 pt-10 pb-10"
        style={{ background: "linear-gradient(135deg, #4ECDC4 0%, #74B9FF 100%)" }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10 bg-white" style={{ transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 right-64 w-40 h-40 rounded-full opacity-10 bg-white" style={{ transform: "translateY(40%)" }} />

        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1
                style={{ fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "32px", color: "#fff" }}
              >
                📚 Каталог сказок
              </h1>
              <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "15px", color: "rgba(255,255,255,0.8)", marginTop: "6px" }}>
                {tales.length} интерактивных сказок для занятий с детьми 3–7 лет
              </p>
            </div>

            {/* Search */}
            <div className="relative" style={{ width: "380px" }}>
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#74B9FF]" style={{ fontSize: "18px" }}>🔍</span>
              <input
                type="text"
                placeholder="Поиск по названию..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white outline-none"
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "#333",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                }}
              />
            </div>
          </div>

          {/* Stats row */}
          <div className="flex gap-6 mt-8">
            {[
              { emoji: "✨", label: "Всего сказок", value: "12" },
              { emoji: "👶", label: "Возрастов", value: "4" },
              { emoji: "🎯", label: "Целей развития", value: "4" },
              { emoji: "⭐", label: "Средний рейтинг", value: "4.8" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)" }}
              >
                <span style={{ fontSize: "20px" }}>{s.emoji}</span>
                <div>
                  <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "20px", color: "#fff", lineHeight: 1 }}>{s.value}</p>
                  <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "11px", color: "rgba(255,255,255,0.75)" }}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters + Grid */}
      <div className="flex-1 overflow-y-auto px-10 py-8 max-w-7xl mx-auto w-full">
        {/* Age filters */}
        <div className="flex items-center gap-4 mb-8">
          <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "14px", color: "#888", textTransform: "uppercase", letterSpacing: "0.07em" }}>
            Возраст:
          </p>
          <div className="flex gap-3">
            {ages.map((age) => (
              <button
                key={age}
                onClick={() => setSelectedAge(age)}
                className="px-5 py-2 rounded-2xl transition-all"
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  background: selectedAge === age ? "#FF6B6B" : "#fff",
                  color: selectedAge === age ? "#fff" : "#888",
                  boxShadow: selectedAge === age
                    ? "0 4px 16px rgba(255,107,107,0.4)"
                    : "0 2px 8px rgba(0,0,0,0.07)",
                  border: selectedAge === age ? "none" : "2px solid #ede8e0",
                }}
              >
                {age === "Все" ? "🌈 Все" : `${age} лет`}
              </button>
            ))}
          </div>

          <div className="ml-auto">
            <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "14px", color: "#aaa" }}>
              Найдено: <span style={{ color: "#333", fontWeight: 900 }}>{filtered.length}</span> сказок
            </p>
          </div>
        </div>

        {/* Tale cards grid */}
        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {filtered.map((tale) => (
            <button
              key={tale.id}
              onClick={() => onSelect(tale)}
              className="bg-white rounded-3xl overflow-hidden text-left transition-all group"
              style={{
                boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                border: "2px solid #f0ebe3",
                transform: "translateY(0)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.07)";
              }}
            >
              {/* Emoji cover */}
              <div
                className="w-full flex items-center justify-center"
                style={{
                  height: "160px",
                  background: "linear-gradient(135deg, #fff9f0 0%, #ffecd2 100%)",
                }}
              >
                <span style={{ fontSize: "72px" }}>{tale.emoji}</span>
              </div>

              {/* Info */}
              <div className="p-5">
                <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "16px", color: "#222", marginBottom: "6px", lineHeight: 1.3 }}>
                  {tale.title}
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "12px", color: "#bbb" }}>
                    ⏱ {tale.duration}
                  </span>
                  <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "12px", color: "#bbb" }}>
                    👶 {tale.age} лет
                  </span>
                </div>

                {/* Tags */}
                <div className="flex gap-2 flex-wrap mb-4">
                  {tale.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-lg"
                      style={{
                        fontFamily: "Nunito, sans-serif",
                        fontWeight: 700,
                        fontSize: "10px",
                        background: `${tagColors[tag]}18`,
                        color: tagColors[tag],
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Difficulty + CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4].map((d) => (
                      <div
                        key={d}
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: d <= tale.difficulty ? diffColors[tale.difficulty] : "#e8e0d6" }}
                      />
                    ))}
                  </div>
                  <span
                    className="px-4 py-1.5 rounded-xl"
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: 800,
                      fontSize: "12px",
                      background: "linear-gradient(135deg, #4ECDC4, #74B9FF)",
                      color: "#fff",
                    }}
                  >
                    Выбрать →
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
