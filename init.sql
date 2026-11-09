-- ====================================================================
-- Mallu.PY Official Supabase Database Schema & Seed Script
-- Target: PostgreSQL / Supabase SQL Editor
-- Channel: Mallu. PY (@mallupy05)
-- ====================================================================

-- 1. DDL: Create Tables
CREATE TABLE IF NOT EXISTS long_videos (
    id VARCHAR(50) PRIMARY KEY,
    day INT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    duration VARCHAR(20),
    category VARCHAR(100),
    tags TEXT[],
    thumbnail TEXT,
    fallback_thumbnail TEXT,
    key_takeaway TEXT,
    publish_date TIMESTAMPTZ,
    show_as_upcoming BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS shorts (
    id VARCHAR(50) PRIMARY KEY,
    title TEXT NOT NULL,
    views INT DEFAULT 0,
    category VARCHAR(100),
    thumbnail TEXT,
    publish_date TIMESTAMPTZ,
    show_as_upcoming BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS roadmap_phases (
    phase INT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    days VARCHAR(50),
    topics TEXT[],
    color TEXT,
    badge_color TEXT,
    publish_date TIMESTAMPTZ,
    show_as_upcoming BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS code_snippets (
    id VARCHAR(50) PRIMARY KEY,
    title TEXT NOT NULL,
    category VARCHAR(100),
    series VARCHAR(100),
    code TEXT NOT NULL,
    output TEXT NOT NULL,
    publish_date TIMESTAMPTZ,
    show_as_upcoming BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Security: Row Level Security (RLS)
ALTER TABLE long_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE shorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadmap_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE code_snippets ENABLE ROW LEVEL SECURITY;

-- Public Read Access
DROP POLICY IF EXISTS "Public read long_videos" ON long_videos;
CREATE POLICY "Public read long_videos" ON long_videos FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read shorts" ON shorts;
CREATE POLICY "Public read shorts" ON shorts FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read roadmap_phases" ON roadmap_phases;
CREATE POLICY "Public read roadmap_phases" ON roadmap_phases FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read code_snippets" ON code_snippets;
CREATE POLICY "Public read code_snippets" ON code_snippets FOR SELECT USING (true);

-- Full access for authenticated/admin operations
DROP POLICY IF EXISTS "Full access long_videos" ON long_videos;
CREATE POLICY "Full access long_videos" ON long_videos FOR ALL USING (true);
DROP POLICY IF EXISTS "Full access shorts" ON shorts;
CREATE POLICY "Full access shorts" ON shorts FOR ALL USING (true);
DROP POLICY IF EXISTS "Full access roadmap_phases" ON roadmap_phases;
CREATE POLICY "Full access roadmap_phases" ON roadmap_phases FOR ALL USING (true);
DROP POLICY IF EXISTS "Full access code_snippets" ON code_snippets;
CREATE POLICY "Full access code_snippets" ON code_snippets FOR ALL USING (true);

-- 3. SEED DATA
-- Clear existing seed rows to prevent duplicate key errors
TRUNCATE TABLE long_videos CASCADE;
TRUNCATE TABLE shorts CASCADE;
TRUNCATE TABLE roadmap_phases CASCADE;
TRUNCATE TABLE code_snippets CASCADE;

-- Insert Long Videos (16 Lessons)
INSERT INTO long_videos (id, day, title, description, duration, category, tags, thumbnail, fallback_thumbnail, key_takeaway) VALUES
('USPX90HCnbI', 1, '🛑 STOP CODING! And Watch This First | Python ZERO 2 HERO Part 1', 'The essential beginning to your programming journey. Understand the philosophy of programming, what Python is capable of, and how to develop a developer mindset before typing a single line of code.', '17:30', 'Mindset & Intro', ARRAY['Philosophy', 'Beginner', 'Roadmap'], 'https://i.ytimg.com/vi/USPX90HCnbI/maxresdefault.jpg', 'https://i.ytimg.com/vi/USPX90HCnbI/hqdefault.jpg', 'Understand how computers think before writing code.'),
('nX9DQyLdiiI', 2, 'From Algorithm to Programs | Python ZERO 2 HERO Part 2', 'Learn how to break down complex real-world logic into clean algorithms and flowcharts. Master computational thinking before moving into Python syntax.', '17:01', 'Logic & Algorithms', ARRAY['Algorithms', 'Flowcharts', 'Logic Building'], 'https://i.ytimg.com/vi/nX9DQyLdiiI/maxresdefault.jpg', 'https://i.ytimg.com/vi/nX9DQyLdiiI/hqdefault.jpg', 'Algorithms turn human thoughts into programmable instructions.'),
('zKUQ-KSApyg', 3, 'Install Everything | Python ZERO 2 HERO Part 3', 'Complete installation guide for Python 3 and VS Code editor. Discover must-have extensions, environment paths, terminal navigation, and your very first ''Hello World''.', '15:01', 'Dev Environment', ARRAY['Setup', 'VS Code', 'Hello World'], 'https://i.ytimg.com/vi/zKUQ-KSApyg/maxresdefault.jpg', 'https://i.ytimg.com/vi/zKUQ-KSApyg/hqdefault.jpg', 'Set up the modern developer toolkit for a friction-free coding experience.'),
('KfM206V_X4k', 4, '🛑 STOP THINKING! START CODING! Datatypes & Operators | Part 4', 'Deep dive into Python primitives: integers, floats, strings, booleans, type casting, arithmetic, comparison, and logical operators explained with vivid everyday analogies.', '24:31', 'Core Syntax', ARRAY['Data Types', 'Operators', 'Variables'], 'https://i.ytimg.com/vi/KfM206V_X4k/maxresdefault.jpg', 'https://i.ytimg.com/vi/KfM206V_X4k/hqdefault.jpg', 'Variables are labeled boxes; operators are machines transforming data.'),
('pNsV567eX4Y', 5, 'Sequential Problems... | Python Zero 2 Hero | Day 5', 'Practice solving straightforward sequential problems: calculating areas, simple interest, temperature conversion, and formatting output cleanly with f-strings.', '22:51', 'Problem Solving', ARRAY['Practice', 'f-strings', 'Math Problems'], 'https://i.ytimg.com/vi/pNsV567eX4Y/maxresdefault.jpg', 'https://i.ytimg.com/vi/pNsV567eX4Y/hqdefault.jpg', 'Step-by-step problem execution without branching.'),
('Y1vI1DmbLRk', 6, 'The if-elif-else Block | Python Zero2Hero Day 6', 'Master branching logic! Explore conditional expressions, indentation rules in Python, and how to create complex decision hierarchies using if, elif, and else.', '17:00', 'Control Flow', ARRAY['Conditionals', 'if-else', 'Indentation'], 'https://i.ytimg.com/vi/Y1vI1DmbLRk/maxresdefault.jpg', 'https://i.ytimg.com/vi/Y1vI1DmbLRk/hqdefault.jpg', 'Python indentation defines code blocks cleanly.'),
('pnChjRxZ0M0', 7, 'Decision Problems | if-else Block | ZERO 2 HERO Day 7', 'Hands-on problem solving with decision trees: leap year calculators, triangle validity, BMI checkers, and grading systems.', '24:21', 'Problem Solving', ARRAY['Challenges', 'Branching', 'Practice'], 'https://i.ytimg.com/vi/pnChjRxZ0M0/maxresdefault.jpg', 'https://i.ytimg.com/vi/pnChjRxZ0M0/hqdefault.jpg', 'Test boundary conditions carefully when writing boolean tests.'),
('MSw6TPwBIq8', 8, 'Looping | for and while | Python ZERO 2 HERO Day 8', 'Unlock the real superpower of computers: repeating tasks tirelessly! Understand the difference between counting loops (for) and condition-based loops (while), plus range().', '24:21', 'Loops & Iteration', ARRAY['for loop', 'while loop', 'range()'], 'https://i.ytimg.com/vi/MSw6TPwBIq8/maxresdefault.jpg', 'https://i.ytimg.com/vi/MSw6TPwBIq8/hqdefault.jpg', 'Use ''for'' when the count is known, ''while'' when waiting for an event.'),
('EVDzq5N3P_o', 9, 'Looping Problems PART 1 | Python ZERO 2 HERO | Day 9', 'Core algorithm challenges with loops: summing natural numbers, reversing digits, palindrome numbers, and checking prime numbers.', '16:51', 'Problem Solving', ARRAY['Algorithms', 'Math', 'Number Theory'], 'https://i.ytimg.com/vi/EVDzq5N3P_o/maxresdefault.jpg', 'https://i.ytimg.com/vi/EVDzq5N3P_o/hqdefault.jpg', 'Modulo (%) and integer division (//) unlock digit extraction.'),
('mNxY1hD7lfs', 10, 'Looping Problems PART 2 | Python ZERO 2 HERO Day 10', 'Part 2 of loop challenges: Fibonacci numbers, nested loop basics, table generators, and factorials.', '21:01', 'Problem Solving', ARRAY['Fibonacci', 'Factorial', 'Loops'], 'https://i.ytimg.com/vi/mNxY1hD7lfs/maxresdefault.jpg', 'https://i.ytimg.com/vi/mNxY1hD7lfs/hqdefault.jpg', 'Fibonacci teaches state variables moving forward step-by-step.'),
('gGiakX58A3E', 11, 'Looping Problems PART 3 | Pattern Generation | Day 11', 'Master pattern printing in Python! Right-angled triangles, pyramids, inverted triangles, diamond shapes, and number grids using nested loops.', '35:01', 'Pattern Generation', ARRAY['Nested Loops', 'Pyramids', 'Patterns'], 'https://i.ytimg.com/vi/gGiakX58A3E/maxresdefault.jpg', 'https://i.ytimg.com/vi/gGiakX58A3E/hqdefault.jpg', 'Outer loop controls rows; inner loop controls characters in each row.'),
('L7yb8K3yaLg', 12, 'Lists in Python PART 1 | Python ZERO 2 HERO Day 12', 'Welcome to Python Data Structures! Learn list creation, indexing, negative indexing, slice notation [start:stop:step], append(), and insert().', '26:00', 'Data Structures', ARRAY['Lists', 'Slicing', 'Indexing'], 'https://i.ytimg.com/vi/L7yb8K3yaLg/maxresdefault.jpg', 'https://i.ytimg.com/vi/L7yb8K3yaLg/hqdefault.jpg', 'Lists are dynamic, zero-indexed mutable arrays in Python.'),
('wOWhEY-uRE8', 13, 'Working with Lists PART 2 | Python ZERO 2 HERO Day 13', 'Advanced list methods: pop, remove, sort, reverse, list comprehension syntax, copy vs reference, and matrix / nested list operations.', '20:31', 'Data Structures', ARRAY['List Comprehension', 'Sorting', 'Matrices'], 'https://i.ytimg.com/vi/wOWhEY-uRE8/maxresdefault.jpg', 'https://i.ytimg.com/vi/wOWhEY-uRE8/hqdefault.jpg', 'List comprehension provides clean one-liners for data transformation.'),
('8zl_VorJzUI', 14, 'Lists in Python Problems | Python Zero2Hero Day 14', 'Solve popular technical interview questions on lists: finding second largest number, removing duplicates, linear search, and list rotations.', '22:55', 'Problem Solving', ARRAY['Interview Questions', 'Search', 'Optimization'], 'https://i.ytimg.com/vi/8zl_VorJzUI/maxresdefault.jpg', 'https://i.ytimg.com/vi/8zl_VorJzUI/hqdefault.jpg', 'Building intuition for list traversals prepares you for coding interviews.'),
('Av9gR_NS5O8', 15, 'Tuples in Python | Python Zero to Hero Day 15', 'Explore immutable sequences with Python Tuples. Understand why immutability matters for security, memory optimization, and tuple packing/unpacking.', '14:41', 'Data Structures', ARRAY['Tuples', 'Immutability', 'Unpacking'], 'https://i.ytimg.com/vi/Av9gR_NS5O8/maxresdefault.jpg', 'https://i.ytimg.com/vi/Av9gR_NS5O8/hqdefault.jpg', 'Tuples protect data from accidental modification.'),
('MtYHDzeJ3Kg', 16, 'Sets & Dictionaries in Python | Python Zero2Hero Day 16', 'Master fast O(1) hash table lookups with Dictionaries (keys & values) and unique collection mathematics with Sets (unions, intersections, differences).', '29:21', 'Data Structures', ARRAY['Dictionaries', 'Sets', 'Hash Maps'], 'https://i.ytimg.com/vi/MtYHDzeJ3Kg/maxresdefault.jpg', 'https://i.ytimg.com/vi/MtYHDzeJ3Kg/hqdefault.jpg', 'Dictionaries are the backbone of Python applications and JSON parsing.');

-- Insert Roadmap Phases (4 Phases)
INSERT INTO roadmap_phases (phase, title, subtitle, days, topics, color, badge_color) VALUES
(1, 'Phase 1: Zero to Code Setup', 'Mindset, problem breakdown, tools, and variables', 'Days 1 - 4', ARRAY['Why Python', 'Flowcharts & Algorithms', 'VS Code & Python 3 Setup', 'Datatypes & Operators'], 'from-blue-500/20 to-cyan-500/10 border-blue-500/30', 'bg-blue-500/10 text-blue-400 border-blue-500/30'),
(2, 'Phase 2: Decisions & Branching', 'Conditional statements and algorithmic decision paths', 'Days 5 - 7', ARRAY['Sequential Problems', 'if-elif-else logic', 'Real-world Decision Challenges'], 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30', 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'),
(3, 'Phase 3: Iterations & Pattern Mastery', 'Loops, series, and visual pattern generation', 'Days 8 - 11', ARRAY['For & While Loops', 'Math & Number Series', 'Pattern Generation & Nested Loops'], 'from-amber-500/20 to-yellow-500/10 border-yellow-500/30', 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'),
(4, 'Phase 4: Python Data Structures', 'Mastering Lists, Tuples, Sets, and Dictionaries', 'Days 12 - 16', ARRAY['List Slicing & Methods', 'List Comprehension & 2D Arrays', 'Tuples & Immutability', 'Sets & Dictionaries'], 'from-purple-500/20 to-pink-500/10 border-purple-500/30', 'bg-purple-500/10 text-purple-400 border-purple-500/30');

-- Insert Interactive Code Snippets
INSERT INTO code_snippets (id, title, category, series, code, output) VALUES
('swap-var', 'Swap 2 Variables (3 Ways)', 'Code Hacks', 'Code Hacks Day 1', '# Method 1: The Pythonic Way (Tuple Unpacking)
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
print(f"XOR: m={m}, n={n}")', 'Pythonic: a=20, b=10
Math: x=15, y=5
XOR: m=7, n=3'),
('list-comp', 'List Comprehension Magic', 'Data Structures', 'Python Zero to Hero Day 13', '# Create a list of squares of even numbers
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Standard approach vs List Comprehension
even_squares = [n**2 for n in numbers if n % 2 == 0]

print("Even squares:", even_squares)

# Malayalam words list uppercase
words = ["python", "kerala", "mallu", "code"]
shout = [w.upper() + "!" for w in words]
print("Shouting:", shout)', 'Even squares: [4, 16, 36, 64, 100]
Shouting: [''PYTHON!'', ''KERALA!'', ''MALLU!'', ''CODE!'']'),
('dict-ops', 'Fast Frequency Counter with Dict', 'Data Structures', 'Python Zero to Hero Day 16', 'text = "mallu python learner code like a pro"
freq = {}

for char in text:
    if char != " ":
        freq[char] = freq.get(char, 0) + 1

# Top 3 most frequent letters
sorted_freq = sorted(freq.items(), key=lambda x: x[1], reverse=True)[:3]
for letter, count in sorted_freq:
    print(f"Character ''{letter}'' appears {count} times")', 'Character ''l'' appears 4 times
Character ''e'' appears 3 times
Character ''a'' appears 3 times'),
('pattern-gen', 'Pyramid Star Pattern', 'Patterns', 'Python Zero to Hero Day 11', 'rows = 5
for i in range(1, rows + 1):
    # Spaces + Stars
    spaces = " " * (rows - i)
    stars = "*" * (2 * i - 1)
    print(spaces + stars)', '    *
   ***
  *****
 *******
*********');

-- Insert Shorts (54 Tech Shorts)
INSERT INTO shorts (id, title, views, category, thumbnail) VALUES
('rW5WhVK8Yso', 'Swap 2 Variables | 3 ways | Code Hacks Day 1 | Mallu. PY', 37, 'Code Hacks', 'https://i.ytimg.com/vi/rW5WhVK8Yso/hqdefault.jpg'),
('Zz7vDEXiXoU', 'Lifesaver''s best friend | What is Github? | Programming Secrets Day 17 | Mallu.PY', 90, 'Programming Secrets', 'https://i.ytimg.com/vi/Zz7vDEXiXoU/hqdefault.jpg'),
('4lDB726YT3k', 'Programmer dde life saver | What is Git? | Programming Secrets Day 16 | Mallu. PY', 34, 'Programming Secrets', 'https://i.ytimg.com/vi/4lDB726YT3k/hqdefault.jpg'),
('iTASWupGK9Q', 'Ellam moonammathoraal kaanunnund | API | Programming Secrets Day 15 | Mallu. PY', 84, 'Programming Secrets', 'https://i.ytimg.com/vi/iTASWupGK9Q/hqdefault.jpg'),
('OsaCI-yP-aY', 'How Your Phone Knows Everything About You | Sessions in Apps | Programming Secrets Day 14 | Mallu...', 190, 'Programming Secrets', 'https://i.ytimg.com/vi/OsaCI-yP-aY/hqdefault.jpg'),
('m1YHqZur3_U', 'Is the code you write correct? | Good Code & Bad Code | Programming Secrets Day 13 | Mallu. PY', 213, 'Programming Secrets', 'https://i.ytimg.com/vi/m1YHqZur3_U/hqdefault.jpg'),
('aeCgVQF8YMg', 'Code Is Never the Same | Refactoring | Programming Secrets Day 12 | Mallu. PY', 61, 'Programming Secrets', 'https://i.ytimg.com/vi/aeCgVQF8YMg/hqdefault.jpg'),
('viVlS2jhuO8', 'Spaghetti Code | Programming Secrets Day 11 | Mallu. PY', 225, 'Programming Secrets', 'https://i.ytimg.com/vi/viVlS2jhuO8/hqdefault.jpg'),
('YYIFiVcUofE', 'Onnm ariyathavan ellam ariyam | Programming Secrets Day 10 | Mallu. PY', 589, 'Programming Secrets', 'https://i.ytimg.com/vi/YYIFiVcUofE/hqdefault.jpg'),
('AvkfTFtl8H4', 'Frontend, Backend, Full Stack | Programming Secrets Day 9 | Mallu. PY', 371, 'Programming Secrets', 'https://i.ytimg.com/vi/AvkfTFtl8H4/hqdefault.jpg'),
('ynDqcFJ4n6k', 'Programming ariyavunnavarkk onnm ariyilla | Programming Secrets Day 8 | Mallu. PY', 228, 'Programming Secrets', 'https://i.ytimg.com/vi/ynDqcFJ4n6k/hqdefault.jpg'),
('XxIoo5PETSk', 'Ningal ill oru programmer olinj kedappund | Programming Secrets Day 7 | Mallu. PY', 165, 'Programming Secrets', 'https://i.ytimg.com/vi/XxIoo5PETSk/hqdefault.jpg'),
('S-2ICBh4WA8', 'Nthaan open source? | Programming Secrets Day 6 | Mallu. PY', 98, 'Programming Secrets', 'https://i.ytimg.com/vi/S-2ICBh4WA8/hqdefault.jpg'),
('oAgUakomRP8', 'Budhi illathath aan main preshnam | Programming Secrets Day 5 | Mallu. PY', 84, 'Programming Secrets', 'https://i.ytimg.com/vi/oAgUakomRP8/hqdefault.jpg'),
('Yjri6pk_-n4', 'Coffee kudikunnavan programmer aano🤔 | Programming Secrets Day 4 | Mallu. PY', 401, 'Programming Secrets', 'https://i.ytimg.com/vi/Yjri6pk_-n4/hqdefault.jpg'),
('wnvqTdwnZqs', 'Ithaa aa kalaroopam | Programming Secrets Day 3 | Mallu. PY', 521, 'Programming Secrets', 'https://i.ytimg.com/vi/wnvqTdwnZqs/hqdefault.jpg'),
('z9LeuKG15AE', 'Ivan 10 paisa de vivaram illa | Programming Secrets Day 2 | Mallu. PY', 581, 'Programming Secrets', 'https://i.ytimg.com/vi/z9LeuKG15AE/hqdefault.jpg'),
('Ml9KgTKErrk', 'Hallo World | Programming Secrets Day 1 | Mallu. PY', 134, 'Programming Secrets', 'https://i.ytimg.com/vi/Ml9KgTKErrk/hqdefault.jpg'),
('dVQwEsuAlzM', 'Playstore ithra vrithikettavan aarno | Behind a Click Day 14 | Mallu. PY', 52, 'Behind A Click', 'https://i.ytimg.com/vi/dVQwEsuAlzM/hqdefault.jpg'),
('PvbjK9zYKL4', 'Jananam athra eluppamalla | Behind a Click Day 13 | Mallu. PY', 854, 'Behind A Click', 'https://i.ytimg.com/vi/PvbjK9zYKL4/hqdefault.jpg'),
('zk8qxlp8vME', 'Ipppo thanne thodangikko | Behind a Click Day 12 | Mallu. PY', 245, 'Behind A Click', 'https://i.ytimg.com/vi/zk8qxlp8vME/hqdefault.jpg'),
('TAQqytZff18', 'Onn anangan ithrem budhimutt ondarunno | Behind a Click Day 11 | Mallu. PY', 252, 'Behind A Click', 'https://i.ytimg.com/vi/TAQqytZff18/hqdefault.jpg'),
('zLRXfobM6GQ', 'QR Code ithre ollarno | Behind a Click Day 10 | Mallu. PY', 560, 'Behind A Click', 'https://i.ytimg.com/vi/zLRXfobM6GQ/hqdefault.jpg'),
('9SpeV1Ibcs8', 'GPay is truly a genius | Behind a Click Day 9 | Mallu. PY', 71, 'Behind A Click', 'https://i.ytimg.com/vi/9SpeV1Ibcs8/hqdefault.jpg'),
('nWu1zCuqRdk', 'Google map ngane traffic kand pidikunnu | Behind a Click Day 8 | Mallu. PY', 94, 'Behind A Click', 'https://i.ytimg.com/vi/nWu1zCuqRdk/hqdefault.jpg'),
('a_ZMXQIIUzg', 'Youtube Nganeyaa video tharunne??? | Behind a Click Day 6 | Mallu. PY', 104, 'Behind A Click', 'https://i.ytimg.com/vi/a_ZMXQIIUzg/hqdefault.jpg'),
('5m3bSqYdVng', 'Ningalde routerinn pani onnm illa | Behind a Click Day 5 | Mallu. PY', 981, 'Behind A Click', 'https://i.ytimg.com/vi/5m3bSqYdVng/hqdefault.jpg'),
('zGGlCtO5XNk', 'Website evideyaanenn ngane ariyum | Behind a Click Day 4 | Mallu. PY', 48, 'Behind A Click', 'https://i.ytimg.com/vi/zGGlCtO5XNk/hqdefault.jpg'),
('S8vGCfJK0wg', 'Website ellam evidunna chaadi varunne🤔 | Behind a Click Day 3 | Mallu. PY', 48, 'Behind A Click', 'https://i.ytimg.com/vi/S8vGCfJK0wg/hqdefault.jpg'),
('edgiknA6ZCA', 'Google oru killadi thanne | Behind a Click Day 2 | Mallu. PY', 259, 'Behind A Click', 'https://i.ytimg.com/vi/edgiknA6ZCA/hqdefault.jpg'),
('YX7Y1M2Mrl0', 'Whatsapp edakk ninn kalikunnondo?🤔🤔🤔 | Behind a Click Day 1 | Mallu. PY', 180, 'Behind A Click', 'https://i.ytimg.com/vi/YX7Y1M2Mrl0/hqdefault.jpg'),
('uiUUBCQh214', '100 WPM lean now | Start Typing Today!!! | Mallu. PY', 294, 'Tech Byte', 'https://i.ytimg.com/vi/uiUUBCQh214/hqdefault.jpg'),
('EqxhW8pzEgo', 'Ningalde CIBIL Score idiyum | Ningal Pattikkapedukayan Day 15 | Mallu. PY', 145, 'Ningal Pattikkapedukayan', 'https://i.ytimg.com/vi/EqxhW8pzEgo/hqdefault.jpg'),
('uJR8DymEqko', 'AI sherikkum manushyane kadathi vetti | Ningal pattikkapedukayan Day 14 | Mallu. PY', 774, 'Ningal Pattikkapedukayan', 'https://i.ytimg.com/vi/uJR8DymEqko/hqdefault.jpg'),
('UmJIwmj9EIU', 'Cloud Nthaan | Ningal Pattikkapedukayan Day 13 | Mallu. PY', 636, 'Ningal Pattikkapedukayan', 'https://i.ytimg.com/vi/UmJIwmj9EIU/hqdefault.jpg'),
('6dbadDmnyqo', 'Subscribe button udayipp aan | Ningal Pattikkapedukayan Day 12 | Mallu. PY', 169, 'Ningal Pattikkapedukayan', 'https://i.ytimg.com/vi/6dbadDmnyqo/hqdefault.jpg'),
('SDe2H5QjRPI', 'Ningale kaal nannayit instagram inn ningale ariyaam | Behind a Click Day 7 | Mallu. PY', 0, 'Behind A Click', 'https://i.ytimg.com/vi/SDe2H5QjRPI/hqdefault.jpg'),
('JKmZfER-BfY', 'Blue Tick ningale chathikkukayan | Ningal Pattikkapedukayan Day 11 | Whatsapp | Mallu. PY', 65, 'Ningal Pattikkapedukayan', 'https://i.ytimg.com/vi/JKmZfER-BfY/hqdefault.jpg'),
('VuCrjwmU_sI', 'Reload cheyyaruth | Ningal pattikkapedukayan Day 10 | Mallu. PY', 129, 'Ningal Pattikkapedukayan', 'https://i.ytimg.com/vi/VuCrjwmU_sI/hqdefault.jpg'),
('kO8QB-nTrVM', 'AI kk photo edit cheyyan arinjooda | Ningal Pattikkapedukayan Day 9 | Mallu. PY', 1500, 'Ningal Pattikkapedukayan', 'https://i.ytimg.com/vi/kO8QB-nTrVM/hqdefault.jpg'),
('YPFRKCMzFnI', 'Chatgpt Ningale pattikkukayan | Ningal Pattikkapedukayan Day 8 | Mallu. PY', 1300, 'Ningal Pattikkapedukayan', 'https://i.ytimg.com/vi/YPFRKCMzFnI/hqdefault.jpg'),
('daRklpkkb_k', 'If something is free then you''re the product | Ningal pattikkapedukayan Day 7 | Mallu. PY', 956, 'Ningal Pattikkapedukayan', 'https://i.ytimg.com/vi/daRklpkkb_k/hqdefault.jpg'),
('TZleIFRleQo', 'Inni charge cheyyan patilla | O.MG Cable | Ningal Pattikkapedukayan Day 6 | Mallu. PY', 1100, 'Ningal Pattikkapedukayan', 'https://i.ytimg.com/vi/TZleIFRleQo/hqdefault.jpg'),
('3IIPeh-uXLo', 'kadicha apple chillarakaran alla | Ningal Pattikkapedukayan Day 5 | Mallu.PY', 2000, 'Ningal Pattikkapedukayan', 'https://i.ytimg.com/vi/3IIPeh-uXLo/hqdefault.jpg'),
('SEUzwTAVGbg', 'VPN use cheyythal pani kittum | X Account Banned | Mallu. PY', 268, 'Tech Byte', 'https://i.ytimg.com/vi/SEUzwTAVGbg/hqdefault.jpg'),
('LlhyauoiDF8', 'Everything is still there | You are being fooled Day 4 | Mallu. PY', 89, 'Ningal Pattikkapedukayan', 'https://i.ytimg.com/vi/LlhyauoiDF8/hqdefault.jpg'),
('2Wyd5UKZiok', 'Ithoru Trap aan | Ningal pattikkapedukayaan Day 3 | Mallu. PY', 70, 'Tech Byte', 'https://i.ytimg.com/vi/2Wyd5UKZiok/hqdefault.jpg'),
('dw0k-wPzyNI', 'You Are Being Sold Without Your Knowledge | You Are Being Scammed Day 2 | Mallu. PY', 441, 'Ningal Pattikkapedukayan', 'https://i.ytimg.com/vi/dw0k-wPzyNI/hqdefault.jpg'),
('w8FT8YAya5c', 'You’re Being Fooled Day 1 | Mallu. PY', 1300, 'Ningal Pattikkapedukayan', 'https://i.ytimg.com/vi/w8FT8YAya5c/hqdefault.jpg'),
('8ruWU0eNRuM', 'Ithentha Ith Ingane? | Mallu. PY', 1100, 'Tech Byte', 'https://i.ytimg.com/vi/8ruWU0eNRuM/hqdefault.jpg'),
('7VkrajkDe1E', 'Coding Padikkan Ith Mathi! 🧠 Python ZERO 2 HERO Series | Mallu. PY', 706, 'Python Quickies', 'https://i.ytimg.com/vi/7VkrajkDe1E/hqdefault.jpg'),
('QFMBuigMkig', 'Ariyathe Vann Saamrajyam Ondakkiyavar | Mallu. PY', 1100, 'Tech Byte', 'https://i.ytimg.com/vi/QFMBuigMkig/hqdefault.jpg'),
('HjL5VckyYhA', 'Eppozhenkilum Ningal Chinthichattundo??? | Mallu. PY', 1100, 'Tech Byte', 'https://i.ytimg.com/vi/HjL5VckyYhA/hqdefault.jpg'),
('wbSZorKasC8', 'Ningalkk Ariyoo??? | Mallu. PY', 1200, 'Tech Byte', 'https://i.ytimg.com/vi/wbSZorKasC8/hqdefault.jpg');
