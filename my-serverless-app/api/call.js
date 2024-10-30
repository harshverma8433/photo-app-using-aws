let userEmail = "";
const getUserEmail = (header) => {
    userEmail = header.userEmail;
    return userEmail
}

const statement = (statusCode , data) => {
    return{
        statusCode ,
        body : JSON.stringify(data),
        headers : {
            'Access-control-Allow-Origin' : "*",
            'Access-control-Allow-Methods' : "PUT , POST,DELETE,GET",
            'Access-control-Allow-Credentials' : true,
            'Content-type' : "application/json"


        }
    }
}

module.exports = {
    statement,
    getUserEmail
}