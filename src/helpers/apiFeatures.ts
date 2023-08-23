import { Document, FilterQuery, Query } from 'mongoose';
import { QueryStringInterface } from '../interfaces/common';

class APIFeatures<T extends Document> {
  constructor(
    private query: Query<T[], T>,
    private queryString: QueryStringInterface
  ) {}

  filter(): APIFeatures<T> {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Delete the searchText property from the queryObj object
    delete queryObj.searchText;

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    // Handle fields with multiple values
    if (Object.keys(queryObj).length > 0) {
      Object.entries(queryObj).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          queryStr = queryStr.replace(
            `"${key}":${JSON.stringify(value)}`,
            `"${key}": { "$in": ${JSON.stringify(value)} }`
          );
        } else {
          queryStr = queryStr.replace(
            `"${key}":${value}`,
            `"${key}": ${value}`
          );
        }
      });
    }

    // Use where() instead of find()
    this.query = this.query.where(JSON.parse(queryStr));

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
      const orConditions: FilterQuery<T>[] = [];

      searchFields.forEach(field => {
        const condition = {
          [field]: { $regex: searchText, $options: 'i' },
        } as FilterQuery<T>;
        orConditions.push(condition);
      });

      // Get the existing query conditions
      const existingConditions = this.query.getQuery();

      // Combine search conditions with existing filter conditions using $and
      const combinedConditions: FilterQuery<T>[] = [];

      if (existingConditions.$and) {
        combinedConditions.push(...existingConditions.$and);
      }

      combinedConditions.push({ $or: orConditions });

      // Update the query with the combined conditions
      this.query = this.query.find({ $and: combinedConditions });
    }

    return this;
  }

  async exec(): Promise<T[]> {
    return this.query.exec();
  }

  getQuery(): FilterQuery<T> {
    return this.query.getQuery();
  }
  populate(path: string): APIFeatures<T> {
    this.query = this.query.populate(path);
    return this;
  }
}

export default APIFeatures;
