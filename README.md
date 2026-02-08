# MegaBlog 🚀

A modern, full-stack blogging application built with React, Appwrite, and Redux Toolkit. This project features a clean, responsive UI, secure authentication, and a rich text editor for creating content.

## ✨ Features

*   **Authentication**: Secure Login and Signup functionality using Appwrite Auth.
*   **Rich Text Editor**: Integrated TinyMCE for creating and editing formatted blog posts.
*   **Post Management**: Create, Read, Update, and Delete (CRUD) blog posts.
*   **Image Uploads**: Support for uploading featured images with file type validation (.jpg, .png, .gif).
*   **Responsive Design**: Modern, light-themed UI built with Tailwind CSS, fully responsive across devices.
*   **State Management**: Centralized state management using Redux Toolkit.
*   **Real-time Validation**: Form validation for better user experience using React Hook Form.

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

    Open `.env` and configure the following variables:

    | Variable | Description |
    | :--- | :--- |
    | `VITE_APPWRITE_URL` | The API endpoint for your Appwrite project. |
    | `VITE_APPWRITE_PROJECT_ID` | Your Appwrite project ID. |
    | `VITE_APPWRITE_DATABASE_ID` | The ID of the database you created in Appwrite. |
    | `VITE_APPWRITE_TABLE_ID` | The ID of the collection (table) for posts. |
    | `VITE_APPWRITE_BUCKET_ID` | The ID of the storage bucket for images. |
    | `VITE_TINYMCE_API_KEY` | Your TinyMCE API key (get it by creating an account at [TinyMCE](https://www.tiny.cloud/)). |

## �️ Appwrite Setup

To run this project, you need to configure your Appwrite project as follows:

### 1. Create an Account

If you haven't already, [sign up for an Appwrite account](https://cloud.appwrite.io/console/register).

### 2. Storage (Bucket)

1.  Go to **Storage** in your Appwrite Console.
2.  **Create a new Bucket**.
3.  Go to the **Settings** tab of your new bucket.
4.  Scroll down to **Permissions**.
5.  Click **Add Role**, select **All Users** (`any`).
6.  Check all permissions: **Create**, **Read**, **Update**, **Delete**.
7.  Click **Update**.

### 3. Database & Collection

1.  Go to **Databases** and create a new Database.
2.  Create a new **Collection** (e.g., `articles` or `posts`).
3.  Go to the **Attributes** tab and create the following **String** attributes:

    | Attribute Name  | Type   | Size | Required | Note                                      |
    | :-------------- | :----- | :--- | :------- | :---------------------------------------- |
    | `title`         | String | 255  | Yes      |                                           |
    | `content`       | String | 255+ | Yes      | Recommend larger size for long posts      |
    | `featuredImage` | String | 255  | Yes      | Stores the File ID from Storage           |
    | `status`        | String | 255  | Yes      | e.g., "active" or "inactive"              |
    | `userId`        | String | 255  | Yes      | Stores the ID of the user who created it  |

4.  Go to the **Indexes** tab and create an index:
    *   **Index Key**: `status`
    *   **Index Type**: `Key`
    *   **Attribute**: `status`

5.  Go to the **Settings** tab of your collection.
6.  Scroll down to **Permissions**.
7.  Click **Add Role**, select **All Users** (`any`).
8.  Check all permissions: **Create**, **Read**, **Update**, **Delete**.
9.  Click **Update**.

## �🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

*   Node.js (v18 or higher)
*   npm (v9 or higher)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/MegaBlogger.git
    cd MegaBlogger
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

4.  **Open the app:**

    Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

To create a production-ready build:

1.  **Run the build command:**

    ```bash
    npm run build
    ```

    This creates a `dist` folder with optimized assets.

2.  **Preview the production build:**

    ```bash
    npm run preview
    ```

## 🚀 Deployment

Access the live application here: [MegaBlogger Live Demo](https://mega-blogger-giwhu3cf3-avkhalkars-projects.vercel.app/)

## 📁 Project Structure

```
src/
├── appwrite/       # Appwrite service configuration
├── components/     # Reusable UI components (Header, Footer, Input, etc.)
├── conf/           # Environment config wrapper
├── pages/          # Application pages (Home, Login, Signup, AllPosts, etc.)
├── store/          # Redux store and slices
├── App.jsx         # Main application component
└── main.jsx        # Entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## � Author

*   **avkhalkar** - [GitHub](https://github.com/avkhalkar)

## �📝 License

This project is open source and available under the [MIT License](LICENSE).
