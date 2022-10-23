import { CreateNewTask } from "./CreateNewTask";
import { Header } from "./Header";

export function NewUser(){
    return(
        <div
            style={{
                backgroundColor: "#F4F4F5",
            }}
        >
            <Header/>

            <p
                style={{
                    fontSize: "clamp(1px, 2.2rem, 2vw)",
                    fontFamily:'Poppins, sans-serif',
                    fontWeight: 400,
                    textAlign: "center",
                    margin: '1% auto -3% auto',
                    width: '60vw'
                }}
            >
                Olá, seja bem-vindo ao <b>LuSi</b>, a plataforma online que te auxilia
                no controle de suas tarefas! <br />
                Como pude notar, você ainda não possui tarefas cadastradas em nosso site... Que
                tal adicionar uma agora?! Basta preencher o formulário abaixo!
            </p>

            <CreateNewTask display="flex"/>
        </div>
    )
}