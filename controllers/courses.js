// importo el modelo de courses
const Courses = require('../models/courses');

// creo function para cursos
function addCourse(req, res){
    //console.log('Creando curso...');
    // tomo los datos que vienen por el body
    const body = req.body;
    // instancio el modelo de course y le paso body que son todos los datos
    const course = new Courses(body);
    course.order = 1000;

    //console.log(course);
    course.save((err, courseStored) => {
            if(err){
                res.status(500).send({code: 500, message: "Error del servidor."});
            }else{
                if(!courseStored){
                    res.status(404).send({code: 404, message: "No se ha  podido crear el curso"});
                }else{
                    res.status(200).send({code: 200, message: "Curso creado correctamente"});
                }
            }
    });
}


// funcion obtener todos cursos ord asc
function getCourses(req, res){
    Courses.find()
        .sort({order: "asc"})
        // puede devolver error o los cursos registrados
        .exec((err, courseStored) => {
            // hago validacion
            if(err){
                res.status(500).send({code: 500, message: "Error del servidor"});
            }else{
                if(!courseStored){
                    res.status(404).send({code: 404, message: "No se ha encontrado el curso"});
                }else{
                    res.status(200).send({code: 200, courses: courseStored});
                }
            }
        });
}

// funcion para eliminar cursos
function deleteCourse(req, res){
    //console.log('delete course....');

    const {id} = req.params;

    Courses.findByIdAndRemove(id, (err, courseDeleted) => {
        // valido
        if(err){
            res.status(500).send({code: 500, message: "Error del servidor"});
        }else{
            if(!courseDeleted){
                res.status(404).send({code: 404, message: "No se encontro el curso"});
            }else{
                res.status(200).send({code: 200, message: "El curso ha sido eliminado"});
            }
        }
    });

}

// funcion para actualizar cursos
function updateCourses(req, res){
    //console.log('update courses...');
    let courseData = req.body;
    const params = req.params;

    Courses.findByIdAndUpdate(params.id, courseData, (err, courseData) =>{
        // valido
        if(err){
            res.status(500).send({code: 500, message: "Error del servidor"});      
        }else{
            if(!courseData){
                res.status(404).send({code: 404, message: "No se ha encontrado el curso"});
            }else{
                res.status(200).send({code: 200, message: "Curso Actualizado"});
            }
        }
    });
}


// exporto 

module.exports = {
    addCourse, 
    getCourses,
    deleteCourse,
    updateCourses
};