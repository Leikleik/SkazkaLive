import { useState } from "react";
import { Link } from "react-router";

interface Tale {
  id: number;
  emoji: string;
  title: string;
  duration: string;
  age: string;
  genre: string;
  gender: string;
  description: string;
  color: string;
}

const TALES: Tale[] = [
  {
    id: 1,
    emoji: "🐺",
    title: "Красная Шапочка",
    duration: "15 мин",
    age: "3-5 лет",
    genre: "Классика",
    gender: "Девочкам",
    description: "История о девочке и сером волке",
    color: "#FF6B6B",
  },
  {
    id: 2,
    emoji: "👸",
    title: "Золушка",
    duration: "20 мин",
    age: "4-7 лет",
    genre: "Волшебные",
    gender: "Девочкам",
    description: "Волшебная история о доброте и чудесах",
    color: "#A29BFE",
  },
  {
    id: 3,
    emoji: "🐻",
    title: "Три медведя",
    duration: "12 мин",
    age: "3-5 лет",
    genre: "Классика",
    gender: "Всем",
    description: "Приключения Машеньки в лесу",
    color: "#4ECDC4",
  },
  {
    id: 4,
    emoji: "🦁",
    title: "Король Лев",
    duration: "25 мин",
    age: "5-7 лет",
    genre: "Приключения",
    gender: "Мальчикам",
    description: "Путь маленького львёнка к великой судьбе",
    color: "#FFE66D",
  },
  {
    id: 5,
    emoji: "🧜‍♀️",
    title: "Русалочка",
    duration: "18 мин",
    age: "4-7 лет",
    genre: "Волшебные",
    gender: "Девочкам",
    description: "Подводная принцесса мечтает о мире людей",
    color: "#74B9FF",
  },
  {
    id: 6,
    emoji: "🐉",
    title: "Храбрый рыцарь",
    duration: "16 мин",
    age: "5-7 лет",
    genre: "Приключения",
    gender: "Мальчикам",
    description: "Юный рыцарь спасает королевство от дракона",
    color: "#FF6B6B",
  },
  {
    id: 7,
    emoji: "🦊",
    title: "Колобок",
    duration: "10 мин",
    age: "3-4 года",
    genre: "Классика",
    gender: "Всем",
    description: "Весёлый колобок путешествует по лесу",
    color: "#FFE66D",
  },
  {
    id: 8,
    emoji: "🌟",
    title: "Звёздная принцесса",
    duration: "22 мин",
    age: "4-7 лет",
    genre: "Волшебные",
    gender: "Девочкам",
    description: "Принцесса, которая управляет звёздами",
    color: "#A29BFE",
  },
];

const GENRES = ["Все жанры", "Классика", "Волшебные", "Приключения"];
const AGES = ["Все возраста", "3-4 года", "3-5 лет", "4-7 лет", "5-7 лет"];
const GENDERS = ["Всем", "Девочкам", "Мальчикам"];

