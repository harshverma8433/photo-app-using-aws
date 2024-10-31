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
    const id = event.pathParameters.certificate_id;

    try {
        const params = {
            TableName: CERTIFICATE_TABLE_NAME,
            Key: { 
                "certificate_id": id 
            },
            ConditionExpression: "attribute_exists(certificate_id)"
        };

        const result = await documentClient.delete(params).promise();

        return call.statement(200, "Certificate deleted successfully.");
    } catch (error) {
        console.error('DynamoDB Error:', error);
        return call.statement(500, error.message);
    }
};
