const Database = require('./database/db')

const { subjects, weekdays, getSubject, convertHourToMinute } = require('./utils/format')

//Funcionalidades
function pageLanding(req, res){
    return res.render("index.html")
}

async function pageStudy(req, res){

    //Pega os dados digitados no formulário;
    const filter = req.query

    if(!filter.subject || !filter.weekday || !filter.time){
        return res.render("study.html", {filter, subjects, weekdays})
    }

    //Converter horas em minutos...
    const timeToMinute = convertHourToMinute(filter.time)
    const query = `
        SELECT classes.*, proffys.*
        FROM proffys 
        JOIN  classes ON (classes.proffy_id = proffys.id) 
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filter.weekday}
            AND class_schedule.time_from <= ${timeToMinute} 
            AND class_schedule.time_to > ${timeToMinute}
        )
        AND classes.subject = ${filter.subject}
    `

    //Caso haja erro na hora da consulta do banco de dados
    try {
        
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })

        return res.render("study.html", {proffys, subjects, filter, weekdays})

    } catch (error) {
        console.log(error)
    }


    //return res.render("study.html", {proffys, filter, subjects, weekdays})

}

function pageGiveClasses(req, res){

    return res.render("give-classes.html", {subjects, weekdays})

}

async function saveClasses(req, res){

    const createProffy = require('./database/createProffy')
    
    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return  {
            weekday, //recebendo por parametro
            time_from: convertHourToMinute(req.body.time_from[index]),
            time_to: convertHourToMinute(req.body.time_to[index])

        }
    })

    try{
        const db = await Database
        await createProffy(db, {proffyValue, classValue, classScheduleValues})

        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("/study" + queryString)
    } catch (error){
        console.log(error)
    }
    

}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses, saveClasses
}