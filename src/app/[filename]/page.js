"use client";
  import axios from "axios";
  import { useParams } from "next/navigation";
  import { useEffect, useState } from "react";
import { TranscriptionHelper } from "../libs/awsTranscriptionHelper";
import TranscriptionItem from "../Component/TranscriptionItem";
import SparkleIcon from "../Component/Sparkle";
import Resultvideo from "../Component/ResultVideo";
  
  export default function FilePage() {
      const params = useParams();
      const filename = params.filename;
      const [transcribing, setTranscribing] = useState(false);
      const [transcription, setTranscription] = useState([]);
  
      useEffect(() => {
          const fetchData = async () => {
              try {
                  setTranscribing(true);
                  const res = await axios.get('/api/transcribe?filename=' + filename);
                  const data = res.data;
                  const status = data.status;
                  const cont = data.transcription?.results?.items;
                  
                  if (status === 'IN_PROGRESS') {
                      setTranscribing(true);
                      setTimeout(fetchData, 3000);
                  } 
                  else {
                         setTranscribing(false);
                         setTranscription(TranscriptionHelper(cont) || []);
                  }
                  
                  console.log("status:", status);
                  console.log("transcription:", cont);
              } 
              catch (error) {
                  console.error("Error fetching transcription:", error);
              } 
          };
  
          fetchData();

      }, [filename]);
  

      if(transcribing){
        return(
          <div>Transcribing...</div>
        )
      }
      return (
          <div>
          <div className="grid grid-cols-2 gap-16">
          <div className="max-w-xs">
          <h2 className="text-2xl mb-4 text-white/80">Transcription</h2>
          <div className="grid grid-cols-3 sticky top-0 bg-blue-600/50 rounded-lg  pl-6 py-2">
            <div>From</div>
            <div>End</div>
            <div>Content</div>
          </div>
              {transcription.length>0 && transcription.map((item,index) => (
              <TranscriptionItem item={item}/>
              ))}
          </div>
          <div>
          <h2 className="text-2xl mb-4 text-white/80">Result</h2>
          <Resultvideo filename={filename}/>
          </div>
          </div>
          </div>
      );
  }
  