// @flow strict-local
// import type {FilePath} from '@parcel/types';
// import type {FileSystem} from '@parcel/fs';
import type {IncomingMessage, ServerResponse} from 'http';
// import type {LogLevel} from '@parcel/types';

import nullthrows from 'nullthrows';
import path from 'path';
import http from 'http';
// import WebSocket from 'ws';
import {Reporter} from '@parcel/plugin';
import {createHTTPServer} from '@parcel/utils';
// $FlowFixMe[untyped-import]
// import connect from 'connect';
// $FlowFixMe[untyped-import]
import {createProxyMiddleware} from 'http-proxy-middleware';
import SourceMap from '@parcel/source-map';
import formatCodeFrame from '@parcel/codeframe';
import {inspect} from 'util';

// $FlowFixMe[untyped-import]
import {createDevServerMiddleware} from '@react-native-community/cli-server-api';

// // $FlowFixMe[untyped-import]
// const {InspectorProxy} = require('metro-inspector-proxy');
// const {
//   default: clientLogsMiddleware,
//   // $FlowFixMe[untyped-import]
// } = require('@expo/dev-server/build/middleware/clientLogsMiddleware');
// const {
//   default: createJsInspectorMiddleware,
//   // $FlowFixMe[untyped-import]
// } = require('@expo/dev-server/build/middleware/createJsInspectorMiddleware');

// function generateManifest(host: string, appJson: {[string]: mixed}) {
//   // $FlowFixMe
//   appJson.expo.splash.imageUrl =
//     // $FlowFixMe
//     `http://${host}:19000/` + appJson.expo.splash.image;
//   // $FlowFixMe
//   appJson.expo.android.adaptiveIcon.foregroundImageUrl =
//     `http://${host}:19000/` +
//     // $FlowFixMe
//     appJson.expo.android.adaptiveIcon.foregroundImage;

//   return {
//     ...appJson.expo,

//     _internal: {
//       isDebug: false,
//       projectRoot: '/Users/niklas/Desktop/parcel/packages/examples/expo',
//       dynamicConfigPath: null,
//       staticConfigPath:
//         '/Users/niklas/Desktop/parcel/packages/examples/expo/app.json',
//       packageJsonPath:
//         '/Users/niklas/Desktop/parcel/packages/examples/expo/package.json',
//     },
//     sdkVersion: '42.0.0',
//     platforms: ['ios', 'android', 'web'],
//     developer: {
//       tool: 'expo-cli',
//       projectRoot: '/Users/niklas/Desktop/parcel/packages/examples/expo',
//     },
//     packagerOpts: {
//       scheme: null,
//       hostType: 'lan',
//       lanType: 'ip',
//       devClient: false,
//       dev: true,
//       minify: false,
//       urlRandomness: null,
//       https: false,
//     },
//     mainModuleName: 'entry.js',
//     __flipperHack: 'React Native packager is running',
//     debuggerHost: `${host}:19000`,
//     logUrl: `http://${host}:19000/logs`,
//     hostUri: `${host}:19000`,

//     bundleUrl: `http://${host}:19000/entry.js`,
//     iconUrl: `http://${host}:19000/./assets/icon.png`,

//     id: '@anonymous/test-3c6237d9-8b66-4218-928d-09072aafe138',
//   };
// }

// async function handleRequest(
//   req: IncomingMessage,
//   res: ServerResponse,
//   inputFS: FileSystem,
//   projectRoot: FilePath,
// ) {
//   console.log(req.url);
//   if (req.url === '/') {
//     const appJson = JSON.parse(
//       await inputFS.readFile(path.join(projectRoot, 'app.json'), 'utf8'),
//     );

//     let manifest = generateManifest(appJson);
//     const apiVersion = req.headers['expo-api-version'];

//     if (apiVersion === '1') {
//       res.end(
//         JSON.stringify({
//           manifestString: JSON.stringify(manifest),
//           signature: 'UNSIGNED',
//         }),
//       );
//     } else if (apiVersion == null) {
//       res.end(JSON.stringify(manifest));
//     } else {
//       console.error('Unknown API version', apiVersion);
//     }
//   } else if (req.url === '/bundle.js') {
//     req.end('');
//   }

