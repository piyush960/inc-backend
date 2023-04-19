function createAllocationController(allocationServices, emailServices) {
  async function labAllocate(req, res, next) {
    try {
      const { event_name } = req.params;
      await allocationServices.updateLab(event_name, req.body);
      res.status(200).end();
    } catch (err) {
      next(err);
    }
  }

  async function allocate(req, res, next) {
    try {
        const { event_name } = req.params;
        await allocationServices.allocate(event_name, req.body);
        res.status(200).end();
    } catch (err) {
      next(err);
    }
  }

  return {
    labAllocate,
    allocate,
  };
}

export default createAllocationController;
