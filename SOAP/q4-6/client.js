const soap = require("soap");
const url = "http://localhost:8000/calc?wsdl";

soap.createClient(url, function (err, client) {
  if (err) {
    throw err;
  }
  const args = {
    num1: 40,
    num2: 1,
  };
  client.AddNumbers(args, function (err, res) {
    console.log("Add Result:", res.result);
  });

  client.SubtractNumbers(args, function (err, res) {
    console.log("Subtract Result:", res.result);
  });

  client.MultiplyNumbers(args, function (err, res) {
    console.log("Multiply Result:", res.result);
  });

  client.DivideNumbers(args, function (err, res) {
    if (err) {
      console.error("Division Error:", err); // Handle division by zero error
    } else {
      console.log("Divide Result:", res.result);
    }
  })
});
