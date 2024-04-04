import { allocationQueries } from "../../../models/index.js";
import { AppError } from "../../../utils/index.js";

function allocationServices(db) {
    const getLabs = async (event_name) => {
        try {
            // Get all pids and their associated jids from the allocation table
            const allocationQuery = `SELECT pid, GROUP_CONCAT(jid) AS jids FROM allocations where jid like "CO-%" GROUP BY pid;`
            const [allocationResults] = await db.execute(allocationQuery).catch(err => {
                throw new AppError(400, 'fail', err.sqlMessage)
            })


    
            // Get all projects from _projects table for the given event_name
            const projectsQuery = `SELECT pid, title, lab FROM ${event_name}_projects;`
            const [projectsResults] = await db.execute(projectsQuery).catch(err => {
                throw new AppError(400, 'fail', err.sqlMessage)
            })
    
            // Append jids to each project
            const projectsWithJids = projectsResults.map(project => {
                const { pid } = project;
                const allocation = allocationResults.find(a => a.pid === pid);
                const jids = allocation ? allocation.jids.split(',') : [];
                return { ...project, jids };
            });
    
            return projectsWithJids;
        } catch (err) {
            throw err;
        }
    }
    

    async function updateLab(event_name, data) {
        try {
            const preparedArray = [data.lab, ...data.pids]
            const [results] = await db.execute(allocationQueries.updateLab(event_name, data), preparedArray).catch(err => {
                throw new AppError(400, 'fail', err.sqlMessage)
            })
            return results[0]
        } catch (err) {
            throw err
        }
    }

    async function allocate(event_name, data) {
        try {
            const [results] = await db.execute(allocationQueries.allocate(event_name, data.pids, data.jids, data.slots)).catch(err => {
                throw new AppError(400, 'fail', err.sqlMessage)
            })
            return results[0]
        } catch (err) {
            throw err
        }
    }

    async function deallocate(event_name, data) {
        try {
            const [results] = await db.execute(allocationQueries.deallocate(event_name, data.pids, data.jids)).catch(err => {
                throw new AppError(400, 'fail', err.sqlMessage)
            })
            return results[0]
        } catch (err) {
            throw err
        }
    }

    async function evalStats(event_name) {
        try {
            let pid;


            if (event_name === 'impetus') pid = "IM-%";
            else pid = "CO-%";

            // console.log(pid)
            const [results] = await db.execute(allocationQueries.getEvalStats(event_name, pid)).catch(err => {
                throw new AppError(400, 'fail', err.sqlMessage);
            });
            // console.log(results)

            return results;
        } catch (err) {
            throw err;
        }
    }


    async function deallocate(event_name, data) {
        try {
            const [results] = await db.execute(allocationQueries.deallocate(event_name, data.pids, data.jids)).catch(err => {
                throw new AppError(400, 'fail', err.sqlMessage)
            })
            return results[0]
        } catch (err) {
            throw err
        }
    }

    return {
        getLabs,
        updateLab,
        allocate,
        deallocate,
        evalStats
    }
}

export default allocationServices;