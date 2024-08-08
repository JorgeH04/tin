const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {

    username: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },

    firstImage: {
      type: String,
      default: null

    },
    crushes:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref: "user"
      }
    ],
    receivedLikes:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref: "user"
      }
    ],

    dislikesDelivered:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref: "user"
      }
    ],
    matches:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref: "user"
      }
    ],
  },
  {
    timestamps:true
  }
);


module.exports = mongoose.model('user', userSchema);



