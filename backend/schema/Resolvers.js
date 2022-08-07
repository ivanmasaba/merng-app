const Category = require('../models/Category');
const Furniture = require('../models/furniture');
const GraphQLUpload = require('graphql-upload/GraphQLUpload');
// const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const resolvers = {
    Upload: GraphQLUpload,

    category:{
        items: async (parent, args) => {
            return Furniture.find({categoryID: parent.id})
        }
    },

    furniture: {
        category: async (parent, args) => {
            return Category.findById(parent.categoryID)
         }
    },
   
    Query: {
        // CATEGORY QUERIES FUNCTIONS
         //  function to get all categories
        categories: async () => {
            return Category.find({})
        },
        //  function to get one category
        category: async (parent, args) => {
            return Category.findById(args.id)
        },

        /******** FURNITURE QUERIES FUNCTIONS ************ */

         //  function to get all categories
         furnitureItems: async () => {
            return Furniture.find({})
        },
        //  function to get one category
        furnitureItem: async (parent, args) => {
            return Furniture.findById(args.id).populate("categoryID").exec();
        },


    },

    Mutation: {
        async fileUpload(_, { file }){
            const { createReadStream, filename, mimetype } = await file;

            const stream = createReadStream();
            const pathname = path.join(__dirname, `../public/images/${filename}`);

                await new Promise((resolve, reject) => {
                    stream.on('error', error => {
                    unlink(path, () => {
                        reject(error);
                        });
                    }).pipe(fs.createWriteStream(pathname))
                    .on('error', reject)
                    .on('finish', resolve)
                });

                return {
                    filename, mimetype
                } ;

         },
        /******** CREATE CATEGORY ******************/
        createCategory: async (parent, args) => {
            let category = new Category({
                name: args.name
            })
          return category.save()
        },

         /******** CREATE FURNITURE ITEM ******************/
         async createItem(_, { name, categoryID, description, file }){
            const { createReadStream, filename, mimetype } = await file;

            const stream = createReadStream();
            const pathname = path.join(__dirname, `../public/images/${filename}`);

                await new Promise((resolve, reject) => {
                    stream.on('error', error => {
                    unlink(path, () => {
                        reject(error);
                        });
                    }).pipe(fs.createWriteStream(pathname))
                    .on('error', reject)
                    .on('finish', resolve)
                });

                // resize image
                // sharp(pathname)
                // .resize({width: 200, height: 200 })
                // .toFile(pathname)
                // .then(() => console.log('Image resized...'))

                var imageAsBase64 = fs.readFileSync(pathname, 'base64');

                

                let item = new Furniture({
                                            name: name,
                                            categoryID: categoryID,
                                            description: description,
                                            imageName: filename,
                                            image: new Buffer.from(imageAsBase64, 'base64'),
                                            ImageType: mimetype
                                        })

                item = await item.save();
                if(pathname != null){
                    removeImage(pathname);
                }

                return item ;

         },

    },
};

function removeImage(pathname){
    fs.unlink(pathname, err =>{
        if(err){
            console.err(err)
        }
    })
}


module.exports = { resolvers };

