export type QuizQuestion = {
  id: string;
  segmentId: string;
  title: string;
  prompt: string;
  image: string;
  answerLength: number;
  hint: string;
  answer: string;
};

export type QuizSegment = {
  id: string;
  name: string;
  description: string;
};

export const SEGMENTS: QuizSegment[] = [
  {
    id: "general",
    name: "General",
    description: "Warm-up puzzles to calibrate your brain."
  },
  {
    id: "logic",
    name: "Logic",
    description: "Patterns, deduction, and misdirection."
  },
  {
    id: "indian-movies",
    name: "Movies",
    description: "Bollywood & beyond."
  },
  {
    id: "technology",
    name: "Technology",
    description: "Code, cyberspace, and systems."
  }
];

const q = (question: Omit<QuizQuestion, "answerLength">): QuizQuestion => ({
  ...question,
  answerLength: normalizeAnswer(question.answer).length
});

export function normalizeAnswer(input: string): string {
  return input.replace(/[^a-z0-9]/gi, "").toUpperCase();
}

export const QUESTIONS: QuizQuestion[] = [
  // General
  q({
    id: "g1",
    segmentId: "general",
    title: "Weightless Presence",
    prompt: "I am weightless, yet I can be felt. I have no voice, but I can keep you awake. I am the only thing that travels at the speed of light but can be stopped by a single piece of paper. If you lose me, you are in the dark; if you have too much of me, you cannot see.",
    image: "",
    hint: "I am the silhouette of a traveler that moves as fast as the sun, yet I am born only when your body gets in the way.",
    answer: "Shadow"
  }),
  q({
    id: "g2",
    segmentId: "general",
    title: "Presence in Absence",
    prompt: "The more of me there is, the less you see. I have no weight, but I can sink a ship. I can be found in a vacuum, but I cannot exist without a boundary. I am not a thing, but a lack of things.",
    image: "",
    hint: "I am the \"empty\" part of a needle that allows the thread to pass through.",
    answer: "hole"
  }),
  q({
    id: "g3",
    segmentId: "general",
    title: "Eternal Carry",
    prompt: "I am given to you once, but you must carry me forever. I have no mass, yet I can make a person’s back bend. I am often shared, but never divided. If you drop me, I am gone forever, but I can be broken without being touched.",
    image: "",
    hint: "Your character",
    answer: "Reputation"
  }),
  q({
    id: "g4",
    segmentId: "general",
    title: "Building by Taking",
    prompt: "I am the only thing on Earth that is built by taking away. The harder the worker labors, the larger I grow. I have no walls, yet I can be a room; I have no roof, yet I can be a shelter. I am a void defined by what I am not.",
    image: "",
    hint: "A deep hole in mountain",
    answer: "cave"
  }),
  q({
    id: "g5",
    segmentId: "general",
    title: "Silent Pointer",
    prompt: "I have no voice, but I can tell you everything about yourself. I have no hands, but I can point you in the right direction. I weigh nothing, but I can make a giant sink into the earth. I am always behind you when you walk toward the light.",
    image: "",
    hint: "Mark left by ur shoe",
    answer: "Footprint"
  }),

  // Indian Movies (decoy)
  q({
    id: "m1",
    segmentId: "indian-movies",
    title: "Iconic Phrase",
    prompt: "Complete: 'Mogambo ____ hai!'",
    image: "img/decoy-film-1.svg",
    hint: "A famous villain is…",
    answer: "KHUSH"
  }),
  q({
    id: "m2",
    segmentId: "indian-movies",
    title: "Classic Duo",
    prompt: "In 'Sholay', Jai and ____ are best friends.",
    image: "img/decoy-film-2.svg",
    hint: "His name starts with V.",
    answer: "VEERU"
  }),
  q({
    id: "m3",
    segmentId: "indian-movies",
    title: "Song Byte",
    prompt: "Finish: 'All is well' was popularized by which film (one word)?",
    image: "img/decoy-film-3.svg",
    hint: "Aamir + engineering college.",
    answer: "THREEIDIOTS"
  }),
  q({
    id: "m4",
    segmentId: "indian-movies",
    title: "Space",
    prompt: "India’s first space film: 'Mission ____'.",
    image: "img/decoy-film-4.svg",
    hint: "It’s a planet.",
    answer: "MANGAL"
  }),
  q({
    id: "m5",
    segmentId: "indian-movies",
    title: "Superstar",
    prompt: "A common nickname for Shah Rukh Khan (3 letters).",
    image: "img/decoy-film-5.svg",
    hint: "Initials.",
    answer: "SRK"
  }),

  // Technology (decoy)
  q({
    id: "t1",
    segmentId: "technology",
    title: "HTTP",
    prompt: "HTTP status for 'Not Found' (three digits).",
    image: "img/decoy-http.svg",
    hint: "The famous one.",
    answer: "404"
  }),
  q({
    id: "t2",
    segmentId: "technology",
    title: "Keyed",
    prompt: "A common keyboard shortcut to copy (Windows).",
    image: "img/decoy-keys.svg",
    hint: "Ctrl + ?",
    answer: "CTRL C"
  }),
  q({
    id: "t3",
    segmentId: "technology",
    title: "Language",
    prompt: "This project runs with Node.js and ____ (package manager).",
    image: "img/decoy-node.svg",
    hint: "Three-letter tool.",
    answer: "NPM"
  }),
  q({
    id: "t4",
    segmentId: "technology",
    title: "Security",
    prompt: "A strong password technique: add a ____ factor (abbr.).",
    image: "img/decoy-lock.svg",
    hint: "Two-factor authentication.",
    answer: "2FA"
  }),
  q({
    id: "t5",
    segmentId: "technology",
    title: "Storage",
    prompt: "Local storage in browsers is called ____Storage (one word prefix).",
    image: "img/decoy-storage.svg",
    hint: "Not session.",
    answer: "LOCAL"
  }),

  // Logic (decoy)
  q({
    id: "l1",
    segmentId: "logic",
    title: "Sequence",
    prompt: "2, 4, 8, 16, ____ (two digits).",
    image: "img/decoy-seq.svg",
    hint: "Multiply by 2.",
    answer: "32"
  }),
  q({
    id: "l2",
    segmentId: "logic",
    title: "Truth",
    prompt: "Opposite of TRUE (one word).",
    image: "img/decoy-truth.svg",
    hint: "Boolean.",
    answer: "FALSE"
  }),
  q({
    id: "l3",
    segmentId: "logic",
    title: "Riddle",
    prompt: "What has keys but can't open locks? (one word).",
    image: "img/decoy-keys-2.svg",
    hint: "It makes music.",
    answer: "PIANO"
  }),
  q({
    id: "l4",
    segmentId: "logic",
    title: "Mirror",
    prompt: "Write the same forward and backward: 'LEVEL' is a ____.",
    image: "img/decoy-mirror.svg",
    hint: "Palindrome.",
    answer: "PALINDROME"
  }),
  q({
    id: "l5",
    segmentId: "logic",
    title: "Last Lock",
    prompt: "If you have 1 byte, how many bits is that? (one digit).",
    image: "img/decoy-byte.svg",
    hint: "Classic conversion.",
    answer: "8"
  })
];

export type PublicQuiz = {
  segments: QuizSegment[];
  questions: Array<
    Omit<QuizQuestion, "answer"> & {
      answerLength: number;
    }
  >;
};

export function getPublicQuiz(): PublicQuiz {
  return {
    segments: SEGMENTS,
    questions: QUESTIONS.map(({ answer, ...rest }) => rest)
  };
}

export function getQuestionById(questionId: string): QuizQuestion | undefined {
  return QUESTIONS.find((qq) => qq.id === questionId);
}

