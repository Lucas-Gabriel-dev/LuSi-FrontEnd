export function Logout(){
    localStorage.token = '';

    window.location.replace("/")
}