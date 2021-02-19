import axios from "axios";
import User from './user';
import http  from '../Http-common';
class UserService {
   
 
    // getLogin(username:any) {
    //     return axios.get('/getlogin?empName='+username, {withCredentials: false}).then(result => {
    //         console.log(`Recieved ${JSON.stringify(result.data)} from ${'/getlogin'}users`);
    //         return result.data;
    //     });
    // }

    getLogin(username: any) {
        console.log('url is '+'/getlogin?empName='+username);
        return http.get('/getlogin?empName='+username);
      }
}

export default new UserService();