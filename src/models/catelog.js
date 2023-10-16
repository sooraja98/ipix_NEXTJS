import mongoose from 'mongoose';
const catelogtSchema = new mongoose.Schema({
  name: String,
  description:String,
  image: String,
});
const Catelog = mongoose.models.catelog || mongoose.model("catelog", catelogtSchema);
export default Catelog