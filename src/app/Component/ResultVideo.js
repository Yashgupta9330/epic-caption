import SparkleIcon from "./Sparkle";


export default function Resultvideo({filename}){
    return(
        <>
        <div className="mb-4">
        <button className="cursor-pointer bg-green-600 border border-2 border-purple-700/50 rounded-full py-2 px-4 mt-4 flex gap-1">
        <SparkleIcon/>
        <span>Apply Caption</span>
        </button>
      </div>
      <video 
       controls
       className="w-auto rounded-lg h-[500px] overflow-hidden" 
       src={"https://caption-yash12.s3.ap-south-1.amazonaws.com/"+filename}>
      </video>
      </>
    )
}