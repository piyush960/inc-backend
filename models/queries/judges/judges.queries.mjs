function judgesQueries(tableName) {
    const getJudge = (data) => {
        if (data.hasOwnProperty('email')) return `SELECT * FROM ${tableName} WHERE email = :email;`
        if (data.hasOwnProperty('username')) return `SELECT * FROM ${tableName} WHERE email = :username;`
        if (data.hasOwnProperty('phone')) return `SELECT * FROM ${tableName} WHERE phone = :phone;`
        if (data.hasOwnProperty('email') && data.hasOwnProperty('phone')) return `SELECT * FROM ${tableName} WHERE email = :email WHERE phone = :phone;`
        if (data.hasOwnProperty('jid')) return `SELECT * FROM ${tableName} WHERE jid = :jid;`
    }

    const insertJudge = 'CALL insertJudge(:jid, :name, :email, :phone, :address, :company, :exp, :events, :domains, :slots, :min_projects, :password, :roles);'

    const loginJudge = 'CALL loginJudge(:username, :password);'

    return {
        getJudge,
        insertJudge,
        loginJudge,
    }
}

export { judgesQueries }