import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { params } from "../lib/params";

import { TaskProps } from "../components/EditInfoTask";

export function GetDetailsTask() : TaskProps {
    const [ taskUser, setTasksUser ] = useState<TaskProps>();

    useEffect(() => {
        api.get(`/Lusi/${params[1]}`)
        .then(response => response.data)
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
                document.title = data!.title;
            }
        }).catch(function (error) {
            console.log(error)
            if(error.response?.status === 401){
                var messageError = document.getElementById('TitleHome')
                messageError!.style.display = "block";
                
                messageError!.innerHTML = "Você não está logado!"
                messageError!.style.color = "red";
            }

            if(error.response?.data?.msg === "This task doesn't exist!"){
                window.location.replace("/UserTask")
            }
        });    
    }, [])

    return taskUser!
}