// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/polish.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var cookies = {};

function getRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function setupCookies() {
  var cookieData = document.cookie.split(';');
  cookieData.forEach(function (data, index, array) {
    var mutData = data.trim();
    var mutSections = data.split('=');
    cookies[mutSections[0].trim()] = decodeURI(mutSections[1].trim());
  });
}

function getCookie(key) {
  return cookies[key];
}

function setCookie(key, value) {
  cookies[key] = value;
  document.cookie = key + "=" + value + ";";
}

function setupStoredInputs() {
  setupStoredInput('name');
  setupStoredInput('author');
  setupStoredInput('url');
  setupStoredInput('version');
  setupStoredInput('license');
  setupStoredInput('description');
  setupStoredInput('frontendType');
  setupStoredInput('backendType');
}

function setupStoredInput(id) {
  var element = document.getElementById(id);
  element.value = getCookie(id);

  element.onchange = function () {
    setCookie(id, element.value);
  };
}

function setupSubtextAnimation() {
  var subtext = document.getElementById('subtext');
  var possibleSayings = ['Website', 'Safe Whatsapp', 'Twitter Clone', 'Netflix Alternative', 'Million Dollar Evaluation', 'Future', 'Reddit Competitor'];
  setInterval(function () {
    subtext.innerHTML = "Build a " + getRandom(possibleSayings) + " in Minutes.";
  }, 2500);
  subtext.innerHTML = "Build a " + getRandom(possibleSayings) + " in Minutes.";
}

function createModelUI() {
  document.getElementById('modelLabel').style.display = "block";
  var modelContainer = document.getElementById('models');
  var modelObject = document.createElement("div");
  var modelName = document.createElement("input");
  var deleteButton = document.createElement("button");
  var textInput = document.createElement("textarea");
  modelName.value = "New Model";
  modelName.className = "name";
  textInput.value = JSON.stringify({
    "model": {
      "year": "date",
      "owner": "string",
      "type": "string"
    }
  }, null, 4);
  textInput.className = "schema";
  deleteButton.innerHTML = "x";
  deleteButton.className = "delete";

  deleteButton.onclick = function () {
    modelContainer.removeChild(modelObject);
  };

  modelObject.append(deleteButton);
  modelObject.append(modelName);
  modelObject.append(textInput);
  modelContainer.append(modelObject);
}

var _default = {
  setupCookies: setupCookies,
  setupSubtextAnimation: setupSubtextAnimation,
  setupStoredInput: setupStoredInput,
  setupStoredInputs: setupStoredInputs,
  setCookie: setCookie,
  getCookie: getCookie,
  getRandom: getRandom,
  createModelUI: createModelUI
};
exports.default = _default;
},{}],"src/core.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

function generateDocker() {
  return "\nFROM node:12\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nENV PORT=8080\nEXPOSE 8080\nCMD [ \"npm\", \"start\" ]\n";
}

function makeHttpRequest(method, url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };

    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };

    xhr.send();
  });
}

function getLicense(websiteData) {
  return __awaiter(this, void 0, void 0, function () {
    var request, requestData, licenseText;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          if (websiteData.license.toUpperCase() == "UNLICENSED") {
            return [2, "UNLICENSED; COPYRIGHT " + websiteData.author.toUpperCase() + " ALL RIGHTS RESERVED;"];
          }

          return [4, makeHttpRequest('GET', "https://api.github.com/licenses/" + websiteData.license)];

        case 1:
          request = _a.sent();
          requestData = JSON.parse(request);
          licenseText = requestData.body;
          licenseText = licenseText.replace("[year]", new Date().getFullYear());
          licenseText = licenseText.replace("[fullname]", websiteData.author);
          return [2, licenseText];
      }
    });
  });
}

function generatePackage(websiteData) {
  return JSON.stringify({
    name: websiteData.name,
    version: websiteData.version,
    description: websiteData.description,
    author: websiteData.author,
    keywords: [],
    homepage: "https://" + websiteData.domain + "/",
    bugs: {
      url: "https://" + websiteData.domain + "/bugs",
      email: "bugs@" + websiteData.domain
    },
    scripts: {
      start: "node src/main.js",
      test: "echo \"No Test Script Exists;"
    },
    license: websiteData.license,
    dependencies: {
      "express": "^4.17.1",
      "sequelize": "^6.3.5",
      "bcrypt": "^5.0.0",
      "jsonwebtoken": "^8.5.1",
      "react": "17.0.1",
      "react-dom": "17.0.1"
    }
  }, null, 4);
}

