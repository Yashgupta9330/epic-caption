export default function PageHeader({H1="h1",H2="h2"}){
    return(
        <div className="flex flex-col items-center jusitfy-center mt-16  leading-6 gap-1">
        <h1 className="text-5xl font-semibold">{H1}</h1>
        <h2 className="text-xl text-white/75">{H2}</h2>
        </div>
    );
}