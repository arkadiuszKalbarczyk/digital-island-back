import { Injectable, Logger } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { RoleType } from '../../common/constants/role-type';
import { UserRegisterDto } from '../auth/dto/UserRegisterDto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { from } from 'rxjs';
import { tap, concatMap } from 'rxjs/operators';
import { ChangeRoleDto } from './dto/ChangeRoleDto';
import { EditUserDto } from './dto/EditUserDto';
import { UserDto } from './dto/UserDto';

@Injectable()
export class UserService {
    private readonly _logger = new Logger(UserService.name);

    constructor(
        public readonly userRepository: UserRepository,
    ) {}

    /**
     * Find single user
     * @param {FindConditions<UserEntity>} findData
     */
    findOne(findData: FindConditions<UserEntity>): Promise<UserEntity> {
        return this.userRepository.findOne(findData);
    }

    /**
     * Find single user by Username or Email or Phone
     * @param {Partial<{ username: string; email: string; phone: string }>} options
     */
    async findByParam(
        options: Partial<{
            username: string;
            email: string;
            phone: string;
            id: string;
        }>,
        multiple = false,
    ): Promise<UserEntity[] | UserEntity | undefined> {
        const queryBuilder = this.userRepository.createQueryBuilder('user');

        if (options.email) {
            queryBuilder.orWhere('user.email = :email', {
                email: options.email,
            });
        }
        if (options.username) {
            queryBuilder.orWhere('user.username = :username', {
                username: options.username,
            });
        }
        if (options.phone) {
            queryBuilder.orWhere('user.phone = :phone', {
                phone: options.phone,
            });
        }
        if (options.id) {
            queryBuilder.orWhere('user.id = :id', {
                id: options.id,
            });
        }
        queryBuilder.andWhere('active = :active', { active: true });

        return multiple ? queryBuilder.getMany() : queryBuilder.getOne();
    }

    /**
     * Create new user
     * First user role is always 'ADMIN'
     * @param {UserRegisterDto} userRegisterDto
     */
    async createUser(userRegisterDto: UserRegisterDto): Promise<UserEntity> {
        const usersCounterPromise = from(this.userRepository.count()).pipe(
            tap(userCounter => {
                if (userCounter === 0) {
                    userRegisterDto.role = RoleType.ADMIN;
                }
            }),
            concatMap(_ => {
                const user = this.userRepository.create(
                    userRegisterDto as UserEntity,
                );
                return from(this.userRepository.save(user));
            }),
        );

        return usersCounterPromise.toPromise();
    }

    /**
     * Get all active users
     */
    async getUsers(): Promise<UserDto[]> {
        const users = await this.userRepository
            .createQueryBuilder('user')
            .where('active = :active', { active: true })
            .getMany();

        return users.toDtos();
    }

    /**
     * Change user role
     * @param {ChangeRoleDto} changeRoleDto
     */
    async changeUserRole(changeRoleDto: ChangeRoleDto): Promise<UserDto> {
        const user = await this.findByParam(changeRoleDto) as UserEntity;

        this.userRepository.update(user.id, { role: changeRoleDto.role });

        return ((
            await this.findByParam({ id: changeRoleDto.id })
        ) as UserEntity).toDto();
    }

    /**
     * Deactivates account of user
     * @param {string} userId user ID
     */
    async deactivateAccount(userId) {
        this._logger.log(userId);
        const userEntity = await this.userRepository
            .createQueryBuilder('user')
            .where('id = :userId', { userId })
            .andWhere('active = :active', { active: true })
            .getOne();
        if (!userEntity) {
            return false;
        }
        const updateResult = await this.userRepository.update(userId, {
            active: false,
        });
        return updateResult.affected === 1 ? true : false;
    }

    /**
     * Change user data by editUserDto.id
     * @param {EditUserDto} editUserDto
     */
    async editUser(editUserDto: EditUserDto): Promise<UserDto> {
        const queryBuilder = this.userRepository.createQueryBuilder('user');

        await this.userRepository.update(editUserDto.id, editUserDto);

        queryBuilder.orWhere('user.id = :id', editUserDto);

        const userById = await queryBuilder.getOne();

        return userById.toDto();
    }

    /**
     * Change password for user with id
     * @param {string} id
     * @param {string} password
     */
    changePassword(id: string, password: string) {
        return this.userRepository.update(id, { password });
    }

}
