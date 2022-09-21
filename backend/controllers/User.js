import User from '../models/User';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        console.log(error);
    }
    if (!users) {
        return res.status(400).json({
            message: "Users not found",
        })
    }
    return res.status(200).json({ users })
}

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    let existUser;
    try {
        existUser = await User.findOne({ email })
    } catch (error) {
        return console.log(error);
    }
    if (existUser) {
        return res.status(400).json({ message: "Mail daha önce kayıt edilmiş" })
    }

    const hashedPassword = bcrypt.hashSync(password)

    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: []
    });



    try {
        await user.save();
    } catch (error) {
        return console.log(error);
    }
    return res.status(201).json({ user })
}


export const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existUser;
    try {
        existUser = await User.findOne({ email })
    } catch (error) {
        return console.log(error);
    }
    if (!existUser) {
        return res.status(404).json({ message: "Kullanıcı kayıtlı değil. Lütfen kayıt olunuz!" })
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: "Geçersiz parola!"
        })
    }
    return res.status(200).json({
        message: "Giriş işlemi başarılı"
    })
}