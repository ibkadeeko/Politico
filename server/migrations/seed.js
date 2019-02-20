const populate = `

INSERT INTO
  offices
VALUES 
  ( default, 'federal', 'president'),
  ( default, 'state', 'governor of lagos'),
  ( default, 'legislative', 'abuja central house of representatives'),
  ( default, 'local government', 'bwari area council chairman');

INSERT INTO
  parties
VALUES
  ( default, 'peoples democratic party', 'abuja, nigeria', 'https://politicsngr.com/wp-content/uploads/2018/03/IMG-20171125-WA0040.jpg'),
  ( default, 'all progressives congress', 'lagos, nigeria', 'https://politicsngr.com/wp-content/uploads/2018/03/IMG-20171125-WA0040.jpg'),
  ( default, 'young progressives party', 'enugu, nigeria', 'https://politicsngr.com/wp-content/uploads/2018/03/IMG-20171125-WA0040.jpg');
  
INSERT INTO
  users
VALUES
  (default, 'michael', 'wagner', 'arrow', 'mikewagner@andela.com', 18007593000, 'Ilove0cats#', null, false);

INSERT INTO
  candidates
VALUES
  (default, 1, 1, 1);
`;

export default populate;
