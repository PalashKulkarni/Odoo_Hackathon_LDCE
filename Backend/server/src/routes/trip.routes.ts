import { Router } from 'express';
import { tripController } from '../controllers/trip.controller';
import { activityController } from '../controllers/activity.controller';
import { budgetController } from '../controllers/budget.controller';

const router = Router();

// Trip Core
router.get('/', tripController.getTrips.bind(tripController));
router.post('/', tripController.createTrip.bind(tripController));
router.get('/:id', tripController.getTrip.bind(tripController));
router.post('/:id/stops', tripController.addStop.bind(tripController));

// Itinerary / Activities
router.get('/:tripId/timeline', activityController.getTimeline.bind(activityController));
router.post('/:tripId/stops/:stopId/activities', activityController.addActivity.bind(activityController));

// Budget / Expenses
router.get('/:tripId/budget', budgetController.getSummary.bind(budgetController));
router.post('/:tripId/expenses', budgetController.addExpense.bind(budgetController));

export default router;
