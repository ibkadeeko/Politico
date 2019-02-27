class validate {
  static input(req, res, next) {
    req.checkBody('name')
      .notEmpty()
      .withMessage('office Name is required')
      .trim()
      .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)
      .withMessage('Office Name Input is Invalid')
      .customSanitizer(name => name.toLowerCase());
    req.checkBody('type')
      .notEmpty()
      .withMessage('Office type is Required')
      .trim()
      .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)
      .withMessage('Office type input is in valid')
      .customSanitizer(name => name.toLowerCase());
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