export function CatalogPage() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Все жанры");
  const [selectedAge, setSelectedAge] = useState("Все возраста");
  const [selectedGender, setSelectedGender] = useState("Всем");

  const filteredTales = TALES.filter((tale) => {
    const matchesSearch =
      tale.title.toLowerCase().includes(search.toLowerCase()) ||
      tale.description.toLowerCase().includes(search.toLowerCase());
    const matchesGenre =
      selectedGenre === "Все жанры" || tale.genre === selectedGenre;
    const matchesAge = selectedAge === "Все возраста" || tale.age === selectedAge;
    const matchesGender =
      selectedGender === "Всем" || tale.gender === selectedGender;

    return matchesSearch && matchesGenre && matchesAge && matchesGender;
  });

  return (
    <div className="w-full h-full overflow-y-auto" style={{ background: "#FFF9F0" }}>
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
          📚 Каталог сказок
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
          Найди идеальную сказку для своей группы!
        </p>
      </div>

      <div className="px-16 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div
            className="px-8 py-5 rounded-3xl flex items-center gap-4"
            style={{
              background: "#fff",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              border: "3px solid #4ECDC4",
            }}
          >
            <span style={{ fontSize: "28px" }}>🔍</span>
            <input
              type="text"
              placeholder="Поиск по названию или описанию..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 outline-none"
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 600,
                fontSize: "18px",
                color: "#333",
                background: "transparent",
              }}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-12 grid grid-cols-3 gap-6">
          {/* Genre Filter */}
          <div>
            <label
              className="block mb-3"
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 800,
                fontSize: "16px",
                color: "#333",
              }}
            >
              🎭 Жанр
            </label>
            <div className="flex flex-wrap gap-2">
              {GENRES.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className="px-5 py-3 rounded-2xl transition-transform hover:scale-105"
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 700,
                    fontSize: "14px",
                    background:
                      selectedGenre === genre
                        ? "linear-gradient(135deg, #FF6B6B, #FFE66D)"
                        : "#fff",
                    color: selectedGenre === genre ? "#fff" : "#666",
                    border:
                      selectedGenre === genre ? "none" : "2px solid #e0e0e0",
                    boxShadow:
                      selectedGenre === genre
                        ? "0 4px 16px rgba(255, 107, 107, 0.3)"
                        : "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Age Filter */}
          <div>
            <label
              className="block mb-3"
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 800,
                fontSize: "16px",
                color: "#333",
              }}
            >
              👶 Возраст
            </label>
            <div className="flex flex-wrap gap-2">
              {AGES.map((age) => (
                <button
                  key={age}
                  onClick={() => setSelectedAge(age)}
                  className="px-5 py-3 rounded-2xl transition-transform hover:scale-105"
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 700,
                    fontSize: "14px",
                    background:
                      selectedAge === age
                        ? "linear-gradient(135deg, #4ECDC4, #74B9FF)"
                        : "#fff",
                    color: selectedAge === age ? "#fff" : "#666",
                    border: selectedAge === age ? "none" : "2px solid #e0e0e0",
                    boxShadow:
                      selectedAge === age
                        ? "0 4px 16px rgba(78, 205, 196, 0.3)"
                        : "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>

          {/* Gender Filter */}
          <div>
            <label
              className="block mb-3"
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 800,
                fontSize: "16px",
                color: "#333",
              }}
            >
              👦👧 Для кого
            </label>
            <div className="flex flex-wrap gap-2">
              {GENDERS.map((gender) => (
                <button
                  key={gender}
                  onClick={() => setSelectedGender(gender)}
                  className="px-5 py-3 rounded-2xl transition-transform hover:scale-105"
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 700,
                    fontSize: "14px",
                    background:
                      selectedGender === gender
                        ? "linear-gradient(135deg, #A29BFE, #FF6B6B)"
                        : "#fff",
                    color: selectedGender === gender ? "#fff" : "#666",
                    border:
                      selectedGender === gender ? "none" : "2px solid #e0e0e0",
                    boxShadow:
                      selectedGender === gender
                        ? "0 4px 16px rgba(162, 155, 254, 0.3)"
                        : "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p
            style={{
              fontFamily: "Nunito, sans-serif",
              fontWeight: 700,
              fontSize: "18px",
              color: "#666",
            }}
          >
            Найдено сказок: <span style={{ color: "#4ECDC4", fontWeight: 900 }}>{filteredTales.length}</span>
          </p>
        </div>

        {/* Tales Grid */}
        <div className="grid grid-cols-4 gap-6 pb-16">
          {filteredTales.map((tale) => (
            <Link
              key={tale.id}
              to={`/lesson/${tale.id}`}
              className="rounded-3xl overflow-hidden transition-transform hover:scale-105"
              style={{
                background: "#fff",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                border: `3px solid ${tale.color}`,
              }}
            >
              {/* Card Header */}
              <div
                className="p-8 flex flex-col items-center text-center"
                style={{
                  background: `linear-gradient(135deg, ${tale.color}, ${tale.color}dd)`,
                }}
              >
                <span style={{ fontSize: "80px", marginBottom: "16px" }}>
                  {tale.emoji}
                </span>
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 900,
                    fontSize: "22px",
                    color: "#fff",
                    textShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                >
                  {tale.title}
                </h3>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p
                  className="mb-4"
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#666",
                    lineHeight: 1.5,
                  }}
                >
                  {tale.description}
                </p>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: "16px" }}>⏱️</span>
                    <span
                      style={{
                        fontFamily: "Nunito, sans-serif",
                        fontWeight: 700,
                        fontSize: "13px",
                        color: "#999",
                      }}
                    >
                      {tale.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: "16px" }}>👶</span>
                    <span
                      style={{
                        fontFamily: "Nunito, sans-serif",
                        fontWeight: 700,
                        fontSize: "13px",
                        color: "#999",
                      }}
                    >
                      {tale.age}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: "16px" }}>🎭</span>
                    <span
                      style={{
                        fontFamily: "Nunito, sans-serif",
                        fontWeight: 700,
                        fontSize: "13px",
                        color: "#999",
                      }}
                    >
                      {tale.genre}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredTales.length === 0 && (
          <div className="py-20 flex flex-col items-center text-center">
            <span style={{ fontSize: "120px", marginBottom: "24px" }}>😢</span>
            <h3
              className="mb-3"
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 900,
                fontSize: "32px",
                color: "#333",
              }}
            >
              Сказки не найдены
            </h3>
            <p
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 600,
                fontSize: "18px",
                color: "#666",
              }}
            >
              Попробуйте изменить фильтры или поисковый запрос
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
