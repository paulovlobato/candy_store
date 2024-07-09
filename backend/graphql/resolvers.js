const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

const URL = process.env.CANDY_STORE_URL;

const resolvers = {
  Query: {
    users: async (_, { page = 1, pageSize = 10, sortBy = "date", sortOrder = "desc", filterPerson, filterCandy }) => {
      try {
        console.info('Received GraphQL request');
        
        // const data = await fs.readFile(path.join(__dirname, 'mock.json'), 'utf8');
        // let users = JSON.parse(data);

        const res = await axios.get(URL);
        let users = res.data;

        if (filterCandy) {
          users = users.filter(user => user.candy.toLowerCase().includes(filterCandy.toLowerCase()));
        }

        if (filterPerson) {
          users = users.filter(user => user.name.toLowerCase().includes(filterPerson.toLowerCase()));
        }

        users.sort((a, b) => {
          if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
          if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
          return 0;
        });

        const totalCount = users.length;
        const startIdx = (page - 1) * pageSize;
        const paginatedUsers = users.slice(startIdx, startIdx + pageSize);

        return {
          users: paginatedUsers,
          totalCount,
        };
      } catch (error) {
        console.error('Error in users resolver:', error);
        throw new Error(error);
      }
    },
  },
};

module.exports = resolvers;