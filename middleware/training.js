
export const validateCreateTrainingSession = (req, res, next) => {
  const requestTrainingSession = req.body;

  if (!requestTrainingSession.title) {
		return res.status(400).send('training session missing title');
	}

  if (!requestTrainingSession.description) {
		return res.status(400).send('training session missing description');
	}

  req.trainingSession = requestTrainingSession;
  next();
};

export const validateUpdateTrainingSessionStatus = (req, res, next) => {

  const requestTrainingSession = req.body;
  
  if (!req.params.trainingSessionId) {
		return res.status(400).send('request missing trainingSessionId query field');
	}

	if (requestTrainingSession.isCompleted === undefined || requestTrainingSession.isCompleted === null) {
		return res.status(400).send('request missing isCompleted field');
	}

  requestTrainingSession.id = req.params.trainingSessionId;
  req.trainingSession = requestTrainingSession;
	next();
};

export const validateUpdateTrainingSessions = (req, res, next) => {
  
  if (req.body.trainingPlan === undefined || req.body.trainingPlan === null) {
    return res.status(400).send('request missing trainingPlan');
  }

  if (req.body.bankSessions === undefined || req.body.bankSessions === null) {
		return res.status(400).send('request missing bankSessions');
	}

  next();
};