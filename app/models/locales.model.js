const sql = require("./db.js");

// constructor
const Customer = function (customer) {
  this.nid = customer.nid,
    this.Nombre = customer.Nombre,
    this.Categorias = customer.Categorias,
    this.Direccion = customer.Direccion,
    this.Email = customer.Email,
    this.Color = customer.Color,
    this.Logo = customer.Logo,
    this.Telefono = customer.Telefono,
    this.Ubicacion = customer.Ubicacion,
    this.Estado = customer.Estado,
    this.HoraApertura = customer.HoraApertura,
    this.Zonas = customer.Zonas,
    this.IndicePopularidad = customer.IndicePopularidad,
    this.Ciudad = customer.Ciudad,
    this.Tipo = customer.Tipo
};
Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO resta SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created resta: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

Customer.findById = (customerId, result) => {
  sql.query(`SELECT * FROM resta WHERE id = ${customerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found resta: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Customer.getAll = result => {
  sql.query("SELECT * FROM resta", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("resta: ", res);
    result(null, res);
  });
};

Customer.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE resta SET nid = ?, Nombre = ?, Categorias = ?, Direccion = ?, Email = ?, Color = ?, Logo = ?, Telefono = ?, Ubicacion = ?,  Estado = ?, HoraApertura = ?,Zonas=?,IndicePopularidad = ?, Ciudad = ?, Tipo = ? WHERE id = ?",
    [customer.nid,customer.Nombre, customer.Categorias,customer.Direccion,customer.Email,customer.Color,customer.Logo,customer.Telefono, customer.Ubicacion, customer.Estado, customer.HoraApertura, customer.Zonas, customer.IndicePopularidad,customer.Ciudad,customer.Tipo,id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated resta: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

Customer.remove = (id, result) => {
  sql.query("DELETE FROM resta WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted resta with id: ", id);
    result(null, res);
  });
};

Customer.removeAll = result => {
  sql.query("DELETE FROM resta", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} resta`);
    result(null, res);
  });
};

module.exports = Customer;