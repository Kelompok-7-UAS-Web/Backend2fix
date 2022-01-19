module.exports = app => {
    const booking = require("../controllers/booking.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/booking", booking.create);
  
    // Retrieve all Tutorials
    router.get("/booking", booking.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", booking.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/booking/:id", booking.findOne);
  
    // Update a Tutorial with id
    router.put("/booking/:id", booking.update);
  
    // Delete a Tutorial with id
    router.delete("/booking/:id", booking.delete);
  
    // Delete all Tutorials
    router.delete("/", booking.deleteAll);
  
    app.use('/api/', router);
  };