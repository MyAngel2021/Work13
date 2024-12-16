import fetch from 'node-fetch';
//const fetch =require('node-fetch');
//const {Console} = require('console');
import { Console } from 'console';
export async function fetchUsers() {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/users');
        if(!response.ok) {
            throw new Error(`ошибка HTTP: ${response.status}`);
        }
        // получаем данные в формате json
        let data = await response.json();
       // выводим в консоль пользователей
        for (const item of data ) {
            console.log(item.name);

        }
    } catch (error) {
        console.error('Произошла ошибка:', error.message);
    }
}


fetchUsers();