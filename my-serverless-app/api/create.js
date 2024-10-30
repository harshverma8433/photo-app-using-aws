let DynamoDB = require("aws-sdk/clients/dynamodb");
const call = require("./call.js");

let documentClient = new DynamoDB.DocumentClient({
    region: "us-east-1",
    maxRetries: 3,
    httpOptions: {
        timeout: 5000,
    },
});

const CERTIFICATE_TABLE_NAME = process.env.CERTIFICATE_TABLE_NAME;

module.exports.certificate = async (event, context) => {
    let data;

    // Use try-catch to handle JSON parsing
    try {
        data = JSON.parse(event.body);
    } catch (jsonError) {
        return call.statement(400, 'Invalid JSON input');
    }

    try {
        const params = {
            TableName: CERTIFICATE_TABLE_NAME,
            Item: {
                certificate_id: data.certificate_id,  // Ensure this is included
                userEmail: data.userEmail,
                name: data.name,
                certificate_name: data.certificate_name,
                provider: data.provider,
                level: data.level,
                date: data.date,
                expire_date: data.expire_date,
                validity: data.validity,
                deleteflag: data.deleteflag,
            },
            ConditionExpression: "attribute_not_exists(certificate_id)", // Use the correct condition
        };

        await documentClient.put(params).promise();
        return call.statement(201, data);

    } catch (error) {
        console.error('DynamoDB Error:', error); // Log the error for debugging
        return call.statement(500, error.message);
    }
};
