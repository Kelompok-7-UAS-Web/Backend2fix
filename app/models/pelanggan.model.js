const sql = require("./db.js");

// constructor
const Pelanggan = function(pelanggan) {
  this.id = pelanggan.id;
  this.full_name = pelanggan.full_name;
  this.username = pelanggan.username;
  this.password = pelanggan.password;
};

Pelanggan.create = (newPelanggan, result) => {
  sql.query("INSERT INTO pelanggan SET ?", newPelanggan, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created pelanggan: ", { id: res.insertId, ...newPelanggan });
    result(null, { id: res.insertId, ...newPelanggan });
  });
};

Pelanggan.findById = (id, result) => {
  sql.query(`SELECT * FROM pelanggan WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found pelanggan: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Admin with the id
    result({ kind: "not_found" }, null);
  });
};

Pelanggan.getAll = (title, result) => {
  let query = "SELECT * FROM pelanggan";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("pelanggan: ", res);
    result(null, res);
  });
};

Pelanggan.getAllPublished = result => {
  sql.query("SELECT * FROM pelanggan WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("pelanggan: ", res);
    result(null, res);
  });
};

Pelanggan.updateById = (id, pelanggan, result) => {
  sql.query(
    "UPDATE pelanggan SET id = ?, full_name = ?, username = ?, password = ? WHERE id = " +id,
    [pelanggan.id, pelanggan.full_name, pelanggan.username, pelanggan.password,],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Pelanggan with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated pelanggan: ", { id: id, ...pelanggan });
      result(null, { id: id, ...pelanggan });
    }
  );
};

Pelanggan.remove = (id, result) => {
  sql.query("DELETE FROM pelanggan WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Pelanggan with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted pelanggan with id: ", id);
    result(null, res);
  });
};

Pelanggan.removeAll = result => {
  sql.query("DELETE FROM pelanggan", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} pelanggan`);
    result(null, res);
  });
};

module.exports = Pelanggan;