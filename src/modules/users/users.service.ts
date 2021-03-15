import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_CLIENT')
    private readonly userClient: ClientProxy,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    return this.userClient
      .send({ resource: 'users', cmd: 'post' }, { ...createUserDto })
      .pipe(
        catchError((err) => {
          throw new BadRequestException(err);
        }),
      )
      .toPromise();
  }

  async findAll(): Promise<any[]> {
    try {
      return this.userClient
        .send({ resource: 'users', cmd: 'getAll' }, {})
        .pipe(
          catchError((err) => {
            return throwError(err);
          }),
        )
        .toPromise();
    } catch (e) {
      throw e;
    }
  }

  async findOne(query: any): Promise<any> {
    try {
      return this.userClient
        .send({ resource: 'users', cmd: 'getOne' }, { ...query })
        .pipe(
          catchError((err) => {
            if (err.message === 'Not Found') {
              throw new NotFoundException(err);
            }
            return throwError(err);
          }),
        )
        .toPromise();
    } catch (e) {
      throw e;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    return this.userClient
      .send({ resource: 'users', cmd: 'update' }, { _id: id, ...updateUserDto })
      .pipe(
        catchError((err) => {
          throw new BadRequestException(err);
        }),
      )
      .toPromise();
  }

  async delete(id: string): Promise<any> {
    return this.userClient
      .send({ resource: 'user', cmd: 'delete' }, { _id: id })
      .pipe(
        catchError((err) => {
          if (err.message === 'Not Found') {
            throw new NotFoundException();
          }
          return throwError(err);
        }),
      )
      .toPromise();
  }
}
