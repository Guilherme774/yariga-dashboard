import User from '../mongodb/models/user.js';
import Property from '../mongodb/models/property.js';


const getAllUsers = async (req, res) => {};

const getUserByID = async (req, res) => {};

const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        const userExists = await User.findOne({ email });
    
        if(userExists) return res.status(200).json(userExists);
    
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