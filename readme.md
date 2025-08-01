# Course Management Platform Frontend 🚀

This project is the frontend component of a comprehensive course management platform. It provides a user-friendly interface for students and instructors to interact with courses, manage their profiles, and handle authentication. The platform offers features such as course browsing, enrollment, content creation, and secure access control. It aims to streamline the online learning experience and provide a robust environment for educational content delivery.

## 🚀 Key Features

- **User Authentication:** Secure login and signup functionality with OTP verification.
- **Role-Based Access Control:** Differentiated access for students and instructors using `PrivateRoute` and `OpenRoute` components.
- **Course Management:** Instructors can create, edit, and manage courses with multiple sections and lectures.
- **Shopping Cart:** Students can add courses to their cart and proceed to checkout.
- **Dashboard:** Personalized dashboard for users to track their progress and manage their profiles.
- **Responsive Design:** A user interface that adapts seamlessly to different screen sizes.
- **State Management:** Utilizes Redux Toolkit for efficient state management across the application.
- **Form Handling:** Uses React Hook Form for robust and validated form handling.
- **Notification System:** Implements `react-hot-toast` for user-friendly notifications.

## 🛠️ Tech Stack

- **Frontend:**
    - React
    - React DOM
    - React Router DOM
    - Redux Toolkit
    - Axios
    - Tailwind CSS
    - Vite
    - react-dropzone
    - react-hook-form
    - react-hot-toast
    - react-icons
    - react-markdown
    - react-otp-input
    - react-player
    - react-rating-stars-component
    - react-super-responsive-table
    - react-type-animation
    - swiper
    - video-react
    - @ramonak/react-progress-bar
    - chart.js
    - react-chartjs-2
    - hls.js
    - web-vitals
- **Build Tool:**
    - Vite

## 📦 Getting Started

### Prerequisites

- Node.js (version >=14)
- npm or yarn

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2.  Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

3.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

### Running Locally

1.  Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    This will start the application at `http://localhost:5173` (or another port if 5173 is in use).

## 📂 Project Structure

```
frontend/
├── public/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── components/
│   │   ├── core/
│   │   │   ├── Auth/
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── OpenRoute.jsx
│   │   │   │   ├── PrivateRoute.jsx
│   │   │   │   └── SignupForm.jsx
│   │   │   ├── Dashboard/
│   │   │   │   ├── AddCourse/
│   │   │   │   │   ├── CourseBuilder/
│   │   │   │   │   │   └── CourseBuilderForm.jsx
│   │   │   │   │   ├── CourseInformation/
│   │   │   │   │   │   └── CourseInformationForm.jsx
│   │   │   │   │   ├── index.jsx
│   │   │   │   │   └── RenderSteps.jsx
│   │   │   │   ├── Cart/
│   │   │   │   │   ├── index.jsx
│   │   │   │   │   ├── RenderCartCourses.jsx
│   │   │   │   │   └── RenderTotalAmount.jsx
│   │   │   │   └── Sidebar.jsx
│   │   ├── Common/
│   │   │   ├── ConfirmationModal.jsx
│   │   │   └── IconBtn.jsx
│   ├── pages/
│   ├── services/
│   ├── slices/
│   ├── utils/
│   └── data/
│       └── dashboard-links.js
├── index.html
├── package.json
├── vite.config.js
```


## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your fork.
5.  Submit a pull request to the main repository.

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 📬 Contact

For questions or inquiries, please contact: [Your Name/Organization] at [maurya.ritesh2005@gmail.com]

## 💖 Thanks

Thank you for checking out this project! We hope it helps you in your course management endeavors. Your contributions and feedback are highly appreciated!

