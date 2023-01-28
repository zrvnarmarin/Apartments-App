// import One from "./components/One"
// import Four from "./components/Four"
// import ThemeProvider from "./store/Theme/ThemeProvider"
// import Header from "./components/Header"
// import LoginPage from "./components/Login/LoginPage"
// import MainPage from "./components/Main/MainPage"
// import FrontPage from "./components/Front/FrontPage"
// import { useState } from "react"
// import { Route, Routes } from "react-router-dom"
// import Apartments from "./components/Main/Apartments"
// import Tags from "./components/Main/Tags"
// import ErrorPage from './components/Error/ErrorPage.jsx'
// import RegisteredUsers from "./components/Main/RegisteredUsers"
// import AddNewApartment from "./components/Main/AddNewApartment"

// const App = () => {
//   const [isLoginOpened, setIsLoginOpened] = useState(false)
//   const [isMainOpened, setIsMainOpened] = useState(false)
//   const [isNewApartmentModalOpen, setIsNewApartmentModalOpen] = useState(false)
//   const openLoginPage = () => setIsLoginOpened(true)
//   const openMainPage = () => setIsMainOpened(true)
//   const openNewApartmentModal = () => setIsNewApartmentModalOpen(true)
//   const closeNewApartmentModal = () => setIsNewApartmentModalOpen(false)

//   return (
//     // <ThemeProvider>
//     //   <div className="bg-red-400 flex flex-col gap-4 m-4 p-2">
//     //     <Header />
//     //     <One />
//     //     <Four />
//     //   </div>
//     // </ThemeProvider>

//     <div>
//       <Routes>
//         <Route path="*" element={<ErrorPage />} />
//         <Route path="/" element={<FrontPage onOpenLogin={openLoginPage} />} />
//         <Route path="/login" element={<LoginPage onOpenMain={openMainPage} />} /> 
//         <Route path="/main" element={<MainPage />}>
//           <Route path="apartments" element={<Apartments isModalOpen={isNewApartmentModalOpen} onModalClose={closeNewApartmentModal} onModalOpen={openNewApartmentModal} />} >
//             <Route path=":id" element={<AddNewApartment />} />
//           </Route>
//           <Route path="tags" element={<Tags />} />
//           <Route path="registeredUsers" element={<RegisteredUsers />} />
//         </Route>
//       </Routes>
//     </div>
//   )
// }

// export default App;

import React, { useState, useEffect, useCallback, useRef } from "react";

// function App() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [tasks, setTasks] = useState([]);

//   const fetchTasks = async (taskText) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(
//         'https://apartments-app-6a66f-default-rtdb.firebaseio.com/tasks.json'
//       );

//       if (!response.ok) {
//         throw new Error('Request failed!');
//       }

//       const data = await response.json();

//       const loadedTasks = [];

//       for (const taskKey in data) {
//         loadedTasks.push({ id: taskKey, text: data[taskKey].text });
//       }

//       setTasks(loadedTasks);
//     } catch (err) {
//       setError(err.message || 'Something went wrong!');
//     }
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const taskAddHandler = (task) => {
//     setTasks((prevTasks) => prevTasks.concat(task));
//   };

//   return (
//     <React.Fragment>
//       <NewTask onAddTask={taskAddHandler} />
//       <Tasks
//         items={tasks}
//         loading={isLoading}
//         error={error}
//         onFetch={fetchTasks}
//       />
//     </React.Fragment>
//   );
// }

// export default App;

// const NewTask = (props) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const enterTaskHandler = async (taskText) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(
//         'https://apartments-app-6a66f-default-rtdb.firebaseio.com/tasks.json',
//         {
//           method: 'POST',
//           body: JSON.stringify({ text: taskText }),
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error('Request failed!');
//       }

//       const data = await response.json();

//       const generatedId = data.name; // firebase-specific => "name" contains generated id
//       const createdTask = { id: generatedId, text: taskText };

//       props.onAddTask(createdTask);
//     } catch (err) {
//       setError(err.message || 'Something went wrong!');
//     }
//     setIsLoading(false);
//   };

//   return (
//     <div>
//       <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// const TaskForm = (props) => {
//   const [task, setTask] = useState('')
//   const taskInputHandler = e => setTask(e.target.value)

//   const submitHandler = (event) => {
//     event.preventDefault();

//     if (task.length > 0) {
//       props.onEnterTask(task);
//     }
//   };

//   return (
//     <form onSubmit={submitHandler}>
//       <input type='text' onChange={taskInputHandler} />
//       <button>{props.loading ? 'Sending...' : 'Add Task'}</button>
//     </form>
//   );
// };

// const Tasks = (props) => {
//   let taskList = <h2>No tasks found. Start adding some!</h2>;

//   if (props.items.length > 0) {
//     taskList = (
//       <ul>
//         {props.items.map((task) => (
//           <li key={task.id}>{task.text}</li>
//         ))}
//       </ul>
//     );
//   }

//   let content = taskList;

//   if (props.error) {
//     content = <button onClick={props.onFetch}>Try again</button>;
//   }

//   if (props.loading) {
//     content = 'Loading tasks...';
//   }

//   return (
//     <div>
//       <div>{content}</div>
//     </div>
//   );
// };

const App = () => {
  return (
    <div>
      marin
    </div>
  )
}

export default App;