const express=require('express');
const premiumController=require('../controller/premiumFeature')
const userAuthenticate=require('../middleware/authenticate')


const router=express.Router();

router.get('/showLeaderBoard',userAuthenticate.authenticate,premiumController.getUserLeaderBoard);


module.exports=router;
