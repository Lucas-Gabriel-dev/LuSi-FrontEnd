import { useEffect, useState } from "react";

type TaskProps = {
    id: string;
    title: string;
    task_createdAt: Date;
    deadline: Date;
}

type NotificationProps = {
    description: string
}

type AllNotificationProps = {
    name: string,
    listNotification: Array<NotificationProps>
}

function Logout(){
    localStorage.token = '';

    window.location.replace("/")
}

const params = window.location.pathname.split("UserTask/")

export function UserTaskTab(){
    const [ taskUser, setTasksUser ] = useState<TaskProps[]>([]);
    const [ userNotifications, setUserNotifications ] = useState<AllNotificationProps>();

    if(localStorage.token == ""){
        window.location.replace("/")
    }

    useEffect(() => {
        fetch(`https://localhost:7288/Lusi/AllTask`, {
            headers: {Authorization: `Bearer ${localStorage.token}`},
        })
        .then(response => response.json())
        .then(data => {
            console.log(data[0]?.id)
            if(data[0]?.id == null){
                window.location.replace("/newuser")
            }

            if(data[0]?.id != null && params[1] == "" || params[1] == null)
            {
                window.location.replace(`/UserTask/${data[0].id}`)
            }

            if(!data.error){
                setTasksUser(data);
            }
        }).catch(function (error) {
            if(error.response.status === 401){
                window.location.replace("/login")
            }
        });    
    }, [])

    useEffect(() => {
        fetch(`https://localhost:7288/Lusi/UserNotifications`, {
            headers: {Authorization: `Bearer ${localStorage.token}`},
        })
        .then(response => response.json())
        .then(data => {
            if(!data.error){
                setUserNotifications(data);
            }
        }).catch(function (error) {
            console.log(error)
            if(error.response.status === 401){
                window.location.replace("/login")
            }
        });    
    }, [])

    let actualDate = new Date().getHours()

    let message;

    if(actualDate >= 5 && actualDate <= 12)
    {
        message = "Bom dia ⛅"
    }
    if(actualDate >= 13 && actualDate <= 18)
    {
        message = "Boa tarde ☀"
    }
    if(actualDate >= 19 && actualDate <= 23)
    {
        message = "Boa noite 🌚"
    }

    if(actualDate >= 0 && actualDate <= 4)
    {
        message = "Boa madruga 🌕"
    }


    return(
            <div id="FirstCollumn">
                <header>
                    <p className="logoName"
                        style={{
                            textAlign: 'center',
                            fontSize: 'clamp(1px, 4.8rem, 3vw)',
                            fontWeight: '400',
                            padding: '5%',
                            marginBottom: '12%'
                        }}
                    > LuSi </p>
                </header>

                <div id="Tasks">
                    <div id="TasksInfoArea">
                        <p className="TitleTasks"
                            style={{
                                fontSize: 'clamp(5px, 1.8rem, 2vw)',
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: '400',
                                marginLeft: '10%',
                                marginBottom: '7%'
                            }}
                        > Tarefas </p>

                        {taskUser.map(repo => {
                            return(
                                <div>
                                    <a className="TaskName" href={repo.id}> 
                                        <span className="material-symbols-outlined"
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
                    >{message}, {userNotifications?.name}!</p>

                
                        <section id="NotificationUser">
                            <p 
                                style={{
                                    marginBottom: '5%'
                                }}
                            > Notificações: </p>
                            {userNotifications?.listNotification.map(repo => {
                                return(
                                    <>
                                        <p className="DescriptionNotification"> {repo.description}</p>
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