//   // GET "/" -> manifest
//   // GET "/bundle" ->

//   // HTTP/1.1 200 OK
//   // X-Content-Type-Options: nosniff
//   // Surrogate-Control: no-store
//   // Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate
//   // Pragma: no-cache
//   // Expires: 0
//   // Content-Type: multipart/mixed; boundary="3beqjf3apnqeu3h5jqorms4i"
//   // Date: Sun, 15 Aug 2021 20:32:45 GMT
//   // Connection: keep-alive
//   // Keep-Alive: timeout=5
//   // Transfer-Encoding: chunked
//   //
//   // --3beqjf3apnqeu3h5jqorms4i
//   // Content-Type: application/json
//   //
//   // {"done":588,"total":589}
//   // 58
//   //
//   // --3beqjf3apnqeu3h5jqorms4i
//   // Content-Type: application/json
//   //
//   // {"done":589,"total":589}
//   // 41ad9e
//   //
//   // --3beqjf3apnqeu3h5jqorms4i
//   // X-Metro-Files-Changed-Count: 594
//   // X-Metro-Delta-ID: 1e9ef3ac5f4040fd
//   // Content-Type: application/javascript
//   // Last-Modified: Sun, 15 Aug 2021 20:32:46 GMT
//   // Content-Length: 4304043

//   // GET "/status" -> "packager-status: running"
//   // GET "/inspector" -> ws
//   // GET "/message" -> ws
//   // GET "/hot" -> ws
//   // POST "/logs" with
//   // [
//   //   {
//   //     "count": 0,
//   //     "level": "info",
//   //     "body": [
//   //       "Running \"main\" with {\"initialProps\":{\"exp\":{\"initialUri\":\"exp://192.168.1.180:19000\",\"shell\":false,\"manifestString\":\"{\\\"name\\\":\\\"test\\\",\\\"slug\\\":\\\"test\\\",\\\"version\\\":\\\"1.0.0\\\",\\\"orientation\\\":\\\"portrait\\\",\\\"icon\\\":\\\".\\\\/assets\\\\/icon.png\\\",\\\"splash\\\":{\\\"image\\\":\\\".\\\\/assets\\\\/splash.png\\\",\\\"resizeMode\\\":\\\"contain\\\",\\\"backgroundColor\\\":\\\"#ffffff\\\",\\\"imageUrl\\\":\\\"http:\\\\/\\\\/192.168.1.180:19000\\\\/assets\\\\/.\\\\/assets\\\\/splash.png\\\"},\\\"updates\\\":{\\\"fallbackToCacheTimeout\\\":0},\\\"assetBundlePatterns\\\":[\\\"**\\\\/*\\\"],\\\"ios\\\":{\\\"supportsTablet\\\":true},\\\"android\\\":{\\\"adaptiveIcon\\\":{\\\"foregroundImage\\\":\\\".\\\\/assets\\\\/adaptive-icon.png\\\",\\\"backgroundColor\\\":\\\"#FFFFFF\\\",\\\"foregroundImageUrl\\\":\\\"http:\\\\/\\\\/192.168.1.180:19000\\\\/assets\\\\/.\\\\/assets\\\\/adaptive-icon.png\\\"}},\\\"web\\\":{\\\"favicon\\\":\\\".\\\\/assets\\\\/favicon.png\\\"},\\\"_internal\\\":{\\\"isDebug\\\":false,\\\"projectRoot\\\":\\\"\\\\/Users\\\\/niklas\\\\/Desktop\\\\/test\\\",\\\"dynamicConfigPath\\\":null,\\\"staticConfigPath\\\":\\\"\\\\/Users\\\\/niklas\\\\/Desktop\\\\/test\\\\/app.json\\\",\\\"packageJsonPath\\\":\\\"\\\\/Users\\\\/niklas\\\\/Desktop\\\\/test\\\\/package.json\\\"},\\\"sdkVersion\\\":\\\"42.0.0\\\",\\\"platforms\\\":[\\\"ios\\\",\\\"android\\\",\\\"web\\\"],\\\"developer\\\":{\\\"tool\\\":\\\"expo-cli\\\",\\\"projectRoot\\\":\\\"\\\\/Users\\\\/niklas\\\\/Desktop\\\\/test\\\"},\\\"packagerOpts\\\":{\\\"scheme\\\":null,\\\"hostType\\\":\\\"lan\\\",\\\"lanType\\\":\\\"ip\\\",\\\"devClient\\\":false,\\\"dev\\\":true,\\\"minify\\\":false,\\\"urlRandomness\\\":null,\\\"https\\\":false},\\\"mainModuleName\\\":\\\"node_modules\\\\/expo\\\\/AppEntry\\\",\\\"__flipperHack\\\":\\\"React Native packager is running\\\",\\\"debuggerHost\\\":\\\"192.168.1.180:19000\\\",\\\"logUrl\\\":\\\"http:\\\\/\\\\/192.168.1.180:19000\\\\/logs\\\",\\\"hostUri\\\":\\\"192.168.1.180:19000\\\",\\\"bundleUrl\\\":\\\"http:\\\\/\\\\/192.168.1.180:19000\\\\/node_modules\\\\/expo\\\\/AppEntry.bundle?platform=android&dev=true&hot=false&minify=false\\\",\\\"iconUrl\\\":\\\"http:\\\\/\\\\/192.168.1.180:19000\\\\/assets\\\\/.\\\\/assets\\\\/icon.png\\\",\\\"id\\\":\\\"@nmischkulnig\\\\/test\\\",\\\"isVerified\\\":true,\\\"primaryColor\\\":\\\"#023C69\\\"}\"}},\"rootTag\":1}"
//   //     ],
//   //     "includesStack": false,
//   //     "groupDepth": 0
//   //   }
//   // ]
// }

