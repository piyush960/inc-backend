function judgesQueries(tableName) {
    const getJudge = (jid) => `SELECT * FROM ${tableName} WHERE jid = '${jid}';`

    const getJudges = event_name => `CALL getJudges('"${event_name}"')`

    const insertJudge = 'CALL insertJudge(:jid, :name, :email, :phone, :address, :company, :exp, :events, :domains, :slots, :min_projects, :referral, :password, :roles, :isPICT);'

    const loginJudge = 'CALL loginJudge(:username, :password);'

    const getAllocatedProjects = (jid, event_name) => `SELECT ${event_name}_projects.pid, title , abstract , allocations.slots, domain , allocations.event_name FROM ${event_name}_projects JOIN allocations ON ${event_name}_projects.pid = allocations.pid WHERE allocations.jid='${jid}' AND allocations.event_name = '${event_name}'  ; `

    const modifySlots =  (slots,jid, mode) => {
    slots = slots.map(slot => `"${slot}"`)
    return `UPDATE judges SET slots = '[${slots}]', mode = '${mode}' WHERE jid = '${jid}';`;
      
    const evaluateConceptsProject = `INSERT INTO concepts_projects VALUES (:pid,:jid , );`
    
    const evaluateImpetusProject = `INSERT INTO impetus_projects VALUES (:pid,:jid , );`
  }

    return {
        getJudge,
        getJudges,
        insertJudge,
        loginJudge,
        getAllocatedProjects,
        modifySlots
    }
}

export { judgesQueries }