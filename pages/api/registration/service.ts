import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { request } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  createService,
  createServiceUserRelation,
} from '../../../data/services';
import { createSession } from '../../../data/sessions';
import { createUser, getUserByEmail } from '../../../data/users';
import {
  createSerializedRegisterSessionTokenCookie,
  createUserIdCookie,
} from '../../../utils/cookies';

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { user: any };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponseBody>,
) {
  if (req.method === 'POST') {
    // Process a POST request
    // 1. make sure the data exists
    if (
      typeof req.body.email !== 'string' ||
      typeof req.body.password !== 'string' ||
      !req.body.email ||
      !req.body.password
    ) {
      return res.status(400).json({
        errors: [{ message: 'Email and password are required' }],
      });
    }
    // 2. check if the user exists
    const userExists = await getUserByEmail(req.body.email);

    // if the user exists, return an error
    if (userExists) {
      return res.status(401).json({
        errors: [
          { message: 'User already exists or email address is already in use' },
        ],
      });
    }
    // 3. hash the password
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    // 4. sql query to insert the user
    const createdUser = await createUser(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      passwordHash,
      '',
      'service',
    );

    // sql query to insert the service
    const createdService = await createService(
      req.body.companyName,
      req.body.description,
      req.body.price,
      req.body.district,
    );

    const createdServiceUserRelationship = await createServiceUserRelation(
      createdUser.id,
      createdService.id,
    );

    console.log(createdUser);
    console.log(createdService);
    console.log(createdServiceUserRelationship);

    // 4. CREATE A SESSION

    // 4.1 create a session token
    const token = crypto.randomBytes(80).toString('base64');

    // 4.2 store the session token in the database
    const session = await createSession(createdUser.id, token);
    // 4.3 set cookie
    const serializedCookie = createSerializedRegisterSessionTokenCookie(
      session.token,
    );

    const serviceUserIdCookie = createUserIdCookie(createdUser.id.toString());

    res
      .status(200)
      .setHeader('Set-Cookie', [serializedCookie, serviceUserIdCookie])
      .json({
        user: {
          name: createdUser.email,
          id: createdUser.id,
          serviceId: createdService.id,
        },
      });
  } else {
    // Handle any other HTTP method
    res.status(401).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
