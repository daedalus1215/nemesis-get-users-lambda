import { CognitoJwtVerifier } from 'aws-jwt-verify';

// Configuration for your Cognito User Pool
const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.USER_POOL_ID,
    tokenUse: 'access', // or 'id' if you're verifying ID tokens
    clientId: process.env.CLIENT_ID // Optional, but recommended for verifying the audience
  });
export async function handler(event) {
  const token = event.headers.authorization.split(' ')[1]; // Assuming 'Bearer <token>'
  console.log('token', token);
  
  try {
    const payload = await verifier.verify(token);
    // If we get here, the token is valid. You can now use payload for further logic
    console.log('Token payload:', payload);
    return { statusCode: 200, body: 'Hello World' };
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return { statusCode: 401, body: 'Unauthorized or error verifying token' };
  }
};