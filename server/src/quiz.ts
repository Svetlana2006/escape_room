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
  // General - 10 questions for random pool
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
  q({
    id: "g6",
    segmentId: "general",
    title: "Light as a Feather",
    prompt: "I am as light as a feather, yet the strongest man on Earth cannot hold me for more than a few minutes. I cost nothing to start, but everything to lose. I am not a liquid, but I can \"fail\" if you are under pressure.",
    image: "",
    hint: "You do it about 20,000 times a day without even thinking.",
    answer: "Breath"
  }),
  q({
    id: "g7",
    segmentId: "general",
    title: "Billions of Eyes",
    prompt: "I have billions of eyes but cannot see. I have millions of ears but cannot hear. I fall from the sky without a parachute, and I dance without any feet. I can cover the world in white, but I turn to tears the moment you try to keep me.",
    image: "",
    hint: "I am the only thing you can use to build a man that melts.",
    answer: "snow"
  }),
  q({
    id: "g8",
    segmentId: "general",
    title: "Invisible Bridge",
    prompt: "I am a bridge that connects two people but touches only one. I can be bought, but I cannot be sold. I am a circle that has no beginning or end, yet I am often broken by a single word.",
    image: "",
    hint: "I am made of words, but I am broken by actions.",
    answer: "promise"
  }),
  q({
    id: "g9",
    segmentId: "general",
    title: "Silent Spectacle",
    prompt: "I have millions of stories but not a single book. I have thousands of years of history, but I have never attended a day of school. I can show you the stars in the middle of the day and bring the dead back to life for a few hours. I am a place where you sit in the dark to see the light, and although I am filled with people, everyone remains silent until the very end.",
    image: "",
    hint: "It’s the only place where you pay to watch someone else's dreams in the dark.",
    answer: "theater"
  }),
  q({
    id: "g10",
    segmentId: "general",
    title: "Silver Armor",
    prompt: "I have silver armor but no knight, and I’m full of bubbles but never soap. I have all the bite of my famous brother, but none of his weight. I’m the choice of the restless worker and the late-night scholar who wants the kick without the cost.",
    image: "",
    hint: "I’m a \"lighter\" version of a classic, and I’m famously associated with a silver can.",
    answer: "Diet coke"
  }),

  // Indian Movies
  q({
    id: "m1",
    segmentId: "indian-movies",
    title: "Inspiring Legacy",
    prompt: "After making this seriously inspiring movie, the director of the same made a comedy drama movie later on having a bunch of engineering students bringing back the nostalgia of their clg lives, not only the previously mentioned movie inspired but also removed the veil from so bad societal injustice in our country against specific humans. These emojis can tell you a lot about the movie : 🫃 + 👧 + 💇‍♀️ + 🎖️. Name the Last Name ( Surname ) associated with the movie’s original inspiration.",
    image: "",
    hint: "Think of the surname of the sisters who inspired the wrestling biopic.",
    answer: "PHOGAT"
  }),
  q({
    id: "m2",
    segmentId: "indian-movies",
    title: "The Cannes Phase",
    prompt: "An emotion or a phase in life that we all never wanna experience voluntarily, still we all experience that in our lives. But after that phase or emotional state is over and we actually experience anything good, that makes a cherish that good time. The word for that emotion was used in a movie dialogue popularising a meme that “why doesn’t this phase end”(obvi not in this language). Sadly this movie didn’t gross a lot in india, but after getting recognised at cannes it did make some profit from overseas premiers. Still remains in heart of a niche cult audience. Guess the movie, then tell which actor made his debut through this movie.",
    image: "",
    hint: "The movie title translates to a state of 'Masaan' (cremation ground).",
    answer: "VICKY KAUSHAL"
  }),
  q({
    id: "m3",
    segmentId: "indian-movies",
    title: "Bolly Satire",
    prompt: "In the wold of parody or satire movie, Bollywood kind of lies behind as compared to other movie industries, But with this movie we actually showed our guts like even till now stand up comics hold them back before making a joke regarding this unfortunate incident even but this indian movie didn’t hold back not only they did satire the whole incident but also shed light on a conspiracy against american government that no one was talking about. These emojis can tell you everything about the movie if you are actually a BollyGeek since 2010s : ✈️🏢🏢. Think of the movie and guess the lead actor, not only he was famous in india for acting but for his songs too, one of his such song by coke studios blew up in india largely in 2010s, tell the song name.",
    image: "",
    hint: "This Pakistani actor/singer appeared in 'Tere Bin Laden'. His Coke Studio hit is also the name of a character in a movie.",
    answer: "ROCKSTAR"
  }),
  q({
    id: "m4",
    segmentId: "indian-movies",
    title: "Gore & Spirituality",
    prompt: "This movie came from a director ,who mentions danny boyle as an inspiration for his direction style, the movie revolves around a character who initially was an honest, humble and poor but later his generations become a known name in gangsta business for revenge. This movie actually started the gore action in indian films which was considered a taboo till then and with this movie giving in india such action kept leading other directors to show even more gore action scenes leading to movies like - animal and toxic. This movie also has a dedicated cult fanbase but not niche at all. Coming back to the director, director comes from a city well known for it’s spirituality reasons. Tell the name of that city. ( Hint : someone famous as vin diesel of india is also associated with this city. )",
    image: "",
    hint: "A city in Uttar Pradesh near the Nepal border, birthplace of Anurag Kashyap.",
    answer: "GORAKHPUR"
  }),
  q({
    id: "m5",
    segmentId: "indian-movies",
    title: "Bridge to Reality",
    prompt: "This movie stars an actor who was well known for successfully bridging bollywood and hollywood in late 2000s. A funny movie wrapping up the dark and sad truths about life, connecting an IT employee with the harsh life and society. What starts with a sad death turns into something funny but still forces us to ponder upon a lot of things we’ve been learning since childhood and questioning are societal teachings and morals. Not only this movie tells us a lot about self discovery but also became a memorable work for the late actor we mentioned in the beginning. But other than that it also was a debut movie for one other actor who has been able to make a name for himself now till 2026, Name that debut actor in this movie.",
    image: "",
    hint: "The late actor is Irrfan Khan. The debutant is a superstar from the Malayalam industry.",
    answer: "DULQUER SALMAAN"
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

