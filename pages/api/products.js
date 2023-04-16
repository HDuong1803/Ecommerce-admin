import clientPromise from "@/lib/mongodb";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";

export default async function handle(req,res){
    const {method} =req;
    await mongooseConnect();
    if(method ==='GET'){
        if(req.query?.id) {
            res.json(await Product.findOne({_id:req.query.id}));
        } else {
            res.json(await Product.find());
        }
        res.json(await Product.find());
    }
    if(method ==='POST') {
        const {title,descripton,price} =req.body;
        const productDoc = await Product.create({
            title,descripton,price,
        })
         res.json(productDoc);
    }

    if(method === 'PUT') {
        const {title,descripton,price, _id} =req.body;
        await Product.updateOne({_id},{title, descripton, price});
        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
          await Product.deleteOne({_id:req.query?.id});
          res.json(true);
        }
    }
}