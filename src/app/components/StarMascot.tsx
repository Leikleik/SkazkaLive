import { useState, useEffect } from "react";

export function StarMascot() {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [animation, setAnimation] = useState<"idle" | "happy" | "celebrate">(
    "idle"
  );

  useEffect(() => {
    const handleMascotEvent = (e: CustomEvent) => {
      setMessage(e.detail.message || "");
      setAnimation(e.detail.animation || "idle");
      setIsVisible(true);

      if (e.detail.duration) {
        setTimeout(() => {
          setIsVisible(false);
        }, e.detail.duration);
      }
    };

    window.addEventListener(
      "showMascot" as any,
      handleMascotEvent as EventListener
    );

    return () => {
      window.removeEventListener(
        "showMascot" as any,
        handleMascotEvent as EventListener
      );
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-8 right-8 z-50 flex items-end gap-4"
      style={{
        animation:
          animation === "celebrate" ? "bounce 0.5s ease-in-out infinite" : "",
      }}
    >
      {/* Message bubble */}
      {message && (
        <div
          className="px-6 py-4 rounded-3xl max-w-xs relative"
          style={{
            background: "linear-gradient(135deg, #FFE66D, #FF6B6B)",
            boxShadow: "0 8px 24px rgba(255, 107, 107, 0.4)",
          }}
        >
          <p
            style={{
              fontFamily: "Nunito, sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              color: "#fff",
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            {message}
          </p>
          {/* Tail */}
          <div
            className="absolute -right-2 bottom-4 w-0 h-0"
            style={{
              borderLeft: "12px solid #FF6B6B",
              borderTop: "8px solid transparent",
              borderBottom: "8px solid transparent",
            }}
          />
        </div>
      )}

      {/* Mascot character */}
      <div
        className="relative w-32 h-32 flex items-center justify-center"
        style={{
          filter: "drop-shadow(0 8px 16px rgba(162, 155, 254, 0.3))",
        }}
      >
        {/* Star body */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            fontSize: "120px",
            transform: animation === "happy" ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.3s ease",
          }}
        >
          ⭐
        </div>

        {/* Face */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex flex-col items-center gap-1 mt-2">
            {/* Eyes */}
            <div className="flex gap-4">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: "#333" }}
              />
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: "#333" }}
              />
            </div>
            {/* Smile */}
            <div
              className="w-8 h-4 rounded-b-full mt-1"
              style={{
                borderBottom: "3px solid #333",
                borderLeft: "3px solid #333",
                borderRight: "3px solid #333",
              }}
            />
          </div>
        </div>

        {/* Hair/bow */}
        <div
          className="absolute -top-2 left-1/2 transform -translate-x-1/2"
          style={{ fontSize: "32px" }}
        >
          🎀
        </div>
      </div>
    </div>
  );
}

export function showMascot(
  message: string,
  animation: "idle" | "happy" | "celebrate" = "idle",
  duration: number = 3000
) {
  const event = new CustomEvent("showMascot", {
    detail: { message, animation, duration },
  });
  window.dispatchEvent(event);
}