function generateReadme(websiteData) {
  return "# " + websiteData.name + "\n### by " + websiteData.author + "\n\n## License: " + websiteData.license;
}

var _default = {
  generateDocker: generateDocker,
  generatePackage: generatePackage,
  generateReadme: generateReadme,
  getLicense: getLicense
};
exports.default = _default;
},{}],"src/backend/falcor.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function compileOpenApi(websiteData) {
  return JSON.stringify({}, null, 4);
}

function compileBackend(websiteData, zip) {
  for (var i = 0; i < websiteData.backend.models.length; i++) {
    var model = websiteData.backend.models[i];
    var modelData = compileModel(model, websiteData, zip);
  }
}

function compileModel(model, websiteData, zip) {
  console.log(model);

  for (var i = 0; i < model.paths.length; i++) {
    var endpoint = model.paths[i];
    var endpointData = compileEndpoint(endpoint, model, websiteData, zip);
  }
}

function compileEndpoint(endpoint, model, websiteData, zip) {
  console.log(endpoint);
}

var _default = {
  compileOpenApi: compileOpenApi,
  compileBackend: compileBackend,
  compileModel: compileModel,
  compileEndpoint: compileEndpoint
};
exports.default = _default;
},{}],"src/backend/graphql.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function compileOpenApi(websiteData) {
  return JSON.stringify({}, null, 4);
}

function compileBackend(websiteData, zip) {
  for (var i = 0; i < websiteData.backend.models.length; i++) {
    var model = websiteData.backend.models[i];
    var modelData = compileModel(model, websiteData, zip);
  }
}

function compileModel(model, websiteData, zip) {
  console.log(model);

  for (var i = 0; i < model.paths.length; i++) {
    var endpoint = model.paths[i];
    var endpointData = compileEndpoint(endpoint, model, websiteData, zip);
  }
}

function compileEndpoint(endpoint, model, websiteData, zip) {
  console.log(endpoint);
}

var _default = {
  compileOpenApi: compileOpenApi,
  compileBackend: compileBackend,
  compileModel: compileModel,
  compileEndpoint: compileEndpoint
};
exports.default = _default;
},{}],"src/backend/templates/rest/create.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function compileEndpointFile(endpoint, model, websiteData) {
  return "";
}

function compileEndpointMeta(endpoint, model, websiteData) {
  var fileName = window['functions'].refactorPathString(endpoint.path);
  return {
    path: endpoint.path,
    protocol: endpoint.protocol,
    type: endpoint.type,
    description: "Use this endpoint to create the " + model.name + " data. The created " + model.name + " will use the values that you specify in the body.",
    fileLocation: fileName + ".js",
    responses: {},
    parameters: []
  };
}

var _default = {
  compileEndpointFile: compileEndpointFile,
  compileEndpointMeta: compileEndpointMeta
};
exports.default = _default;
},{}],"src/backend/templates/rest/delete.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function compileEndpointFile(endpoint, model, websiteData) {
  var fileName = window['functions'].refactorPathString(endpoint.path);
  return "// " + fileName + ".js\n\nif (req.params.id == undefined) return res.status(400).send('No ID Provided.');  \n\n\n\n    ";
}

function compileEndpointMeta(endpoint, model, websiteData) {
  var fileName = window['functions'].refactorPathString(endpoint.path);
  return {
    path: endpoint.path,
    protocol: endpoint.protocol,
    type: endpoint.type,
    description: "Use this endpoint to delete the " + model.name + " data specified with the 'id' parameter.",
    fileLocation: fileName + ".js",
    responses: {},
    parameters: []
  };
}

