export async function POST(req,res){
    const formData=await req.formData();
    const file=formData.get('file');
    console.log(file);
    return Response.json(file);
}