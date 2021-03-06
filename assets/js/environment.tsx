import { Environment, RecordSource, Store } from 'relay-runtime'
import multipartMiddleware from './multipart_middleware'
import 'regenerator-runtime/runtime'
import {
  RelayNetworkLayer,
  urlMiddleware,
  loggerMiddleware,
  errorMiddleware,
  perfMiddleware,
} from 'react-relay-network-modern';

const network = new RelayNetworkLayer(
  [
    // insert the middleware into the stack
    multipartMiddleware,
    urlMiddleware({
      url: req => Promise.resolve('/api/graph')
    }),
    // see webpack.config.js for the __DEV__ setting
    __DEV__ ? loggerMiddleware() : null,
    __DEV__ ? errorMiddleware() : null,
    __DEV__ ? perfMiddleware() : null
  ]
);

const source = new RecordSource();
const store = new Store(source);
const environment = new Environment({ network, store });

export default environment