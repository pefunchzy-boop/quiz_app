import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.js";

export default function PlayQuiz({ quiz, onFinish, onQuit }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [finished, setFinished] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [saving, setSaving] = useState(false);

  const questions = quiz.questions || [];
  const current = questions[step];
  const isLast = step === questions.length - 1;

  function chooseOption(index) {
    if (showAnswer) return;
    setSelected(index);
    setShowAnswer(true);
    if (index === current.correctIndex) {
      setScore((s) => s + 1);
    }
  }

  function next() {
    if (isLast) {
      setFinished(true);
      return;
    }
    setStep((s) => s + 1);
    setSelected(null);
    setShowAnswer(false);
  }

  async function saveScore() {
    if (!pseudo.trim()) return;
    setSaving(true);
    try {
      await addDoc(collection(db, "scores"), {
        quizId: quiz.id,
        pseudo: pseudo.trim(),
        score,
        total: questions.length,
        createdAt: serverTimestamp(),
      });
      onFinish();
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  }

  if (questions.length === 0) {
    return (
      <section className="sheet">
        <p className="hint">Cette fiche n'a pas de questions.</p>
        <button className="btn btn-ghost" onClick={onQuit}>
          Retour
        </button>
      </section>
    );
  }

  if (finished) {
    return (
      <section className="sheet result-sheet">
        <h2 className="result-score">
          {score} / {questions.length}
        </h2>
        <p className="hint">Entre ton prénom pour l'ajouter au classement.</p>
        <input
          className="input"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          placeholder="Ton prénom"
        />
        <div className="form-actions">
          <button
            className="btn btn-primary"
            onClick={saveScore}
            disabled={saving || !pseudo.trim()}
          >
            {saving ? "Enregistrement…" : "Voir le classement"}
          </button>
          <button className="btn btn-ghost" onClick={onQuit}>
            Retour à l'accueil
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="sheet">
      <p className="hint">
        Question {step + 1} / {questions.length}
      </p>
      <h2 className="question-text">{current.text}</h2>

      <div className="option-grid">
        {current.options.map((opt, i) => {
          let cls = "option-btn";
          if (showAnswer) {
            if (i === current.correctIndex) cls += " option-correct";
            else if (i === selected) cls += " option-wrong";
          }
          return (
            <button
              key={i}
              className={cls}
              onClick={() => chooseOption(i)}
              disabled={showAnswer}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <div className="form-actions">
        {showAnswer && (
          <button className="btn btn-primary" onClick={next}>
            {isLast ? "Voir mon score" : "Question suivante"}
          </button>
        )}
        <button className="btn btn-ghost" onClick={onQuit}>
          Quitter
        </button>
      </div>
    </section>
  );
}
