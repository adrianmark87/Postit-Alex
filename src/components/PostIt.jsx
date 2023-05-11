import React from "react";
import Task from "./Task";

function PostIt({ postIt, handleDelete, taskCheck }) {
  const [disable, setDisable] = React.useState(true)

  const style = {
    margin: 15,
    backgroundColor: "#fffb27",
    borderRadius: 10,
    width: 200,
    wordBreak: "break-word",
    color: "black",
    height: "max-content",
    display: "flex",
    flexDirection:"column",
    alignItems:"center" 
  }

  React.useEffect(() => {
    setDisable(!postIt.tasks.every(({ isDone }) => isDone))
  }, [postIt.tasks])

  return (
    <div style={style}>
      <h4>{postIt.title}</h4>
      <div style={{ listStyle: "none"}}>
        {postIt.tasks.map(task => (
          <Task task={task} taskCheck={taskCheck} pID={postIt.id} key={task.id} />
        ))}
      </div>
      <button disabled={disable} style={{ marginTop: 20 }} onClick={() => handleDelete(postIt.id)}>Delete</button>
    </div>
  )
}

export default PostIt