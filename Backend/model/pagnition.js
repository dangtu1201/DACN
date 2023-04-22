import MongoPaging from 'mongo-cursor-pagination';

const counterSchema = new mongoose.Schema({ counter: Number });
counterSchema.plugin(MongoPaging.mongoosePlugin);

const counter = mongoose.model('counter', counterSchema);

// default function is "paginate"
counter.paginate({ limit: 10 }).then((result) => {
  console.log(result);
});