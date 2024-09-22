import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await hash(createUserDto.password, 10);
      createUserDto.password = hashedPassword;
      const user = this.usersRepository.create(createUserDto);
      user.createdAt = new Date();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...newUser } = await this.usersRepository.save(user);

      return newUser;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }
}
