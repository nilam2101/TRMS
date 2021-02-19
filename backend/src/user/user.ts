/*Group 2: Introduce the ability to register a user.
As a user, I can register as a customer with a starting amount of money.
*/

import logger from '../log';
import userService from './user.service';

export class User {
    public Role: string = '';
    constructor(public EmpName: string, public Password: string,  Role: string) {
    };
}

