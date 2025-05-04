import RecordHero from "./componts/RecordHero";
import RecordInput from "./componts/RecordInput";

export default function Record(){
    return(
        <div className="mx-auto max-w-[600px]  min-h-screen">
            <RecordHero/>
            <RecordInput/>
        </div>
    )
}