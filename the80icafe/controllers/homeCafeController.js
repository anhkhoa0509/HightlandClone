
const ListCafe = require('../models/ListCafe');
const ListEspresso = require('../models/ListEspresso');
const ListPhindi = require('../models/listPhindi');
const {
    MongooseObject,
    mutiMongooseObject
} = require('../util/Mongoose')


class HomeCafeController {
    homeCafe(req, res, next) {
           res.render('quancafe/mainWelcom')
    }
    login(req, res, next) {
        res.render('login/login')
    }  
    admin(req, res, next) {
        Promise.all([ListCafe.find({}),ListPhindi.find({}),ListEspresso.find({})])
        .then(([cafe,phindi,espresso])=>{
            res.render('login/admin',{cafe : mutiMongooseObject(cafe),phindi:mutiMongooseObject(phindi),espresso:mutiMongooseObject(espresso)})
        })
        .catch(next)
    }
    edit(req, res, next) {
        console.log(req.params.id)
        Promise.all([ListCafe.findById(req.params.id),ListPhindi.findById(req.params.id),ListEspresso.findById(req.params.id)])
        .then(([cafe,phindi,espresso])=>{
            var value
            console.log(cafe)
            if(cafe!=null){
                value =  MongooseObject(cafe)
                res.render('login/edit',{value})
            }
            else if(phindi!=null){
                value = MongooseObject(phindi)
                res.json('login/edit',{value})
            }
            else{
                value = MongooseObject(espresso)
                res.render('login/edit',{value})
            }
        
        })
        .catch(next)
    }  
    
    update(req, res, next){
        Promise.all([ListCafe.updateOne({_id: req.params.id}, req.body),ListPhindi.updateOne({_id: req.params.id}, req.body),ListEspresso.updateOne({_id: req.params.id}, req.body)])
        .then(()=>{          
                res.redirect('/admin') 
        })
        .catch(next)
    }
    add(req, res, next){
        res.render('login/add')
    }
    create(req, res, next){
       switch(req.body.action) {
        case 'cafe':
            req.body = new ListCafe(req.body)
            req.body.save()
                .then(() => res.redirect('/admin'))
                .catch(next)
            break;
        case 'phindi':
            req.body = new ListPhindi(req.body)
            req.body.save()
                .then(() => res.redirect('/admin'))
                .catch(next)
            break;
          break;
          case 'espresso':
            req.body = new ListEspresso(req.body)
            req.body.save()
                .then(() => res.redirect('/admin'))
                .catch(next)
          break;
        default:
            break;
      }
    }
    destroy(req, res, next){
        Promise.all([ListCafe.delete({_id: req.params.id}),ListPhindi.delete({_id: req.params.id}),ListEspresso.delete({_id: req.params.id})])
        .then(()=>{
            res.redirect('/admin')
        })
        .catch(next)
    }
    destroyPower(req, res, next){
        Promise.all([ListCafe.deleteOne({_id: req.params.id}),ListPhindi.deleteOne({_id: req.params.id}),ListEspresso.deleteOne({_id: req.params.id})])
        .then(()=>{
            res.redirect('back')
        })
        .catch(next)
    }
    handleForm(req, res, next){
        switch (req.body.action) {
            case 'Delete':
                Promise.all([ListCafe.delete({_id: {$in: req.body.coursesIds}}),ListPhindi.delete({_id: {$in: req.body.coursesIds}}),ListEspresso.delete({_id: {$in: req.body.coursesIds}})])
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            case 'Restore':
                Promise.all([ListCafe.restore({_id: {$in: req.body.coursescoursesIds}}),ListPhindi.restore({_id: {$in: req.body.coursesIds}}),ListEspresso.restore({_id: {$in: req.body.coursesIds}})])
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            case 'DeleteAll':
                Promise.all([ListCafe.deleteOne({_id: {$in: req.body.coursesIds}}),ListPhindi.deleteOne({_id: {$in: req.body.coursesIds}}),ListEspresso.deleteOne({_id: {$in: req.body.coursesIds}})])
                    .then(() => 
                    {   
                        res.redirect('back')})
                    .catch(next)
                break;
            default:
                break;
        }
    }
    trashMenu(req, res, next){
        Promise.all([ListCafe.findDeleted(),ListPhindi.findDeleted(),ListEspresso.findDeleted()])
        .then(([cafe,phindi,espresso])=>{
            res.render('login/trashMenu',{cafe : mutiMongooseObject(cafe),phindi:mutiMongooseObject(phindi),espresso:mutiMongooseObject(espresso)})
        })
        .catch(next)
    }


    restore(req, res, next){
        Promise.all([ListCafe.restore({_id: req.params.id}),ListPhindi.restore({_id: req.params.id}),ListEspresso.restore({_id: req.params.id})])
            .then(() => res.redirect('back'))
            .catch(next)
    }
}
module.exports = new HomeCafeController;