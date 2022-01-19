const sql = require("./db.js");

// constructor
const Admin = function(admin) {
  this.id = admin.id;
  this.full_name = admin.full_name;
  this.username = admin.username;
  this.password = admin.password;
};

Admin.create = (newAdmin, result) => {
  sql.query("INSERT INTO admin SET ?", newAdmin, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created admin: ", { id: res.insertId, ...newAdmin });
    result(null, { id: res.insertId, ...newAdmin });
  });
};

Admin.findById = (id, result) => {
  sql.query(`SELECT * FROM admin WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found admin: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Admin with the id
    result({ kind: "not_found" }, null);
  });
};

Admin.getAll = (title, result) => {
  let query = "SELECT * FROM admin";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("admin: ", res);
    result(null, res);
  });
};

Admin.getAllPublished = result => {
  sql.query("SELECT * FROM admin WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("admin: ", res);
    result(null, res);
  });
};

Admin.updateById = (id, admin, result) => {
  sql.query(
    "UPDATE admin SET id = ?, full_name = ?, username = ?, password = ? WHERE id = " +id,
    [admin.id, admin.full_name, admin.username, admin.password,],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Admin with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated admin: ", { id: id, ...admin });
      result(null, { id: id, ...admin });
    }
  );
};

Admin.remove = (id, result) => {
  sql.query("DELETE FROM admin WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Admin with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted admin with id: ", id);
    result(null, res);
  });
};

Admin.removeAll = result => {
  sql.query("DELETE FROM admin", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} admin`);
    result(null, res);
  });
};

module.exports = Admin;