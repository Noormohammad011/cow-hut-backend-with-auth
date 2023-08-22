import { Document, FilterQuery, Query } from 'mongoose';
import { QueryStringInterface } from '../interfaces/common';

class APIFeatures<T extends Document> {
  constructor(
    private query: Query<T[], T>,
    private queryString: QueryStringInterface
  ) {}

  filter(): APIFeatures<T> {
    const queryObj = { ...this.queryString };
    const excludedFields = [
      'page',
      'sort',
      'limit',
      'fields'
    ];
    excludedFields.forEach(el => delete queryObj[el]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort(): APIFeatures<T> {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields(): APIFeatures<T> {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate(): APIFeatures<T> {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  search(searchFields: (keyof T)[], searchText: string): APIFeatures<T> {
    if (searchText && searchFields.length > 0) {
      const searchQuery: FilterQuery<T>[] = searchFields.map(
        field =>
          ({
            [field]: {
              $regex: searchText,
              $options: 'i',
            },
          } as FilterQuery<T>[keyof T])
      );

      this.query = this.query.find({ $or: searchQuery });
    }

    return this;
  }

  async exec(): Promise<T[]> {
    return this.query.exec();
  }

  getQuery(): FilterQuery<T> {
    return this.query.getQuery();
  }
}

export default APIFeatures;

