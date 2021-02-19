import axios from "axios";
import User from '../user/user'
import http  from '../Http-common';

class ClaimDataService {

  getMyAllClaims(empId:any) {
    // return http.get("/getMyClaims?empId="+ empId, {withCredentials: false}).then(result => {
    //     console.log(`Recieved ${JSON.stringify(result.data)} from ${"/getMyClaims"}requests`);
    //     return result.data;
    return http.get("/getMyClaims?empId="+ empId);
    // });
  }

  getPendingClaims(empId:any) {
    // return http.get('/pendingClaimsWithMe?empId=' +empId , {withCredentials: false}).then(result => {
    //     console.log(`Recieved ${JSON.stringify(result.data)} from ${'/pendingClaimsWithMe'}requests`);
    //     return result.data;
    // });
    return http.get('/pendingClaimsWithMe?empId=' +empId);
  }

  submitClaim(data:any) {
    return http.post("/submitClaim", data, {withCredentials: false}).then(result => {
        console.log(`Recieved ${JSON.stringify(result.data)} from ${"/submitClaim"}requests`);
        return result.data;
    });
  }

  updateClaimStatus(claimId:any, status:any) {
    let updateStatus; 
    let pendingWithh
    let userrole = User.getRole();
    if (userrole === "HR") {
      updateStatus = status+"d by HR";
      pendingWithh = ""
    } else if (userrole === "Supervisor"){
      updateStatus = status+"d by Supervisor"
      pendingWithh = "Department"
    } else if (userrole === "Employee"){
      updateStatus = status+"d";
    } else if (userrole === "HOD"){
        updateStatus = status+"d by HOD";
        pendingWithh = "HR"
    } else {
      updateStatus = status+"d";
    }
    const data = {
      claimId: claimId,
      status: updateStatus,
      pendingWith : pendingWithh
    };
    return http.post('/approveClaimRequest', data);
  }
}

export default new ClaimDataService();