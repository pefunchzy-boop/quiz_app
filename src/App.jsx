import { useState } from "react";
import QuizList from "./components/QuizList.jsx";
import CreateQuiz from "./components/CreateQuiz.jsx";
import PlayQuiz from "./components/PlayQuiz.jsx";
import Leaderboard from "./components/Leaderboard.jsx";

// Vues possibles : "list" | "create" | "play" | "leaderboard"
export default function App() {
  const [view, setView] = useState("list");
  const [activeQuiz, setActiveQuiz] = useState(null);

  function openQuiz(quiz) {
    setActiveQuiz(quiz);
    setView("play");
  }

  function openLeaderboard(quiz) {
    setActiveQuiz(quiz);
    setView("leaderboard");
  }

  function backToList() {
    setActiveQuiz(null);
    setView("list");
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-title">Carnet de Quiz</h1>
        <p className="page-subtitle">
          Crée une fiche de révision interactive, ou entraîne-toi sur celles des autres.
        </p>
      </header>

      <main className="page-main">
        {view === "list" && (
          <QuizList
            onPlay={openQuiz}
            onLeaderboard={openLeaderboard}
            onCreateClick={() => setView("create")}
          />
        )}

        {view === "create" && (
          <CreateQuiz onDone={backToList} onCancel={backToList} />
        )}

        {view === "play" && activeQuiz && (
          <PlayQuiz
            quiz={activeQuiz}
            onFinish={() => openLeaderboard(activeQuiz)}
            onQuit={backToList}
          />
        )}

        {view === "leaderboard" && activeQuiz && (
          <Leaderboard quiz={activeQuiz} onBack={backToList} />
        )}
      </main>
    </div>
  );
}
