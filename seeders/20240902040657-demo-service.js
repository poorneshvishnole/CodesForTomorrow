'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Assuming Category IDs are 1 and 2 from the above seed
    return queryInterface.bulkInsert('Services', [
      {
        name: 'Web Development',
        type: 'Normal',
        categoryId: 1, // Technology
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'SEO Optimization',
        type: 'VIP',
        categoryId: 1, // Technology
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Consultation',
        type: 'Normal',
        categoryId: 2, // Healthcare
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Services', null, {});
  },
};
