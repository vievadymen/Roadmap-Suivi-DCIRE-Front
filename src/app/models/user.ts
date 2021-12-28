import { Role } from "./role";

export class User 
{
    username: string ;
    password: string;
    roles:Role;
    token?:string
}


export class Users 
{
    nom: string ;
    prenom: string;
    matricule:Role;
    service:string;
    email:string;
}