module.exports = (model, user) => !model ? null : ({
    id: model.id,
    name: model.name,
    email: model.email,
    role: model.role,
    status: model.status,
    profile_photo: model.profile_photo,
    updatedAt: model.updatedAt
});