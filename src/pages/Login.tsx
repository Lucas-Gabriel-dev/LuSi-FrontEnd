import ManReading from "/images/ManReading.svg"
import { useForm } from "react-hook-form";
import Form from "../components/Form/Form";
import axios from "axios";
import { Header } from "../components/Header";


export function Login(){
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) =>{
        const user = {
            email: data.email,
            password: data.password
        }

        axios({
            method: "post",
            url: "https://localhost:7288/user/login",
            data: user
        }).then(function (response) {
            if(response.data){
                localStorage.setItem('token', response.data.token)
                
                window.location.replace("/UserTask")
            }
          })
          .catch(function (error) {
            if(error.response.data){
                var messageError = document.getElementById('MessageError')
                messageError!.style.display = "block";

                document.querySelector('#MessageError')!.innerHTML = "Email ou senha incorreto"
            }
          });
    }

    return (
        <div>
            <Header/>

            <div id="ContainerUser" 
                style={{
                    alignItems: 'end'
                }}
            >
            <div id="ContentUser">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <p className="TitleForm">Entre na sua conta</p>
                    <p id="MessageError" style={{
                        color: "red",
                        textAlign: "center",
                        marginBottom: "2%"
                    }}></p>

                    <label className="LabelForm">E-mail</label>
                    <input type="email" id="EmailUser" {...register("email")} required
                        style={{
                            marginBottom: '10%',
                        }}
                    />

                    <label className="LabelForm">Senha</label>
                    <input type="password" id="PasswordUser" {...register("password")} required 
                        style={{
                            
                        }}
                    />

                    <input type="submit" className="buttonDetach form" value="Entrar"
                        style={{
                            
                           
                        }}
                    />
                </Form>
            </div>

            <div id="IllustrationArea">
                <img src={ManReading} className="PersonIllustration" alt="Ilustração de um homem lendo livro"
                    style={{
                        padding: "5%",
                        width: '45%'
                    }}
                />
                <a className="buttonDetach" href="/Register">Registre-se</a>
            </div>
            </div>
        </div>
        
    )
}