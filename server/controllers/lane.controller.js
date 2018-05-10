import Lane from '../models/lane';
import uuid from 'uuid';

//addLane function - creates an instance of Lane,

export function addLane(req, res) {
  if(!req.body.name) {
    res.status(403);
  }

  const newLane = new Lane(req.body);

  newLane.notes = [];
  newLane.id = uuid();
  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
    /*res.end();*/
  });
}

export function getLanes(req, res) {
  Lane.find().exec((err, lanes) => {
    if(err) {
      res.status(500).send(err);}
    res.json({lanes});
  });
}

export function deleteLane(req, res) {
  Lane.findOne({ id: req.params.laneId  }).exec((err, lane) => {
    if(err){
      res.status(500).send(err);
    }
    lane.remove(() => {res.status(200).end();
    });
  });
}