var _default = {
  compileEndpointFile: compileEndpointFile,
  compileEndpointMeta: compileEndpointMeta
};
exports.default = _default;
},{}],"src/backend/templates/rest/get.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function compileEndpointFile(endpoint, model, websiteData) {
  var fileName = window['functions'].refactorPathString(endpoint.path);
  return "\n// " + fileName + ".js\n\nif (req.params.id == undefined) return res.status(400).send('No ID Provided.');  \n\n" + model.name + ".findOne({\n    where: {\n        id: \n    }\n}).then(function (data) {\n\n    if (data == null) return res.status(404).send(\"" + model.name + " Not Found.\");\n\n    return res.status(200).json(data);\n\n}).catch(function (error) {\n\n    console.log(error);\n    return res.status(500).send(\"Internal Server Error.\");\n\n});\n\n    ";
}

function compileEndpointMeta(endpoint, model, websiteData) {
  var fileName = window['functions'].refactorPathString(endpoint.path);
  return {
    path: endpoint.path,
    protocol: endpoint.protocol,
    type: endpoint.type,
    description: "Use this endpoint to get the " + model.name + " data specified with the 'id' parameter.",
    fileLocation: fileName + ".js",
    responses: {},
    parameters: []
  };
}

var _default = {
  compileEndpointFile: compileEndpointFile,
  compileEndpointMeta: compileEndpointMeta
};
exports.default = _default;
},{}],"src/backend/templates/rest/list.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function compileEndpointFile(endpoint, model, websiteData) {
  return "";
}

function compileEndpointMeta(endpoint, model, websiteData) {
  var fileName = window['functions'].refactorPathString(endpoint.path);
  return {
    path: endpoint.path,
    protocol: endpoint.protocol,
    type: endpoint.type,
    description: "Use this endpoint to list the " + model.name + " data. This endpoint will list all of the data without paging.",
    fileLocation: fileName + ".js",
    responses: {},
    parameters: []
  };
}

var _default = {
  compileEndpointFile: compileEndpointFile,
  compileEndpointMeta: compileEndpointMeta
};
exports.default = _default;
},{}],"src/backend/templates/rest/update.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function compileEndpointFile(endpoint, model, websiteData) {
  return "";
}

function compileEndpointMeta(endpoint, model, websiteData) {
  var fileName = window['functions'].refactorPathString(endpoint.path);
  return {
    path: endpoint.path,
    protocol: endpoint.protocol,
    type: endpoint.type,
    description: "Use this endpoint to update the " + model.name + " data specified with the 'id' parameter.",
    fileLocation: fileName + ".js",
    parameters: [{
      name: 'id',
      in: 'path',
      required: true,
      description: "The numberic identifier of the " + model.name + " data.",
      schema: {
        type: 'integer',
        example: 0
      }
    }],
    responses: {
      200: {
        description: "The updated " + model.name + " data.",
        content: {
          "application/json": {}
        }
      },
      400: {
        description: "The client did not provide data for the 'id' parameter, or they provided the data incorrectly.",
        content: {
          "text/plain": {
            schema: {
              type: 'string',
              example: 'Bad Request.'
            }
          }
        }
      },
      404: {
        description: "Could not find the " + model.name + " data associated with the 'id' parameter.",
        content: {
          "text/plain": {
            schema: {
              type: 'string',
              example: 'Not Found.'
            }
          }
        }
      }
    }
  };
}

var _default = {
  compileEndpointFile: compileEndpointFile,
  compileEndpointMeta: compileEndpointMeta
};
exports.default = _default;
},{}],"src/backend/rest.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _create = _interopRequireDefault(require("./templates/rest/create"));

var _delete = _interopRequireDefault(require("./templates/rest/delete"));

var _get = _interopRequireDefault(require("./templates/rest/get"));

var _list = _interopRequireDefault(require("./templates/rest/list"));

