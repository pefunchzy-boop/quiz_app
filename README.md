# Carnet de Quiz

Appli web pour créer des fiches de quiz (QCM) et s'entraîner dessus, avec
classement des scores. Frontend React (Vite) + base de données Firestore.
Pas de backend séparé : tout se passe directement entre le site et Firebase.

## 1. Crée ton projet Firebase

1. Va sur [Firebase Console](https://console.firebase.google.com/) et crée
   un nouveau projet (gratuit).
2. Dans le menu de gauche, active **Firestore Database** (mode production).
3. Va dans **Paramètres du projet > Général**, descends jusqu'à
   "Tes applications", clique sur l'icône web `</>` pour enregistrer une
   application web, et copie la config qui s'affiche (`firebaseConfig`).
4. Colle ces valeurs dans `src/firebase.js`, à la place de `TA_CLE_API`,
   `TON_PROJET`, etc.
5. Va dans **Firestore Database > Règles**, remplace tout le contenu par
   celui du fichier `firestore.rules` de ce projet, puis publie.

## 2. Installe et lance en local

```bash
npm install
npm run dev
```

Le site s'ouvre sur `http://localhost:5173`.

## 3. Déploie sur GitHub Pages

1. Crée un dépôt GitHub (par exemple `quiz_app`) et pousse ce projet dedans.
2. Ouvre `vite.config.js` et vérifie que `base` correspond bien au nom de
   ton dépôt (ex : `/quiz_app/`).
3. Installe l'outil de déploiement (déjà dans `package.json`, donc `npm
   install` suffit) puis lance :

```bash
npm run deploy
```

Ça build le site et le pousse automatiquement sur une branche `gh-pages`.

4. Dans GitHub, va dans **Settings > Pages** du dépôt, et choisis comme
   source la branche `gh-pages`. Ton site sera accessible à l'adresse
   `https://tonpseudo.github.io/quiz_app/`.

## Sécurité — ce qui a changé par rapport à la première version

- **Plus de `serviceAccountKey.json`** : cette clé était le vrai danger
  (elle donnait un accès total à ta base). Ici, il n'y a plus de backend
  du tout, donc plus de clé de ce type à protéger.
- **`firebaseConfig` reste visible dans le code**, et c'est normal — ce
  n'est pas un secret. La protection se fait via `firestore.rules`
  (déjà inclus, à publier dans la console Firebase).
- **`.gitignore`** est configuré pour ne jamais committer un fichier
  `.env` ou une éventuelle clé de service si tu en ajoutes une plus tard.

## Structure

```
quiz_app/
├── index.html
├── vite.config.js
├── firestore.rules       ← à copier dans Firebase Console
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── firebase.js       ← à remplir avec ta config Firebase
│   └── components/
│       ├── QuizList.jsx
│       ├── CreateQuiz.jsx
│       ├── PlayQuiz.jsx
│       └── Leaderboard.jsx
```
