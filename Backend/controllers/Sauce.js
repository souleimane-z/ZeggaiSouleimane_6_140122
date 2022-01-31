/*
    Imports
*/
const Sauce = require('../models/Sauce');
const fs = require('fs');

/*
    create a sauce
*/
exports.createSauce = (req, res, next) => {
  console.log('Sauce créée :', req.body.sauce);
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,   // Create the URL for the images
    likes: 0,
    dislikes: 0,
    usersLiked: '',
    usersDisliked: ''
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))   //  Message that logged into the console
    .catch(error => res.status(400).json({ error }));
};

/*
    like or dislike
*/
exports.likeSauce = (req, res, next) => {
  if (req.body.like === 1) {  
      Sauce.updateOne( {_id:req.params.id}, { $push: { usersLiked: req.body.userId }, $inc: { likes: +1 } })    // Sauce liked
        .then(() => res.status(200).json({ message: 'Like ajouté !'}))   //  Message that logged into the console
        .catch(error => res.status(400).json({ error }));
  } else if (req.body.like === -1) {
      Sauce.updateOne( {_id:req.params.id}, { $push: { usersDisliked: req.body.userId }, $inc: { dislikes: +1 } })    // Sauce disliked
        .then(() => res.status(200).json({ message: 'Dislike ajouté !'}))   //  Message that logged into the console
        .catch(error => res.status(400).json({ error }));
  } else { 
      Sauce.findOne({ _id: req.params.id })
        .then(sauce => {  
          if (sauce.usersLiked.includes(req.body.userId)) {
            Sauce.updateOne( {_id:req.params.id}, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })    // Take away one Like
              .then(() => res.status(200).json({ message: 'Like supprimé !'}))   //  Message that logged into the console
              .catch(error => res.status(400).json({ error }))
          } else if (sauce.usersDisliked.includes(req.body.userId)) { 
            Sauce.updateOne( {_id:req.params.id}, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })    // Take away one Dislike
              .then(() => res.status(200).json({ message: 'Dislike supprimé !'}))   //  Message that logged into the console
              .catch(error => res.status(400).json({ error }))
          }
        })
        .catch(error => res.status(400).json({ error }));
  }
};

/*
    'Get' in all one sauce
*/
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

/*
    Modify 
*/
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))   //  Message that logged into the console
    .catch(error => res.status(400).json({ error }));
};

/*
    Delete
*/
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];   // Take away one object , refers to the id to find which one to delete
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))   //  Message that logged into the console
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

/*
    'Get' in all the sauces
*/
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};