var _update = _interopRequireDefault(require("./templates/rest/update"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

function timeout(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}

function singleIndent(textData) {
  return '\t' + textData.replace(/\n/g, '\n\t');
}

function safetyWrapForFile(textData) {
  return "module.exports = function (req, res) {\n\n" + singleIndent(textData) + "\n\n};";
}

function compileOpenApi(websiteData) {
  var paths = {};

  for (var i = 0; i < websiteData.backend.models.length; i++) {
    var currentModel = websiteData.backend.models[i];

    for (var j = 0; j < currentModel.paths.length; j++) {
      var currentPath = currentModel.paths[j];
      if (paths["/" + currentModel.name + "/" + currentPath.path] == undefined) paths["/" + currentModel.name + "/" + currentPath.path] = {};
      paths["/" + currentModel.name + "/" + currentPath.path][currentPath.protocol] = {
        description: currentPath.description,
        responses: currentPath.responses,
        parameters: currentPath.parameters
      };
    }
  }

  return JSON.stringify({
    openapi: "3.0.0",
    info: {
      title: websiteData.name,
      description: websiteData.description,
      termsOfService: "https://" + websiteData.domain + "/terms",
      contact: {
        name: websiteData.name,
        url: "https://" + websiteData.domain + "/support",
        email: "support@" + websiteData.domain
      },
      license: {
        "name": websiteData.license.toUpperCase(),
        "url": ""
      },
      servers: [{
        description: "Development Server",
        url: "http://localhost:8000/"
      }, {
        description: "Production Server",
        url: "https://" + websiteData.domain + "/"
      }],
      version: websiteData.version
    },
    paths: paths
  }, null, "\t");
}

function compileBackend(websiteData, zip) {
  return __awaiter(this, void 0, void 0, function () {
    var backendFolder, backendRouteFolder, backendModelsFolder, i, model, modelData, sequelizeData;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          backendFolder = zip.folder('src');
          backendRouteFolder = backendFolder.folder('routes');
          backendModelsFolder = backendFolder.folder('models');
          i = 0;
          _a.label = 1;

        case 1:
          if (!(i < websiteData.backend.models.length)) return [3, 5];
          model = websiteData.backend.models[i];
          return [4, compileModel(model, websiteData, backendRouteFolder)];

        case 2:
          modelData = _a.sent();
          return [4, compileSequelize(model, websiteData, backendModelsFolder)];

        case 3:
          sequelizeData = _a.sent();
          _a.label = 4;

        case 4:
          i++;
          return [3, 1];

        case 5:
          return [2, backendFolder];
      }
    });
  });
}

function compileSequelize(model, websiteData, zip) {
  return __awaiter(this, void 0, void 0, function () {
    var modelDefintion, i, modelSchemaItem, modelParam, schemaData, fileData;
    return __generator(this, function (_a) {
      modelDefintion = "";

      for (i = 0; i < model.schema.length; i++) {
        modelSchemaItem = model.schema[i];
        modelDefintion += modelSchemaItem.name + ": {\n";

        for (modelParam in modelSchemaItem) {
          if (modelParam != 'name') {
            modelDefintion += "\t\t" + modelParam + ": " + modelSchemaItem[modelParam] + ",\n";
          }
        }

        modelDefintion += "},\n";
      }

      schemaData = "const " + model.name + " = sequelize.define('" + model.name + "', {" + modelDefintion + "});";
      fileData = "module.exports = function (sequelize, DataTypes) {\n" + singleIndent(schemaData) + "\n    return " + model.name + ";\n};";
      return [2, zip.file(window['functions'].refactorPathString(model.name) + ".js", fileData)];
    });
  });
}

function compileModel(model, websiteData, zip) {
  return __awaiter(this, void 0, void 0, function () {
    var folder, i, endpoint, _a, endpointFile, endpointMetaData;

    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          folder = zip.folder(model.name);
          i = 0;
          _b.label = 1;

        case 1:
          if (!(i < model.paths.length)) return [3, 4];
          endpoint = model.paths[i];
          return [4, compileEndpoint(endpoint, model, websiteData, folder)];

        case 2:
          _a = _b.sent(), endpointFile = _a.endpointFile, endpointMetaData = _a.endpointMetaData;
          model.paths[i] = endpointMetaData;
          _b.label = 3;

        case 3:
          i++;
          return [3, 1];

        case 4:
          return [2, folder];
      }
    });
  });
}

