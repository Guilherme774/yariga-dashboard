import User from '../mongodb/models/user.js';
import Property from '../mongodb/models/property.js';


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});

        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserByID = async (req, res) => {
    try {
        const { id } = req.params;
    
        const user = await User.findOne({ _id: id }).populate('allProperties');
    
        if(user) res.status(200).json(user);
        else res.status(404).json({ message: 'User not found!' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });    
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        const userExists = await User.findOne({ email });
    
        if(userExists) return res.status(201).json(userExists);
    
        if(!name || !email) return res.status(412).json({ message: 'Todos os campos são obrigatórios!' });

        const newUser = await User.create({
            name,
            email
        });
    
        res.status(200).json(newUser); 
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }

    
};

const updateUser = async (req, res) => {};

const deleteUser = async (req, res) => {};

export {
    getAllUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser
}