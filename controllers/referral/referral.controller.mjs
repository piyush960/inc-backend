
function referralController() {
  async function referralConcepts(req, res) {
    try {
        console.log(req.body)
     
      res.status(201).json({msg : "Received referral"});
    } catch (err) {
      next(err);
    }
  }
  async function referralImpetus(req, res) {
    try {
        console.log(req.body)
     
      res.status(201).json({msg : "Received referral"});
    } catch (err) {
      next(err);
    }
  }

  return {
    referralConcepts,
    referralImpetus
  };
}

export default referralController;
