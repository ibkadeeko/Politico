class validate {
  static input(req, res, next) {
    req.checkBody('firstname')
      .notEmpty()
      .withMessage('First Name is required')
      .trim()
      .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)
      .withMessage('Invalid Input')
      .customSanitizer(name => name.toLowerCase());
    req.checkBody('lastname')
      .notEmpty()
      .withMessage('Last Name is required')
      .trim()
      .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)
      .withMessage('Invalid Input')
      .customSanitizer(name => name.toLowerCase());
    req.checkBody('email')
      .notEmpty()
      .withMessage('Email is required')
      .trim()
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
      .withMessage('Input a valid email')
      .customSanitizer(name => name.toLowerCase());
    req.checkBody('password')
      .trim()
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password Should have a minimum length of 6');
    req.checkBody('phone')
      .notEmpty()
      .withMessage('Phone number is required')
      .trim()
      .isNumeric()
      .withMessage('Input a valid Phone Number')
      .isLength({ min: 8 })
      .withMessage('Minimum length of Phone Number is 8 digits');
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        status: 400,
        error: errors[0].msg,
      });
    }
    next();
  }

  static email(req, res, next) {
    req.checkBody('email')
      .notEmpty()
      .withMessage('Email is required')
      .trim()
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
      .withMessage('Input a valid email')
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
