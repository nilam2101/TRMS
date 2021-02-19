let User = (function() {
    let EmpName = "";
    let userrole = "";

    let getName = function() {
      return EmpName;    // Or pull this from cookie/localStorage
    };
    let getRole = function() {
        return userrole;    // Or pull this from cookie/localStorage
      };

    let setName = function(name:any) {
     EmpName = name;     
    };

    let setRole = function(role:any) {
        userrole = role;     
      };
  
  
    return {
      getName: getName,
      setName: setName,
      getRole: getRole,
      setRole: setRole,
    }
  
  })();
  
  export default User;