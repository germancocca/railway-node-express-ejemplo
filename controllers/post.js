// importo el modelo de post
const Post = require('../models/post');

// creo funcion para agregar post
function addPost(req, res){
    //console.log('creando post....');
    // tomo los datos que viene del body
    const body = req.body;
    // instancio el modelo de post y le paso el body
    const post = new Post(body);

    post.save((err, postStored) => {
        if(err){
            res.status(500).send({code: 500, message: 'Error del servidor'});
        }else{
            if(!postStored){
                res.status(404).send({code: 404, message: 'No se ha podido crear el post'});
            }else{
                res.status(200).send({code: 200, message: 'se ha creado el post de forma correcta'});
            }
        }
    });
}

// funcion para obtener los post
function getPosts(req, res){
   //console.log('get post....');

   // vamos a recuperar de req.query varias cosas
   const {page = 1, limit = 10} = req.query;

    console.log('page: ', page);
    console.log('limit: ', limit);

    // opciones de paginacion
    const options = {
        // page va a inicializar con page
        page: page,
        // necesita que le envie un entero, no un string por eso aplico el parseInt
        limit: parseInt(limit),
        // lo va ordenar con el sort por fecha de forma descendente
        sort: {date: 'desc'}
    };

    // busco en la base de datos, no uso el find y el paginate para usar la paginacion 
    // tendra un objeto vacio, las opciones y el callback
    Post.paginate({}, options, (err, postsStored) => {
        // valido
        if(err){
            res.status(500).send({code: 500, message: "Error del servidor, intente mas tarde"});
        }else{
            if(!postsStored){
                res.status(404).send({code: 404, message: "No se ha podido encontrar el post"});
            }else{
                res.status(200).send({code: 200, posts: postsStored});
            }
        }
    });
}

// funcion para actualizar post 
function updatePost(req, res){
    //console.log('update  post....');
    let postData = req.body;
    const {id} = req.params;

    Post.findByIdAndUpdate(id, postData, (err, postData) => {
        // valido
        if(err){
            res.status(500).send({code: 500, message: "Error del servidor, intente mas tarde."});
        }else{
            if(!postData){
                res.status(404).send({code: 404, message: "No se ha podido encontrar el post."});
            }else{
                res.status(200).send({code: 200, message: "se ha actualizado el post de forma correcta"});
            }
        }
    });
}

// funcion para eliminar post
function deletePost(req, res){
    //console.log('delete post....');
    const {id} = req.params;

    Post.findByIdAndDelete(id, (err, postDelete) => {
        // valido
        if(err){
            res.status(500).send({code: 200, message: "Error del servidor, intente mas tarde."});
        }else{
            if(!postDelete){
                res.status(404).send({code: 404, message: "No se ha podido encontrar el post."});
            }else{
                res.status(200).send({code: 200, message: "El post ha sido eliminado de forma correcta."});
            }
        }
    });
}

// funcion para obtener un post especifico
function getPost(req, res){
    //console.log('get post singular...');

    const {url} = req.params;

    Post.findOne({url}, (err, postStored) => {
        // valido
        if(err){
            res.status(500).send({code: 500, message: "Error del servidor"});
        }else{
            if(!postStored){
                res.status(404).send({code: 404, message: "No se ha podido encontrar el post."});
            }else{
                res.status(200).send({code: 200, post: postStored});
            }
        }
    });
}


module.exports = {
    addPost, 
    getPosts,
    updatePost,
    deletePost,
    getPost
};
