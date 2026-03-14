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
    id: "indian-movies",
    name: "Indian Movies",
    description: "Bollywood & beyond."
  },
  {
    id: "technology",
    name: "Technology",
    description: "Code, cyberspace, and systems."
  },
  {
    id: "logic",
    name: "Logic",
    description: "Patterns, deduction, and misdirection."
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
  // General (decoy)
  q({
    id: "g1",
    segmentId: "general",
    title: "Cipher Warm-up",
    prompt: "Type the missing word: The quick brown ____ jumps over the lazy dog.",
    image: "img/decoy-grid-1.svg",
    hint: "It’s a common pangram.",
    answer: "FOX"
  }),
  q({
    id: "g2",
    segmentId: "general",
    title: "Coordinates",
    prompt: "If NORTH=UP and EAST=RIGHT, what is the opposite of EAST?",
    image: "img/decoy-compass.svg",
    hint: "Think simple directions.",
    answer: "WEST"
  }),
  q({
    id: "g3",
    segmentId: "general",
    title: "Prime Time",
    prompt: "Smallest prime number?",
    image: "img/decoy-numbers.svg",
    hint: "It’s even.",
    answer: "TWO"
  }),
  q({
    id: "g4",
    segmentId: "general",
    title: "Color Code",
    prompt: "RGB is short for Red, Green, ____.",
    image: "img/decoy-rgb.svg",
    hint: "Third primary light color.",
    answer: "BLUE"
  }),
  q({
    id: "g5",
    segmentId: "general",
    title: "Binary Door",
    prompt: "In binary, 2 is written as?",
    image: "img/decoy-binary.svg",
    hint: "It’s one followed by zero.",
    answer: "10"
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

