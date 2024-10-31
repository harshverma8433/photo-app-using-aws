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
    

    let deleteFlag;

    // Use try-catch to handle JSON parsing
    try {
        deleteFlag = event["queryStringParameters"]["deleteFlag"];
    } catch (jsonError) {
        return call.statement(400, 'Invalid JSON input');
    }

    try {
        const params = {
            TableName: CERTIFICATE_TABLE_NAME,
            FilterExpression: "deleteFlag = :deleteFlag",
            ExpressionAttributeValues: {
                ":deleteFlag": deleteFlag, 
            },
        };

        const result = await documentClient.scan(params).promise();
        
        // Return the result of the scan
        return call.statement(200, result.Items); // Return scanned items

    } catch (error) {
        console.error('DynamoDB Error:', error); // Log the error for debugging
        return call.statement(500, error.message);
    }
};
