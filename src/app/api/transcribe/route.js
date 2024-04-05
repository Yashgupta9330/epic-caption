import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { GetTranscriptionJobCommand, StartTranscriptionJobCommand, TranscribeClient } from "@aws-sdk/client-transcribe";

function getclient(){
    return  new TranscribeClient({
        region: "ap-south-1",
        credentials: {
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_ACCESS_KEY
        }
    });
}


function transcription(filename){
    return new StartTranscriptionJobCommand({
        TranscriptionJobName:filename,
        OutputBucketName:process.env.BUCKET_NAME,
        OutputKey:filename+'.transcription',
        IdentifyLanguage:true,
        Media:{
         MediaFileUri:"s3://"+process.env.BUCKET_NAME+'/'+filename
        },
     })
}


function CreateTranscriptionJob(filename){
    const Transcribeclient = getclient();
    const TranscribeCommand=transcription(filename);
    return Transcribeclient.send(TranscribeCommand);
}

async function  Getjob(filename){
    const transcribeClient = getclient();
    let jobStatusResult = null;
    try {
      const transcriptionJobStatusCommand = new GetTranscriptionJobCommand({
        TranscriptionJobName: filename,
      });
      jobStatusResult = await transcribeClient.send(
        transcriptionJobStatusCommand
      );
    } catch (e) {}
    return jobStatusResult;
}

async function streamToString(stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', chunk => chunks.push(Buffer.from(chunk)));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    stream.on('error', reject);
  });
}


async function getTranscriptionFile(filename) {
  const transcriptionFile = filename + '.transcription';
  const s3client = new S3Client({
    region: 'ap-south-1',
    credentials: {
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
  });
  const getObjectCommand = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: transcriptionFile,
  });
  let transcriptionFileResponse = null;
  try {
    transcriptionFileResponse = await s3client.send(getObjectCommand);
  } 
  catch (e) {}
  if (transcriptionFileResponse) {
    return JSON.parse(
      await streamToString(transcriptionFileResponse.Body)
    );
  }
  return null;
}

export async function GET(req){

  const url=new URL(req.url);
  const searchParams=new URLSearchParams(url.searchParams);
  const filename=searchParams.get('filename');
  const existingjob=await Getjob(filename);

  const transcription = await getTranscriptionFile(filename);
  if (transcription) {
    return Response.json({
      status:'COMPLETED',
      transcription,
    });
  }


  if(existingjob){
    return Response.json({
        status:existingjob.TranscriptionJob.TranscriptionJobStatus,
    })
  }
  
  if(!existingjob){
  const newjob=await CreateTranscriptionJob(filename);
  return Response.json({
    status:newjob.TranscriptionJob.TranscriptionJobStatus,
  })
  }

  return Response.json(null)
}

 