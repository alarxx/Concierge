const ApiError = require("../exceptions/ApiError");
const ModelService = require("./helpers/ModelService");
const AdminService = require('./helpers/AdminService');

const { City } = require('../models/models-manager');
const cityDto = require('../dtos/city-dto');

const logger = require('../log/logger')('city-service');

const adminService = AdminService(City, cityDto, { creatorField: 'creator' });

const modelService = new ModelService(City);

const findByQueryParams = require('./helpers/openFindByQueryParams')(City, cityDto);

async function checkCityExists(cityName){
    const exist = await City.findOne({ name: cityName });
    if(!exist){
        throw ApiError.BadRequest('City not found');
    }
}

module.exports = ({
    createOne: adminService.createOne,
    deleteOne: adminService.deleteOne,
    findByQueryParams,
    checkCityExists
});