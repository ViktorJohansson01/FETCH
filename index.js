
import { toByteArray, fromByteArray } from 'base64-js';
import API from './data-access/index.js';

const loginDetails = {
    email: "CesareRossi@test.tech4care.eu", password: "Password1!"
}

async function signIn() {
   
    try {
        const data = await API.authorize({ username: loginDetails.email, password: loginDetails.password})
        if (!data.error) {
            console.log(data);
            const profile = await API.drugList({startTime: "00:00", endTime: "23:59", date: "2024-03-25"});
            console.log(profile);
        }
        
    } catch (error) {
        console.log(error);
    }
}

async function signUp() {
    const body  = {
        identifierCode: "ASHJKGDBJSAKBHDJSBA",
        name: "Viktorr",
        surname: "Johanssonn",
        email: "viktor.johanssonn@mithings.se",
        nation: "sw"
    }
    try {
        const data = await API.signUp({ body })
        if (!data.error) {
            console.log(data);
        }
    } catch (error) {
        console.log(error);
    }
}

signIn();
