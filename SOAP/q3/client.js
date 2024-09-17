const soap = require("soap");

const url = "http://localhost:8000/person?wsdl"; 

soap.createClient(url, async function (err, client) {
  if (err) {
    throw err;
  }

  const person = {
    name: "Srikar",
    age: 20,
    num1: 10,
    num2: 20,
  };

    const promise = await new Promise((resolve, reject) => {
        client.GetPersonAndCalculate({ person: person }, async function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
    
    promise.then((res) => {
      console.log("Response:", res); // Print the response within the 'then' block
    });
});
