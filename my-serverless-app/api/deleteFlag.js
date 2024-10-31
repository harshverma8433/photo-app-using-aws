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
    let certificate_id;

    // Use try-catch to handle JSON parsing
    try {
        data = JSON.parse(event.body);
        certificate_id = event.pathParameters.certificate_id;
    } catch (jsonError) {
        return call.statement(400, 'Invalid JSON input');
    }

    try {
        const params = {
            TableName: CERTIFICATE_TABLE_NAME,
            Key: { certificate_id },
            UpdateExpression: 'set #deleteFlag = :deleteFlag',
            ConditionExpression: 'attribute_exists(certificate_id)', // Fixed syntax error
            ExpressionAttributeNames: {
                
                '#deleteFlag': 'deleteFlag'
            },
            ExpressionAttributeValues: {
                ':deleteFlag': data.deleteFlag,
            }
        };

        await documentClient.update(params).promise();
        
        // Return a success message with delete data
        return call.statement(200, { message: "Certificate Delete Request Raised successfully", updatedData: data });

    } catch (error) {
        console.error('DynamoDB Error:', error); // Log the error for debugging
        return call.statement(500, error.message);
    }
};
