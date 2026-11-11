export type PilotStatus = "Active" | "In development" | "Coming soon";

/** Rich-text blocks a pilot story page can be built from. */
export type StoryBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[] }
  | { type: "numbered"; items: string[] }
  | { type: "pathway"; steps: string[] }
  | { type: "table"; caption?: string; columns: string[]; rows: string[][] }
  | { type: "media"; items: Media[] };

export type Media = {
  kind: "image" | "video";
  src: string;
  /** Poster still for videos. */
  poster?: string;
  alt: string;
  caption?: string;
  aspect: "landscape" | "portrait" | "square" | "wide" | "tall";
};

export type PilotStory = {
  /** Headline of the blog entry. */
  title: string;
  tag: string;
  /** Human-readable date shown to readers. */
  date: string;
  /** Machine-readable date for <time dateTime>. */
  dateTime: string;
  readingTime: string;
  location: string;
  /** Standfirst paragraph under the title. */
  lead: string;
  hero: Media;
  facts: { label: string; value: string }[];
  blocks: StoryBlock[];
};

export type Pilot = {
  slug: string;
  name: string;
  country: string;
  status: PilotStatus;
  /** Card summary on the pilots index. */
  body: string;
  /** Present when the pilot has a full story page at /pilots/[slug]. */
  story?: PilotStory;
};

const UG = "/pilots/uganda-banana-fibre";

