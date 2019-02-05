import { Pool } from 'pg';

const pool = new Pool({
  user: 'ibukun', // this is the db user credential
  database: 'politico',
  password: 'password',
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
});

class parties {
  static findAll(req, res) {
    pool.query('SELECT * FROM parties ORDER BY id ASC', (err, foundParties) => {
      // callback
      if (err) {
        res.status(400).send({
          status: 400,
          error: err.stack,
        });
      }
      res.status(200).send({
        status: 200,
        data: foundParties.rows,
      });
    });
  }

  static create(req, res) {
    const text = 'INSERT INTO parties(name, hqaddress, logourl) VALUES($1, $2, $3) RETURNING *';
    const { name, hqaddress, logourl } = req.body;
    const values = [name, hqaddress, logourl];
    const exists = 'SELECT * FROM parties WHERE name = $1';
    const alreadyExists = pool.query(exists, [name], (error, Party) => {
      if (Party.rowCount === 0) {
        return false;
      }
    });
    if (alreadyExists) {
      return res.status(400).json({
        status: 400,
        error: 'party already exists',
      });
    }
    pool.query(text, values, (err, newParty) => {
      if (err) {
        res.status(400).send({
          status: 400,
          error: err.stack,
        });
      }
      res.status(201).send({
        status: 201,
        data: [newParty.rows[0]],
      });
    });
  }

  static findById(req, res) {
    const text = 'SELECT * FROM parties WHERE id = $1';
    const id = parseInt(req.params.id, 10);
    pool.query(text, [id], (err, foundParty) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: err.stack,
        });
      }
      if (foundParty.rowCount !== 0) {
        return res.status(200).json({
          status: 200,
          data: [foundParty.rows[0]],
        });
      }
      return res.status(404).send({
        status: '404',
        error: 'The party was not found',
      });
    });
  }

  static findByIdAndUpdate(req, res) {
    const id = parseInt(req.params.id, 10);
    const { name } = req.body;
    pool.query('UPDATE parties SET name = $1 WHERE id = $2 RETURNING *', [name, id], (err, updatedParty) => {
      if (err) {
        res.status(400).send({
          status: 400,
          error: err.stack,
        });
      }
      if (updatedParty.rowCount !== 0) {
        return res.status(200).json({
          status: 200,
          data: [updatedParty.rows[0]],
        });
      }
      return res.status(404).send({
        status: '404',
        error: 'The party was not found',
      });
    });
  }

  static findByIdAndDelete(req, res) {
    const id = parseInt(req.params.id, 10);
    pool.query('DELETE FROM parties WHERE id = $1 RETURNING *', [id], (err, response) => {
      if (err) {
        res.status(400).send({
          status: 400,
          error: err.stack,
        });
      }
      if (response.rowCount !== 0) {
        return res.status(200).json({
          status: 200,
          message: `User Successfully deleted with ID: ${id}`,
        });
      }
      return res.status(404).send({
        status: '404',
        error: 'The party was not found',
      });
    });
  }
}

export default parties;


// import db from '../models/index';

// class parties {
//   static findAll(req, res) {
//     db.query('SELECT * FROM parties ORDER BY id ASC', (err, foundParties) => {
//       // callback
//       if (err) {
//         res.status(400).send({
//           status: 400,
//           error: err.stack,
//         });
//       }
//       return res.status(200).json({
//         status: 200,
//         data: foundParties,
//       });
//     });
//   }

//   static create(req, res) {
//     const text = 'INSERT INTO parties(name, hqAddress, logoUrl) VALUES($1, $2, $3) RETURNING *';
//     const { name, hqAddress, logoUrl } = req.body;
//     const values = [name, hqAddress, logoUrl];

//     // Check that party already exists
//     // const alreadyExists = 'SELECT * FROM parties WHERE type = $1, name = $2';
//     // db.query(alreadyExists, values, (err, result) => {
//     //   if (result.rows > 0) {
//     //     res.status(400).send({
//     //       status: 400,
//     //       error: 'party already exists',
//     //     });
//     //   }
//     // });

//     db.query(text, values, (err, newParty) => {
//       if (err) {
//         res.status(400).send({
//           status: 400,
//           error: err.stack,
//         });
//       }
//       return res.status(201).json({
//         status: 201,
//         data: newParty,
//       });
//     });
//   }

