import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<number[]>('roles', context.getHandler());
    if (!roles || roles.length == 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;
    const authorization = headers.authorization;
    if (authorization !== undefined) {
      const bearerToken: string[] = authorization.split(' ');
      const token: string = bearerToken[1];
      return await this.jwtService
        .verifyAsync(token)
        .then(async value => {
          // console.log(value);
          if (roles.indexOf(value.role) !== -1) {
            return true;
          } else return false;
        })
        .catch(err => false);
    } else return false;
  }
}
