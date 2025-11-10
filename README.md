# Employee & Policy Management Dashboard

A modern frontend for managing company employees and policies. This application provides a clean interface for viewing, adding, editing, deleting, and filtering records, built with React, TypeScript, and Vite.

<!-- Add a screenshot or GIF of the application here -->
<!-- ![Project Screenshot](placeholder.png) -->

---

## ✨ Features

*   **Dashboard Overview:** A landing page with a quick summary of total employees and policies.
*   **Employee Management:**
    *   View all employees in a searchable and filterable table.
    *   Add new employees via a modal form.
    *   Edit existing employee details.
    *   Delete employees with a confirmation step.
*   **Policy Management:**
    *   View all policies in a searchable and filterable table.
    *   Add, edit, and delete policies.
*   **Dynamic Filtering & Search:**
    *   Real-time text search across relevant fields on both Employees and Policies pages.
    *   Filter records by status (Policies) or role (Employees) using a dropdown menu.
*   **Responsive Design:** A clean, modern UI built with Tailwind CSS that adapts to different screen sizes.
*   **Themed UI:** Supports both light and dark modes, configured via a centralized CSS theme using modern OKLCH colors.

---

## 🛠️ Tech Stack

*   **Framework:** [React](https://reactjs.org/) (with TypeScript)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (with a custom OKLCH color theme)
*   **Icons:** [Flaticon Uicons](https://www.flaticon.com/uicons)
*   **UUID Generation:** [uuid](https://www.npmjs.com/package/uuid) for unique key generation in mock data.

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18.x or later recommended)
*   [pnpm](https://pnpm.io/) (as the package manager, based on `pnpm-lock.yaml`)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd <repository-folder>
    ```

2.  **Install dependencies:**
    This project uses `pnpm`. Run the following command in the root directory:
    ```sh
    pnpm install
    ```

3.  **Set up environment variables (optional):**
    If the backend API is running on a different port, you can create a `.env` file in the root of the project to specify the endpoint.
    ```env
    VITE_API_BASE_URL=http://localhost:3100
    ```

4.  **Run the development server:**
    ```sh
    pnpm dev
    ```
    This will start the Vite development server, typically at `http://localhost:5173`.

---

## 📂 Project Structure

The project follows a standard React application structure:

```
/src
├── /assets         # Static assets like images and SVGs
├── /components     # Reusable React components (Button, Table, Modal, etc.)
├── /pages          # Top-level page components (Dashboard, Employees, Policies)
├── /styles         # Global and modular CSS files
├── /types          # TypeScript type definitions
├── /utils          # Utility functions and configurations (e.g., form configs)
├── App.tsx         # Main application component with routing
└── main.tsx        # Entry point of the application
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if it exists.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
