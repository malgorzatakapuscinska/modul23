import Lane from '../models/lane';
import uuid from 'uuid';

//addLane function - creates an instance of Lane,

export function addLane(req, res) {
  if(!req.body.name) {
    res.status(403).end();
    return;
  }

  const newLane = new Lane(req.body);

  newLane.notes = [];
  newLane.id = uuid();
  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    } else {
        res.json(saved);
      }
  });
}

export function getLanes(req, res) {
  Lane.find({}, (err, lanes) => {
    if(err) {
      res.status(500).send(message);
      return ;
    }
    res.json({lanes});
  });
}

export function deleteLane(req, res) {
  Lane.findOne({ id: req.params.laneId  }).exec((err, lane) => {
    if(err){
      res.status(500).send(err);
      return;
    }
    lane.remove(() => {res.status(200).end();
    });
  });
}
