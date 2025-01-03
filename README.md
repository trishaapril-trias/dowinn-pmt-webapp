

# Project Management Tool

## Overview

This web application is a personal project management tool designed to help users track their projects and tasks effectively. The app organizes tasks into three statuses: **Todo**, **In Progress**, and **Done**. Users can update task statuses using an intuitive drag-and-drop interface.

## Features

### Authentication

- **Sign In Module**
  - A form to authenticate users with a username and password.
- **Sign Up Module**
  - A form to register new users with a username, email, and password.

### Project Management

- **Project Module**
  - Displays project cards.
  - Each card includes an overview of tasks, showing the count of tasks categorized as **Todo**, **In Progress**, and **Done** for each project.

### Task Management

- **Task Module**
  - Tasks are categorized into three statuses: **Todo**, **In Progress**, and **Done**.
  - Users can drag and drop tasks to update their statuses using `onDragOver`, `onDrop`, and `onDragStart` event handlers.
  - A **Logs** feature tracks and updates whenever there is a change in the status of tasks.

## Technologies Used

- **Frontend**: Built with Next.js and Tailwind CSS for a responsive and modern user interface.
- **Drag-and-Drop**: Implemented using native HTML5 drag-and-drop events (`onDragOver`, `onDrop`, `onDragStart`).
- **API Calls**: Fetch API is used to interact with APIs for fetching and updating data.
- **State Management**: React state hooks or context API to manage state efficiently.

## How to Use

1. **Sign Up**: Create an account using your username, email, and password.
2. **Sign In**: Log in with your credentials to access your projects.
3. **Create Projects**: Add projects to organize your tasks.
4. **Manage Tasks**:
   - Add tasks to your projects.
   - Use drag-and-drop functionality to update task statuses.
   - View logs to track changes in task statuses.
5. **Monitor Progress**: View an overview of task counts for each project on the project cards.

## Installation

1. Clone the repository:

   git clone https://github.com/trishaapril-trias/dowinn-pmt-webapp.git

2. Navigate to the project directory:

   cd project-management-tool

3. Install dependencies:

   npm install

4. Start the development server:

   npm run dev

5. Open the app in your browser at `http://localhost:3000`.

## Future Enhancements

- Add deadlines and priority levels for tasks.
- Implement user roles and permissions.


Feel free to contribute to this project by submitting issues or pull requests on GitHub. Let's make project management simple and efficient!


