
module.exports = async function(model, user){
    const {User} = require("../../../models/models-manager");

    const participantDto = require("../../chat/participant-dto");

    const participantUser = await User.findById(model.user);

    return ({
        ...participantDto(model),
        // Ну все что нужно от пользователя можно вернуть здесь
        name: participantUser.name
    });

}