//   static findById(req, res) {
//     const text = 'SELECT * FROM parties WHERE id = $1';
//     const id = parseInt(req.params.id, 10);
//     // const id = parseInt(req.params.id, 10);
//     //     const selectedparty = partiesDb.find(party => party.id === id);
//     //     if (!selectedparty) {
//     //       return res.status(404).json({
//     //         status: '404',
//     //         error: 'The party was not found',
//     //       });
//     //     }
//     db.query(text, [id], (err, foundParty) => {
//       if (err) {
//         res.status(400).send({
//           status: 400,
//           error: err.stack,
//         });
//       }
//       return res.status(200).json({
//         status: 200,

//         data: foundParty,
//       });
//     });
//   }

//   static findByIdAndUpdate(req, res) {
//     const id = parseInt(req.params.id, 10);
//     const { name } = req.body;
//     db.query('UPDATE parties SET name = $1 WHERE id = $2', [name, id], (err, updatedParty) => {
//       if (err) {
//         res.status(400).send({
//           status: 400,
//           error: err.stack,
//         });
//       }
//       return res.status(200).json({
//         status: 200,
//         data: updatedParty.rows,
//       });
//     });
//   }

//   static findByIdAndDelete(req, res) {
//     const id = parseInt(req.params.id, 10);
//     db.query('DELETE FROM users WHERE id = $1', [id], (err) => {
//       if (err) {
//         res.status(400).send({
//           status: 400,
//           error: err.stack,
//         });
//       }
//       return res.status(200).json({
//         status: 200,
//         message: `User Successfully deleted with ID: ${id}`,
//       });
//     });
//   }
// }

// export default parties;


// // import partiesDb from '../models/parties';

// // class parties {
// //   // Create Party
// //   static create(req, res) {
// //     const alreadyExists = partiesDb
// //       .find(party => party.name.toLowerCase() === req.body.name.toLowerCase());

// //     if (alreadyExists) {
// //       return res.status(400).json({
// //         status: 400,
// //         error: 'party already exists',
// //       });
// //     }
// //     const createdParty = {
// //       id: partiesDb.length + 1,
// //       name: req.body.name,
// //       hqAddress: req.body.hqAddress,
// //       logoUrl: req.body.logoUrl,
// //     };
// //     partiesDb.push(createdParty);
// //     return res.status(201).json({
// //       status: 201,
// //       data: [
// //         {
// //           success: true,
// //           message: 'Party created successfully',
// //           data: createdParty,
// //         },
// //       ],
// //     });
// //   }

// //   // READ - Get All Parties
// //   static getAll(req, res) {
// //     return res.status(200).json({
// //       status: 200,
// //       data: partiesDb,
// //     });
// //   }

// //   // READ - Get a particular party
// //   static getOne(req, res) {
// //     const id = parseInt(req.params.id, 10);
// //     const selectedParty = partiesDb.find(party => party.id === id);
// //     if (!selectedParty) {
// //       return res.status(404).json({
// //         status: '404',
// //         error: 'The party was not found',
// //       });
// //     }
// //     return res.status(200).json({
// //       status: 200,
// //       data: [selectedParty],
// //     });
// //   }

// //   // PUT - Update Party
// //   static update(req, res) {
// //     const id = parseInt(req.params.id, 10);
// //     const partyIndex = partiesDb.findIndex(party => party.id === id);

// //     if (partyIndex === -1) {
// //       return res.status(404).json({
// //         status: '404',
// //         error: 'The party was not found',
// //       });
// //     }
// //     partiesDb[partyIndex].name = req.body.name;
// //     return res.status(200).json({
// //       status: '200',
// //       data: [partiesDb[partyIndex]],
// //     });
// //   }

// //   // DELETE - Delete Party
// //   static delete(req, res) {
// //     const id = parseInt(req.params.id, 10);
// //     const partyIndex = partiesDb.findIndex(party => party.id === id);

// //     if (partyIndex === -1) {
// //       return res.status(404).json({
// //         status: '404',
// //         error: 'The party was not found',
// //       });
// //     }
// //     partiesDb.splice(partyIndex, 1);
// //     return res.status(200).json({
// //       status: '200',
// //       data: [
// //         {
// //           message: 'Party DELETED successfully',
// //         },
// //       ],
// //     });
// //   }
// // }

// // export default parties;
