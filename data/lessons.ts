import { Lesson } from "@/types/learning";

export const lessons: Lesson[] = [
  // ── Spanish Unit 1: Basics ──────────────────────────────────────────
  // Lesson 1: Greetings
  {
    id: "es-basics-1-lesson-1",
    unitId: "es-basics-1",
    title: "¡Hola!",
    description: "Learn basic greetings.",
    order: 1,
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [
      {
        id: "es-b1-l1-g1",
        description: "Greet someone in Spanish",
        vocabularyIds: ["es-vocab-hola", "es-vocab-buenos-dias", "es-vocab-buenas-noches"],
      },
    ],
    activities: [
      {
        id: "es-b1-l1-a1",
        type: "vocabulary-intro",
        instruction: "Tap each word to hear it and learn its meaning.",
        items: [
          { id: "es-vocab-hola", word: "Hola", translation: "Hello", pronunciation: "OH-lah" },
          { id: "es-vocab-buenos-dias", word: "Buenos días", translation: "Good morning", pronunciation: "BWEH-nohs DEE-ahs" },
          { id: "es-vocab-buenas-noches", word: "Buenas noches", translation: "Good night", pronunciation: "BWEH-nahs NOH-chehs" },
        ],
      },
      {
        id: "es-b1-l1-a2",
        type: "multiple-choice",
        instruction: "What does 'Hola' mean?",
        prompt: "What does 'Hola' mean?",
        options: [
          { id: "es-b1-l1-a2-o1", text: "Goodbye", isCorrect: false },
          { id: "es-b1-l1-a2-o2", text: "Hello", isCorrect: true },
          { id: "es-b1-l1-a2-o3", text: "Thank you", isCorrect: false },
          { id: "es-b1-l1-a2-o4", text: "Please", isCorrect: false },
        ],
      },
      {
        id: "es-b1-l1-a3",
        type: "match-pairs",
        instruction: "Match each Spanish greeting to its English meaning.",
        pairs: [
          { id: "es-b1-l1-a3-p1", left: "Hola", right: "Hello" },
          { id: "es-b1-l1-a3-p2", left: "Buenos días", right: "Good morning" },
          { id: "es-b1-l1-a3-p3", left: "Buenas noches", right: "Good night" },
        ],
      },
      {
        id: "es-b1-l1-a4",
        type: "speak",
        instruction: "Say 'Hello' in Spanish to your AI teacher.",
        prompt: "Say 'Hello' in Spanish.",
        expectedResponse: "Hola",
        acceptableResponses: ["hola", "¡hola!"],
        agentPrompt: "You are a friendly Spanish teacher. Greet the student with '¡Hola!' and encourage them to say it back. Respond warmly when they greet you correctly.",
      },
    ],
    aiTeacherPrompt: {
      contextPrompt: "You are teaching Spanish greetings to a beginner. Start with a warm welcome in Spanish then switch to English to explain.",
      voiceStyle: "friendly, encouraging, slightly enthusiastic",
      visualCues: ["wave emoji", "sunrise background for buenos días"],
    },
  },
  // Lesson 2: Introductions
  {
    id: "es-basics-1-lesson-2",
    unitId: "es-basics-1",
    title: "Me llamo...",
    description: "Introduce yourself in Spanish.",
    order: 2,
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [
      {
        id: "es-b1-l2-g1",
        description: "Introduce yourself and ask someone's name",
        vocabularyIds: ["es-vocab-llamo", "es-vocab-como-te-llamas", "es-vocab-mucho-gusto"],
      },
    ],
    activities: [
      {
        id: "es-b1-l2-a1",
        type: "vocabulary-intro",
        instruction: "Learn phrases for introducing yourself.",
        items: [
          { id: "es-vocab-llamo", word: "Me llamo...", translation: "My name is...", pronunciation: "meh YAH-moh" },
          { id: "es-vocab-como-te-llamas", word: "¿Cómo te llamas?", translation: "What's your name?", pronunciation: "KOH-moh teh YAH-mahs" },
          { id: "es-vocab-mucho-gusto", word: "Mucho gusto", translation: "Nice to meet you", pronunciation: "MOO-choh GOO-stoh" },
        ],
      },
      {
        id: "es-b1-l2-a2",
        type: "translate",
        instruction: "Translate this sentence to Spanish.",
        sourceText: "My name is María.",
        targetLanguage: "Spanish",
        correctAnswer: "Me llamo María.",
        acceptableAnswers: ["me llamo maría", "Me llamo Maria", "me llamo Maria"],
      },
      {
        id: "es-b1-l2-a3",
        type: "fill-blank",
        instruction: "Fill in the blank.",
        sentenceTemplate: "¿Cómo _____ llamas?",
        correctAnswer: "te",
        acceptableAnswers: ["te"],
        hint: "It's the word for 'you' (informal) before 'llamas'.",
      },
      {
        id: "es-b1-l2-a4",
        type: "chat",
        instruction: "Practice introducing yourself to the AI tutor.",
        scenario: "You meet someone new at a party. Introduce yourself and ask their name.",
        agentPrompt: "You are a friendly person at a Spanish party. Greet the student and ask '¿Cómo te llamas?'. Respond to their introduction with 'Mucho gusto' and ask where they are from.",
        expectedTopics: ["me llamo", "mucho gusto", "como te llamas"],
      },
    ],
    aiTeacherPrompt: {
      contextPrompt: "Teach the student how to introduce themselves in Spanish. Practice 'Me llamo...' and '¿Cómo te llamas?'.",
      voiceStyle: "patient, warm, teacher-like",
      visualCues: ["name tag graphic", "two people shaking hands"],
    },
  },
  // Lesson 3: Polite Expressions
  {
    id: "es-basics-1-lesson-3",
    unitId: "es-basics-1",
    title: "Por favor y gracias",
    description: "Learn polite expressions.",
    order: 3,
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [
      {
        id: "es-b1-l3-g1",
        description: "Use polite expressions in Spanish",
        vocabularyIds: ["es-vocab-por-favor", "es-vocab-gracias", "es-vocab-de-nada", "es-vocab-perdon"],
      },
    ],
    activities: [
      {
        id: "es-b1-l3-a1",
        type: "vocabulary-intro",
        instruction: "Learn essential polite phrases.",
        items: [
          { id: "es-vocab-por-favor", word: "Por favor", translation: "Please", pronunciation: "por fah-VOR" },
          { id: "es-vocab-gracias", word: "Gracias", translation: "Thank you", pronunciation: "GRAH-see-ahs" },
          { id: "es-vocab-de-nada", word: "De nada", translation: "You're welcome", pronunciation: "deh NAH-dah" },
          { id: "es-vocab-perdon", word: "Perdón", translation: "Excuse me / Sorry", pronunciation: "pehr-DOHN" },
        ],
      },
      {
        id: "es-b1-l3-a2",
        type: "multiple-choice",
        instruction: "How do you say 'Thank you' in Spanish?",
        prompt: "How do you say 'Thank you' in Spanish?",
        options: [
          { id: "es-b1-l3-a2-o1", text: "Por favor", isCorrect: false },
          { id: "es-b1-l3-a2-o2", text: "Gracias", isCorrect: true },
          { id: "es-b1-l3-a2-o3", text: "Perdón", isCorrect: false },
          { id: "es-b1-l3-a2-o4", text: "De nada", isCorrect: false },
        ],
      },
      {
        id: "es-b1-l3-a3",
        type: "fill-blank",
        instruction: "Fill in the blank to complete the response to 'thank you'.",
        sentenceTemplate: "—Gracias. —_____ nada.",
        correctAnswer: "De",
        acceptableAnswers: ["De", "de"],
        hint: "It means 'You're welcome'.",
      },
      {
        id: "es-b1-l3-a4",
        type: "listen-repeat",
        instruction: "Listen and repeat the phrase.",
        text: "Por favor",
        translation: "Please",
        audioPrompt: "por favor",
      },
      {
        id: "es-b1-l3-a5",
        type: "speak",
        instruction: "Practice saying 'Thank you' and 'Please' to your teacher.",
        prompt: "Say 'Thank you' in Spanish.",
        expectedResponse: "Gracias",
        acceptableResponses: ["gracias", "muchas gracias"],
        agentPrompt: "You are a Spanish teacher. Ask the student for something using 'Por favor', then thank them and encourage them to say 'De nada'.",
      },
    ],
    aiTeacherPrompt: {
      contextPrompt: "Teach polite expressions: por favor, gracias, de nada, perdón. Role-play a scenario where the student asks for something politely.",
      voiceStyle: "gentle and polite, speaking clearly",
      visualCues: ["smiling face", "hands clasped together"],
    },
  },
  // Lesson 4: Basic Questions
  {
    id: "es-basics-1-lesson-4",
    unitId: "es-basics-1",
    title: "¿Dónde está?",
    description: "Ask and answer simple questions.",
    order: 4,
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [
      {
        id: "es-b1-l4-g1",
        description: "Ask simple questions using ¿dónde?, ¿qué?, and ¿cómo?",
        vocabularyIds: ["es-vocab-donde", "es-vocab-que", "es-vocab-como", "es-vocab-esta"],
      },
    ],
    activities: [
      {
        id: "es-b1-l4-a1",
        type: "vocabulary-intro",
        instruction: "Learn question words in Spanish.",
        items: [
          { id: "es-vocab-donde", word: "¿Dónde?", translation: "Where?", pronunciation: "DOHN-deh" },
          { id: "es-vocab-que", word: "¿Qué?", translation: "What?", pronunciation: "keh" },
          { id: "es-vocab-como", word: "¿Cómo?", translation: "How?", pronunciation: "KOH-moh" },
          { id: "es-vocab-esta", word: "está", translation: "is (location/state)", pronunciation: "eh-STAH" },
        ],
      },
      {
        id: "es-b1-l4-a2",
        type: "multiple-choice",
        instruction: "What does '¿Dónde está?' mean?",
        prompt: "What does '¿Dónde está?' mean?",
        options: [
          { id: "es-b1-l4-a2-o1", text: "What is it?", isCorrect: false },
          { id: "es-b1-l4-a2-o2", text: "Who is it?", isCorrect: false },
          { id: "es-b1-l4-a2-o3", text: "Where is it?", isCorrect: true },
          { id: "es-b1-l4-a2-o4", text: "How is it?", isCorrect: false },
        ],
      },
      {
        id: "es-b1-l4-a3",
        type: "translate",
        instruction: "Translate to Spanish.",
        sourceText: "Where is the bathroom?",
        targetLanguage: "Spanish",
        correctAnswer: "¿Dónde está el baño?",
        acceptableAnswers: ["donde esta el baño", "¿dónde está el baño?", "Donde esta el bano"],
      },
      {
        id: "es-b1-l4-a4",
        type: "match-pairs",
        instruction: "Match each question word to its meaning.",
        pairs: [
          { id: "es-b1-l4-a4-p1", left: "¿Dónde?", right: "Where?" },
          { id: "es-b1-l4-a4-p2", left: "¿Qué?", right: "What?" },
          { id: "es-b1-l4-a4-p3", left: "¿Cómo?", right: "How?" },
        ],
      },
    ],
    aiTeacherPrompt: {
      contextPrompt: "Teach the student how to ask questions using dónde, qué, and cómo. Practice the question + answer format.",
      voiceStyle: "curious, engaging, prompting the student to ask questions",
      visualCues: ["question mark icon", "map pointing to a location"],
    },
  },

  // ── Spanish Unit 2: Food & Drink ────────────────────────────────────
  // Lesson 1: Common Foods
  {
    id: "es-food-1-lesson-1",
    unitId: "es-food-1",
    title: "La comida",
    description: "Learn names of common foods.",
    order: 1,
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [
      {
        id: "es-f1-l1-g1",
        description: "Name common foods in Spanish",
        vocabularyIds: ["es-vocab-pan", "es-vocab-agua", "es-vocab-leche", "es-vocab-arroz"],
      },
    ],
    activities: [
      {
        id: "es-f1-l1-a1",
        type: "vocabulary-intro",
        instruction: "Learn food vocabulary.",
        items: [
          { id: "es-vocab-pan", word: "el pan", translation: "bread", pronunciation: "ehl pahn" },
          { id: "es-vocab-agua", word: "el agua", translation: "water", pronunciation: "ehl AH-gwah" },
          { id: "es-vocab-leche", word: "la leche", translation: "milk", pronunciation: "lah LEH-cheh" },
          { id: "es-vocab-arroz", word: "el arroz", translation: "rice", pronunciation: "ehl ah-ROHTH" },
        ],
      },
      {
        id: "es-f1-l1-a2",
        type: "multiple-choice",
        instruction: "What is 'el pan'?",
        prompt: "What does 'el pan' mean in English?",
        options: [
          { id: "es-f1-l1-a2-o1", text: "Water", isCorrect: false },
          { id: "es-f1-l1-a2-o2", text: "Bread", isCorrect: true },
          { id: "es-f1-l1-a2-o3", text: "Milk", isCorrect: false },
          { id: "es-f1-l1-a2-o4", text: "Rice", isCorrect: false },
        ],
      },
      {
        id: "es-f1-l1-a3",
        type: "match-pairs",
        instruction: "Match each Spanish food to its English name.",
        pairs: [
          { id: "es-f1-l1-a3-p1", left: "el pan", right: "bread" },
          { id: "es-f1-l1-a3-p2", left: "el agua", right: "water" },
          { id: "es-f1-l1-a3-p3", left: "la leche", right: "milk" },
          { id: "es-f1-l1-a3-p4", left: "el arroz", right: "rice" },
        ],
      },
    ],
    aiTeacherPrompt: {
      contextPrompt: "Teach common food vocabulary in Spanish. Focus on correct article usage (el/la).",
      voiceStyle: "cheerful, food-themed enthusiasm",
      visualCues: ["bread icon", "glass of water", "carton of milk", "bowl of rice"],
    },
  },
  // Lesson 2: Ordering
  {
    id: "es-food-1-lesson-2",
    unitId: "es-food-1",
    title: "Quisiera...",
    description: "Order food and drinks.",
    order: 2,
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [
      {
        id: "es-f1-l2-g1",
        description: "Order food and drinks politely",
        vocabularyIds: ["es-vocab-quisiera", "es-vocab-la-cuenta", "es-vocab-menu"],
      },
    ],
    activities: [
      {
        id: "es-f1-l2-a1",
        type: "vocabulary-intro",
        instruction: "Learn phrases for ordering.",
        items: [
          { id: "es-vocab-quisiera", word: "Quisiera...", translation: "I would like...", pronunciation: "kee-SYEH-rah" },
          { id: "es-vocab-la-cuenta", word: "La cuenta, por favor", translation: "The check, please", pronunciation: "lah KWEN-tah por fah-VOR" },
          { id: "es-vocab-menu", word: "el menú", translation: "the menu", pronunciation: "ehl meh-NOO" },
        ],
      },
      {
        id: "es-f1-l2-a2",
        type: "translate",
        instruction: "Translate to Spanish.",
        sourceText: "I would like water, please.",
        targetLanguage: "Spanish",
        correctAnswer: "Quisiera agua, por favor.",
        acceptableAnswers: ["quisiera agua por favor", "quisiera agua, por favor", "Quisiera agua por favor"],
      },
      {
        id: "es-f1-l2-a3",
        type: "chat",
        instruction: "Practice ordering at a restaurant with the AI waiter.",
        scenario: "You are at a Spanish restaurant. Order bread and water, then ask for the check.",
        agentPrompt: "You are a waiter at a Spanish restaurant. Greet the customer with '¡Bienvenido! ¿Qué quisiera?' and respond to their order. When they ask for the check, say 'Claro, aquí tiene.'",
        expectedTopics: ["quisiera", "por favor", "la cuenta", "pan", "agua"],
      },
      {
        id: "es-f1-l2-a4",
        type: "listen-repeat",
        instruction: "Listen and repeat the ordering phrase.",
        text: "Quisiera un café, por favor.",
        translation: "I would like a coffee, please.",
        audioPrompt: "Quisiera un café, por favor.",
      },
    ],
    aiTeacherPrompt: {
      contextPrompt: "Teach the student how to order food politely in Spanish using 'Quisiera...' and 'La cuenta, por favor'.",
      voiceStyle: "polite, restaurant-friendly",
      visualCues: ["menu card", "coffee cup", "restaurant check"],
    },
  },
  // Lesson 3: Describing Taste
  {
    id: "es-food-1-lesson-3",
    unitId: "es-food-1",
    title: "Está delicioso",
    description: "Describe how food tastes.",
    order: 3,
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [
      {
        id: "es-f1-l3-g1",
        description: "Describe food with basic adjectives",
        vocabularyIds: ["es-vocab-delicioso", "es-vocab-rico", "es-vocab-salado", "es-vocab-dulce"],
      },
    ],
    activities: [
      {
        id: "es-f1-l3-a1",
        type: "vocabulary-intro",
        instruction: "Learn words to describe taste.",
        items: [
          { id: "es-vocab-delicioso", word: "delicioso", translation: "delicious", pronunciation: "deh-lee-SYOH-soh" },
          { id: "es-vocab-rico", word: "rico", translation: "tasty / rich", pronunciation: "REE-koh" },
          { id: "es-vocab-salado", word: "salado", translation: "salty", pronunciation: "sah-LAH-doh" },
          { id: "es-vocab-dulce", word: "dulce", translation: "sweet", pronunciation: "DOOL-seh" },
        ],
      },
      {
        id: "es-f1-l3-a2",
        type: "fill-blank",
        instruction: "Fill in the blank to say 'The bread is delicious'.",
        sentenceTemplate: "El pan está _____.",
        correctAnswer: "delicioso",
        acceptableAnswers: ["delicioso", "rico"],
        hint: "It means 'delicious'.",
      },
      {
        id: "es-f1-l3-a3",
        type: "multiple-choice",
        instruction: "What does 'dulce' mean?",
        prompt: "What does 'dulce' mean in English?",
        options: [
          { id: "es-f1-l3-a3-o1", text: "Salty", isCorrect: false },
          { id: "es-f1-l3-a3-o2", text: "Sweet", isCorrect: true },
          { id: "es-f1-l3-a3-o3", text: "Sour", isCorrect: false },
          { id: "es-f1-l3-a3-o4", text: "Bitter", isCorrect: false },
        ],
      },
    ],
    aiTeacherPrompt: {
      contextPrompt: "Teach taste adjectives: delicioso, rico, salado, dulce. Practice describing foods.",
      voiceStyle: "expressive, tasting-themed",
      visualCues: ["smiley face eating", "salt shaker", "sugar cube"],
    },
  },
  // Lesson 4: Restaurant Review
  {
    id: "es-food-1-lesson-4",
    unitId: "es-food-1",
    title: "La cuenta",
    description: "Review everything from Unit 2.",
    order: 4,
    xpReward: 10,
    estimatedMinutes: 6,
    goals: [
      {
        id: "es-f1-l4-g1",
        description: "Combine food vocabulary, ordering, and taste descriptions",
        vocabularyIds: ["es-vocab-pan", "es-vocab-agua", "es-vocab-delicioso", "es-vocab-quisiera", "es-vocab-la-cuenta"],
      },
    ],
    activities: [
      {
        id: "es-f1-l4-a1",
        type: "translate",
        instruction: "Translate the full sentence.",
        sourceText: "The rice is delicious. I would like the check, please.",
        targetLanguage: "Spanish",
        correctAnswer: "El arroz está delicioso. Quisiera la cuenta, por favor.",
        acceptableAnswers: [
          "el arroz esta delicioso quisiera la cuenta por favor",
          "El arroz está delicioso. Quisiera la cuenta, por favor",
          "el arroz está delicioso, quisiera la cuenta por favor",
        ],
      },
      {
        id: "es-f1-l4-a2",
        type: "match-pairs",
        instruction: "Match the Spanish to the English.",
        pairs: [
          { id: "es-f1-l4-a2-p1", left: "Quisiera pan", right: "I would like bread" },
          { id: "es-f1-l4-a2-p2", left: "Está salado", right: "It's salty" },
          { id: "es-f1-l4-a2-p3", left: "La cuenta", right: "The check" },
          { id: "es-f1-l4-a2-p4", left: "Muy rico", right: "Very tasty" },
        ],
      },
      {
        id: "es-f1-l4-a3",
        type: "speak",
        instruction: "Tell your AI teacher what you learned to order.",
        prompt: "Say 'I would like bread and water, please' in Spanish.",
        expectedResponse: "Quisiera pan y agua, por favor.",
        acceptableResponses: [
          "quisiera pan y agua por favor",
          "quisiera pan y agua, por favor",
          "Quisiera pan y agua por favor",
        ],
        agentPrompt: "You are a Spanish teacher celebrating the student's progress. Congratulate them on completing the Food & Drink unit. Ask them what their favorite Spanish food is.",
      },
    ],
    aiTeacherPrompt: {
      contextPrompt: "Review lesson combining food vocabulary, ordering phrases, and taste descriptions. Celebrate the student completing the unit.",
      voiceStyle: "celebratory, proud of student progress",
      visualCues: ["confetti", "completed checkmark", "Spanish restaurant scene"],
    },
  },

  // ── French Unit 1: Basics ───────────────────────────────────────────
  // Lesson 1
  {
    id: "fr-basics-1-lesson-1",
    unitId: "fr-basics-1",
    title: "Bonjour !",
    description: "Learn basic French greetings.",
    order: 1,
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [
      {
        id: "fr-b1-l1-g1",
        description: "Greet someone in French",
        vocabularyIds: ["fr-vocab-bonjour", "fr-vocab-bonsoir", "fr-vocab-salut"],
      },
    ],
    activities: [
      {
        id: "fr-b1-l1-a1",
        type: "vocabulary-intro",
        instruction: "Tap each word to hear it and learn its meaning.",
        items: [
          { id: "fr-vocab-bonjour", word: "Bonjour", translation: "Hello / Good day", pronunciation: "bohn-ZHOOR" },
          { id: "fr-vocab-bonsoir", word: "Bonsoir", translation: "Good evening", pronunciation: "bohn-SWAHR" },
          { id: "fr-vocab-salut", word: "Salut", translation: "Hi (informal)", pronunciation: "sah-LOO" },
        ],
      },
      {
        id: "fr-b1-l1-a2",
        type: "multiple-choice",
        instruction: "What does 'Bonjour' mean?",
        prompt: "What does 'Bonjour' mean?",
        options: [
          { id: "fr-b1-l1-a2-o1", text: "Goodbye", isCorrect: false },
          { id: "fr-b1-l1-a2-o2", text: "Good evening", isCorrect: false },
          { id: "fr-b1-l1-a2-o3", text: "Hello / Good day", isCorrect: true },
          { id: "fr-b1-l1-a2-o4", text: "Good night", isCorrect: false },
        ],
      },
      {
        id: "fr-b1-l1-a3",
        type: "match-pairs",
        instruction: "Match each French greeting to its meaning.",
        pairs: [
          { id: "fr-b1-l1-a3-p1", left: "Bonjour", right: "Hello" },
          { id: "fr-b1-l1-a3-p2", left: "Bonsoir", right: "Good evening" },
          { id: "fr-b1-l1-a3-p3", left: "Salut", right: "Hi (informal)" },
        ],
      },
    ],
    aiTeacherPrompt: {
      contextPrompt: "Teach basic French greetings. Explain the difference between formal (Bonjour) and informal (Salut).",
      voiceStyle: "warm, Parisian-friendly",
      visualCues: ["French flag", "waving hand"],
    },
  },
  // Lesson 2
  {
    id: "fr-basics-1-lesson-2",
    unitId: "fr-basics-1",
    title: "Je m'appelle...",
    description: "Introduce yourself in French.",
    order: 2,
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [
      {
        id: "fr-b1-l2-g1",
        description: "Introduce yourself and ask someone's name",
        vocabularyIds: ["fr-vocab-je-m-appelle", "fr-vocab-comment-tu-t-appelles", "fr-vocab-enchante"],
      },
    ],
    activities: [
      {
        id: "fr-b1-l2-a1",
        type: "vocabulary-intro",
        instruction: "Learn phrases to introduce yourself.",
        items: [
          { id: "fr-vocab-je-m-appelle", word: "Je m'appelle...", translation: "My name is...", pronunciation: "zhuh mah-PELL" },
          { id: "fr-vocab-comment-tu-t-appelles", word: "Comment tu t'appelles ?", translation: "What's your name?", pronunciation: "koh-MOHN too tah-PELL" },
          { id: "fr-vocab-enchante", word: "Enchanté", translation: "Nice to meet you", pronunciation: "ohn-shahn-TAY" },
        ],
      },
      {
        id: "fr-b1-l2-a2",
        type: "translate",
        instruction: "Translate to French.",
        sourceText: "My name is Pierre.",
        targetLanguage: "French",
        correctAnswer: "Je m'appelle Pierre.",
        acceptableAnswers: ["je m'appelle pierre", "Je m'appelle Pierre", "je m'appelle Pierre"],
      },
      {
        id: "fr-b1-l2-a3",
        type: "listen-repeat",
        instruction: "Listen and repeat the phrase.",
        text: "Enchanté",
        translation: "Nice to meet you",
        audioPrompt: "Enchanté",
      },
    ],
    aiTeacherPrompt: {
      contextPrompt: "Teach the student to introduce themselves in French. Practice 'Je m'appelle...' and 'Comment tu t'appelles?'.",
      voiceStyle: "friendly, guiding",
      visualCues: ["name tag", "handshake"],
    },
  },
  // Lesson 3
  {
    id: "fr-basics-1-lesson-3",
    unitId: "fr-basics-1",
    title: "S'il vous plaît",
    description: "Learn polite expressions in French.",
    order: 3,
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [
      {
        id: "fr-b1-l3-g1",
        description: "Use polite expressions in French",
        vocabularyIds: ["fr-vocab-sil-vous-plait", "fr-vocab-merci", "fr-vocab-de-rien", "fr-vocab-pardon"],
      },
    ],
    activities: [
      {
        id: "fr-b1-l3-a1",
        type: "vocabulary-intro",
        instruction: "Learn polite French phrases.",
        items: [
          { id: "fr-vocab-sil-vous-plait", word: "S'il vous plaît", translation: "Please (formal)", pronunciation: "seel voo PLEH" },
          { id: "fr-vocab-merci", word: "Merci", translation: "Thank you", pronunciation: "mair-SEE" },
          { id: "fr-vocab-de-rien", word: "De rien", translation: "You're welcome", pronunciation: "duh RYEHN" },
          { id: "fr-vocab-pardon", word: "Pardon", translation: "Excuse me / Sorry", pronunciation: "par-DOHN" },
        ],
      },
      {
        id: "fr-b1-l3-a2",
        type: "fill-blank",
        instruction: "Complete the polite response.",
        sentenceTemplate: "—Merci beaucoup. —_____ rien.",
        correctAnswer: "De",
        acceptableAnswers: ["De", "de"],
        hint: "It's the French way to say 'You're welcome'.",
      },
      {
        id: "fr-b1-l3-a3",
        type: "speak",
        instruction: "Practice saying 'Thank you' in French.",
        prompt: "Say 'Thank you' in French.",
        expectedResponse: "Merci",
        acceptableResponses: ["merci", "merci beaucoup"],
        agentPrompt: "You are a friendly French teacher. Ask the student for something using 'S'il vous plaît', then thank them.",
      },
    ],
    aiTeacherPrompt: {
      contextPrompt: "Teach French polite expressions: s'il vous plaît, merci, de rien, pardon.",
      voiceStyle: "polite, soft-spoken",
      visualCues: ["polite bow", "French café scene"],
    },
  },
  // Lesson 4
  {
    id: "fr-basics-1-lesson-4",
    unitId: "fr-basics-1",
    title: "Où est...?",
    description: "Ask simple questions in French.",
    order: 4,
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [
      {
        id: "fr-b1-l4-g1",
        description: "Ask where things are using 'Où est...?'",
        vocabularyIds: ["fr-vocab-ou-est", "fr-vocab-les-toilettes", "fr-vocab-la-gare"],
      },
    ],
    activities: [
      {
        id: "fr-b1-l4-a1",
        type: "vocabulary-intro",
        instruction: "Learn key question vocabulary.",
        items: [
          { id: "fr-vocab-ou-est", word: "Où est", translation: "Where is", pronunciation: "oo eh" },
          { id: "fr-vocab-les-toilettes", word: "les toilettes", translation: "the bathroom", pronunciation: "leh twah-LET" },
          { id: "fr-vocab-la-gare", word: "la gare", translation: "the train station", pronunciation: "lah gahr" },
        ],
      },
      {
        id: "fr-b1-l4-a2",
        type: "translate",
        instruction: "Translate to French.",
        sourceText: "Where is the bathroom?",
        targetLanguage: "French",
        correctAnswer: "Où sont les toilettes ?",
        acceptableAnswers: ["où sont les toilettes", "ou sont les toilettes", "Où sont les toilettes"],
      },
      {
        id: "fr-b1-l4-a3",
        type: "chat",
        instruction: "Practice asking for directions with the AI tutor.",
        scenario: "You are in Paris and need to find the train station. Ask a local.",
        agentPrompt: "You are a friendly Parisian. The student asks you where the train station is. Respond with 'C'est par là' (It's that way) and point them in the right direction.",
        expectedTopics: ["où est", "la gare", "pardon"],
      },
    ],
    aiTeacherPrompt: {
      contextPrompt: "Teach the student to ask 'Où est...?' for finding places. Practice 'Où sont les toilettes?' and 'Où est la gare?'.",
      voiceStyle: "helpful, directional",
      visualCues: ["map of Paris", "train station sign"],
    },
  },

  // ── German Unit 1: Basics ───────────────────────────────────────────
  // Lesson 1
  {
    id: "de-basics-1-lesson-1",
    unitId: "de-basics-1",
    title: "Hallo!",
    description: "Learn basic German greetings.",
    order: 1,
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [
      {
        id: "de-b1-l1-g1",
        description: "Greet someone in German",
        vocabularyIds: ["de-vocab-hallo", "de-vocab-guten-tag", "de-vocab-tschuss"],
      },
    ],
    activities: [
      {
        id: "de-b1-l1-a1",
        type: "vocabulary-intro",
        instruction: "Tap each word to hear it and learn its meaning.",
        items: [
          { id: "de-vocab-hallo", word: "Hallo", translation: "Hello", pronunciation: "HAH-loh" },
          { id: "de-vocab-guten-tag", word: "Guten Tag", translation: "Good day", pronunciation: "GOO-ten tahk" },
          { id: "de-vocab-tschuss", word: "Tschüss", translation: "Bye", pronunciation: "chews" },
        ],
      },
      {
        id: "de-b1-l1-a2",
        type: "multiple-choice",
        instruction: "What does 'Guten Tag' mean?",
        prompt: "What does 'Guten Tag' mean?",
        options: [
          { id: "de-b1-l1-a2-o1", text: "Good night", isCorrect: false },
          { id: "de-b1-l1-a2-o2", text: "Goodbye", isCorrect: false },
          { id: "de-b1-l1-a2-o3", text: "Good day", isCorrect: true },
          { id: "de-b1-l1-a2-o4", text: "Hello", isCorrect: false },
        ],
      },
      {
        id: "de-b1-l1-a3",
        type: "match-pairs",
        instruction: "Match each German greeting to its meaning.",
        pairs: [
          { id: "de-b1-l1-a3-p1", left: "Hallo", right: "Hello" },
          { id: "de-b1-l1-a3-p2", left: "Guten Tag", right: "Good day" },
          { id: "de-b1-l1-a3-p3", left: "Tschüss", right: "Bye" },
        ],
      },
    ],
    aiTeacherPrompt: {
      contextPrompt: "Teach basic German greetings: Hallo, Guten Tag, Tschüss. German pronunciation is phonetic.",
      voiceStyle: "clear, slightly formal then casual",
      visualCues: ["German flag", "waving hand"],
    },
  },
  // Lesson 2
  {
    id: "de-basics-1-lesson-2",
    unitId: "de-basics-1",
    title: "Ich heiße...",
    description: "Introduce yourself in German.",
    order: 2,
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [
      {
        id: "de-b1-l2-g1",
        description: "Introduce yourself in German",
        vocabularyIds: ["de-vocab-ich-heisse", "de-vocab-wie-heisst-du", "de-vocab-freut-mich"],
      },
    ],
    activities: [
      {
        id: "de-b1-l2-a1",
        type: "vocabulary-intro",
        instruction: "Learn phrases for introductions.",
        items: [
          { id: "de-vocab-ich-heisse", word: "Ich heiße...", translation: "My name is... (I am called...)", pronunciation: "ish HY-suh" },
          { id: "de-vocab-wie-heisst-du", word: "Wie heißt du?", translation: "What's your name?", pronunciation: "vee hyest doo" },
          { id: "de-vocab-freut-mich", word: "Freut mich", translation: "Nice to meet you", pronunciation: "froyt mish" },
        ],
      },
      {
        id: "de-b1-l2-a2",
        type: "translate",
        instruction: "Translate to German.",
        sourceText: "My name is Hans.",
        targetLanguage: "German",
        correctAnswer: "Ich heiße Hans.",
        acceptableAnswers: ["ich heiße hans", "Ich heisse Hans", "ich heisse hans"],
      },
      {
        id: "de-b1-l2-a3",
        type: "listen-repeat",
        instruction: "Listen and repeat.",
        text: "Freut mich",
        translation: "Nice to meet you",
        audioPrompt: "Freut mich",
      },
    ],
  },
  // Lesson 3
  {
    id: "de-basics-1-lesson-3",
    unitId: "de-basics-1",
    title: "Bitte und Danke",
    description: "Learn polite expressions in German.",
    order: 3,
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [
      {
        id: "de-b1-l3-g1",
        description: "Use polite expressions in German",
        vocabularyIds: ["de-vocab-bitte", "de-vocab-danke", "de-vocab-entschuldigung"],
      },
    ],
    activities: [
      {
        id: "de-b1-l3-a1",
        type: "vocabulary-intro",
        instruction: "Learn polite German phrases.",
        items: [
          { id: "de-vocab-bitte", word: "Bitte", translation: "Please / You're welcome", pronunciation: "BIT-tuh" },
          { id: "de-vocab-danke", word: "Danke", translation: "Thank you", pronunciation: "DAHN-kuh" },
          { id: "de-vocab-entschuldigung", word: "Entschuldigung", translation: "Excuse me / Sorry", pronunciation: "ent-SHOOL-dee-goong" },
        ],
      },
      {
        id: "de-b1-l3-a2",
        type: "multiple-choice",
        instruction: "What does 'Bitte' mean?",
        prompt: "What does 'Bitte' mean?",
        options: [
          { id: "de-b1-l3-a2-o1", text: "Thank you", isCorrect: false },
          { id: "de-b1-l3-a2-o2", text: "Please / You're welcome", isCorrect: true },
          { id: "de-b1-l3-a2-o3", text: "Sorry", isCorrect: false },
          { id: "de-b1-l3-a2-o4", text: "Goodbye", isCorrect: false },
        ],
      },
      {
        id: "de-b1-l3-a3",
        type: "speak",
        instruction: "Say 'Thank you' in German.",
        prompt: "How do you say 'Thank you' in German?",
        expectedResponse: "Danke",
        acceptableResponses: ["danke", "danke schön", "Danke schön"],
        agentPrompt: "You are a German teacher. Practice polite exchanges with the student.",
      },
    ],
  },
  // Lesson 4
  {
    id: "de-basics-1-lesson-4",
    unitId: "de-basics-1",
    title: "Wo ist...?",
    description: "Ask simple questions in German.",
    order: 4,
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [
      {
        id: "de-b1-l4-g1",
        description: "Ask where things are using 'Wo ist...?'",
        vocabularyIds: ["de-vocab-wo-ist", "de-vocab-bahnhof", "de-vocab-toilette"],
      },
    ],
    activities: [
      {
        id: "de-b1-l4-a1",
        type: "vocabulary-intro",
        instruction: "Learn question vocabulary.",
        items: [
          { id: "de-vocab-wo-ist", word: "Wo ist", translation: "Where is", pronunciation: "voh ist" },
          { id: "de-vocab-bahnhof", word: "der Bahnhof", translation: "the train station", pronunciation: "dair BAHN-hohf" },
          { id: "de-vocab-toilette", word: "die Toilette", translation: "the bathroom", pronunciation: "dee twah-LET-tuh" },
        ],
      },
      {
        id: "de-b1-l4-a2",
        type: "translate",
        instruction: "Translate to German.",
        sourceText: "Where is the train station?",
        targetLanguage: "German",
        correctAnswer: "Wo ist der Bahnhof?",
        acceptableAnswers: ["wo ist der bahnhof", "Wo ist der Bahnhof", "wo ist der Bahnhof?"],
      },
      {
        id: "de-b1-l4-a3",
        type: "fill-blank",
        instruction: "Fill in the blank.",
        sentenceTemplate: "Wo ist _____ Toilette?",
        correctAnswer: "die",
        acceptableAnswers: ["die"],
        hint: "Toilette is feminine in German, so use 'die'.",
      },
    ],
  },

  // ── Italian Unit 1: Basics ──────────────────────────────────────────
  // Lesson 1
  {
    id: "it-basics-1-lesson-1",
    unitId: "it-basics-1",
    title: "Ciao!",
    description: "Learn basic Italian greetings.",
    order: 1,
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [
      {
        id: "it-b1-l1-g1",
        description: "Greet someone in Italian",
        vocabularyIds: ["it-vocab-ciao", "it-vocab-buongiorno", "it-vocab-arrivederci"],
      },
    ],
    activities: [
      {
        id: "it-b1-l1-a1",
        type: "vocabulary-intro",
        instruction: "Tap each word to hear it and learn its meaning.",
        items: [
          { id: "it-vocab-ciao", word: "Ciao", translation: "Hello / Bye", pronunciation: "CHOW" },
          { id: "it-vocab-buongiorno", word: "Buongiorno", translation: "Good morning", pronunciation: "bwohn-JOHR-noh" },
          { id: "it-vocab-arrivederci", word: "Arrivederci", translation: "Goodbye", pronunciation: "ah-ree-veh-DAIR-chee" },
        ],
      },
      {
        id: "it-b1-l1-a2",
        type: "multiple-choice",
        instruction: "What does 'Buongiorno' mean?",
        prompt: "What does 'Buongiorno' mean?",
        options: [
          { id: "it-b1-l1-a2-o1", text: "Good evening", isCorrect: false },
          { id: "it-b1-l1-a2-o2", text: "Goodbye", isCorrect: false },
          { id: "it-b1-l1-a2-o3", text: "Good morning", isCorrect: true },
          { id: "it-b1-l1-a2-o4", text: "Hello", isCorrect: false },
        ],
      },
      {
        id: "it-b1-l1-a3",
        type: "match-pairs",
        instruction: "Match each Italian greeting to its meaning.",
        pairs: [
          { id: "it-b1-l1-a3-p1", left: "Ciao", right: "Hello" },
          { id: "it-b1-l1-a3-p2", left: "Buongiorno", right: "Good morning" },
          { id: "it-b1-l1-a3-p3", left: "Arrivederci", right: "Goodbye" },
        ],
      },
    ],
    aiTeacherPrompt: {
      contextPrompt: "Teach basic Italian greetings. Italian is very phonetic and musical.",
      voiceStyle: "melodic, warm, Italian-accented English",
      visualCues: ["Italian flag", "hand gesture"],
    },
  },
  // Lesson 2
  {
    id: "it-basics-1-lesson-2",
    unitId: "it-basics-1",
    title: "Mi chiamo...",
    description: "Introduce yourself in Italian.",
    order: 2,
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [
      {
        id: "it-b1-l2-g1",
        description: "Introduce yourself in Italian",
        vocabularyIds: ["it-vocab-mi-chiamo", "it-vocab-come-ti-chiami", "it-vocab-piacere"],
      },
    ],
    activities: [
      {
        id: "it-b1-l2-a1",
        type: "vocabulary-intro",
        instruction: "Learn introduction phrases.",
        items: [
          { id: "it-vocab-mi-chiamo", word: "Mi chiamo...", translation: "My name is...", pronunciation: "mee KYAH-moh" },
          { id: "it-vocab-come-ti-chiami", word: "Come ti chiami?", translation: "What's your name?", pronunciation: "KOH-meh tee KYAH-mee" },
          { id: "it-vocab-piacere", word: "Piacere", translation: "Nice to meet you", pronunciation: "pyah-CHEH-reh" },
        ],
      },
      {
        id: "it-b1-l2-a2",
        type: "translate",
        instruction: "Translate to Italian.",
        sourceText: "My name is Sofia.",
        targetLanguage: "Italian",
        correctAnswer: "Mi chiamo Sofia.",
        acceptableAnswers: ["mi chiamo sofia", "Mi chiamo Sofia", "mi chiamo Sofia"],
      },
      {
        id: "it-b1-l2-a3",
        type: "listen-repeat",
        instruction: "Listen and repeat.",
        text: "Piacere",
        translation: "Nice to meet you",
        audioPrompt: "Piacere",
      },
    ],
  },
  // Lesson 3
  {
    id: "it-basics-1-lesson-3",
    unitId: "it-basics-1",
    title: "Per favore",
    description: "Learn polite expressions in Italian.",
    order: 3,
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [
      {
        id: "it-b1-l3-g1",
        description: "Use polite expressions in Italian",
        vocabularyIds: ["it-vocab-per-favore", "it-vocab-grazie", "it-vocab-prego", "it-vocab-scusa"],
      },
    ],
    activities: [
      {
        id: "it-b1-l3-a1",
        type: "vocabulary-intro",
        instruction: "Learn polite Italian phrases.",
        items: [
          { id: "it-vocab-per-favore", word: "Per favore", translation: "Please", pronunciation: "pair fah-VOH-reh" },
          { id: "it-vocab-grazie", word: "Grazie", translation: "Thank you", pronunciation: "GRAHT-see-eh" },
          { id: "it-vocab-prego", word: "Prego", translation: "You're welcome", pronunciation: "PREH-goh" },
          { id: "it-vocab-scusa", word: "Scusa", translation: "Excuse me / Sorry (informal)", pronunciation: "SKOO-zah" },
        ],
      },
      {
        id: "it-b1-l3-a2",
        type: "fill-blank",
        instruction: "Complete the Italian phrase.",
        sentenceTemplate: "_____. —Grazie. —Prego.",
        correctAnswer: "Per favore",
        acceptableAnswers: ["Per favore", "per favore"],
        hint: "The polite word for 'please'.",
      },
      {
        id: "it-b1-l3-a3",
        type: "speak",
        instruction: "Say 'Thank you' in Italian.",
        prompt: "How do you say 'Thank you' in Italian?",
        expectedResponse: "Grazie",
        acceptableResponses: ["grazie", "grazie mille"],
        agentPrompt: "You are an Italian teacher. Practice polite exchanges with the student.",
      },
    ],
  },
  // Lesson 4
  {
    id: "it-basics-1-lesson-4",
    unitId: "it-basics-1",
    title: "Dov'è...?",
    description: "Ask simple questions in Italian.",
    order: 4,
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [
      {
        id: "it-b1-l4-g1",
        description: "Ask where things are using 'Dov'è...?'",
        vocabularyIds: ["it-vocab-dove", "it-vocab-stazione", "it-vocab-bagno"],
      },
    ],
    activities: [
      {
        id: "it-b1-l4-a1",
        type: "vocabulary-intro",
        instruction: "Learn question vocabulary.",
        items: [
          { id: "it-vocab-dove", word: "Dov'è", translation: "Where is", pronunciation: "doh-VEH" },
          { id: "it-vocab-stazione", word: "la stazione", translation: "the train station", pronunciation: "lah stah-TSYOH-neh" },
          { id: "it-vocab-bagno", word: "il bagno", translation: "the bathroom", pronunciation: "eel BAH-nyoh" },
        ],
      },
      {
        id: "it-b1-l4-a2",
        type: "translate",
        instruction: "Translate to Italian.",
        sourceText: "Where is the bathroom?",
        targetLanguage: "Italian",
        correctAnswer: "Dov'è il bagno?",
        acceptableAnswers: ["dov'è il bagno", "dove il bagno", "Dov'è il bagno", "dov'è il bagno?"],
      },
      {
        id: "it-b1-l4-a3",
        type: "chat",
        instruction: "Practice asking for directions with the AI tutor.",
        scenario: "You are in Rome and need to find the train station.",
        agentPrompt: "You are a friendly Roman. The student asks where the train station is. Respond helpfully in Italian then switch to English if needed.",
        expectedTopics: ["dov'è", "stazione", "per favore"],
      },
    ],
  },
];

export function getLessonsByUnit(unitId: string): Lesson[] {
  return lessons.filter((lesson) => lesson.unitId === unitId);
}

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

export function getLessonsByUnitIds(unitIds: string[]): Lesson[] {
  return lessons.filter((lesson) => unitIds.includes(lesson.unitId));
}
