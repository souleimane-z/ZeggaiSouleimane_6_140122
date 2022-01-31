module.exports = (req,res,next) => {
    console.log('URL :', req.url);
    console.log('Paramètres :', req.params);
    console.log('Requête :', req.body);
    next();
}