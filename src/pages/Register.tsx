import axios from "axios";
import PeopleReading from "/images/PeopleReading.svg";
import { useForm } from "react-hook-form";
import Form from "../components/Form/Form";
import { Header } from "../components/Header";

export function Register(){
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) =>{
        const user = {
            name: data.name,
            email: data.email,
            password: data.password,
        }

        axios({
            method: "post",
            url: "https://localhost:7288/user/createuser",
            data: user
        }).then(function (response) {
            localStorage.setItem('token', response.data.token)
            if(localStorage.token){
                window.location.replace("/usertask")
            }
          })
          .catch(function (error) {
            console.log(error)
            if(error.response.data){
                var messageError = document.getElementById('MessageError')
                messageError!.style.display = "block";

                document.querySelector('#MessageError')!.innerHTML = "Esse email já existe!"
            }
          });
    }

    return (
        <div>
            <Header/>

            <div id="ContainerUser">
                <div id="ContentUser">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <p className="TitleForm">Cadastro de usuários</p>

                        <p id="MessageError" style={{
                            color: "red",
                            textAlign: "center",
                            marginBottom: "2%"
                        }}></p>

                        <label className="LabelForm">Nome</label>
                        <input type="text" {...register("name")} required/>

                        <label className="LabelForm">E-mail</label>
                        <input type="email" {...register("email")} required/>
                        
                        <label className="LabelForm">Senha</label>
                        <input type="password" {...register("password")} required/>


                        <input type="submit" className="buttonDetach form" value="Cadastrar"/>
                    </Form>
                </div>

                <div id="IllustrationArea">
                    <img src={PeopleReading} className="PersonIllustration" alt="Ilustração de pessoas lendo livro"/>
                    <a className="buttonDetach" href="/login">Já tenho conta</a>
                </div>
            </div>
        </div>

        
    );
}