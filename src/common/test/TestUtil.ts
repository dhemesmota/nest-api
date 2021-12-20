import { User } from '../../user/user.entity';

export default class TestUtil {
  static giveAMeValidUser(): User {
    const user = new User();
    user.name = 'Dev';
    user.email = 'dev@gmail.com';
    user.id = 9999;
    user.password = '123456';
    return user;
  }
}
