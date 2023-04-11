import { useState } from 'react'
import './App.css'
import PostIt from './components/PostIt';

let taskID = 0;
let postItID = 0;

const initialNPIState = { title: "", tasks: [{ id: taskID, isDone: false, toDo: "" }] }

function App() {
  const [errorMessage, setErrorMessage] = useState("");

  const [postItList, setPostItList] = useState([]);
  const [newPostIt, setNewPostIt] = useState(initialNPIState);

  function handleTitleChange(e) {
    setNewPostIt({
      ...newPostIt,
      title: e.target.value
    })
  }

  function handleTaskChange(e, i) {
    const taskChange = newPostIt.tasks.map((task, index) => {
      if (index === i) {
        return {
          ...task,
          toDo: e.target.value
        }
      } else {
        return task
      }
    });

    setNewPostIt({
      ...newPostIt,
      tasks: taskChange
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    const newPaper = {
      title: newPostIt.title,
      tasks: newPostIt.tasks.filter(task => task.toDo !== "").map(task => {
        return task
      })
    }

    if (newPaper.title === "") {
      return setErrorMessage("You need to write a title.")
    }

    if (newPaper.tasks.length === 0) {
      return setErrorMessage("You need to write a task to do.")
    }
    setErrorMessage("")

    setNewPostIt(initialNPIState);

    taskID = 0;

    postItID++;

    setPostItList([
      ...postItList,
      {
        id: postItID,
        ...newPaper
      }
    ])
  }

  function handleDelete(pID) {
    setPostItList(
      postItList.filter(postIt =>
        postIt.id !== pID
      )
    )
  }

  function newTask(e) {
    e.preventDefault()
    // add limit
    if (taskID === 4) {
      return setErrorMessage("5 tasks max")
    } else {
      taskID++;
       return setNewPostIt({
        ...newPostIt,
        tasks: [
          ...newPostIt.tasks,
          {
            id: taskID,
            toDo: ""
          }
        ]
      })
    }
  }

  function toggleTask(postItId, taskId) {
    let copyPostItList = [...postItList];
    setPostItList(copyPostItList.map(postIt => {
      if (postIt.id === postItId) {
        let updatedTasks = postIt.tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, isDone: !task.isDone };
          }
          else {
            return task;
          }
        });
        return { ...postIt, tasks: updatedTasks };
      }
      else {
        return postIt;
      }
    }));
  }

  const style = {
    column: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }


  return (
    <div className="App" >
      {/* Input */}
      <div style={style.column}>
        <div style={{ width: 300, border: "2px solid #fffb27" }}>
          <h2>New Post-it</h2>
          <form>
            <div style={style.column}>
              <label>Title</label>
              <input type="text" id="title" value={newPostIt.title} onChange={handleTitleChange} />
            </div>
            <div style={style.column}>
              <p style={{ color: "red" }}>{errorMessage}</p>
              <label>Tasks</label>
              {newPostIt.tasks.map((task, index) => {
                return (
                  <input style={{ margin: 2 }} key={task.id} type="text" id="title" value={task.toDo} onChange={(e) => handleTaskChange(e, index)} />
                )
              })}
              <button onClick={newTask}>+</button>
            </div>
            <button onClick={handleSubmit}>Submit</button>
          </form>
        </div>
      </div>

      {/* To Do */}
      <div>
        <h2>To Do</h2>
        <div style={{ display: "flex", flexWrap: "wrap", minHeight: 100 }}>
          {postItList.map(postIt => (
            <PostIt postIt={postIt} key={postIt.id} handleDelete={handleDelete} taskCheck={toggleTask} />
          ))}
        </div>
      </div>
    </div >
  )
}

export default App
