import { useTranslation } from "react-i18next"
import ChallengeCard from "./ChallengeCard"

const ChallengeSection = () => {
  const { t } = useTranslation()
  return (
    <div>
      <section  className="py-20 mt-1 bg-gradient-to-t from-transparent dark:via-black/60 dark:to-black/80 via-blue-500/5 to-blue-500/5  dark:text-white text-black  rounded-3xl relative overflow-hidden">
 
  {/* Grid Pattern Overlay */}
  <div className="absolute inset-0 opacity-90" 
       style={{
         backgroundImage: `
           linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 0.5px),
           linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 0.5px)
         `,
         backgroundSize: '40px 40px'
       }}>
  </div>
  
  {/* Glowing Border Effect */}
  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r dark:from-blue-500/20 from-white via-slate-200 to-slate-200 dark:via-blue-500/20 dark:to-pink-500/20 blur-sm"></div>
  
  <div className="container mx-auto px-4 text-center relative z-10">
    {/* Title */}
    <div className="relative mb-8">
      <h2 className="text-4xl   lg:text-4xl font-bold mb-24 bg-orange-600 bg-clip-text text-transparent">
      {t("home.challenge.title")}
      </h2>
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-orange-500 to-orange-500 rounded-full"></div>
    </div>
    
    {/* Description*/}
    <div className="space-y-8 mb-12">
      <div className="backdrop-blur-sm bg-black/5 border border-cyan-400/30 rounded-2xl p-6 max-w-4xl mx-auto hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20">
        <p className="text-xl  opacity-90 leading-relaxed">
        {t("home.challenge.clue")}
        </p>
      </div>
      
      <div className="backdrop-blur-sm bg-black/5 border border-blue-400/30 rounded-2xl p-6 max-w-4xl mx-auto hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/20">
        <p className="text-xl opacity-90 leading-relaxed">
        {t("home.challenge.callToAction")}
        </p>
      </div>
    </div>
    
    {/* Action Buttons*/}
    <div className="flex justify-center">
     <ChallengeCard/>
    </div>
    
    {/* Privacy Notice */}
    <div className="backdrop-blur-sm   bg-white/20  border border-gray-400/20 rounded-xl p-6 max-w-4xl mx-auto">
    <p className="text-sm leading-relaxed opacity-80 text-black dark:text-gray-300">
  {t("home.challenge.privacyNotice")}
</p>

    </div>
  </div>
  
  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-20 bg-gradient-to-t from-cyan-500/10 to-transparent rounded-b-3xl"></div>
</section>
    </div>
  )
}

export default ChallengeSection
