import partiesDb from '../models/parties';

// Create Party
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

    const alreadyExists = partiesDb
      .find(party => party.name.toLowerCase() === req.body.name.toLowerCase());

    if (alreadyExists) {
      return res.status(400).json({
        status: 400,
        error: 'party already exists',
      });
    }

    let createdParty;

    if (!alreadyExists) {
      createdParty = {
        id: partiesDb.length + 1,
        name: req.body.name,
        hqAddress: req.body.hqAddress,
        logoUrl: req.body.logoUrl,
      };
    }
    partiesDb.push(createdParty);
    return res.status(201).json({
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

  // READ - Get All Parties
  static getAll(req, res) {
    return res.status(200).json({
      status: 200,
      data: partiesDb,
    });
  }

  // READ - Get a particular party
  static getOne(req, res) {
    const id = parseInt(req.params.id, 10);
    const selectedParty = partiesDb.find(party => party.id === id);
    if (!selectedParty) {
      return res.status(404).json({
        status: '404',
        error: 'id not found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: [selectedParty],
    });
  }

  static update(req, res) {
    const id = parseInt(req.params.id, 10);
    const partyIndex = partiesDb.findIndex(party => party.id === id);

    if (partyIndex === -1) {
      return res.status(404).json({
        status: '404',
        error: 'id not found',
      });
    }
    partiesDb[partyIndex].name = req.body.name;
    return res.status(200).json({
      status: '200',
      data: [partiesDb[partyIndex]],
    });
  }

  static delete(req, res) {
    const id = parseInt(req.params.id, 10);
    const partyIndex = partiesDb.findIndex(party => party.id === id);

    if (partyIndex === -1) {
      return res.status(404).json({
        status: '404',
        error: 'id not found',
      });
    }
    partiesDb.splice(partyIndex, 1);
    return res.status(200).json({
      status: '200',
      data: [
        {
          message: 'Party DELETED successfully',
        },
      ],
    });
  }
}

export default parties;
