import { useEffect, useRef, useState } from "react";
import "./App.css";
import music from "./assets/Minnalvala.mp3";

const images = [
  "/src/assets/1.jpg",
  "/src/assets/2.jpg",
  "/src/assets/3.jpg",
  "/src/assets/5.jpg",
  "/src/assets/yath88.HEIC",
  "/src/assets/7.jpg",
  "/src/assets/8.jpg",
  "/src/assets/9.png",
  "/src/assets/IMG_0332.HEIC"
];

// 💕 First 9 Questions
const questions = [
  "Do you know you’re dangerously cute? 😌",
  "Are you smiling right now? 😏",
  "Do you promise not to skip this surprise? 👀",
  "On a scale of 1–10, how much do you like me? 😜",
  "Be honest… you miss me sometimes, right? 🥺",
  "If I steal your snacks, will you forgive me? 🍫",
  "Do you believe destiny brought you here today? ✨",
  "What if I told you this gets more romantic next? 💓",
  "Ready for something special? 😳"
];

// 💔 NO popup messages
const hurtMessages = [
  "💔 Ouch… that hurt. Try again",
  "😢 That answer hurt me… rethink",
  "🥺 My heart didn’t like that",
  "😞 That was painful… try again",
  "💔 Error: Heart cracked",
  "🙄 Wrong choice detected",
  "💘 System suggests pressing YES",
  "😶 That hurt… one more try"
];

function App() {
  const [started, setStarted] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [hurtIndex, setHurtIndex] = useState(0);

  const [showSlideshow, setShowSlideshow] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const [showFinalQuestion, setShowFinalQuestion] = useState(false);
  const [finalYes, setFinalYes] = useState(false);

  const [noHoverCount, setNoHoverCount] = useState(0);

  const audioRef = useRef(null);

  // 🎞️ Slideshow
  useEffect(() => {
    if (!showSlideshow) return;

    const timer = setInterval(() => {
      setSlideIndex((prev) => {
        if (prev === images.length - 1) {
          clearInterval(timer);
          setShowSlideshow(false);
          setShowFinalQuestion(true);
          return prev;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [showSlideshow]);

  const startSurprise = () => {
    setStarted(true);
    audioRef.current.play();
  };

  // ✅ YES for first 9 questions
  const handleYes = () => {
    if (qIndex < questions.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      setShowSlideshow(true);
    }
  };

  // 💔 NO popup (Q1–Q9)
  const handleNo = () => {
    alert(hurtMessages[hurtIndex]);
    setHurtIndex((prev) => (prev + 1) % hurtMessages.length);
  };

  // 😈 Final NO hover movement (3 times only)
  const handleFinalNoHover = (e) => {
    if (noHoverCount < 3) {
      const btn = e.target;
      btn.style.position = "absolute";
      btn.style.left = Math.random() * 70 + "%";
      btn.style.top = Math.random() * 70 + "%";
      setNoHoverCount((prev) => prev + 1);
    }
  };

  // 💍 Final NO click (after hover limit)
  const handleFinalNoClick = () => {
    if (noHoverCount >= 3) {
      alert(
        "💖 SYSTEM ANALYSIS COMPLETE 💖\n\n" +
        "Based on the answers,\n" +
        "the system has detected that you are\n\n" +
        "💍 Rithu’s Soulmate and Valentine ❤️\n\n" +
        "So click 'yes' 💖"
      );
    }
  };

  return (
    <div className="container">
      <audio ref={audioRef} src={music} loop />

      {/* START */}
      {!started && (
        <div className="start-screen">
          <h1>💖 Hey you… 💖</h1>
          <button onClick={startSurprise}>Tap to Start ❤️</button>
        </div>
      )}

      {/* QUESTIONS */}
      {started && !showSlideshow && !showFinalQuestion && (
        <div className="question-box">
          <h1>{questions[qIndex]}</h1>
          <button className="yes" onClick={handleYes}>YES 💖</button>
          <button className="no" onClick={handleNo}>NO 💔</button>
        </div>
      )}

      {/* SLIDESHOW */}
      {showSlideshow && (
        <div className="slideshow">
          <h1>💞 Every moment with you 💞</h1>
          <img src={images[slideIndex]} className="slide" />
        </div>
      )}

      {/* FINAL QUESTION */}
      {showFinalQuestion && !finalYes && (
        <div className="question-box">
          <h1>Will you be my Valentine? 💍❤️</h1>

          <button className="yes" onClick={() => setFinalYes(true)}>
            YES 💖
          </button>

          <button
            className="no"
            onMouseEnter={handleFinalNoHover}
            onClick={handleFinalNoClick}
          >
            NO 😜
          </button>
        </div>
      )}

      {/* FINAL RESULT */}
      {finalYes && (
        <div className="final">
          <h1>💖 YAYYYYY 💖</h1>
          <p>You are officially Rithu’s Valentine ❤️</p>
        </div>
      )}
    </div>
  );
}

export default App;
