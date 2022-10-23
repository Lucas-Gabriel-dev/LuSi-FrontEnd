import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "./Form/Form";

export type TaskOptionsProps = {
    id: string;
    name: string;
    currentTaskId: string;
    complete: boolean; 
}

export type TaskProps = {
    title: string;
    description: string;
    createdAt: string;
    deadLine: string,
    options: Array<TaskOptionsProps>; 
    progress: string;
}

interface ITask{
    id: string,
    title: string, 
    description: string
}

const params = window.location.pathname.split("UserTask/")

export function EditTitleTask(newValue?: any)
{
    if(newValue == null)
    {
        return
    }
    
    const newValues: ITask = {
        id: params[1],
        title: newValue,
        description: ""
    }
  
    EditInfoTask(newValues)
}

export function EditDescriptionTask(newValue?: any)
{
    if(newValue == null)
    {
        return
    }

    const newValues: ITask = {
        id: params[1],
        title: "",
        description: newValue
    }
        
    EditInfoTask(newValues)
}

export function EditInfoTask(infoTask: ITask)
{
    axios({
        method: "PATCH",
        url: "https://localhost:7288/lusi/EditTask",
        headers: {Authorization: `Bearer ${localStorage.token}`},
        data: infoTask
    }).then(function (response) {
    })
    .catch(function (error) {
        console.log(error)
    });
}

export function AlterStatusOptionTask(infoOption: TaskOptionsProps){
    if(infoOption.complete == true){
        infoOption.complete = false
    }else
    {
        infoOption.complete = true
    }

    EditOptionsTask(infoOption);
}

export function EditOptionsTask(infoOption: TaskOptionsProps, optionName?: any){
    const user = [{
        id: infoOption.id,
        name: infoOption.name,
        currentTaskId: params[1],
        complete: infoOption.complete,
    }]

    if(optionName != null)
    {
        user[0].name = optionName;
    }

    axios({
        method: "PATCH",
        url: "https://localhost:7288/lusi/EditOptionsTask",
        headers: {Authorization: `Bearer ${localStorage.token}`},
        data: user
    }).then(function (response) {
    })
    .catch(function (error) {
        console.log(error)
    });
}

export function AddMoreOption()
{
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) =>{
        const options = [ data.nameOption ]

        axios({
            method: "post",
            url: `https://localhost:7288/Lusi/addtaskoption?idTask=${params[1]}`,
            headers: {Authorization: `Bearer ${localStorage.token}`},
            data: options
        }).then(function (response) {
            location.reload();
        })
        .catch(function (error) {
        });
    }

    return(
        <Form onSubmit={handleSubmit(onSubmit)} >
            <div id="CreateNewOptions">
                <input 
                    type="text"
                    placeholder="Adicione uma nova etapa"
                    id="InputAddNewStep"
                    {...register("nameOption")}
                    // onInput={e => AddMoreOption(e.currentTarget.value)}
                />
                <input type="submit" id="AddMoreOptions"  value={"Enviar"}/>
            </div>
        </Form> 
    )
}


