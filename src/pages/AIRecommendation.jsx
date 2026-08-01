import { useState } from "react";
import AIHeader from "../Components/AI/AIHeader";
import FeatureCards from "../Components/AI/FeatureCards";
import aiBackground from "../assets/ai.png";
import ResultSection from "../Components/AI/ResultSection";


export default function AIRecommendation() {

  const [mode, setMode] = useState("");


  return (

    <main
      className="
        min-h-screen
      "
    >

      {/* AI Background Area */}
      <div
        className="
          relative
          min-h-screen
          bg-cover
          bg-fixed
          overflow-hidden
        "

        style={{
          backgroundImage: `url(${aiBackground})`
        }}
      >


        {/* Glass Overlay */}
        <div
          className="
            absolute
            inset-0
            bg-white/10
            backdrop-blur-[1px]
          "
        />


        {/* Content */}
        <div
          className="
            relative
            z-10

            pb-20
          "
        >

          <AIHeader />


          <FeatureCards
            setMode={setMode}
          />

          <ResultSection 
            mode={mode}
          />


        </div>


      </div>


    </main>

  );

}