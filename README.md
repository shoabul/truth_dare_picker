# Truth or Dare 🎲

একটা mobile-friendly, party-style **Truth or Dare** web game। Player তার নাম দিয়ে শুরু করে, প্রতি round-এ Truth অথবা Dare বেছে নেয়, আর সেই অনুযায়ী challenge পায়।

## ✨ Features

- **Setup Screen** — Player নিজের নাম লিখে গেম শুরু করে
- **Truth or Dare Selection** — দুইটা বড় card থেকে যেকোনো একটা বেছে নেওয়া যায়
- **Round & Streak Tracker** — কতগুলো round খেলা হয়েছে আর current streak কত, header-এ দেখা যায়
- **Result Card** — Challenge/question একটা animated card-এ দেখানো হয়
- **Next Turn** — এক click-এ পরের round-এ চলে যাওয়া যায়

## 🗂️ Project Structure

```
.
├── index.html          # Main HTML structure
├── style.css           # Styling (background shapes, cards, layout)
└── dist/
    └── script.js        # Game logic (compiled/bundled JS)
```

## 🚀 Getting Started

1. Repository clone অথবা download করো
2. `index.html` কোনো browser-এ open করো — কোনো build step বা server লাগবে না (যদি `dist/script.js` already build করা থাকে)
3. যদি `script.js` source থেকে build করতে হয়, তাহলে তোমার bundler (webpack/vite/esbuild ইত্যাদি) দিয়ে build চালাও এবং output `dist/` folder-এ রাখো

## 🎮 How to Play

1. তোমার নাম লিখে **LET'S GO!** বাটনে ক্লিক করো
2. **TRUTH** অথবা **DARE** card বেছে নাও
3. **PICK!** বাটনে ক্লিক করলে random একটা question/challenge আসবে
4. Challenge শেষ হলে **NEXT TURN**-এ ক্লিক করে পরের round-এ যাও

## 🛠️ Built With

- HTML5
- CSS3 (custom styling, background shapes, card animations)
- Vanilla JavaScript (ES Module — `dist/script.js`)

## ⚠️ Note

> Remember: what happens here stays here. 😉

## 📄 License

এই প্রজেক্টের license এখনো নির্ধারিত হয়নি — প্রয়োজন অনুযায়ী পরে যোগ করো।
