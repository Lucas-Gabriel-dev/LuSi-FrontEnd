import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { params } from "../lib/params";

type TaskProps = {
    id: string;
    title: string;
    task_createdAt: Date;
    deadline: Date;
}

export function AllTask(): TaskProps[]{
    const [ taskUser, setTasksUser ] = useState<TaskProps[]>([]);

    useEffect(() => {
        api.get(`/Lusi/AllTask`)
        .then(response => response.data)
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

    return taskUser
}