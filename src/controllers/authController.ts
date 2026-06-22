import { Request, Response, NextFunction } from "express"
import User from "../models/User";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import envVars from "../config/environment";
import { appError } from "../utilities/appError";

const register = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email: email });

        if(existingUser)
            return next(new appError('Email already registered',409));

        const user = await User.create({
            name: name,
            email: email,
            password: password
        })

        const userCredentials = {
            id: user._id,
            name: name,
            email: email,
        }

        // generate token
        const token = jwt.sign(userCredentials, envVars.jwt.secret, { expiresIn: envVars.jwt.expire })

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            token: token,
            data: userCredentials
        });

    } catch(err: any) {
        return next(err);
    }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email }).select("+password");
        const isValidPassword: boolean = user?.password ? await bcrypt.compare(password, user.password) : false;

        // checking if user exists and if password is valid
        if(!user || !isValidPassword)
            return next(new appError('Invalid email or password', 401));
        
        const userCredentials = {
            id: user._id,
            email: user.email,
            name: user.name
        }

        // generate token
        const token = jwt.sign(userCredentials, envVars.jwt.secret, { expiresIn: envVars.jwt.expire })

        return res.status(200).json({
            success: true,
            message: 'User loggedin successfully',
            token: token,
            data: userCredentials,
        })

    } catch (err: any) {
        return next(err);
    }
}   

export { register, login }