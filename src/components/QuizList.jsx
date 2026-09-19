import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase.js";

export default function QuizList({ onPlay, onLeaderboard, onCreateClick }) {
  const [quizzes, setQuizzes] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    async function load() {
      try {
        const q = query(collection(db, "quizzes"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        setQuizzes(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setStatus("ready");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    }
    load();
  }, []);

  return (
    <section>
      <button className="btn btn-primary" onClick={onCreateClick}>
        + Nouvelle fiche de quiz
      </button>

      {status === "loading" && <p className="hint">Chargement des fiches…</p>}

      {status === "error" && (
        <p className="hint hint-error">
          Impossible de charger les quiz. Vérifie ta config Firebase dans
          src/firebase.js et tes règles Firestore.
        </p>
      )}

      {status === "ready" && quizzes.length === 0 && (
        <p className="hint">
          Aucune fiche pour l'instant. Crée la première !
        </p>
      )}

      <div className="card-stack">
        {quizzes.map((quiz, i) => (
          <article
            className="index-card"
            key={quiz.id}
            style={{ "--tilt": `${(i % 2 === 0 ? -1 : 1) * 1.2}deg` }}
          >
            <h3 className="index-card-title">{quiz.title}</h3>
            <p className="index-card-meta">
              {quiz.questions?.length ?? 0} question
              {(quiz.questions?.length ?? 0) > 1 ? "s" : ""}
            </p>
            <div className="index-card-actions">
              <button className="btn btn-primary" onClick={() => onPlay(quiz)}>
                Jouer
              </button>
              <button className="btn btn-ghost" onClick={() => onLeaderboard(quiz)}>
                Classement
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
