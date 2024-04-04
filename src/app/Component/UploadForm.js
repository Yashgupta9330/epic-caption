"use client"

import axios from "axios";
import UploadIcon from "./UploadIcon";

export default function UploadForm() {

    const upload=async (ev)=>{
      ev.preventDefault();
      const files=ev.target.files;
      if(files.length>0){
        const file=files[0];
        const res=await axios.postForm('/api/upload',{
           file,
        });
       console.log(res.data);
      }
    }

  return(
    <label className="cursor-pointer bg-green-600 border border-2 border-purple-700/50 rounded-full py-2 px-4 mt-4 flex gap-1">
    <UploadIcon/>
    <span>Choose file</span>
    <input onChange={upload} type="file" className="hidden"/>
    </label>
  );
}
