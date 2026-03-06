const mongoose = require('mongoose');
const validator = require('validator');

const connectionURL = 'mongodb://127.0.0.1:27017'

mongoose.connect(`${connectionURL}/task-manager-api`, {autoIndex: true});


async function connectDB() {
    const User = mongoose.model('User', {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid')
                }
            }
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 7,
            validate(value) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error('Invalid password')
                }
            }
        },
        age: {
            type: Number,
            default: 0,
            validate(value) {
                if (value < 0) {
                    throw new Error('Age must be a possitive number')
                }
            }
        }
    })

    const me = new User({
        name: '   Harshil',
        email: 'CODINGONLYHARSHIL@GMAIL.COM     ',
        password: 'June@2002'
    })

    const result = await me.save();
    console.log(result);

    const Tasks = mongoose.model('Tasks', {
        description: {
            type: String,
            required: true,
            trim: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    })

    const task = new Tasks({
        description: 'Learn Mongoose library',
        completed: false
    })

    // const result = await task.save();
    // console.log(result);
}

// connectDB();