const Booking = require("../models/booking.model.js");

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
    const booking = new Booking({
      id: req.body.id,
      nama: req.body.nama,
      single_tandem: req.body.single_tandem, 
      hari_tanggal: req.body.hari_tanggal,
      jumlahATV: req.body.jumlahATV  || false
    });
  
    // Save Tutorial in the database
    Booking.create(booking, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Booking."
        });
      else res.send(data);
    });
  };

  // Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    const id = req.query.id;
  
    Booking.getAll(id, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving booking."
        });
      else res.send(data);
    });
  };
  
  exports.findAllPublished = (req, res) => {
    Booking.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving booking."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Booking.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Booking with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Booking with id " + req.params.id
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
  
    Booking.updateById(
      req.params.id,
      new Booking(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Booking with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Booking with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

  exports.delete = (req, res) => {
    Booking.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Booking with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Booking with id " + req.params.id
          });
        }
      } else res.send({ message: `Booking was deleted successfully!` });
    });
  };

  exports.deleteAll = (req, res) => {
    Booking.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all booking."
        });
      else res.send({ message: `All Tutorials were deleted successfully!` });
    });
  };