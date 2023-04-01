import User from '../mongodb/models/user.js';
import Property from '../mongodb/models/property.js';
import mongoose from 'mongoose';

import * as dotnenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';


dotnenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});
 

const getAllProperties = async (req, res) => {};

const getPropertyByID = async (req, res) => {
    const { id } = req.params;
    const properyExists = await Property.findOne({ _id: _id }).populate('creator');

    if(properyExists) res.status(200).json(properyExists);
    else res.status(404).json({ message: 'Property not found!' });
};

const createProperty = async (req, res) => {
    try {
        const { title, description, propertyType, location, price, photo, email } = req.body;

        // Start a new session
        const session = await mongoose.startSession();
        session.startTransaction();

        const user = await User.findOne({ email }).session(session);

        if(!user) throw new Error('User not found');

        const photoUrl = await cloudinary.uploader.upload(photo);

        const newProperty = await Property.create({
            title,
            description,
            propertyType,
            location,
            price,
            photo: photoUrl.url,
            creator: user._id
        })

        super.allProperties.push(newProperty._id);
        await user.save({ session });

        await session.commitTransaction();

        res.status(201).json({ message:'Property created successfully' });
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
    
};

const updateProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, propertyType, location, price, photo } = req.body;

        const photoUrl = await cloudinary.uploader.upload(photo);

        await Property.findByIdAndUpdate({ _id: id }, {
            title,
            description,
            propertyType,
            location,
            price,
            photo: photoUrl.url || photo
        });

        res.status(200).json({ message: 'Property updated successfully!' });
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProperty = async (req, res) => {};

export {
    getAllProperties,
    getPropertyByID,
    createProperty,
    updateProperty,
    deleteProperty
}