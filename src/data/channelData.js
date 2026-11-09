import shortsRaw from './shortsData.json';

export const channelInfo = {
  name: "Mallu. PY",
  brandName: "Mallu.PY",
  handle: "@mallupy05",
  tagline: "Coding Padikkan Ith Mathi! 🚀",
  subTagline: "High-impact Python programming tutorials, computer science concepts, and eye-opening tech secrets — explained simply in Malayalam.",
  malayalamTag: "മലയാളത്തിൽ Python പഠിക്കാം",
  bio: "We break down complex Python syntax, coding logic, and hidden digital mechanics into simple, relatable Malayalam tutorials. From zero programming knowledge to writing production-ready code.",
  channelUrl: "https://www.youtube.com/@mallupy05",
  subscribeUrl: "https://www.youtube.com/@mallupy05?sub_confirmation=1",
  buyMeACoffeeUrl: "https://buymeacoffee.com/mallupy",
  githubRepoUrl: "https://github.com/mallupy/Zero-2-Hero",
  githubRepoName: "mallupy/Zero-2-Hero",
  profileImg: "/profile.jpg",
  stats: {
    videosCount: "16+",
    shortsCount: "54+",
    hoursOfContent: "6+ Hrs",
    curriculum: "16 Days"
  }
};

export const learningRoadmap = [
  {
    phase: 1,
    title: "Phase 1: Zero to Code Setup",
    subtitle: "Mindset, problem breakdown, tools, and variables",
    days: "Days 1 - 4",
    color: "from-blue-500/20 to-cyan-500/10 border-blue-500/30",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    topics: ["Why Python", "Flowcharts & Algorithms", "VS Code & Python 3 Setup", "Datatypes & Operators"]
  },
  {
    phase: 2,
    title: "Phase 2: Decisions & Branching",
    subtitle: "Conditional statements and algorithmic decision paths",
    days: "Days 5 - 7",
    color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    topics: ["Sequential Problems", "if-elif-else logic", "Real-world Decision Challenges"]
  },
  {
    phase: 3,
    title: "Phase 3: Iterations & Pattern Mastery",
    subtitle: "Loops, series, and visual pattern generation",
    days: "Days 8 - 11",
    color: "from-amber-500/20 to-yellow-500/10 border-yellow-500/30",
    badgeColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    topics: ["For & While Loops", "Math & Number Series", "Pattern Generation & Nested Loops"]
  },
  {
    phase: 4,
    title: "Phase 4: Python Data Structures",
    subtitle: "Mastering Lists, Tuples, Sets, and Dictionaries",
    days: "Days 12 - 16",
    color: "from-purple-500/20 to-pink-500/10 border-purple-500/30",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    topics: ["List Slicing & Methods", "List Comprehension & 2D Arrays", "Tuples & Immutability", "Sets & Dictionaries"]
  }
];

