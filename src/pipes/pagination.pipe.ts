import { Injectable, PipeTransform } from '@nestjs/common';
import { PAGE_LIMIT } from '../constants/pagination.constants';

@Injectable()
export class PaginationPipe implements PipeTransform<string, unknown> {
  transform(page: string): any {
    const limit = PAGE_LIMIT;
    const pageNo = page ? parseInt(page, 0) : 1;
    const offset = (pageNo - 1) * limit;
    return {
      pageNo,
      offset,
      limit,
    };
  }
}
