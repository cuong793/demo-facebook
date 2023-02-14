import { Model, Document } from 'mongoose';

export class BaseRepository<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async create(doc): Promise<any> {
    const createEntity = new this.model(doc);
    return await createEntity.save();
  }

  async getByCondition(filter, field?: any | null): Promise<T[]> {
    return this.model.find(filter, field);
  }
}
