import express from 'express';
import docClient from '../dynamo/dynamo'

const router = express.Router();

/* GET home page. */
router.get('/', function(req:any, res:any, next:any) {
  res.render('index', { title: 'Express' });
});

router.post('/submitClaim', function (req, res, next) {
  console.log("Submitting a claim request..");

   var params = {
    TableName: 'ClaimTable',
    Item: {
      "ClaimId": req.body.ClaimId,
      "Cost": req.body.Cost,
      "Date": req.body.Date,
      "EmpId": req.body.EmpId,
      "EmpName": req.body.EmpName,
      "Justification": req.body.Justification,
      "Pendingwith": req.body.Pendingwith,
      "C_Status": req.body.Type
      
    }
  };

  console.log("Adding a new item...");
  docClient.put(params, function (err, data) {
    if (err) {
      res.json(
        { msg: "Unable to add item. Error JSON:", data: err }
      );
    } else {
      res.json(
        { msg: "Added item:", data: data }
      );
    }
  });
})

router.post('/createUser', function(req, res, next){

  let username = req.body.userFirstName + ' ' +req.body.lastName;
  // 

  console.log("Username received from client ", username)

  res.json({msg:"User created "});


})


router.post('/approveClaimRequest', function (req, res, next) {
  console.log("Appove claim request..");

  var params = {
    TableName: 'ClaimTable',
    Key: {
      "ClaimId": req.body.claimId
    },
    UpdateExpression: "set C_Status = :a, Pendingwith = :b",
    
    ExpressionAttributeValues: {
      ":a": req.body.status,
      ":b": req.body.pendingWith
      
    },
    ReturnValues: "UPDATED_NEW"
  };

  console.log("Updating the item...");
  docClient.update(params, function (err, data) {
    if (err) {
      res.json({ msg: "Unable to update item.", data: err });
    } else {
      res.json({ msg: "UpdateItem succeeded:", data: data });
    }
  });

})



router.get('/getMyClaims', function (req, res, next) {
  console.log("Fetching all my claims.. ID: ", req.query.empId);

  // Scan not query
  var params = {
    TableName: "ClaimTable",
    //ProjectionExpression: "#yr, title, info.rating",
    FilterExpression: "#EmpId = :Id",
    ExpressionAttributeNames: {
        "#EmpId": "EmpId",  
    },
    ExpressionAttributeValues: {
         ":Id": req.query.empId 
    }
};

  docClient.scan(params, function (err, data) {
    if (err) {
      res.json({ msg: "Unable to read item. Error JSON:", data: err });
    } else {
      res.json({ data: data.Items });
    }
  });

})

router.get('/getlogin', function (req, res, next){
  console.log("Fetching Login details..");

  var params = {
    TableName: "UserTable",
    //ProjectionExpression: "#yr, title, info.rating",
    FilterExpression: "#EmpName = :Name",
    ExpressionAttributeNames: {
        "#EmpName": "EmpName",
    },
    ExpressionAttributeValues: {
         ":Name": req.query.empName 
    }
};


docClient.scan(params, function (err, data) {
  if (err) {
    res.json({ msg: "Unable to read item. Error JSON:", data: err });
  } else {
    res.json({data : data.Items} );
  }
});
})

router.get('/pendingClaimsWithMe', function (req, res, next) {
  console.log("Fetching all pending claim with me..", req.query.empId);

  var params = {
    TableName: "ClaimTable",
    //ProjectionExpression: "#yr, title, info.rating",
    FilterExpression: "#EmpId = :Id",
    ExpressionAttributeNames: {
        "#EmpId": "Pendingwith",
    },
    ExpressionAttributeValues: {
         ":Id": req.query.empId 
    }
};

  docClient.scan(params, function (err, data) {
    if (err) {
      res.json({ msg: "Unable to read item. Error JSON:", data: err });
    } else {
      res.json({ data: data.Items });
    }
  });

})

export default router;
