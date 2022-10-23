export function Header(){
    function RedirectUser(){
        window.location.replace("home/")
    }

    return(
        <header id="LogoPage" onClick={RedirectUser}
            style={{
                fontSize: "clamp(1px, 4.8rem, 10vw)",
                textAlign: "right",
                marginRight: '8%',
                marginTop: '1%',
                cursor: 'pointer',
            }}
        >
            <p>LuSi</p>
        </header>
    );
}