const soap = require("soap");
const express = require("express");
const fs = require("fs");

function sayHello(args) {
  const name = args.name;
  return { greeting: "Hello " + name };
}

const serviceObject = {
  SayHelloService: {
    SayHelloServiceSoapPort: {
      SayHello: sayHello,
    },
  },
};

const xml = fs.readFileSync("hello.wsdl", "utf8");
const app = express();

const port = 8000;
app.listen(port, function () {
  console.log("Listening on port " + port);
  const wsdl_path = "/hello";
  soap.listen(app, wsdl_path, serviceObject, xml);
  console.log(
    "Check http://localhost:" +
      port +
      wsdl_path +
      "?wsdl to see if the service is working"
  );
});
