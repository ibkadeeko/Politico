class validate {
  static result(req, res, next) {
    req.checkParams('officeid')
      .trim()
      .notEmpty()
      .withMessage('Office id Parameter is required')
      .isNumeric()
      .withMessage('Office id Parameter should be numeric');
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        status: 400,
        error: errors[0].msg,
      });
    }
    next();
  }

  static id(req, res, next) {
    req.checkBody('partyid')
      .trim()
      .notEmpty()
      .withMessage('Party id is required')
      .isNumeric()
      .withMessage('Party id should be numeric');
    req.checkBody('officeid')
      .trim()
      .notEmpty()
      .withMessage('Office id is required')
      .isNumeric()
      .withMessage('Office id should be numeric');
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        status: 400,
        error: errors[0].msg,
      });
    }
    next();
  }

  static vote(req, res, next) {
    req.checkBody('candidateid')
      .trim()
      .notEmpty()
      .withMessage('Candidate id is required')
      .isNumeric()
      .withMessage('Candidate id should be numeric');
    req.checkBody('officeid')
      .trim()
      .notEmpty()
      .withMessage('Office id is required')
      .isNumeric()
      .withMessage('Office id should be numeric');
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        status: 400,
        error: errors[0].msg,
      });
    }
    next();
  }
}

export default validate;
