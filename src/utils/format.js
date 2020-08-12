const subjects = [
    "Arte",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",                        
]
const weekdays = [

    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",                        
]

function getSubject(subjectNumber){
    return subjects[+subjectNumber - 1]
    //O '+' na frente é pra garantir que é um numero e o -1 é pq começa em zero mesmo
}

function convertHourToMinute(time){
    const [hour, minute] = time.split(":")
    return Number((hour*60) + minute);
}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHourToMinute
}