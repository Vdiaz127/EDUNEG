// utils/generateAcronym.js
export const generateAcronym = (careerName, subjectName) => {
    const careerAcronym = careerName
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();

    const subjectAcronym = subjectName
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();

    return `${careerAcronym}-${subjectAcronym}`;
};