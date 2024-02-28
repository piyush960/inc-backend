import { sendCookie, randomID } from "../../utils/index.js";
import { groupLinks, roles } from "../../static/adminData.mjs";

function creationsJudgesController(judgesServices, emailService) {
  async function insertJudge(req, res, next) {
    try {
      const { events, ...rest } = req.body; // Destructure events from req.body
      // console.log([events]);
      // console.log(rest);
      const event_code = events == 'concepts' ? 'CO-J' : 'IM-J';
      const jid = event_code + randomID(7);
      const password = randomID(8);
      // console.log(jid);
      // console.log(password);
      await judgesServices.insertJudge({
        events: [events],
        ...rest, // Spread the rest of the properties
        jid,
        password,
        roles: [roles[6]],
      });
      await emailService.judgeRegistrationEmail({
        ...rest, // Spread the rest of the properties
        jid,
        events: [events],
        password,
        group_link: groupLinks.get(events),
      });
      res.status(201).end();
    } catch (err) {
      next(err);
    }
  }
  

  async function evaluateProject(req, res, next) {
    try {
      const { event_name } = req.params;
      const { pid, jid } = req.body;
    //   const isExist = await judgesServices.existingAllocation(pid, jid);
    //   if (isExist === 0) {
    //     req.body.slots = "1";
    //     await judgesServices.allocateProject(event_name, req.body);
    //   }
      await judgesServices.evaluateProject(event_name, req.body);
      res.status(201).end();
    } catch (err) {
      next(err);
    }
  }

  return {
    insertJudge,
    evaluateProject,
  };
}

export default creationsJudgesController;
