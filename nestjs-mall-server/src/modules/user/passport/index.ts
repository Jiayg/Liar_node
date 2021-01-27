import { AdminJwtStrategy } from './jwt.strategy';
import { LocalStrategySignIn } from './local.strategy';

export const USER_PASSPORT_STRATEGIES = [
  AdminJwtStrategy,
  LocalStrategySignIn
];
