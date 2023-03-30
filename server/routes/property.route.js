import express from "express";

import { getAllProperties, getPropertyByID, createPropery, updateProperty, deleteProperty } from "../controllers/property.controller";


const router = express.Router();

router.route('/').get(getAllProperties);
router.route('/:id').get(getPropertyByID);
router.route('/').post(createPropery);
router.route('/:id').get(updateProperty);
router.route('/:id').get(deleteProperty);

export default router;