import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema({
    sender:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: String ,
    timestamp: Date,
  });
  

  export default mongoose.model('Chat', chatSchema) 