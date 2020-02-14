import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ResolveProperty, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserDto } from './dto/UserDto';

@Resolver(of => UserDto)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(returns => UserDto)
    async getUser(@Args('id') id: string) {
        return (await this.userService.findOne({ id })).toDto();
    }
}
