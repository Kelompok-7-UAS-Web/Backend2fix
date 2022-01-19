const sql = require("./db.js");

// constructor
const Statusbooking = function(statusbooking) {
  this.id = booking.id;
  this.kode_booking = booking.kode_booking;
  this.total_harga = booking.total_harga;
  this.id_booking = booking.id_booking;
};

Statusbooking.create = (newStatusbooking, result) => {
  sql.query("INSERT INTO statusbooking SET ?", newStatusbooking, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created statusbooking: ", { id: res.insertId, ...newStatusbooking });
    result(null, { id: res.insertId, ...newStatusbooking });
  });
};

Statusbooking.findById = (id, result) => {
  sql.query(`SELECT * FROM statusbooking WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found booking: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Statusbooking with the id
    result({ kind: "not_found" }, null);
  });
};

Statusbooking.getAll = (title, result) => {
  let query = "SELECT * FROM statusbooking";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("statusbooking: ", res);
    result(null, res);
  });
};

Statusbooking.getAllPublished = result => {
  sql.query("SELECT * FROM statusbooking WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("statusbooking: ", res);
    result(null, res);
  });
};

Statusbooking.updateById = (id, statusbooking, result) => {
  sql.query(
    "UPDATE pelanggan SET id = ?, kode_booking = ?, total_harga = ?, id_booking = ? WHERE id = " +id,
    [pelanggan.id, pelanggan.kode_booking, pelanggan.total_harga, pelanggan.id_booking,],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Statusbooking with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated statusbooking: ", { id: id, ...statusbooking });
      result(null, { id: id, ...statusbooking });
    }
  );
};

Statusbooking.remove = (id, result) => {
  sql.query("DELETE FROM statusbooking WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Statusbooking with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted statusbooking with id: ", id);
    result(null, res);
  });
};

Statusbooking.removeAll = result => {
  sql.query("DELETE FROM statusbooking", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} statusbooking`);
    result(null, res);
  });
};

module.exports = Statusbooking;