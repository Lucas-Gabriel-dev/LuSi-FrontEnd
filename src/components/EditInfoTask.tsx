import { params } from "../lib/params";
import { api } from "../lib/axios";
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

export async function EditInfoTask(infoTask: ITask)
{
    try {
        const response = await api.patch("/lusi/EditTask", 
            infoTask
        )
    } catch (error) {
        console.log(error)
    }
}

export function AlterStatusOptionTask(infoOption: TaskOptionsProps){
    if(infoOption.complete == true){
        infoOption.complete = false
    }else
    {
        infoOption.complete = true
    }

    EditOptionsTask(infoOption);

    location.reload();
}

export async function EditOptionsTask(infoOption: TaskOptionsProps, optionName?: any){
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

    try {
        const response = await api.patch("/lusi/EditOptionsTask", 
            user
        )
    } catch (error) {
        console.log(error)
    }
}

export function AddMoreOption()
{
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data: any) => {
        const options = [ data.nameOption ]

        try {
            const response = await api.post(`/lusi/addtaskoption?idTask=${params[1]}`, 
                options
            )

            if(response.status === 200)
            {
                location.reload();
            }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <Form onSubmit={handleSubmit(onSubmit)} >
            <div id="CreateNewOptions">
                <input 
                    type="text"
                    placeholder="Adicione uma nova etapa"
                    id="InputAddNewStep"
                    {...register("nameOption")}
                />
                <input type="submit" id="AddMoreOptions"  value={"Enviar"}/>
            </div>
        </Form> 
    )
}


