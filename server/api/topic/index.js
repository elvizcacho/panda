'use strict';

import {Router} from 'express';
import * as controller from './topic.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();



router.get('/', auth.isAuthenticated(), controller.list);
router.get('/:topicArn', auth.isAuthenticated(), controller.get);
router.post('/:topicArn/schedule', auth.isAuthenticated(), controller.schedule);
router.put('/:topicArn/schedule', auth.isAuthenticated(), controller.removeSchedule);

module.exports = router;
