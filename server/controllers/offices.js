import officesDb from '../models/offices';

// Create office
class offices {
  static create(req, res) {
    if (!req.body.name) {
      return res.status(400).json({
        status: 400,
        error: 'office Name is required',
      });
    }

    const alreadyExists = officesDb
      .find(office => office.name.toLowerCase() === req.body.name.toLowerCase());

    if (alreadyExists) {
      return res.status(400).json({
        status: 400,
        error: 'office already exists',
      });
    }

    const createdOffice = {
      id: officesDb.length + 1,
      type: req.body.type,
      name: req.body.name,
    };

    officesDb.push(createdOffice);
    return res.status(201).json({
      status: 201,
      data: [
        {
          success: true,
          message: 'office created successfully',
          data: createdOffice,
        },
      ],
    });
  }
}

export default offices;
