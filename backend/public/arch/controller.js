const getObjectIdFields = (Model) => {
    const objectIdFields = Object.keys(Model.schema.paths).filter(field =>
        Model.schema.paths[field].instance === 'ObjectID'
    );

    return objectIdFields.map(
        field => ({
            field: field,
            model: Model.schema.paths[field].options.ref,
        })
    );
};