import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
  email_address: process.env.EMAIL_ADDRESS,
  email_user: process.env.EMAIL_USER,
  email_password: process.env.EMAIL_PASSWORD,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  firebase_type: process.env.FIREBASE_TYPE,
  firebase_project_id: process.env.FIREBASE_PROJECT_ID,
  firebase_private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  firebase_private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  firebase_client_email: process.env.FIREBASE_CLIENT_EMAIL,
  firebase_client_id: process.env.FIREBASE_CLIENT_ID,
  firebase_auth_uri: process.env.FIREBASE_AUTH_URI,
  firebase_token_uri: process.env.FIREBASE_TOKEN_URI,
  firebase_auth_provider_x509_cert_url:
    process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  firebase_client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  firebase_universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};
