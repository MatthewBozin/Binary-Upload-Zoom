import { RequestHandler } from 'express';
import { BadRequestError } from 'express-response-errors';
import { ObjectId } from 'mongodb';

export const validateMongoObjectId = (
  location: 'params' | 'body' | 'query',
  fieldName: string,
): RequestHandler => async (req, res, next) => {
  try {
    new ObjectId(req[location][fieldName]);
  } catch (err) {
    throw new BadRequestError('Invalid ID');
  }

  next();
};
