const router = require('express').Router();
const diary = require('./../Service/diaryService');

router.post("/create", async (req, res) => {
    const newDiary = await diary.create(req);
    res.send({data: newDiary});
});

router.delete("/delete/:id", async (req, res ) => {
    const id = req.params.id;

    const diary = await diary.deleteOne(id);
})

module.exports = router;