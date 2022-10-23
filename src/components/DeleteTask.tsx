import axios from "axios";

const params = window.location.pathname.split("UserTask/")

function DeleteActionTask()
{
    axios({
        method: "Delete",
        url: `https://localhost:7288/lusi/DeleteTask/${params[1]}`,
        headers: {Authorization: `Bearer ${localStorage.token}`},
    }).then(function (response) {
        location.replace("/UserTask/");
    })
    .catch(function (error) {
        console.log(error)
    });
}

type WarningDeleteMessageProps = {
    display: string
}

export function WarningDeleteMessage(){
    const containerNewTask = document.getElementById("ContainerDeleteTask")

    document.getElementById('ButtonDeleteTask')?.addEventListener('click', () => {
        containerNewTask!.style.display = 'flex'
    })

    document.getElementById('ButtonCancelDelete')?.addEventListener('click', () => {
        console.log("teste")
        containerNewTask!.style.display = 'none'
    })

    return(
        <div id="ContainerDeleteTask"
            style={{
                position: "absolute",
                width: "100vw",
                height: "100vh",
                display: 'none',
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                backgroundColor: "#6d6d6d6c"
            }}
        >
            <div id="CreateNewTask"
                style={{
                  
                    width: "60vw",
                    height: "60vh"
                }}
            >
                <p
                    style={{
                        textAlign: "center"
                    }}
                > 
                    Você tem certeza que deseja deletar essa tarefa? Essa ação
                    é irreversível! 
                </p>

                <section id="Buttons"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "10%"
                    }}
                >
                    <button id="ButtonCancelDelete" type="button"
                        style={{
                            background: "#2880fc"
                        }}
                    >
                        Cancelar
                    </button>
                    <button type="button" id="AddMoreOptions" onClick={DeleteActionTask}>
                        Apagar    
                    </button>
                </section>
            </div>
        </div>
    )
}

