import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  code: number;
  isError: boolean;
  status: string;
  message: string;
  data: T;
  pageInfo?: PageInfo;
}

export interface PageInfo {
  pageCount: number;
  currentPage: number;
  nextPage?: number;
  itemCount: number;
}

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const response = {
          code: 200,
          isError: !data,
          status: 'OK',
          message: 'success',
          data,
          pageInfo: undefined,
        };

        if (data.rows) {
          response.data = data.rows;
          const totalCount = data.count;
          const itemCount = data.rows.length;
          const currentPage = data.currentPage;
          const pageCount = Math.ceil(data.count / data.limit);
          const nextPage = currentPage < pageCount ? currentPage + 1 : null;
          response.pageInfo = {
            totalCount,
            pageCount,
            currentPage,
            nextPage,
            itemCount,
          };
        }

        return response;
      }),
    );
  }
}
