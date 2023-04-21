/**
 * Пользоваться только static методами createFile и deepDelete.
 * из api мы можем его только прочитать, мы не можем напрямую создать его или изменить?
 *
 * File отличается от других моделей, его нельзя создать или изменить напрямую через api.
 * Все взаимодействия с File должны происходить из других моделей.
 *
 * Двоичный файл можно создать, удалить и прочитать.
 * Как можно изменить двоичный файл? Удалить документ из mongo и создать заново.
 * Что мы можем изменить в документе?
 * *    людей имеющих доступ
 * *    приватность файла
 * */
const {Schema, model} = require('mongoose');
const fs = require("fs");
const colors = require("../../log/colors");

const logger = require('../../log/logger')('File');

const FileSchema = new Schema({
    path: {
        type: String,
        immutable: true,
        required: true,
        index: true,
    },
    owner: { // Не всегда есть owner, могут быть публичные файлы
        type: Schema.Types.ObjectId,
        ref: 'User',
        immutable: true,
        // required: true, // Это кажется необязательное поле, если нужно будет добавляем id в accessHolders, то есть так будет гибче.
        index: true,
    },
    name: {
        type: String,
        immutable: true,
        required: true,
    },
    encoding: {
        type: String,
        immutable: true,
        required: true,
    },
    mimetype: {
        type: String,
        immutable: true,
        required: true,
    },
    accessType: {
        type: String,
        enum: ['public', 'private'],
        default: 'public',
    },
    accessHolders: [{ type: Schema.Types.ObjectId, ref: 'User' }],
},
{
    timestamps: true,
    strict: true,
});

FileSchema.plugin(require('../log-plugin'));

module.exports = model('File', FileSchema);
