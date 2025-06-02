const phrases = [
  "You got this!",
  "You're almost there!",
  "Don't give up!",
  "Believe in yourself.",
  "Your mom is proud of you, son.",
];

export default function chooseRandom() {
  const randomNumber = Math.floor(Math.random() * 5);
  return phrases[randomNumber];
}
