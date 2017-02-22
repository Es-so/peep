import express from 'express';
import debug from 'debug';
import http from 'http';
import path from 'path';
import favicon from 'serve-favicon';
import compression from 'compression';
import logger from 'morgan-debug';
import errors from './middlewares/errors';

const loginfo = debug('peep:http');
const getUrl = (server) => `http://${server.address().address}:${server.address().port}`;
const init = (config) => {
  const { publicPath, buildPath, server: { host, port } } = config;
  const app = express();
  const httpServer = http.createServer(app);

  const promise = new Promise((resolve) => {
    app
      .use(compression())
      .use(favicon(path.join(publicPath, '/favicon.ico')))
      .use('/public', express.static(publicPath))
      .use('/build', express.static(buildPath))
      .use('/ping', (req, res) => res.json({ ping: 'pong'}))
      .use(logger('dev', 'peep:http'))
      .use(errors)
      .use((req, res) => res.redirect('/public/index.html'));

    httpServer.listen(port, host, () => {
      //app.config = config;
      loginfo(`http server started on ${getUrl(httpServer)}`);
      resolve(httpServer);
    });
  });

  return promise;
};

export default init;
