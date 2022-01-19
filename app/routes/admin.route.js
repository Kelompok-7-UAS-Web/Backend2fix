module.exports = app => {
    const admin = require("../controllers/admin.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/admin", admin.create);
  
    // Retrieve all Tutorials
    router.get("/admin", admin.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", admin.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/admin/:id", admin.findOne);
  
    // Update a Tutorial with id
    router.put("/admin/:id", admin.update);
  
    // Delete a Tutorial with id
    router.delete("/admin/:id", admin.delete);
  
    // Delete all Tutorials
    router.delete("/", admin.deleteAll);
  
    app.use('/api/', router);
  };