import { CognitoUserPool } from "amazon-cognito-identity-js";


console.log("e" , import.meta.env.VITE_POOL_ID);


const poolData = {
    UserPoolId: import.meta.env.VITE_POOL_ID,
    ClientId: import.meta.env.VITE_APP_CLIENT_ID
};

export default new CognitoUserPool(poolData);
