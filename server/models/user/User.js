const {Schema, model} = require('mongoose');

const colors = require("../../log/colors");

const UserSchema = new Schema(
    {
        name: {
            type: String,
            trim: true, // trim выполняется первее всех остальных валидаций
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            // minLength: 10, // @astanait.edu.kz=16 @outlook.com=12
            lowercase: true,
            immutable: true,
        },
        password: {
            type: String,
            // trim: true, // Здесь хэш константного размера
            // minLength: 5, // Здесь хэш константного размера
        },
        phone: {
            type: String,
            trim: true,
            minLength: 11, // for kz
        },
        // Остальное назначает сервер и не может ошибиться
        identity_provider: {
            type: String,
            required: true,
            enum: ['azure', 'local'], // 'google'
        },
        role: {
            type: String,
            enum: ['client', 'admin'],
            default: 'client',
        },
        status: {
            type: String,
            enum: ['ok', 'banned'], // not_activated - это не статус, это означает полное отсутствие пользователя
            default: 'ok'
        },
        profile_photo: {
            type: Schema.Types.ObjectId,
            ref: 'File',
        }
    },
    {
        timestamps: true,
        strict: true,
    }
)

/*UserSchema.path('email').validate(async (email)=>{
    return !await modelsManager.models.User.findOne({ email });
}, 'Error, expected email to be unique');*/

UserSchema.plugin(require('../log-plugin'));
UserSchema.plugin(require('../../websocket/observer/user-observer'));
UserSchema.plugin(require('../../websocket/observer/auth-observer'));

UserSchema.statics.privateFiles = function(){
    return ['profile_photo'];
}

/*UserSchema.methods.onCreate = async function({body, user}){}

UserSchema.methods.deepDelete = async function (){
    await this.delete();
    return this;
}*/

module.exports = model('User', UserSchema);
