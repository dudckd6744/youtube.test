const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");


const { auth } = require("../middleware/auth");


//=================================
//             Like
//=================================

router.post('/getLikes',(req,res)=>{

    var variable={}
    if(req.body.videoId){
        variable= { videoId: req.body.videoId}
    }else{
        variable={ commentId: req.body.commentId}
    }
    
    Like.find(variable)
    .exec((err, likes)=>{
        if(err) return res.statusMessage(400).send(err)
        res.status(200).json({ success:true, likes})
    })
})

router.post('/getDislikes',(req,res)=>{

    var variable={}
    if(req.body.videoId){
        variable= { videoId: req.body.videoId}
    }else{
        variable={ commentId: req.body.commentId}
    }
    
    Dislike.find(variable)
    .exec((err, Dislikes)=>{
        if(err) return res.statusMessage(400).send(err)
        res.status(200).json({ success:true, Dislikes})
    })
})

router.post('/uplike',(req,res)=>{

    var variable={}
    if(req.body.videoId){
        variable= { videoId: req.body.videoId, userId:req.body.userId}
    }else{
        variable={ commentId: req.body.commentId,  userId:req.body.userId}
    }
    const like = new Like(variable)
    like.save((err,doc)=>{
        if(err) return res.status(400).send(err)

        Dislike.findOneAndDelete(variable)
        .exec((err,doc2)=>{
            if(err) return res.status(400).send(err)
            res.status(200).json({success:true})
        })
    })
})

router.post('/unlike',(req,res)=>{

    var variable={}
    if(req.body.videoId){
        variable= { videoId: req.body.videoId, userId:req.body.userId}
    }else{
        variable={ commentId: req.body.commentId,  userId:req.body.userId}
    }
    Like.findOneAndDelete(variable)
    .exec((err, doc)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({success:true})
    })
})
router.post('/updislike',(req,res)=>{

    var variable={}
    if(req.body.videoId){
        variable= { videoId: req.body.videoId, userId:req.body.userId}
    }else{
        variable={ commentId: req.body.commentId,  userId:req.body.userId}
    }
    const dislike = new Dislike(variable)
    dislike.save((err,doc)=>{
        if(err) return res.status(400).send(err)

        Like.findOneAndDelete(variable)
        .exec((err,doc2)=>{
            if(err) return res.status(400).send(err)
            res.status(200).json({success:true})
        })
    })
})

router.post('/undislike',(req,res)=>{

    var variable={}
    if(req.body.videoId){
        variable= { videoId: req.body.videoId, userId:req.body.userId}
    }else{
        variable={ commentId: req.body.commentId,  userId:req.body.userId}
    }
    Dislike.findOneAndDelete(variable)
    .exec((err, doc)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({success:true})
    })
})

module.exports = router;
