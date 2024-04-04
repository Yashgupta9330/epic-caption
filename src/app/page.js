import DemoSection from "./Component/DemoSection";
import Navbar from "./Component/Navbar";
import PageHeader from "./Component/PageHeader";
import UploadForm from "./Component/UploadForm";
import UploadIcon from "./Component/UploadIcon";

export default function Home() {
  const upload=()=>{

  }
  return (
   <main className="flex flex-col items-center jusitify-center text-white w-full min-h-screen mx-auto  gap-4">
   <PageHeader H1="Add Epic Caption to your Videos" H2="Just upload your video and we will do the rest"/>
   <UploadForm/>
   <DemoSection/>
   </main>
  );
}
