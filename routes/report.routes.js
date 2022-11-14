const router = express.Router();
const Report = require('../models/report');


router.get('/getalldata', async (req, res) => {
    try {
        const allData = await Report.find();
        res.status(200).send(allData);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;