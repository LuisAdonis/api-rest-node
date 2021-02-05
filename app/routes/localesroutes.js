module.exports = app => {
    const customers = require("../controllers/localescontroller.js");
    const customers1 = require("../controllers/productoscontroller.js");
  
    // Create a new Customer
    app.post("/resta", customers.create);
  
    // Retrieve all Customers
    app.get("/resta", customers.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/resta/:customerId", customers.findOne);
  
    // Update a Customer with customerId
    app.put("/resta/:customerId", customers.update);
  
    // Delete a Customer with customerId
    app.delete("/resta/:customerId", customers.delete);
  
    // Create a new Customer
    app.delete("/resta", customers.deleteAll);



    app.post("/produc", customers1.create);
  
    // Retrieve all Customers
    app.get("/produc", customers1.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/produc/:customerId", customers1.findOne);
        // Retrieve a single Customer with findNid
    app.get("/producnid/:customerId", customers1.findNid);
  
    // Update a Customer with customerId
    app.put("/produc/:customerId", customers1.update);
  
    // Delete a Customer with customerId
    app.delete("/produc/:customerId", customers1.delete);
  
    // Create a new Customer
    app.delete("/produc", customers1.deleteAll);

  };