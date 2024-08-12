const dotenv = require('dotenv');
const AWS = require('aws-sdk');

dotenv.config({ path: './config.env' });

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports = cognito;