export const longVideos = [
  {
    id: "USPX90HCnbI",
    day: 1,
    title: "🛑 STOP CODING! And Watch This First | Python ZERO 2 HERO Part 1",
    description: "The essential beginning to your programming journey. Understand the philosophy of programming, what Python is capable of, and how to develop a developer mindset before typing a single line of code.",
    duration: "17:30",
    category: "Mindset & Intro",
    tags: ["Philosophy", "Beginner", "Roadmap"],
    thumbnail: "https://i.ytimg.com/vi/USPX90HCnbI/maxresdefault.jpg",
    fallbackThumbnail: "https://i.ytimg.com/vi/USPX90HCnbI/hqdefault.jpg",
    keyTakeaway: "Understand how computers think before writing code."
  },
  {
    id: "nX9DQyLdiiI",
    day: 2,
    title: "From Algorithm to Programs | Python ZERO 2 HERO Part 2",
    description: "Learn how to break down complex real-world logic into clean algorithms and flowcharts. Master computational thinking before moving into Python syntax.",
    duration: "17:01",
    category: "Logic & Algorithms",
    tags: ["Algorithms", "Flowcharts", "Logic Building"],
    thumbnail: "https://i.ytimg.com/vi/nX9DQyLdiiI/maxresdefault.jpg",
    fallbackThumbnail: "https://i.ytimg.com/vi/nX9DQyLdiiI/hqdefault.jpg",
    keyTakeaway: "Algorithms turn human thoughts into programmable instructions."
  },
  {
    id: "zKUQ-KSApyg",
    day: 3,
    title: "Install Everything | Python ZERO 2 HERO Part 3",
    description: "Complete installation guide for Python 3 and VS Code editor. Discover must-have extensions, environment paths, terminal navigation, and your very first 'Hello World'.",
    duration: "15:01",
    category: "Dev Environment",
    tags: ["Setup", "VS Code", "Hello World"],
    thumbnail: "https://i.ytimg.com/vi/zKUQ-KSApyg/maxresdefault.jpg",
    fallbackThumbnail: "https://i.ytimg.com/vi/zKUQ-KSApyg/hqdefault.jpg",
    keyTakeaway: "Set up the modern developer toolkit for a friction-free coding experience."
  },
  {
    id: "KfM206V_X4k",
    day: 4,
    title: "🛑 STOP THINKING! START CODING! Datatypes & Operators | Part 4",
    description: "Deep dive into Python primitives: integers, floats, strings, booleans, type casting, arithmetic, comparison, and logical operators explained with vivid everyday analogies.",
    duration: "24:31",
    category: "Core Syntax",
    tags: ["Data Types", "Operators", "Variables"],
    thumbnail: "https://i.ytimg.com/vi/KfM206V_X4k/maxresdefault.jpg",
    fallbackThumbnail: "https://i.ytimg.com/vi/KfM206V_X4k/hqdefault.jpg",
    keyTakeaway: "Variables are labeled boxes; operators are machines transforming data."
  },
  {
    id: "pNsV567eX4Y",
    day: 5,
    title: "Sequential Problems... | Python Zero 2 Hero | Day 5",
    description: "Practice solving straightforward sequential problems: calculating areas, simple interest, temperature conversion, and formatting output cleanly with f-strings.",
    duration: "22:51",
    category: "Problem Solving",
    tags: ["Practice", "f-strings", "Math Problems"],
    thumbnail: "https://i.ytimg.com/vi/pNsV567eX4Y/maxresdefault.jpg",
    fallbackThumbnail: "https://i.ytimg.com/vi/pNsV567eX4Y/hqdefault.jpg",
    keyTakeaway: "Step-by-step problem execution without branching."
  },
  {
    id: "Y1vI1DmbLRk",
    day: 6,
    title: "The if-elif-else Block | Python Zero2Hero Day 6",
    description: "Master branching logic! Explore conditional expressions, indentation rules in Python, and how to create complex decision hierarchies using if, elif, and else.",
    duration: "17:00",
    category: "Control Flow",
    tags: ["Conditionals", "if-else", "Indentation"],
    thumbnail: "https://i.ytimg.com/vi/Y1vI1DmbLRk/maxresdefault.jpg",
    fallbackThumbnail: "https://i.ytimg.com/vi/Y1vI1DmbLRk/hqdefault.jpg",
    keyTakeaway: "Python indentation defines code blocks cleanly."
  },
  {
    id: "pnChjRxZ0M0",
    day: 7,
    title: "Decision Problems | if-else Block | ZERO 2 HERO Day 7",
    description: "Hands-on problem solving with decision trees: leap year calculators, triangle validity, BMI checkers, and grading systems.",
    duration: "24:21",
    category: "Problem Solving",
    tags: ["Challenges", "Branching", "Practice"],
    thumbnail: "https://i.ytimg.com/vi/pnChjRxZ0M0/maxresdefault.jpg",
    fallbackThumbnail: "https://i.ytimg.com/vi/pnChjRxZ0M0/hqdefault.jpg",
    keyTakeaway: "Test boundary conditions carefully when writing boolean tests."
  },
  {
    id: "MSw6TPwBIq8",
    day: 8,
    title: "Looping | for and while | Python ZERO 2 HERO Day 8",
    description: "Unlock the real superpower of computers: repeating tasks tirelessly! Understand the difference between counting loops (for) and condition-based loops (while), plus range().",
    duration: "24:21",
    category: "Loops & Iteration",
    tags: ["for loop", "while loop", "range()"],
    thumbnail: "https://i.ytimg.com/vi/MSw6TPwBIq8/maxresdefault.jpg",
    fallbackThumbnail: "https://i.ytimg.com/vi/MSw6TPwBIq8/hqdefault.jpg",
    keyTakeaway: "Use 'for' when the count is known, 'while' when waiting for an event."
  },
  {
    id: "EVDzq5N3P_o",
    day: 9,
    title: "Looping Problems PART 1 | Python ZERO 2 HERO | Day 9",
    description: "Core algorithm challenges with loops: summing natural numbers, reversing digits, palindrome numbers, and checking prime numbers.",
    duration: "16:51",
    category: "Problem Solving",
    tags: ["Algorithms", "Math", "Number Theory"],
    thumbnail: "https://i.ytimg.com/vi/EVDzq5N3P_o/maxresdefault.jpg",
    fallbackThumbnail: "https://i.ytimg.com/vi/EVDzq5N3P_o/hqdefault.jpg",
    keyTakeaway: "Modulo (%) and integer division (//) unlock digit extraction."
  },
  {
    id: "mNxY1hD7lfs",
    day: 10,
    title: "Looping Problems PART 2 | Python ZERO 2 HERO Day 10",
    description: "Part 2 of loop challenges: Fibonacci numbers, nested loop basics, table generators, and factorials.",
    duration: "21:01",
    category: "Problem Solving",
    tags: ["Fibonacci", "Factorial", "Loops"],
    thumbnail: "https://i.ytimg.com/vi/mNxY1hD7lfs/maxresdefault.jpg",
    fallbackThumbnail: "https://i.ytimg.com/vi/mNxY1hD7lfs/hqdefault.jpg",
    keyTakeaway: "Fibonacci teaches state variables moving forward step-by-step."
  },
  {
    id: "gGiakX58A3E",
    day: 11,
    title: "Looping Problems PART 3 | Pattern Generation | Day 11",
    description: "Master pattern printing in Python! Right-angled triangles, pyramids, inverted triangles, diamond shapes, and number grids using nested loops.",
    duration: "35:01",
    category: "Pattern Generation",
    tags: ["Nested Loops", "Pyramids", "Patterns"],
    thumbnail: "https://i.ytimg.com/vi/gGiakX58A3E/maxresdefault.jpg",
    fallbackThumbnail: "https://i.ytimg.com/vi/gGiakX58A3E/hqdefault.jpg",
    keyTakeaway: "Outer loop controls rows; inner loop controls characters in each row."
  },
  {
    id: "L7yb8K3yaLg",
    day: 12,
    title: "Lists in Python PART 1 | Python ZERO 2 HERO Day 12",
    description: "Welcome to Python Data Structures! Learn list creation, indexing, negative indexing, slice notation [start:stop:step], append(), and insert().",
    duration: "26:00",
    category: "Data Structures",
    tags: ["Lists", "Slicing", "Indexing"],
    thumbnail: "https://i.ytimg.com/vi/L7yb8K3yaLg/maxresdefault.jpg",
    fallbackThumbnail: "https://i.ytimg.com/vi/L7yb8K3yaLg/hqdefault.jpg",
    keyTakeaway: "Lists are dynamic, zero-indexed mutable arrays in Python."
  },
  {
    id: "wOWhEY-uRE8",
    day: 13,
    title: "Working with Lists PART 2 | Python ZERO 2 HERO Day 13",
    description: "Advanced list methods: pop, remove, sort, reverse, list comprehension syntax, copy vs reference, and matrix / nested list operations.",
    duration: "20:31",
    category: "Data Structures",
    tags: ["List Comprehension", "Sorting", "Matrices"],
    thumbnail: "https://i.ytimg.com/vi/wOWhEY-uRE8/maxresdefault.jpg",
    fallbackThumbnail: "https://i.ytimg.com/vi/wOWhEY-uRE8/hqdefault.jpg",
    keyTakeaway: "List comprehension provides clean one-liners for data transformation."
  },
  {
    id: "8zl_VorJzUI",
    day: 14,
    title: "Lists in Python Problems | Python Zero2Hero Day 14",
    description: "Solve popular technical interview questions on lists: finding second largest number, removing duplicates, linear search, and list rotations.",
    duration: "22:55",
    category: "Problem Solving",
    tags: ["Interview Questions", "Search", "Optimization"],
    thumbnail: "https://i.ytimg.com/vi/8zl_VorJzUI/maxresdefault.jpg",
    fallbackThumbnail: "https://i.ytimg.com/vi/8zl_VorJzUI/hqdefault.jpg",
    keyTakeaway: "Building intuition for list traversals prepares you for coding interviews."
  },
  {
    id: "Av9gR_NS5O8",
    day: 15,
    title: "Tuples in Python | Python Zero to Hero Day 15",
    description: "Explore immutable sequences with Python Tuples. Understand why immutability matters for security, memory optimization, and tuple packing/unpacking.",
    duration: "14:41",
    category: "Data Structures",
    tags: ["Tuples", "Immutability", "Unpacking"],
    thumbnail: "https://i.ytimg.com/vi/Av9gR_NS5O8/maxresdefault.jpg",
    fallbackThumbnail: "https://i.ytimg.com/vi/Av9gR_NS5O8/hqdefault.jpg",
    keyTakeaway: "Tuples protect data from accidental modification."
  },
  {
    id: "MtYHDzeJ3Kg",
    day: 16,
    title: "Sets & Dictionaries in Python | Python Zero2Hero Day 16",
    description: "Master fast O(1) hash table lookups with Dictionaries (keys & values) and unique collection mathematics with Sets (unions, intersections, differences).",
    duration: "29:21",
    category: "Data Structures",
    tags: ["Dictionaries", "Sets", "Hash Maps"],
    thumbnail: "https://i.ytimg.com/vi/MtYHDzeJ3Kg/maxresdefault.jpg",
    fallbackThumbnail: "https://i.ytimg.com/vi/MtYHDzeJ3Kg/hqdefault.jpg",
    keyTakeaway: "Dictionaries are the backbone of Python applications and JSON parsing."
  }
];

