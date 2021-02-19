import './App.css';
import React from 'react';
import { useState } from 'react';
import Header from './Header';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ClaimDataService from './claim/claim.service';
import User from  './user/user'

const useStylesTable = makeStyles({
  table: {
    minWidth: 650,
  },
});

let rowsForMyClaims: any[] = [];


let rowsForPendingClaims: any[] = [];

function ClaimForm() {
  const [showResults, setShowResults] = React.useState(false);
  const [showMyClaims, setshowMyClaims] = React.useState(false);
  const [showWorkList, setshowWorkList] = React.useState(false);

  const [claimId, setClaimId] = useState('' + new Date().getTime());
  const [name, setName] = useState('');
  const [Event_type, setEvent] = useState('');
  const [loc, setLoc] = useState('');
  const [desc, setDesc] = useState('');
  const [justi, setJusti] = useState('');
  const [cost, setCost] = useState('');
  const [date, setDate] = useState('');


  const onClick = () => {
    setShowResults(true)
    setshowMyClaims(false)
    setshowWorkList(false)
  };

  // const onClickMyClaims = () => {
  //   setshowMyClaims(true)
  //   setShowResults(false)
  //   setshowWorkList(false)
  //   let sampled = User.getName();
  //   ClaimDataService.getMyAllClaims(sampled).then(data => {
  //     console.log("Got data from API:", data)

  //     console.log("entry" ,data.data)
  //     rowsForMyClaims = data.data.data;
  //     console.log("testing",rowsForMyClaims)

  //   })
  // };

  const onClickMyClaims = () => {
    setshowMyClaims(true)
    setShowResults(false)
    setshowWorkList(false)
    let sampled = User.getName();
    ClaimDataService.getMyAllClaims(sampled).then(data => {
      console.log("Got data from API:", data)

      console.log(rowsForMyClaims)
      rowsForMyClaims = data.data.data;
      console.log(rowsForMyClaims)

    })
  };

  const onClickChangeState = (row:any) => {
    //console.log(row)
    console.log("Onclickk change state..", row.target.childNodes[1].innerText, row.target.childNodes[0].nodeValue);
    ClaimDataService.updateClaimStatus(row.target.childNodes[1].innerText, row.target.childNodes[0].nodeValue).then(data => {
      alert("Status updated..");
    }, (err) => {
      console.log("Error");
    })

  };

  const onClickWorkList = () => {
    setshowWorkList(true);
    setShowResults(false)
    setshowMyClaims(false)
      let paramGetPendingClaims
      
      let getPendingClaimsRole = User.getRole();
      if (getPendingClaimsRole == "HR") {
        paramGetPendingClaims = "HR"
      } else if (getPendingClaimsRole == "Supervisor") {
        paramGetPendingClaims = "Supervisor"
      } else if (getPendingClaimsRole == "HOD") {
        paramGetPendingClaims = "HOD"
      } 
      // else if (getPendingClaimsRole == "Admin"){
        
      //   paramGetPendingClaims = "HR AND Supervisor AND HOD"
      // }

      ClaimDataService.getPendingClaims(paramGetPendingClaims).then(data => {
      console.log("Got data from API:", data);
      rowsForPendingClaims = data.data.data;
      
    });
  }
 
  const onClickSubmitClaim = () => {

    let sampled = User.getName();
    let formData = {
      ClaimId: claimId,
      Cost: cost,
      Date: date,
      EmpId: sampled,
      EmpName: name,
      eventtype:Event_type,
      description:desc,
      Justification: justi,
      Location:loc,
      Pendingwith: "Supervisor",
      Type: "Pending with Supervisor"
      
    }

    console.log("Submit claim ", formData);

    ClaimDataService.submitClaim(formData).then(data => {
      alert("Claim Submited");
    });

  }


  const classesTable = useStylesTable();

  
  return (
    
    <div className="ClaimForm">
      <Header />
      
      <br />
      <div>
        <Button variant="outlined" color="primary" onClick={onClick}>
          New Claim
        </Button>

        <Button variant="outlined" color="primary" onClick={onClickMyClaims}>
          My Claims
        </Button>

        <Button variant="outlined" color="primary" onClick={onClickWorkList}>
          Work list
        </Button>
      </div>
      {showResults ?
        <div >

          <form noValidate>

            <TextField
              id="standard-full-width"
              label="Claim ID"
              style={{ margin: 8 }}
              placeholder="Claim ID"
              helperText="Claim ID"

              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={claimId} onInput={(e:any) => setClaimId(e.target.value)}
            />
            <br />
            <TextField
              id="standard-full-width"
              label="Name"
              style={{ margin: 8 }}
              placeholder="Employee name"
              helperText="Employee name"
           

              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={name} onInput={(e:any) => setName(e.target.value)}
            /><br />

            <TextField
              id="standard-full-width"
              label="Tution Type/Event"
              style={{ margin: 8 }}
              placeholder="Tution Event"
              helperText="Tution event details"

              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={Event_type} onInput={(e:any) => setEvent(e.target.value)}
            /><br/>

            <TextField
              id="standard-full-width"
              label="Description"
              style={{ margin: 8 }}
              placeholder="Description"
              helperText="Description about the course"

              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={desc} onInput={(e:any) => setDesc(e.target.value)}
            /><br/>

            <TextField
              id="standard-full-width"
              label="Location"
              style={{ margin: 8 }}
              placeholder="Location"
              helperText="Location of Course"

              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={loc} onInput={(e:any) => setLoc(e.target.value)}
            /><br/>


            <TextField
              id="standard-full-width"
              label="Justification"
              style={{ margin: 8 }}
              placeholder="Justification"
              helperText="Justification about the claim"

              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={justi} onInput={(e:any) => setJusti(e.target.value)}
            />
            <br />
            <TextField id="standard-basic" label="Cost" value={cost} onInput={(e:any) => setCost(e.target.value)} />
            <br />
            <TextField id="standard-basic" label="Date" value={date} onInput={(e:any) => setDate(e.target.value)} />
            <br />
            <br />

            <br />
            <br />
            <Button variant="contained" color="primary" onClick={onClickSubmitClaim}>
              Submit
</Button>
          </form>
        </div> : null}

      {/* {showMyClaims ?
        <div >
          <h3>Claim Requests</h3>
          <TableContainer component={Paper}>
            <Table className={classesTable.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Justification</TableCell>
                  <TableCell align="right">ClaimId</TableCell>
                  <TableCell align="right">Cost</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Pending With</TableCell>    
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsForMyClaims.map((row) => (
                  <TableRow key={row.ClaimId}>
                    <TableCell component="th" scope="row">
                      {row.Justification}
                    </TableCell>
                    <TableCell align="right">{row.ClaimId}</TableCell>
                    <TableCell align="right">{row.Cost}</TableCell>
                    <TableCell align="right">{row.Date}</TableCell>
                    <TableCell align="right">{row.C_Status}</TableCell>
                    <TableCell align="right">{row.Pendingwith}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        : null} */}

{showMyClaims ?
        <div >
          <h3>Claim Requests</h3>
          <TableContainer component={Paper}>
            <Table className={classesTable.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Justification</TableCell>
                  <TableCell align="right">ClaimId</TableCell>
                  <TableCell align="right">Cost</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Pending With</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsForMyClaims.map((row) => (
                  <TableRow key={row.ClaimId}>
                    <TableCell component="th" scope="row">
                      {row.Justification}
                    </TableCell>
                    <TableCell align="right">{row.ClaimId}</TableCell>
                    <TableCell align="right">{row.Cost}</TableCell>
                    <TableCell align="right">{row.Date}</TableCell>
                    <TableCell align="right">{row.C_Status}</TableCell>
                    <TableCell align="right">{row.Pendingwith}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        : null}

      {showWorkList ?
        <div >
          <h3>Claim Work List</h3>
          <TableContainer component={Paper}>
            <Table className={classesTable.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Justification</TableCell>
                  <TableCell align="right">ClaimId</TableCell>
                  <TableCell align="right">Cost</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Pending With</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsForPendingClaims.map((row) => (
                  <TableRow key={row.ClaimId} onClick={onClickChangeState.bind(row)}>
                    <TableCell component="th" scope="row">
                      {row.Justification}
                    </TableCell>
                    <TableCell align="right">{row.ClaimId}</TableCell>
                    <TableCell align="right">{row.Cost}</TableCell>
                    <TableCell align="right">{row.Date}</TableCell>
                    <TableCell align="right">{row.C_Status}</TableCell>
                    <TableCell align="right">{row.Pendingwith}</TableCell>
                    <TableCell align="right">
                      <Button variant="outlined" color="primary">
                        ClaimFormrove
                        <p hidden>{row.ClaimId}</p>
                      </Button>
                      <Button variant="outlined" color="secondary">
                        Reject
                        <p hidden>{row.ClaimId}</p>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        : null}
    </div>
  
  );
}
export default ClaimForm;