function compileEndpoint(endpoint, model, websiteData, zip) {
  return __awaiter(this, void 0, void 0, function () {
    var endpointParser, endpointFileData, endpointMetaData, endpointFile;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4, findTargetEndpoint(endpoint.type)];

        case 1:
          endpointParser = _a.sent();
          endpointFileData = endpointParser.compileEndpointFile(endpoint, model, websiteData);
          endpointMetaData = endpointParser.compileEndpointMeta(endpoint, model, websiteData);
          endpointFile = zip.file(endpointMetaData.fileLocation, safetyWrapForFile(endpointFileData));
          return [2, {
            endpointFile: endpointFile,
            endpointMetaData: endpointMetaData
          }];
      }
    });
  });
}

function findTargetEndpoint(type) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      switch (type.toUpperCase()) {
        case 'GET':
          return [2, _get.default];

        case 'CREATE':
          return [2, _create.default];

        case 'DELETE':
          return [2, _delete.default];

        case 'LIST':
          return [2, _list.default];

        case 'UPDATE':
          return [2, _update.default];
      }

      return [2];
    });
  });
}

var _default = {
  compileOpenApi: compileOpenApi,
  compileBackend: compileBackend,
  compileModel: compileModel,
  compileEndpoint: compileEndpoint
};
exports.default = _default;
},{"./templates/rest/create":"src/backend/templates/rest/create.ts","./templates/rest/delete":"src/backend/templates/rest/delete.ts","./templates/rest/get":"src/backend/templates/rest/get.ts","./templates/rest/list":"src/backend/templates/rest/list.ts","./templates/rest/update":"src/backend/templates/rest/update.ts"}],"src/backend.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _falcor = _interopRequireDefault(require("./backend/falcor"));

var _graphql = _interopRequireDefault(require("./backend/graphql"));

var _rest = _interopRequireDefault(require("./backend/rest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

function compileOpenApi(websiteData, zip) {
  var fileData = "";
  if (websiteData.backend.type.toUpperCase() == 'NONE') return null;
  if (websiteData.backend.type.toUpperCase() == 'GRAPHQL') fileData = _graphql.default.compileOpenApi(websiteData);
  if (websiteData.backend.type.toUpperCase() == 'FALCOR') fileData = _falcor.default.compileOpenApi(websiteData);
  if (websiteData.backend.type.toUpperCase() == 'REST') fileData = _rest.default.compileOpenApi(websiteData);
  return zip.file('OpenAPI.json', fileData);
}

function compileBackend(websiteData, zip) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          if (websiteData.backend.type.toUpperCase() == 'NONE') return [2, null];
          if (!(websiteData.backend.type.toUpperCase() == 'GRAPHQL')) return [3, 2];
          return [4, _graphql.default.compileBackend(websiteData, zip)];

        case 1:
          return [2, _a.sent()];

        case 2:
          if (!(websiteData.backend.type.toUpperCase() == 'FALCOR')) return [3, 4];
          return [4, _falcor.default.compileBackend(websiteData, zip)];

        case 3:
          return [2, _a.sent()];

        case 4:
          if (!(websiteData.backend.type.toUpperCase() == 'REST')) return [3, 6];
          return [4, _rest.default.compileBackend(websiteData, zip)];

        case 5:
          return [2, _a.sent()];

        case 6:
          return [2];
      }
    });
  });
}

var _default = {
  compileOpenApi: compileOpenApi,
  compileBackend: compileBackend
};
exports.default = _default;
},{"./backend/falcor":"src/backend/falcor.ts","./backend/graphql":"src/backend/graphql.ts","./backend/rest":"src/backend/rest.ts"}],"src/git.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compileGit;

function compileGit(zip, websiteData) {
  var gitFile = zip.folder('.git');
  gitFile.file('config', configFile());
  gitFile.file('description', websiteData.name);
  gitFile.file('FETCH_HEAD', '');
  gitFile.file('HEAD', 'ref: refs/heads/master');
  var hooks = gitFile.folder('hooks');
  var info = gitFile.folder('info').file('exclude', '# exclude file');
  var objects = gitFile.folder('objects');
  var ref = gitFile.folder('ref');
  objects.folder('heads');
  objects.folder('info');
  objects.folder('pack');
  objects.folder('tags');
  return gitFile;
}

