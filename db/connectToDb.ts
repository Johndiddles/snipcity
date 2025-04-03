import mongoose from "mongoose";

const uri = process.env.MONGODB_URI as string;

const connectToDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to the database");

    return;
  }

  try {
    console.log({ uri });
    await mongoose.connect(uri);
    console.log("You successfully connected to MongoDB!");
  } finally {
  }
};

export default connectToDB;
