let express = require('express');
let router = express.Router();

let comb = require('comb');
let logger = comb.logger('ss.routes.api');

let mw = require('./middleware');

let StreamsController = require('./../controllers/streams');

// create new stream
router.post('/streams', mw.apiSessionProtected, function(req, res, next) {
    StreamsController.createStream(req.session.user, req.body.name, req.body.subIds).then(streamId => {
        res.redirect('/streams/' + streamId);
    }).catch(err => {
        logger.error(err);
    });
});

// delete stream
router.delete('/streams', mw.apiSessionProtected, function(req, res, next) {
    StreamsController.deleteStream(req.session.user, req.body.folderId).then(() => {
        res.redirect('/');
    }).catch(err => {
        logger.error(err);
    });
});

// get all streams
router.get('/streams', mw.apiSessionProtected, function(req, res, next) {
    StreamsController.getAllSubs(req.session.user).then(subs => {
        return StreamsController.getAllStreams(req.session.user, subs);
    }).then(streams => {
        res.json(streams);
    }).catch(err => {
        logger.error(err);
    });
});

// get single stream
router.get('/streams/:id', mw.apiSessionProtected, function(req, res, next) {

});

// modify a stream
router.patch('/streams/:id', mw.apiSessionProtected, function(req, res, next) {

});

module.exports = router;