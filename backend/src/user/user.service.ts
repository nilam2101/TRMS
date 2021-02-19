import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import logger from '../log';
import { User } from './user';

class UserService {
    private doc: DocumentClient;
    constructor() {
        // The documentClient. This is our interface with DynamoDB
        this.doc = dynamo; // We imported the DocumentClient from dyamo.ts
    }

    async addUser(user: User): Promise<boolean> {
        // object to be sent to AWS.
        const params = {
            // TableName - the name of the table we are sending it to
            TableName: 'UserTable',
            // Item - the object we are sending
            Item: user,
            ConditionExpression: '#EmpName <> :EmpName',
            ExpressionAttributeNames: {
                '#EmpName': 'EmpName',
            },
            ExpressionAttributeValues: {
                ':EmpName': user.EmpName,
            }
        };

        /*
            The await is just returning all of that as another promise
                to be resolved by a different layer of the application.
            put function takes in our params, and PUTs (http method) the item in the db.
            promise function returns a promise representation of the request
        */
        return await this.doc.put(params).promise().then((result) => {
            logger.info('Successfully created item');
            return true;
        }).catch((error) => {
            logger.error(error);
            return false;
        });
    }

}

const userService = new UserService();
export default userService;
