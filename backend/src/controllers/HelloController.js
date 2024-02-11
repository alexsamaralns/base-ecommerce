class HelloController {
  async index(req, res) {
    return res.json({ hello: 'world' });
  }
}

module.exports = new HelloController();
