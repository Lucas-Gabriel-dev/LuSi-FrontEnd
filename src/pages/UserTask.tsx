import { UserTaskTab } from "./UserTaskTab";
import { useEffect, useState } from "react";
import { 
    AlterStatusOptionTask, 
    EditDescriptionTask, 
    EditTitleTask,
    EditOptionsTask,
    TaskProps,
    AddMoreOption 
} from "../components/EditInfoTask";

import { CreateNewTask } from "../components/CreateNewTask";
import { WarningDeleteMessage } from "../components/DeleteTask";

const params = window.location.pathname.split("UserTask/")

export function UserTask(){
    const [ taskUser, setTasksUser ] = useState<TaskProps>();

    useEffect(() => {
        fetch(`https://localhost:7288/Lusi/${params[1]}`, {
            headers: {Authorization: `Bearer ${localStorage.token}`},
        })
        .then(response => response.json())
        .then(data => {
            if(data.error){
                var OcultDiv = document.getElementById('Content')
                var MessageError = document.getElementById('AlertMessage')
                
                OcultDiv!.style.display = "none";
                MessageError!.style.display = "block";
                
                return
            }

            if(!data.error){
                setTasksUser(data);
            }

        }).catch(function (error) {
            console.log(error)
            if(error.response.status === 401){
                var messageError = document.getElementById('TitleHome')
                messageError!.style.display = "block";
                
                messageError!.innerHTML = "Você não esta logado!"
                messageError!.style.color = "red";
            }
        });    
    }, [])

    return(
        <div id="UserTasks">
            <UserTaskTab/>
                <div id="UserTaskDetail">
                    <p id="TaskDeadline">Prazo: {taskUser?.deadLine}</p>
                    
                    <header id="UserTaskHeader">
                        <p id="TaskName" contentEditable="true"  
                            suppressContentEditableWarning={true}
                            onInput={e => EditTitleTask(e.currentTarget.textContent)}
                            
                            style={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: 'clamp(5px, 4.8rem, 8vw)',
                                color: '#0F172A',
                                wordBreak: 'break-word'
                            }}
                        >
                            {taskUser?.title}
                        </p>

                        <p id="ProgressTask">
                            {taskUser?.progress}%
                        </p>

                        <span className="material-symbols-outlined" id="ButtonDeleteTask"
                            style={{
                                cursor: 'pointer',
                                marginLeft: "5%"
                            }}
                        >
                            delete
                        </span>
                    </header>

                    <section id="DescriptionTask">
                        <p id="Title"
                            style={{
                                fontWeight: 600,
                                paddingBottom: '2%'
                            }}
                        >
                            Descrição
                        </p>

                        <p 
                            contentEditable="true" 
                            suppressContentEditableWarning={true}
                            onInput={e => EditDescriptionTask(e.currentTarget.textContent)}
                        >
                            {taskUser?.description} 
                        </p>
                    </section>

                    <div id="TaskSteps">
                        {taskUser?.options.map(repo => {
                            return(
                                <div className="TaskOption">
                                    <input type="checkbox" name="" id="TaskStatus" onChange={() => AlterStatusOptionTask(repo)} defaultChecked={repo.complete}/> 
                                    <p 
                                        className="TaskStepName" 
                                        contentEditable="true" 
                                        suppressContentEditableWarning={true} 
                                        onInput={e => EditOptionsTask(repo, e.currentTarget.textContent)}> 
                                        { repo?.name }
                                    </p>

                                </div>
                            )
                        })}
                        
                        <AddMoreOption />  
                    </div>
                </div>
                
                <CreateNewTask display="none" />

                <WarningDeleteMessage />
        </div>
    )
}