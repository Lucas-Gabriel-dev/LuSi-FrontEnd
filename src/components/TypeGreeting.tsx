export function TypeGreeting(){
    let actualDate = new Date().getHours()

    let message;

    if(actualDate >= 5 && actualDate <= 12)
    {
        message = "Bom dia";
    }
    if(actualDate >= 13 && actualDate <= 18)
    {
        message = "Boa tarde"
    }
    if(actualDate >= 19 && actualDate <= 4)
    {
        message = "Boa noite"
    }

    return message
}