const bananaFibreStory: PilotStory = {
  title: "Banana fibre, a ball, and every small response that counted",
  tag: "Field note",
  date: "12 August 2026",
  dateTime: "2026-08-12",
  readingTime: "6 min read",
  location: "Special needs centre, Greater Kampala, Uganda",
  lead: "Forty minutes in a school compound with banana fibre, a ball and a group of learners with high support needs — and a lasting lesson about what participation really looks like.",
  hero: {
    kind: "image",
    src: `${UG}/group-holding-creations.jpg`,
    alt: "Learners, teachers and Sankofa volunteers standing together in the school compound, holding up the pieces they made from banana fibre.",
    caption:
      "Learners, teachers and volunteers hold up what they made — the closing moment of the session.",
    aspect: "landscape",
  },
  facts: [
    { label: "Activity", value: "Banana fibre art and play" },
    { label: "Duration", value: "40 minutes" },
    { label: "Setting", value: "Outdoors, school compound" },
    {
      label: "Participants",
      value: "Learners with high support needs, teachers, school leaders",
    },
  ],
  blocks: [
    {
      type: "paragraph",
      text: "We held the session outside, in the school compound rather than a classroom. The open ground gave the learners room to move and explore, and made the whole thing feel less restrictive than four walls and a timetable. We began by thanking the school leaders and teachers for welcoming us and making time.",
    },
    {
      type: "paragraph",
      text: "The activity was rooted in the Sankofa philosophy: look to your roots, value what comes from your own community, and use that knowledge to shape what comes next. Here, the banana fibre was never just an art material. It was a familiar, natural resource from the learners' own environment. Bringing a local material into the learning space meant children could learn through something accessible, natural and already part of everyday life.",
    },
    {
      type: "media",
      items: [
        {
          kind: "image",
          src: `${UG}/fibre-arrives.jpg`,
          alt: "Volunteers carrying bundles of dried banana fibre across the compound towards the play area.",
          caption: "The fibre arrives — gathered locally, carried in by hand.",
          aspect: "landscape",
        },
        {
          kind: "video",
          src: `${UG}/the-compound.mp4`,
          poster: `${UG}/the-compound-poster.jpg`,
          alt: "Wide view of the school compound, with mats laid out on the grass under the trees.",
          caption: "Mats laid out on the grass: the classroom for the day.",
          aspect: "landscape",
        },
      ],
    },
    { type: "heading", text: "Meeting learners where they were" },
    {
      type: "paragraph",
      text: "We introduced the fibre and then let the learners explore it freely — look at it, touch it, hold it, smell it if they wanted to. Every learner responded differently. Some were curious and dived straight in. Others preferred to watch, and some did not want to take part in the art activity at all.",
    },
    {
      type: "paragraph",
      text: "Many found it hard to hold attention for long. Rather than treat that as a failure, we adapted. We stopped expecting every learner to finish a particular piece of artwork and focused instead on participation in all its forms. A learner could touch, smell, hold, arrange, observe, choose or create — and every one of those responses was accepted and valued.",
    },
    {
      type: "quote",
      text: "Limited attention does not mean limited learning.",
    },
    {
      type: "paragraph",
      text: "That reflects something central to Sankofa: learning does not have to follow one fixed path. We can draw on what is already around us — nature, local materials, community knowledge, play, and children's own ways of responding. The banana fibre became a bridge between the learners, their environment, their creativity and their learning.",
    },
    {
      type: "media",
      items: [
        {
          kind: "video",
          src: `${UG}/introducing-the-fibre.mp4`,
          poster: `${UG}/introducing-the-fibre-poster.jpg`,
          alt: "A volunteer sitting on a mat, demonstrating how to twist and tie banana fibre while learners watch and try alongside.",
          caption:
            "Introducing the fibre: twisting, tying, and letting learners take it at their own pace.",
          aspect: "landscape",
        },
        {
          kind: "image",
          src: `${UG}/learner-weaving.jpg`,
          alt: "A learner sitting cross-legged on a play mat, concentrating on binding strands of banana fibre together.",
          caption: "Working a bundle of fibre into shape.",
          aspect: "portrait",
        },
        {
          kind: "image",
          src: `${UG}/teacher-guiding.jpg`,
          alt: "A teacher leaning in beside a learner on the mat, guiding their hands as they work with banana fibre.",
          caption: "Guidance offered close up, hand beside hand.",
          aspect: "portrait",
        },
        {
          kind: "image",
          src: `${UG}/hands-together.jpg`,
          alt: "A teacher holding a young learner on her lap, the two of them shaping a small banana fibre doll together.",
          caption: "Two pairs of hands shaping a small fibre doll.",
          aspect: "portrait",
        },
      ],
    },
    { type: "heading", text: "When the ball came out" },
    {
      type: "paragraph",
      text: "After the art activity we brought out a ball, and participation jumped. Learners threw it, kicked it, and played alongside their teachers. The shift from art to ball play opened up movement, communication, interaction, laughter and connection — and drew in several learners who had shown little interest in the fibre.",
    },
    {
      type: "media",
      items: [
        {
          kind: "video",
          src: `${UG}/ball-play.mp4`,
          poster: `${UG}/ball-play-poster.jpg`,
          alt: "A learner playing with a ball on the grass in front of a wall of brightly painted tyres.",
          caption: "The ball game: movement as its own pathway into learning.",
          aspect: "portrait",
        },
        {
          kind: "video",
          src: `${UG}/laughter-and-connection.mp4`,
          poster: `${UG}/laughter-and-connection-poster.jpg`,
          alt: "A Sankofa volunteer sitting on a mat, laughing and clapping with a learner standing in front of her.",
          caption: "Laughter, clapping, connection — participation by another name.",
          aspect: "portrait",
        },
      ],
    },
    { type: "heading", text: "What the learners kept" },
    {
      type: "paragraph",
      text: "One of the most meaningful observations came at the end: some learners chose to keep their artwork, tucking it into their bags to take home. Several of them had not appeared to concentrate for long during the activity — yet their decision to keep what they had made suggested the experience carried real personal meaning. Children's responses are not always visible in the moment.",
    },
    {
      type: "paragraph",
      text: "The teachers were enthusiastic too. They seemed to enjoy a different way of engaging with their learners — through natural materials, creativity, movement and play. The session became a learning experience for the adults as much as for the children, and a reminder that a great deal is already available within the community, without depending entirely on conventional classroom materials.",
    },
    {
      type: "media",
      items: [
        {
          kind: "image",
          src: `${UG}/learner-with-doll.jpg`,
          alt: "A smiling learner holding up a banana fibre doll he made, sitting on a mat in the compound.",
          caption: "Holding up a finished piece — and taking it home afterwards.",
          aspect: "portrait",
        },
        {
          kind: "image",
          src: `${UG}/side-by-side-making.jpg`,
          alt: "A teacher and a learner working side by side on the mat, surrounded by finished banana fibre creations.",
          caption: "Finished pieces gathering on the mat.",
          aspect: "portrait",
        },
        {
          kind: "image",
          src: `${UG}/fibre-raised-high.jpg`,
          alt: "Learners and teachers under a tree raising their banana fibre creations above their heads.",
          caption: "Creations raised high under the tree.",
          aspect: "landscape",
        },
        {
          kind: "image",
          src: `${UG}/group-under-tree.jpg`,
          alt: "The full group of learners, teachers and volunteers gathered together under a large tree in the compound.",
          caption: "The whole group, gathered before the session closed.",
          aspect: "landscape",
        },
        {
          kind: "image",
          src: `${UG}/group-portrait.jpg`,
          alt: "Learners, teachers and school leaders standing and seated together on the grass at the end of the session.",
          caption: "Learners, teachers and school leaders at the close of the day.",
          aspect: "landscape",
        },
      ],
    },
    { type: "heading", text: "Reflections" },
    {
      type: "paragraph",
      text: "This session deepened our understanding of what genuine participation can look like for learners with high support needs. Some took part for only a few moments. Some explored the fibre through smell or touch. Some watched. Some opted out of the art entirely. Each of those was still a meaningful form of engagement.",
    },
    {
      type: "paragraph",
      text: "The learners' happiness mattered most. Even when they could not stay focused, many were relaxed and joyful — which challenged our idea of what success in an educational activity should look like. Learning should not be measured only by whether a child sits still, follows instructions, completes a task or produces a “correct” piece of work.",
    },
    {
      type: "quote",
      text: "Success is measured by engagement, enjoyment, choice, connection, communication, exploration and growth — not simply by task completion.",
    },
    {
      type: "paragraph",
      text: "Sankofa teaches us to look back so that we can move forward. Banana fibre, a simple resource from the local environment, became a tool for inclusive learning — traditional, locally available knowledge treated not as something belonging only to the past, but as a foundation for new learning experiences for children with diverse needs.",
    },
    { type: "heading", text: "The pathway we are carrying forward" },
    {
      type: "pathway",
      steps: [
        "See",
        "Touch",
        "Choose",
        "Try",
        "Create",
        "Play",
        "Connect",
        "Celebrate",
      ],
    },
    { type: "heading", text: "What we will change next time" },
    {
      type: "list",
      items: [
        "Shorter activity periods, with clear stopping points.",
        "More movement breaks built into the session.",
        "Additional sensory opportunities alongside the making.",
        "More time set aside for free play.",
        "Greater freedom for learners to choose how they take part — recognising that not every child responds to the same material in the same way.",
      ],
    },
    {
      type: "paragraph",
      text: "Ultimately, the session reminded us that every small response counts. A learner may smell the material, touch it briefly, watch others, arrange a piece of fibre, kick a ball, laugh, speak to a teacher, or take artwork home. Each of those can be a meaningful sign of participation.",
    },
    {
      type: "paragraph",
      text: "That is the heart of a Sankofa-informed approach: start with what the child knows, what the community has and what the environment offers; make space for every learner to take part; and use those roots to imagine new possibilities for learning. In this activity the roots were not only in the banana fibre — they were in the learners, the community, the teachers, the environment, and the belief that every child has something valuable to contribute.",
    },
  ],
};

