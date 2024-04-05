export function TranscriptionHelper(cont){

    cont.forEach((item,key) => {
        if(!item.start_time){
         const prev=cont[key-1];
         prev.alternatives[0].content+=item.alternatives[0].content;
         delete cont[key];
        }
     });

     return cont.map((item)=>{
        const {start_time,end_time}=item;
        const content=item.alternatives[0].content;
        return {start_time,end_time,content};
     })

}