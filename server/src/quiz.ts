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
    id: "technology",
    name: "NON - TECHNICAL TECH",
    description: "The technical segment"
  },
  {
    id: "indian-movies",
    name: "Movies",
    description: "Bollywood & beyond."
  },
  {
    id: "logic",
    name: "Logic",
    description: "Patterns, deduction, and misdirection."
  }
];

export const RANDOM_SEGMENT_SIZES: Record<string, number> = {
  general: 5,
  technology: 5,
  "indian-movies": 5,
  logic: 5
};

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
    prompt: "After making this seriously inspiring movie, the director of this movie made a comedy drama movie later on, having a bunch of engineering students bringing back the nostalgia of their college lives. The previously mentioned movie not only inspired but also removed the veil from some bad societal regimes and unfair practices in our country against a particular group of people. These emojis can tell you a lot about the movie : 🫃 + 👧 + 💇‍♀️ + 🎖️. What is the last name of the person associated with the movie’s original inspiration?",
    image: "",
    hint: "Think of the surname of the sisters who inspired the wrestling biopic.",
    answer: "PHOGAT"
  }),
  q({
    id: "m2",
    segmentId: "indian-movies",
    title: "The Cannes Phase",
    prompt: "An emotion or a phase in life that we all never wanna experience voluntarily, still we all experience it nonetheless. However, after that phase or emotional state is over and we actually experience anything good, it makes us cherish that good time. The word for that emotion was used in a movie dialogue popularising a meme that translates to “Why doesn’t this phase end?” Sadly this movie didn’t gross a lot in India, but after getting recognised at Cannes, it did make some profit from overseas premiers. It still remains in the hearts of a niche cult audience. Tell which actor made his debut through this movie.",
    image: "",
    hint: "The movie title translates to a state of 'Masaan' (cremation ground).",
    answer: "VICKY KAUSHAL"
  }),
  q({
    id: "m3",
    segmentId: "indian-movies",
    title: "Bolly Satire",
    prompt: "In the world of parody or satire movies, Bollywood kind of lags behind as compared to other movie industries, But with this movie, we actually bared our guts. Even till now stand up comedians hold back before making a joke regarding this unfortunate incident but this Indian movie didn’t hold back. Not only did they make a satire of the whole incident but also shed light on a conspiracy against American government that no one was talking about. These emojis can tell you everything about the movie if you are actually a BollyGeek since 2010s : ✈️🏢🏢. Think of the movie and the lead actor, not only was he famous in India for acting but for his songs too, one of his songs by Coke Studios blew up in India largely in the 2010s. Tell the name of the song.",
    image: "",
    hint: "This Pakistani actor/singer appeared in 'Tere Bin Laden'. His Coke Studio hit is also the name of a character in a movie.",
    answer: "ROCKSTAR"
  }),
  q({
    id: "m4",
    segmentId: "indian-movies",
    title: "Gore & Spirituality",
    prompt: "This movie came from a director, who mentions Danny Boyle as an inspiration for his direction style. The movie revolves around a character who initially was honest, humble and poor but later his generations become a known name in a gangster business for revenge. This movie actually started the gore action genre in Indian films which was considered a taboo till then. This movie gave Indian cinema and Indian directors a sense of direction to show even more gore action scenes leading to movies like - Animal and Toxic. This movie also has a dedicated cult fanbase but not a niche at all. Coming back to the director, the director comes from a city well known for its spirituality reasons. Tell the name of that city.",
    image: "",
    hint: "Someone famous as Vin Diesel of India is also associated with this city.",
    answer: "GORAKHPUR"
  }),
  q({
    id: "m5",
    segmentId: "indian-movies",
    title: "Bridge to Reality",
    prompt: "This movie stars an actor who was well known for successfully bridging Bollywood and Hollywood in late 2000s. A funny movie wrapping up the dark and sad truths about life, connecting an IT employee with the harsh life and society. What starts with a sad death turns into something funny but still forces us to ponder upon a lot of things we’ve been learning since childhood and questioning our societal teachings and morals. Not only this movie tells us a lot about self discovery but also became a memorable work for the late actor we mentioned in the beginning. But other than that, it also was a debut movie for one other actor who has been able to make a name for himself now till 2026. Name that debut actor in this movie.",
    image: "",
    hint: "The late actor is Irrfan Khan. The debutant is a superstar from the Malayalam industry.",
    answer: "DULQUER SALMAAN"
  }),
  q({
    id: "m6",
    segmentId: "indian-movies",
    title: "Go Going Gone",
    prompt: "This movie flopped at the box office but with time, people, especially the youth of India started to like this movie eventually. It stars a famous actor ‘X’, one other actor ‘Y’ in this movie is married to the sister of ‘X’ in real life. Another actor is a stand up comedian who came into controversy during the lockdown period for mocking India's behaviour on women and duality of Indian society. This movie was the first Indian movie of its genre. The main genre was a combination of 2 sub genres. Soon after this some other movies were also made in this genre and got love from people. These emojis are enough hints for you to guess : 🚗🏝️🥳🧟 Now you have to tell the name of the sister of ‘X’ who is married to ‘Y’ She also had a small cameo role in the movie for a couple of minutes.",
    image: "",
    hint: "X is Saif Ali Khan, and Y is Kunal Khemu.",
    answer: "SOHA ALI KHAN"
  }),
  q({
    id: "m7",
    segmentId: "indian-movies",
    title: "Bunny to Brahmastra",
    prompt: "This movie is definitely in top 5 movies list of almost every 2010s kid, it introduced us to a character which inspired literally almost all of us to travel and explore the world. The director of this movie also directed one of the most expensive and VFX heavy movies in India around the early 2020s. This movie became profitable only after selling its rights and everything. On box office it wasn’t able to recover its budget and got mixed reviews",
    image: "",
    hint: "👀🐰, 🔥🔱",
    answer: "AYAN MUKERJI"
  }),
  q({
    id: "m8",
    segmentId: "indian-movies",
    title: "Super Chor",
    prompt: "A 2000s movie, inspired from a real life “super chor”, that gave us a social commentary on how a kid’s upbringing, his traumas and little incidents can shape him as a human in future which was done in Hindi films before that. On one side where in India we believe that parents are a form of god, this film also shows the side that they are also humans ultimately who also make mistakes and sometimes they think they are always right. They can mess up their kids' upbringing. The word “super chor” is enough to guess the movie. If you’ve actually seen good 2000s movies, you'll get it. The lead actor of this movie is often known for his complex and offbeat roles in a lot of movies. Tell the name of the lead character.",
    image: "",
    hint: "The film is 'Oye Lucky! Lucky Oye!'.",
    answer: "LUCKY"
  }),
  q({
    id: "m9",
    segmentId: "indian-movies",
    title: "Resistance in Red",
    prompt: "A movie released in the mid 2010s drew attention towards how gender equality is the need of the hour in our country. This movie, however, received a lot of backlash from so-called men's rights activists but also our censor board made cuts in this movie, which the director was not happy about. According to the director, those scenes were also an imagery of the society we live in. But when it premiered overseas, without any cuts, not only did it get the credit due for the issues it raised but also won 2 major film awards. The film’s major storyline revolved around resistance against patriarchal norms, female desire and autonomy. Name the movie.",
    image: "",
    hint: " 💄",
    answer: "LIPSTICK UNDER MY BURKHA"
  }),
  q({
    id: "m10",
    segmentId: "indian-movies",
    title: "Silent Franchise",
    prompt: "This mid 2000s cult classic comedy birthed one of Bollywood's longest-running franchises. It revolves around four absolutely useless, college-expelled friends who con their way into a bungalow by pretending to be related to the owners. One of the most iconic characters in the group cannot speak and communicate entirely in hilarious, high-pitched grunts. The director of this film later became literally synonymous with defying gravity and blowing up SUVs, eventually creating India's most massive and explosive Cop action stunts, usually stepping out of spinning cars. ",
    image: "",
    hint: "🗣️🔇 👨‍🦯👵, 🚓💥🦁",
    answer: "GOLMAAL"
  }),

  // Technology (NON - TECHNICAL TECH)
  q({
    id: "t1",
    segmentId: "technology",
    title: "The Digital Staircase",
    prompt: "You are walking up a digital staircase.\nStep 1 is 1cm high.\nStep 2 is 2cm high.\nStep 3 is 4cm high.\nEach step is double the height of the last. There are 64 steps total.\nBy the time you reach the final step, where are you located? (One word).",
    image: "",
    hint: "The Twist: 2^64 centimeters is roughly 1.8 light-years. You aren't just out of the building; you've left the Solar System.",
    answer: "SPACE"
  }),
  q({
    id: "t2",
    segmentId: "technology",
    title: "The Perfect AI",
    prompt: "You have a perfect AI that can predict your next move with 100% accuracy. You are placed in a room with this AI screen & two buttons: Red and Blue. The AI predicts you will pick Red and writes it on a screen. You see the screen.\nQuestion: To prove the AI is \"Wrong,\" you must pick Blue. But if the AI already knew you would try to prove it wrong, it would have written Blue. What will you pick to outsmart this AI?",
    image: "",
    hint: "",
    answer: "SCREEN"
  }),
  q({
    id: "t3",
    segmentId: "technology",
    title: "The Makeup Room",
    prompt: "You are stuck in a unisex makeup room with a camera that uses \"AI Facial Recognition\" to keep the door locked. The camera is trained to only unlock for \"The Architect.\" There is a photo of the Architect on the wall, but when you hold it up to the camera, it says \"Liveness Detection Failed - Subject is a 2D Image.\"\nHow do you trick the camera using only what is in the room?",
    image: "",
    hint: "",
    answer: "MIRROR"
  }),
  q({
    id: "t4",
    segmentId: "technology",
    title: "The Security Robot",
    prompt: "A security robot is programmed with a single, unbreakable command: \"If a human moves towards me, I must move toward them. If a human stands still, I must stand still.\" The robot is blocking the only exit. If you touch or harm the robot, it will blast like a dynamite.\nWhat's your move to get past the robot to the door alive?",
    image: "",
    hint: "",
    answer: "BACKWARDS"
  }),
  q({
    id: "t5",
    segmentId: "technology",
    title: "The Logic Box",
    prompt: "You find a locked box. To open it, you need a key that is \"The result of 1+1, but it is not 2.\" You realize the box is running on computer logic.\nWhat is the one-word numerical answer that opens the box?",
    image: "",
    hint: "",
    answer: "TEN"
  }),
  q({
    id: "t6",
    segmentId: "technology",
    title: "Light Speed Processor",
    prompt: "You are designing a processor that moves data at the speed of light. You realize that even at the speed of light, it takes too long for a signal to travel from one side of the chip to the other. You need the data to be at the destination before it is sent.\nThe Question is what \"part\" of the computer allows it to \"guess\" the future so it doesn't have to wait for the light to arrive?",
    image: "",
    hint: "",
    answer: "CACHE"
  }),
  q({
    id: "t7",
    segmentId: "technology",
    title: "The Smart Lock",
    prompt: "You are in a high-security server room with a \"Smart Lock\" door that requires a 64-digit code. The keyboard is broken, the screen is shattered, and the backup generator is dead. There is no way to enter the code. A sign on a digi-board says: \"In the event of total system failure, all systems default to their natural state.\"\nHow do you escape the room? (Hint: The door might not be locked anymore)",
    image: "",
    hint: "",
    answer: "PULL"
  }),
  q({
    id: "t8",
    segmentId: "technology",
    title: "The Hidden Key",
    prompt: "A hacker has encrypted your entire life. He tells you: \"I have hidden the decryption key in a file named SECRET.txt. I have placed this file in a folder, inside a folder, inside a folder, repeating 1,000 times. You have 100 seconds to unlock it & escape. You will never click deep enough to find it before the timer hits zero.\"\nHow do you find the key in one second?",
    image: "",
    hint: "",
    answer: "SEARCH"
  }),
  q({
    id: "t9",
    segmentId: "technology",
    title: "The Void",
    prompt: "The Setup: A voice over the intercom says: \"To leave, you must give me nothing. Not a word, not a silence, not a breath. Give me the value of the void.\" There is a keypad with numbers 0-9 and an 'Enter' key.\nThe Question: What do you press?",
    image: "",
    hint: "",
    answer: "ENTER"
  }),

  // Logic - 8 questions for random pool
  q({
    id: "l1",
    segmentId: "logic",
    title: "The Turtle Owner",
    prompt: `Five houses stand in a row from left to right (1–5).
\n
Each house has:\n
- a color\n
- a resident nationality\n
- a favorite drink\n
- a pet\n
- a musical instrument\n
\n
Each category has exactly one of each:\n

| Category | Options |\n
| --- | --- |\n
| **Colors** | Red, Blue, Green, Yellow, White |\n
| **Nationalities** | Indian, Japanese, German, Brazilian, Norwegian |\n
| **Drinks** | Tea, Coffee, Milk, Juice, Water |\n
| **Pets** | Dog, Cat, Parrot, Rabbit, Turtle |\n
| **Instruments** | Piano, Violin, Guitar, Drums, Flute |\n
\n
No two houses share any item from a category.\n

🧩 **Clues**\n

1. The Norwegian lives in the first house.\n
2. The green house is immediately to the right of the white house.\n
3. The person who drinks coffee lives in the green house.\n
4. The German plays the piano.\n
5. The yellow house resident plays the drums.\n
6. The Brazilian keeps a dog.\n
7. The center house (3) drinks milk.\n
8. The violin player lives next to the cat owner.\n
9. The Japanese plays the flute.\n
10. The blue house is next to the Norwegian.\n
11. The guitar player drinks juice.\n
12. The rabbit owner lives next to the drum player.\n
13. The parrot owner drinks tea.\n
14. The Brazilian lives next to the rabbit owner.\n
15. The water drinker lives next to the flute player.\n
16. The cat owner lives in the red house.\n
17. The violin player lives in the white house.\n
18. The Indian lives somewhere to the right of the red house.\n
\n
**Questions**\n

**1. Who owns the turtle?**\n
\n
There is exactly one valid solution if the clues are followed correctly.`,
    image: "",
    hint: "No hints in the Logic segment.",
    answer: "GERMAN"
  }),
  q({
    id: "l2",
    segmentId: "logic",
    title: "How Many Didn't",
    prompt: `A farmer is checking his animals at the end of the day. While standing by the fence, he writes a quick note in his logbook:
\n
_"On the farm there are 30 cows. 28 chickens."_
\n
Later that evening, while reviewing the note, the farmer suddenly realizes something odd and asks his assistant a question:
\n
**"If there are 30 cows on the farm and 28 chickens, how many didn't?"**
\n
The assistant looks confused because the farmer insists the answer is very simple.
\n
How many didn't?`,
    image: "",
    hint: "No hints in the Logic segment.",
    answer: "10"
  }),
  q({
    id: "l3",
    segmentId: "logic",
    title: "Sector-7 Assignment",
    prompt: `During an investigation into a classified extraterrestrial breach, three field operatives were detained at a hidden research bunker known as Sector-7.
\n
**The operatives are:**
\n
- Agent Oreo\n
- Agent Vega\n
- Agent Nova\n
\n
Intelligence reports indicate that each agent was stationed at exactly one of three secret facilities:
\n
- Area 51 Research Base\n
- Hawkins National Laboratory\n
- Black Mesa Containment Facility\n
\n
Each facility has exactly one agent.\n

However, interrogation is difficult because of their unusual communication behavior:\n
- One agent always tells the truth.\n
- One agent always lies.\n
- One agent alternates between truth and lies (in any order).\n
\n
When investigators asked each agent:\n
_"Which facility are you stationed at?"_\n
each agent gave two statements.\n
🗣️ **Agent Statements**\n
**Agent Oreo**\n
- "I am stationed at Area 51."\n
- "Agent Vega is stationed at Hawkins Laboratory."\n
**Agent Vega**\n
- "I am stationed at Area 51."\n
- "Agent Nova is stationed at Black Mesa."\n
**Agent Nova**\n
- "Agent Oreo is stationed at Hawkins Laboratory."\n
- "Agent Vega is stationed at Area 51."\n
\n
**Question**\n
Based on the information above:\n
**Which agent must be stationed at the Black Mesa Containment Facility?**`,
    image: "",
    hint: "No hints in the Logic segment.",
    answer: "NOVA"
  }),
  q({
    id: "l4",
    segmentId: "logic",
    title: "Strikers and Defenders",
    prompt: `A slightly eccentric football analyst once claimed he could calculate the "distance" between clubs using nothing but their names.
\n
When reporters asked how, he refused to explain directly. Instead he told a story.\n
\n
_"Think of letters like players on a pitch.\n
 Some are strikers who push the score up.\n
 Others are defenders who drag the score down."_\n
To demonstrate, he showed a few examples on a tactics board.\n
**CHELSEA** → 700 km away  \n
**ARSENAL** → 700 km away  \n
**BARCELONA** → 1000km away  \n
**WOLVES** → 200 km away  \n

A journalist from FC Barcelona rolled his eyes.\n
_"Those numbers look completely random."_\n
The analyst shrugged and continued his explanation:\n
_"My strikers are special. There are five of them. Each forward scores the same amount as half a millennium on the scoreboard."_\n

He then pointed at the rest of the alphabet.\n
_"Everyone else plays defence. Each defender clears the ball away by exactly two centuries."_\n

The Barcelona journalist stared at the board for a while, counted the letters, and finally said:\n
_"Wait... then your system should give a value for REALMADRID as well."_\n

**Question**\n
**Using the analyst's strange rule, how far away should REALMADRID be from Manchester United?**`,
    image: "",
    hint: "No hints in the Logic segment.",
    answer: "800KM"
  }),
  q({
    id: "l5",
    segmentId: "logic",
    title: "Where Is Smirnoff",
    prompt: `Months after the Starcourt Mall disaster, Dustin insists he can still remember exactly how everyone moved through the crowded fairgrounds that night. To prove it, he draws a grid on a piece of paper and says:
\n
_"Pretend the Starcourt Mall entrance is the center of the map. Everything that happened that night can be traced from there."_
\n
The fireworks were already lighting up the sky, the carnival music was blasting, and people were running everywhere after the chaos in the underground lab.
\n
Dustin begins recalling where everyone went.
\n
**Eleven** had just finished fighting the creature from the Upside Down. Exhausted but determined, she moved four blocks north toward the rides, then three blocks east toward the food stalls, before turning two blocks south after hearing Mike shout her name. Finally she drifted one block west to regroup with the others.
\n
**Mike**, who had been frantically searching through the crowd, first ran two blocks west, then pushed five blocks north toward the fireworks stage. Spotting familiar faces, he cut three blocks east, before slowing down one block south when things started to calm down.
\n
**Will**, still feeling that strange connection to the Upside Down, kept glancing around nervously. He wandered three blocks south through the carnival booths, then crossed four blocks east past the games, before realizing the others were nearby and stepping two blocks north.
\n
**Alexei** had been smiling like a kid at the fair. Slurpee in one hand, a huge grin on his face after finally winning that stuffed Woody Woodpecker toy. Dustin remembers him wandering one block north toward the shooting game, then two blocks east toward the prize counter, before drifting one block south as the fireworks started. He took a final small step one block east, still holding the toy and watching the sky light up.
\n
Meanwhile **Hopper**, covered in dust from the underground chaos, stormed through the fair looking for Joyce and the kids. He marched six blocks south toward the parking lot, then doubled back two blocks west, corrected himself one block north, and finally stepped one block east when he realized he'd gone too far.
\n
**Dustin** himself had been near the game stalls. He drifted three blocks east, walked two blocks north toward the giant Ferris wheel, then lazily stepped one block west and one block south, claiming he was "strategically observing the situation."
\n
**Final Question**
\n
**Where is Smirnoff now?**`,
    image: "",
    hint: "No hints in the Logic segment.",
    answer: "DEAD"
  }),
  q({
    id: "l6",
    segmentId: "logic",
    title: "Observatory Murder",
    prompt: `**(MURDER MYSTERY)** At 9:40 PM, Dr. Mehta, a renowned astronomer, was found dead inside the observatory control room.
\n
The building had already closed to the public. Only five researchers remained inside the observatory complex that night.
\n
Investigators confirmed that exactly one of them entered the control room between **9:10 PM** and **9:30 PM**, when the murder occurred.
\n
**People**\n
- Aarav\n
- Sofia\n
- Lukas\n
- Mei\n
- Daniel\n
\n
Each person had:\n
- a location in the building\n
- an item they carried\n
- a reason they had been meeting Dr. Mehta earlier that week\n
- a hallway sighting time\n
\n
No two people share the same item, location, motive, or time.\n

**Locations**\n
- Telescope Dome\n
- Data Lab\n
- Archive Room\n
- Control Room Corridor\n
- Equipment Storage\n

**Items**\n
- Notebook\n
- Keycard\n
- Flash Drive\n
- Gloves\n
- Laser Pointer\n

**Motives**\n
- Funding dispute\n
- Telescope access request\n
- Data authorship conflict\n
- Equipment damage report\n
- Internship recommendation\n

**Hallway sightings**\n
- 9:00 PM\n
- 9:10 PM\n
- 9:15 PM\n
- 9:25 PM\n
- 9:35 PM\n

**Investigator Notes**\n
1. The person seen at 9:00 PM had come from the Archive Room.\n
2. Mei was seen later than Lukas.\n
3. The Flash Drive carrier appeared immediately before the person from Equipment Storage.\n
4. The Notebook owner had requested the internship recommendation.\n
5. The person from the Telescope Dome appeared sometime after Aarav.\n
6. Sofia was not seen at 9:15 PM.\n
7. The Gloves carrier was seen exactly 10 minutes after the person from the Data Lab.\n
8. The Keycard owner appeared earlier than Daniel.\n
9. The Equipment damage report belonged to the person from Equipment Storage.\n
10. Lukas did not carry the Flash Drive.\n
11. The person seen at 9:35 PM had been in the Control Room Corridor.\n
12. The Flash Drive carrier had the data authorship conflict with Dr. Mehta.\n
13. The person seen at 9:25 PM had come from the Telescope Dome.\n
14. Aarav was not in the Archive Room.\n
15. The funding dispute belonged to Daniel.\n
16. The Flash Drive carrier was seen later than Sofia.\n
17. Aarav was seen at 9:10 PM.\n
**Critical Evidence**\n
Inside the control room investigators found a dropped **Flash Drive**. Security analysis confirmed:\n
_The person carrying the Flash Drive must have entered the control room before leaving the building._\n

**Who is the murderer?**`,
    image: "",
    hint: "No hints in the Logic segment.",
    answer: "MEI"
  }),
  q({
    id: "l7",
    segmentId: "logic",
    title: "Keypad Code",
    prompt: `A secure laboratory door uses a 5-digit keypad.\n
Each digit is distinct (0–9).\n
After several failed attempts, the system logs show:\n
| Attempt | Feedback |\n
| --- | --- |\n
| **91347** | Two digits correct but both in wrong positions |\n
| **48215** | One digit correct and in the correct position |\n
| **76024** | Two digits correct, one in the right place |\n
| **41890** | None of the digits appear in the code |\n
| **50731** | Three digits correct but all in wrong positions |\n
All feedback is exact.\n
**Question**\n
**What is the 5-digit access code?**`,
    image: "",
    hint: "No hints in the Logic segment.",
    answer: "73142"
  }),
  q({
    id: "l8",
    segmentId: "logic",
    title: "Thinking Machine",
    prompt: `In the hall of letters there should be twenty-six seats,\n
yet tonight one chair sits empty.\n
The guard of the gate, shaped like a hammer, never arrived,\n
so the hall closed with only twenty-five inside.\n
\n
Find the square where the alphabet gathers in rows and columns, and follow these footsteps:\n
- 3,4\n
- 1,4\n
- 5,5\n
- 4,2\n
- 1,1\n
- 3,1\n
When you stand where the numbers point, six letters will greet you.\n
They whisper the name of the thinking machine.\n`,
    image: "",
    hint: "No hints in the Logic segment.",
    answer: "NEURAL"
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
