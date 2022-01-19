const Admin = require("../models/admin.model.js");

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
    const admin = new Admin({
      id: req.body.id,
      full_name: req.body.full_name,
      username: req.body.username, 
      password: req.body.password || false
    });
  
    // Save Tutorial in the database
    Admin.create(admin, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Admin."
        });
      else res.send(data);
    });
  };

  // Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    const id = req.query.id;
  
    Admin.getAll(id, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving admin."
        });
      else res.send(data);
    });
  };
  
  exports.findAllPublished = (req, res) => {
    Admin.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving admin."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Admin.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Admin with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Admin with id " + req.params.id
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
  
    Admin.updateById(
      req.params.id,
      new Admin(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Admin with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Admin with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

  exports.delete = (req, res) => {
    Admin.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Admin with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Admin with id " + req.params.id
          });
        }
      } else res.send({ message: `Admin was deleted successfully!` });
    });
  };

  exports.deleteAll = (req, res) => {
    Admin.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all admin."
        });
      else res.send({ message: `All Tutorials were deleted successfully!` });
    });
  };

  