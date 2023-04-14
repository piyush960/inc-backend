const roles = ['WEB_MASTER', 'ADMIN', 'PAYMENTS', 'CONCEPTS_ADMIN', 'IMPETUS_ADMIN', 'PRADNYA_ADMIN', 'JUDGE']

const groupLinks = new Map([
    ['concepts', ['Concepts Judging (InC\'23)', 'https://chat.whatsapp.com/JBqSWR59pmm9Ny4s1xkzOY']],
    ['impetus', ['Impetus judging 23', 'https://chat.whatsapp.com/HC4szxmTO7iDDTfymOVHJr']],
])

const officialEmails = new Map([
    ['queries', 'queries.pictinc2023@gmail.com'],
    ['judging', 'incjudging@pict.edu'],
    ['concepts', 'concepts.pictinc2023@gmail.com'],
    ['impetus', 'impetus.pictinc2023@gmail.com'],
    ['pradnya', 'pradnya.pictinc2023@gmail.com'],
])

export {
    roles,
    groupLinks,
    officialEmails,
}