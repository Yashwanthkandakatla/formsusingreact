const authorizeRoles = (allowedroles) =>{
    return(req,res,next)=>{
        
        const userrole = req.user.role;
        console.log("userrole:",userrole,"allowedrole:",allowedroles)
        if(!allowedroles.map(role=>role.toLowerCase()).includes(userrole.toLowerCase())){
            return res.status(403).json({message:"Access Denied"});
        }
        
        
        next();
    }
    // next()

}

module.exports = authorizeRoles;