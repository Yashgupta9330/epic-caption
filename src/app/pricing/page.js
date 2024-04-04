import PageHeader from "../Component/PageHeader";

export default function Pricing(){
    return(
        <>
        <PageHeader H1="Check out our Pricing" H2="Our pricing is very simple"/>
        <div className="bg-white text-slate-700 rounded-lg min-w-[280px] mx-auto p-4 text-center mt-16">
        <h3 className="font-bold text-3xl">Free</h3>
        <h4>Free forever</h4>
        </div>
        </>
    )
}