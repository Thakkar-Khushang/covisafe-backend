const express   = require('express');
const router = express.Router();
const Report = require('../models/report');
const Sensing = require('../models/sensing');
const Actuation = require('../models/actuation');


router.get('/getalldata', async (req, res) => {
    try {
        const allData = await Report.find();
        res.status(200).send(allData);
    } catch (err) {
        res.status(400).send(err);
    }
});


router.post('/addreport', async (req, res) => {
    const { userId, accessstatus, reason } = req.body;
    const { sensing, actuation } = req.body;
    try {
        const newReport = new Report({
            userId,
            accessstatus,
            reason,
        });
        const savedReport = await newReport.save();

        const sensingObj = new Sensing({
            isfaceauth: sensing.isfaceauth,
            ismask: sensing.ismask,
            bodytemp: sensing.bodytemp,
            reportId: savedReport._id,
        });
        const savedSensing = await sensingObj.save();

        const actuationObj = new Actuation({
            doorstatus: actuation.doorstatus,
            sanitizerstatus: actuation.sanitizerstatus,
            reportId: savedReport._id,
        });
        const savedActuation = await actuationObj.save();

        res.status(200).send({savedReport, savedSensing, savedActuation});
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
});

module.exports = router;