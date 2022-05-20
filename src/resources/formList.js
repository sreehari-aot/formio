
const formList =(req,res,router)=>{
    let query={delete:{$eq:null}};
    const skipForm=req.query.skip||0;
    const limitForm=req.query.limit||0;
    const sortForm = req.query.sort&&req.query.sort==='-title'?-1:1
    let regex = req.query?.title__regex&&req.query?.title__regex.split("/")||''
    console.log(regex,"tttttttttt")
    if(regex) regex= regex.filter(i=>i!=='')
    let titleQuery =regex?{title:{$regex:`${regex[0]}`,$options:`${regex[1]}`}}:{}
    if(req.query){
        const {type,tags,title__regex}= req.query
        query={...query,type,tags:tags.split(","),}
    }
    console.log(sortForm)
    router.formio.resources.form.model.find({...query,...titleQuery}).skip(skipForm).limit(limitForm).sort({title:sortForm}).then(result=>{
        res.json(result)
    }).catch(err=>{
        res.status(403).json(err)
    })
}

module.exports= formList