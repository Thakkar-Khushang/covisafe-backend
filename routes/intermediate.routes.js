const express = require('express');
const router = express.Router();

const Intermediate = require('../models/intermediate');
const Sensing = require('../models/sensing');
const Actuation = require('../models/actuation');
const User = require('../models/user');
const Report = require('../models/report');

async function checkIfIntermediateExistsAndIsIntact(req, res) {
    const intermediate = await Intermediate.findOne();
    if(intermediate){
        var now = new Date();
        if(now > intermediate.timeToDie){
            await Intermediate.deleteOne();
            // res.status(400).send({message: "Time to process the person has expired"});
            return false;
        } else{
            // res.status(200).send({message: "The intermediate is intact"});
            return intermediate;
        }
    }else{
        // res.status(400).send({message: "No intermediate exists"});        
        return false;
    }
}

function deleteIntermediate(){
    Intermediate.deleteMany({}, (err) => {
        if(err) console.log(err);
        else console.log('Deleted all intermediate data');
    });
}

router.post('/add', async (req, res) => {
    const { isfaceauth, name, email } = req.body;
    try{
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({msg: 'User does not exist'});
        }
        else{
            if(await checkIfIntermediateExistsAndIsIntact(req, res)){
                res.status(400).send({message: "One person is already being processed, please wait"});
            } else{
                var t = new Date();
                t.setSeconds(t.getSeconds() + 300);                
                const intermediate = new Intermediate({ isfaceauth, name, email, timeToDie: t });
                const savedIntermediate = await intermediate.save();
                setTimeout(deleteIntermediate, 300000);
                res.status(200).send(savedIntermediate);
            }
        }

    } catch (err) {
        res.status(500).send(err);
    }
})
    
router.post('/update', async (req, res) => {
    const { accessstatus, sensing, actuation } = req.body;
    try{
        var intermediate = await checkIfIntermediateExistsAndIsIntact();

        if(intermediate){
            // console.log(intermediate)
            const user = await User.findOne({email: intermediate.email});

            // console.log(user)
            const sensingObj = new Sensing({
                isfaceauth: intermediate.isfaceauth,
                ismask: sensing.ismask,
                bodytemp: sensing.bodytemp,
                // reportId: savedReport._id,
            });
            const savedSensing = await sensingObj.save();

            // console.log(savedSensing)
    
            const actuationObj = new Actuation({
                doorstatus: actuation.doorstatus,
                sanitizerstatus: actuation.sanitizerstatus,
                // reportId: savedReport._id,
            });
            const savedActuation = await actuationObj.save();

            // console.log(savedActuation)

            reason = ""

            if(!intermediate.isfaceauth){
                reason = "Face not authenticated"
            } else if (!sensing.ismask){
                reason = "Mask not worn"
            } else if (sensing.bodytemp > 37){
                reason = "Body temperature too high"
            }
    
            const newReport = new Report({
                userId: user._id,
                accessstatus: accessstatus,
                reason: reason,
                sensing: savedSensing._id,
                actuation: savedActuation._id,
            });
            const savedReport = await newReport.save();

            // console.log(savedReport)

            deleteIntermediate();
            res.status(200).send({savedReport, savedSensing, savedActuation});
            
        } else{
            res.status(400).send({message: "No person is being processed"});
        }
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router;