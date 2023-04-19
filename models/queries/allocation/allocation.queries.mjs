function allocationQueries() {
  const updateLab = (event_name, data) => {
    let placeholders = ''
    for (let i = 0; i < data.pids.length - 1; i++) placeholders += ', ?'
    return `UPDATE ${event_name}_projects SET lab = ? WHERE pid IN (?${placeholders});`;
  };
  const allocate = (event_name, data) => {
  }

  return {
    updateLab,
    allocate,
  };
}

export { allocationQueries };
