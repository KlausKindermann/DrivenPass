import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common"
import { UserService } from "./users.service"
import { CreateUserDto } from "./dto/user.dto"
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private userService: UserService) { }

    @Post('sign-up')
    @ApiOperation({summary: 'Creates a new user on the platform'})
    @ApiResponse({ status: HttpStatus.CREATED, description: "User has been created" })
    signUp(@Body() body: CreateUserDto) {
        return this.userService.createUser(body)
    }

    @Post("sign-in")
    @ApiOperation({summary: 'Log in the user'})
    @ApiResponse({ status: HttpStatus.CREATED, description: "User has logged in successfully " })
    signIn(@Body() body: CreateUserDto) {
        return this.userService.Login(body)
    }

}