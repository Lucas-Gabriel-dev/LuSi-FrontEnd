import { useEffect, useState } from "react";
import { api } from "../lib/axios";

type NotificationProps = {
    description: string;
}

type AllNotificationProps = {
    name: string;
    listNotification: Array<NotificationProps>;
}

export function UserNotifications() : AllNotificationProps{
    const [ userNotifications, setUserNotifications ] = useState<AllNotificationProps>();

    useEffect(() => {
        api.get(`/Lusi/UserNotifications`)
        .then(response => response.data)
        .then(data => {
            if(!data.error){
                setUserNotifications(data);
            }
        }).catch(function (error) {
            console.log(error)
            if(error.response.status === 401){
                window.location.replace("/login")
            }
        });    
    }, [])

    return userNotifications!
}