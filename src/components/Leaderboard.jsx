import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase.js";

export default function Leaderboard({ quiz, onBack }) {
  const [scores, setScores] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function load() {
      try {
        const q = query(
          collection(db, "scores"),
          where("quizId", "==", quiz.id),
          orderBy("score", "desc"),
          limit(10)
        );
        const snap = await getDocs(q);
        setScores(snap.docs.map((d) => d.data()));
        setStatus("ready");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    }
    load();
  }, [quiz.id]);

  return (
    <section className="sheet">
      <h2 className="question-text">Classement — {quiz.title}</h2>

      {status === "loading" && <p className="hint">Chargement…</p>}
      {status === "error" && (
        <p className="hint hint-error">
          Impossible de charger le classement. Il faut créer un index
          Firestore composite (quizId + score) : Firebase te donnera un
          lien direct dans la console pour le créer automatiquement la
          première fois que cette requête tourne.
        </p>
      )}
      {status === "ready" && scores.length === 0 && (
        <p className="hint">Personne n'a encore joué à cette fiche.</p>
      )}

      <ol className="leaderboard">
        {scores.map((s, i) => (
          <li key={i} className="leaderboard-row">
            <span className="leaderboard-rank">{i + 1}</span>
            <span className="leaderboard-name">{s.pseudo}</span>
            <span className="leaderboard-score">
              {s.score}/{s.total}
            </span>
          </li>
        ))}
      </ol>

      <button className="btn btn-ghost" onClick={onBack}>
        Retour à l'accueil
      </button>
    </section>
  );
}
