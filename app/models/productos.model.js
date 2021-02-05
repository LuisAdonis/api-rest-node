const sql = require("./db.js");

// constructor
const Customer = function(customer) {
  this.Nombre = customer.Nombre;
  this.Descripcion = customer.Descripcion;
  this.Foto = customer.Foto;
  this.Precio = customer.Precio;
  this.Categoria = customer.Categoria;
  this.Orden = customer.Orden;
  this.Opciones = customer.Opciones;
  this.ConHorario = customer.ConHorario;
  this.Horas = customer.Horas;
  this.RestauranteNid = customer.RestauranteNid;
  this.idusuario = customer.idusuario;
  this.Fecha = customer.Fecha;
};

Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO productos SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created productos: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

Customer.findById = (customerId, result) => {
  sql.query(`SELECT * FROM productos WHERE id = ${customerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found productos: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};
Customer.findByNid = (customerId, result) => {
  sql.query(`SELECT * FROM productos WHERE RestauranteNid = '${customerId}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found productos: ", res[0]);
      result(null, res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Customer.getAll = result => {
  sql.query("SELECT * FROM productos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("productos: ", res);
    result(null, res);
  });
};

Customer.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE productos SET Nombre=?,Descripcion=?,Foto=?,Precio=?,Categoria=?,Orden=?,Opciones=?,ConHorario=?,Horas=?,RestauranteNid=?,idusuario=?,Fecha=?WHERE id = ?",
    [customer.Nombre,customer.Descripcion,customer.Foto,customer.Precio,customer.Categoria,customer.Orden,customer.Opciones,customer.ConHorario,customer.Horas,customer.RestauranteNid,customer.idusuario,customer.Fecha,id],
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

      console.log("updated productos: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

Customer.remove = (id, result) => {
  sql.query("DELETE FROM productos WHERE id = ?", id, (err, res) => {
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

    console.log("deleted productos with id: ", id);
    result(null, res);
  });
};

Customer.removeAll = result => {
  sql.query("DELETE FROM productos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} productos`);
    result(null, res);
  });
};

module.exports = Customer;