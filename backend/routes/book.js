const db = require("../db/book");
const multer = require("multer")();
const auth = require("../middleware/auth");

module.exports = function (router) {
  //books uploud book image api is panding
  router.post("/bookinfo", multer.any(), auth, async (req, res) => {
    try {
      const data = {
        userid: req.decoded.userid,
        title: req.body.title,
        author: req.body.author,
        genre: req.body.gener,
        description: req.body.description,
        // bookurl:req.body.boo
      };

      const datas = await db(data);
      await datas.save();
      res
        .status(200)
        .json({ success: true, message: "book info submited successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: "something went wrong" });
    }
  });

  //books on home page
  router.get("/booksget", auth, async (req, res) => {
    try {
      const data = await db.find();
      res.status(200).json({ success: true, data: data });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  });

  //user books
  router.get("/userbooks/:userid", auth, async (req, res) => {
    try {
      console.log(req.params);
      const data = await db.find({ userid: req.params.userid });
      res.status(200).json({ success: true, data: data });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  });

  //click to open book
  router.get("/bookget/:id", auth, async (req, res) => {
    try {
      const data = await db.findById(req.params.id);
      res.status(200).json({ success: true, data: data });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  });

  router.delete("/bookdelete/:_id",auth, async (req, res) => {
    try {
      const cardatas = await db.findByIdAndDelete(req.params._id);
      res
        .status(200)
        .json({ success: true, message: "Book successfully Deleted!" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  });

  router.put("/bookupdate/:_id",auth, async (req, res) => {
    try {
      let update = await db.findByIdAndUpdate(req.params._id, {
        $set: req.body,
      });
      res
        .status(200)
        .json({ success: true, message: "Book successfully updated!" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  });

  //search book by title , genre
  router.get("/search/:search", auth, async (req, res) => {
    try {
      let search = req.params.search;
      let users = await db.find({
        $or: [
          { title: { $regex: search, $options: "i" } },
          { genre: { $regex: search, $options: "i" } },
          // { "price": { $regex: search, $options: "i" } }
        ],
      });
      // const reversedata = users.reverse();
      res.json({ success: true, data: users });
    } catch (error) {
      res.json({ success: false, message: "something went wrong" });
      console.log(error);
    }
  });
  return router;
};