const KL = "/pilots/echipparra-kerala";

const echipparraStory: PilotStory = {
  title: "Fifty lesson plans, one tribal school, and a curriculum built from what is at hand",
  tag: "Outreach report",
  date: "July 2026",
  dateTime: "2026-07-30",
  readingTime: "7 min read",
  location: "Echipparra Tribal School, Thrissur district, Kerala, India",
  lead: "Twenty-nine engineering students wrote and refined around fifty course plans using only materials already available in a village classroom — then spent three hours teaching them to 106 tribal schoolchildren, and presented what they learned to an international panel.",
  hero: {
    kind: "image",
    src: `${KL}/group-photo.jpg`,
    alt: "The full group — Sankofa Club student volunteers, faculty, teachers and the children of Echipparra Tribal School — gathered on the school veranda for a group photograph.",
    caption:
      "Volunteers, faculty, teachers and children of Echipparra Tribal School at the end of the outreach day.",
    aspect: "wide",
  },
  facts: [
    {
      label: "Organising body",
      value:
        "Sankofa Club, Christ College of Engineering (Autonomous), Thrissur",
    },
    { label: "Volunteers", value: "29 B.Tech students, 2 faculty members" },
    { label: "Beneficiaries", value: "106 children, classes 1–4" },
    { label: "Session length", value: "3 hours of direct teaching" },
  ],
  blocks: [
    {
      type: "paragraph",
      text: "The Sankofa Club at Christ College of Engineering in Thrissur, Kerala, operates under the aegis of IEEE Smart Village. Its purpose is simple and demanding at once: to turn student energy and technical skill into ground-level social impact. This is the account of its first outreach — a day at the Echipparra Tribal School, and the international presentation that followed.",
    },
    { type: "heading", text: "What the pilot set out to do" },
    {
      type: "numbered",
      items: [
        "Get near-peer students to write and refine a STREAM curriculum based on “what is at hand only”, usable in remote and hard-to-reach areas of India and Africa.",
        "Deliver that content to children in tribal schools, where students come from underserved and distressed communities — and gather feedback from the children, their parents and their teachers on the curriculum, the implementation plans and how to extend them.",
        "Report back to Sankofa with pictures, videos and feedback, so the exchange runs both ways and feeds better practice.",
        "Diverge to other similar schools, and towards more experiential learning within that two-way exchange.",
      ],
    },
    {
      type: "quote",
      text: "A curriculum built from what is at hand only — no assumption of a lab, a kit, or a budget.",
    },
    { type: "heading", text: "What actually happened" },
    {
      type: "numbered",
      items: [
        "The Sankofa Club was inaugurated on campus.",
        "Students wrote around 50 course plans and refined them with input from faculty members.",
        "29 students and 2 teachers travelled to the tribal school and ran a three-hour session against objectives 2 and 3.",
        "The students presented their experience over Zoom to members of Sankofa and of their own institution, who acknowledged and appreciated the work.",
      ],
    },
    {
      type: "media",
      items: [
        {
          kind: "image",
          src: `${KL}/at-the-blackboard.jpg`,
          alt: "Student volunteers writing on the blackboard at the front of a yellow classroom while children watch from wooden benches.",
          caption:
            "Setting up at the blackboard — a Standard II session, with polystyrene spheres waiting on the table.",
          aspect: "portrait",
        },
        {
          kind: "image",
          src: `${KL}/classroom-session.jpg`,
          alt: "Volunteers standing among the desks of a bright yellow classroom, working with young children seated at blue benches.",
          caption: "Working the room desk by desk rather than lecturing from the front.",
          aspect: "portrait",
        },
      ],
    },
    { type: "heading", text: "The solar system, from what was on the table" },
    {
      type: "paragraph",
      text: "The teaching itself was hands-on. Plain polystyrene spheres, poster paint, glue and printed reference cards became a working model of the solar system — children painted the surface of Mars from a photograph, mounted Jupiter on a stand, and built the planets themselves rather than watching someone else do it. Nothing in the session depended on equipment the school did not already have or could not cheaply obtain, which was the entire point of the “what is at hand” brief.",
    },
    {
      type: "media",
      items: [
        {
          kind: "image",
          src: `${KL}/painting-the-planets.jpg`,
          alt: "A student volunteer holding a reference card while a young girl paints a polystyrene sphere red to make a model of Mars.",
          caption: "Painting Mars from a photograph, sphere in hand.",
          aspect: "landscape",
        },
        {
          kind: "image",
          src: `${KL}/building-the-solar-system.jpg`,
          alt: "Children and a volunteer assembling white polystyrene spheres into planet models, with glue, brushes and a Jupiter reference card on the desk.",
          caption: "Assembling the planets — glue, brushes and reference cards.",
          aspect: "landscape",
        },
        {
          kind: "image",
          src: `${KL}/hands-on-materials.jpg`,
          alt: "A faculty member leaning over a desk covered in craft materials, helping a child with a hands-on activity.",
          caption: "Faculty working alongside the children at the desks.",
          aspect: "portrait",
        },
        {
          kind: "image",
          src: `${KL}/demonstrating-with-a-ball.jpg`,
          alt: "A student volunteer holding up a red ball to demonstrate a concept while children gather around the classroom bench.",
          caption: "A red ball, held up — the simplest possible teaching aid.",
          aspect: "portrait",
        },
      ],
    },
    { type: "heading", text: "Who it reached" },
    {
      type: "paragraph",
      text: "106 children from classes 1 to 4 attended, with three to four of their teachers watching from the sidelines. The beneficiaries also included the attendees of the Zoom meeting, since the club members shared genuinely valuable lessons drawn from their own observations and experience.",
    },
    { type: "heading", text: "Achievements and outcomes" },
    {
      type: "list",
      items: [
        "The interactions were effective enough that the children insisted on more such sessions.",
        "Club members learned that education is always a two-way journey — something that equips them for life with purpose and empathy.",
        "Plans are in place for prolonged engagement, and for more schools to be taken under the club's wing.",
        "Club members completed a distinctive internship they can add to their CVs, strengthening their prospects as good communicators.",
        "Plans have been formulated to extend the programme to a 37-experiment curriculum, designed to give underserved and tribal schools awareness of different vocations and career paths.",
      ],
    },
    { type: "heading", text: "Presented to an international panel" },
    {
      type: "paragraph",
      text: "After the outreach, the participating students were invited to present their experience and outcomes at an international forum convened jointly by the Sankofa International Forum and IEEE Smart Village. They set out their approach, the challenges they met and the impact of the work. The presentation was well received, and the students were commended for their initiative, dedication and social impact.",
    },
    {
      type: "table",
      caption: "Panel of attendees",
      columns: ["Name", "Affiliation"],
      rows: [
        ["Prof. Toby C.", "IEEE Smart Village / Sankofa International Forum"],
        ["Ms. Indira", "IEEE Smart Village / Sankofa International Forum"],
        ["Ms. Patience", "IEEE Smart Village / Sankofa International Forum"],
        ["Mr. Fidelis", "IEEE Smart Village / Sankofa International Forum"],
        ["Fr. John Palliakara", "Executive Director, CCE"],
        ["Fr. Milner Paul", "Joint Director, CCE"],
        ["Dr. Sijo M T", "Principal, CCE"],
        ["Dr. Sudha Balagopalan", "Sankofa Club Charge"],
        ["Ms. Anita Antony", "Sankofa Club Co-ordinator"],
        ["Ms. Anjana S", "Sankofa Club Co-ordinator"],
      ],
    },
    {
      type: "media",
      items: [
        {
          kind: "image",
          src: `${KL}/volunteer-presenting.jpg`,
          alt: "A student volunteer presenting to seated listeners in front of a painted wall mural of the earth and environmental scenes.",
          caption: "Presenting the work — first on campus, then to the international forum.",
          aspect: "square",
        },
      ],
    },
    { type: "heading", text: "Challenges encountered" },
    {
      type: "list",
      items: [
        "School timings run on a year-long academic calendar; engineering college timings run on semesters. On top of university exams there are three continuous evaluation tests and a series of assignments, which makes arranging more school interactions difficult when both sides have different exam types and seasons.",
        "Changes of leadership in schools, tribal development corporations and local self-governments disturb the general scheme of things. Delays, shifts in attitude and bureaucratic difficulty will keep playing out until stability emerges.",
      ],
    },
    { type: "heading", text: "Lessons learned" },
    {
      type: "list",
      items: [
        "What the school children's interests, values, attitudes and responses reveal about modes of content delivery.",
        "Club members, acting as facilitators, learned about themselves — about the joy of giving, and about the motivational energy released when young lives respond to them trustingly.",
        "The confidence participants develop when interactions are mutually acknowledged and appreciated.",
        "That the idea of Sankofa is a well-accepted concept.",
      ],
    },
    { type: "heading", text: "Impact on the community" },
    {
      type: "paragraph",
      text: "Proper impact assessment will take time. The short-duration impact is mostly trust building — and through the young children, the cooperation and confidence of their parents in the institution's intentions, which is crucial for bringing in any further development activity.",
    },
    {
      type: "quote",
      text: "Education is always a two-way journey.",
    },
    {
      type: "paragraph",
      text: "This initiative shows what the Sankofa Club's model can do: near-peer students designing a curriculum for constraints they have to think hard about, delivering it face to face in a community with limited access to structured learning, and carrying the lessons back out to an international audience. The next steps are already drawn — longer engagement at Echipparra, more schools, and the 37-experiment curriculum that opens up vocations and career paths to children who rarely see them modelled.",
    },
  ],
};

