const sql = require("./db.js");

// constructor
const Booking = function(booking) {
  this.id = booking.id;
  this.nama = booking.nama;
  this.single_tandem = booking.single_tandem;
  this.hari_tanggal = booking.hari_tanggal;
  this.jumlahATV = booking.jumlahATV;
};

Booking.create = (newBooking, result) => {
  sql.query("INSERT INTO booking SET ?", newBooking, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created booking: ", { id: res.insertId, ...newBooking });
    result(null, { id: res.insertId, ...newBooking });
  });
};

Booking.findById = (id, result) => {
  sql.query(`SELECT * FROM booking WHERE id = ${id}`, (err, res) => {
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

    // not found Booking with the id
    result({ kind: "not_found" }, null);
  });
};

Booking.getAll = (title, result) => {
  let query = "SELECT * FROM booking";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("booking: ", res);
    result(null, res);
  });
};

Booking.getAllPublished = result => {
  sql.query("SELECT * FROM booking WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("booking: ", res);
    result(null, res);
  });
};

Booking.updateById = (id, booking, result) => {
  sql.query(
    "UPDATE pelanggan SET id = ?, nama = ?, single_tandem = ?, hari_tanggal = ?, jumlahATV = ? WHERE id = " +id,
    [pelanggan.id, pelanggan.nama, pelanggan.single_tandem, pelanggan.hari_tanggal, pelanggan.jumlahATV,],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Booking with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated booking: ", { id: id, ...booking });
      result(null, { id: id, ...booking });
    }
  );
};

Booking.remove = (id, result) => {
  sql.query("DELETE FROM booking WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Booking with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted booking with id: ", id);
    result(null, res);
  });
};

Booking.removeAll = result => {
  sql.query("DELETE FROM booking", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} booking`);
    result(null, res);
  });
};

module.exports = Booking;