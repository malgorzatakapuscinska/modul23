import Note from '../models/note';
import Lane from '../models/lane';
import uuid from 'uuid';

export function addNote(req, res) {
  const { note, laneId } = req.body;

  if (!note || !note.task || !laneId) {
    res.status(400).end();
  }

  const newNote = new Note({
    task: note.task,
  });

  newNote.id = uuid();

  newNote.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      Lane.findOne({ id: laneId })
        .then(lane => {
          lane.notes.push(saved);
          return lane.save();
        })
        .then(() => {
          res.json(saved);
        });
    }
  });
}

/*export function deleteNote(req, res){

const noteId = req.params.noteId;


  Note.findOne({ id: noteId }).exec((err, note) => {
   if (err) {
     res.status(500).send(err);
   }

    Note.findOne({id: noteId}, (err, lane) => {
        note.remove(() => {
          Lane.findOne({id: req.body.laneId}).exec((err, lane) => {
            const updateNotes = lane.notes.filter(note => note.id !== noteId);
            lane.notes = updateNotes;
            lane.save();
            res.json(note);
          });
        });
    });
  });
}*/

export function deleteNote(req, res) {
  const noteId = req.params.noteId
  Note.findOne({ id: noteId }).exec((err, note) => {
    if (err) {
      res.status(500).send(err);
    }

    note.remove(() => {
      Lane.findOne({id: req.body.laneId}).exec((err, lane) => {
        const updatedNotes = lane.notes.filter(note => note.id !== noteId);
        lane.notes = updatedNotes;
        lane.save();
        res.json(note);
      });
    });
  });
}
