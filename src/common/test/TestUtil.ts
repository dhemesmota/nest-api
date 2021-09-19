import { User } from '../../user/user.entity';

export default class TestUtil {
  static giveAMeValidUser(): User {
    const user = new User();
    user.name = 'Dhemes';
    user.email = 'valid@mail.com';
    user.id = '123';
    user.password = '123456';
    return user;
  }
}
