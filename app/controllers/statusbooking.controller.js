const Statusbooking = require("../models/statusbooking.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  
};

// Find a single Tutorial with a id
exports.findOne = (req, res) => {
  
};

// find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Tutorial
    const statusbooking = new Statusbooking({
      id: req.body.id,
      kode_booking: req.body.kode_booking,
      total_harga: req.body.total_harga, 
      id_booking: req.body.id_booking || false
    });
  
    // Save Tutorial in the database
    Statusbooking.create(booking, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Statusbooking."
        });
      else res.send(data);
    });
  };

  // Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    const id = req.query.id;
  
    Statusbooking.getAll(id, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving statusbooking."
        });
      else res.send(data);
    });
  };
  
  exports.findAllPublished = (req, res) => {
    Statusbooking.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving statusbooking."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Statusbooking.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Statusbooking with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Statusbooking with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    Statusbooking.updateById(
      req.params.id,
      new Statusbooking(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Statusbooking with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Statusbooking with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

  exports.delete = (req, res) => {
    Statusbooking.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Statusbooking with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Statusbooking with id " + req.params.id
          });
        }
      } else res.send({ message: `Statusbooking was deleted successfully!` });
    });
  };

  exports.deleteAll = (req, res) => {
    Statusbooking.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all statusbooking."
        });
      else res.send({ message: `All Tutorials were deleted successfully!` });
    });
  };