function configFile() {
  return "[core]\n    repositoryformatversion = 0\n    filemode = true\n    bare = false\n    logallrefupdates = true\n    ignorecase = true\n    precomposeunicode = true";
}
},{}],"src/globalFunctions.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function replaceAt(index, replacement, string) {
  return string.substr(0, index) + replacement + string.substr(index + replacement.length);
}

function refactorPathString(path) {
  var output = path;
  output = output.replace(/\:/g, '');
  var words = output.split('/');
  var mended = '';

  for (var i = 0; i < words.length; i++) {
    mended += replaceAt(0, words[i][0].toUpperCase(), words[i]);
  }

  mended = replaceAt(0, mended[0].toLowerCase(), mended);
  return mended;
}

var _default = {
  refactorPathString: refactorPathString
};
exports.default = _default;
},{}],"src/index.ts":[function(require,module,exports) {
"use strict";

var _polish = _interopRequireDefault(require("./polish"));

var _core = _interopRequireDefault(require("./core"));

var _backend = _interopRequireDefault(require("./backend"));

var _git = _interopRequireDefault(require("./git"));

var _globalFunctions = _interopRequireDefault(require("./globalFunctions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

window['functions'] = _globalFunctions.default;

function generateWebsiteData() {
  return {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    author: document.getElementById('author').value,
    domain: document.getElementById('url').value,
    license: document.getElementById('license').value,
    version: document.getElementById('version').value,
    backend: {
      type: document.getElementById('backendType').value,
      models: [{
        name: 'user',
        schema: [{
          name: 'username',
          type: 'string'
        }, {
          name: 'email',
          type: 'text'
        }, {
          name: 'password',
          type: 'text'
        }, {
          name: 'biology',
          type: 'text'
        }, {
          name: 'firstname',
          type: 'string'
        }, {
          name: 'lastname',
          type: 'string'
        }],
        paths: [{
          path: 'create',
          protocol: 'post',
          type: 'create'
        }, {
          path: ':id',
          protocol: 'get',
          type: 'get'
        }, {
          path: ':id/edit',
          protocol: 'patch',
          type: 'update'
        }, {
          path: ':id/delete',
          protocol: 'delete',
          type: 'delete'
        }]
      }]
    }
  };
}

function download() {
  return __awaiter(this, void 0, void 0, function () {
    var websiteData, zip, backendFolder, dockerFile, readmeFile, packageFile, openApiFile, licenseFile, _a, _b, _c, gitFolder, blob;

    return __generator(this, function (_d) {
      switch (_d.label) {
        case 0:
          console.time('generateWebsite');
          websiteData = generateWebsiteData();
          zip = new JSZip();
          return [4, _backend.default.compileBackend(websiteData, zip)];

        case 1:
          backendFolder = _d.sent();
          dockerFile = zip.file('Dockerfile', _core.default.generateDocker());
          readmeFile = zip.file('readme.md', _core.default.generateReadme(websiteData));
          packageFile = zip.file('package.json', _core.default.generatePackage(websiteData));
          openApiFile = _backend.default.compileOpenApi(websiteData, zip);
          _b = (_a = zip).file;
          _c = ['license.md'];
          return [4, _core.default.getLicense(websiteData)];

        case 2:
          licenseFile = _b.apply(_a, _c.concat([_d.sent()]));
          gitFolder = (0, _git.default)(zip, websiteData);
          return [4, zip.generateAsync({
            type: 'blob'
          })];

        case 3:
          blob = _d.sent();
          window.saveAs(blob, websiteData.name + ".zip");
          console.timeEnd('generateWebsite');
          return [2];
      }
    });
  });
}

window.onload = function () {
  document.getElementById('createModel').onclick = _polish.default.createModelUI;

  document.getElementById('download').onclick = function () {
    download();
  };

  _polish.default.setupCookies();

  _polish.default.setupStoredInputs();

  _polish.default.setupSubtextAnimation();
};
},{"./polish":"src/polish.ts","./core":"src/core.ts","./backend":"src/backend.ts","./git":"src/git.ts","./globalFunctions":"src/globalFunctions.ts"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54863" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map