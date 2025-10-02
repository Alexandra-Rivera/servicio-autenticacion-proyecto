import {UserDto} from 'colibrihub-shared-dtos';

export interface RegisterUserDto extends UserDto {
  password: string;
}