let server;
// let wss;

function initialPageMiddleware(initialPageManifest) {
  return (req, res, next) => {
    if (req.url === '/') {
      // console.log(req.headers);
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(initialPageManifest));
      res.end(null);
    } else {
      next();
    }
  };
}

function getInitialPageManifest({
  platform,
  ip,
  port,
  minify,
  appJson,
  pkg,
  projectRoot,
}) {
  const host = `${ip}:${port}`;

  const initialPageManifest = {
    ...appJson.expo,
    _internal: {
      isDebug: false,
      projectRoot,
      dynamicConfigPath: null,
      staticConfigPath: projectRoot + '/app.json',
      packageJsonPath: projectRoot + '/package.json',
    },
    description: undefined,
    sdkVersion: '43.0.0', // semver.major(semver.minVersion("^1.2.3"))
    platforms: [platform],
    developer: {
      tool: 'parcel',
      projectRoot,
    },
    packagerOpts: {
      scheme: null,
      hostType: 'lan',
      lanType: 'ip',
      devClient: false,
      dev: !minify,
      minify,
      urlRandomness: null,
      https: false,
    },
    mainModuleName: pkg.main,
    __flipperHack: 'React Native packager is running',
    debuggerHost: `${ip}:19000`,
    logUrl: `http://${ip}:19000/logs`,
    hostUri: `${ip}:19000`,
    bundleUrl: `http://${ip}:19001/entry.js`,
    // bundleUrl: `http://${host}/entry.js`,
    // bundleUrl: `http://${host}/index.${platform}.js?platform=${platform}&dev=${!minify}&hot=false&minify=${minify}`,
    iconUrl: `http://${host}/assets/icon.png`,
    id: 'xyz',
  };

  // splash.imageURL: "http://10.6.10.149:19000/assets/./assets/splash.png"
  // android.adaptiveIcon.foregroundImageUrl: "http://10.6.10.149:19000/assets/./assets/adaptive-icon.png"

  return {
    manifestString: JSON.stringify(initialPageManifest),
    signature: 'UNSIGNED',
  };
}

