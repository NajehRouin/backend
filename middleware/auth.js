let jwt = require("jsonwebtoken");

let Authentication = {


  auhUser: async (req, res, next) => {
    try {
      let token = req.header("Authorization");
      if (!token)
        return res.status(400).json({ msg: "Invalid Authentication" });

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: "Invalid Authentication" });

        req.user = user;
        next();
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },


  // auhUser: async (req, res, next) => {
  //   try {
  //     const token = req.cookies?.token
  //     if(!token){
  //       return res.status(200).json({
  //           message : "Please Login...!",
  //           error : true,
  //           success : false
  //       })
  //   }

  //   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
           
            
  //     if(err){
  //         console.log("error auth", err)
  //     }

  //     req.userId = decoded?._id

  //     next()
  // });

  //   } catch(err){
  //     res.status(400).json({
  //         message : err.message || err,
  //         data : [],
  //         error : true,
  //         success : false
  //     })
  // }
  // },



  auhAdmin: async (req, res, next) => {
    try {
      const token = req.cookies?.token
      if(!token){
        return res.status(200).json({
            message : "Please Login...!",
            error : true,
            success : false
        })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
           
            
      if(err){
          console.log("error auth", err)
      }

      req.admin = decoded?._id

      next()
  });

    } catch(err){
      res.status(400).json({
          message : err.message || err,
          data : [],
          error : true,
          success : false
      })
  }
  },
};

module.exports = Authentication;
