function judgesQueries(tableName) {
    const getJudge = (data) => {
        if (data.hasOwnProperty('email')) return `SELECT :columns FROM ${tableName} WHERE email = :email;`
        if (data.hasOwnProperty('username')) return `SELECT :columns FROM ${tableName} WHERE email = :username;`
        if (data.hasOwnProperty('phone')) return `SELECT :columns FROM ${tableName} WHERE phone = :phone;`
        if (data.hasOwnProperty('email') && data.hasOwnProperty('phone')) return `SELECT * FROM ${tableName} WHERE email = :email WHERE phone = :phone;`
        if (data.hasOwnProperty('jid')) return `SELECT :columns FROM ${tableName} WHERE jid = :jid;`
    }

    const getJudges = event_name => `CALL getJudges('"${event_name}"')`

    const insertJudge = 'CALL insertJudge(:jid, :name, :email, :phone, :address, :company, :exp, :events, :domains, :slots, :min_projects, :referral, :password, :roles, :isPICT);'

    const loginJudge = 'CALL loginJudge(:username, :password);'
    
    const getAllocatedProjects = (jid,event_name)=> `SELECT ${event_name}_projects.pid, title , abstract , allocations.slots, domain , allocations.event_name FROM ${event_name}_projects JOIN allocations ON ${event_name}_projects.pid = allocations.pid WHERE allocations.jid='${jid}' AND allocations.event_name = '${event_name}'  ; `



    return {
        getJudge,
        getJudges,
        insertJudge,
        loginJudge,
        getAllocatedProjects
    }
}

export { judgesQueries }