const soap = require("soap");
const url = "http://localhost:8000/person?wsdl";

soap.createClient(url, function (err, client) {
    if (err) {
        throw err;
    }
    const args = {
        person: {
            "name": "Srikar",
            "age": "20"
        }
    };
    client.GetPerson(args, function (err, res) {
        if (err) {
            throw err;
        }
        console.log(res.person);
    });

});