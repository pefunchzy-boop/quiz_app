import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.js";

function emptyQuestion() {
  return { text: "", options: ["", "", "", ""], correctIndex: 0 };
}

export default function CreateQuiz({ onDone, onCancel }) {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([emptyQuestion()]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function updateQuestionText(qIndex, text) {
    setQuestions((prev) =>
      prev.map((q, i) => (i === qIndex ? { ...q, text } : q))
    );
  }

  function updateOption(qIndex, oIndex, value) {
    setQuestions((prev) =>
      prev.map((q, i) => {
        if (i !== qIndex) return q;
        const options = [...q.options];
        options[oIndex] = value;
        return { ...q, options };
      })
    );
  }

  function updateCorrectIndex(qIndex, correctIndex) {
    setQuestions((prev) =>
      prev.map((q, i) => (i === qIndex ? { ...q, correctIndex } : q))
    );
  }

  function addQuestion() {
    setQuestions((prev) => [...prev, emptyQuestion()]);
  }

  function removeQuestion(qIndex) {
    setQuestions((prev) => prev.filter((_, i) => i !== qIndex));
  }

  function validate() {
    if (!title.trim()) return "Donne un titre à ta fiche.";
    if (questions.length === 0) return "Ajoute au moins une question.";
    for (const q of questions) {
      if (!q.text.trim()) return "Chaque question doit avoir un énoncé.";
      if (q.options.some((o) => !o.trim()))
        return "Chaque question doit avoir 4 réponses remplies.";
    }
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const problem = validate();
    if (problem) {
      setError(problem);
      return;
    }
    setError("");
    setSaving(true);
    try {
      await addDoc(collection(db, "quizzes"), {
        title: title.trim(),
        questions,
        createdAt: serverTimestamp(),
      });
      onDone();
    } catch (err) {
      console.error(err);
      setError(
        "L'enregistrement a échoué. Vérifie ta connexion et tes règles Firestore."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <section>
      <form className="sheet" onSubmit={handleSubmit}>
        <label className="field">
          <span className="field-label">Titre de la fiche</span>
          <input
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex : Vocabulaire allemand - Séquence 3"
          />
        </label>

        {questions.map((q, qIndex) => (
          <fieldset className="question-block" key={qIndex}>
            <legend>Question {qIndex + 1}</legend>

            <label className="field">
              <span className="field-label">Énoncé</span>
              <input
                className="input"
                value={q.text}
                onChange={(e) => updateQuestionText(qIndex, e.target.value)}
                placeholder="Ex : Que signifie 'der Tisch' ?"
              />
            </label>

            {q.options.map((opt, oIndex) => (
              <label className="field field-option" key={oIndex}>
                <input
                  type="radio"
                  name={`correct-${qIndex}`}
                  checked={q.correctIndex === oIndex}
                  onChange={() => updateCorrectIndex(qIndex, oIndex)}
                  title="Marquer comme bonne réponse"
                />
                <input
                  className="input"
                  value={opt}
                  onChange={(e) =>
                    updateOption(qIndex, oIndex, e.target.value)
                  }
                  placeholder={`Réponse ${oIndex + 1}`}
                />
              </label>
            ))}

            {questions.length > 1 && (
              <button
                type="button"
                className="btn btn-ghost btn-small"
                onClick={() => removeQuestion(qIndex)}
              >
                Supprimer cette question
              </button>
            )}
          </fieldset>
        ))}

        <button type="button" className="btn btn-ghost" onClick={addQuestion}>
          + Ajouter une question
        </button>

        {error && <p className="hint hint-error">{error}</p>}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Enregistrement…" : "Enregistrer la fiche"}
          </button>
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Annuler
          </button>
        </div>
      </form>
    </section>
  );
}
