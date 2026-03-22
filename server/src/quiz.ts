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
  q({
    id: "m6",
    segmentId: "indian-movies",
    title: "Go Goa Gone",
    prompt: "This movie flopped on box office but with time people especially the youth of india started to like this movie eventually. It stars a famous actor X, one other actor Y in this movie is married to the sister of X in real life, another actor is a stand up comedian who came into controversy during lockdown period for mocking india’s behaviour on women and duality of indian society. This movie was first indian movie of it’s genre, the genre was a combination of 2 genres, after this some other movies were also made in this genre and got love from people. These emojis are enough hints for you to guess: car + island + party + zombie. Now tell the name of the sister of X who is married to Y, she also did a cameo in the movie for a couple of minutes.",
    image: "",
    hint: "X is Saif Ali Khan, and Y is Kunal Khemu.",
    answer: "SOHA ALI KHAN"
  }),
  q({
    id: "m7",
    segmentId: "indian-movies",
    title: "Bunny to Brahmastra",
    prompt: "This movie is definitely in top 5 movies list of almost every 2010s kid, it introduced us to a character which inspired literally almost all of us to travel and explore the world. Hint: open eyes plus bunny. The director of this movie also directed one of the most expensive and VFX heavy movies in india around early 2020s. That later movie became profitable only after selling rights and everything, but on box office it was not able to recover its budget and got mixed reviews. Hint: fire plus trident. Tell the name of this director.",
    image: "",
    hint: "Think 'Yeh Jawaani Hai Deewani' and 'Brahmastra'.",
    answer: "AYAN MUKERJI"
  }),
  q({
    id: "m8",
    segmentId: "indian-movies",
    title: "Super Chor",
    prompt: "A 2000s movie inspired from a real life super chor gave us a social commentary on how a kid’s upbringing, traumas and little incidents can shape him as a human in future. On one side where in india we believe parents are a form of god, this film also shows that they are also humans who make mistakes and sometimes mess up their kids upbringing. The phrase super chor is enough to guess the movie if you have seen good 2000s films. The lead actor is often known for complex and offbeat roles. Tell the name of the lead character.",
    image: "",
    hint: "The film is 'Oye Lucky! Lucky Oye!'.",
    answer: "LUCKY"
  }),
  q({
    id: "m9",
    segmentId: "indian-movies",
    title: "Resistance in Red",
    prompt: "A movie released in mid 2010s drew attention towards how gender equality is the need of the hour in our country. It received backlash from so called men’s rights activists, and even the censor board made many cuts that the director opposed because those scenes were imagery of the society we live in. When premiered overseas without cuts, it got recognition for the issue it raised and won two major film awards. The storyline revolved around resistance against patriarchal norms, female desire and autonomy. Name the movie. Little hint: lipstick.",
    image: "",
    hint: "The title includes both a cosmetic item and a garment associated with modesty.",
    answer: "LIPSTICK UNDER MY BURKHA"
  }),
  q({
    id: "m10",
    segmentId: "indian-movies",
    title: "Silent Franchise",
    prompt: "This mid 2000s cult classic comedy birthed one of Bollywood's longest-running franchises. It revolves around four useless college-expelled friends who con their way into a bungalow by pretending to be related to the owners. One of the most iconic characters in the group cannot speak and communicates entirely in hilarious high-pitched grunts. Hint: speaking plus silent, blind man plus old woman. The director later became synonymous with defying gravity and blowing up SUVs, creating India's biggest cop action stunts. Hint: police car plus explosion plus lion. Tell the name of this comedy movie.",
    image: "",
    hint: "Directed by Rohit Shetty before the cop-universe era.",
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

Each house has:
- a color
- a resident nationality
- a favorite drink
- a pet
- a musical instrument

Each category has exactly one of each:

| Category | Options |
| --- | --- |
| **Colors** | Red, Blue, Green, Yellow, White |
| **Nationalities** | Indian, Japanese, German, Brazilian, Norwegian |
| **Drinks** | Tea, Coffee, Milk, Juice, Water |
| **Pets** | Dog, Cat, Parrot, Rabbit, Turtle |
| **Instruments** | Piano, Violin, Guitar, Drums, Flute |

No two houses share any item from a category.

🧩 **Clues**

1. The Norwegian lives in the first house.
2. The green house is immediately to the right of the white house.
3. The person who drinks coffee lives in the green house.
4. The German plays the piano.
5. The yellow house resident plays the drums.
6. The Brazilian keeps a dog.
7. The center house (3) drinks milk.
8. The violin player lives next to the cat owner.
9. The Japanese plays the flute.
10. The blue house is next to the Norwegian.
11. The guitar player drinks juice.
12. The rabbit owner lives next to the drum player.
13. The parrot owner drinks tea.
14. The Brazilian lives next to the rabbit owner.
15. The water drinker lives next to the flute player.
16. The cat owner lives in the red house.
17. The violin player lives in the white house.
18. The Indian lives somewhere to the right of the red house.

**Questions**

**1. Who owns the turtle?**

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

_"On the farm there are 30 cows. 28 chickens."_

Later that evening, while reviewing the note, the farmer suddenly realizes something odd and asks his assistant a question:

**"If there are 30 cows on the farm and 28 chickens, how many didn't?"**

The assistant looks confused because the farmer insists the answer is very simple.

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

**The operatives are:**
- Agent Orion
- Agent Vega
- Agent Nova

Intelligence reports indicate that each agent was stationed at exactly one of three secret facilities:
- Area 51 Research Base
- Hawkins National Laboratory
- Black Mesa Containment Facility

Each facility has exactly one agent.

However, interrogation is difficult because of their unusual communication behavior:
- One agent always tells the truth.
- One agent always lies.
- One agent alternates between truth and lies (in any order).

When investigators asked each agent:
_"Which facility are you stationed at?"_

each agent gave two statements.

🗣️ **Agent Statements**

**Agent Orion**
- "I am stationed at Area 51."
- "Agent Vega is stationed at Hawkins Laboratory."

**Agent Vega**
- "I am stationed at Area 51."
- "Agent Nova is stationed at Black Mesa."

**Agent Nova**
- "Agent Orion is stationed at Hawkins Laboratory."
- "Agent Vega is stationed at Area 51."

**Question**
Based on the information above:
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

When reporters asked how, he refused to explain directly. Instead he told a story.

_"Think of letters like players on a pitch.
 Some are strikers who push the score up.
 Others are defenders who drag the score down."_

To demonstrate, he showed a few examples on a tactics board.

**CHELSEA** → 700 km away  
**ARSENAL** → 700 km away  
**BARCELONA** → 1000km away  
**WOLVES** → 200 km away  

A journalist from FC Barcelona rolled his eyes.
_"Those numbers look completely random."_

The analyst shrugged and continued his explanation:
_"My strikers are special. There are five of them. Each forward scores the same amount as half a millennium on the scoreboard."_

He then pointed at the rest of the alphabet.
_"Everyone else plays defence. Each defender clears the ball away by exactly two centuries."_

The Barcelona journalist stared at the board for a while, counted the letters, and finally said:
_"Wait... then your system should give a value for REALMADRID as well."_

**Question**

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

_"Pretend the Starcourt Mall entrance is the center of the map. Everything that happened that night can be traced from there."_

The fireworks were already lighting up the sky, the carnival music was blasting, and people were running everywhere after the chaos in the underground lab.

Dustin begins recalling where everyone went.

**Eleven** had just finished fighting the creature from the Upside Down. Exhausted but determined, she moved four blocks north toward the rides, then three blocks east toward the food stalls, before turning two blocks south after hearing Mike shout her name. Finally she drifted one block west to regroup with the others.

**Mike**, who had been frantically searching through the crowd, first ran two blocks west, then pushed five blocks north toward the fireworks stage. Spotting familiar faces, he cut three blocks east, before slowing down one block south when things started to calm down.

**Will**, still feeling that strange connection to the Upside Down, kept glancing around nervously. He wandered three blocks south through the carnival booths, then crossed four blocks east past the games, before realizing the others were nearby and stepping two blocks north.

**Alexei** had been smiling like a kid at the fair. Slurpee in one hand, a huge grin on his face after finally winning that stuffed Woody Woodpecker toy. Dustin remembers him wandering one block north toward the shooting game, then two blocks east toward the prize counter, before drifting one block south as the fireworks started. He took a final small step one block east, still holding the toy and watching the sky light up.

Meanwhile **Hopper**, covered in dust from the underground chaos, stormed through the fair looking for Joyce and the kids. He marched six blocks south toward the parking lot, then doubled back two blocks west, corrected himself one block north, and finally stepped one block east when he realized he'd gone too far.

**Dustin** himself had been near the game stalls. He drifted three blocks east, walked two blocks north toward the giant Ferris wheel, then lazily stepped one block west and one block south, claiming he was "strategically observing the situation."

**Final Question**

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

The building had already closed to the public. Only five researchers remained inside the observatory complex that night.

Investigators confirmed that exactly one of them entered the control room between **9:10 PM** and **9:30 PM**, when the murder occurred.

**People**
- Aarav
- Sofia
- Lukas
- Mei
- Daniel

Each person had:
- a location in the building
- an item they carried
- a reason they had been meeting Dr. Mehta earlier that week
- a hallway sighting time

No two people share the same item, location, motive, or time.

**Locations**
- Telescope Dome
- Data Lab
- Archive Room
- Control Room Corridor
- Equipment Storage

**Items**
- Notebook
- Keycard
- Flash Drive
- Gloves
- Laser Pointer

**Motives**
- Funding dispute
- Telescope access request
- Data authorship conflict
- Equipment damage report
- Internship recommendation

**Hallway sightings**
- 9:00 PM
- 9:10 PM
- 9:15 PM
- 9:25 PM
- 9:35 PM

**Investigator Notes**
1. The person seen at 9:00 PM had come from the Archive Room.
2. Mei was seen later than Lukas.
3. The Flash Drive carrier appeared immediately before the person from Equipment Storage.
4. The Notebook owner had requested the internship recommendation.
5. The person from the Telescope Dome appeared sometime after Aarav.
6. Sofia was not seen at 9:15 PM.
7. The Gloves carrier was seen exactly 10 minutes after the person from the Data Lab.
8. The Keycard owner appeared earlier than Daniel.
9. The Equipment damage report belonged to the person from Equipment Storage.
10. Lukas did not carry the Flash Drive.
11. The person seen at 9:35 PM had been in the Control Room Corridor.
12. The Flash Drive carrier had the data authorship conflict with Dr. Mehta.
13. The person seen at 9:25 PM had come from the Telescope Dome.
14. Aarav was not in the Archive Room.
15. The funding dispute belonged to Daniel.
16. The Flash Drive carrier was seen later than Sofia.
17. Aarav was seen at 9:10 PM.

**Critical Evidence**
Inside the control room investigators found a dropped **Flash Drive**. Security analysis confirmed:
_The person carrying the Flash Drive must have entered the control room before leaving the building._

**Who is the murderer?**`,
    image: "",
    hint: "No hints in the Logic segment.",
    answer: "MEI"
  }),
  q({
    id: "l7",
    segmentId: "logic",
    title: "Keypad Code",
    prompt: `A secure laboratory door uses a 5-digit keypad.
Each digit is distinct (0–9).

After several failed attempts, the system logs show:

| Attempt | Feedback |
| --- | --- |
| **91347** | Two digits correct but both in wrong positions |
| **48215** | One digit correct and in the correct position |
| **76024** | Two digits correct, one in the right place |
| **41890** | None of the digits appear in the code |
| **50731** | Three digits correct but all in wrong positions |

All feedback is exact.

**Question**

**What is the 5-digit access code?**`,
    image: "",
    hint: "No hints in the Logic segment.",
    answer: "73142"
  }),
  q({
    id: "l8",
    segmentId: "logic",
    title: "Thinking Machine",
    prompt: `In the hall of letters there should be twenty-six seats,
yet tonight one chair sits empty.

The guard of the gate, shaped like a hammer, never arrived,
so the hall closed with only twenty-five inside.

Find the square where the alphabet gathers in rows and columns, and follow these footsteps:

- 3,4
- 1,4
- 5,5
- 4,2
- 1,1
- 3,1

When you stand where the numbers point, six letters will greet you.

They whisper the name of the thinking machine.`,
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
