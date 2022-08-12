'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('users','dateOfBirth',Sequelize.DATE )
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('users','dateOfBirth',Sequelize.DATE );
    }
};
