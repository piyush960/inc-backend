const eventsName = ['concepts', 'impetus', 'pradnya']

// const projectDomains = new Map([
//     ['concepts', ['APPLICATION DEVELOPMENT', 'COMMUNICATION NETWORKS AND SECURITY SYSTEMS', 'DIGITAL / IMAGE/ SPEECH / VIDEO PROCESSING', 'EMBEDDED/VLSI SYSTEMS', 'MACHINE LEARNING AND PATTERN RECOGNITION', 'OTHERS']],
//     ['impetus', ['MACHINE LEARNING AND PATTERN RECOGNITION', 'BIG DATA ANALYTICS', 'COMMUNICATION NETWORKS & SECURITY SYSTEMS', 'VIRTUALIZATION AND AUTOMATIC COMPUTING', 'DIGITAL / IMAGE/ SPEECH / VIDEO PROCESSING', 'VLSI DESIGN AND TEST', 'EMBEDDED SYSTEMS', 'BLOCKCHAIN', 'APPLICATION', 'OTHERS']],
// ])

const projectDomains = {
    'AD': 'APPLICATION DEVELOPMENT',
    'CN': 'COMMUNICATION NETWORKS AND SECURITY SYSTEMS',
    'DP': 'DIGITAL / IMAGE/ SPEECH / VIDEO PROCESSING',
    'ES': 'EMBEDDED/VLSI SYSTEMS',
    'ML': 'MACHINE LEARNING AND PATTERN RECOGNITION',
    'OT': 'OTHERS'
}

const projectTypes = ['Open Software', 'Open Hardware/Firmware']

const teamSize = new Map([
    ['concepts', 5],
    ['impetus', 5],
    ['pradnya', 2],
])

const slotsData = {
    '1': 'Friday 24th March (9:00 AM - 11:59 AM)',
    '2': 'Friday 24th March (1:00 PM - 6:00 PM)',
    '3': 'Saturday 25th March (9:00 AM - 11:59 AM)',
    '2': 'Saturday 24th March (1:00 PM - 6:00 PM)',
}

export {
    eventsName,
    projectDomains,
    projectTypes,
    teamSize,
    slotsData,
}