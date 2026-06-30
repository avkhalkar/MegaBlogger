# MegaBlog 🚀

A modern, full-stack blogging application built with React, Appwrite, and Redux Toolkit. Features a complete authentication system with OAuth, email verification, and password recovery, alongside a rich text editor for creating and managing blog content.

## ✨ Features

*   **Authentication**: Login and Signup with email/password, email verification flow, and forgot/reset password.
*   **OAuth**: Sign in with Google or GitHub via Appwrite OAuth2.
*   **Rich Text Editor**: Integrated TinyMCE for creating and editing formatted blog posts.
*   **Post Management**: Create, Read, Update, and Delete (CRUD) blog posts.
*   **Email Verification Gate**: Until email is verified, users can browse and read posts but cannot create or edit them.
*   **Draft & Published Modes**: Posts can be toggled between `draft` and `published` status. Only published posts appear in the public feed; drafts are visible only to the author.
*   **Author Posts**: Each post links to the author's profile page, showing all posts by that author with pagination.
*   **Pagination**: All posts and author posts pages use offset-based pagination, loading a fixed number of posts per page with Previous / Next controls.
*   **Image Uploads**: Support for uploading featured images with file type and size validation (.jpg, .png, .gif, max 5MB).
*   **Reading Time**: Estimated read time displayed on each post.
*   **Paragraph Reveal**: Posts load in chunks with Show more / Show less controls.
*   **Toast Notifications**: App-wide success/error/info toast system.
*   **Password Strength**: Live password strength checklist on signup and password reset.
*   **Protected Routes**: Unauthenticated users are redirected to login; logged-in users are redirected away from login/signup pages.
*   **User-friendly Errors**: Raw Appwrite errors are mapped to readable messages (wrong password, duplicate email, rate limit, file too large, etc.).
*   **Responsive Design**: Modern, opaque white UI built with Tailwind CSS, fully responsive across devices.
*   **State Management**: Centralized state management using Redux Toolkit.
*   **Real-time Validation**: Form validation using React Hook Form.

## 🛠️ Technology Stack

