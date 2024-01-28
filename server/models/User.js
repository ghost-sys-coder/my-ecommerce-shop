import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
    Admin: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: [true, 'name field required!']
    },
    email: {
        type: String,
        required: [true, 'email field required'],
        unique: [true, 'email already taken!']
    },
    password: {
        type: String,
        required: [true, 'password field required']
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
    },
    resetCode: {
        type: String,
    },
    resetCodeExpiration: {
        type: Date
    },
    addresses: [
        {
            name: String,
            mobileNo: String,
            houseNo: String,
            streetNo: String,
            landMark: String,
            city: String,
            country: String,
            postalCode: String
        }
    ],
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order'
        }
    ]
}, { timestamps: true });

/**
 * ? Fire this function before the document is saved
 */
UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

/**
 * ! Fire this function before the document is saved
 */
UserSchema.post("save", async (doc, next) => {
    console.log("User document has been saved!", doc);
    next();
});


/**
 * ? Fire function to login User
 */
UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });

    if (user) {
        if (user.verified) {
            const auth = await bcrypt.compare(password, user.password);

            if (auth) {
                return user;
            }
            throw Error("Wrong password!")

        }
        throw Error("Email is not verified! Check your mailbox for a verification link!")
    }
    throw Error("Email not registered!")
}


const User = model('User', UserSchema);

export default User;