import { Router } from 'express';
import * as LaneController from '../controllers/lane.controller';

const router = new Router();

router.route('/lanes').post(LaneController.addLane);
router.route('/lanes').get(LaneController.getLanes);


export default router;
