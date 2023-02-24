// importamos nuestro menu
const Menu = require("../models/menu");

// creamos nuestro endpoint 
function addMenu(req, res){
    //console.log("Add Menu....");

    // todos los datos vendran en el body
    const {title, url, order, active} = req.body;
    const menu = new Menu();
    menu.title = title;
    menu.url = url;
    menu.order = order;
    menu.active = active;

    //guardamos menu, arriba ya tenemos todos los datos
    menu.save((err, createdMenu) => {
        if(err){
            res.status(500)
            .send({message: "Error del servidor"});
        }else{
            if(!createdMenu){
                res.status(404)
                .send({message: "Error al crear el menu"});
            } else{
                res.status(200)
                .send({message: "Menu creado correctamente."})
            }
        }
    });

}

/*
forma simple sin ordenar
function getMenus(req, res){
    Menu.find().then(menus => {
        if(!menus){
            res.status(404).send({message: "No se ha encontrado ningun menu"});
        }else{
            res.status(200).send({menus})
        }
    }); 
}

*/

function getMenus(req, res){
    Menu.find()
        .sort({order: "asc"})
        .exec((err, menusStored) => {
            if(err){
                res.status(500).send({message: "Error del servidor"});
            }else{
                if(!menusStored){
                    res.status(404).send({message: "No se ha encontrado ningun elemento en el menu"});
                }else{
                    res.status(200).send({menu: menusStored});
                }
            }
        });
}


function updateMenu(req, res){
    let menuData = req.body;
    const params = req.params;

    Menu.findByIdAndUpdate(params.id, menuData, (err, menuUpdate) => {
        if (err) {
            res.status(500).send({message: "Error del servidor"});
        } else {
            if(!menuUpdate){
                res.status(404).send({message: "No se ha encontrado ningun menu"});
                
            }else{
                res.status(200).send({message: "Menu actualizado correctamente"});
            }
        }

    });
}


// se ocupara de activar o desactivar menu que le envio
function activateMenu(req, res){
    // recupero el id de menu
    const { id } = req.params;
    // saco el estado de active, si el menu esta activo o desactivado 
    const { active } = req.body;
    
    // peticion  a la base de datos
    Menu.findByIdAndUpdate(id, { active }, (err, menusStored) => {
        if(err){
            res.status(500)
                .send({message: "Error del servidor"});
        }else {
            if(!menusStored){
                res.status(404)
                    .send({message: "No se ha encontrado el menu"});
            }else {
                if (active === true){
                    res.status(200)
                        .send({message: "Menu activado correctamente."});

                }else{
                    res.status(200)
                        .send({message: "Menu desactivado correctamente"});
                    
                }
            }
        }
    });
}


// endpoint para eliminar menu
function deleteMenu(req, res){
    console.log("delete menus....");

    const {id} = req.params;

    Menu.findByIdAndRemove(id, (err, menuDeleted) => {
        if(err){
            // si existe error, mandamos error del servidor
            res.status(500)
            .send({message: "Error del servidor"});
        }else{
            if(!menuDeleted){
                // sino existe el menu buscado
                res.status(404)
                .send({message: "El menu no se ha encontrado"});
            }else{
                // si salio todo bien
                res.status(200)
                .send({message: "El menu ha sido eliminado."});
            }
        }
    });

}


//exportamos todas nuestras funciones
module.exports = {
    addMenu,
    getMenus,
    updateMenu,
    activateMenu,
    deleteMenu
};
