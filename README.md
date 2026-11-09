# Mallu. PY — Official YouTube Portfolio Website & Admin CMS

An elegant, modern React portfolio website built specifically for **Mallu. PY** ([@mallupy05](https://youtube.com/@mallupy05)), showcasing long-form Python Zero-to-Hero tutorials, bite-sized tech shorts, algorithmic secrets, and developer hacks in Malayalam.

![Mallu.PY Profile](/profile.jpg)

---

## 🚀 Key Features

- **Thematic Visual Design**:
  - Matches the channel's profile picture and developer aesthetic with dark slate tones, Python yellows (`#FFD43B`), cyber emerald accents, and glowing neon borders.
  - Profile image (`profile.jpg`) integrated into the glowing hero badge, navbar brand, and footer.
  - Malayalam typography and developer taglines (*"Coding Padikkan Ith Mathi! 🚀"*, *"മലയാളത്തിൽ Python പഠിക്കാം"*).

- **Structured Content Layout**:
  1. **Hero Section**: Creator identity, stats counter, and live interactive Python code terminal.
  2. **Curriculum Roadmap**: 4-Phase sequenced pathway (Days 1 to 16).
  3. **Buy Me a Coffee Banner**: Prominently featured right after the roadmap to drive community support.
  4. **Python Masterclasses**: Full 16-day long videos with live progress tracker saved in `localStorage`.
  5. **Tech Shorts & Secrets**: 54+ Reel-style tips, cybersecurity alerts (*Ningal Pattikkapedukayan*), and code hacks.
  6. **Interactive Python Playground**: Live code snippets with simulated output and one-click copy.
  7. **FAQs & Footer**: Malayalam Python FAQs and community links.

- **Content Scheduling Engine (Future Publishing)**:
  - **Schedule for Future**: You can schedule new Long Videos, Shorts, Roadmap Phases, and Code Snippets with a custom future date & time.
  - **Automatic Activation**: As soon as the scheduled date/time arrives, the content automatically transitions from *Scheduled* to *Live / Published* without requiring a redeployment!
  - **"Upcoming / Premieres Soon" Mode**: Choose whether to teaser the scheduled item on the website with a premiere badge or keep it completely private until publish time.
  - **Instant "Publish Now" Trigger**: Release any scheduled item ahead of time with a single click.

- **Protected Admin CMS Panel (`/ammu`)**:
  - Accessible at route `/ammu`.
  - Protected with a **SHA-256 hash** loaded from `.env` (`VITE_ADMIN_PASSWORD_HASH`).
  - Full CRUD operations:
    - **Long Videos**: Add, edit, delete, and schedule masterclasses.
    - **Shorts**: Add, edit, delete, and schedule tech shorts.
    - **Roadmap**: Add, edit, delete, and schedule curriculum phases.
    - **Playground Snippets**: Add, edit, delete, and schedule Python snippets with code & output.
  - Status filters: View *All Items*, *Live / Published*, or *Scheduled for Future*.
  - Real-time live synchronization: Edits are immediately reflected on the public portfolio.
  - One-click **JSON Backup Export & Import** and **Factory Reset**.

---

## 🔐 Admin Panel & Environment Configuration

### 1. Configure `.env`
In the project root, edit the `.env` file:
```env
# SHA-256 Hash of your admin password
# Default below is the SHA-256 hash of "mallupy_admin_2026"
VITE_ADMIN_PASSWORD_HASH=37add843a379aa62d5ab101f2ef880c893788e704bc10729e9e620328739baac

# Supabase Database Configuration (Optional for Cloud Sync)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Accessing the Admin Panel
1. Start the dev server (`npm run dev`).
2. Navigate to `http://localhost:5173/ammu`.
3. Enter your password (default: `mallupy_admin_2026`).
4. The login screen verifies the password by hashing it with SHA-256 and comparing it with `VITE_ADMIN_PASSWORD_HASH`.
5. An interactive **Hash Generator Tool** is built directly into the login screen to help you generate hashes for any new password!

---

## 🕒 How Scheduling Works

When adding or editing any item in `/ammu`:
1. Check **"Schedule for future release"**.
2. Pick the exact date and time.
3. Choose whether to display it as **"Upcoming / Premiering Soon"** on the website or keep it hidden until the time comes.
4. On the public site:
   - Upcoming items show a premiere date badge (e.g. *Premieres Nov 15, 6:00 PM*).
   - Once the clock reaches that time, it automatically turns live!
5. In the admin panel, you can filter by **"Scheduled for Future"** and click **"Publish Now"** anytime to drop it early.

---

## 🗄️ Supabase Database Setup & `init.sql`

A complete SQL initialization script is included in [`init.sql`](./init.sql) to set up a cloud PostgreSQL database on Supabase with scheduling support (`publish_date` and `show_as_upcoming` columns).

### Step-by-Step Supabase Setup:
1. Go to [supabase.com](https://supabase.com) and create a free project.
2. In your Supabase Dashboard, click on the **SQL Editor** tab on the left sidebar.
3. Open the [`init.sql`](./init.sql) file from this repository, copy its entire contents, paste it into the SQL Editor, and click **Run**.
4. This will automatically:
   - Create 4 tables: `long_videos`, `shorts`, `roadmap_phases`, and `code_snippets` with scheduling columns.
   - Configure **Row Level Security (RLS)** policies for secure public read access.
   - Pre-populate (seed) all initial videos, shorts, roadmap phases, and snippets.
5. In Supabase **Project Settings -> API**, copy your `Project URL` and `anon public key` into your `.env` file.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite 6 + React Router 7
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Cryptography**: Web Crypto API (SHA-256)
- **Database (Optional Cloud)**: Supabase PostgreSQL (`init.sql`)
- **Typography**: Inter, Outfit, JetBrains Mono, Noto Sans Malayalam

---

## 🏃 Commands

```bash
# Run local development server
npm run dev

# Build for production (outputs to dist/)
npm run build

# Preview production build locally
npm run preview
```
