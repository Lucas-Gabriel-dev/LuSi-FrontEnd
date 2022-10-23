export function Home(){
    if(localStorage.token)
    {
        window.location.replace("/UserTask/") 
    }

    return(
        <div>
            <header 
                style={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <h1 className="logoName"
                    style={{
                        fontSize: "clamp(1px, 4.8rem, 10vw)"
                    }}
                > 
                    LuSi 
                </h1>
                <p
                    style={{
                        fontFamily:'Poppins, sans-serif',
                        fontWeight: 400,
                        fontSize: 'clamp(1px, 2.5rem, 2vw)',
                        lineHeight: '38px',
                        textAlign: 'center',
                        width: '50vw',
                        marginBottom: '2%'
                    }}
                >
                    LuSi é um ToDo simples e eficiente. Essencial para gerenciar 
                    suas tarefas do cotidiano! Para continuar
                </p>   

                <section className="buttons"
                    style={{
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <a href="/login" className="buttonDetach Home"> Entre na sua conta </a>
                    <p
                        style={{
                            margin: '10% 0',
                            fontFamily: 'Ubuntu, sans-serif',
                            fontSize: 'clamp(1px, 2.5rem, 2vw)',
                            fontWeight: '500',
                        }}
                    >OU</p>
                    <a href="/register" className="buttonDetach Home"> Registre-se </a>
                </section> 
            </header>
        </div>
        
    )
}