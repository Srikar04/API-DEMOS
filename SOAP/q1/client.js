const soap = require("soap");
const url = "http://localhost:8000/hello?wsdl";

soap.createClient(url, function (err, client) {
  if (err) {
    throw err;
  }
  const args = {
    name: "Srikar1",
  };
  client.SayHello(args, function (err, res) {
    if (err) {
      throw err;
    }
    console.log(res.greeting);
  });
});
