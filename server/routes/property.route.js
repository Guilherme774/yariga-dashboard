import express from "express";

import { getAllProperties, getPropertyByID, createProperty, updateProperty, deleteProperty } from "../controllers/property.controller";


const router = express.Router();

router.route('/').get(getAllProperties);
router.route('/:id').get(getPropertyByID);
router.route('/').post(createProperty);
router.route('/:id').get(updateProperty);
router.route('/:id').get(deleteProperty);

export default router;