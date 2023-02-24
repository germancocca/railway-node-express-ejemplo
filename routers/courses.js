// importo express
const express = require('express');

// importo controlador de curso
const CourseController = require('../controllers/courses');

// importo la autenticacion ya que algunos endpoints van a ser libres y otros van a estar protegidos 
const md_auth = require('../middleware/authenticated');

// va a generar las rutas
const api = express.Router();

// endpoint

api.post("/add-course", [md_auth.ensureAuth], CourseController.addCourse);
// endpoint para obtener todos los cursos
api.get("/get-courses", CourseController.getCourses);
// endpoint para eliminar cursos
api.delete("/delete-course/:id", [md_auth.ensureAuth], CourseController.deleteCourse);
// endpoint para actualizar cursos
api.put("/update-course/:id", [md_auth.ensureAuth], CourseController.updateCourses);


// exporto las rutas
module.exports = api;