const TZ = "/pilots/tanzania-network";

const tanzaniaStory: PilotStory = {
  title: "Three Sankofa pilots operational in Tanzania",
  tag: "Network update",
  date: "August 2026",
  dateTime: "2026-08-01",
  readingTime: "5 min read",
  location: "Honda, Udilo Mufindi and Mdabulo, Tanzania",
  lead: "A chance meeting in October 2025 became a classroom of 95 children. Ten months on, three pilots are running across rural Tanzania, teaching 185 pupils with the resources already at hand.",
  hero: {
    kind: "image",
    src: `${TZ}/gathered-around-the-materials.jpg`,
    alt: "A large group of children in green school jumpers and knitted hats crowded around adults working with number cards on a woven floor mat.",
    caption:
      "Children gathered around a set of counting materials laid out on the floor mat.",
    aspect: "landscape",
  },
  facts: [
    { label: "Pilots operational", value: "Three — Honda, Udilo Mufindi, Mdabulo" },
    { label: "Pupils engaged", value: "185 across the three sites" },
    { label: "Honda enrolment", value: "92, after 10 months" },
    { label: "Partner", value: "Rural Development Organization (RDO)" },
  ],
  blocks: [
    {
      type: "paragraph",
      text: "Sankofa Honda came into existence through a serendipitous meeting with Erika Bonifasi in early October 2025. A few weeks later, 95 children were regularly attending classes in this underserved rural community, 80 km south of Dar es Salaam.",
    },
    {
      type: "paragraph",
      text: "Through the leadership of Fidelis Filipatali, Project Coordinator for the Rural Development Organization (RDO), Honda was quickly followed by two more. Sankofa Udilo Mufindi opened with Isaya Kalinga in November 2025, and, more recently, Sankofa Mdabulo RDO with Fredi Lutego in February 2026.",
    },
    {
      type: "table",
      caption: "The three pilots",
      columns: ["Pilot", "Opened", "Led with"],
      rows: [
        ["Sankofa Honda", "October 2025", "Erika Bonifasi"],
        ["Sankofa Udilo Mufindi", "November 2025", "Isaya Kalinga"],
        ["Sankofa Mdabulo RDO", "February 2026", "Fredi Lutego"],
      ],
    },
    {
      type: "media",
      items: [
        {
          kind: "image",
          src: `${TZ}/the-kindergarten-wall.jpg`,
          alt: "The painted exterior wall of a kindergarten building, lettered MIC KINDERGARTEN beside a painted Tanzanian flag, with a potted flowering plant below.",
          caption: "A painted wall, a flag and a plant in a repurposed tin — the front of the school.",
          aspect: "landscape",
        },
        {
          kind: "image",
          src: `${TZ}/outside-the-classroom.jpg`,
          alt: "Children in green uniforms gathered outside brick school buildings on a dirt path, with a teacher crouching to speak with them and hills in the distance.",
          caption: "Outside the classroom, in the highlands.",
          aspect: "landscape",
        },
      ],
    },
    { type: "heading", text: "Only the resources at hand" },
    {
      type: "paragraph",
      text: "Rahabu Filipatali, wife of Fidelis and a teacher in the Montessori school system, played a key role in developing these initiatives. Today they engage 185 pupils using only the resources at hand, supplemented by a few passive educational tools bought with the proceeds of honey sales from RDO.",
    },
    {
      type: "quote",
      text: "185 pupils, taught with what the community already has — and a few tools paid for by selling honey.",
    },
    {
      type: "paragraph",
      text: "What that looks like in practice: number and letter cards laid out on a woven floor mat, a hand-drawn counting board, painted digits running along a veranda wall for children to reach up and touch, a syllable chart chalked straight onto bare concrete. Nothing that needs a supplier, a budget line or mains electricity.",
    },
    {
      type: "media",
      items: [
        {
          kind: "image",
          src: `${TZ}/number-cards-on-the-mat.jpg`,
          alt: "Adults and children kneeling around numbered discs and a shallow tray on a woven mat, arranging them into order.",
          caption: "Numbered discs and a tray, worked through on the mat.",
          aspect: "landscape",
        },
        {
          kind: "image",
          src: `${TZ}/the-number-board.jpg`,
          alt: "A hand-made counting board of numbered discs and coloured dots laid on a woven mat, with children sitting around it clapping.",
          caption: "A hand-made counting board — dots to match against numerals.",
          aspect: "landscape",
        },
        {
          kind: "image",
          src: `${TZ}/letter-cards.jpg`,
          alt: "Children standing at a low wooden shelf of painted letter cards, one child holding up a green card reading ch.",
          caption: "Holding up a letter card at the shelf.",
          aspect: "landscape",
        },
        {
          kind: "image",
          src: `${TZ}/the-learning-shelf.jpg`,
          alt: "A classroom with woven floor mats, a mud-plastered blackboard, a painted zebra on the wall and a low wooden shelf holding numbered and lettered cards.",
          caption: "The whole room: mats, a plastered blackboard, and one low shelf of materials.",
          aspect: "landscape",
        },
      ],
    },
    {
      type: "media",
      items: [
        {
          kind: "image",
          src: `${TZ}/counting-on-the-wall.jpg`,
          alt: "Children lined up along a veranda reaching up to touch large painted numerals one to ten on the school wall.",
          caption: "The wall itself as a number line.",
          aspect: "landscape",
        },
        {
          kind: "image",
          src: `${TZ}/reaching-for-the-numbers.jpg`,
          alt: "Young children stretching up on tiptoe to reach painted numbers high on the veranda wall, with painted birds and animals above the windows.",
          caption: "Stretching for the higher numbers.",
          aspect: "landscape",
        },
        {
          kind: "image",
          src: `${TZ}/numbers-along-the-veranda.jpg`,
          alt: "A group of children spread along the veranda wall, some pointing at the painted numerals, one turning to face the camera.",
          caption: "Everyone gets a turn at the wall.",
          aspect: "landscape",
        },
        {
          kind: "image",
          src: `${TZ}/the-syllable-wall.jpg`,
          alt: "A Swahili syllable chart headed Kusoma, chalked in rows onto a bare concrete wall, with two small children sitting on the floor in front of it.",
          caption:
            "Kusoma — reading. The syllable chart is chalked straight onto the wall.",
          aspect: "tall",
        },
      ],
    },
    { type: "heading", text: "Learning through movement and the day itself" },
    {
      type: "paragraph",
      text: "The classes are not still ones. Between the mat work there is running, rolling and games across the floor mats; there are seedlings to carry out and plant in the ground outside; there is a meal to sit down to together. The teaching folds into the ordinary shape of the day rather than sitting apart from it.",
    },
    {
      type: "media",
      items: [
        {
          kind: "image",
          src: `${TZ}/movement-in-the-classroom.jpg`,
          alt: "Children moving freely across the woven floor mats of a classroom, some running, some rolling, with adults watching from the side.",
          caption: "Movement time on the mats.",
          aspect: "landscape",
        },
        {
          kind: "image",
          src: `${TZ}/floor-games.jpg`,
          alt: "Children spread out across floor mats mid-game, stretching, crawling and lying down, with a shelf of learning materials against the wall.",
          caption: "Games that use the whole floor.",
          aspect: "landscape",
        },
        {
          kind: "image",
          src: `${TZ}/carrying-the-seedling.jpg`,
          alt: "A crowd of children in green uniforms outside the school, gathered around adults handing over a young potted tree seedling.",
          caption: "A seedling handed over outside the classroom.",
          aspect: "portrait",
        },
        {
          kind: "image",
          src: `${TZ}/planting-a-seedling.jpg`,
          alt: "Children crouching and standing around a young tree seedling newly planted in bare red earth, reaching towards it.",
          caption: "Planted, and inspected by everyone at once.",
          aspect: "portrait",
        },
      ],
    },
    {
      type: "media",
      items: [
        {
          kind: "image",
          src: `${TZ}/morning-circle.jpg`,
          alt: "Children sitting in rows along the walls of a bare classroom on woven mats, listening, with a teacher seated among them.",
          caption: "Settling in at the start of the session.",
          aspect: "landscape",
        },
        {
          kind: "image",
          src: `${TZ}/mealtime.jpg`,
          alt: "Children seated at wooden benches eating from coloured plastic bowls in a classroom.",
          caption: "A meal at the desks — part of the day, not an extra.",
          aspect: "wide",
        },
      ],
    },
    {
      type: "media",
      items: [
        {
          kind: "video",
          src: `${TZ}/a-class-in-session.mp4`,
          poster: `${TZ}/a-class-in-session-poster.jpg`,
          alt: "A handheld phone recording panning across a room full of young children during a class.",
          caption:
            "A class in session, recorded on a phone and sent up the line — this is what reporting from a rural pilot actually looks like.",
          aspect: "landscape",
        },
      ],
    },
    { type: "heading", text: "The numbers after ten months" },
    {
      type: "paragraph",
      text: "Thirty pupils from Honda have now graduated into the country's primary school system, replaced by another 27 students — dropping overall enrolment by three, to 92 after ten months. That is the shape a working pilot makes: children moving on into formal schooling, and new ones arriving to take their places.",
    },
    {
      type: "list",
      items: [
        "95 children attending Honda within weeks of the pilot's founding.",
        "30 Honda pupils graduated into the national primary school system.",
        "27 new students enrolled in their place, leaving Honda at 92.",
        "185 pupils engaged across all three Tanzanian pilots.",
      ],
    },
    {
      type: "paragraph",
      text: "These initiatives continue to attract significant interest from local and federal branches of the Tanzanian government. Further pilot projects are planned as Sankofa continues its outreach to underserved rural communities across Tanzania.",
    },
  ],
};

