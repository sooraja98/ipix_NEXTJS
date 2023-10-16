import {connect} from '@/dbconfig/dbConfig';
import catelog from '@/models/catelog';
// import cloudinary from 'cloudinary';
// import multer from 'multer';
import {NextRequest, NextResponse} from 'next/server';

connect();

// Configure Cloudinary
// cloudinary.config({cloud_name: process.env.CLOUD_NAME, api_key: process.env.CLOUDNARY_API, api_secret: process.env.CLOUDNARY_SEC_API, secure: true});

// const storage = multer.memoryStorage();
// const upload = multer({storage});

// const uploadImageToCloudinary = async (imageBuffer, folderName) => {
//     try { // Convert the buffer to a base64 data URI
//         const dataURI = `data:image/jpeg;base64,${
//             imageBuffer.toString('base64')
//         }`;

//         // Upload the data URI to Cloudinary
//         const result = await cloudinary.uploader.upload(dataURI, {
//             resource_type: 'image',
//             folder: folderName
//         });

//         return result.secure_url;
//     } catch (error) {
//         throw error;
//     }
// };

export async function POST(NextRequest) {
    try {
        const reqBody = await NextRequest.json()
        const {name, description, image} = reqBody;


        // Save the data to your database
        const newCatalogItem = new catelog({
            name, description, imageUrl: null,
            // other properties for the catalog item
        });

        await newCatalogItem.save();

        return NextResponse.json({message: "Product added successfully"});
    } catch (error) {
        console.error("Error uploading image:", error);
        return NextResponse.error("An error occurred while uploading the image.");
    }
}
