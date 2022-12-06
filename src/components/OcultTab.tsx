export function OcultTab(){
    const divUserTasks = document.getElementById("UserTasks");
    const divUserTaskDetail = document.getElementById("UserTaskDetail");
    const menuButton = document.getElementById("ButtonMenu")

    if(divUserTasks!.style.animationName != "ocultDivUserTasks"){
        divUserTasks!.style.animationName = "ocultDivUserTasks"
        divUserTaskDetail!.style.animationName = "alignDivUserTaskDetail"
        menuButton!.style.animationName = "alignButtonMenu"

        return
    }
    
    divUserTasks!.style.animationName = "returnDivUserTasksOriginalPosition"
    menuButton!.style.animationName = "returnButtonMenuOriginalPosition"
    divUserTaskDetail!.style.animationName = "returnDivUserTaskDetailOriginalPosition"
}