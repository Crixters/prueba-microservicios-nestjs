import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from 'src/database/src/interfaces/users';
import { UsersRepository } from 'src/database/src/repositories/users';
import { ICreateUser } from './interfaces/input';
import * as bcrypt from 'bcryptjs';
import { IDeleteUserResponse } from './interfaces/output';
import { IUpdateUser } from './interfaces/input/update-user.interface';

@Injectable()
export class UsersService {

    constructor(private readonly userRepository: UsersRepository){}

    public async getUsers() : Promise<IUser[]> {
        return await this.userRepository.find();
    }

    public async getUserById(userId: string): Promise<IUser> {
        const userFound = await this.userRepository.findOne({ where: {id: userId} });
        if(!userFound) throw new NotFoundException("Couldn't find user with the id: "+userId);
        return userFound;
    }

    public async registerUser(userData: ICreateUser) : Promise<IUser> {
        const { password , ...restOfUserData } = userData;
        const hashedPassword = await this.hashPassword(password);
        const newUserInstance = this.userRepository.create({ password: hashedPassword, ...restOfUserData});
        const createdUser = await this.userRepository.save(newUserInstance);
        delete createdUser.password;
        return createdUser;
    }

    public async findUserByEmail(userEmail: string): Promise<IUser> {
        const userFound = await this.userRepository.findOne({ where: {email: userEmail} });
        if(!userFound) throw new NotFoundException("Couldn't find user with the email: "+userEmail);
        return userFound;
    }

    public async updateUser(userId: string, updateUserData: IUpdateUser) : Promise<IUser> {
        const {password, ...restOfUpdateUserData} = updateUserData;
        let hashedPassword = (updateUserData.password) ? await this.hashPassword(updateUserData.password) : undefined;
        const userFound = await this.userRepository.findOne({ where: {id: userId} });
        if(!userFound) throw new NotFoundException("Couldn't find user with the id: "+userId);
        const userInstance = this.userRepository.create({id: userId, password: hashedPassword, ...restOfUpdateUserData })
        return await this.userRepository.save(userInstance);
    }

    public async deleteUser(userId:string): Promise<IDeleteUserResponse> {
        const userFound = await this.userRepository.findOne({ where: {id: userId} });
        if(!userFound) throw new NotFoundException("Couldn't find user with the id: "+userId);
        await this.userRepository.softDelete(userId);
        return { wasDeleted:true };
    }

    private async hashPassword(password: string) : Promise<string> {
        const numberOfRounds = 10;
        const hashedPassword = await bcrypt.hash(password, numberOfRounds);
        return hashedPassword;
    }

}
