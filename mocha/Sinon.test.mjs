//import { fetchUsers,printUsers } from './fetchUsersPrint.mjs';
import * as myModule from './fetchUsersPrint.mjs'
import sinon from 'sinon';
import fetch from 'node-fetch';
import {expect} from 'chai';
//import { json } from "stream/consumers";

describe('Тестирование функции fetchusers', function () {
    let fetchUsersStub;
    // создадим заглушку для fetch
    beforeEach(() => {
        fetchUsersStub = sinon.stub(myModule, 'fetchUsers').returns(Promise.resolve(mockData));
    });
    // восстанавливаем  после теста fetch
    afterEach(() => {
        if (fetchUsersStub) {
            fetchUsersStub.restore();
        }
    });

    it('Должен выводить колличество пользователей', async function(){
        const fakeUsers = [
            {name: 'Test TestUser1'},
            {name : 'Test Test User2'}
        ];
        fetchUsersStub.stub.returns({
            ok:true,
            json: async () => fakeUsers
        });
// заглушка для  console.log
        const consoleLogStub = sinon.stub(console,'log');
        await printUsers();


        expect(consoleLogStub.callCount).to.equal(2); //проверяем что выведены имена
    });
    it ('Должен выводить имена пользователей', async function () {
        expect(consoleLogStub.firstCall.args[0]).to.equal('Test TestUser1'); // проверяем первое имя
        consoleLogStub.restore(); // восстанавливаем оригинальный файл console.log
    });
});