const INTERNAL_CALLSITES_REGEX = new RegExp(
  [
    '/Libraries/Renderer/implementations/.+\\.js$',
    '/Libraries/BatchedBridge/MessageQueue\\.js$',
    '/Libraries/YellowBox/.+\\.js$',
    '/Libraries/LogBox/.+\\.js$',
    '/Libraries/Core/Timers/.+\\.js$',
    '/node_modules/react-devtools-core/.+\\.js$',
    '/node_modules/react-refresh/.+\\.js$',
    '/node_modules/scheduler/.+\\.js$',
  ].join('|'),
);

export default (new Reporter({
  async report({event, options, logger}) {
    switch (event.type) {
      case 'watchStart': {
        let serveOptions = options.serveOptions;
        if (serveOptions === false) {
          return;
        }

        const projectRoot = options.projectRoot;

        const {middleware, attachToServer} = createDevServerMiddleware({
          host: '127.0.0.1',
          port: 19000,
          watchFolders: [projectRoot],
        });
        const appJson = JSON.parse(
          await options.inputFS.readFile(
            path.join(projectRoot, 'app.json'),
            'utf8',
          ),
        );
        middleware.use(
          initialPageMiddleware(
            getInitialPageManifest({
              platform: 'android',
              ip: nullthrows(serveOptions.host),
              port: 19000,
              minify: false,
              appJson,
              pkg: {main: 'entry.js'},
              projectRoot,
            }),
          ),
        );
        middleware.use(
          async (req: IncomingMessage, res: ServerResponse, next) => {
            if (req.url === '/logs') {
              const buffers = [];
              for await (const chunk of req) {
                buffers.push(Buffer.from(chunk));
              }

              const logs = JSON.parse(Buffer.concat(buffers).toString());
              const deviceName = req.headers['device-name'];
              const expoPlatform = req.headers['expo-platform'];

              for (const log of logs) {
                let body = Array.isArray(log.body) ? log.body : [log.body];

                if (
                  body.length === 1 &&
                  (/^Running application "main" with appParams:/.test(
                    body[0],
                  ) ||
                    /^Running "main" with \{/.test(body[0]))
                ) {
                  body = [
                    `${expoPlatform ?? ''}Running app on ${deviceName ?? ''}`,
                  ];
                }
                // let {level} = log;

                logger.info({
                  message: `${deviceName}: ${body
                    .map(b => inspect(b))
                    .join(' ')}`,
                });
              }

              res.statusCode = 200;
              return res.end();
            } else {
              logger.verbose({
                message: `Request unhandled: ${req.headers.host}${req.url}`,
              });
              next();
            }
          },
        );
        const server = http
          .createServer((req: IncomingMessage, res: ServerResponse, next) => {
            logger.verbose({
              message: `Request: ${req.headers.host}${req.url}`,
            });
            middleware(req, res, next);
          })
          .listen(19000);
        /* const {messageSocket, eventsSocket} =  */ attachToServer(server);

        // var app = connect();

        // let {middleware, attachToServer} = createDevServerMiddleware({
        //   host: serveOptions.host,
        //   port: 19000,
        //   // serveStatic
        //   watchFolders: [options.projectRoot],
        // });
        // app.use(middleware);
        // // app.use('/logs', clientLogsMiddleware(console.log));
        // // app.use('/inspector', createJsInspectorMiddleware());
        // // app.use('/', (req, res, next) => {
        // //   console.log(req.url);
        // //   next();
        // // });
        // app.use('/', (req, res) => {
        //   // $FlowFixMe(incompatible-call)
        //   handleRequest(req, res, options.inputFS, options.projectRoot);
        // });

        // const inspectorProxy = new InspectorProxy(options.projectRoot);

        let devServerProxyMiddleware = createProxyMiddleware({
          target: `http://${nullthrows(serveOptions.host)}:${
            serveOptions.port
          }`,
          changeOrigin: true,
          logLevel: 'warn',
        });
        let devServerProxy = await createHTTPServer({
          cacheDir: options.cacheDir,
          https: serveOptions.https,
          inputFS: options.inputFS,
          // $FlowFixMe
          listener: async (req: IncomingMessage, res: ServerResponse) => {
            if (req.url === '/symbolicate') {
              logger.verbose({
                message: `Request: ${req.headers.host}${req.url}`,
              });

              try {
                const buffers = [];
                for await (const chunk of req) {
                  buffers.push(Buffer.from(chunk));
                }

                const data: {|
                  stack: Array<{|
                    file: string,
                    lineNumber: ?number,
                    column: ?number,
                    methodName: string,
                  |}>,
                |} = JSON.parse(Buffer.concat(buffers).toString());

                let mapData = JSON.parse(
                  await options.outputFS.readFile(
                    './dist/entry.js.map',
                    'utf8',
                  ),
                );

                let map = new SourceMap(projectRoot);
                map.addVLQMap(mapData);

                let translatedStack = data.stack.map(
                  ({column, lineNumber, methodName}) => {
                    let result =
                      lineNumber != null && column != null
                        ? map.findClosestMapping(lineNumber, column)
                        : null;

                    return {
                      methodName,
                      column: result
                        ? nullthrows(result.original).column
                        : null,
                      lineNumber: result
                        ? nullthrows(result.original).line
                        : null,
                      file:
                        result?.source != null
                          ? path.resolve(projectRoot, result.source)
                          : '',
                      collapse:
                        result?.source != null &&
                        INTERNAL_CALLSITES_REGEX.test(result.source),
                    };
                  },
                );
                let codeFrame = translatedStack.find(f => !f.collapse);

                res.statusCode = 200;
                res.end(
                  JSON.stringify({
                    codeFrame:
                      codeFrame != null &&
                      codeFrame.lineNumber != null &&
                      codeFrame.column != null
                        ? {
                            content: formatCodeFrame(
                              map.getSourceContent(codeFrame.file) ??
                                (await options.inputFS.readFile(
                                  codeFrame.file,
                                  'utf8',
                                )),
                              [
                                {
                                  start: {
                                    // $FlowFixMe
                                    line: codeFrame.lineNumber,
                                    // $FlowFixMe
                                    column: codeFrame.column,
                                  },
                                  end: {
                                    // $FlowFixMe
                                    line: codeFrame.lineNumber,
                                    // $FlowFixMe
                                    column: codeFrame.column,
                                  },
                                },
                              ],
                            ),
                            fileName: codeFrame.file,
                            location: {
                              column: codeFrame.column,
                              row: codeFrame.lineNumber,
                            },
                          }
                        : null,
                    stack: translatedStack,
                  }),
                );
              } catch (e) {
                console.log(e);
                res.statusCode = 500;
                res.end();
              }
            } else {
              devServerProxyMiddleware(req, res);
            }
          },
          outputFS: options.outputFS,
          host: serveOptions.host,
        });

        await new Promise(res =>
          devServerProxy.server.listen(19001, serveOptions.host, res),
        );

        // attachToServer(server.server);
        // inspectorProxy.addWebSocketListener(server.server);
        // app.use((req, res, next) =>
        //   inspectorProxy.processRequest(req, res, next),
        // );
        // server.server.once('error', (err: Error) => {
        //   logger.error({
        //     message: (err.message: string),
        //   });
        // });

        logger.info({
          message: 'expo server running at port 19000',
        });

        // middleware.use('/logs', clientLogsMiddleware(options.logger));
        // middleware.use('/inspector', createJsInspectorMiddleware());

        // wss = new WebSocket.Server({server: server.server});
        // wss.on('connection', function connection(ws) {
        //   ws.on('message', function incoming(message) {
        //     console.log('received: %s', message);
        //   });

        //   ws.send('something');
        // });

        break;
      }

      case 'watchEnd':
        if (server != null) {
          await server.stop();
        }
        break;
    }
  },
}): Reporter);
