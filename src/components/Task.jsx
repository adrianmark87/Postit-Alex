import React from "react";

function Task({ task, taskCheck, pID }) {
    const [isDone, setIsDone] = React.useState(false)

    const style = {
        display: "flex",
        padding: 3,
        cursor: "pointer",
    }

    return (
        <div style={style} onClick={() => taskCheck(pID, task.id)}>
            <input type="checkbox" checked={task.isDone} />
            <label style={task.isDone ? { textDecoration: "line-through", fontStyle: "italic" } : {}} >{task.toDo} </label>
        </div>
    )

    // return (
    //     <div style={style} onClick={() => setIsDone(!isDone)}>
    //         <input type="checkbox" checked={isDone}  />
    //         <li style={isDone ? { opacity: 0.7 } : {}} >{task.toDo} </li>
    //     </div>
    // )
}

export default Task