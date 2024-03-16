const beratRepository = require("../repositories/beratRepository");

const getBeratList = async (req, res) => {
  try {
    const data = await beratRepository.getAllBerat();
    res.status(200).send(data.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const getBeratDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await beratRepository.getDetailBerat(id);
    res.status(200).send(data.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const addBerat = async (req, res) => {
  const { tanggal, max, min } = req.body;
  try {
    await beratRepository.insertBerat(tanggal, max, min);
    res
      .status(200)
      .send({ message: "Successfully added data to 'berat' table" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const updateBerat = async (req, res) => {
  const { id } = req.params;
  const { max, min } = req.body;

  try {
    await beratRepository.updateBerat(id, max, min);
    res.status(200).send({ message: "Successfully updated the row" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const deleteBerat = async (req, res) => {
  const { id } = req.params;

  try {
    await beratRepository.deleteBerat(id);
    res.status(200).send({ message: "Successfully deleted the row" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = {
  getBeratList,
  getBeratDetail,
  addBerat,
  updateBerat,
  deleteBerat,
};
