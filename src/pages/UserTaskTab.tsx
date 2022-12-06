import { AllTask } from "../api/AllTask";
import { UserNotifications } from "../api/UserNotification";
import { OcultTab } from "../components/OcultTab";
import { Logout } from "../components/Logout";
import { params } from "../lib/params";
import { TypeGreeting } from "../components/TypeGreeting";

import "../styles/UserTaskTab.css";

export function UserTaskTab(){
    if(localStorage.token == ""){
        window.location.replace("/")
    }

    const taskUser = AllTask();
    const userNotifications = UserNotifications();

    let message = TypeGreeting();

    return(
            <div id="FirstCollumn">
                <span 
                    className="material-symbols-outlined"
                    id="ButtonMenu"
                    style={{
                        cursor: "pointer",
                        textAlign: "end",
                        padding: "2%",
                        fontSize: "clamp(5px, 2.4rem, 3vw)"
                    }}
                    onClick={OcultTab}
                >
                    menu
                </span>
                
                <header>
                    <p 
                        className="logoName"
                        style={{
                            textAlign: 'center',
                            fontSize: 'clamp(1px, 4.8rem, 3vw)',
                            fontWeight: '400',
                            padding: '5%',
                            marginBottom: '12%'
                        }}
                    > 
                        LuSi 
                    </p>
                </header>

                <div id="Tasks">
                    <div id="TasksInfoArea">
                        <p 
                            className="TitleTasks"
                            style={{
                                fontSize: 'clamp(5px, 1.8rem, 2vw)',
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: '400',
                                marginLeft: '10%',
                                marginBottom: '7%'
                            }}
                        > 
                            Tarefas 
                        </p>

                        {taskUser.map(repo => {
                            return(
                                <div>
                                    <a 
                                        className="TaskName" 
                                        href={repo.id}
                                        style={{
                                            backgroundColor: repo.id == params[1] ? "#d1d5db" : ""
                                            
                                        }}
                                    > 
                                        <span 
                                            className="material-symbols-outlined"
                                            style={{
                                                fontSize: 'clamp(5px, 1.4rem, 1vw)',
                                            }}
                                        >
                                            arrow_forward_ios
                                        </span>
                                    
                                        {repo.title}
                                    </a>
                                </div>
                            )
                        })}
                        
                    </div>

                    <button id="ButtonAdd">Adicionar nova tarefa...</button>
                </div>

                <div id="Notification">
                    <p 
                        style={{
                            margin: '5% 0px',
                            textAlign: 'center'
                        }}
                    >
                        {message}, {userNotifications?.name}!
                    </p>
                    <section id="NotificationUser">
                        <p 
                            style={{
                                marginBottom: '5%'
                            }}
                        > 
                            Notificações: 
                        </p>
                        
                        {userNotifications?.listNotification[0] 
                            ? 
                                userNotifications?.listNotification.map(repo => {
                                    return(
                                        <>
                                            <p className="DescriptionNotification"> 
                                                {repo.description}
                                            </p>
                                            <div className="Separator"></div>
                                        </>
                                    )
                                })
                            : 
                                <>
                                    <p>
                                        Você não possui notificações!
                                    </p>
                                </>
                        }
                        {userNotifications?.listNotification.map(repo => {
                            return(
                                <>
                                    <p className="DescriptionNotification"> 
                                        {repo.description}
                                    </p>
                                    <div className="Separator"></div>
                                </>
                            )
                        })}
                    </section>
                    
                    <button className="ButtonLogout" onClick={Logout}>
                        Sair
                    </button>
                </div>
            </div>
    )
}