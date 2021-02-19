import * as AWS from 'aws-sdk';
import userService from '../user/user.service';


// Set the region
AWS.config.update({ region: 'us-east-2' });

// Create a DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const UserTable = {
    TableName: 'UserTable'
}
const ClaimTable ={
    TableName: 'ClaimTable'
}

const ClaimTableSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'ClaimId',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'ClaimId',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
    },
    TableName: 'ClaimTable',
    StreamSpecification: {
        StreamEnabled: false
    }
};

const UserTableSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'EmpName',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'EmpName',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
    },
    TableName: 'UserTable',
    StreamSpecification: {
        StreamEnabled: false
    }
};

ddb.deleteTable(ClaimTable, function (err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
    }
    setTimeout(()=>{
        ddb.createTable(ClaimTableSchema, (err, data) => {
            if (err) {
                // log the error
                console.log('Error', err);
            } else {
                // celebrate, I guess
                console.log('Table Created', data);
            }
        });
    }, 5000);
});

ddb.deleteTable(UserTable, function (err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
    }
    setTimeout(()=>{
        ddb.createTable(UserTableSchema, (err, data) => {
            if (err) {
                // log the error
                console.log('Error', err);
            } else {
                // celebrate, I guess
                console.log('Table Created', data);
                setTimeout(()=>{
                    populateUserTable();
                }, 10000);
            }
        });
    }, 5000);
});

function populateUserTable() {
    userService.addUser({EmpName: 'Justin', Password: 'pass', Role: 'Employee'}).then(()=>{});
    userService.addUser({EmpName: 'Katy', Password: 'pass', Role: 'Supervisor'}).then(()=>{});
    userService.addUser({EmpName: 'Selena', Password: 'pass', Role: 'HOD'}).then(()=>{});
    userService.addUser({EmpName: 'Nick', Password: 'pass', Role: 'HR'}).then(()=>{});
    userService.addUser({EmpName: 'Shawn', Password: 'pass', Role: 'HR'}).then(()=>{});
}

