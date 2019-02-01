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

  // READ - Get All offices
  static getAll(req, res) {
    return res.status(200).json({
      status: 200,
      data: officesDb,
    });
  }

  // READ - Get a particular office
  static getOne(req, res) {
    const id = parseInt(req.params.id, 10);
    const selectedOffice = officesDb.find(office => office.id === id);
    if (!selectedOffice) {
      return res.status(404).json({
        status: '404',
        error: 'The office was not found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: [selectedOffice],
    });
  }
}

export default offices;
