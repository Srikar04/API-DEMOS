const soap = require("soap");
const express = require("express");
const fs = require("fs");

async function getPersonAndCalculate(args) {
  const person = args.person;
  const n1 = person.num1;
  const n2 = person.num2;

  try {
    const calculatorClient = await new Promise((resolve, reject) => {
      soap.createClient(
        "https://svn.apache.org/repos/asf/airavata/sandbox/xbaya-web/test/Calculator.wsdl",
        { timeout: 5000 },
        function (err, client) {
          if (err) {
            reject(err);
            console.log(err);
          } else {
            console.log("client created");
            resolve(client);
          }
        }
      );
    });

    const result = await new Promise((resolve, reject) => {
      calculatorClient.add(
        { n1, n2 },
        function (err, result) {
            if (err) {
                console.log(err);
            reject(err);
          } else {
            console.log(result);
            resolve(result);
          }
        }
      );
    });

    person.calculationResult = result.return;
    console.log(result.return);

    return person;
  } catch (err) {
    console.error("Error during SOAP operations:", err);
    throw err;
  }
}

const serviceObject = {
  PersonService: {
    PersonServiceSoapPort: {
      GetPersonAndCalculate: getPersonAndCalculate,
    },
  },
};

const xml = fs.readFileSync("person.wsdl", "utf8");
const app = express();

const port = 8000;
app.listen(port, function () {
  console.log("Listening on port " + port);
  const wsdl_path = "/person";
  soap.listen(app, wsdl_path, serviceObject, xml);
  console.log(
    "Check http://localhost:" +
      port +
      wsdl_path +
      "?wsdl to see if the service is working"
  );
});
