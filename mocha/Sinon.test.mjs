import { fetchUsers } from './fetchUsers.mjs';
import sinon from 'sinon';
import fetch from 'node-fetch';
import {expect} from 'chai';
//import { json } from "stream/consumers";

describe('Тестирование функции fetchusers', function () {
    let fetchStub;
    // создадим заглушку для fetch
    this.beforeEach(() => {
        fetchStub=sinon.stub(fetch,'default');
    });
    // восстанавливаем  после теста fetch
    this.afterEach(()=>{
        fetchStub.restore();
    });

    it('Должен выводить имена пользователей', async function(){
        const fakeUsers = [
            {name: 'Leanne Graham'},
            {name: 'Test TestUser1'},
        ];
        fetchStub.resolves({
            ok:true,
            json: async () => fakeUsers
        });
// заглушка для  console.log
        const consoleLogStub = sinon.stub(console,'log');
        await fetchUsers();

        expect(consoleLogStub.callCount).to.equal(fakeUsers.length); //проверяем что выведены имена
        expect(consoleLogStub.firstCall.args[0]).to.equal(fakeUsers[0].name); // проверяем первое имя
        consoleLogStub.restore(); // восстанавливаем оригинальный файл console.log
    });
});