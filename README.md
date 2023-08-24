# Task Manager Web App

A simple, yet powerful, task manager web app built using Django for the backend and
React for the frontend.

## Features:

- CRUD operations for tasks
- Automatic task labeling based on certain criteria (e.g., due date, task type)
- Filter tasks by label
- Sort tasks by date, type, or label
- Manually update task labels
- Frontend styled using TailwindCSS

## Getting Started:

1. To get started with this project, first clone the repository:

- git clone https://github.com/marcelrzd/task-manager.git
- cd task-manager

## Backend Setup:

1. Create a virtual environment:
   - python3 -m venv venv
   - source venv/bin/activate
2. Install the required packages:
   - pip install -r requirements.txt
3. Make migrations and migrate:
   - python manage.py makemigrations api
   - python manage.py migrate
4. Run the server:
   - python manage.py runserver

## Frontend Setup:

1. Navigate to the frontend directory:
   - cd frontend
2. Install the required packages:
   - npm install
3. Run the React app:
   - npm start

## API Endpoints:

- `GET /task-list/`: Retrieve a list of tasks
- `POST /create-task/`: Create a new task
- `PATCH /update-task/<task_id>/`: Update a task's label
- `DELETE /delete-task/<task_id>/`: Delete a task

## Contribution:

Feel free to fork this repository and make improvements. Pull requests are welcome!

## License

This project is licensed under the [MIT License](LICENSE).