export const pilots: Pilot[] = [
  {
    slug: "tanzania-network",
    name: "Honda, Udilo Mufindi & Mdabulo",
    country: "Tanzania",
    status: "Active",
    body: "Our founding pilots, now three sites run with the Rural Development Organization. From a chance meeting in October 2025 to 185 pupils learning with the resources already at hand — and thirty children already graduated into the national primary school system.",
    story: tanzaniaStory,
  },
  {
    slug: "sadangi-india",
    name: "Sadangi",
    country: "India",
    status: "Active",
    body: "Sadangi is a tribal village in India, where the Aashraa Foundation first built trust through weekly nutrition kits and quarterly health camps before opening learning centres — a model of community-first engagement now delivering STREAM education to tribal learners.",
  },
  {
    slug: "echipparra-kerala",
    name: "Echipparra Tribal School",
    country: "India",
    status: "Active",
    body: "A Sankofa Club pilot run by engineering students at Christ College of Engineering, Thrissur, under IEEE Smart Village — around 50 student-written course plans built from what is at hand only, delivered to 106 tribal schoolchildren in classes 1 to 4.",
    story: echipparraStory,
  },
  {
    slug: "najjanankumbi-uganda",
    name: "Najjanankumbi",
    country: "Uganda",
    status: "Active",
    body: "A creative arts–centred pilot in Kampala where learners explore banana plant fibers and local materials to craft ropes, mats and more — demonstrating how culturally grounded, hands-on learning fosters inclusion and innovation.",
  },
  {
    slug: "uganda-banana-fibre",
    name: "Banana Fibre Art & Play",
    country: "Uganda",
    status: "Active",
    body: "An inclusive pilot at a special needs centre in Greater Kampala, where banana fibre, movement and play open up learning for children with high support needs — and every form of participation counts.",
    story: bananaFibreStory,
  },
  {
    slug: "nigeria-pilot",
    name: "Nigeria pilot",
    country: "Nigeria",
    status: "Coming soon",
    body: "An emerging pilot being developed with local volunteers, with on-the-ground narrative support from our Nigeria network.",
  },
];

export const statusStyles: Record<PilotStatus, string> = {
  Active: "bg-success/12 text-success border-success/25",
  "In development": "bg-accent/15 text-accent-strong border-accent/30",
  "Coming soon": "bg-secondary/10 text-secondary border-secondary/25",
};

export function getPilot(slug: string) {
  return pilots.find((p) => p.slug === slug);
}

/** Pilots that have a full story page. */
export const pilotsWithStories = pilots.filter(
  (p): p is Pilot & { story: PilotStory } => Boolean(p.story),
);
