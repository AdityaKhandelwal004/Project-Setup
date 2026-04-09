import { Container } from 'typedi';

export default ({ DbTransactions } : { DbTransactions: unknown}) => {
  Container.set('DbTransactions', DbTransactions);
};
