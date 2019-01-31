import partiesDb from '../models/parties';

class parties {
  static create(req, res) {
    if (!req.body.name) {
      return res.status(400).json({
        status: 400,
        error: 'Party Name is required',
      });
    }
    if (!req.body.hqAddress) {
      return res.status(400).json({
        status: 400,
        error: 'Address is required',
      });
    }
    if (!req.body.logoUrl) {
      return res.status(400).json({
        status: 400,
        error: 'logoUrl is required',
      });
    }

    const createdParty = {
      id: partiesDb.length + 1,
      name: req.body.name,
      hqAddress: req.body.hqAddress,
      logoUrl: req.body.logoUrl,
    };

    partiesDb.push(createdParty);
    return res.status(201).send({
      status: 201,
      data: [
        {
          success: true,
          message: 'Party created successfully',
          data: createdParty,
        },
      ],
    });
  }
}

export default parties;
