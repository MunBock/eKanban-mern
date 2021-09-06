# eKanban-mern

> A trello clone application built with MERN stack (MongoDB, ExpressJS, ReactJS and NodeJS) also used of Redux as state management. 
> Drag and Drop function is based on react-beautiful-dnd.
> [**Live Demo**](https://e-kanban-mern.herokuapp.com/)

![eKanban_demo](https://user-images.githubusercontent.com/31787554/131004338-bc415c70-de09-4e9e-a06b-fd25a956fd92.gif)

### Step (frontend & backend)
```
npm i
cd frontend
npm i
```

### Environment setting

Create a .env file in the root (outside the folders of frontend and backend)
and copy the following below then paste into .env file (custom your own if you want)

```
NODE_ENV = development
PORT = 4000
MONGO_URI = mongodb://localhost/e-kanban
JWT_SECRET = 1234
```

### Run application

```
npm run dev
```
