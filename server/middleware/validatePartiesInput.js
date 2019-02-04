class validate {
  static input(req, res, next) {
    req.checkBody('name')
      .notEmpty()
      .withMessage('Party Name is required')
      .trim()
      .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)
      .withMessage('Invalid Input')
      .customSanitizer(name => name.toLowerCase());
    req.checkBody('hqAddress')
      .notEmpty()
      .withMessage('Address is required')
      .matches(/^[a-zA-Z0-9\s,.'-]{3,}$/);
    req.checkBody('logoUrl')
      .notEmpty()
      .withMessage('logoUrl is required')
      .isURL()
      .withMessage('logo should contain a valid URL');
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
    req.checkParams('id')
      .notEmpty()
      .trim()
      .isNumeric();
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
