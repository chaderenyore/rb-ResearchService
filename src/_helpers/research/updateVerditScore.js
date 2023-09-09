const ResearchService = require("../../app/modules/research/services/research.services");

exports.updateVerditSore = async (research_id, verditData) => {
  try {
    console.log("Result data ", verditData)
    // container for totalVerditPoint
    let totalVerditPoint = 0;
    // prem check
    if(verditData.type && verditData.type === "prem"){
        if(verditData.grade === "pass" ){
            totalVerditPoint +=20;
            console.log("Prem COndition")
        }
    }

    // tokenomics
    if(verditData.type && verditData.type === "tokenomics"){
        if(verditData.grade === "fair" ){
            totalVerditPoint +=10;
            console.log("Tokenomics COndition 1")

        }
        if(verditData.grade === "good" ){
            totalVerditPoint +=20;
            console.log("Tokenomics COndition 2")

        }
        if(verditData.grade === "excellent" ){
            totalVerditPoint +=30
            console.log("Tokenomics COndition 3")

        }
    }

    // Comparison
   if(verditData.type && verditData.type === "comparison"){
     if(verditData.grade >= 5){
        totalVerditPoint +=20
        console.log("Comparison COndition")

     }
   }
    // Adoption Info
    if(verditData.type && verditData.type === "aandd"){
       if(verditData.info.has_known_partners === true){
        totalVerditPoint +=5
        console.log("Adoption And Recognition COndition 1")

       }
       if(verditData.info.marketing_stage === "on_going" || verditData.info.marketing_stage === "just_started"){
        totalVerditPoint +=10
        console.log("Adoption And Recognition COndition 2")

       }
       if(verditData.info.media_link || verditData.info.partner_link){
        totalVerditPoint +=5
        console.log("Adoption And Recognition COndition 3")

       }
    }
    // Team and Community
        // Comparison
   if(verditData.type && verditData.type === "team"){
    if(verditData.info.team_spirit === "active"){
       totalVerditPoint +=5
       console.log("Team COndition 1")
    }
    if(verditData.info.community_spirit === "active"){
        totalVerditPoint +=5
        console.log("Team COndition 2")
     }
  }
//   new verdit
    const research = await new ResearchService().update({
      _id: research_id,
    },
    { $inc: { 'verdit_score': +totalVerditPoint } }
    );
    console.log("Updated Research ===== ", research)
    if(!research){
        return{
            error: true,
            message: "Research does Not Exist",
            data: {}
        }
    } else{
        return{
            error: false,
            message: "Success",
            data:{
                updatedScore: totalVerditPoint
            }
        }
    }
  } catch (error) {
    console.log(error)
  }
};
