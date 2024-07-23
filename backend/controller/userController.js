import User from "../model/userModel.js";

//Создание
export const createUser = async (req, res) => {
    try{
        const newUser = await User(req.body);

        const { email } = newUser;

        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({message: 'Пользователь с таким email уже существует'});
        }
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch(error){
        res.status(500).json({message: error.message});

    }
};
//Получение всех пользователей
export const getAllUsers = async (req, res) => {
    try{
        const usersData = await User.find();
        if(!usersData || usersData.length === 0){
            return res.status(404).json({message: 'Пользователи не найдены'});
        };
        res.status(200).json(usersData);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};
//Получение пользователя по ID
export const getUserById = async (req, res) => {
    try{
        const userId = req.params.id;
        const userExist = await User.findById(userId);
        if(!userExist){
            return res.status(404).json({message: 'Пользователь не найден'});
        }
        res.status(200).json(userExist);

    }catch(error){
        res.status(500).json({message: error.message});
    }
};
//Обновление пользователя
export const update = async (req, res) => {
    try{
        const userId = req.params.id;
        const userExist = await User.findById(userId);
        if(!userExist){
            return res.status(404).json({message: 'Пользователь не найден'});
        }
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
            new: true
        });
        res.status(200).json(updatedUser);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};
//Удаление пользователя
export const deleteUser = async (req, res) => {
    try{
        const userId = req.params.id;
        const userExist = await User.findById(userId);
        if(!userExist){
            return res.status(404).json({message: 'Пользователь не найден'});
        }
        await User.findByIdAndDelete(userId);
        res.status(200).json({message: 'Пользователь удален'});

    }catch(error){
        res.status(500).json({message: error.message});
    }
};