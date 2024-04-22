
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
            const profile = await API.getMyProfile();
            console.log(profile);
        }
        
    } catch (error) {
        console.log(error);
    }
}

async function signUp() {
    const body  = {
        identifierCode: "ASHJKGDBJSAKBHDJSB",
        name: "Viktor",
        surname: "Johansson",
        email: "viktor.johansson@mithings.se",
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
