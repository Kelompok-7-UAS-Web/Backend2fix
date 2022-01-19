module.exports = app => {
    const statusbooking = require("../controllers/statusbooking.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/statusbooking", statusbooking.create);
  
    // Retrieve all Tutorials
    router.get("/statusbooking", statusbooking.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", statusbooking.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/statusbooking/:id", statusbooking.findOne);
  
    // Update a Tutorial with id
    router.put("/statusbooking/:id", statusbooking.update);
  
    // Delete a Tutorial with id
    router.delete("/statusbooking/:id", statusbooking.delete);
  
    // Delete all Tutorials
    router.delete("/", statusbooking.deleteAll);
  
    app.use('/api/', router);
  };