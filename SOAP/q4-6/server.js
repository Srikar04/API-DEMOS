const soap = require("soap");
const express = require("express");
const fs = require("fs");

const serviceObject = {
  CalculatorService: {
    CalculatorServiceSoapPort: {
      AddNumbers: function (args) {
        const num1 = parseInt(args.num1);
        const num2 = parseInt(args.num2);
        return { result: num1 + num2 };
      },
      SubtractNumbers: function (args) {
        const num1 = parseInt(args.num1);
        const num2 = parseInt(args.num2);
        return { result: num1 - num2 };
      },
      MultiplyNumbers: function (args) {
        const num1 = parseInt(args.num1);
        const num2 = parseInt(args.num2);
        return { result: num1 * num2 };
      },
      DivideNumbers: function (args) {
        const num1 = parseInt(args.num1);
        const num2 = parseInt(args.num2);
        if (num2 === 0) {
          throw {
            Fault: {
              Code: { Value: "soap:Sender" },
              Reason: { Text: "Division by zero" },
            },
          };
        }
        return { result: num1 / num2 };
      },
    },
  },
};


const xml = fs.readFileSync("calc.wsdl", "utf8");
const app = express();

app.get("/", function (req, res) {
  res.send("Node Soap Example! - Simple Calculator");
});

const port = 8000;
app.listen(port, function () {
  console.log("Listening on port " + port);
  const wsdl_path = "/calc";
  soap.listen(app, wsdl_path, serviceObject, xml);
  console.log("Check http://localhost:" + port + wsdl_path + "?wsdl");
});
