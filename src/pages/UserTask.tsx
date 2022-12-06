import { UserTaskTab } from "./UserTaskTab";
import { 
    AlterStatusOptionTask, 
    EditDescriptionTask, 
    EditTitleTask,
    EditOptionsTask,
    AddMoreOption 
} from "../components/EditInfoTask";

import { CreateNewTask } from "../components/CreateNewTask";
import { WarningDeleteMessage } from "../components/DeleteTask";
import { GetDetailsTask } from "../api/GetDetailsTask";

import "../styles/UserTask.css";

export function UserTask(){
    const taskUser = GetDetailsTask();

    return(
        <div id="UserTasks">
            <UserTaskTab/>
            <div id="UserTaskDetail">
                <p id="TaskDeadline">Prazo: {taskUser?.deadLine}</p>
                
                <header id="UserTaskHeader">
                    <p
                        contentEditable={true}
                        suppressContentEditableWarning
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
                            marginLeft: "5%",
                            fontSize: "clamp(5px, 2.4rem, 3vw)",
                            height: "min-content"
                        }}
                    >
                        delete
                    </span>
                </header>

                <section id="DescriptionTask">
                    <p id="Title"
                        style={{
                            fontSize: "clamp(5px, 2rem, 3vw)",
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
                                    onInput={e => EditOptionsTask(repo, e.currentTarget.textContent)}
                                    style={{
                                        textDecoration: (repo.complete ? "line-through" : "none")
                                    }}
                                > 
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