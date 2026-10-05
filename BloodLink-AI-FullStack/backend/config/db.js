const mongoose=require('mongoose');
async function connectDB(){if(process.env.DEMO_MODE==='true'||!process.env.MONGO_URI){console.log('Demo mode: MongoDB skipped');return false}try{await mongoose.connect(process.env.MONGO_URI);console.log('MongoDB connected');return true}catch(e){console.log('MongoDB unavailable; continuing in demo mode:',e.message);return false}}
module.exports=connectDB;
