module.exports = app => {
    const pelanggan = require("../controllers/pelanggan.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/pelanggan", pelanggan.create);
  
    // Retrieve all Tutorials
    router.get("/pelanggan", pelanggan.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", pelanggan.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/pelanggan/:id", pelanggan.findOne);
  
    // Update a Tutorial with id
    router.put("/pelanggan/:id", pelanggan.update);
  
    // Delete a Tutorial with id
    router.delete("/pelanggan/:id", pelanggan.delete);
  
    // Delete all Tutorials
    router.delete("/", pelanggan.deleteAll);
  
    app.use('/api/', router);
  };