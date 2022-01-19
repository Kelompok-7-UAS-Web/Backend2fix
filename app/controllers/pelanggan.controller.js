const Pelanggan = require("../models/pelanggan.model.js");

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
    const pelanggan = new Pelanggan({
      id: req.body.id,
      full_name: req.body.full_name,
      username: req.body.username, 
      password: req.body.password || false
    });
  
    // Save Tutorial in the database
    Pelanggan.create(pelanggan, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Pelanggan."
        });
      else res.send(data);
    });
  };

  // Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    const id = req.query.id;
  
    Pelanggan.getAll(id, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving pelanggan."
        });
      else res.send(data);
    });
  };
  
  exports.findAllPublished = (req, res) => {
    Pelanggan.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving pelanggan."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Pelanggan.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Pelanggan with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Pelanggan with id " + req.params.id
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
  
    Pelanggan.updateById(
      req.params.id,
      new Pelanggan(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Pelanggan with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Pelanggan with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

  exports.delete = (req, res) => {
    Pelanggan.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Pelanggan with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Pelanggan with id " + req.params.id
          });
        }
      } else res.send({ message: `Pelanggan was deleted successfully!` });
    });
  };

  exports.deleteAll = (req, res) => {
    Pelanggan.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all pelanggan."
        });
      else res.send({ message: `All Tutorials were deleted successfully!` });
    });
  };