*   **Frontend Library**: [React](https://react.dev/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
*   **Backend as a Service**: [Appwrite](https://appwrite.io/) (Auth, Database, Storage)
*   **Form Handling**: [React Hook Form](https://react-hook-form.com/)
*   **Rich Text Editor**: [TinyMCE](https://www.tiny.cloud/)
*   **Routing**: [React Router DOM](https://reactrouter.com/)

## ⚙️ Environment Configuration

This project uses environment variables for Appwrite configuration and TinyMCE setup.

1.  **Copy the sample environment file:**

    ```bash
    cp .env.sample .env
    ```

2.  **Update `.env` with your credentials:**

    | Variable | Description |
    | :--- | :--- |
    | `VITE_APPWRITE_URL` | The API endpoint for your Appwrite project. |
    | `VITE_APPWRITE_PROJECT_ID` | Your Appwrite project ID. |
    | `VITE_APPWRITE_DATABASE_ID` | The ID of the database you created in Appwrite. |
    | `VITE_APPWRITE_TABLE_ID` | The ID of the collection (table) for posts. |
    | `VITE_APPWRITE_BUCKET_ID` | The ID of the storage bucket for images. |
    | `VITE_TINYMCE_API_KEY` | Your TinyMCE API key from [tiny.cloud](https://www.tiny.cloud/). |

## 🗄️ Appwrite Setup

### 1. Create a Project

1.  Go to [cloud.appwrite.io](https://cloud.appwrite.io) and sign up or log in.
2.  Click **Create Project**, give it a name, and select a **region** (e.g. Frankfurt).
3.  On the next screen, select **Web** as your platform type, then choose **React**.
4.  You'll be shown 3 environment variables — copy them into your `.env` file.
5.  Click **Skip optional steps** to go to the dashboard.

### 2. Register Your Web App (Platform)

Once in the dashboard:

1.  Go to **Overview** → scroll down to **Integrations** → click **Add Platform**.
2.  Select **Web App**.
3.  Set a **Name** (e.g. `MegaBlogDev`) and **Hostname** to `localhost`.
4.  Click **Create platform**.

Without this step, Appwrite will reject all requests from your app with a CORS error.

### 3. Auth Configuration

1.  Go to **Auth** → **Settings**.
2.  Enable the **Email/Password** provider.

### 4. Storage (Bucket)

1.  Go to **Storage** → **Create Bucket**.
2.  Under **Settings** → **Permissions**, add role **All Users** (`any`) with **Create**, **Read**, **Update**, **Delete**.

### 5. Database & Collection

1.  Go to **Databases** → create a new Database.
2.  Create a new **Collection** (e.g., `posts`).
3.  Add the following **String** attributes:

    | Attribute Name  | Size   | Required | Note                                      |
    | :-------------- | :----- | :------- | :---------------------------------------- |
    | `title`         | 255    | Yes      |                                           |
    | `content`       | 500000 | Yes      | Large size to support long posts          |
    | `featuredImage` | 255    | Yes      | Stores the File ID from Storage           |
    | `status`        | 255    | Yes      | `"active"` or `"inactive"`               |
    | `userId`        | 255    | Yes      | ID of the user who created the post       |
    | `authorName`    | 255    | Yes      | Display name of the author                |

4.  Under **Indexes**, create an index on `status` (Type: `Key`).
5.  Under **Settings** → **Permissions**, add role **All Users** (`any`) with **Create**, **Read**, **Update**, **Delete**.

## 🔐 OAuth Setup (Google & GitHub)

### Google

1.  Go to [Google Cloud Console](https://console.cloud.google.com/) → **APIs & Services** → **Credentials**.
2.  Click **Create Credentials** → **OAuth 2.0 Client ID** → choose **Web application**.
3.  Under **Authorized JavaScript origins**, add your frontend URL (e.g. `http://localhost:5173`).
4.  Under **Authorized redirect URIs**, add **both** of the following (replace `<PROJECT_ID>` with your Appwrite project ID):
    - `https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/<PROJECT_ID>`
    - `https://fra.cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/<PROJECT_ID>`

    > Both URIs are required — Appwrite may route through either depending on the region.

5.  Copy the **Client ID** and **Client Secret** into Appwrite **Auth** → **Settings** → **Google**.
6.  Enable the **Google** provider.

### GitHub

1.  Go to **GitHub** → **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**.
2.  Set **Homepage URL** to `http://localhost:5173`.
3.  Set the **Authorization callback URL** to the one shown in Appwrite under **Auth** → **Settings** → **GitHub**.
4.  Copy the **Client ID** and **Client Secret** into Appwrite.
5.  Enable the **GitHub** provider in Appwrite **Auth** → **Settings**.

## 📝 TinyMCE Domain Approval

TinyMCE will only load on domains you explicitly approve.

1.  Log in at [tiny.cloud](https://www.tiny.cloud/).
2.  Go to **Dashboard** → **Approved Domains**.
3.  Add `localhost` for local development.

Without an approved domain, the editor will not load.

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm (v9 or higher)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/avkhalkar/MegaBlogger.git
    cd MegaBlogger
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure environment** (see Environment Configuration above).

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build locally
```

## ☁️ Deployment (Vercel)

### 1. Deploy to Vercel

1.  Push your code to GitHub.
2.  Go to [vercel.com](https://vercel.com) → **Add New Project** → import your GitHub repository.
3.  In the project configuration:
    - **Framework Preset**: Select `Create React App`
    - **Root Directory**: `./`
4.  Under **Environment Variables**, add all the variables from your `.env` file (same keys and values).
5.  Click **Deploy**.

Every push to `main` will automatically trigger a new production deployment. Pull requests get their own preview URL.

### 2. Register Your Production Domain on Appwrite

After deployment, copy your Vercel production URL (e.g. `mega-blogger-omega.vercel.app`) and:

1.  Go to Appwrite Console → **Overview** → **Integrations** → **Add Platform** → **Web App**.
2.  Set **Hostname** to your Vercel domain.
3.  Click **Create platform**.

### 3. Add Production Domain to TinyMCE

1.  Log in at [tiny.cloud](https://www.tiny.cloud/) → **Dashboard** → **Approved Domains**.
2.  Add your Vercel production URL.

### 4. Update OAuth for Production

**Google:**

You already have the OAuth client from local setup. No need to create a new one — just add the production URLs:

1.  Go to [Google Cloud Console](https://console.cloud.google.com/) → your existing OAuth client.
2.  Under **Authorized JavaScript origins**, add your Vercel production URL (e.g. `https://mega-blogger-omega.vercel.app`).
3.  The redirect URIs (Appwrite callback URLs) are already set — no changes needed there.

**GitHub:**

GitHub OAuth Apps are tied to a single homepage URL, so you need a separate app for production:

1.  Go to **GitHub** → **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**.
2.  Set **Homepage URL** to your Vercel production URL (e.g. `https://mega-blogger-omega.vercel.app`).
3.  Set **Authorization callback URL** to the one shown in Appwrite under **Auth** → **Settings** → **GitHub**.
4.  Copy the new **Client ID** and **Client Secret** into Appwrite, replacing the dev ones.

## 📁 Project Structure

```
src/
├── appwrite/       # Appwrite service configuration (auth, database, storage)
├── components/     # Reusable UI components (Header, Footer, Input, RTE, etc.)
├── conf/           # Environment config wrapper
├── pages/          # Pages: Home, Login, Signup, AllPosts, Post, AddPost,
│                   #        CheckEmail, VerifyEmail, ForgotPassword, ResetPassword
├── store/          # Redux store and authSlice
├── utils/          # ToastContext, parseError, readingTime helpers
├── App.jsx         # Root component with routing and header height measurement
└── main.jsx        # Entry point with providers
```

## 🔭 Future Scope

**Near term:**
*   **Comments** — users comment on posts, authors can delete comments
*   **Dark Mode** — theme toggle with Tailwind's dark mode support
*   **Search** — full-text search across post titles and content (Appwrite supports this natively)
*   **Categories / Tags** — tag posts and filter the feed by topic

**Medium term:**
*   **Like / Bookmark** — users save posts they want to read later
*   **Profile Page** — edit display name, avatar, and bio
*   **Notifications** — alerts when someone comments on or likes your post

**Architectural improvements:**
*   **Custom Backend** — replace Appwrite with a self-written Node.js/Express API for full control over business logic and a stronger full-stack story
*   **Image Optimization** — compress and resize images on upload, serve different sizes for mobile vs desktop
*   **SEO** — migrate to Next.js for server-side rendering so posts are indexable by search engines

## 👤 Author

*   **avkhalkar** - [GitHub](https://github.com/avkhalkar)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
