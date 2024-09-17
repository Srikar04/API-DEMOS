const soap = require("soap");
const express = require("express");
const fs = require("fs");

function getPerson(args) {
    const Person = args.person;
    Person.returned = true;
    return { person: Person}; 
}

const serviceObject = {
    PersonService: {
        PersonServiceSoapPort: {
            GetPerson: getPerson,
        },
    },
}

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