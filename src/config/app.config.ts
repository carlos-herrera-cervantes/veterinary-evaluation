export const app = {
  environment: process.env.ENVIRONMENT,
  database: {
    dynamodb: {
      host: process.env.DYNAMODB_HOST,
      accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID,
      secretAccessKey: process.env.DYNAMODB_SECRET_ACCESS_KEY,
      region: process.env.DYNAMODB_REGION,
    },
  },
};
