import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from 'uniqid';

export async function POST(req,res){
    const formData = await req.formData();
    const file = formData.get('file');
    const { name, type } = file;
    const data = await file.arrayBuffer();
    const s3Client = new S3Client({
        region: "ap-south-1",
        credentials: {
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_ACCESS_KEY
        }
    });
    const id = uniqid();
    console.log("id", id);
    const ext = name.split('.').slice(-1)[0];
    const newName = id + '.' + ext;
    const UploadCommand = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Body: data,
        ACL: "public-read", // Corrected ACL value
        ContentType: type,
        Key: newName
    });
   
    await s3Client.send(UploadCommand);
    return Response.json({ id, name, type, newName, ext });
}
