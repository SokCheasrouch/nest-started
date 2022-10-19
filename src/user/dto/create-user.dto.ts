import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
    @ApiProperty({
        description: 'Full name',
        example: "Joe"
      })
    userName:string;
    
    @ApiProperty({
        description: 'Has to match a regular expression: /^\\+[1-9]\\d{1,14}$/',
        example: '+123123123123'
      })
    phone:string;
}
