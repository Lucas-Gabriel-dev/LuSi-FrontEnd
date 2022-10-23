import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "./Form/Form";



type CreateNewTaskProps = {
    display: string
}

interface IFormState {
    name: string;
}

let numberInput = 1; 

export function CreateNewTask(props: CreateNewTaskProps){
    const { register, handleSubmit } = useForm();
    
    const [formState, setFormState] = useState<string[]>([]);
    

    const [inputs, setInputs ] = useState<any>([
        <input 
            type="text" 
            className="Teste" id="InputOption"  
            onChange={(event) => setFormState([
                ...formState, 
                event.currentTarget?.value,
            ])} 
            required
        />
    ]);

    const containerNewTask = document.getElementById("ContainerNewTaskTab")

    let actualDate = new Date().getDate()
    let actualMonth = new Date().getMonth()
    let actualYear = new Date().getFullYear()
    let formatDate = `${actualYear}-${actualMonth + 1}-${actualDate}`

    document.getElementById('ButtonAdd')?.addEventListener('click', () => {
        containerNewTask!.style.display = 'flex'
    })

    document.getElementById('ButtonCancel')?.addEventListener('click', () => {
        containerNewTask!.style.display = 'none'
    })

    function Inputs()
    {    
        setInputs([...inputs, 
            <input 
                type="text" 
                className="Teste" id="InputOption"  
                onChange={(event) => setFormState([
                    ...formState, 
                    event.currentTarget?.value,
                ])} 
                required
            />
        ])
        
        numberInput += 1;
    }

    function RemoveInput(){
        var list = inputs
        console.log(list)

        if(numberInput > 1){
            inputs.pop();

            numberInput -= 1;

            setInputs([...inputs]);
        }
        console.log(list)
    }

    const onSubmit = (data: any) =>{
        let taskOptions: Array<IFormState> = [{
            name: ''
        }];
        
        for (let index = 0; index < formState.length; index++) {
            taskOptions[index] = {name: formState[index]};
        }

        const user = {
            title: data.title,
            description: data.description,
            deadline: data.deadline,
            taskOptions: taskOptions
        }

        axios({
            method: "post",
            url: "https://localhost:7288/lusi/addtask",
            headers: {Authorization: `Bearer ${localStorage.token}`},
            data: user
        }).then(function (response) {
            location.replace(`/UserTask/${response.data.idTaks}`)
        })
          .catch(function (error) {
            console.log(user);
        });
    }


    return(
        <div id="ContainerNewTaskTab"
            style={{
                position: "absolute",
                width: "100vw",
                height: "100vh",
                display: `${props.display}`,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center"
            }}
        >
            <div id="CreateNewTask">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div id="FormCreateNewTask">
                        <section className="SectionTask">
                            <label htmlFor="">Título da tarefa:</label>
                            <input type="text" {...register("title")} required/> 
                        </section>
                        <section className="SectionTask">
                            <label htmlFor="">Prazo para concluir:</label>
                            <input type="date" min={formatDate}  {...register("deadline")} required/> 
                        </section>
                        <section className="SectionTask">
                            <label htmlFor="">Descrição da tarefa:</label>
                            <input type="textarea"{...register("description")} required/> 
                        </section>

                        <section className="SectionTask" id="lastSection"
                            style={{
                                width: "70%",
                                display: "flex",
                                flexDirection: "column",
                                margin: "auto",
                            }}
                        >
                            <label htmlFor="">Etapas para concluir:</label>
                            {
                                inputs
                            }
                        </section>

                        <section className="SectionTask"
                            style={{
                                display: "flex",
                                margin: "auto"
                            }}
                        >
                            <span className="material-symbols-outlined" id="ButtonCircleNegative" onClick={RemoveInput}>
                                do_not_disturb_on
                            </span>
                            <span className="material-symbols-outlined" id="ButtonCirclePlus" onClick={Inputs}>
                                add_circle
                            </span>
                        </section>
                    </div>

                    <section id="Buttons"
                        style={{
                            display: "flex",
                            justifyContent: "end"
                        }}
                    >
                        <button id="ButtonCancel" type="button">
                            Cancelar
                        </button>
                        <input type="submit" id="AddMoreOptions" value={"Adicionar Tarefa"}/>
                    </section>
                </Form>
            </div>
        </div>
        
    )
}
