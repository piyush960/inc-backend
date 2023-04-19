function allocationQueries() {
  const updateLab = (event_name, data) => {
    let placeholders = ''
    for (let i = 0; i < data.pids.length - 1; i++) placeholders += ', ?'
    return `UPDATE ${event_name}_projects SET lab = ? WHERE pid IN (?${placeholders});`;
  }

  const allocate = (event_name, pids, jids, slots) => {
    let placeholders = ''
    const bigArray = pids.length === 1 ? jids : pids
    slots = slots.map(slot => `"${slot}"`)
    for (let i = 1; i < bigArray.length; i++) placeholders += `, ('${bigArray[i]}', '${jids[0]}',  '', '[${slots}]', current_datetime(), '${event_name}')`
    return `INSERT INTO allocations VALUES ('${bigArray[0]}', '${jids[0]}', '', '[${slots}]', current_datetime(), '${event_name}')${placeholders};`
  }

  return {
    updateLab,
    allocate,
  }
}

export { allocationQueries };