export const shortsList = shortsRaw;

export const codeSnippets = [
  {
    id: "swap-var",
    title: "Swap 2 Variables (3 Ways)",
    category: "Code Hacks",
    series: "Code Hacks Day 1",
    code: `# Method 1: The Pythonic Way (Tuple Unpacking)
a, b = 10, 20
a, b = b, a
print(f"Pythonic: a={a}, b={b}")

# Method 2: Arithmetic (No 3rd Variable)
x, y = 5, 15
x = x + y  # 20
y = x - y  # 5
x = x - y  # 15
print(f"Math: x={x}, y={y}")

# Method 3: Bitwise XOR
m, n = 3, 7
m ^= n
n ^= m
m ^= n
print(f"XOR: m={m}, n={n}")`,
    output: `Pythonic: a=20, b=10
Math: x=15, y=5
XOR: m=7, n=3`
  },
  {
    id: "list-comp",
    title: "List Comprehension Magic",
    category: "Data Structures",
    series: "Python Zero to Hero Day 13",
    code: `# Create a list of squares of even numbers
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Standard approach vs List Comprehension
even_squares = [n**2 for n in numbers if n % 2 == 0]

print("Even squares:", even_squares)

# Malayalam words list uppercase
words = ["python", "kerala", "mallu", "code"]
shout = [w.upper() + "!" for w in words]
print("Shouting:", shout)`,
    output: `Even squares: [4, 16, 36, 64, 100]
Shouting: ['PYTHON!', 'KERALA!', 'MALLU!', 'CODE!']`
  },
  {
    id: "dict-ops",
    title: "Fast Frequency Counter with Dict",
    category: "Data Structures",
    series: "Python Zero to Hero Day 16",
    code: `text = "mallu python learner code like a pro"
freq = {}

for char in text:
    if char != " ":
        freq[char] = freq.get(char, 0) + 1

# Top 3 most frequent letters
sorted_freq = sorted(freq.items(), key=lambda x: x[1], reverse=True)[:3]
for letter, count in sorted_freq:
    print(f"Character '{letter}' appears {count} times")`,
    output: `Character 'l' appears 4 times
Character 'e' appears 3 times
Character 'a' appears 3 times`
  },
  {
    id: "pattern-gen",
    title: "Pyramid Star Pattern",
    category: "Patterns",
    series: "Python Zero to Hero Day 11",
    code: `rows = 5
for i in range(1, rows + 1):
    # Spaces + Stars
    spaces = " " * (rows - i)
    stars = "*" * (2 * i - 1)
    print(spaces + stars)`,
    output: `    *
   ***
  *****
 *******
*********`
  }
];

export const faqs = [
  {
    q: "Is prior coding experience required to start the Zero to Hero series?",
    a: "None at all! The series is designed completely from scratch for beginners in Malayalam. Day 1 starts with how a computer interprets logic, and progresses naturally to advanced data structures."
  },
  {
    q: "Where do I ask my doubts while watching your videos?",
    a: "You can comment directly under any YouTube video on @mallupy05, or reach out through our community links. We respond to learner queries and code debugging doubts regularly!"
  },
  {
    q: "What makes Mallu. PY different from other Malayalam tutorials?",
    a: "We focus on real algorithmic intuition rather than rote code typing. With bite-sized tech shorts (like 'Behind a Click' and 'Ningal Pattikkapedukayan'), you also learn computer networks, scam awareness, and developer secrets."
  },
  {
    q: "How can I support the channel?",
    a: "Subscribing, sharing with fellow Malayalam students & developers, and leaving likes is the best way! You can also support the creator via Buy Me a Coffee (buymeacoffee.com/mallupy)."
  }
];

