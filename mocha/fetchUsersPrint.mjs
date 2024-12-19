import fetch from 'node-fetch';
export async function fetchUsers() {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/users');
        if(!response.ok) {
            throw new Error(`ошибка HTTP: ${response.status}`);
        }
        // получаем данные в формате json
        return await response.json();
    } catch (error) {
        return console.error('Произошла ошибка:', error.message);
    }
}
export async function printUsers() {
    let data = await fetchUsers();
// выводим в консоль пользователей
    for (const item of data ) {
        console.log(item.name);
}
}
printUsers();