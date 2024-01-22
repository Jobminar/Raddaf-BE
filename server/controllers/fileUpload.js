import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

// Function to upload a file to AWS S3
export async function uploadToS3(id, file) {
  try {
    const originalFileName = file.originalname;

    // Upload file to S3
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${id}/${originalFileName}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const result = await s3.upload(params).promise();

    return {
      Key: result.Key,
      Value: result.Location,
    };
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
}
