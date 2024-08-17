## Steps to run this project after forking and open the MyTodoApp folder in VScode.
Step-1: Create database using MySQL client or workbench.(Note: please use your username and password)

 ```Find script.sql file in Backend directory and run that script in MySQL client or workbench.```
 
Step-2: Run the development server of NextJs:

```bash
npm run dev
# or
yarn dev
```
Step-3: Run the backend server.
```bash
cd backend
node index.js
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## About

#Todo List Application: Features-

Create Tasks: Add new todo items with titles and descriptions.
Read Tasks: View a list of all tasks, including their current status (completed or not).
Update Tasks: Edit the title and description of existing todo items.
Delete Tasks: Remove tasks from the list when they are no longer needed.
Checkbox: Mark tasks as completed with a checkbox.

#Technical Stack:
Frontend: Next.js – A React framework providing server-side rendering and static site generation.
Backend: Node.js – A JavaScript runtime for building scalable network applications.
Database: MySQL – A relational database for storing and managing todo items.

This application is a practical example of full-stack development, demonstrating the integration between a React frontend and a Node.js backend with a MySQL database.
