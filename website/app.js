(function () {
  'use strict';

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var runtime = {exports: {}};

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  (function (module) {
    var runtime = function (exports) {

      var Op = Object.prototype;
      var hasOwn = Op.hasOwnProperty;
      var undefined$1; // More compressible than void 0.

      var $Symbol = typeof Symbol === "function" ? Symbol : {};
      var iteratorSymbol = $Symbol.iterator || "@@iterator";
      var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
      var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

      function define(obj, key, value) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
        return obj[key];
      }

      try {
        // IE 8 has a broken Object.defineProperty that only works on DOM objects.
        define({}, "");
      } catch (err) {
        define = function (obj, key, value) {
          return obj[key] = value;
        };
      }

      function wrap(innerFn, outerFn, self, tryLocsList) {
        // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
        // .throw, and .return methods.

        generator._invoke = makeInvokeMethod(innerFn, self, context);
        return generator;
      }

      exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
      // record like context.tryEntries[i].completion. This interface could
      // have been (and was previously) designed to take a closure to be
      // invoked without arguments, but in all the cases we care about we
      // already have an existing method we want to call, so there's no need
      // to create a new function object. We can even get away with assuming
      // the method takes exactly one argument, since that happens to be true
      // in every case, so we don't have to touch the arguments object. The
      // only additional allocation required is the completion record, which
      // has a stable shape and so hopefully should be cheap to allocate.

      function tryCatch(fn, obj, arg) {
        try {
          return {
            type: "normal",
            arg: fn.call(obj, arg)
          };
        } catch (err) {
          return {
            type: "throw",
            arg: err
          };
        }
      }

      var GenStateSuspendedStart = "suspendedStart";
      var GenStateSuspendedYield = "suspendedYield";
      var GenStateExecuting = "executing";
      var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
      // breaking out of the dispatch switch statement.

      var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
      // .constructor.prototype properties for functions that return Generator
      // objects. For full spec compliance, you may wish to configure your
      // minifier not to mangle the names of these two functions.

      function Generator() {}

      function GeneratorFunction() {}

      function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
      // don't natively support it.


      var IteratorPrototype = {};

      IteratorPrototype[iteratorSymbol] = function () {
        return this;
      };

      var getProto = Object.getPrototypeOf;
      var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

      if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
        // This environment has a native %IteratorPrototype%; use it instead
        // of the polyfill.
        IteratorPrototype = NativeIteratorPrototype;
      }

      var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
      GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
      GeneratorFunctionPrototype.constructor = GeneratorFunction;
      GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
      // Iterator interface in terms of a single ._invoke method.

      function defineIteratorMethods(prototype) {
        ["next", "throw", "return"].forEach(function (method) {
          define(prototype, method, function (arg) {
            return this._invoke(method, arg);
          });
        });
      }

      exports.isGeneratorFunction = function (genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
      };

      exports.mark = function (genFun) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        } else {
          genFun.__proto__ = GeneratorFunctionPrototype;
          define(genFun, toStringTagSymbol, "GeneratorFunction");
        }

        genFun.prototype = Object.create(Gp);
        return genFun;
      }; // Within the body of any async function, `await x` is transformed to
      // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
      // `hasOwn.call(value, "__await")` to determine if the yielded value is
      // meant to be awaited.


      exports.awrap = function (arg) {
        return {
          __await: arg
        };
      };

      function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);

          if (record.type === "throw") {
            reject(record.arg);
          } else {
            var result = record.arg;
            var value = result.value;

            if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
              return PromiseImpl.resolve(value.__await).then(function (value) {
                invoke("next", value, resolve, reject);
              }, function (err) {
                invoke("throw", err, resolve, reject);
              });
            }

            return PromiseImpl.resolve(value).then(function (unwrapped) {
              // When a yielded Promise is resolved, its final value becomes
              // the .value of the Promise<{value,done}> result for the
              // current iteration.
              result.value = unwrapped;
              resolve(result);
            }, function (error) {
              // If a rejected Promise was yielded, throw the rejection back
              // into the async generator function so it can be handled there.
              return invoke("throw", error, resolve, reject);
            });
          }
        }

        var previousPromise;

        function enqueue(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }

          return previousPromise = // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        } // Define the unified helper method that is used to implement .next,
        // .throw, and .return (see defineIteratorMethods).


        this._invoke = enqueue;
      }

      defineIteratorMethods(AsyncIterator.prototype);

      AsyncIterator.prototype[asyncIteratorSymbol] = function () {
        return this;
      };

      exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
      // AsyncIterator objects; they just return a Promise for the value of
      // the final result produced by the iterator.

      exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        if (PromiseImpl === void 0) PromiseImpl = Promise;
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function (result) {
          return result.done ? result.value : iter.next();
        });
      };

      function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;
        return function invoke(method, arg) {
          if (state === GenStateExecuting) {
            throw new Error("Generator is already running");
          }

          if (state === GenStateCompleted) {
            if (method === "throw") {
              throw arg;
            } // Be forgiving, per 25.3.3.3.3 of the spec:
            // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


            return doneResult();
          }

          context.method = method;
          context.arg = arg;

          while (true) {
            var delegate = context.delegate;

            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);

              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }

            if (context.method === "next") {
              // Setting context._sent for legacy support of Babel's
              // function.sent implementation.
              context.sent = context._sent = context.arg;
            } else if (context.method === "throw") {
              if (state === GenStateSuspendedStart) {
                state = GenStateCompleted;
                throw context.arg;
              }

              context.dispatchException(context.arg);
            } else if (context.method === "return") {
              context.abrupt("return", context.arg);
            }

            state = GenStateExecuting;
            var record = tryCatch(innerFn, self, context);

            if (record.type === "normal") {
              // If an exception is thrown from innerFn, we leave state ===
              // GenStateExecuting and loop back for another invocation.
              state = context.done ? GenStateCompleted : GenStateSuspendedYield;

              if (record.arg === ContinueSentinel) {
                continue;
              }

              return {
                value: record.arg,
                done: context.done
              };
            } else if (record.type === "throw") {
              state = GenStateCompleted; // Dispatch the exception by looping back around to the
              // context.dispatchException(context.arg) call above.

              context.method = "throw";
              context.arg = record.arg;
            }
          }
        };
      } // Call delegate.iterator[context.method](context.arg) and handle the
      // result, either by returning a { value, done } result from the
      // delegate iterator, or by modifying context.method and context.arg,
      // setting context.delegate to null, and returning the ContinueSentinel.


      function maybeInvokeDelegate(delegate, context) {
        var method = delegate.iterator[context.method];

        if (method === undefined$1) {
          // A .throw or .return when the delegate iterator has no .throw
          // method always terminates the yield* loop.
          context.delegate = null;

          if (context.method === "throw") {
            // Note: ["return"] must be used for ES3 parsing compatibility.
            if (delegate.iterator["return"]) {
              // If the delegate iterator has a return method, give it a
              // chance to clean up.
              context.method = "return";
              context.arg = undefined$1;
              maybeInvokeDelegate(delegate, context);

              if (context.method === "throw") {
                // If maybeInvokeDelegate(context) changed context.method from
                // "return" to "throw", let that override the TypeError below.
                return ContinueSentinel;
              }
            }

            context.method = "throw";
            context.arg = new TypeError("The iterator does not provide a 'throw' method");
          }

          return ContinueSentinel;
        }

        var record = tryCatch(method, delegate.iterator, context.arg);

        if (record.type === "throw") {
          context.method = "throw";
          context.arg = record.arg;
          context.delegate = null;
          return ContinueSentinel;
        }

        var info = record.arg;

        if (!info) {
          context.method = "throw";
          context.arg = new TypeError("iterator result is not an object");
          context.delegate = null;
          return ContinueSentinel;
        }

        if (info.done) {
          // Assign the result of the finished delegate to the temporary
          // variable specified by delegate.resultName (see delegateYield).
          context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

          context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
          // exception, let the outer generator proceed normally. If
          // context.method was "next", forget context.arg since it has been
          // "consumed" by the delegate iterator. If context.method was
          // "return", allow the original .return call to continue in the
          // outer generator.

          if (context.method !== "return") {
            context.method = "next";
            context.arg = undefined$1;
          }
        } else {
          // Re-yield the result returned by the delegate method.
          return info;
        } // The delegate iterator is finished, so forget it and continue with
        // the outer generator.


        context.delegate = null;
        return ContinueSentinel;
      } // Define Generator.prototype.{next,throw,return} in terms of the
      // unified ._invoke helper method.


      defineIteratorMethods(Gp);
      define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
      // @@iterator function is called on it. Some browsers' implementations of the
      // iterator prototype chain incorrectly implement this, causing the Generator
      // object to not be returned from this call. This ensures that doesn't happen.
      // See https://github.com/facebook/regenerator/issues/274 for more details.

      Gp[iteratorSymbol] = function () {
        return this;
      };

      Gp.toString = function () {
        return "[object Generator]";
      };

      function pushTryEntry(locs) {
        var entry = {
          tryLoc: locs[0]
        };

        if (1 in locs) {
          entry.catchLoc = locs[1];
        }

        if (2 in locs) {
          entry.finallyLoc = locs[2];
          entry.afterLoc = locs[3];
        }

        this.tryEntries.push(entry);
      }

      function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
      }

      function Context(tryLocsList) {
        // The root entry object (effectively a try statement without a catch
        // or a finally block) gives us a place to store values thrown from
        // locations where there is no enclosing try statement.
        this.tryEntries = [{
          tryLoc: "root"
        }];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
      }

      exports.keys = function (object) {
        var keys = [];

        for (var key in object) {
          keys.push(key);
        }

        keys.reverse(); // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.

        return function next() {
          while (keys.length) {
            var key = keys.pop();

            if (key in object) {
              next.value = key;
              next.done = false;
              return next;
            }
          } // To avoid creating an additional object, we just hang the .value
          // and .done properties off the next function object itself. This
          // also ensures that the minifier will not anonymize the function.


          next.done = true;
          return next;
        };
      };

      function values(iterable) {
        if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol];

          if (iteratorMethod) {
            return iteratorMethod.call(iterable);
          }

          if (typeof iterable.next === "function") {
            return iterable;
          }

          if (!isNaN(iterable.length)) {
            var i = -1,
                next = function next() {
              while (++i < iterable.length) {
                if (hasOwn.call(iterable, i)) {
                  next.value = iterable[i];
                  next.done = false;
                  return next;
                }
              }

              next.value = undefined$1;
              next.done = true;
              return next;
            };

            return next.next = next;
          }
        } // Return an iterator with no values.


        return {
          next: doneResult
        };
      }

      exports.values = values;

      function doneResult() {
        return {
          value: undefined$1,
          done: true
        };
      }

      Context.prototype = {
        constructor: Context,
        reset: function (skipTempReset) {
          this.prev = 0;
          this.next = 0; // Resetting context._sent for legacy support of Babel's
          // function.sent implementation.

          this.sent = this._sent = undefined$1;
          this.done = false;
          this.delegate = null;
          this.method = "next";
          this.arg = undefined$1;
          this.tryEntries.forEach(resetTryEntry);

          if (!skipTempReset) {
            for (var name in this) {
              // Not sure about the optimal order of these conditions:
              if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                this[name] = undefined$1;
              }
            }
          }
        },
        stop: function () {
          this.done = true;
          var rootEntry = this.tryEntries[0];
          var rootRecord = rootEntry.completion;

          if (rootRecord.type === "throw") {
            throw rootRecord.arg;
          }

          return this.rval;
        },
        dispatchException: function (exception) {
          if (this.done) {
            throw exception;
          }

          var context = this;

          function handle(loc, caught) {
            record.type = "throw";
            record.arg = exception;
            context.next = loc;

            if (caught) {
              // If the dispatched exception was caught by a catch block,
              // then let that catch block handle the exception normally.
              context.method = "next";
              context.arg = undefined$1;
            }

            return !!caught;
          }

          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            var record = entry.completion;

            if (entry.tryLoc === "root") {
              // Exception thrown outside of any try block that could handle
              // it, so set the completion value of the entire function to
              // throw the exception.
              return handle("end");
            }

            if (entry.tryLoc <= this.prev) {
              var hasCatch = hasOwn.call(entry, "catchLoc");
              var hasFinally = hasOwn.call(entry, "finallyLoc");

              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                } else if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                }
              } else if (hasFinally) {
                if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else {
                throw new Error("try statement without catch or finally");
              }
            }
          }
        },
        abrupt: function (type, arg) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
              var finallyEntry = entry;
              break;
            }
          }

          if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
            // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
          }

          var record = finallyEntry ? finallyEntry.completion : {};
          record.type = type;
          record.arg = arg;

          if (finallyEntry) {
            this.method = "next";
            this.next = finallyEntry.finallyLoc;
            return ContinueSentinel;
          }

          return this.complete(record);
        },
        complete: function (record, afterLoc) {
          if (record.type === "throw") {
            throw record.arg;
          }

          if (record.type === "break" || record.type === "continue") {
            this.next = record.arg;
          } else if (record.type === "return") {
            this.rval = this.arg = record.arg;
            this.method = "return";
            this.next = "end";
          } else if (record.type === "normal" && afterLoc) {
            this.next = afterLoc;
          }

          return ContinueSentinel;
        },
        finish: function (finallyLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.finallyLoc === finallyLoc) {
              this.complete(entry.completion, entry.afterLoc);
              resetTryEntry(entry);
              return ContinueSentinel;
            }
          }
        },
        "catch": function (tryLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.tryLoc === tryLoc) {
              var record = entry.completion;

              if (record.type === "throw") {
                var thrown = record.arg;
                resetTryEntry(entry);
              }

              return thrown;
            }
          } // The context.catch method must only be called with a location
          // argument that corresponds to a known catch block.


          throw new Error("illegal catch attempt");
        },
        delegateYield: function (iterable, resultName, nextLoc) {
          this.delegate = {
            iterator: values(iterable),
            resultName: resultName,
            nextLoc: nextLoc
          };

          if (this.method === "next") {
            // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined$1;
          }

          return ContinueSentinel;
        }
      }; // Regardless of whether this script is executing as a CommonJS module
      // or not, return the runtime object so that we can declare the variable
      // regeneratorRuntime in the outer scope, which allows this module to be
      // injected easily by `bin/regenerator --include-runtime script.js`.

      return exports;
    }( // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
    module.exports );

    try {
      regeneratorRuntime = runtime;
    } catch (accidentalStrictMode) {
      // This module should not be running in strict mode, so the above
      // assignment should always work unless something is misconfigured. Just
      // in case runtime.js accidentally runs in strict mode, we can escape
      // strict mode using a global Function call. This could conceivably fail
      // if a Content Security Policy forbids using Function, but in that case
      // the proper solution is to fix the accidental strict mode problem. If
      // you've misconfigured your bundler to force strict mode and applied a
      // CSP to forbid Function, and you're not willing to fix either of those
      // problems, please detail your unique predicament in a GitHub issue.
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  })(runtime);

  var check = function (it) {
    return it && it.Math == Math && it;
  }; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


  var global$q = // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func
  Function('return this')();

  var objectGetOwnPropertyDescriptor = {};

  var fails$g = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var fails$f = fails$g; // Thank's IE8 for his funny defineProperty

  var descriptors = !fails$f(function () {
    return Object.defineProperty({}, 1, {
      get: function () {
        return 7;
      }
    })[1] != 7;
  });

  var objectPropertyIsEnumerable = {};

  var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
  var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

  var NASHORN_BUG = getOwnPropertyDescriptor$2 && !nativePropertyIsEnumerable.call({
    1: 2
  }, 1); // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable

  objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$2(this, V);
    return !!descriptor && descriptor.enumerable;
  } : nativePropertyIsEnumerable;

  var createPropertyDescriptor$6 = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var toString$1 = {}.toString;

  var classofRaw$1 = function (it) {
    return toString$1.call(it).slice(8, -1);
  };

  var fails$e = fails$g;
  var classof$b = classofRaw$1;
  var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

  var indexedObject = fails$e(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$b(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object;

  // https://tc39.github.io/ecma262/#sec-requireobjectcoercible

  var requireObjectCoercible$8 = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  var IndexedObject$2 = indexedObject;
  var requireObjectCoercible$7 = requireObjectCoercible$8;

  var toIndexedObject$4 = function (it) {
    return IndexedObject$2(requireObjectCoercible$7(it));
  };

  var isObject$i = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var isObject$h = isObject$i; // `ToPrimitive` abstract operation
  // https://tc39.github.io/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string

  var toPrimitive$3 = function (input, PREFERRED_STRING) {
    if (!isObject$h(input)) return input;
    var fn, val;
    if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$h(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject$h(val = fn.call(input))) return val;
    if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$h(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var hasOwnProperty = {}.hasOwnProperty;

  var has$g = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var global$p = global$q;
  var isObject$g = isObject$i;
  var document$2 = global$p.document; // typeof document.createElement is 'object' in old IE

  var EXISTS = isObject$g(document$2) && isObject$g(document$2.createElement);

  var documentCreateElement$1 = function (it) {
    return EXISTS ? document$2.createElement(it) : {};
  };

  var DESCRIPTORS$c = descriptors;
  var fails$d = fails$g;
  var createElement$1 = documentCreateElement$1; // Thank's IE8 for his funny defineProperty

  var ie8DomDefine = !DESCRIPTORS$c && !fails$d(function () {
    return Object.defineProperty(createElement$1('div'), 'a', {
      get: function () {
        return 7;
      }
    }).a != 7;
  });

  var DESCRIPTORS$b = descriptors;
  var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
  var createPropertyDescriptor$5 = createPropertyDescriptor$6;
  var toIndexedObject$3 = toIndexedObject$4;
  var toPrimitive$2 = toPrimitive$3;
  var has$f = has$g;
  var IE8_DOM_DEFINE$1 = ie8DomDefine;
  var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$b ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$3(O);
    P = toPrimitive$2(P, true);
    if (IE8_DOM_DEFINE$1) try {
      return nativeGetOwnPropertyDescriptor(O, P);
    } catch (error) {
      /* empty */
    }
    if (has$f(O, P)) return createPropertyDescriptor$5(!propertyIsEnumerableModule$1.f.call(O, P), O[P]);
  };

  var objectDefineProperty = {};

  var isObject$f = isObject$i;

  var anObject$1e = function (it) {
    if (!isObject$f(it)) {
      throw TypeError(String(it) + ' is not an object');
    }

    return it;
  };

  var DESCRIPTORS$a = descriptors;
  var IE8_DOM_DEFINE = ie8DomDefine;
  var anObject$1d = anObject$1e;
  var toPrimitive$1 = toPrimitive$3;
  var nativeDefineProperty = Object.defineProperty; // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty

  objectDefineProperty.f = DESCRIPTORS$a ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
    anObject$1d(O);
    P = toPrimitive$1(P, true);
    anObject$1d(Attributes);
    if (IE8_DOM_DEFINE) try {
      return nativeDefineProperty(O, P, Attributes);
    } catch (error) {
      /* empty */
    }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var DESCRIPTORS$9 = descriptors;
  var definePropertyModule$5 = objectDefineProperty;
  var createPropertyDescriptor$4 = createPropertyDescriptor$6;
  var createNonEnumerableProperty$e = DESCRIPTORS$9 ? function (object, key, value) {
    return definePropertyModule$5.f(object, key, createPropertyDescriptor$4(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var redefine$8 = {exports: {}};

  var global$o = global$q;
  var createNonEnumerableProperty$d = createNonEnumerableProperty$e;

  var setGlobal$3 = function (key, value) {
    try {
      createNonEnumerableProperty$d(global$o, key, value);
    } catch (error) {
      global$o[key] = value;
    }

    return value;
  };

  var global$n = global$q;
  var setGlobal$2 = setGlobal$3;
  var SHARED = '__core-js_shared__';
  var store$5 = global$n[SHARED] || setGlobal$2(SHARED, {});
  var sharedStore = store$5;

  var store$4 = sharedStore;
  var functionToString = Function.toString; // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper

  if (typeof store$4.inspectSource != 'function') {
    store$4.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }

  var inspectSource$3 = store$4.inspectSource;

  var global$m = global$q;
  var inspectSource$2 = inspectSource$3;
  var WeakMap$3 = global$m.WeakMap;
  var nativeWeakMap = typeof WeakMap$3 === 'function' && /native code/.test(inspectSource$2(WeakMap$3));

  var shared$4 = {exports: {}};

  var isPure = false;

  var store$3 = sharedStore;
  (shared$4.exports = function (key, value) {
    return store$3[key] || (store$3[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.6.5',
    mode: 'global',
    copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
  });

  var id$2 = 0;
  var postfix = Math.random();

  var uid$3 = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id$2 + postfix).toString(36);
  };

  var shared$3 = shared$4.exports;
  var uid$2 = uid$3;
  var keys = shared$3('keys');

  var sharedKey$3 = function (key) {
    return keys[key] || (keys[key] = uid$2(key));
  };

  var hiddenKeys$5 = {};

  var NATIVE_WEAK_MAP$1 = nativeWeakMap;
  var global$l = global$q;
  var isObject$e = isObject$i;
  var createNonEnumerableProperty$c = createNonEnumerableProperty$e;
  var objectHas = has$g;
  var sharedKey$2 = sharedKey$3;
  var hiddenKeys$4 = hiddenKeys$5;
  var WeakMap$2 = global$l.WeakMap;
  var set$1, get, has$e;

  var enforce = function (it) {
    return has$e(it) ? get(it) : set$1(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;

      if (!isObject$e(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      }

      return state;
    };
  };

  if (NATIVE_WEAK_MAP$1) {
    var store$2 = new WeakMap$2();
    var wmget = store$2.get;
    var wmhas = store$2.has;
    var wmset = store$2.set;

    set$1 = function (it, metadata) {
      wmset.call(store$2, it, metadata);
      return metadata;
    };

    get = function (it) {
      return wmget.call(store$2, it) || {};
    };

    has$e = function (it) {
      return wmhas.call(store$2, it);
    };
  } else {
    var STATE = sharedKey$2('state');
    hiddenKeys$4[STATE] = true;

    set$1 = function (it, metadata) {
      createNonEnumerableProperty$c(it, STATE, metadata);
      return metadata;
    };

    get = function (it) {
      return objectHas(it, STATE) ? it[STATE] : {};
    };

    has$e = function (it) {
      return objectHas(it, STATE);
    };
  }

  var internalState = {
    set: set$1,
    get: get,
    has: has$e,
    enforce: enforce,
    getterFor: getterFor
  };

  var global$k = global$q;
  var createNonEnumerableProperty$b = createNonEnumerableProperty$e;
  var has$d = has$g;
  var setGlobal$1 = setGlobal$3;
  var inspectSource$1 = inspectSource$3;
  var InternalStateModule$f = internalState;
  var getInternalState$a = InternalStateModule$f.get;
  var enforceInternalState = InternalStateModule$f.enforce;
  var TEMPLATE = String(String).split('String');
  (redefine$8.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;

    if (typeof value == 'function') {
      if (typeof key == 'string' && !has$d(value, 'name')) createNonEnumerableProperty$b(value, 'name', key);
      enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }

    if (O === global$k) {
      if (simple) O[key] = value;else setGlobal$1(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }

    if (simple) O[key] = value;else createNonEnumerableProperty$b(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return typeof this == 'function' && getInternalState$a(this).source || inspectSource$1(this);
  });

  var global$j = global$q;
  var path$6 = global$j;

  var path$5 = path$6;
  var global$i = global$q;

  var aFunction$K = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn$m = function (namespace, method) {
    return arguments.length < 2 ? aFunction$K(path$5[namespace]) || aFunction$K(global$i[namespace]) : path$5[namespace] && path$5[namespace][method] || global$i[namespace] && global$i[namespace][method];
  };

  var objectGetOwnPropertyNames = {};

  var ceil = Math.ceil;
  var floor$3 = Math.floor; // `ToInteger` abstract operation
  // https://tc39.github.io/ecma262/#sec-tointeger

  var toInteger$7 = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor$3 : ceil)(argument);
  };

  var toInteger$6 = toInteger$7;
  var min$2 = Math.min; // `ToLength` abstract operation
  // https://tc39.github.io/ecma262/#sec-tolength

  var toLength$8 = function (argument) {
    return argument > 0 ? min$2(toInteger$6(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toInteger$5 = toInteger$7;
  var max$1 = Math.max;
  var min$1 = Math.min; // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

  var toAbsoluteIndex$1 = function (index, length) {
    var integer = toInteger$5(index);
    return integer < 0 ? max$1(integer + length, 0) : min$1(integer, length);
  };

  var toIndexedObject$2 = toIndexedObject$4;
  var toLength$7 = toLength$8;
  var toAbsoluteIndex = toAbsoluteIndex$1; // `Array.prototype.{ indexOf, includes }` methods implementation

  var createMethod$4 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$2($this);
      var length = toLength$7(O.length);
      var index = toAbsoluteIndex(fromIndex, length);
      var value; // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare

      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++]; // eslint-disable-next-line no-self-compare

        if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
      } else for (; length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      }
      return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.includes
    includes: createMethod$4(true),
    // `Array.prototype.indexOf` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$4(false)
  };

  var has$c = has$g;
  var toIndexedObject$1 = toIndexedObject$4;
  var indexOf = arrayIncludes.indexOf;
  var hiddenKeys$3 = hiddenKeys$5;

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject$1(object);
    var i = 0;
    var result = [];
    var key;

    for (key in O) !has$c(hiddenKeys$3, key) && has$c(O, key) && result.push(key); // Don't enum bug & hidden keys


    while (names.length > i) if (has$c(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
    }

    return result;
  };

  var enumBugKeys$3 = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

  var internalObjectKeys$1 = objectKeysInternal;
  var enumBugKeys$2 = enumBugKeys$3;
  var hiddenKeys$2 = enumBugKeys$2.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames

  objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys$1(O, hiddenKeys$2);
  };

  var objectGetOwnPropertySymbols = {};

  objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

  var getBuiltIn$l = getBuiltIn$m;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
  var anObject$1c = anObject$1e; // all object keys, includes non-enumerable and symbols

  var ownKeys$1 = getBuiltIn$l('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject$1c(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var has$b = has$g;
  var ownKeys = ownKeys$1;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var definePropertyModule$4 = objectDefineProperty;

  var copyConstructorProperties$1 = function (target, source) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule$4.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has$b(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var fails$c = fails$g;
  var replacement = /#|\.prototype\./;

  var isForced$3 = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails$c(detection) : !!detection;
  };

  var normalize = isForced$3.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced$3.data = {};
  var NATIVE = isForced$3.NATIVE = 'N';
  var POLYFILL = isForced$3.POLYFILL = 'P';
  var isForced_1 = isForced$3;

  var global$h = global$q;
  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty$a = createNonEnumerableProperty$e;
  var redefine$7 = redefine$8.exports;
  var setGlobal = setGlobal$3;
  var copyConstructorProperties = copyConstructorProperties$1;
  var isForced$2 = isForced_1;
  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
  */

  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;

    if (GLOBAL) {
      target = global$h;
    } else if (STATIC) {
      target = global$h[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global$h[TARGET] || {}).prototype;
    }

    if (target) for (key in source) {
      sourceProperty = source[key];

      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];

      FORCED = isForced$2(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      } // add a flag to not completely full polyfills


      if (options.sham || targetProperty && targetProperty.sham) {
        createNonEnumerableProperty$a(sourceProperty, 'sham', true);
      } // extend global


      redefine$7(target, key, sourceProperty, options);
    }
  };

  var classof$a = classofRaw$1; // `IsArray` abstract operation
  // https://tc39.github.io/ecma262/#sec-isarray

  var isArray$3 = Array.isArray || function isArray(arg) {
    return classof$a(arg) == 'Array';
  };

  var requireObjectCoercible$6 = requireObjectCoercible$8; // `ToObject` abstract operation
  // https://tc39.github.io/ecma262/#sec-toobject

  var toObject$a = function (argument) {
    return Object(requireObjectCoercible$6(argument));
  };

  var toPrimitive = toPrimitive$3;
  var definePropertyModule$3 = objectDefineProperty;
  var createPropertyDescriptor$3 = createPropertyDescriptor$6;

  var createProperty$2 = function (object, key, value) {
    var propertyKey = toPrimitive(key);
    if (propertyKey in object) definePropertyModule$3.f(object, propertyKey, createPropertyDescriptor$3(0, value));else object[propertyKey] = value;
  };

  var fails$b = fails$g;
  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$b(function () {
    // Chrome 38 Symbol has incorrect toString conversion
    // eslint-disable-next-line no-undef
    return !String(Symbol());
  });

  var NATIVE_SYMBOL$1 = nativeSymbol;
  var useSymbolAsUid = NATIVE_SYMBOL$1 // eslint-disable-next-line no-undef
  && !Symbol.sham // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';

  var global$g = global$q;
  var shared$2 = shared$4.exports;
  var has$a = has$g;
  var uid$1 = uid$3;
  var NATIVE_SYMBOL = nativeSymbol;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;
  var WellKnownSymbolsStore = shared$2('wks');
  var Symbol$1 = global$g.Symbol;
  var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

  var wellKnownSymbol$s = function (name) {
    if (!has$a(WellKnownSymbolsStore, name)) {
      if (NATIVE_SYMBOL && has$a(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    }

    return WellKnownSymbolsStore[name];
  };

  var isObject$d = isObject$i;
  var isArray$2 = isArray$3;
  var wellKnownSymbol$r = wellKnownSymbol$s;
  var SPECIES$4 = wellKnownSymbol$r('species'); // `ArraySpeciesCreate` abstract operation
  // https://tc39.github.io/ecma262/#sec-arrayspeciescreate

  var arraySpeciesCreate$2 = function (originalArray, length) {
    var C;

    if (isArray$2(originalArray)) {
      C = originalArray.constructor; // cross-realm fallback

      if (typeof C == 'function' && (C === Array || isArray$2(C.prototype))) C = undefined;else if (isObject$d(C)) {
        C = C[SPECIES$4];
        if (C === null) C = undefined;
      }
    }

    return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  var getBuiltIn$k = getBuiltIn$m;
  var engineUserAgent = getBuiltIn$k('navigator', 'userAgent') || '';

  var global$f = global$q;
  var userAgent$1 = engineUserAgent;
  var process$3 = global$f.process;
  var versions = process$3 && process$3.versions;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    version = match[0] + match[1];
  } else if (userAgent$1) {
    match = userAgent$1.match(/Edge\/(\d+)/);

    if (!match || match[1] >= 74) {
      match = userAgent$1.match(/Chrome\/(\d+)/);
      if (match) version = match[1];
    }
  }

  var engineV8Version = version && +version;

  var fails$a = fails$g;
  var wellKnownSymbol$q = wellKnownSymbol$s;
  var V8_VERSION$2 = engineV8Version;
  var SPECIES$3 = wellKnownSymbol$q('species');

  var arrayMethodHasSpeciesSupport$1 = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return V8_VERSION$2 >= 51 || !fails$a(function () {
      var array = [];
      var constructor = array.constructor = {};

      constructor[SPECIES$3] = function () {
        return {
          foo: 1
        };
      };

      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var $$1T = _export;
  var fails$9 = fails$g;
  var isArray$1 = isArray$3;
  var isObject$c = isObject$i;
  var toObject$9 = toObject$a;
  var toLength$6 = toLength$8;
  var createProperty$1 = createProperty$2;
  var arraySpeciesCreate$1 = arraySpeciesCreate$2;
  var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$1;
  var wellKnownSymbol$p = wellKnownSymbol$s;
  var V8_VERSION$1 = engineV8Version;
  var IS_CONCAT_SPREADABLE = wellKnownSymbol$p('isConcatSpreadable');
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'; // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679

  var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION$1 >= 51 || !fails$9(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });
  var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

  var isConcatSpreadable = function (O) {
    if (!isObject$c(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray$1(O);
  };

  var FORCED$4 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species

  $$1T({
    target: 'Array',
    proto: true,
    forced: FORCED$4
  }, {
    concat: function concat(arg) {
      // eslint-disable-line no-unused-vars
      var O = toObject$9(this);
      var A = arraySpeciesCreate$1(O, 0);
      var n = 0;
      var i, k, length, len, E;

      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];

        if (isConcatSpreadable(E)) {
          len = toLength$6(E.length);
          if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

          for (k = 0; k < len; k++, n++) if (k in E) createProperty$1(A, n, E[k]);
        } else {
          if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          createProperty$1(A, n++, E);
        }
      }

      A.length = n;
      return A;
    }
  });

  var wellKnownSymbol$o = wellKnownSymbol$s;
  var TO_STRING_TAG$6 = wellKnownSymbol$o('toStringTag');
  var test = {};
  test[TO_STRING_TAG$6] = 'z';
  var toStringTagSupport = String(test) === '[object z]';

  var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
  var classofRaw = classofRaw$1;
  var wellKnownSymbol$n = wellKnownSymbol$s;
  var TO_STRING_TAG$5 = wellKnownSymbol$n('toStringTag'); // ES3 wrong here

  var CORRECT_ARGUMENTS = classofRaw(function () {
    return arguments;
  }()) == 'Arguments'; // fallback for IE11 Script Access Denied error

  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) {
      /* empty */
    }
  }; // getting tag from ES6+ `Object.prototype.toString`


  var classof$9 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$5)) == 'string' ? tag // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
  };

  var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
  var classof$8 = classof$9; // `Object.prototype.toString` method implementation
  // https://tc39.github.io/ecma262/#sec-object.prototype.tostring

  var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
    return '[object ' + classof$8(this) + ']';
  };

  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var redefine$6 = redefine$8.exports;
  var toString = objectToString; // `Object.prototype.toString` method
  // https://tc39.github.io/ecma262/#sec-object.prototype.tostring

  if (!TO_STRING_TAG_SUPPORT) {
    redefine$6(Object.prototype, 'toString', toString, {
      unsafe: true
    });
  }

  var global$e = global$q;
  var nativePromiseConstructor = global$e.Promise;

  var redefine$5 = redefine$8.exports;

  var redefineAll$8 = function (target, src, options) {
    for (var key in src) redefine$5(target, key, src[key], options);

    return target;
  };

  var defineProperty$8 = objectDefineProperty.f;
  var has$9 = has$g;
  var wellKnownSymbol$m = wellKnownSymbol$s;
  var TO_STRING_TAG$4 = wellKnownSymbol$m('toStringTag');

  var setToStringTag$6 = function (it, TAG, STATIC) {
    if (it && !has$9(it = STATIC ? it : it.prototype, TO_STRING_TAG$4)) {
      defineProperty$8(it, TO_STRING_TAG$4, {
        configurable: true,
        value: TAG
      });
    }
  };

  var getBuiltIn$j = getBuiltIn$m;
  var definePropertyModule$2 = objectDefineProperty;
  var wellKnownSymbol$l = wellKnownSymbol$s;
  var DESCRIPTORS$8 = descriptors;
  var SPECIES$2 = wellKnownSymbol$l('species');

  var setSpecies$3 = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn$j(CONSTRUCTOR_NAME);
    var defineProperty = definePropertyModule$2.f;

    if (DESCRIPTORS$8 && Constructor && !Constructor[SPECIES$2]) {
      defineProperty(Constructor, SPECIES$2, {
        configurable: true,
        get: function () {
          return this;
        }
      });
    }
  };

  var aFunction$J = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    }

    return it;
  };

  var anInstance$9 = function (it, Constructor, name) {
    if (!(it instanceof Constructor)) {
      throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
    }

    return it;
  };

  var iterate$I = {exports: {}};

  var iterators = {};

  var wellKnownSymbol$k = wellKnownSymbol$s;
  var Iterators$4 = iterators;
  var ITERATOR$6 = wellKnownSymbol$k('iterator');
  var ArrayPrototype$1 = Array.prototype; // check on default Array iterator

  var isArrayIteratorMethod$2 = function (it) {
    return it !== undefined && (Iterators$4.Array === it || ArrayPrototype$1[ITERATOR$6] === it);
  };

  var aFunction$I = aFunction$J; // optional / simple context binding

  var functionBindContext = function (fn, that, length) {
    aFunction$I(fn);
    if (that === undefined) return fn;

    switch (length) {
      case 0:
        return function () {
          return fn.call(that);
        };

      case 1:
        return function (a) {
          return fn.call(that, a);
        };

      case 2:
        return function (a, b) {
          return fn.call(that, a, b);
        };

      case 3:
        return function (a, b, c) {
          return fn.call(that, a, b, c);
        };
    }

    return function ()
    /* ...args */
    {
      return fn.apply(that, arguments);
    };
  };

  var classof$7 = classof$9;
  var Iterators$3 = iterators;
  var wellKnownSymbol$j = wellKnownSymbol$s;
  var ITERATOR$5 = wellKnownSymbol$j('iterator');

  var getIteratorMethod$7 = function (it) {
    if (it != undefined) return it[ITERATOR$5] || it['@@iterator'] || Iterators$3[classof$7(it)];
  };

  var anObject$1b = anObject$1e; // call something on iterator step with safe closing on error

  var callWithSafeIterationClosing$5 = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject$1b(value)[0], value[1]) : fn(value); // 7.4.6 IteratorClose(iterator, completion)
    } catch (error) {
      var returnMethod = iterator['return'];
      if (returnMethod !== undefined) anObject$1b(returnMethod.call(iterator));
      throw error;
    }
  };

  var anObject$1a = anObject$1e;
  var isArrayIteratorMethod$1 = isArrayIteratorMethod$2;
  var toLength$5 = toLength$8;
  var bind$j = functionBindContext;
  var getIteratorMethod$6 = getIteratorMethod$7;
  var callWithSafeIterationClosing$4 = callWithSafeIterationClosing$5;

  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var iterate$H = iterate$I.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
    var boundFunction = bind$j(fn, that, AS_ENTRIES ? 2 : 1);
    var iterator, iterFn, index, length, result, next, step;

    if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod$6(iterable);
      if (typeof iterFn != 'function') throw TypeError('Target is not iterable'); // optimisation for array iterators

      if (isArrayIteratorMethod$1(iterFn)) {
        for (index = 0, length = toLength$5(iterable.length); length > index; index++) {
          result = AS_ENTRIES ? boundFunction(anObject$1a(step = iterable[index])[0], step[1]) : boundFunction(iterable[index]);
          if (result && result instanceof Result) return result;
        }

        return new Result(false);
      }

      iterator = iterFn.call(iterable);
    }

    next = iterator.next;

    while (!(step = next.call(iterator)).done) {
      result = callWithSafeIterationClosing$4(iterator, boundFunction, step.value, AS_ENTRIES);
      if (typeof result == 'object' && result && result instanceof Result) return result;
    }

    return new Result(false);
  };

  iterate$H.stop = function (result) {
    return new Result(true, result);
  };

  var wellKnownSymbol$i = wellKnownSymbol$s;
  var ITERATOR$4 = wellKnownSymbol$i('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return {
          done: !!called++
        };
      },
      'return': function () {
        SAFE_CLOSING = true;
      }
    };

    iteratorWithReturn[ITERATOR$4] = function () {
      return this;
    }; // eslint-disable-next-line no-throw-literal


    Array.from(iteratorWithReturn, function () {
      throw 2;
    });
  } catch (error) {
    /* empty */
  }

  var checkCorrectnessOfIteration$2 = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;

    try {
      var object = {};

      object[ITERATOR$4] = function () {
        return {
          next: function () {
            return {
              done: ITERATION_SUPPORT = true
            };
          }
        };
      };

      exec(object);
    } catch (error) {
      /* empty */
    }

    return ITERATION_SUPPORT;
  };

  var anObject$19 = anObject$1e;
  var aFunction$H = aFunction$J;
  var wellKnownSymbol$h = wellKnownSymbol$s;
  var SPECIES$1 = wellKnownSymbol$h('species'); // `SpeciesConstructor` abstract operation
  // https://tc39.github.io/ecma262/#sec-speciesconstructor

  var speciesConstructor$b = function (O, defaultConstructor) {
    var C = anObject$19(O).constructor;
    var S;
    return C === undefined || (S = anObject$19(C)[SPECIES$1]) == undefined ? defaultConstructor : aFunction$H(S);
  };

  var getBuiltIn$i = getBuiltIn$m;
  var html$2 = getBuiltIn$i('document', 'documentElement');

  var userAgent = engineUserAgent;
  var engineIsIos = /(iphone|ipod|ipad).*applewebkit/i.test(userAgent);

  var global$d = global$q;
  var fails$8 = fails$g;
  var classof$6 = classofRaw$1;
  var bind$i = functionBindContext;
  var html$1 = html$2;
  var createElement = documentCreateElement$1;
  var IS_IOS$1 = engineIsIos;
  var location = global$d.location;
  var set = global$d.setImmediate;
  var clear = global$d.clearImmediate;
  var process$2 = global$d.process;
  var MessageChannel = global$d.MessageChannel;
  var Dispatch = global$d.Dispatch;
  var counter = 0;
  var queue = {};
  var ONREADYSTATECHANGE = 'onreadystatechange';
  var defer, channel, port;

  var run = function (id) {
    // eslint-disable-next-line no-prototype-builtins
    if (queue.hasOwnProperty(id)) {
      var fn = queue[id];
      delete queue[id];
      fn();
    }
  };

  var runner = function (id) {
    return function () {
      run(id);
    };
  };

  var listener = function (event) {
    run(event.data);
  };

  var post = function (id) {
    // old engines have not location.origin
    global$d.postMessage(id + '', location.protocol + '//' + location.host);
  }; // Node.js 0.9+ & IE10+ has setImmediate, otherwise:


  if (!set || !clear) {
    set = function setImmediate(fn) {
      var args = [];
      var i = 1;

      while (arguments.length > i) args.push(arguments[i++]);

      queue[++counter] = function () {
        // eslint-disable-next-line no-new-func
        (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
      };

      defer(counter);
      return counter;
    };

    clear = function clearImmediate(id) {
      delete queue[id];
    }; // Node.js 0.8-


    if (classof$6(process$2) == 'process') {
      defer = function (id) {
        process$2.nextTick(runner(id));
      }; // Sphere (JS game engine) Dispatch API

    } else if (Dispatch && Dispatch.now) {
      defer = function (id) {
        Dispatch.now(runner(id));
      }; // Browsers with MessageChannel, includes WebWorkers
      // except iOS - https://github.com/zloirock/core-js/issues/624

    } else if (MessageChannel && !IS_IOS$1) {
      channel = new MessageChannel();
      port = channel.port2;
      channel.port1.onmessage = listener;
      defer = bind$i(port.postMessage, port, 1); // Browsers with postMessage, skip WebWorkers
      // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (global$d.addEventListener && typeof postMessage == 'function' && !global$d.importScripts && !fails$8(post) && location.protocol !== 'file:') {
      defer = post;
      global$d.addEventListener('message', listener, false); // IE8-
    } else if (ONREADYSTATECHANGE in createElement('script')) {
      defer = function (id) {
        html$1.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
          html$1.removeChild(this);
          run(id);
        };
      }; // Rest old browsers

    } else {
      defer = function (id) {
        setTimeout(runner(id), 0);
      };
    }
  }

  var task$1 = {
    set: set,
    clear: clear
  };

  var global$c = global$q;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var classof$5 = classofRaw$1;
  var macrotask = task$1.set;
  var IS_IOS = engineIsIos;
  var MutationObserver = global$c.MutationObserver || global$c.WebKitMutationObserver;
  var process$1 = global$c.process;
  var Promise$4 = global$c.Promise;
  var IS_NODE$1 = classof$5(process$1) == 'process'; // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`

  var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global$c, 'queueMicrotask');
  var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
  var flush, head, last, notify$1, toggle, node, promise, then; // modern engines have queueMicrotask method

  if (!queueMicrotask) {
    flush = function () {
      var parent, fn;
      if (IS_NODE$1 && (parent = process$1.domain)) parent.exit();

      while (head) {
        fn = head.fn;
        head = head.next;

        try {
          fn();
        } catch (error) {
          if (head) notify$1();else last = undefined;
          throw error;
        }
      }

      last = undefined;
      if (parent) parent.enter();
    }; // Node.js


    if (IS_NODE$1) {
      notify$1 = function () {
        process$1.nextTick(flush);
      }; // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339

    } else if (MutationObserver && !IS_IOS) {
      toggle = true;
      node = document.createTextNode('');
      new MutationObserver(flush).observe(node, {
        characterData: true
      });

      notify$1 = function () {
        node.data = toggle = !toggle;
      }; // environments with maybe non-completely correct, but existent Promise

    } else if (Promise$4 && Promise$4.resolve) {
      // Promise.resolve without an argument throws an error in LG WebOS 2
      promise = Promise$4.resolve(undefined);
      then = promise.then;

      notify$1 = function () {
        then.call(promise, flush);
      }; // for other environments - macrotask based on:
      // - setImmediate
      // - MessageChannel
      // - window.postMessag
      // - onreadystatechange
      // - setTimeout

    } else {
      notify$1 = function () {
        // strange IE + webpack dev server bug - use .call(global)
        macrotask.call(global$c, flush);
      };
    }
  }

  var microtask$1 = queueMicrotask || function (fn) {
    var task = {
      fn: fn,
      next: undefined
    };
    if (last) last.next = task;

    if (!head) {
      head = task;
      notify$1();
    }

    last = task;
  };

  var newPromiseCapability$2 = {};

  var aFunction$G = aFunction$J;

  var PromiseCapability = function (C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = aFunction$G(resolve);
    this.reject = aFunction$G(reject);
  }; // 25.4.1.5 NewPromiseCapability(C)


  newPromiseCapability$2.f = function (C) {
    return new PromiseCapability(C);
  };

  var anObject$18 = anObject$1e;
  var isObject$b = isObject$i;
  var newPromiseCapability$1 = newPromiseCapability$2;

  var promiseResolve$1 = function (C, x) {
    anObject$18(C);
    if (isObject$b(x) && x.constructor === C) return x;
    var promiseCapability = newPromiseCapability$1.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  var global$b = global$q;

  var hostReportErrors$2 = function (a, b) {
    var console = global$b.console;

    if (console && console.error) {
      arguments.length === 1 ? console.error(a) : console.error(a, b);
    }
  };

  var perform$4 = function (exec) {
    try {
      return {
        error: false,
        value: exec()
      };
    } catch (error) {
      return {
        error: true,
        value: error
      };
    }
  };

  var $$1S = _export;
  var global$a = global$q;
  var getBuiltIn$h = getBuiltIn$m;
  var NativePromise = nativePromiseConstructor;
  var redefine$4 = redefine$8.exports;
  var redefineAll$7 = redefineAll$8;
  var setToStringTag$5 = setToStringTag$6;
  var setSpecies$2 = setSpecies$3;
  var isObject$a = isObject$i;
  var aFunction$F = aFunction$J;
  var anInstance$8 = anInstance$9;
  var classof$4 = classofRaw$1;
  var inspectSource = inspectSource$3;
  var iterate$G = iterate$I.exports;
  var checkCorrectnessOfIteration$1 = checkCorrectnessOfIteration$2;
  var speciesConstructor$a = speciesConstructor$b;
  var task = task$1.set;
  var microtask = microtask$1;
  var promiseResolve = promiseResolve$1;
  var hostReportErrors$1 = hostReportErrors$2;
  var newPromiseCapabilityModule$3 = newPromiseCapability$2;
  var perform$3 = perform$4;
  var InternalStateModule$e = internalState;
  var isForced$1 = isForced_1;
  var wellKnownSymbol$g = wellKnownSymbol$s;
  var V8_VERSION = engineV8Version;
  var SPECIES = wellKnownSymbol$g('species');
  var PROMISE = 'Promise';
  var getInternalState$9 = InternalStateModule$e.get;
  var setInternalState$e = InternalStateModule$e.set;
  var getInternalPromiseState = InternalStateModule$e.getterFor(PROMISE);
  var PromiseConstructor = NativePromise;
  var TypeError$1 = global$a.TypeError;
  var document$1 = global$a.document;
  var process = global$a.process;
  var $fetch$1 = getBuiltIn$h('fetch');
  var newPromiseCapability = newPromiseCapabilityModule$3.f;
  var newGenericPromiseCapability = newPromiseCapability;
  var IS_NODE = classof$4(process) == 'process';
  var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$a.dispatchEvent);
  var UNHANDLED_REJECTION = 'unhandledrejection';
  var REJECTION_HANDLED = 'rejectionhandled';
  var PENDING = 0;
  var FULFILLED = 1;
  var REJECTED = 2;
  var HANDLED = 1;
  var UNHANDLED = 2;
  var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;
  var FORCED$3 = isForced$1(PROMISE, function () {
    var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);

    if (!GLOBAL_CORE_JS_PROMISE) {
      // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // We can't detect it synchronously, so just check versions
      if (V8_VERSION === 66) return true; // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test

      if (!IS_NODE && typeof PromiseRejectionEvent != 'function') return true;
    } // We need Promise#finally in the pure version for preventing prototype pollution
    // deoptimization and performance degradation
    // https://github.com/zloirock/core-js/issues/679

    if (V8_VERSION >= 51 && /native code/.test(PromiseConstructor)) return false; // Detect correctness of subclassing with @@species support

    var promise = PromiseConstructor.resolve(1);

    var FakePromise = function (exec) {
      exec(function () {
        /* empty */
      }, function () {
        /* empty */
      });
    };

    var constructor = promise.constructor = {};
    constructor[SPECIES] = FakePromise;
    return !(promise.then(function () {
      /* empty */
    }) instanceof FakePromise);
  });
  var INCORRECT_ITERATION = FORCED$3 || !checkCorrectnessOfIteration$1(function (iterable) {
    PromiseConstructor.all(iterable)['catch'](function () {
      /* empty */
    });
  }); // helpers

  var isThenable = function (it) {
    var then;
    return isObject$a(it) && typeof (then = it.then) == 'function' ? then : false;
  };

  var notify = function (promise, state, isReject) {
    if (state.notified) return;
    state.notified = true;
    var chain = state.reactions;
    microtask(function () {
      var value = state.value;
      var ok = state.state == FULFILLED;
      var index = 0; // variable length - can't use forEach

      while (chain.length > index) {
        var reaction = chain[index++];
        var handler = ok ? reaction.ok : reaction.fail;
        var resolve = reaction.resolve;
        var reject = reaction.reject;
        var domain = reaction.domain;
        var result, then, exited;

        try {
          if (handler) {
            if (!ok) {
              if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
              state.rejection = HANDLED;
            }

            if (handler === true) result = value;else {
              if (domain) domain.enter();
              result = handler(value); // can throw

              if (domain) {
                domain.exit();
                exited = true;
              }
            }

            if (result === reaction.promise) {
              reject(TypeError$1('Promise-chain cycle'));
            } else if (then = isThenable(result)) {
              then.call(result, resolve, reject);
            } else resolve(result);
          } else reject(value);
        } catch (error) {
          if (domain && !exited) domain.exit();
          reject(error);
        }
      }

      state.reactions = [];
      state.notified = false;
      if (isReject && !state.rejection) onUnhandled(promise, state);
    });
  };

  var dispatchEvent = function (name, promise, reason) {
    var event, handler;

    if (DISPATCH_EVENT) {
      event = document$1.createEvent('Event');
      event.promise = promise;
      event.reason = reason;
      event.initEvent(name, false, true);
      global$a.dispatchEvent(event);
    } else event = {
      promise: promise,
      reason: reason
    };

    if (handler = global$a['on' + name]) handler(event);else if (name === UNHANDLED_REJECTION) hostReportErrors$1('Unhandled promise rejection', reason);
  };

  var onUnhandled = function (promise, state) {
    task.call(global$a, function () {
      var value = state.value;
      var IS_UNHANDLED = isUnhandled(state);
      var result;

      if (IS_UNHANDLED) {
        result = perform$3(function () {
          if (IS_NODE) {
            process.emit('unhandledRejection', value, promise);
          } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
        }); // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should

        state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
        if (result.error) throw result.value;
      }
    });
  };

  var isUnhandled = function (state) {
    return state.rejection !== HANDLED && !state.parent;
  };

  var onHandleUnhandled = function (promise, state) {
    task.call(global$a, function () {
      if (IS_NODE) {
        process.emit('rejectionHandled', promise);
      } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
    });
  };

  var bind$h = function (fn, promise, state, unwrap) {
    return function (value) {
      fn(promise, state, value, unwrap);
    };
  };

  var internalReject = function (promise, state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    state.value = value;
    state.state = REJECTED;
    notify(promise, state, true);
  };

  var internalResolve = function (promise, state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;

    try {
      if (promise === value) throw TypeError$1("Promise can't be resolved itself");
      var then = isThenable(value);

      if (then) {
        microtask(function () {
          var wrapper = {
            done: false
          };

          try {
            then.call(value, bind$h(internalResolve, promise, wrapper, state), bind$h(internalReject, promise, wrapper, state));
          } catch (error) {
            internalReject(promise, wrapper, error, state);
          }
        });
      } else {
        state.value = value;
        state.state = FULFILLED;
        notify(promise, state, false);
      }
    } catch (error) {
      internalReject(promise, {
        done: false
      }, error, state);
    }
  }; // constructor polyfill


  if (FORCED$3) {
    // 25.4.3.1 Promise(executor)
    PromiseConstructor = function Promise(executor) {
      anInstance$8(this, PromiseConstructor, PROMISE);
      aFunction$F(executor);
      Internal.call(this);
      var state = getInternalState$9(this);

      try {
        executor(bind$h(internalResolve, this, state), bind$h(internalReject, this, state));
      } catch (error) {
        internalReject(this, state, error);
      }
    }; // eslint-disable-next-line no-unused-vars


    Internal = function Promise(executor) {
      setInternalState$e(this, {
        type: PROMISE,
        done: false,
        notified: false,
        parent: false,
        reactions: [],
        rejection: false,
        state: PENDING,
        value: undefined
      });
    };

    Internal.prototype = redefineAll$7(PromiseConstructor.prototype, {
      // `Promise.prototype.then` method
      // https://tc39.github.io/ecma262/#sec-promise.prototype.then
      then: function then(onFulfilled, onRejected) {
        var state = getInternalPromiseState(this);
        var reaction = newPromiseCapability(speciesConstructor$a(this, PromiseConstructor));
        reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
        reaction.fail = typeof onRejected == 'function' && onRejected;
        reaction.domain = IS_NODE ? process.domain : undefined;
        state.parent = true;
        state.reactions.push(reaction);
        if (state.state != PENDING) notify(this, state, false);
        return reaction.promise;
      },
      // `Promise.prototype.catch` method
      // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
      'catch': function (onRejected) {
        return this.then(undefined, onRejected);
      }
    });

    OwnPromiseCapability = function () {
      var promise = new Internal();
      var state = getInternalState$9(promise);
      this.promise = promise;
      this.resolve = bind$h(internalResolve, promise, state);
      this.reject = bind$h(internalReject, promise, state);
    };

    newPromiseCapabilityModule$3.f = newPromiseCapability = function (C) {
      return C === PromiseConstructor || C === PromiseWrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
    };

    if (typeof NativePromise == 'function') {
      nativeThen = NativePromise.prototype.then; // wrap native Promise#then for native async functions

      redefine$4(NativePromise.prototype, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          nativeThen.call(that, resolve, reject);
        }).then(onFulfilled, onRejected); // https://github.com/zloirock/core-js/issues/640
      }, {
        unsafe: true
      }); // wrap fetch result

      if (typeof $fetch$1 == 'function') $$1S({
        global: true,
        enumerable: true,
        forced: true
      }, {
        // eslint-disable-next-line no-unused-vars
        fetch: function fetch(input
        /* , init */
        ) {
          return promiseResolve(PromiseConstructor, $fetch$1.apply(global$a, arguments));
        }
      });
    }
  }

  $$1S({
    global: true,
    wrap: true,
    forced: FORCED$3
  }, {
    Promise: PromiseConstructor
  });
  setToStringTag$5(PromiseConstructor, PROMISE, false);
  setSpecies$2(PROMISE);
  PromiseWrapper = getBuiltIn$h(PROMISE); // statics

  $$1S({
    target: PROMISE,
    stat: true,
    forced: FORCED$3
  }, {
    // `Promise.reject` method
    // https://tc39.github.io/ecma262/#sec-promise.reject
    reject: function reject(r) {
      var capability = newPromiseCapability(this);
      capability.reject.call(undefined, r);
      return capability.promise;
    }
  });
  $$1S({
    target: PROMISE,
    stat: true,
    forced: FORCED$3
  }, {
    // `Promise.resolve` method
    // https://tc39.github.io/ecma262/#sec-promise.resolve
    resolve: function resolve(x) {
      return promiseResolve(this, x);
    }
  });
  $$1S({
    target: PROMISE,
    stat: true,
    forced: INCORRECT_ITERATION
  }, {
    // `Promise.all` method
    // https://tc39.github.io/ecma262/#sec-promise.all
    all: function all(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = perform$3(function () {
        var $promiseResolve = aFunction$F(C.resolve);
        var values = [];
        var counter = 0;
        var remaining = 1;
        iterate$G(iterable, function (promise) {
          var index = counter++;
          var alreadyCalled = false;
          values.push(undefined);
          remaining++;
          $promiseResolve.call(C, promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[index] = value;
            --remaining || resolve(values);
          }, reject);
        });
        --remaining || resolve(values);
      });
      if (result.error) reject(result.value);
      return capability.promise;
    },
    // `Promise.race` method
    // https://tc39.github.io/ecma262/#sec-promise.race
    race: function race(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var reject = capability.reject;
      var result = perform$3(function () {
        var $promiseResolve = aFunction$F(C.resolve);
        iterate$G(iterable, function (promise) {
          $promiseResolve.call(C, promise).then(capability.resolve, reject);
        });
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

  var classof$3 = classofRaw$1; // `thisNumberValue` abstract operation
  // https://tc39.github.io/ecma262/#sec-thisnumbervalue

  var thisNumberValue$1 = function (value) {
    if (typeof value != 'number' && classof$3(value) != 'Number') {
      throw TypeError('Incorrect invocation');
    }

    return +value;
  };

  var toInteger$4 = toInteger$7;
  var requireObjectCoercible$5 = requireObjectCoercible$8; // `String.prototype.repeat` method implementation
  // https://tc39.github.io/ecma262/#sec-string.prototype.repeat

  var stringRepeat = ''.repeat || function repeat(count) {
    var str = String(requireObjectCoercible$5(this));
    var result = '';
    var n = toInteger$4(count);
    if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');

    for (; n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;

    return result;
  };

  var $$1R = _export;
  var toInteger$3 = toInteger$7;
  var thisNumberValue = thisNumberValue$1;
  var repeat = stringRepeat;
  var fails$7 = fails$g;
  var nativeToFixed = 1.0.toFixed;
  var floor$2 = Math.floor;

  var pow$2 = function (x, n, acc) {
    return n === 0 ? acc : n % 2 === 1 ? pow$2(x, n - 1, acc * x) : pow$2(x * x, n / 2, acc);
  };

  var log = function (x) {
    var n = 0;
    var x2 = x;

    while (x2 >= 4096) {
      n += 12;
      x2 /= 4096;
    }

    while (x2 >= 2) {
      n += 1;
      x2 /= 2;
    }

    return n;
  };

  var FORCED$2 = nativeToFixed && (0.00008.toFixed(3) !== '0.000' || 0.9.toFixed(0) !== '1' || 1.255.toFixed(2) !== '1.25' || 1000000000000000128.0.toFixed(0) !== '1000000000000000128') || !fails$7(function () {
    // V8 ~ Android 4.3-
    nativeToFixed.call({});
  }); // `Number.prototype.toFixed` method
  // https://tc39.github.io/ecma262/#sec-number.prototype.tofixed

  $$1R({
    target: 'Number',
    proto: true,
    forced: FORCED$2
  }, {
    // eslint-disable-next-line max-statements
    toFixed: function toFixed(fractionDigits) {
      var number = thisNumberValue(this);
      var fractDigits = toInteger$3(fractionDigits);
      var data = [0, 0, 0, 0, 0, 0];
      var sign = '';
      var result = '0';
      var e, z, j, k;

      var multiply = function (n, c) {
        var index = -1;
        var c2 = c;

        while (++index < 6) {
          c2 += n * data[index];
          data[index] = c2 % 1e7;
          c2 = floor$2(c2 / 1e7);
        }
      };

      var divide = function (n) {
        var index = 6;
        var c = 0;

        while (--index >= 0) {
          c += data[index];
          data[index] = floor$2(c / n);
          c = c % n * 1e7;
        }
      };

      var dataToString = function () {
        var index = 6;
        var s = '';

        while (--index >= 0) {
          if (s !== '' || index === 0 || data[index] !== 0) {
            var t = String(data[index]);
            s = s === '' ? t : s + repeat.call('0', 7 - t.length) + t;
          }
        }

        return s;
      };

      if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits'); // eslint-disable-next-line no-self-compare

      if (number != number) return 'NaN';
      if (number <= -1e21 || number >= 1e21) return String(number);

      if (number < 0) {
        sign = '-';
        number = -number;
      }

      if (number > 1e-21) {
        e = log(number * pow$2(2, 69, 1)) - 69;
        z = e < 0 ? number * pow$2(2, -e, 1) : number / pow$2(2, e, 1);
        z *= 0x10000000000000;
        e = 52 - e;

        if (e > 0) {
          multiply(0, z);
          j = fractDigits;

          while (j >= 7) {
            multiply(1e7, 0);
            j -= 7;
          }

          multiply(pow$2(10, j, 1), 0);
          j = e - 1;

          while (j >= 23) {
            divide(1 << 23);
            j -= 23;
          }

          divide(1 << j);
          multiply(1, 1);
          divide(2);
          result = dataToString();
        } else {
          multiply(0, z);
          multiply(1 << -e, 0);
          result = dataToString() + repeat.call('0', fractDigits);
        }
      }

      if (fractDigits > 0) {
        k = result.length;
        result = sign + (k <= fractDigits ? '0.' + repeat.call('0', fractDigits - k) + result : result.slice(0, k - fractDigits) + '.' + result.slice(k - fractDigits));
      } else {
        result = sign + result;
      }

      return result;
    }
  });

  var internalMetadata = {exports: {}};

  var fails$6 = fails$g;
  var freezing = !fails$6(function () {
    return Object.isExtensible(Object.preventExtensions({}));
  });

  var hiddenKeys$1 = hiddenKeys$5;
  var isObject$9 = isObject$i;
  var has$8 = has$g;
  var defineProperty$7 = objectDefineProperty.f;
  var uid = uid$3;
  var FREEZING = freezing;
  var METADATA = uid('meta');
  var id$1 = 0;

  var isExtensible$1 = Object.isExtensible || function () {
    return true;
  };

  var setMetadata = function (it) {
    defineProperty$7(it, METADATA, {
      value: {
        objectID: 'O' + ++id$1,
        // object ID
        weakData: {} // weak collections IDs

      }
    });
  };

  var fastKey$1 = function (it, create) {
    // return a primitive with prefix
    if (!isObject$9(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;

    if (!has$8(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible$1(it)) return 'F'; // not necessary to add metadata

      if (!create) return 'E'; // add missing metadata

      setMetadata(it); // return object ID
    }

    return it[METADATA].objectID;
  };

  var getWeakData$1 = function (it, create) {
    if (!has$8(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible$1(it)) return true; // not necessary to add metadata

      if (!create) return false; // add missing metadata

      setMetadata(it); // return the store of weak collections IDs
    }

    return it[METADATA].weakData;
  }; // add metadata on freeze-family methods calling


  var onFreeze = function (it) {
    if (FREEZING && meta.REQUIRED && isExtensible$1(it) && !has$8(it, METADATA)) setMetadata(it);
    return it;
  };

  var meta = internalMetadata.exports = {
    REQUIRED: false,
    fastKey: fastKey$1,
    getWeakData: getWeakData$1,
    onFreeze: onFreeze
  };
  hiddenKeys$1[METADATA] = true;

  var isObject$8 = isObject$i;

  var aPossiblePrototype$1 = function (it) {
    if (!isObject$8(it) && it !== null) {
      throw TypeError("Can't set " + String(it) + ' as a prototype');
    }

    return it;
  };

  var anObject$17 = anObject$1e;
  var aPossiblePrototype = aPossiblePrototype$1; // `Object.setPrototypeOf` method
  // https://tc39.github.io/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.

  /* eslint-disable no-proto */

  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;

    try {
      setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
      setter.call(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) {
      /* empty */
    }

    return function setPrototypeOf(O, proto) {
      anObject$17(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var isObject$7 = isObject$i;
  var setPrototypeOf$2 = objectSetPrototypeOf; // makes subclassing work correct for wrapped built-ins

  var inheritIfRequired$1 = function ($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if ( // it can work only with native `setPrototypeOf`
    setPrototypeOf$2 && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' && NewTarget !== Wrapper && isObject$7(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype) setPrototypeOf$2($this, NewTargetPrototype);
    return $this;
  };

  var $$1Q = _export;
  var global$9 = global$q;
  var isForced = isForced_1;
  var redefine$3 = redefine$8.exports;
  var InternalMetadataModule$1 = internalMetadata.exports;
  var iterate$F = iterate$I.exports;
  var anInstance$7 = anInstance$9;
  var isObject$6 = isObject$i;
  var fails$5 = fails$g;
  var checkCorrectnessOfIteration = checkCorrectnessOfIteration$2;
  var setToStringTag$4 = setToStringTag$6;
  var inheritIfRequired = inheritIfRequired$1;

  var collection$3 = function (CONSTRUCTOR_NAME, wrapper, common) {
    var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
    var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
    var ADDER = IS_MAP ? 'set' : 'add';
    var NativeConstructor = global$9[CONSTRUCTOR_NAME];
    var NativePrototype = NativeConstructor && NativeConstructor.prototype;
    var Constructor = NativeConstructor;
    var exported = {};

    var fixMethod = function (KEY) {
      var nativeMethod = NativePrototype[KEY];
      redefine$3(NativePrototype, KEY, KEY == 'add' ? function add(value) {
        nativeMethod.call(this, value === 0 ? 0 : value);
        return this;
      } : KEY == 'delete' ? function (key) {
        return IS_WEAK && !isObject$6(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'get' ? function get(key) {
        return IS_WEAK && !isObject$6(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'has' ? function has(key) {
        return IS_WEAK && !isObject$6(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        nativeMethod.call(this, key === 0 ? 0 : key, value);
        return this;
      });
    }; // eslint-disable-next-line max-len


    if (isForced(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails$5(function () {
      new NativeConstructor().entries().next();
    })))) {
      // create collection constructor
      Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
      InternalMetadataModule$1.REQUIRED = true;
    } else if (isForced(CONSTRUCTOR_NAME, true)) {
      var instance = new Constructor(); // early implementations not supports chaining

      var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance; // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false

      var THROWS_ON_PRIMITIVES = fails$5(function () {
        instance.has(1);
      }); // most early implementations doesn't supports iterables, most modern - not close it correctly
      // eslint-disable-next-line no-new

      var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) {
        new NativeConstructor(iterable);
      }); // for early implementations -0 and +0 not the same

      var BUGGY_ZERO = !IS_WEAK && fails$5(function () {
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new NativeConstructor();
        var index = 5;

        while (index--) $instance[ADDER](index, index);

        return !$instance.has(-0);
      });

      if (!ACCEPT_ITERABLES) {
        Constructor = wrapper(function (dummy, iterable) {
          anInstance$7(dummy, Constructor, CONSTRUCTOR_NAME);
          var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
          if (iterable != undefined) iterate$F(iterable, that[ADDER], that, IS_MAP);
          return that;
        });
        Constructor.prototype = NativePrototype;
        NativePrototype.constructor = Constructor;
      }

      if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
        fixMethod('delete');
        fixMethod('has');
        IS_MAP && fixMethod('get');
      }

      if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER); // weak collections should not contains .clear method

      if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
    }

    exported[CONSTRUCTOR_NAME] = Constructor;
    $$1Q({
      global: true,
      forced: Constructor != NativeConstructor
    }, exported);
    setToStringTag$4(Constructor, CONSTRUCTOR_NAME);
    if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
    return Constructor;
  };

  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys$1 = enumBugKeys$3; // `Object.keys` method
  // https://tc39.github.io/ecma262/#sec-object.keys

  var objectKeys$3 = Object.keys || function keys(O) {
    return internalObjectKeys(O, enumBugKeys$1);
  };

  var DESCRIPTORS$7 = descriptors;
  var definePropertyModule$1 = objectDefineProperty;
  var anObject$16 = anObject$1e;
  var objectKeys$2 = objectKeys$3; // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties

  var objectDefineProperties = DESCRIPTORS$7 ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$16(O);
    var keys = objectKeys$2(Properties);
    var length = keys.length;
    var index = 0;
    var key;

    while (length > index) definePropertyModule$1.f(O, key = keys[index++], Properties[key]);

    return O;
  };

  var anObject$15 = anObject$1e;
  var defineProperties$1 = objectDefineProperties;
  var enumBugKeys = enumBugKeys$3;
  var hiddenKeys = hiddenKeys$5;
  var html = html$2;
  var documentCreateElement = documentCreateElement$1;
  var sharedKey$1 = sharedKey$3;
  var GT = '>';
  var LT = '<';
  var PROTOTYPE = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO$1 = sharedKey$1('IE_PROTO');

  var EmptyConstructor = function () {
    /* empty */
  };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  }; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak

    return temp;
  }; // Create object with fake `null` prototype: use iframe Object with cleared prototype


  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  }; // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug


  var activeXDocument;

  var NullProtoObject = function () {
    try {
      /* global ActiveXObject */
      activeXDocument = document.domain && new ActiveXObject('htmlfile');
    } catch (error) {
      /* ignore */
    }

    NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
    var length = enumBugKeys.length;

    while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];

    return NullProtoObject();
  };

  hiddenKeys[IE_PROTO$1] = true; // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create

  var objectCreate = Object.create || function create(O, Properties) {
    var result;

    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject$15(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();

    return Properties === undefined ? result : defineProperties$1(result, Properties);
  };

  var fails$4 = fails$g;
  var correctPrototypeGetter = !fails$4(function () {
    function F() {
      /* empty */
    }

    F.prototype.constructor = null;
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var has$7 = has$g;
  var toObject$8 = toObject$a;
  var sharedKey = sharedKey$3;
  var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;
  var IE_PROTO = sharedKey('IE_PROTO');
  var ObjectPrototype = Object.prototype; // `Object.getPrototypeOf` method
  // https://tc39.github.io/ecma262/#sec-object.getprototypeof

  var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
    O = toObject$8(O);
    if (has$7(O, IE_PROTO)) return O[IE_PROTO];

    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    }

    return O instanceof Object ? ObjectPrototype : null;
  };

  var getPrototypeOf$6 = objectGetPrototypeOf;
  var createNonEnumerableProperty$9 = createNonEnumerableProperty$e;
  var has$6 = has$g;
  var wellKnownSymbol$f = wellKnownSymbol$s;
  var ITERATOR$3 = wellKnownSymbol$f('iterator');
  var BUGGY_SAFARI_ITERATORS$1 = false;

  var returnThis$2 = function () {
    return this;
  }; // `%IteratorPrototype%` object
  // https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object


  var IteratorPrototype$3, PrototypeOfArrayIteratorPrototype, arrayIterator;

  if ([].keys) {
    arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`

    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;else {
      PrototypeOfArrayIteratorPrototype = getPrototypeOf$6(getPrototypeOf$6(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$3 = PrototypeOfArrayIteratorPrototype;
    }
  }

  if (IteratorPrototype$3 == undefined) IteratorPrototype$3 = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

  if (!has$6(IteratorPrototype$3, ITERATOR$3)) {
    createNonEnumerableProperty$9(IteratorPrototype$3, ITERATOR$3, returnThis$2);
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$3,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };

  var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
  var create$8 = objectCreate;
  var createPropertyDescriptor$2 = createPropertyDescriptor$6;
  var setToStringTag$3 = setToStringTag$6;
  var Iterators$2 = iterators;

  var returnThis$1 = function () {
    return this;
  };

  var createIteratorConstructor$6 = function (IteratorConstructor, NAME, next) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create$8(IteratorPrototype$2, {
      next: createPropertyDescriptor$2(1, next)
    });
    setToStringTag$3(IteratorConstructor, TO_STRING_TAG, false);
    Iterators$2[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var $$1P = _export;
  var createIteratorConstructor$5 = createIteratorConstructor$6;
  var getPrototypeOf$5 = objectGetPrototypeOf;
  var setPrototypeOf$1 = objectSetPrototypeOf;
  var setToStringTag$2 = setToStringTag$6;
  var createNonEnumerableProperty$8 = createNonEnumerableProperty$e;
  var redefine$2 = redefine$8.exports;
  var wellKnownSymbol$e = wellKnownSymbol$s;
  var Iterators$1 = iterators;
  var IteratorsCore = iteratorsCore;
  var IteratorPrototype$1 = IteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$2 = wellKnownSymbol$e('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis = function () {
    return this;
  };

  var defineIterator$3 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor$5(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];

      switch (KIND) {
        case KEYS:
          return function keys() {
            return new IteratorConstructor(this, KIND);
          };

        case VALUES:
          return function values() {
            return new IteratorConstructor(this, KIND);
          };

        case ENTRIES:
          return function entries() {
            return new IteratorConstructor(this, KIND);
          };
      }

      return function () {
        return new IteratorConstructor(this);
      };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR$2] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY; // fix native

    if (anyNativeIterator) {
      CurrentIteratorPrototype = getPrototypeOf$5(anyNativeIterator.call(new Iterable()));

      if (IteratorPrototype$1 !== Object.prototype && CurrentIteratorPrototype.next) {
        if (getPrototypeOf$5(CurrentIteratorPrototype) !== IteratorPrototype$1) {
          if (setPrototypeOf$1) {
            setPrototypeOf$1(CurrentIteratorPrototype, IteratorPrototype$1);
          } else if (typeof CurrentIteratorPrototype[ITERATOR$2] != 'function') {
            createNonEnumerableProperty$8(CurrentIteratorPrototype, ITERATOR$2, returnThis);
          }
        } // Set @@toStringTag to native iterators


        setToStringTag$2(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    } // fix Array#{values, @@iterator}.name in V8 / FF


    if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      INCORRECT_VALUES_NAME = true;

      defaultIterator = function values() {
        return nativeIterator.call(this);
      };
    } // define iterator


    if (IterablePrototype[ITERATOR$2] !== defaultIterator) {
      createNonEnumerableProperty$8(IterablePrototype, ITERATOR$2, defaultIterator);
    }

    Iterators$1[NAME] = defaultIterator; // export additional methods

    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          redefine$2(IterablePrototype, KEY, methods[KEY]);
        }
      } else $$1P({
        target: NAME,
        proto: true,
        forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
      }, methods);
    }

    return methods;
  };

  var defineProperty$6 = objectDefineProperty.f;
  var create$7 = objectCreate;
  var redefineAll$6 = redefineAll$8;
  var bind$g = functionBindContext;
  var anInstance$6 = anInstance$9;
  var iterate$E = iterate$I.exports;
  var defineIterator$2 = defineIterator$3;
  var setSpecies$1 = setSpecies$3;
  var DESCRIPTORS$6 = descriptors;
  var fastKey = internalMetadata.exports.fastKey;
  var InternalStateModule$d = internalState;
  var setInternalState$d = InternalStateModule$d.set;
  var internalStateGetterFor$1 = InternalStateModule$d.getterFor;
  var collectionStrong$2 = {
    getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var C = wrapper(function (that, iterable) {
        anInstance$6(that, C, CONSTRUCTOR_NAME);
        setInternalState$d(that, {
          type: CONSTRUCTOR_NAME,
          index: create$7(null),
          first: undefined,
          last: undefined,
          size: 0
        });
        if (!DESCRIPTORS$6) that.size = 0;
        if (iterable != undefined) iterate$E(iterable, that[ADDER], that, IS_MAP);
      });
      var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);

      var define = function (that, key, value) {
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        var previous, index; // change existing entry

        if (entry) {
          entry.value = value; // create new entry
        } else {
          state.last = entry = {
            index: index = fastKey(key, true),
            key: key,
            value: value,
            previous: previous = state.last,
            next: undefined,
            removed: false
          };
          if (!state.first) state.first = entry;
          if (previous) previous.next = entry;
          if (DESCRIPTORS$6) state.size++;else that.size++; // add to index

          if (index !== 'F') state.index[index] = entry;
        }

        return that;
      };

      var getEntry = function (that, key) {
        var state = getInternalState(that); // fast case

        var index = fastKey(key);
        var entry;
        if (index !== 'F') return state.index[index]; // frozen object case

        for (entry = state.first; entry; entry = entry.next) {
          if (entry.key == key) return entry;
        }
      };

      redefineAll$6(C.prototype, {
        // 23.1.3.1 Map.prototype.clear()
        // 23.2.3.2 Set.prototype.clear()
        clear: function clear() {
          var that = this;
          var state = getInternalState(that);
          var data = state.index;
          var entry = state.first;

          while (entry) {
            entry.removed = true;
            if (entry.previous) entry.previous = entry.previous.next = undefined;
            delete data[entry.index];
            entry = entry.next;
          }

          state.first = state.last = undefined;
          if (DESCRIPTORS$6) state.size = 0;else that.size = 0;
        },
        // 23.1.3.3 Map.prototype.delete(key)
        // 23.2.3.4 Set.prototype.delete(value)
        'delete': function (key) {
          var that = this;
          var state = getInternalState(that);
          var entry = getEntry(that, key);

          if (entry) {
            var next = entry.next;
            var prev = entry.previous;
            delete state.index[entry.index];
            entry.removed = true;
            if (prev) prev.next = next;
            if (next) next.previous = prev;
            if (state.first == entry) state.first = next;
            if (state.last == entry) state.last = prev;
            if (DESCRIPTORS$6) state.size--;else that.size--;
          }

          return !!entry;
        },
        // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
        // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
        forEach: function forEach(callbackfn
        /* , that = undefined */
        ) {
          var state = getInternalState(this);
          var boundFunction = bind$g(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
          var entry;

          while (entry = entry ? entry.next : state.first) {
            boundFunction(entry.value, entry.key, this); // revert to the last existing entry

            while (entry && entry.removed) entry = entry.previous;
          }
        },
        // 23.1.3.7 Map.prototype.has(key)
        // 23.2.3.7 Set.prototype.has(value)
        has: function has(key) {
          return !!getEntry(this, key);
        }
      });
      redefineAll$6(C.prototype, IS_MAP ? {
        // 23.1.3.6 Map.prototype.get(key)
        get: function get(key) {
          var entry = getEntry(this, key);
          return entry && entry.value;
        },
        // 23.1.3.9 Map.prototype.set(key, value)
        set: function set(key, value) {
          return define(this, key === 0 ? 0 : key, value);
        }
      } : {
        // 23.2.3.1 Set.prototype.add(value)
        add: function add(value) {
          return define(this, value = value === 0 ? 0 : value, value);
        }
      });
      if (DESCRIPTORS$6) defineProperty$6(C.prototype, 'size', {
        get: function () {
          return getInternalState(this).size;
        }
      });
      return C;
    },
    setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
      var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
      var getInternalCollectionState = internalStateGetterFor$1(CONSTRUCTOR_NAME);
      var getInternalIteratorState = internalStateGetterFor$1(ITERATOR_NAME); // add .keys, .values, .entries, [@@iterator]
      // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11

      defineIterator$2(C, CONSTRUCTOR_NAME, function (iterated, kind) {
        setInternalState$d(this, {
          type: ITERATOR_NAME,
          target: iterated,
          state: getInternalCollectionState(iterated),
          kind: kind,
          last: undefined
        });
      }, function () {
        var state = getInternalIteratorState(this);
        var kind = state.kind;
        var entry = state.last; // revert to the last existing entry

        while (entry && entry.removed) entry = entry.previous; // get next entry


        if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
          // or finish the iteration
          state.target = undefined;
          return {
            value: undefined,
            done: true
          };
        } // return step by kind


        if (kind == 'keys') return {
          value: entry.key,
          done: false
        };
        if (kind == 'values') return {
          value: entry.value,
          done: false
        };
        return {
          value: [entry.key, entry.value],
          done: false
        };
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true); // add [@@species], 23.1.2.2, 23.2.2.2

      setSpecies$1(CONSTRUCTOR_NAME);
    }
  };

  var collection$2 = collection$3;
  var collectionStrong$1 = collectionStrong$2; // `Map` constructor
  // https://tc39.github.io/ecma262/#sec-map-objects

  var es_map = collection$2('Map', function (init) {
    return function Map() {
      return init(this, arguments.length ? arguments[0] : undefined);
    };
  }, collectionStrong$1);

  var es_weakMap = {exports: {}};

  var bind$f = functionBindContext;
  var IndexedObject$1 = indexedObject;
  var toObject$7 = toObject$a;
  var toLength$4 = toLength$8;
  var arraySpeciesCreate = arraySpeciesCreate$2;
  var push$2 = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation

  var createMethod$3 = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject$7($this);
      var self = IndexedObject$1(O);
      var boundFunction = bind$f(callbackfn, that, 3);
      var length = toLength$4(self.length);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
      var value, result;

      for (; length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);

        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
              case 3:
                return true;
              // some

              case 5:
                return value;
              // find

              case 6:
                return index;
              // findIndex

              case 2:
                push$2.call(target, value);
              // filter
            } else if (IS_EVERY) return false; // every
        }
      }

      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$3(0),
    // `Array.prototype.map` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.map
    map: createMethod$3(1),
    // `Array.prototype.filter` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.filter
    filter: createMethod$3(2),
    // `Array.prototype.some` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.some
    some: createMethod$3(3),
    // `Array.prototype.every` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.every
    every: createMethod$3(4),
    // `Array.prototype.find` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.find
    find: createMethod$3(5),
    // `Array.prototype.findIndex` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$3(6)
  };

  var redefineAll$5 = redefineAll$8;
  var getWeakData = internalMetadata.exports.getWeakData;
  var anObject$14 = anObject$1e;
  var isObject$5 = isObject$i;
  var anInstance$5 = anInstance$9;
  var iterate$D = iterate$I.exports;
  var ArrayIterationModule = arrayIteration;
  var $has = has$g;
  var InternalStateModule$c = internalState;
  var setInternalState$c = InternalStateModule$c.set;
  var internalStateGetterFor = InternalStateModule$c.getterFor;
  var find$1 = ArrayIterationModule.find;
  var findIndex = ArrayIterationModule.findIndex;
  var id = 0; // fallback for uncaught frozen keys

  var uncaughtFrozenStore = function (store) {
    return store.frozen || (store.frozen = new UncaughtFrozenStore());
  };

  var UncaughtFrozenStore = function () {
    this.entries = [];
  };

  var findUncaughtFrozen = function (store, key) {
    return find$1(store.entries, function (it) {
      return it[0] === key;
    });
  };

  UncaughtFrozenStore.prototype = {
    get: function (key) {
      var entry = findUncaughtFrozen(this, key);
      if (entry) return entry[1];
    },
    has: function (key) {
      return !!findUncaughtFrozen(this, key);
    },
    set: function (key, value) {
      var entry = findUncaughtFrozen(this, key);
      if (entry) entry[1] = value;else this.entries.push([key, value]);
    },
    'delete': function (key) {
      var index = findIndex(this.entries, function (it) {
        return it[0] === key;
      });
      if (~index) this.entries.splice(index, 1);
      return !!~index;
    }
  };
  var collectionWeak$1 = {
    getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var C = wrapper(function (that, iterable) {
        anInstance$5(that, C, CONSTRUCTOR_NAME);
        setInternalState$c(that, {
          type: CONSTRUCTOR_NAME,
          id: id++,
          frozen: undefined
        });
        if (iterable != undefined) iterate$D(iterable, that[ADDER], that, IS_MAP);
      });
      var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

      var define = function (that, key, value) {
        var state = getInternalState(that);
        var data = getWeakData(anObject$14(key), true);
        if (data === true) uncaughtFrozenStore(state).set(key, value);else data[state.id] = value;
        return that;
      };

      redefineAll$5(C.prototype, {
        // 23.3.3.2 WeakMap.prototype.delete(key)
        // 23.4.3.3 WeakSet.prototype.delete(value)
        'delete': function (key) {
          var state = getInternalState(this);
          if (!isObject$5(key)) return false;
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state)['delete'](key);
          return data && $has(data, state.id) && delete data[state.id];
        },
        // 23.3.3.4 WeakMap.prototype.has(key)
        // 23.4.3.4 WeakSet.prototype.has(value)
        has: function has(key) {
          var state = getInternalState(this);
          if (!isObject$5(key)) return false;
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).has(key);
          return data && $has(data, state.id);
        }
      });
      redefineAll$5(C.prototype, IS_MAP ? {
        // 23.3.3.3 WeakMap.prototype.get(key)
        get: function get(key) {
          var state = getInternalState(this);

          if (isObject$5(key)) {
            var data = getWeakData(key);
            if (data === true) return uncaughtFrozenStore(state).get(key);
            return data ? data[state.id] : undefined;
          }
        },
        // 23.3.3.5 WeakMap.prototype.set(key, value)
        set: function set(key, value) {
          return define(this, key, value);
        }
      } : {
        // 23.4.3.1 WeakSet.prototype.add(value)
        add: function add(value) {
          return define(this, value, true);
        }
      });
      return C;
    }
  };

  var global$8 = global$q;
  var redefineAll$4 = redefineAll$8;
  var InternalMetadataModule = internalMetadata.exports;
  var collection$1 = collection$3;
  var collectionWeak = collectionWeak$1;
  var isObject$4 = isObject$i;
  var enforceIternalState = internalState.enforce;
  var NATIVE_WEAK_MAP = nativeWeakMap;
  var IS_IE11 = !global$8.ActiveXObject && 'ActiveXObject' in global$8;
  var isExtensible = Object.isExtensible;
  var InternalWeakMap;

  var wrapper = function (init) {
    return function WeakMap() {
      return init(this, arguments.length ? arguments[0] : undefined);
    };
  }; // `WeakMap` constructor
  // https://tc39.github.io/ecma262/#sec-weakmap-constructor


  var $WeakMap = es_weakMap.exports = collection$1('WeakMap', wrapper, collectionWeak); // IE11 WeakMap frozen keys fix
  // We can't use feature detection because it crash some old IE builds
  // https://github.com/zloirock/core-js/issues/485

  if (NATIVE_WEAK_MAP && IS_IE11) {
    InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
    InternalMetadataModule.REQUIRED = true;
    var WeakMapPrototype = $WeakMap.prototype;
    var nativeDelete = WeakMapPrototype['delete'];
    var nativeHas = WeakMapPrototype.has;
    var nativeGet = WeakMapPrototype.get;
    var nativeSet = WeakMapPrototype.set;
    redefineAll$4(WeakMapPrototype, {
      'delete': function (key) {
        if (isObject$4(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeDelete.call(this, key) || state.frozen['delete'](key);
        }

        return nativeDelete.call(this, key);
      },
      has: function has(key) {
        if (isObject$4(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeHas.call(this, key) || state.frozen.has(key);
        }

        return nativeHas.call(this, key);
      },
      get: function get(key) {
        if (isObject$4(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
        }

        return nativeGet.call(this, key);
      },
      set: function set(key, value) {
        if (isObject$4(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
        } else nativeSet.call(this, key, value);

        return this;
      }
    });
  }

  var Map$2 = es_map;
  var WeakMap$1 = es_weakMap.exports;
  var shared$1 = shared$4.exports;
  var metadata = shared$1('metadata');
  var store$1 = metadata.store || (metadata.store = new WeakMap$1());

  var getOrCreateMetadataMap$1 = function (target, targetKey, create) {
    var targetMetadata = store$1.get(target);

    if (!targetMetadata) {
      if (!create) return;
      store$1.set(target, targetMetadata = new Map$2());
    }

    var keyMetadata = targetMetadata.get(targetKey);

    if (!keyMetadata) {
      if (!create) return;
      targetMetadata.set(targetKey, keyMetadata = new Map$2());
    }

    return keyMetadata;
  };

  var ordinaryHasOwnMetadata$3 = function (MetadataKey, O, P) {
    var metadataMap = getOrCreateMetadataMap$1(O, P, false);
    return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
  };

  var ordinaryGetOwnMetadata$2 = function (MetadataKey, O, P) {
    var metadataMap = getOrCreateMetadataMap$1(O, P, false);
    return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
  };

  var ordinaryDefineOwnMetadata$2 = function (MetadataKey, MetadataValue, O, P) {
    getOrCreateMetadataMap$1(O, P, true).set(MetadataKey, MetadataValue);
  };

  var ordinaryOwnMetadataKeys$2 = function (target, targetKey) {
    var metadataMap = getOrCreateMetadataMap$1(target, targetKey, false);
    var keys = [];
    if (metadataMap) metadataMap.forEach(function (_, key) {
      keys.push(key);
    });
    return keys;
  };

  var toMetadataKey$9 = function (it) {
    return it === undefined || typeof it == 'symbol' ? it : String(it);
  };

  var reflectMetadata = {
    store: store$1,
    getMap: getOrCreateMetadataMap$1,
    has: ordinaryHasOwnMetadata$3,
    get: ordinaryGetOwnMetadata$2,
    set: ordinaryDefineOwnMetadata$2,
    keys: ordinaryOwnMetadataKeys$2,
    toKey: toMetadataKey$9
  };

  var $$1O = _export;
  var ReflectMetadataModule$8 = reflectMetadata;
  var anObject$13 = anObject$1e;
  var toMetadataKey$8 = ReflectMetadataModule$8.toKey;
  var ordinaryDefineOwnMetadata$1 = ReflectMetadataModule$8.set; // `Reflect.defineMetadata` method
  // https://github.com/rbuckton/reflect-metadata

  $$1O({
    target: 'Reflect',
    stat: true
  }, {
    defineMetadata: function defineMetadata(metadataKey, metadataValue, target
    /* , targetKey */
    ) {
      var targetKey = arguments.length < 4 ? undefined : toMetadataKey$8(arguments[3]);
      ordinaryDefineOwnMetadata$1(metadataKey, metadataValue, anObject$13(target), targetKey);
    }
  });

  var $$1N = _export;
  var ReflectMetadataModule$7 = reflectMetadata;
  var anObject$12 = anObject$1e;
  var toMetadataKey$7 = ReflectMetadataModule$7.toKey;
  var getOrCreateMetadataMap = ReflectMetadataModule$7.getMap;
  var store = ReflectMetadataModule$7.store; // `Reflect.deleteMetadata` method
  // https://github.com/rbuckton/reflect-metadata

  $$1N({
    target: 'Reflect',
    stat: true
  }, {
    deleteMetadata: function deleteMetadata(metadataKey, target
    /* , targetKey */
    ) {
      var targetKey = arguments.length < 3 ? undefined : toMetadataKey$7(arguments[2]);
      var metadataMap = getOrCreateMetadataMap(anObject$12(target), targetKey, false);
      if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
      if (metadataMap.size) return true;
      var targetMetadata = store.get(target);
      targetMetadata['delete'](targetKey);
      return !!targetMetadata.size || store['delete'](target);
    }
  });

  var $$1M = _export;
  var ReflectMetadataModule$6 = reflectMetadata;
  var anObject$11 = anObject$1e;
  var getPrototypeOf$4 = objectGetPrototypeOf;
  var ordinaryHasOwnMetadata$2 = ReflectMetadataModule$6.has;
  var ordinaryGetOwnMetadata$1 = ReflectMetadataModule$6.get;
  var toMetadataKey$6 = ReflectMetadataModule$6.toKey;

  var ordinaryGetMetadata = function (MetadataKey, O, P) {
    var hasOwn = ordinaryHasOwnMetadata$2(MetadataKey, O, P);
    if (hasOwn) return ordinaryGetOwnMetadata$1(MetadataKey, O, P);
    var parent = getPrototypeOf$4(O);
    return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
  }; // `Reflect.getMetadata` method
  // https://github.com/rbuckton/reflect-metadata


  $$1M({
    target: 'Reflect',
    stat: true
  }, {
    getMetadata: function getMetadata(metadataKey, target
    /* , targetKey */
    ) {
      var targetKey = arguments.length < 3 ? undefined : toMetadataKey$6(arguments[2]);
      return ordinaryGetMetadata(metadataKey, anObject$11(target), targetKey);
    }
  });

  var collection = collection$3;
  var collectionStrong = collectionStrong$2; // `Set` constructor
  // https://tc39.github.io/ecma262/#sec-set-objects

  var es_set = collection('Set', function (init) {
    return function Set() {
      return init(this, arguments.length ? arguments[0] : undefined);
    };
  }, collectionStrong);

  var $$1L = _export; // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

  var Set$1 = es_set;
  var ReflectMetadataModule$5 = reflectMetadata;
  var anObject$10 = anObject$1e;
  var getPrototypeOf$3 = objectGetPrototypeOf;
  var iterate$C = iterate$I.exports;
  var ordinaryOwnMetadataKeys$1 = ReflectMetadataModule$5.keys;
  var toMetadataKey$5 = ReflectMetadataModule$5.toKey;

  var from$4 = function (iter) {
    var result = [];
    iterate$C(iter, result.push, result);
    return result;
  };

  var ordinaryMetadataKeys = function (O, P) {
    var oKeys = ordinaryOwnMetadataKeys$1(O, P);
    var parent = getPrototypeOf$3(O);
    if (parent === null) return oKeys;
    var pKeys = ordinaryMetadataKeys(parent, P);
    return pKeys.length ? oKeys.length ? from$4(new Set$1(oKeys.concat(pKeys))) : pKeys : oKeys;
  }; // `Reflect.getMetadataKeys` method
  // https://github.com/rbuckton/reflect-metadata


  $$1L({
    target: 'Reflect',
    stat: true
  }, {
    getMetadataKeys: function getMetadataKeys(target
    /* , targetKey */
    ) {
      var targetKey = arguments.length < 2 ? undefined : toMetadataKey$5(arguments[1]);
      return ordinaryMetadataKeys(anObject$10(target), targetKey);
    }
  });

  var $$1K = _export;
  var ReflectMetadataModule$4 = reflectMetadata;
  var anObject$$ = anObject$1e;
  var ordinaryGetOwnMetadata = ReflectMetadataModule$4.get;
  var toMetadataKey$4 = ReflectMetadataModule$4.toKey; // `Reflect.getOwnMetadata` method
  // https://github.com/rbuckton/reflect-metadata

  $$1K({
    target: 'Reflect',
    stat: true
  }, {
    getOwnMetadata: function getOwnMetadata(metadataKey, target
    /* , targetKey */
    ) {
      var targetKey = arguments.length < 3 ? undefined : toMetadataKey$4(arguments[2]);
      return ordinaryGetOwnMetadata(metadataKey, anObject$$(target), targetKey);
    }
  });

  var $$1J = _export;
  var ReflectMetadataModule$3 = reflectMetadata;
  var anObject$_ = anObject$1e;
  var ordinaryOwnMetadataKeys = ReflectMetadataModule$3.keys;
  var toMetadataKey$3 = ReflectMetadataModule$3.toKey; // `Reflect.getOwnMetadataKeys` method
  // https://github.com/rbuckton/reflect-metadata

  $$1J({
    target: 'Reflect',
    stat: true
  }, {
    getOwnMetadataKeys: function getOwnMetadataKeys(target
    /* , targetKey */
    ) {
      var targetKey = arguments.length < 2 ? undefined : toMetadataKey$3(arguments[1]);
      return ordinaryOwnMetadataKeys(anObject$_(target), targetKey);
    }
  });

  var $$1I = _export;
  var ReflectMetadataModule$2 = reflectMetadata;
  var anObject$Z = anObject$1e;
  var getPrototypeOf$2 = objectGetPrototypeOf;
  var ordinaryHasOwnMetadata$1 = ReflectMetadataModule$2.has;
  var toMetadataKey$2 = ReflectMetadataModule$2.toKey;

  var ordinaryHasMetadata = function (MetadataKey, O, P) {
    var hasOwn = ordinaryHasOwnMetadata$1(MetadataKey, O, P);
    if (hasOwn) return true;
    var parent = getPrototypeOf$2(O);
    return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
  }; // `Reflect.hasMetadata` method
  // https://github.com/rbuckton/reflect-metadata


  $$1I({
    target: 'Reflect',
    stat: true
  }, {
    hasMetadata: function hasMetadata(metadataKey, target
    /* , targetKey */
    ) {
      var targetKey = arguments.length < 3 ? undefined : toMetadataKey$2(arguments[2]);
      return ordinaryHasMetadata(metadataKey, anObject$Z(target), targetKey);
    }
  });

  var $$1H = _export;
  var ReflectMetadataModule$1 = reflectMetadata;
  var anObject$Y = anObject$1e;
  var ordinaryHasOwnMetadata = ReflectMetadataModule$1.has;
  var toMetadataKey$1 = ReflectMetadataModule$1.toKey; // `Reflect.hasOwnMetadata` method
  // https://github.com/rbuckton/reflect-metadata

  $$1H({
    target: 'Reflect',
    stat: true
  }, {
    hasOwnMetadata: function hasOwnMetadata(metadataKey, target
    /* , targetKey */
    ) {
      var targetKey = arguments.length < 3 ? undefined : toMetadataKey$1(arguments[2]);
      return ordinaryHasOwnMetadata(metadataKey, anObject$Y(target), targetKey);
    }
  });

  var $$1G = _export;
  var ReflectMetadataModule = reflectMetadata;
  var anObject$X = anObject$1e;
  var toMetadataKey = ReflectMetadataModule.toKey;
  var ordinaryDefineOwnMetadata = ReflectMetadataModule.set; // `Reflect.metadata` method
  // https://github.com/rbuckton/reflect-metadata

  $$1G({
    target: 'Reflect',
    stat: true
  }, {
    metadata: function metadata(metadataKey, metadataValue) {
      return function decorator(target, key) {
        ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject$X(target), toMetadataKey(key));
      };
    }
  });

  var $$1F = _export; // `Math.iaddh` method
  // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
  // TODO: Remove from `core-js@4`

  $$1F({
    target: 'Math',
    stat: true
  }, {
    iaddh: function iaddh(x0, x1, y0, y1) {
      var $x0 = x0 >>> 0;
      var $x1 = x1 >>> 0;
      var $y0 = y0 >>> 0;
      return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
    }
  });

  var $$1E = _export; // `Math.isubh` method
  // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
  // TODO: Remove from `core-js@4`

  $$1E({
    target: 'Math',
    stat: true
  }, {
    isubh: function isubh(x0, x1, y0, y1) {
      var $x0 = x0 >>> 0;
      var $x1 = x1 >>> 0;
      var $y0 = y0 >>> 0;
      return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
    }
  });

  var $$1D = _export; // `Math.imulh` method
  // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
  // TODO: Remove from `core-js@4`

  $$1D({
    target: 'Math',
    stat: true
  }, {
    imulh: function imulh(u, v) {
      var UINT16 = 0xFFFF;
      var $u = +u;
      var $v = +v;
      var u0 = $u & UINT16;
      var v0 = $v & UINT16;
      var u1 = $u >> 16;
      var v1 = $v >> 16;
      var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
      return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
    }
  });

  var $$1C = _export; // `Math.umulh` method
  // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
  // TODO: Remove from `core-js@4`

  $$1C({
    target: 'Math',
    stat: true
  }, {
    umulh: function umulh(u, v) {
      var UINT16 = 0xFFFF;
      var $u = +u;
      var $v = +v;
      var u0 = $u & UINT16;
      var v0 = $v & UINT16;
      var u1 = $u >>> 16;
      var v1 = $v >>> 16;
      var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
      return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
    }
  });

  var toInteger$2 = toInteger$7;
  var requireObjectCoercible$4 = requireObjectCoercible$8; // `String.prototype.{ codePointAt, at }` methods implementation

  var createMethod$2 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = String(requireObjectCoercible$4($this));
      var position = toInteger$2(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = S.charCodeAt(position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$2(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$2(true)
  };

  var $$1B = _export;
  var charAt$3 = stringMultibyte.charAt; // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at

  $$1B({
    target: 'String',
    proto: true
  }, {
    at: function at(pos) {
      return charAt$3(this, pos);
    }
  });

  var charAt$2 = stringMultibyte.charAt;
  var InternalStateModule$b = internalState;
  var defineIterator$1 = defineIterator$3;
  var STRING_ITERATOR$1 = 'String Iterator';
  var setInternalState$b = InternalStateModule$b.set;
  var getInternalState$8 = InternalStateModule$b.getterFor(STRING_ITERATOR$1); // `String.prototype[@@iterator]` method
  // https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator

  defineIterator$1(String, 'String', function (iterated) {
    setInternalState$b(this, {
      type: STRING_ITERATOR$1,
      string: String(iterated),
      index: 0
    }); // `%StringIteratorPrototype%.next` method
    // https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState$8(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return {
      value: undefined,
      done: true
    };
    point = charAt$2(string, index);
    state.index += point.length;
    return {
      value: point,
      done: false
    };
  });

  var fails$3 = fails$g;
  var wellKnownSymbol$d = wellKnownSymbol$s;
  var IS_PURE$B = isPure;
  var ITERATOR$1 = wellKnownSymbol$d('iterator');
  var nativeUrl = !fails$3(function () {
    var url = new URL('b?a=1&b=2&c=3', 'http://a');
    var searchParams = url.searchParams;
    var result = '';
    url.pathname = 'c%20d';
    searchParams.forEach(function (value, key) {
      searchParams['delete']('b');
      result += key + value;
    });
    return IS_PURE$B && !url.toJSON || !searchParams.sort || url.href !== 'http://a/c%20d?a=1&c=3' || searchParams.get('c') !== '3' || String(new URLSearchParams('?a=1')) !== 'a=1' || !searchParams[ITERATOR$1] // throws in Edge
    || new URL('https://a@b').username !== 'a' || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b' // not punycoded in Edge
    || new URL('http://тест').host !== 'xn--e1aybc' // not escaped in Chrome 62-
    || new URL('http://a#б').hash !== '#%D0%B1' // fails in Chrome 66-
    || result !== 'a1c3' // throws in Safari
    || new URL('http://x', undefined).host !== 'x';
  });

  var DESCRIPTORS$5 = descriptors;
  var fails$2 = fails$g;
  var objectKeys$1 = objectKeys$3;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var toObject$6 = toObject$a;
  var IndexedObject = indexedObject;
  var nativeAssign = Object.assign;
  var defineProperty$5 = Object.defineProperty; // `Object.assign` method
  // https://tc39.github.io/ecma262/#sec-object.assign

  var objectAssign = !nativeAssign || fails$2(function () {
    // should have correct order of operations (Edge bug)
    if (DESCRIPTORS$5 && nativeAssign({
      b: 1
    }, nativeAssign(defineProperty$5({}, 'a', {
      enumerable: true,
      get: function () {
        defineProperty$5(this, 'b', {
          value: 3,
          enumerable: false
        });
      }
    }), {
      b: 2
    })).b !== 1) return true; // should work with symbols and should have deterministic property order (V8 bug)

    var A = {};
    var B = {}; // eslint-disable-next-line no-undef

    var symbol = Symbol();
    var alphabet = 'abcdefghijklmnopqrst';
    A[symbol] = 7;
    alphabet.split('').forEach(function (chr) {
      B[chr] = chr;
    });
    return nativeAssign({}, A)[symbol] != 7 || objectKeys$1(nativeAssign({}, B)).join('') != alphabet;
  }) ? function assign(target, source) {
    // eslint-disable-line no-unused-vars
    var T = toObject$6(target);
    var argumentsLength = arguments.length;
    var index = 1;
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    var propertyIsEnumerable = propertyIsEnumerableModule.f;

    while (argumentsLength > index) {
      var S = IndexedObject(arguments[index++]);
      var keys = getOwnPropertySymbols ? objectKeys$1(S).concat(getOwnPropertySymbols(S)) : objectKeys$1(S);
      var length = keys.length;
      var j = 0;
      var key;

      while (length > j) {
        key = keys[j++];
        if (!DESCRIPTORS$5 || propertyIsEnumerable.call(S, key)) T[key] = S[key];
      }
    }

    return T;
  } : nativeAssign;

  var bind$e = functionBindContext;
  var toObject$5 = toObject$a;
  var callWithSafeIterationClosing$3 = callWithSafeIterationClosing$5;
  var isArrayIteratorMethod = isArrayIteratorMethod$2;
  var toLength$3 = toLength$8;
  var createProperty = createProperty$2;
  var getIteratorMethod$5 = getIteratorMethod$7; // `Array.from` method implementation
  // https://tc39.github.io/ecma262/#sec-array.from

  var arrayFrom$1 = function from(arrayLike
  /* , mapfn = undefined, thisArg = undefined */
  ) {
    var O = toObject$5(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iteratorMethod = getIteratorMethod$5(O);
    var index = 0;
    var length, result, step, iterator, next, value;
    if (mapping) mapfn = bind$e(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2); // if the target is not iterable or it's an array with the default iterator - use a simple case

    if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
      iterator = iteratorMethod.call(O);
      next = iterator.next;
      result = new C();

      for (; !(step = next.call(iterator)).done; index++) {
        value = mapping ? callWithSafeIterationClosing$3(iterator, mapfn, [step.value, index], true) : step.value;
        createProperty(result, index, value);
      }
    } else {
      length = toLength$3(O.length);
      result = new C(length);

      for (; length > index; index++) {
        value = mapping ? mapfn(O[index], index) : O[index];
        createProperty(result, index, value);
      }
    }

    result.length = index;
    return result;
  };

  var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

  var base = 36;
  var tMin = 1;
  var tMax = 26;
  var skew = 38;
  var damp = 700;
  var initialBias = 72;
  var initialN = 128; // 0x80

  var delimiter = '-'; // '\x2D'

  var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars

  var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

  var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
  var baseMinusTMin = base - tMin;
  var floor$1 = Math.floor;
  var stringFromCharCode = String.fromCharCode;
  /**
   * Creates an array containing the numeric code points of each Unicode
   * character in the string. While JavaScript uses UCS-2 internally,
   * this function will convert a pair of surrogate halves (each of which
   * UCS-2 exposes as separate characters) into a single code point,
   * matching UTF-16.
   */

  var ucs2decode = function (string) {
    var output = [];
    var counter = 0;
    var length = string.length;

    while (counter < length) {
      var value = string.charCodeAt(counter++);

      if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
        // It's a high surrogate, and there is a next character.
        var extra = string.charCodeAt(counter++);

        if ((extra & 0xFC00) == 0xDC00) {
          // Low surrogate.
          output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
        } else {
          // It's an unmatched surrogate; only append this code unit, in case the
          // next code unit is the high surrogate of a surrogate pair.
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }

    return output;
  };
  /**
   * Converts a digit/integer into a basic code point.
   */


  var digitToBasic = function (digit) {
    //  0..25 map to ASCII a..z or A..Z
    // 26..35 map to ASCII 0..9
    return digit + 22 + 75 * (digit < 26);
  };
  /**
   * Bias adaptation function as per section 3.4 of RFC 3492.
   * https://tools.ietf.org/html/rfc3492#section-3.4
   */


  var adapt = function (delta, numPoints, firstTime) {
    var k = 0;
    delta = firstTime ? floor$1(delta / damp) : delta >> 1;
    delta += floor$1(delta / numPoints);

    for (; delta > baseMinusTMin * tMax >> 1; k += base) {
      delta = floor$1(delta / baseMinusTMin);
    }

    return floor$1(k + (baseMinusTMin + 1) * delta / (delta + skew));
  };
  /**
   * Converts a string of Unicode symbols (e.g. a domain name label) to a
   * Punycode string of ASCII-only symbols.
   */
  // eslint-disable-next-line  max-statements


  var encode = function (input) {
    var output = []; // Convert the input in UCS-2 to an array of Unicode code points.

    input = ucs2decode(input); // Cache the length.

    var inputLength = input.length; // Initialize the state.

    var n = initialN;
    var delta = 0;
    var bias = initialBias;
    var i, currentValue; // Handle the basic code points.

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];

      if (currentValue < 0x80) {
        output.push(stringFromCharCode(currentValue));
      }
    }

    var basicLength = output.length; // number of basic code points.

    var handledCPCount = basicLength; // number of code points that have been handled;
    // Finish the basic string with a delimiter unless it's empty.

    if (basicLength) {
      output.push(delimiter);
    } // Main encoding loop:


    while (handledCPCount < inputLength) {
      // All non-basic code points < n have been handled already. Find the next larger one:
      var m = maxInt;

      for (i = 0; i < input.length; i++) {
        currentValue = input[i];

        if (currentValue >= n && currentValue < m) {
          m = currentValue;
        }
      } // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.


      var handledCPCountPlusOne = handledCPCount + 1;

      if (m - n > floor$1((maxInt - delta) / handledCPCountPlusOne)) {
        throw RangeError(OVERFLOW_ERROR);
      }

      delta += (m - n) * handledCPCountPlusOne;
      n = m;

      for (i = 0; i < input.length; i++) {
        currentValue = input[i];

        if (currentValue < n && ++delta > maxInt) {
          throw RangeError(OVERFLOW_ERROR);
        }

        if (currentValue == n) {
          // Represent delta as a generalized variable-length integer.
          var q = delta;

          for (var k = base;;
          /* no condition */
          k += base) {
            var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
            if (q < t) break;
            var qMinusT = q - t;
            var baseMinusT = base - t;
            output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
            q = floor$1(qMinusT / baseMinusT);
          }

          output.push(stringFromCharCode(digitToBasic(q)));
          bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
          delta = 0;
          ++handledCPCount;
        }
      }

      ++delta;
      ++n;
    }

    return output.join('');
  };

  var stringPunycodeToAscii = function (input) {
    var encoded = [];
    var labels = input.toLowerCase().replace(regexSeparators, '\u002E').split('.');
    var i, label;

    for (i = 0; i < labels.length; i++) {
      label = labels[i];
      encoded.push(regexNonASCII.test(label) ? 'xn--' + encode(label) : label);
    }

    return encoded.join('.');
  };

  var wellKnownSymbol$c = wellKnownSymbol$s;
  var create$6 = objectCreate;
  var definePropertyModule = objectDefineProperty;
  var UNSCOPABLES = wellKnownSymbol$c('unscopables');
  var ArrayPrototype = Array.prototype; // Array.prototype[@@unscopables]
  // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

  if (ArrayPrototype[UNSCOPABLES] == undefined) {
    definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
      configurable: true,
      value: create$6(null)
    });
  } // add a key to Array.prototype[@@unscopables]


  var addToUnscopables$3 = function (key) {
    ArrayPrototype[UNSCOPABLES][key] = true;
  };

  var toIndexedObject = toIndexedObject$4;
  var addToUnscopables$2 = addToUnscopables$3;
  var Iterators = iterators;
  var InternalStateModule$a = internalState;
  var defineIterator = defineIterator$3;
  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$a = InternalStateModule$a.set;
  var getInternalState$7 = InternalStateModule$a.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.github.io/ecma262/#sec-createarrayiterator

  defineIterator(Array, 'Array', function (iterated, kind) {
    setInternalState$a(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject(iterated),
      // target
      index: 0,
      // next index
      kind: kind // kind

    }); // `%ArrayIteratorPrototype%.next` method
    // https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
  }, function () {
    var state = getInternalState$7(this);
    var target = state.target;
    var kind = state.kind;
    var index = state.index++;

    if (!target || index >= target.length) {
      state.target = undefined;
      return {
        value: undefined,
        done: true
      };
    }

    if (kind == 'keys') return {
      value: index,
      done: false
    };
    if (kind == 'values') return {
      value: target[index],
      done: false
    };
    return {
      value: [index, target[index]],
      done: false
    };
  }, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.github.io/ecma262/#sec-createmappedargumentsobject

  Iterators.Arguments = Iterators.Array; // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

  addToUnscopables$2('keys');
  addToUnscopables$2('values');
  addToUnscopables$2('entries');

  var anObject$W = anObject$1e;
  var getIteratorMethod$4 = getIteratorMethod$7;

  var getIterator$3 = function (it) {
    var iteratorMethod = getIteratorMethod$4(it);

    if (typeof iteratorMethod != 'function') {
      throw TypeError(String(it) + ' is not iterable');
    }

    return anObject$W(iteratorMethod.call(it));
  };

  var $$1A = _export;
  var getBuiltIn$g = getBuiltIn$m;
  var USE_NATIVE_URL$1 = nativeUrl;
  var redefine$1 = redefine$8.exports;
  var redefineAll$3 = redefineAll$8;
  var setToStringTag$1 = setToStringTag$6;
  var createIteratorConstructor$4 = createIteratorConstructor$6;
  var InternalStateModule$9 = internalState;
  var anInstance$4 = anInstance$9;
  var hasOwn = has$g;
  var bind$d = functionBindContext;
  var classof$2 = classof$9;
  var anObject$V = anObject$1e;
  var isObject$3 = isObject$i;
  var create$5 = objectCreate;
  var createPropertyDescriptor$1 = createPropertyDescriptor$6;
  var getIterator$2 = getIterator$3;
  var getIteratorMethod$3 = getIteratorMethod$7;
  var wellKnownSymbol$b = wellKnownSymbol$s;
  var $fetch = getBuiltIn$g('fetch');
  var Headers$1 = getBuiltIn$g('Headers');
  var ITERATOR = wellKnownSymbol$b('iterator');
  var URL_SEARCH_PARAMS = 'URLSearchParams';
  var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
  var setInternalState$9 = InternalStateModule$9.set;
  var getInternalParamsState = InternalStateModule$9.getterFor(URL_SEARCH_PARAMS);
  var getInternalIteratorState = InternalStateModule$9.getterFor(URL_SEARCH_PARAMS_ITERATOR);
  var plus = /\+/g;
  var sequences = Array(4);

  var percentSequence = function (bytes) {
    return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
  };

  var percentDecode = function (sequence) {
    try {
      return decodeURIComponent(sequence);
    } catch (error) {
      return sequence;
    }
  };

  var deserialize = function (it) {
    var result = it.replace(plus, ' ');
    var bytes = 4;

    try {
      return decodeURIComponent(result);
    } catch (error) {
      while (bytes) {
        result = result.replace(percentSequence(bytes--), percentDecode);
      }

      return result;
    }
  };

  var find = /[!'()~]|%20/g;
  var replace = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+'
  };

  var replacer = function (match) {
    return replace[match];
  };

  var serialize = function (it) {
    return encodeURIComponent(it).replace(find, replacer);
  };

  var parseSearchParams = function (result, query) {
    if (query) {
      var attributes = query.split('&');
      var index = 0;
      var attribute, entry;

      while (index < attributes.length) {
        attribute = attributes[index++];

        if (attribute.length) {
          entry = attribute.split('=');
          result.push({
            key: deserialize(entry.shift()),
            value: deserialize(entry.join('='))
          });
        }
      }
    }
  };

  var updateSearchParams = function (query) {
    this.entries.length = 0;
    parseSearchParams(this.entries, query);
  };

  var validateArgumentsLength = function (passed, required) {
    if (passed < required) throw TypeError('Not enough arguments');
  };

  var URLSearchParamsIterator = createIteratorConstructor$4(function Iterator(params, kind) {
    setInternalState$9(this, {
      type: URL_SEARCH_PARAMS_ITERATOR,
      iterator: getIterator$2(getInternalParamsState(params).entries),
      kind: kind
    });
  }, 'Iterator', function next() {
    var state = getInternalIteratorState(this);
    var kind = state.kind;
    var step = state.iterator.next();
    var entry = step.value;

    if (!step.done) {
      step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
    }

    return step;
  }); // `URLSearchParams` constructor
  // https://url.spec.whatwg.org/#interface-urlsearchparams

  var URLSearchParamsConstructor = function URLSearchParams()
  /* init */
  {
    anInstance$4(this, URLSearchParamsConstructor, URL_SEARCH_PARAMS);
    var init = arguments.length > 0 ? arguments[0] : undefined;
    var that = this;
    var entries = [];
    var iteratorMethod, iterator, next, step, entryIterator, entryNext, first, second, key;
    setInternalState$9(that, {
      type: URL_SEARCH_PARAMS,
      entries: entries,
      updateURL: function () {
        /* empty */
      },
      updateSearchParams: updateSearchParams
    });

    if (init !== undefined) {
      if (isObject$3(init)) {
        iteratorMethod = getIteratorMethod$3(init);

        if (typeof iteratorMethod === 'function') {
          iterator = iteratorMethod.call(init);
          next = iterator.next;

          while (!(step = next.call(iterator)).done) {
            entryIterator = getIterator$2(anObject$V(step.value));
            entryNext = entryIterator.next;
            if ((first = entryNext.call(entryIterator)).done || (second = entryNext.call(entryIterator)).done || !entryNext.call(entryIterator).done) throw TypeError('Expected sequence with length 2');
            entries.push({
              key: first.value + '',
              value: second.value + ''
            });
          }
        } else for (key in init) if (hasOwn(init, key)) entries.push({
          key: key,
          value: init[key] + ''
        });
      } else {
        parseSearchParams(entries, typeof init === 'string' ? init.charAt(0) === '?' ? init.slice(1) : init : init + '');
      }
    }
  };

  var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;
  redefineAll$3(URLSearchParamsPrototype, {
    // `URLSearchParams.prototype.appent` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-append
    append: function append(name, value) {
      validateArgumentsLength(arguments.length, 2);
      var state = getInternalParamsState(this);
      state.entries.push({
        key: name + '',
        value: value + ''
      });
      state.updateURL();
    },
    // `URLSearchParams.prototype.delete` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
    'delete': function (name) {
      validateArgumentsLength(arguments.length, 1);
      var state = getInternalParamsState(this);
      var entries = state.entries;
      var key = name + '';
      var index = 0;

      while (index < entries.length) {
        if (entries[index].key === key) entries.splice(index, 1);else index++;
      }

      state.updateURL();
    },
    // `URLSearchParams.prototype.get` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-get
    get: function get(name) {
      validateArgumentsLength(arguments.length, 1);
      var entries = getInternalParamsState(this).entries;
      var key = name + '';
      var index = 0;

      for (; index < entries.length; index++) {
        if (entries[index].key === key) return entries[index].value;
      }

      return null;
    },
    // `URLSearchParams.prototype.getAll` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
    getAll: function getAll(name) {
      validateArgumentsLength(arguments.length, 1);
      var entries = getInternalParamsState(this).entries;
      var key = name + '';
      var result = [];
      var index = 0;

      for (; index < entries.length; index++) {
        if (entries[index].key === key) result.push(entries[index].value);
      }

      return result;
    },
    // `URLSearchParams.prototype.has` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-has
    has: function has(name) {
      validateArgumentsLength(arguments.length, 1);
      var entries = getInternalParamsState(this).entries;
      var key = name + '';
      var index = 0;

      while (index < entries.length) {
        if (entries[index++].key === key) return true;
      }

      return false;
    },
    // `URLSearchParams.prototype.set` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-set
    set: function set(name, value) {
      validateArgumentsLength(arguments.length, 1);
      var state = getInternalParamsState(this);
      var entries = state.entries;
      var found = false;
      var key = name + '';
      var val = value + '';
      var index = 0;
      var entry;

      for (; index < entries.length; index++) {
        entry = entries[index];

        if (entry.key === key) {
          if (found) entries.splice(index--, 1);else {
            found = true;
            entry.value = val;
          }
        }
      }

      if (!found) entries.push({
        key: key,
        value: val
      });
      state.updateURL();
    },
    // `URLSearchParams.prototype.sort` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
    sort: function sort() {
      var state = getInternalParamsState(this);
      var entries = state.entries; // Array#sort is not stable in some engines

      var slice = entries.slice();
      var entry, entriesIndex, sliceIndex;
      entries.length = 0;

      for (sliceIndex = 0; sliceIndex < slice.length; sliceIndex++) {
        entry = slice[sliceIndex];

        for (entriesIndex = 0; entriesIndex < sliceIndex; entriesIndex++) {
          if (entries[entriesIndex].key > entry.key) {
            entries.splice(entriesIndex, 0, entry);
            break;
          }
        }

        if (entriesIndex === sliceIndex) entries.push(entry);
      }

      state.updateURL();
    },
    // `URLSearchParams.prototype.forEach` method
    forEach: function forEach(callback
    /* , thisArg */
    ) {
      var entries = getInternalParamsState(this).entries;
      var boundFunction = bind$d(callback, arguments.length > 1 ? arguments[1] : undefined, 3);
      var index = 0;
      var entry;

      while (index < entries.length) {
        entry = entries[index++];
        boundFunction(entry.value, entry.key, this);
      }
    },
    // `URLSearchParams.prototype.keys` method
    keys: function keys() {
      return new URLSearchParamsIterator(this, 'keys');
    },
    // `URLSearchParams.prototype.values` method
    values: function values() {
      return new URLSearchParamsIterator(this, 'values');
    },
    // `URLSearchParams.prototype.entries` method
    entries: function entries() {
      return new URLSearchParamsIterator(this, 'entries');
    }
  }, {
    enumerable: true
  }); // `URLSearchParams.prototype[@@iterator]` method

  redefine$1(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries); // `URLSearchParams.prototype.toString` method
  // https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior

  redefine$1(URLSearchParamsPrototype, 'toString', function toString() {
    var entries = getInternalParamsState(this).entries;
    var result = [];
    var index = 0;
    var entry;

    while (index < entries.length) {
      entry = entries[index++];
      result.push(serialize(entry.key) + '=' + serialize(entry.value));
    }

    return result.join('&');
  }, {
    enumerable: true
  });
  setToStringTag$1(URLSearchParamsConstructor, URL_SEARCH_PARAMS);
  $$1A({
    global: true,
    forced: !USE_NATIVE_URL$1
  }, {
    URLSearchParams: URLSearchParamsConstructor
  }); // Wrap `fetch` for correct work with polyfilled `URLSearchParams`
  // https://github.com/zloirock/core-js/issues/674

  if (!USE_NATIVE_URL$1 && typeof $fetch == 'function' && typeof Headers$1 == 'function') {
    $$1A({
      global: true,
      enumerable: true,
      forced: true
    }, {
      fetch: function fetch(input
      /* , init */
      ) {
        var args = [input];
        var init, body, headers;

        if (arguments.length > 1) {
          init = arguments[1];

          if (isObject$3(init)) {
            body = init.body;

            if (classof$2(body) === URL_SEARCH_PARAMS) {
              headers = init.headers ? new Headers$1(init.headers) : new Headers$1();

              if (!headers.has('content-type')) {
                headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
              }

              init = create$5(init, {
                body: createPropertyDescriptor$1(0, String(body)),
                headers: createPropertyDescriptor$1(0, headers)
              });
            }
          }

          args.push(init);
        }

        return $fetch.apply(this, args);
      }
    });
  }

  var web_urlSearchParams = {
    URLSearchParams: URLSearchParamsConstructor,
    getState: getInternalParamsState
  };

  var $$1z = _export;
  var DESCRIPTORS$4 = descriptors;
  var USE_NATIVE_URL = nativeUrl;
  var global$7 = global$q;
  var defineProperties = objectDefineProperties;
  var redefine = redefine$8.exports;
  var anInstance$3 = anInstance$9;
  var has$5 = has$g;
  var assign = objectAssign;
  var arrayFrom = arrayFrom$1;
  var codeAt$1 = stringMultibyte.codeAt;
  var toASCII = stringPunycodeToAscii;
  var setToStringTag = setToStringTag$6;
  var URLSearchParamsModule = web_urlSearchParams;
  var InternalStateModule$8 = internalState;
  var NativeURL = global$7.URL;
  var URLSearchParams$1 = URLSearchParamsModule.URLSearchParams;
  var getInternalSearchParamsState = URLSearchParamsModule.getState;
  var setInternalState$8 = InternalStateModule$8.set;
  var getInternalURLState = InternalStateModule$8.getterFor('URL');
  var floor = Math.floor;
  var pow$1 = Math.pow;
  var INVALID_AUTHORITY = 'Invalid authority';
  var INVALID_SCHEME = 'Invalid scheme';
  var INVALID_HOST = 'Invalid host';
  var INVALID_PORT = 'Invalid port';
  var ALPHA = /[A-Za-z]/;
  var ALPHANUMERIC = /[\d+-.A-Za-z]/;
  var DIGIT = /\d/;
  var HEX_START = /^(0x|0X)/;
  var OCT = /^[0-7]+$/;
  var DEC = /^\d+$/;
  var HEX = /^[\dA-Fa-f]+$/; // eslint-disable-next-line no-control-regex

  var FORBIDDEN_HOST_CODE_POINT = /[\u0000\u0009\u000A\u000D #%/:?@[\\]]/; // eslint-disable-next-line no-control-regex

  var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\u0000\u0009\u000A\u000D #/:?@[\\]]/; // eslint-disable-next-line no-control-regex

  var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g; // eslint-disable-next-line no-control-regex

  var TAB_AND_NEW_LINE = /[\u0009\u000A\u000D]/g;
  var EOF;

  var parseHost = function (url, input) {
    var result, codePoints, index;

    if (input.charAt(0) == '[') {
      if (input.charAt(input.length - 1) != ']') return INVALID_HOST;
      result = parseIPv6(input.slice(1, -1));
      if (!result) return INVALID_HOST;
      url.host = result; // opaque host
    } else if (!isSpecial(url)) {
      if (FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT.test(input)) return INVALID_HOST;
      result = '';
      codePoints = arrayFrom(input);

      for (index = 0; index < codePoints.length; index++) {
        result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
      }

      url.host = result;
    } else {
      input = toASCII(input);
      if (FORBIDDEN_HOST_CODE_POINT.test(input)) return INVALID_HOST;
      result = parseIPv4(input);
      if (result === null) return INVALID_HOST;
      url.host = result;
    }
  };

  var parseIPv4 = function (input) {
    var parts = input.split('.');
    var partsLength, numbers, index, part, radix, number, ipv4;

    if (parts.length && parts[parts.length - 1] == '') {
      parts.pop();
    }

    partsLength = parts.length;
    if (partsLength > 4) return input;
    numbers = [];

    for (index = 0; index < partsLength; index++) {
      part = parts[index];
      if (part == '') return input;
      radix = 10;

      if (part.length > 1 && part.charAt(0) == '0') {
        radix = HEX_START.test(part) ? 16 : 8;
        part = part.slice(radix == 8 ? 1 : 2);
      }

      if (part === '') {
        number = 0;
      } else {
        if (!(radix == 10 ? DEC : radix == 8 ? OCT : HEX).test(part)) return input;
        number = parseInt(part, radix);
      }

      numbers.push(number);
    }

    for (index = 0; index < partsLength; index++) {
      number = numbers[index];

      if (index == partsLength - 1) {
        if (number >= pow$1(256, 5 - partsLength)) return null;
      } else if (number > 255) return null;
    }

    ipv4 = numbers.pop();

    for (index = 0; index < numbers.length; index++) {
      ipv4 += numbers[index] * pow$1(256, 3 - index);
    }

    return ipv4;
  }; // eslint-disable-next-line max-statements


  var parseIPv6 = function (input) {
    var address = [0, 0, 0, 0, 0, 0, 0, 0];
    var pieceIndex = 0;
    var compress = null;
    var pointer = 0;
    var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

    var char = function () {
      return input.charAt(pointer);
    };

    if (char() == ':') {
      if (input.charAt(1) != ':') return;
      pointer += 2;
      pieceIndex++;
      compress = pieceIndex;
    }

    while (char()) {
      if (pieceIndex == 8) return;

      if (char() == ':') {
        if (compress !== null) return;
        pointer++;
        pieceIndex++;
        compress = pieceIndex;
        continue;
      }

      value = length = 0;

      while (length < 4 && HEX.test(char())) {
        value = value * 16 + parseInt(char(), 16);
        pointer++;
        length++;
      }

      if (char() == '.') {
        if (length == 0) return;
        pointer -= length;
        if (pieceIndex > 6) return;
        numbersSeen = 0;

        while (char()) {
          ipv4Piece = null;

          if (numbersSeen > 0) {
            if (char() == '.' && numbersSeen < 4) pointer++;else return;
          }

          if (!DIGIT.test(char())) return;

          while (DIGIT.test(char())) {
            number = parseInt(char(), 10);
            if (ipv4Piece === null) ipv4Piece = number;else if (ipv4Piece == 0) return;else ipv4Piece = ipv4Piece * 10 + number;
            if (ipv4Piece > 255) return;
            pointer++;
          }

          address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
          numbersSeen++;
          if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
        }

        if (numbersSeen != 4) return;
        break;
      } else if (char() == ':') {
        pointer++;
        if (!char()) return;
      } else if (char()) return;

      address[pieceIndex++] = value;
    }

    if (compress !== null) {
      swaps = pieceIndex - compress;
      pieceIndex = 7;

      while (pieceIndex != 0 && swaps > 0) {
        swap = address[pieceIndex];
        address[pieceIndex--] = address[compress + swaps - 1];
        address[compress + --swaps] = swap;
      }
    } else if (pieceIndex != 8) return;

    return address;
  };

  var findLongestZeroSequence = function (ipv6) {
    var maxIndex = null;
    var maxLength = 1;
    var currStart = null;
    var currLength = 0;
    var index = 0;

    for (; index < 8; index++) {
      if (ipv6[index] !== 0) {
        if (currLength > maxLength) {
          maxIndex = currStart;
          maxLength = currLength;
        }

        currStart = null;
        currLength = 0;
      } else {
        if (currStart === null) currStart = index;
        ++currLength;
      }
    }

    if (currLength > maxLength) {
      maxIndex = currStart;
      maxLength = currLength;
    }

    return maxIndex;
  };

  var serializeHost = function (host) {
    var result, index, compress, ignore0; // ipv4

    if (typeof host == 'number') {
      result = [];

      for (index = 0; index < 4; index++) {
        result.unshift(host % 256);
        host = floor(host / 256);
      }

      return result.join('.'); // ipv6
    } else if (typeof host == 'object') {
      result = '';
      compress = findLongestZeroSequence(host);

      for (index = 0; index < 8; index++) {
        if (ignore0 && host[index] === 0) continue;
        if (ignore0) ignore0 = false;

        if (compress === index) {
          result += index ? ':' : '::';
          ignore0 = true;
        } else {
          result += host[index].toString(16);
          if (index < 7) result += ':';
        }
      }

      return '[' + result + ']';
    }

    return host;
  };

  var C0ControlPercentEncodeSet = {};
  var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
    ' ': 1,
    '"': 1,
    '<': 1,
    '>': 1,
    '`': 1
  });
  var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
    '#': 1,
    '?': 1,
    '{': 1,
    '}': 1
  });
  var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
    '/': 1,
    ':': 1,
    ';': 1,
    '=': 1,
    '@': 1,
    '[': 1,
    '\\': 1,
    ']': 1,
    '^': 1,
    '|': 1
  });

  var percentEncode = function (char, set) {
    var code = codeAt$1(char, 0);
    return code > 0x20 && code < 0x7F && !has$5(set, char) ? char : encodeURIComponent(char);
  };

  var specialSchemes = {
    ftp: 21,
    file: null,
    http: 80,
    https: 443,
    ws: 80,
    wss: 443
  };

  var isSpecial = function (url) {
    return has$5(specialSchemes, url.scheme);
  };

  var includesCredentials = function (url) {
    return url.username != '' || url.password != '';
  };

  var cannotHaveUsernamePasswordPort = function (url) {
    return !url.host || url.cannotBeABaseURL || url.scheme == 'file';
  };

  var isWindowsDriveLetter = function (string, normalized) {
    var second;
    return string.length == 2 && ALPHA.test(string.charAt(0)) && ((second = string.charAt(1)) == ':' || !normalized && second == '|');
  };

  var startsWithWindowsDriveLetter = function (string) {
    var third;
    return string.length > 1 && isWindowsDriveLetter(string.slice(0, 2)) && (string.length == 2 || (third = string.charAt(2)) === '/' || third === '\\' || third === '?' || third === '#');
  };

  var shortenURLsPath = function (url) {
    var path = url.path;
    var pathSize = path.length;

    if (pathSize && (url.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
      path.pop();
    }
  };

  var isSingleDot = function (segment) {
    return segment === '.' || segment.toLowerCase() === '%2e';
  };

  var isDoubleDot = function (segment) {
    segment = segment.toLowerCase();
    return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
  }; // States:


  var SCHEME_START = {};
  var SCHEME = {};
  var NO_SCHEME = {};
  var SPECIAL_RELATIVE_OR_AUTHORITY = {};
  var PATH_OR_AUTHORITY = {};
  var RELATIVE = {};
  var RELATIVE_SLASH = {};
  var SPECIAL_AUTHORITY_SLASHES = {};
  var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
  var AUTHORITY = {};
  var HOST = {};
  var HOSTNAME = {};
  var PORT = {};
  var FILE = {};
  var FILE_SLASH = {};
  var FILE_HOST = {};
  var PATH_START = {};
  var PATH = {};
  var CANNOT_BE_A_BASE_URL_PATH = {};
  var QUERY = {};
  var FRAGMENT = {}; // eslint-disable-next-line max-statements

  var parseURL = function (url, input, stateOverride, base) {
    var state = stateOverride || SCHEME_START;
    var pointer = 0;
    var buffer = '';
    var seenAt = false;
    var seenBracket = false;
    var seenPasswordToken = false;
    var codePoints, char, bufferCodePoints, failure;

    if (!stateOverride) {
      url.scheme = '';
      url.username = '';
      url.password = '';
      url.host = null;
      url.port = null;
      url.path = [];
      url.query = null;
      url.fragment = null;
      url.cannotBeABaseURL = false;
      input = input.replace(LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
    }

    input = input.replace(TAB_AND_NEW_LINE, '');
    codePoints = arrayFrom(input);

    while (pointer <= codePoints.length) {
      char = codePoints[pointer];

      switch (state) {
        case SCHEME_START:
          if (char && ALPHA.test(char)) {
            buffer += char.toLowerCase();
            state = SCHEME;
          } else if (!stateOverride) {
            state = NO_SCHEME;
            continue;
          } else return INVALID_SCHEME;

          break;

        case SCHEME:
          if (char && (ALPHANUMERIC.test(char) || char == '+' || char == '-' || char == '.')) {
            buffer += char.toLowerCase();
          } else if (char == ':') {
            if (stateOverride && (isSpecial(url) != has$5(specialSchemes, buffer) || buffer == 'file' && (includesCredentials(url) || url.port !== null) || url.scheme == 'file' && !url.host)) return;
            url.scheme = buffer;

            if (stateOverride) {
              if (isSpecial(url) && specialSchemes[url.scheme] == url.port) url.port = null;
              return;
            }

            buffer = '';

            if (url.scheme == 'file') {
              state = FILE;
            } else if (isSpecial(url) && base && base.scheme == url.scheme) {
              state = SPECIAL_RELATIVE_OR_AUTHORITY;
            } else if (isSpecial(url)) {
              state = SPECIAL_AUTHORITY_SLASHES;
            } else if (codePoints[pointer + 1] == '/') {
              state = PATH_OR_AUTHORITY;
              pointer++;
            } else {
              url.cannotBeABaseURL = true;
              url.path.push('');
              state = CANNOT_BE_A_BASE_URL_PATH;
            }
          } else if (!stateOverride) {
            buffer = '';
            state = NO_SCHEME;
            pointer = 0;
            continue;
          } else return INVALID_SCHEME;

          break;

        case NO_SCHEME:
          if (!base || base.cannotBeABaseURL && char != '#') return INVALID_SCHEME;

          if (base.cannotBeABaseURL && char == '#') {
            url.scheme = base.scheme;
            url.path = base.path.slice();
            url.query = base.query;
            url.fragment = '';
            url.cannotBeABaseURL = true;
            state = FRAGMENT;
            break;
          }

          state = base.scheme == 'file' ? FILE : RELATIVE;
          continue;

        case SPECIAL_RELATIVE_OR_AUTHORITY:
          if (char == '/' && codePoints[pointer + 1] == '/') {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
            pointer++;
          } else {
            state = RELATIVE;
            continue;
          }

          break;

        case PATH_OR_AUTHORITY:
          if (char == '/') {
            state = AUTHORITY;
            break;
          } else {
            state = PATH;
            continue;
          }

        case RELATIVE:
          url.scheme = base.scheme;

          if (char == EOF) {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = base.path.slice();
            url.query = base.query;
          } else if (char == '/' || char == '\\' && isSpecial(url)) {
            state = RELATIVE_SLASH;
          } else if (char == '?') {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = base.path.slice();
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = base.path.slice();
            url.query = base.query;
            url.fragment = '';
            state = FRAGMENT;
          } else {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = base.path.slice();
            url.path.pop();
            state = PATH;
            continue;
          }

          break;

        case RELATIVE_SLASH:
          if (isSpecial(url) && (char == '/' || char == '\\')) {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          } else if (char == '/') {
            state = AUTHORITY;
          } else {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            state = PATH;
            continue;
          }

          break;

        case SPECIAL_AUTHORITY_SLASHES:
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          if (char != '/' || buffer.charAt(pointer + 1) != '/') continue;
          pointer++;
          break;

        case SPECIAL_AUTHORITY_IGNORE_SLASHES:
          if (char != '/' && char != '\\') {
            state = AUTHORITY;
            continue;
          }

          break;

        case AUTHORITY:
          if (char == '@') {
            if (seenAt) buffer = '%40' + buffer;
            seenAt = true;
            bufferCodePoints = arrayFrom(buffer);

            for (var i = 0; i < bufferCodePoints.length; i++) {
              var codePoint = bufferCodePoints[i];

              if (codePoint == ':' && !seenPasswordToken) {
                seenPasswordToken = true;
                continue;
              }

              var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
              if (seenPasswordToken) url.password += encodedCodePoints;else url.username += encodedCodePoints;
            }

            buffer = '';
          } else if (char == EOF || char == '/' || char == '?' || char == '#' || char == '\\' && isSpecial(url)) {
            if (seenAt && buffer == '') return INVALID_AUTHORITY;
            pointer -= arrayFrom(buffer).length + 1;
            buffer = '';
            state = HOST;
          } else buffer += char;

          break;

        case HOST:
        case HOSTNAME:
          if (stateOverride && url.scheme == 'file') {
            state = FILE_HOST;
            continue;
          } else if (char == ':' && !seenBracket) {
            if (buffer == '') return INVALID_HOST;
            failure = parseHost(url, buffer);
            if (failure) return failure;
            buffer = '';
            state = PORT;
            if (stateOverride == HOSTNAME) return;
          } else if (char == EOF || char == '/' || char == '?' || char == '#' || char == '\\' && isSpecial(url)) {
            if (isSpecial(url) && buffer == '') return INVALID_HOST;
            if (stateOverride && buffer == '' && (includesCredentials(url) || url.port !== null)) return;
            failure = parseHost(url, buffer);
            if (failure) return failure;
            buffer = '';
            state = PATH_START;
            if (stateOverride) return;
            continue;
          } else {
            if (char == '[') seenBracket = true;else if (char == ']') seenBracket = false;
            buffer += char;
          }

          break;

        case PORT:
          if (DIGIT.test(char)) {
            buffer += char;
          } else if (char == EOF || char == '/' || char == '?' || char == '#' || char == '\\' && isSpecial(url) || stateOverride) {
            if (buffer != '') {
              var port = parseInt(buffer, 10);
              if (port > 0xFFFF) return INVALID_PORT;
              url.port = isSpecial(url) && port === specialSchemes[url.scheme] ? null : port;
              buffer = '';
            }

            if (stateOverride) return;
            state = PATH_START;
            continue;
          } else return INVALID_PORT;

          break;

        case FILE:
          url.scheme = 'file';
          if (char == '/' || char == '\\') state = FILE_SLASH;else if (base && base.scheme == 'file') {
            if (char == EOF) {
              url.host = base.host;
              url.path = base.path.slice();
              url.query = base.query;
            } else if (char == '?') {
              url.host = base.host;
              url.path = base.path.slice();
              url.query = '';
              state = QUERY;
            } else if (char == '#') {
              url.host = base.host;
              url.path = base.path.slice();
              url.query = base.query;
              url.fragment = '';
              state = FRAGMENT;
            } else {
              if (!startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
                url.host = base.host;
                url.path = base.path.slice();
                shortenURLsPath(url);
              }

              state = PATH;
              continue;
            }
          } else {
            state = PATH;
            continue;
          }
          break;

        case FILE_SLASH:
          if (char == '/' || char == '\\') {
            state = FILE_HOST;
            break;
          }

          if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
            if (isWindowsDriveLetter(base.path[0], true)) url.path.push(base.path[0]);else url.host = base.host;
          }

          state = PATH;
          continue;

        case FILE_HOST:
          if (char == EOF || char == '/' || char == '\\' || char == '?' || char == '#') {
            if (!stateOverride && isWindowsDriveLetter(buffer)) {
              state = PATH;
            } else if (buffer == '') {
              url.host = '';
              if (stateOverride) return;
              state = PATH_START;
            } else {
              failure = parseHost(url, buffer);
              if (failure) return failure;
              if (url.host == 'localhost') url.host = '';
              if (stateOverride) return;
              buffer = '';
              state = PATH_START;
            }

            continue;
          } else buffer += char;

          break;

        case PATH_START:
          if (isSpecial(url)) {
            state = PATH;
            if (char != '/' && char != '\\') continue;
          } else if (!stateOverride && char == '?') {
            url.query = '';
            state = QUERY;
          } else if (!stateOverride && char == '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (char != EOF) {
            state = PATH;
            if (char != '/') continue;
          }

          break;

        case PATH:
          if (char == EOF || char == '/' || char == '\\' && isSpecial(url) || !stateOverride && (char == '?' || char == '#')) {
            if (isDoubleDot(buffer)) {
              shortenURLsPath(url);

              if (char != '/' && !(char == '\\' && isSpecial(url))) {
                url.path.push('');
              }
            } else if (isSingleDot(buffer)) {
              if (char != '/' && !(char == '\\' && isSpecial(url))) {
                url.path.push('');
              }
            } else {
              if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
                if (url.host) url.host = '';
                buffer = buffer.charAt(0) + ':'; // normalize windows drive letter
              }

              url.path.push(buffer);
            }

            buffer = '';

            if (url.scheme == 'file' && (char == EOF || char == '?' || char == '#')) {
              while (url.path.length > 1 && url.path[0] === '') {
                url.path.shift();
              }
            }

            if (char == '?') {
              url.query = '';
              state = QUERY;
            } else if (char == '#') {
              url.fragment = '';
              state = FRAGMENT;
            }
          } else {
            buffer += percentEncode(char, pathPercentEncodeSet);
          }

          break;

        case CANNOT_BE_A_BASE_URL_PATH:
          if (char == '?') {
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (char != EOF) {
            url.path[0] += percentEncode(char, C0ControlPercentEncodeSet);
          }

          break;

        case QUERY:
          if (!stateOverride && char == '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (char != EOF) {
            if (char == "'" && isSpecial(url)) url.query += '%27';else if (char == '#') url.query += '%23';else url.query += percentEncode(char, C0ControlPercentEncodeSet);
          }

          break;

        case FRAGMENT:
          if (char != EOF) url.fragment += percentEncode(char, fragmentPercentEncodeSet);
          break;
      }

      pointer++;
    }
  }; // `URL` constructor
  // https://url.spec.whatwg.org/#url-class


  var URLConstructor = function URL(url
  /* , base */
  ) {
    var that = anInstance$3(this, URLConstructor, 'URL');
    var base = arguments.length > 1 ? arguments[1] : undefined;
    var urlString = String(url);
    var state = setInternalState$8(that, {
      type: 'URL'
    });
    var baseState, failure;

    if (base !== undefined) {
      if (base instanceof URLConstructor) baseState = getInternalURLState(base);else {
        failure = parseURL(baseState = {}, String(base));
        if (failure) throw TypeError(failure);
      }
    }

    failure = parseURL(state, urlString, null, baseState);
    if (failure) throw TypeError(failure);
    var searchParams = state.searchParams = new URLSearchParams$1();
    var searchParamsState = getInternalSearchParamsState(searchParams);
    searchParamsState.updateSearchParams(state.query);

    searchParamsState.updateURL = function () {
      state.query = String(searchParams) || null;
    };

    if (!DESCRIPTORS$4) {
      that.href = serializeURL.call(that);
      that.origin = getOrigin.call(that);
      that.protocol = getProtocol.call(that);
      that.username = getUsername.call(that);
      that.password = getPassword.call(that);
      that.host = getHost.call(that);
      that.hostname = getHostname.call(that);
      that.port = getPort.call(that);
      that.pathname = getPathname.call(that);
      that.search = getSearch.call(that);
      that.searchParams = getSearchParams.call(that);
      that.hash = getHash.call(that);
    }
  };

  var URLPrototype = URLConstructor.prototype;

  var serializeURL = function () {
    var url = getInternalURLState(this);
    var scheme = url.scheme;
    var username = url.username;
    var password = url.password;
    var host = url.host;
    var port = url.port;
    var path = url.path;
    var query = url.query;
    var fragment = url.fragment;
    var output = scheme + ':';

    if (host !== null) {
      output += '//';

      if (includesCredentials(url)) {
        output += username + (password ? ':' + password : '') + '@';
      }

      output += serializeHost(host);
      if (port !== null) output += ':' + port;
    } else if (scheme == 'file') output += '//';

    output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
    if (query !== null) output += '?' + query;
    if (fragment !== null) output += '#' + fragment;
    return output;
  };

  var getOrigin = function () {
    var url = getInternalURLState(this);
    var scheme = url.scheme;
    var port = url.port;
    if (scheme == 'blob') try {
      return new URL(scheme.path[0]).origin;
    } catch (error) {
      return 'null';
    }
    if (scheme == 'file' || !isSpecial(url)) return 'null';
    return scheme + '://' + serializeHost(url.host) + (port !== null ? ':' + port : '');
  };

  var getProtocol = function () {
    return getInternalURLState(this).scheme + ':';
  };

  var getUsername = function () {
    return getInternalURLState(this).username;
  };

  var getPassword = function () {
    return getInternalURLState(this).password;
  };

  var getHost = function () {
    var url = getInternalURLState(this);
    var host = url.host;
    var port = url.port;
    return host === null ? '' : port === null ? serializeHost(host) : serializeHost(host) + ':' + port;
  };

  var getHostname = function () {
    var host = getInternalURLState(this).host;
    return host === null ? '' : serializeHost(host);
  };

  var getPort = function () {
    var port = getInternalURLState(this).port;
    return port === null ? '' : String(port);
  };

  var getPathname = function () {
    var url = getInternalURLState(this);
    var path = url.path;
    return url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
  };

  var getSearch = function () {
    var query = getInternalURLState(this).query;
    return query ? '?' + query : '';
  };

  var getSearchParams = function () {
    return getInternalURLState(this).searchParams;
  };

  var getHash = function () {
    var fragment = getInternalURLState(this).fragment;
    return fragment ? '#' + fragment : '';
  };

  var accessorDescriptor = function (getter, setter) {
    return {
      get: getter,
      set: setter,
      configurable: true,
      enumerable: true
    };
  };

  if (DESCRIPTORS$4) {
    defineProperties(URLPrototype, {
      // `URL.prototype.href` accessors pair
      // https://url.spec.whatwg.org/#dom-url-href
      href: accessorDescriptor(serializeURL, function (href) {
        var url = getInternalURLState(this);
        var urlString = String(href);
        var failure = parseURL(url, urlString);
        if (failure) throw TypeError(failure);
        getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
      }),
      // `URL.prototype.origin` getter
      // https://url.spec.whatwg.org/#dom-url-origin
      origin: accessorDescriptor(getOrigin),
      // `URL.prototype.protocol` accessors pair
      // https://url.spec.whatwg.org/#dom-url-protocol
      protocol: accessorDescriptor(getProtocol, function (protocol) {
        var url = getInternalURLState(this);
        parseURL(url, String(protocol) + ':', SCHEME_START);
      }),
      // `URL.prototype.username` accessors pair
      // https://url.spec.whatwg.org/#dom-url-username
      username: accessorDescriptor(getUsername, function (username) {
        var url = getInternalURLState(this);
        var codePoints = arrayFrom(String(username));
        if (cannotHaveUsernamePasswordPort(url)) return;
        url.username = '';

        for (var i = 0; i < codePoints.length; i++) {
          url.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
        }
      }),
      // `URL.prototype.password` accessors pair
      // https://url.spec.whatwg.org/#dom-url-password
      password: accessorDescriptor(getPassword, function (password) {
        var url = getInternalURLState(this);
        var codePoints = arrayFrom(String(password));
        if (cannotHaveUsernamePasswordPort(url)) return;
        url.password = '';

        for (var i = 0; i < codePoints.length; i++) {
          url.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
        }
      }),
      // `URL.prototype.host` accessors pair
      // https://url.spec.whatwg.org/#dom-url-host
      host: accessorDescriptor(getHost, function (host) {
        var url = getInternalURLState(this);
        if (url.cannotBeABaseURL) return;
        parseURL(url, String(host), HOST);
      }),
      // `URL.prototype.hostname` accessors pair
      // https://url.spec.whatwg.org/#dom-url-hostname
      hostname: accessorDescriptor(getHostname, function (hostname) {
        var url = getInternalURLState(this);
        if (url.cannotBeABaseURL) return;
        parseURL(url, String(hostname), HOSTNAME);
      }),
      // `URL.prototype.port` accessors pair
      // https://url.spec.whatwg.org/#dom-url-port
      port: accessorDescriptor(getPort, function (port) {
        var url = getInternalURLState(this);
        if (cannotHaveUsernamePasswordPort(url)) return;
        port = String(port);
        if (port == '') url.port = null;else parseURL(url, port, PORT);
      }),
      // `URL.prototype.pathname` accessors pair
      // https://url.spec.whatwg.org/#dom-url-pathname
      pathname: accessorDescriptor(getPathname, function (pathname) {
        var url = getInternalURLState(this);
        if (url.cannotBeABaseURL) return;
        url.path = [];
        parseURL(url, pathname + '', PATH_START);
      }),
      // `URL.prototype.search` accessors pair
      // https://url.spec.whatwg.org/#dom-url-search
      search: accessorDescriptor(getSearch, function (search) {
        var url = getInternalURLState(this);
        search = String(search);

        if (search == '') {
          url.query = null;
        } else {
          if ('?' == search.charAt(0)) search = search.slice(1);
          url.query = '';
          parseURL(url, search, QUERY);
        }

        getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
      }),
      // `URL.prototype.searchParams` getter
      // https://url.spec.whatwg.org/#dom-url-searchparams
      searchParams: accessorDescriptor(getSearchParams),
      // `URL.prototype.hash` accessors pair
      // https://url.spec.whatwg.org/#dom-url-hash
      hash: accessorDescriptor(getHash, function (hash) {
        var url = getInternalURLState(this);
        hash = String(hash);

        if (hash == '') {
          url.fragment = null;
          return;
        }

        if ('#' == hash.charAt(0)) hash = hash.slice(1);
        url.fragment = '';
        parseURL(url, hash, FRAGMENT);
      })
    });
  } // `URL.prototype.toJSON` method
  // https://url.spec.whatwg.org/#dom-url-tojson


  redefine(URLPrototype, 'toJSON', function toJSON() {
    return serializeURL.call(this);
  }, {
    enumerable: true
  }); // `URL.prototype.toString` method
  // https://url.spec.whatwg.org/#URL-stringification-behavior

  redefine(URLPrototype, 'toString', function toString() {
    return serializeURL.call(this);
  }, {
    enumerable: true
  });

  if (NativeURL) {
    var nativeCreateObjectURL = NativeURL.createObjectURL;
    var nativeRevokeObjectURL = NativeURL.revokeObjectURL; // `URL.createObjectURL` method
    // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
    // eslint-disable-next-line no-unused-vars

    if (nativeCreateObjectURL) redefine(URLConstructor, 'createObjectURL', function createObjectURL(blob) {
      return nativeCreateObjectURL.apply(NativeURL, arguments);
    }); // `URL.revokeObjectURL` method
    // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
    // eslint-disable-next-line no-unused-vars

    if (nativeRevokeObjectURL) redefine(URLConstructor, 'revokeObjectURL', function revokeObjectURL(url) {
      return nativeRevokeObjectURL.apply(NativeURL, arguments);
    });
  }

  setToStringTag(URLConstructor, 'URL');
  $$1z({
    global: true,
    forced: !USE_NATIVE_URL,
    sham: !DESCRIPTORS$4
  }, {
    URL: URLConstructor
  });

  var $$1y = _export; // `URL.prototype.toJSON` method
  // https://url.spec.whatwg.org/#dom-url-tojson

  $$1y({
    target: 'URL',
    proto: true,
    enumerable: true
  }, {
    toJSON: function toJSON() {
      return URL.prototype.toString.call(this);
    }
  });

  var DESCRIPTORS$3 = descriptors;
  var addToUnscopables$1 = addToUnscopables$3;
  var toObject$4 = toObject$a;
  var toLength$2 = toLength$8;
  var defineProperty$4 = objectDefineProperty.f; // `Array.prototype.lastIndex` getter
  // https://github.com/keithamus/proposal-array-last

  if (DESCRIPTORS$3 && !('lastIndex' in [])) {
    defineProperty$4(Array.prototype, 'lastIndex', {
      configurable: true,
      get: function lastIndex() {
        var O = toObject$4(this);
        var len = toLength$2(O.length);
        return len == 0 ? 0 : len - 1;
      }
    });
    addToUnscopables$1('lastIndex');
  }

  var DESCRIPTORS$2 = descriptors;
  var addToUnscopables = addToUnscopables$3;
  var toObject$3 = toObject$a;
  var toLength$1 = toLength$8;
  var defineProperty$3 = objectDefineProperty.f; // `Array.prototype.lastIndex` accessor
  // https://github.com/keithamus/proposal-array-last

  if (DESCRIPTORS$2 && !('lastItem' in [])) {
    defineProperty$3(Array.prototype, 'lastItem', {
      configurable: true,
      get: function lastItem() {
        var O = toObject$3(this);
        var len = toLength$1(O.length);
        return len == 0 ? undefined : O[len - 1];
      },
      set: function lastItem(value) {
        var O = toObject$3(this);
        var len = toLength$1(O.length);
        return O[len == 0 ? 0 : len - 1] = value;
      }
    });
    addToUnscopables('lastItem');
  }

  var $$1x = _export;
  var iterate$B = iterate$I.exports;
  var aFunction$E = aFunction$J; // `Map.groupBy` method
  // https://github.com/tc39/proposal-collection-methods

  $$1x({
    target: 'Map',
    stat: true
  }, {
    groupBy: function groupBy(iterable, keyDerivative) {
      var newMap = new this();
      aFunction$E(keyDerivative);
      var has = aFunction$E(newMap.has);
      var get = aFunction$E(newMap.get);
      var set = aFunction$E(newMap.set);
      iterate$B(iterable, function (element) {
        var derivedKey = keyDerivative(element);
        if (!has.call(newMap, derivedKey)) set.call(newMap, derivedKey, [element]);else get.call(newMap, derivedKey).push(element);
      });
      return newMap;
    }
  });

  var $$1w = _export;
  var iterate$A = iterate$I.exports;
  var aFunction$D = aFunction$J; // `Map.keyBy` method
  // https://github.com/tc39/proposal-collection-methods

  $$1w({
    target: 'Map',
    stat: true
  }, {
    keyBy: function keyBy(iterable, keyDerivative) {
      var newMap = new this();
      aFunction$D(keyDerivative);
      var setter = aFunction$D(newMap.set);
      iterate$A(iterable, function (element) {
        setter.call(newMap, keyDerivative(element), element);
      });
      return newMap;
    }
  });

  var anObject$U = anObject$1e;
  var aFunction$C = aFunction$J; // https://github.com/tc39/collection-methods

  var collectionDeleteAll$4 = function ()
  /* ...elements */
  {
    var collection = anObject$U(this);
    var remover = aFunction$C(collection['delete']);
    var allDeleted = true;
    var wasDeleted;

    for (var k = 0, len = arguments.length; k < len; k++) {
      wasDeleted = remover.call(collection, arguments[k]);
      allDeleted = allDeleted && wasDeleted;
    }

    return !!allDeleted;
  };

  var $$1v = _export;
  var IS_PURE$A = isPure;
  var collectionDeleteAll$3 = collectionDeleteAll$4; // `Map.prototype.deleteAll` method
  // https://github.com/tc39/proposal-collection-methods

  $$1v({
    target: 'Map',
    proto: true,
    real: true,
    forced: IS_PURE$A
  }, {
    deleteAll: function deleteAll()
    /* ...elements */
    {
      return collectionDeleteAll$3.apply(this, arguments);
    }
  });

  var getMapIterator$a = function (it) {
    // eslint-disable-next-line no-undef
    return Map.prototype.entries.call(it);
  };

  var $$1u = _export;
  var IS_PURE$z = isPure;
  var anObject$T = anObject$1e;
  var bind$c = functionBindContext;
  var getMapIterator$9 = getMapIterator$a;
  var iterate$z = iterate$I.exports; // `Map.prototype.every` method
  // https://github.com/tc39/proposal-collection-methods

  $$1u({
    target: 'Map',
    proto: true,
    real: true,
    forced: IS_PURE$z
  }, {
    every: function every(callbackfn
    /* , thisArg */
    ) {
      var map = anObject$T(this);
      var iterator = getMapIterator$9(map);
      var boundFunction = bind$c(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
      return !iterate$z(iterator, function (key, value) {
        if (!boundFunction(value, key, map)) return iterate$z.stop();
      }, undefined, true, true).stopped;
    }
  });

  var $$1t = _export;
  var IS_PURE$y = isPure;
  var getBuiltIn$f = getBuiltIn$m;
  var anObject$S = anObject$1e;
  var aFunction$B = aFunction$J;
  var bind$b = functionBindContext;
  var speciesConstructor$9 = speciesConstructor$b;
  var getMapIterator$8 = getMapIterator$a;
  var iterate$y = iterate$I.exports; // `Map.prototype.filter` method
  // https://github.com/tc39/proposal-collection-methods

  $$1t({
    target: 'Map',
    proto: true,
    real: true,
    forced: IS_PURE$y
  }, {
    filter: function filter(callbackfn
    /* , thisArg */
    ) {
      var map = anObject$S(this);
      var iterator = getMapIterator$8(map);
      var boundFunction = bind$b(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
      var newMap = new (speciesConstructor$9(map, getBuiltIn$f('Map')))();
      var setter = aFunction$B(newMap.set);
      iterate$y(iterator, function (key, value) {
        if (boundFunction(value, key, map)) setter.call(newMap, key, value);
      }, undefined, true, true);
      return newMap;
    }
  });

  var $$1s = _export;
  var IS_PURE$x = isPure;
  var anObject$R = anObject$1e;
  var bind$a = functionBindContext;
  var getMapIterator$7 = getMapIterator$a;
  var iterate$x = iterate$I.exports; // `Map.prototype.find` method
  // https://github.com/tc39/proposal-collection-methods

  $$1s({
    target: 'Map',
    proto: true,
    real: true,
    forced: IS_PURE$x
  }, {
    find: function find(callbackfn
    /* , thisArg */
    ) {
      var map = anObject$R(this);
      var iterator = getMapIterator$7(map);
      var boundFunction = bind$a(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
      return iterate$x(iterator, function (key, value) {
        if (boundFunction(value, key, map)) return iterate$x.stop(value);
      }, undefined, true, true).result;
    }
  });

  var $$1r = _export;
  var IS_PURE$w = isPure;
  var anObject$Q = anObject$1e;
  var bind$9 = functionBindContext;
  var getMapIterator$6 = getMapIterator$a;
  var iterate$w = iterate$I.exports; // `Map.prototype.findKey` method
  // https://github.com/tc39/proposal-collection-methods

  $$1r({
    target: 'Map',
    proto: true,
    real: true,
    forced: IS_PURE$w
  }, {
    findKey: function findKey(callbackfn
    /* , thisArg */
    ) {
      var map = anObject$Q(this);
      var iterator = getMapIterator$6(map);
      var boundFunction = bind$9(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
      return iterate$w(iterator, function (key, value) {
        if (boundFunction(value, key, map)) return iterate$w.stop(key);
      }, undefined, true, true).result;
    }
  });

  // https://tc39.github.io/ecma262/#sec-samevaluezero

  var sameValueZero$1 = function (x, y) {
    // eslint-disable-next-line no-self-compare
    return x === y || x != x && y != y;
  };

  var $$1q = _export;
  var IS_PURE$v = isPure;
  var anObject$P = anObject$1e;
  var getMapIterator$5 = getMapIterator$a;
  var sameValueZero = sameValueZero$1;
  var iterate$v = iterate$I.exports; // `Map.prototype.includes` method
  // https://github.com/tc39/proposal-collection-methods

  $$1q({
    target: 'Map',
    proto: true,
    real: true,
    forced: IS_PURE$v
  }, {
    includes: function includes(searchElement) {
      return iterate$v(getMapIterator$5(anObject$P(this)), function (key, value) {
        if (sameValueZero(value, searchElement)) return iterate$v.stop();
      }, undefined, true, true).stopped;
    }
  });

  var $$1p = _export;
  var IS_PURE$u = isPure;
  var anObject$O = anObject$1e;
  var getMapIterator$4 = getMapIterator$a;
  var iterate$u = iterate$I.exports; // `Map.prototype.includes` method
  // https://github.com/tc39/proposal-collection-methods

  $$1p({
    target: 'Map',
    proto: true,
    real: true,
    forced: IS_PURE$u
  }, {
    keyOf: function keyOf(searchElement) {
      return iterate$u(getMapIterator$4(anObject$O(this)), function (key, value) {
        if (value === searchElement) return iterate$u.stop(key);
      }, undefined, true, true).result;
    }
  });

  var $$1o = _export;
  var IS_PURE$t = isPure;
  var getBuiltIn$e = getBuiltIn$m;
  var anObject$N = anObject$1e;
  var aFunction$A = aFunction$J;
  var bind$8 = functionBindContext;
  var speciesConstructor$8 = speciesConstructor$b;
  var getMapIterator$3 = getMapIterator$a;
  var iterate$t = iterate$I.exports; // `Map.prototype.mapKeys` method
  // https://github.com/tc39/proposal-collection-methods

  $$1o({
    target: 'Map',
    proto: true,
    real: true,
    forced: IS_PURE$t
  }, {
    mapKeys: function mapKeys(callbackfn
    /* , thisArg */
    ) {
      var map = anObject$N(this);
      var iterator = getMapIterator$3(map);
      var boundFunction = bind$8(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
      var newMap = new (speciesConstructor$8(map, getBuiltIn$e('Map')))();
      var setter = aFunction$A(newMap.set);
      iterate$t(iterator, function (key, value) {
        setter.call(newMap, boundFunction(value, key, map), value);
      }, undefined, true, true);
      return newMap;
    }
  });

  var $$1n = _export;
  var IS_PURE$s = isPure;
  var getBuiltIn$d = getBuiltIn$m;
  var anObject$M = anObject$1e;
  var aFunction$z = aFunction$J;
  var bind$7 = functionBindContext;
  var speciesConstructor$7 = speciesConstructor$b;
  var getMapIterator$2 = getMapIterator$a;
  var iterate$s = iterate$I.exports; // `Map.prototype.mapValues` method
  // https://github.com/tc39/proposal-collection-methods

  $$1n({
    target: 'Map',
    proto: true,
    real: true,
    forced: IS_PURE$s
  }, {
    mapValues: function mapValues(callbackfn
    /* , thisArg */
    ) {
      var map = anObject$M(this);
      var iterator = getMapIterator$2(map);
      var boundFunction = bind$7(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
      var newMap = new (speciesConstructor$7(map, getBuiltIn$d('Map')))();
      var setter = aFunction$z(newMap.set);
      iterate$s(iterator, function (key, value) {
        setter.call(newMap, key, boundFunction(value, key, map));
      }, undefined, true, true);
      return newMap;
    }
  });

  var $$1m = _export;
  var IS_PURE$r = isPure;
  var anObject$L = anObject$1e;
  var aFunction$y = aFunction$J;
  var iterate$r = iterate$I.exports; // `Map.prototype.merge` method
  // https://github.com/tc39/proposal-collection-methods

  $$1m({
    target: 'Map',
    proto: true,
    real: true,
    forced: IS_PURE$r
  }, {
    // eslint-disable-next-line no-unused-vars
    merge: function merge(iterable
    /* ...iterbles */
    ) {
      var map = anObject$L(this);
      var setter = aFunction$y(map.set);
      var i = 0;

      while (i < arguments.length) {
        iterate$r(arguments[i++], setter, map, true);
      }

      return map;
    }
  });

  var $$1l = _export;
  var IS_PURE$q = isPure;
  var anObject$K = anObject$1e;
  var aFunction$x = aFunction$J;
  var getMapIterator$1 = getMapIterator$a;
  var iterate$q = iterate$I.exports; // `Map.prototype.reduce` method
  // https://github.com/tc39/proposal-collection-methods

  $$1l({
    target: 'Map',
    proto: true,
    real: true,
    forced: IS_PURE$q
  }, {
    reduce: function reduce(callbackfn
    /* , initialValue */
    ) {
      var map = anObject$K(this);
      var iterator = getMapIterator$1(map);
      var noInitial = arguments.length < 2;
      var accumulator = noInitial ? undefined : arguments[1];
      aFunction$x(callbackfn);
      iterate$q(iterator, function (key, value) {
        if (noInitial) {
          noInitial = false;
          accumulator = value;
        } else {
          accumulator = callbackfn(accumulator, value, key, map);
        }
      }, undefined, true, true);
      if (noInitial) throw TypeError('Reduce of empty map with no initial value');
      return accumulator;
    }
  });

  var $$1k = _export;
  var IS_PURE$p = isPure;
  var anObject$J = anObject$1e;
  var bind$6 = functionBindContext;
  var getMapIterator = getMapIterator$a;
  var iterate$p = iterate$I.exports; // `Set.prototype.some` method
  // https://github.com/tc39/proposal-collection-methods

  $$1k({
    target: 'Map',
    proto: true,
    real: true,
    forced: IS_PURE$p
  }, {
    some: function some(callbackfn
    /* , thisArg */
    ) {
      var map = anObject$J(this);
      var iterator = getMapIterator(map);
      var boundFunction = bind$6(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
      return iterate$p(iterator, function (key, value) {
        if (boundFunction(value, key, map)) return iterate$p.stop();
      }, undefined, true, true).stopped;
    }
  });

  var $$1j = _export;
  var IS_PURE$o = isPure;
  var anObject$I = anObject$1e;
  var aFunction$w = aFunction$J; // `Set.prototype.update` method
  // https://github.com/tc39/proposal-collection-methods

  $$1j({
    target: 'Map',
    proto: true,
    real: true,
    forced: IS_PURE$o
  }, {
    update: function update(key, callback
    /* , thunk */
    ) {
      var map = anObject$I(this);
      var length = arguments.length;
      aFunction$w(callback);
      var isPresentInMap = map.has(key);

      if (!isPresentInMap && length < 3) {
        throw TypeError('Updating absent value');
      }

      var value = isPresentInMap ? map.get(key) : aFunction$w(length > 2 ? arguments[2] : undefined)(key, map);
      map.set(key, callback(value, key, map));
      return map;
    }
  });

  var anObject$H = anObject$1e;
  var aFunction$v = aFunction$J; // https://github.com/tc39/collection-methods

  var collectionAddAll$2 = function ()
  /* ...elements */
  {
    var set = anObject$H(this);
    var adder = aFunction$v(set.add);

    for (var k = 0, len = arguments.length; k < len; k++) {
      adder.call(set, arguments[k]);
    }

    return set;
  };

  var $$1i = _export;
  var IS_PURE$n = isPure;
  var collectionAddAll$1 = collectionAddAll$2; // `Set.prototype.addAll` method
  // https://github.com/tc39/proposal-collection-methods

  $$1i({
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$n
  }, {
    addAll: function addAll()
    /* ...elements */
    {
      return collectionAddAll$1.apply(this, arguments);
    }
  });

  var $$1h = _export;
  var IS_PURE$m = isPure;
  var collectionDeleteAll$2 = collectionDeleteAll$4; // `Set.prototype.deleteAll` method
  // https://github.com/tc39/proposal-collection-methods

  $$1h({
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$m
  }, {
    deleteAll: function deleteAll()
    /* ...elements */
    {
      return collectionDeleteAll$2.apply(this, arguments);
    }
  });

  var getSetIterator$7 = function (it) {
    // eslint-disable-next-line no-undef
    return Set.prototype.values.call(it);
  };

  var $$1g = _export;
  var IS_PURE$l = isPure;
  var anObject$G = anObject$1e;
  var bind$5 = functionBindContext;
  var getSetIterator$6 = getSetIterator$7;
  var iterate$o = iterate$I.exports; // `Set.prototype.every` method
  // https://github.com/tc39/proposal-collection-methods

  $$1g({
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$l
  }, {
    every: function every(callbackfn
    /* , thisArg */
    ) {
      var set = anObject$G(this);
      var iterator = getSetIterator$6(set);
      var boundFunction = bind$5(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
      return !iterate$o(iterator, function (value) {
        if (!boundFunction(value, value, set)) return iterate$o.stop();
      }, undefined, false, true).stopped;
    }
  });

  var $$1f = _export;
  var IS_PURE$k = isPure;
  var getBuiltIn$c = getBuiltIn$m;
  var anObject$F = anObject$1e;
  var aFunction$u = aFunction$J;
  var bind$4 = functionBindContext;
  var speciesConstructor$6 = speciesConstructor$b;
  var getSetIterator$5 = getSetIterator$7;
  var iterate$n = iterate$I.exports; // `Set.prototype.filter` method
  // https://github.com/tc39/proposal-collection-methods

  $$1f({
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$k
  }, {
    filter: function filter(callbackfn
    /* , thisArg */
    ) {
      var set = anObject$F(this);
      var iterator = getSetIterator$5(set);
      var boundFunction = bind$4(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
      var newSet = new (speciesConstructor$6(set, getBuiltIn$c('Set')))();
      var adder = aFunction$u(newSet.add);
      iterate$n(iterator, function (value) {
        if (boundFunction(value, value, set)) adder.call(newSet, value);
      }, undefined, false, true);
      return newSet;
    }
  });

  var $$1e = _export;
  var IS_PURE$j = isPure;
  var anObject$E = anObject$1e;
  var bind$3 = functionBindContext;
  var getSetIterator$4 = getSetIterator$7;
  var iterate$m = iterate$I.exports; // `Set.prototype.find` method
  // https://github.com/tc39/proposal-collection-methods

  $$1e({
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$j
  }, {
    find: function find(callbackfn
    /* , thisArg */
    ) {
      var set = anObject$E(this);
      var iterator = getSetIterator$4(set);
      var boundFunction = bind$3(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
      return iterate$m(iterator, function (value) {
        if (boundFunction(value, value, set)) return iterate$m.stop(value);
      }, undefined, false, true).result;
    }
  });

  var $$1d = _export;
  var IS_PURE$i = isPure;
  var anObject$D = anObject$1e;
  var getSetIterator$3 = getSetIterator$7;
  var iterate$l = iterate$I.exports; // `Set.prototype.join` method
  // https://github.com/tc39/proposal-collection-methods

  $$1d({
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$i
  }, {
    join: function join(separator) {
      var set = anObject$D(this);
      var iterator = getSetIterator$3(set);
      var sep = separator === undefined ? ',' : String(separator);
      var result = [];
      iterate$l(iterator, result.push, result, false, true);
      return result.join(sep);
    }
  });

  var $$1c = _export;
  var IS_PURE$h = isPure;
  var getBuiltIn$b = getBuiltIn$m;
  var anObject$C = anObject$1e;
  var aFunction$t = aFunction$J;
  var bind$2 = functionBindContext;
  var speciesConstructor$5 = speciesConstructor$b;
  var getSetIterator$2 = getSetIterator$7;
  var iterate$k = iterate$I.exports; // `Set.prototype.map` method
  // https://github.com/tc39/proposal-collection-methods

  $$1c({
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$h
  }, {
    map: function map(callbackfn
    /* , thisArg */
    ) {
      var set = anObject$C(this);
      var iterator = getSetIterator$2(set);
      var boundFunction = bind$2(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
      var newSet = new (speciesConstructor$5(set, getBuiltIn$b('Set')))();
      var adder = aFunction$t(newSet.add);
      iterate$k(iterator, function (value) {
        adder.call(newSet, boundFunction(value, value, set));
      }, undefined, false, true);
      return newSet;
    }
  });

  var $$1b = _export;
  var IS_PURE$g = isPure;
  var anObject$B = anObject$1e;
  var aFunction$s = aFunction$J;
  var getSetIterator$1 = getSetIterator$7;
  var iterate$j = iterate$I.exports; // `Set.prototype.reduce` method
  // https://github.com/tc39/proposal-collection-methods

  $$1b({
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$g
  }, {
    reduce: function reduce(callbackfn
    /* , initialValue */
    ) {
      var set = anObject$B(this);
      var iterator = getSetIterator$1(set);
      var noInitial = arguments.length < 2;
      var accumulator = noInitial ? undefined : arguments[1];
      aFunction$s(callbackfn);
      iterate$j(iterator, function (value) {
        if (noInitial) {
          noInitial = false;
          accumulator = value;
        } else {
          accumulator = callbackfn(accumulator, value, value, set);
        }
      }, undefined, false, true);
      if (noInitial) throw TypeError('Reduce of empty set with no initial value');
      return accumulator;
    }
  });

  var $$1a = _export;
  var IS_PURE$f = isPure;
  var anObject$A = anObject$1e;
  var bind$1 = functionBindContext;
  var getSetIterator = getSetIterator$7;
  var iterate$i = iterate$I.exports; // `Set.prototype.some` method
  // https://github.com/tc39/proposal-collection-methods

  $$1a({
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$f
  }, {
    some: function some(callbackfn
    /* , thisArg */
    ) {
      var set = anObject$A(this);
      var iterator = getSetIterator(set);
      var boundFunction = bind$1(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
      return iterate$i(iterator, function (value) {
        if (boundFunction(value, value, set)) return iterate$i.stop();
      }, undefined, false, true).stopped;
    }
  });

  var $$19 = _export;
  var IS_PURE$e = isPure;
  var collectionDeleteAll$1 = collectionDeleteAll$4; // `WeakMap.prototype.deleteAll` method
  // https://github.com/tc39/proposal-collection-methods

  $$19({
    target: 'WeakMap',
    proto: true,
    real: true,
    forced: IS_PURE$e
  }, {
    deleteAll: function deleteAll()
    /* ...elements */
    {
      return collectionDeleteAll$1.apply(this, arguments);
    }
  });

  var $$18 = _export;
  var IS_PURE$d = isPure;
  var collectionAddAll = collectionAddAll$2; // `WeakSet.prototype.addAll` method
  // https://github.com/tc39/proposal-collection-methods

  $$18({
    target: 'WeakSet',
    proto: true,
    real: true,
    forced: IS_PURE$d
  }, {
    addAll: function addAll()
    /* ...elements */
    {
      return collectionAddAll.apply(this, arguments);
    }
  });

  var $$17 = _export;
  var IS_PURE$c = isPure;
  var collectionDeleteAll = collectionDeleteAll$4; // `WeakSet.prototype.deleteAll` method
  // https://github.com/tc39/proposal-collection-methods

  $$17({
    target: 'WeakSet',
    proto: true,
    real: true,
    forced: IS_PURE$c
  }, {
    deleteAll: function deleteAll()
    /* ...elements */
    {
      return collectionDeleteAll.apply(this, arguments);
    }
  });

  var aFunction$r = aFunction$J;
  var bind = functionBindContext;
  var iterate$h = iterate$I.exports;

  var collectionFrom = function from(source
  /* , mapFn, thisArg */
  ) {
    var length = arguments.length;
    var mapFn = length > 1 ? arguments[1] : undefined;
    var mapping, A, n, boundFunction;
    aFunction$r(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction$r(mapFn);
    if (source == undefined) return new this();
    A = [];

    if (mapping) {
      n = 0;
      boundFunction = bind(mapFn, length > 2 ? arguments[2] : undefined, 2);
      iterate$h(source, function (nextItem) {
        A.push(boundFunction(nextItem, n++));
      });
    } else {
      iterate$h(source, A.push, A);
    }

    return new this(A);
  };

  var $$16 = _export;
  var from$3 = collectionFrom; // `Map.from` method
  // https://tc39.github.io/proposal-setmap-offrom/#sec-map.from

  $$16({
    target: 'Map',
    stat: true
  }, {
    from: from$3
  });

  var collectionOf = function of() {
    var length = arguments.length;
    var A = new Array(length);

    while (length--) A[length] = arguments[length];

    return new this(A);
  };

  var $$15 = _export;
  var of$3 = collectionOf; // `Map.of` method
  // https://tc39.github.io/proposal-setmap-offrom/#sec-map.of

  $$15({
    target: 'Map',
    stat: true
  }, {
    of: of$3
  });

  var $$14 = _export;
  var from$2 = collectionFrom; // `Set.from` method
  // https://tc39.github.io/proposal-setmap-offrom/#sec-set.from

  $$14({
    target: 'Set',
    stat: true
  }, {
    from: from$2
  });

  var $$13 = _export;
  var of$2 = collectionOf; // `Set.of` method
  // https://tc39.github.io/proposal-setmap-offrom/#sec-set.of

  $$13({
    target: 'Set',
    stat: true
  }, {
    of: of$2
  });

  var $$12 = _export;
  var from$1 = collectionFrom; // `WeakMap.from` method
  // https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from

  $$12({
    target: 'WeakMap',
    stat: true
  }, {
    from: from$1
  });

  var $$11 = _export;
  var of$1 = collectionOf; // `WeakMap.of` method
  // https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of

  $$11({
    target: 'WeakMap',
    stat: true
  }, {
    of: of$1
  });

  var $$10 = _export;
  var from = collectionFrom; // `WeakSet.from` method
  // https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from

  $$10({
    target: 'WeakSet',
    stat: true
  }, {
    from: from
  });

  var $$$ = _export;
  var of = collectionOf; // `WeakSet.of` method
  // https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of

  $$$({
    target: 'WeakSet',
    stat: true
  }, {
    of: of
  });

  var Map$1 = es_map;
  var WeakMap = es_weakMap.exports;
  var create$4 = objectCreate;
  var isObject$2 = isObject$i;

  var Node = function () {
    // keys
    this.object = null;
    this.symbol = null; // child nodes

    this.primitives = null;
    this.objectsByIndex = create$4(null);
  };

  Node.prototype.get = function (key, initializer) {
    return this[key] || (this[key] = initializer());
  };

  Node.prototype.next = function (i, it, IS_OBJECT) {
    var store = IS_OBJECT ? this.objectsByIndex[i] || (this.objectsByIndex[i] = new WeakMap()) : this.primitives || (this.primitives = new Map$1());
    var entry = store.get(it);
    if (!entry) store.set(it, entry = new Node());
    return entry;
  };

  var root = new Node();

  var compositeKey = function () {
    var active = root;
    var length = arguments.length;
    var i, it; // for prevent leaking, start from objects

    for (i = 0; i < length; i++) {
      if (isObject$2(it = arguments[i])) active = active.next(i, it, true);
    }

    if (this === Object && active === root) throw TypeError('Composite keys must contain a non-primitive component');

    for (i = 0; i < length; i++) {
      if (!isObject$2(it = arguments[i])) active = active.next(i, it, false);
    }

    return active;
  };

  var $$_ = _export;
  var getCompositeKeyNode$1 = compositeKey;
  var getBuiltIn$a = getBuiltIn$m;
  var create$3 = objectCreate;

  var initializer = function () {
    var freeze = getBuiltIn$a('Object', 'freeze');
    return freeze ? freeze(create$3(null)) : create$3(null);
  }; // https://github.com/tc39/proposal-richer-keys/tree/master/compositeKey


  $$_({
    global: true
  }, {
    compositeKey: function compositeKey() {
      return getCompositeKeyNode$1.apply(Object, arguments).get('object', initializer);
    }
  });

  var $$Z = _export;
  var getCompositeKeyNode = compositeKey;
  var getBuiltIn$9 = getBuiltIn$m; // https://github.com/tc39/proposal-richer-keys/tree/master/compositeKey

  $$Z({
    global: true
  }, {
    compositeSymbol: function compositeSymbol() {
      if (arguments.length === 1 && typeof arguments[0] === 'string') return getBuiltIn$9('Symbol')['for'](arguments[0]);
      return getCompositeKeyNode.apply(null, arguments).get('symbol', getBuiltIn$9('Symbol'));
    }
  });

  var $$Y = _export;
  var min = Math.min;
  var max = Math.max; // `Math.clamp` method
  // https://rwaldron.github.io/proposal-math-extensions/

  $$Y({
    target: 'Math',
    stat: true
  }, {
    clamp: function clamp(x, lower, upper) {
      return min(upper, max(lower, x));
    }
  });

  var $$X = _export; // `Math.DEG_PER_RAD` constant
  // https://rwaldron.github.io/proposal-math-extensions/

  $$X({
    target: 'Math',
    stat: true
  }, {
    DEG_PER_RAD: Math.PI / 180
  });

  var $$W = _export;
  var RAD_PER_DEG = 180 / Math.PI; // `Math.degrees` method
  // https://rwaldron.github.io/proposal-math-extensions/

  $$W({
    target: 'Math',
    stat: true
  }, {
    degrees: function degrees(radians) {
      return radians * RAD_PER_DEG;
    }
  });

  // https://rwaldron.github.io/proposal-math-extensions/

  var mathScale = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
    if (arguments.length === 0
    /* eslint-disable no-self-compare */
    || x != x || inLow != inLow || inHigh != inHigh || outLow != outLow || outHigh != outHigh
    /* eslint-enable no-self-compare */
    ) return NaN;
    if (x === Infinity || x === -Infinity) return x;
    return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
  };

  // https://tc39.github.io/ecma262/#sec-math.sign

  var mathSign = Math.sign || function sign(x) {
    // eslint-disable-next-line no-self-compare
    return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
  };

  var sign = mathSign;
  var abs = Math.abs;
  var pow = Math.pow;
  var EPSILON = pow(2, -52);
  var EPSILON32 = pow(2, -23);
  var MAX32 = pow(2, 127) * (2 - EPSILON32);
  var MIN32 = pow(2, -126);

  var roundTiesToEven = function (n) {
    return n + 1 / EPSILON - 1 / EPSILON;
  }; // `Math.fround` method implementation
  // https://tc39.github.io/ecma262/#sec-math.fround


  var mathFround = Math.fround || function fround(x) {
    var $abs = abs(x);
    var $sign = sign(x);
    var a, result;
    if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs); // eslint-disable-next-line no-self-compare

    if (result > MAX32 || result != result) return $sign * Infinity;
    return $sign * result;
  };

  var $$V = _export;
  var scale$1 = mathScale;
  var fround = mathFround; // `Math.fscale` method
  // https://rwaldron.github.io/proposal-math-extensions/

  $$V({
    target: 'Math',
    stat: true
  }, {
    fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
      return fround(scale$1(x, inLow, inHigh, outLow, outHigh));
    }
  });

  var $$U = _export; // `Math.RAD_PER_DEG` constant
  // https://rwaldron.github.io/proposal-math-extensions/

  $$U({
    target: 'Math',
    stat: true
  }, {
    RAD_PER_DEG: 180 / Math.PI
  });

  var $$T = _export;
  var DEG_PER_RAD = Math.PI / 180; // `Math.radians` method
  // https://rwaldron.github.io/proposal-math-extensions/

  $$T({
    target: 'Math',
    stat: true
  }, {
    radians: function radians(degrees) {
      return degrees * DEG_PER_RAD;
    }
  });

  var $$S = _export;
  var scale = mathScale; // `Math.scale` method
  // https://rwaldron.github.io/proposal-math-extensions/

  $$S({
    target: 'Math',
    stat: true
  }, {
    scale: scale
  });

  var $$R = _export; // `Math.signbit` method
  // https://github.com/tc39/proposal-Math.signbit

  $$R({
    target: 'Math',
    stat: true
  }, {
    signbit: function signbit(x) {
      return (x = +x) == x && x == 0 ? 1 / x == -Infinity : x < 0;
    }
  });

  // eslint-disable-next-line max-len

  var whitespaces$2 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var requireObjectCoercible$3 = requireObjectCoercible$8;
  var whitespaces$1 = whitespaces$2;
  var whitespace = '[' + whitespaces$1 + ']';
  var ltrim = RegExp('^' + whitespace + whitespace + '*');
  var rtrim = RegExp(whitespace + whitespace + '*$'); // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation

  var createMethod$1 = function (TYPE) {
    return function ($this) {
      var string = String(requireObjectCoercible$3($this));
      if (TYPE & 1) string = string.replace(ltrim, '');
      if (TYPE & 2) string = string.replace(rtrim, '');
      return string;
    };
  };

  var stringTrim = {
    // `String.prototype.{ trimLeft, trimStart }` methods
    // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
    start: createMethod$1(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
    end: createMethod$1(2),
    // `String.prototype.trim` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.trim
    trim: createMethod$1(3)
  };

  var global$6 = global$q;
  var trim = stringTrim.trim;
  var whitespaces = whitespaces$2;
  var $parseInt = global$6.parseInt;
  var hex = /^[+-]?0[Xx]/;
  var FORCED$1 = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22; // `parseInt` method
  // https://tc39.github.io/ecma262/#sec-parseint-string-radix

  var numberParseInt = FORCED$1 ? function parseInt(string, radix) {
    var S = trim(String(string));
    return $parseInt(S, radix >>> 0 || (hex.test(S) ? 16 : 10));
  } : $parseInt;

  var $$Q = _export;
  var toInteger$1 = toInteger$7;
  var parseInt$1 = numberParseInt;
  var INVALID_NUMBER_REPRESENTATION = 'Invalid number representation';
  var INVALID_RADIX = 'Invalid radix';
  var valid = /^[\da-z]+$/; // `Number.fromString` method
  // https://github.com/tc39/proposal-number-fromstring

  $$Q({
    target: 'Number',
    stat: true
  }, {
    fromString: function fromString(string, radix) {
      var sign = 1;
      var R, mathNum;
      if (typeof string != 'string') throw TypeError(INVALID_NUMBER_REPRESENTATION);
      if (!string.length) throw SyntaxError(INVALID_NUMBER_REPRESENTATION);

      if (string.charAt(0) == '-') {
        sign = -1;
        string = string.slice(1);
        if (!string.length) throw SyntaxError(INVALID_NUMBER_REPRESENTATION);
      }

      R = radix === undefined ? 10 : toInteger$1(radix);
      if (R < 2 || R > 36) throw RangeError(INVALID_RADIX);

      if (!valid.test(string) || (mathNum = parseInt$1(string, R)).toString(R) !== string) {
        throw SyntaxError(INVALID_NUMBER_REPRESENTATION);
      }

      return sign * mathNum;
    }
  });

  var InternalStateModule$7 = internalState;
  var createIteratorConstructor$3 = createIteratorConstructor$6;
  var has$4 = has$g;
  var objectKeys = objectKeys$3;
  var toObject$2 = toObject$a;
  var OBJECT_ITERATOR = 'Object Iterator';
  var setInternalState$7 = InternalStateModule$7.set;
  var getInternalState$6 = InternalStateModule$7.getterFor(OBJECT_ITERATOR);
  var objectIterator = createIteratorConstructor$3(function ObjectIterator(source, mode) {
    var object = toObject$2(source);
    setInternalState$7(this, {
      type: OBJECT_ITERATOR,
      mode: mode,
      object: object,
      keys: objectKeys(object),
      index: 0
    });
  }, 'Object', function next() {
    var state = getInternalState$6(this);
    var keys = state.keys;

    while (true) {
      if (keys === null || state.index >= keys.length) {
        state.object = state.keys = null;
        return {
          value: undefined,
          done: true
        };
      }

      var key = keys[state.index++];
      var object = state.object;
      if (!has$4(object, key)) continue;

      switch (state.mode) {
        case 'keys':
          return {
            value: key,
            done: false
          };

        case 'values':
          return {
            value: object[key],
            done: false
          };
      }
      /* entries */


      return {
        value: [key, object[key]],
        done: false
      };
    }
  });

  var $$P = _export;
  var ObjectIterator$2 = objectIterator; // `Object.iterateEntries` method
  // https://github.com/tc39/proposal-object-iteration

  $$P({
    target: 'Object',
    stat: true
  }, {
    iterateEntries: function iterateEntries(object) {
      return new ObjectIterator$2(object, 'entries');
    }
  });

  var $$O = _export;
  var ObjectIterator$1 = objectIterator; // `Object.iterateKeys` method
  // https://github.com/tc39/proposal-object-iteration

  $$O({
    target: 'Object',
    stat: true
  }, {
    iterateKeys: function iterateKeys(object) {
      return new ObjectIterator$1(object, 'keys');
    }
  });

  var $$N = _export;
  var ObjectIterator = objectIterator; // `Object.iterateValues` method
  // https://github.com/tc39/proposal-object-iteration

  $$N({
    target: 'Object',
    stat: true
  }, {
    iterateValues: function iterateValues(object) {
      return new ObjectIterator(object, 'values');
    }
  });

  var $$M = _export;
  var DESCRIPTORS$1 = descriptors;
  var setSpecies = setSpecies$3;
  var aFunction$q = aFunction$J;
  var anObject$z = anObject$1e;
  var isObject$1 = isObject$i;
  var anInstance$2 = anInstance$9;
  var defineProperty$2 = objectDefineProperty.f;
  var createNonEnumerableProperty$7 = createNonEnumerableProperty$e;
  var redefineAll$2 = redefineAll$8;
  var getIterator$1 = getIterator$3;
  var iterate$g = iterate$I.exports;
  var hostReportErrors = hostReportErrors$2;
  var wellKnownSymbol$a = wellKnownSymbol$s;
  var InternalStateModule$6 = internalState;
  var OBSERVABLE = wellKnownSymbol$a('observable');
  var getInternalState$5 = InternalStateModule$6.get;
  var setInternalState$6 = InternalStateModule$6.set;

  var getMethod = function (fn) {
    return fn == null ? undefined : aFunction$q(fn);
  };

  var cleanupSubscription = function (subscriptionState) {
    var cleanup = subscriptionState.cleanup;

    if (cleanup) {
      subscriptionState.cleanup = undefined;

      try {
        cleanup();
      } catch (error) {
        hostReportErrors(error);
      }
    }
  };

  var subscriptionClosed = function (subscriptionState) {
    return subscriptionState.observer === undefined;
  };

  var close = function (subscription, subscriptionState) {
    if (!DESCRIPTORS$1) {
      subscription.closed = true;
      var subscriptionObserver = subscriptionState.subscriptionObserver;
      if (subscriptionObserver) subscriptionObserver.closed = true;
    }

    subscriptionState.observer = undefined;
  };

  var Subscription = function (observer, subscriber) {
    var subscriptionState = setInternalState$6(this, {
      cleanup: undefined,
      observer: anObject$z(observer),
      subscriptionObserver: undefined
    });
    var start;
    if (!DESCRIPTORS$1) this.closed = false;

    try {
      if (start = getMethod(observer.start)) start.call(observer, this);
    } catch (error) {
      hostReportErrors(error);
    }

    if (subscriptionClosed(subscriptionState)) return;
    var subscriptionObserver = subscriptionState.subscriptionObserver = new SubscriptionObserver(this);

    try {
      var cleanup = subscriber(subscriptionObserver);
      var subscription = cleanup;
      if (cleanup != null) subscriptionState.cleanup = typeof cleanup.unsubscribe === 'function' ? function () {
        subscription.unsubscribe();
      } : aFunction$q(cleanup);
    } catch (error) {
      subscriptionObserver.error(error);
      return;
    }

    if (subscriptionClosed(subscriptionState)) cleanupSubscription(subscriptionState);
  };

  Subscription.prototype = redefineAll$2({}, {
    unsubscribe: function unsubscribe() {
      var subscriptionState = getInternalState$5(this);

      if (!subscriptionClosed(subscriptionState)) {
        close(this, subscriptionState);
        cleanupSubscription(subscriptionState);
      }
    }
  });
  if (DESCRIPTORS$1) defineProperty$2(Subscription.prototype, 'closed', {
    configurable: true,
    get: function () {
      return subscriptionClosed(getInternalState$5(this));
    }
  });

  var SubscriptionObserver = function (subscription) {
    setInternalState$6(this, {
      subscription: subscription
    });
    if (!DESCRIPTORS$1) this.closed = false;
  };

  SubscriptionObserver.prototype = redefineAll$2({}, {
    next: function next(value) {
      var subscriptionState = getInternalState$5(getInternalState$5(this).subscription);

      if (!subscriptionClosed(subscriptionState)) {
        var observer = subscriptionState.observer;

        try {
          var nextMethod = getMethod(observer.next);
          if (nextMethod) nextMethod.call(observer, value);
        } catch (error) {
          hostReportErrors(error);
        }
      }
    },
    error: function error(value) {
      var subscription = getInternalState$5(this).subscription;
      var subscriptionState = getInternalState$5(subscription);

      if (!subscriptionClosed(subscriptionState)) {
        var observer = subscriptionState.observer;
        close(subscription, subscriptionState);

        try {
          var errorMethod = getMethod(observer.error);
          if (errorMethod) errorMethod.call(observer, value);else hostReportErrors(value);
        } catch (err) {
          hostReportErrors(err);
        }

        cleanupSubscription(subscriptionState);
      }
    },
    complete: function complete() {
      var subscription = getInternalState$5(this).subscription;
      var subscriptionState = getInternalState$5(subscription);

      if (!subscriptionClosed(subscriptionState)) {
        var observer = subscriptionState.observer;
        close(subscription, subscriptionState);

        try {
          var completeMethod = getMethod(observer.complete);
          if (completeMethod) completeMethod.call(observer);
        } catch (error) {
          hostReportErrors(error);
        }

        cleanupSubscription(subscriptionState);
      }
    }
  });
  if (DESCRIPTORS$1) defineProperty$2(SubscriptionObserver.prototype, 'closed', {
    configurable: true,
    get: function () {
      return subscriptionClosed(getInternalState$5(getInternalState$5(this).subscription));
    }
  });

  var $Observable = function Observable(subscriber) {
    anInstance$2(this, $Observable, 'Observable');
    setInternalState$6(this, {
      subscriber: aFunction$q(subscriber)
    });
  };

  redefineAll$2($Observable.prototype, {
    subscribe: function subscribe(observer) {
      var length = arguments.length;
      return new Subscription(typeof observer === 'function' ? {
        next: observer,
        error: length > 1 ? arguments[1] : undefined,
        complete: length > 2 ? arguments[2] : undefined
      } : isObject$1(observer) ? observer : {}, getInternalState$5(this).subscriber);
    }
  });
  redefineAll$2($Observable, {
    from: function from(x) {
      var C = typeof this === 'function' ? this : $Observable;
      var observableMethod = getMethod(anObject$z(x)[OBSERVABLE]);

      if (observableMethod) {
        var observable = anObject$z(observableMethod.call(x));
        return observable.constructor === C ? observable : new C(function (observer) {
          return observable.subscribe(observer);
        });
      }

      var iterator = getIterator$1(x);
      return new C(function (observer) {
        iterate$g(iterator, function (it) {
          observer.next(it);
          if (observer.closed) return iterate$g.stop();
        }, undefined, false, true);
        observer.complete();
      });
    },
    of: function of() {
      var C = typeof this === 'function' ? this : $Observable;
      var length = arguments.length;
      var items = new Array(length);
      var index = 0;

      while (index < length) items[index] = arguments[index++];

      return new C(function (observer) {
        for (var i = 0; i < length; i++) {
          observer.next(items[i]);
          if (observer.closed) return;
        }

        observer.complete();
      });
    }
  });
  createNonEnumerableProperty$7($Observable.prototype, OBSERVABLE, function () {
    return this;
  });
  $$M({
    global: true
  }, {
    Observable: $Observable
  });
  setSpecies('Observable');

  var wellKnownSymbolWrapped = {};

  var wellKnownSymbol$9 = wellKnownSymbol$s;
  wellKnownSymbolWrapped.f = wellKnownSymbol$9;

  var path$4 = path$6;
  var has$3 = has$g;
  var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
  var defineProperty$1 = objectDefineProperty.f;

  var defineWellKnownSymbol$5 = function (NAME) {
    var Symbol = path$4.Symbol || (path$4.Symbol = {});
    if (!has$3(Symbol, NAME)) defineProperty$1(Symbol, NAME, {
      value: wrappedWellKnownSymbolModule.f(NAME)
    });
  };

  var defineWellKnownSymbol$4 = defineWellKnownSymbol$5; // `Symbol.observable` well-known symbol
  // https://github.com/tc39/proposal-observable

  defineWellKnownSymbol$4('observable');

  var defineWellKnownSymbol$3 = defineWellKnownSymbol$5; // `Symbol.patternMatch` well-known symbol
  // https://github.com/tc39/proposal-pattern-matching

  defineWellKnownSymbol$3('patternMatch');

  var $$L = _export;
  var newPromiseCapabilityModule$2 = newPromiseCapability$2;
  var perform$2 = perform$4; // `Promise.try` method
  // https://github.com/tc39/proposal-promise-try

  $$L({
    target: 'Promise',
    stat: true
  }, {
    'try': function (callbackfn) {
      var promiseCapability = newPromiseCapabilityModule$2.f(this);
      var result = perform$2(callbackfn);
      (result.error ? promiseCapability.reject : promiseCapability.resolve)(result.value);
      return promiseCapability.promise;
    }
  });

  var global$5 = global$q;
  var globalIsFinite = global$5.isFinite; // `Number.isFinite` method
  // https://tc39.github.io/ecma262/#sec-number.isfinite

  var numberIsFinite$1 = Number.isFinite || function isFinite(it) {
    return typeof it == 'number' && globalIsFinite(it);
  };

  var $$K = _export;
  var anObject$y = anObject$1e;
  var numberIsFinite = numberIsFinite$1;
  var createIteratorConstructor$2 = createIteratorConstructor$6;
  var InternalStateModule$5 = internalState;
  var SEEDED_RANDOM = 'Seeded Random';
  var SEEDED_RANDOM_GENERATOR = SEEDED_RANDOM + ' Generator';
  var setInternalState$5 = InternalStateModule$5.set;
  var getInternalState$4 = InternalStateModule$5.getterFor(SEEDED_RANDOM_GENERATOR);
  var SEED_TYPE_ERROR = 'Math.seededPRNG() argument should have a "seed" field with a finite value.';
  var $SeededRandomGenerator = createIteratorConstructor$2(function SeededRandomGenerator(seed) {
    setInternalState$5(this, {
      type: SEEDED_RANDOM_GENERATOR,
      seed: seed % 2147483647
    });
  }, SEEDED_RANDOM, function next() {
    var state = getInternalState$4(this);
    var seed = state.seed = (state.seed * 1103515245 + 12345) % 2147483647;
    return {
      value: (seed & 1073741823) / 1073741823,
      done: false
    };
  }); // `Math.seededPRNG` method
  // https://github.com/tc39/proposal-seeded-random
  // based on https://github.com/tc39/proposal-seeded-random/blob/78b8258835b57fc2100d076151ab506bc3202ae6/demo.html

  $$K({
    target: 'Math',
    stat: true,
    forced: true
  }, {
    seededPRNG: function seededPRNG(it) {
      var seed = anObject$y(it).seed;
      if (!numberIsFinite(seed)) throw TypeError(SEED_TYPE_ERROR);
      return new $SeededRandomGenerator(seed);
    }
  });

  var $$J = _export;
  var createIteratorConstructor$1 = createIteratorConstructor$6;
  var requireObjectCoercible$2 = requireObjectCoercible$8;
  var InternalStateModule$4 = internalState;
  var StringMultibyteModule = stringMultibyte;
  var codeAt = StringMultibyteModule.codeAt;
  var charAt$1 = StringMultibyteModule.charAt;
  var STRING_ITERATOR = 'String Iterator';
  var setInternalState$4 = InternalStateModule$4.set;
  var getInternalState$3 = InternalStateModule$4.getterFor(STRING_ITERATOR); // TODO: unify with String#@@iterator

  var $StringIterator = createIteratorConstructor$1(function StringIterator(string) {
    setInternalState$4(this, {
      type: STRING_ITERATOR,
      string: string,
      index: 0
    });
  }, 'String', function next() {
    var state = getInternalState$3(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return {
      value: undefined,
      done: true
    };
    point = charAt$1(string, index);
    state.index += point.length;
    return {
      value: {
        codePoint: codeAt(point, 0),
        position: index
      },
      done: false
    };
  }); // `String.prototype.codePoints` method
  // https://github.com/tc39/proposal-string-prototype-codepoints

  $$J({
    target: 'String',
    proto: true
  }, {
    codePoints: function codePoints() {
      return new $StringIterator(String(requireObjectCoercible$2(this)));
    }
  });

  var $$I = _export;
  var isArray = isArray$3;
  var isFrozen = Object.isFrozen;

  var isFrozenStringArray = function (array, allowUndefined) {
    if (!isFrozen || !isArray(array) || !isFrozen(array)) return false;
    var index = 0;
    var length = array.length;
    var element;

    while (index < length) {
      element = array[index++];

      if (!(typeof element === 'string' || allowUndefined && typeof element === 'undefined')) {
        return false;
      }
    }

    return length !== 0;
  }; // `Array.isTemplateObject` method
  // https://github.com/tc39/proposal-array-is-template-object


  $$I({
    target: 'Array',
    stat: true
  }, {
    isTemplateObject: function isTemplateObject(value) {
      if (!isFrozenStringArray(value, true)) return false;
      var raw = value.raw;
      if (raw.length !== value.length || !isFrozenStringArray(raw, false)) return false;
      return true;
    }
  });

  var global$4 = global$q;
  var shared = sharedStore;
  var getPrototypeOf$1 = objectGetPrototypeOf;
  var has$2 = has$g;
  var createNonEnumerableProperty$6 = createNonEnumerableProperty$e;
  var wellKnownSymbol$8 = wellKnownSymbol$s;
  var USE_FUNCTION_CONSTRUCTOR = 'USE_FUNCTION_CONSTRUCTOR';
  var ASYNC_ITERATOR$1 = wellKnownSymbol$8('asyncIterator');
  var AsyncIterator$1 = global$4.AsyncIterator;
  var PassedAsyncIteratorPrototype = shared.AsyncIteratorPrototype;
  var AsyncIteratorPrototype$1, prototype;

  {
    if (PassedAsyncIteratorPrototype) {
      AsyncIteratorPrototype$1 = PassedAsyncIteratorPrototype;
    } else if (typeof AsyncIterator$1 == 'function') {
      AsyncIteratorPrototype$1 = AsyncIterator$1.prototype;
    } else if (shared[USE_FUNCTION_CONSTRUCTOR] || global$4[USE_FUNCTION_CONSTRUCTOR]) {
      try {
        // eslint-disable-next-line no-new-func
        prototype = getPrototypeOf$1(getPrototypeOf$1(getPrototypeOf$1(Function('return async function*(){}()')())));
        if (getPrototypeOf$1(prototype) === Object.prototype) AsyncIteratorPrototype$1 = prototype;
      } catch (error) {
        /* empty */
      }
    }
  }

  if (!AsyncIteratorPrototype$1) AsyncIteratorPrototype$1 = {};

  if (!has$2(AsyncIteratorPrototype$1, ASYNC_ITERATOR$1)) {
    createNonEnumerableProperty$6(AsyncIteratorPrototype$1, ASYNC_ITERATOR$1, function () {
      return this;
    });
  }

  var asyncIteratorPrototype = AsyncIteratorPrototype$1;

  var $$H = _export;
  var anInstance$1 = anInstance$9;
  var createNonEnumerableProperty$5 = createNonEnumerableProperty$e;
  var has$1 = has$g;
  var wellKnownSymbol$7 = wellKnownSymbol$s;
  var AsyncIteratorPrototype = asyncIteratorPrototype;
  var IS_PURE$b = isPure;
  var TO_STRING_TAG$3 = wellKnownSymbol$7('toStringTag');

  var AsyncIteratorConstructor = function AsyncIterator() {
    anInstance$1(this, AsyncIteratorConstructor);
  };

  AsyncIteratorConstructor.prototype = AsyncIteratorPrototype;

  if (!has$1(AsyncIteratorPrototype, TO_STRING_TAG$3)) {
    createNonEnumerableProperty$5(AsyncIteratorPrototype, TO_STRING_TAG$3, 'AsyncIterator');
  }

  if (!has$1(AsyncIteratorPrototype, 'constructor') || AsyncIteratorPrototype.constructor === Object) {
    createNonEnumerableProperty$5(AsyncIteratorPrototype, 'constructor', AsyncIteratorConstructor);
  }

  $$H({
    global: true,
    forced: IS_PURE$b
  }, {
    AsyncIterator: AsyncIteratorConstructor
  });

  var path$3 = path$6;
  var aFunction$p = aFunction$J;
  var anObject$x = anObject$1e;
  var create$2 = objectCreate;
  var createNonEnumerableProperty$4 = createNonEnumerableProperty$e;
  var redefineAll$1 = redefineAll$8;
  var wellKnownSymbol$6 = wellKnownSymbol$s;
  var InternalStateModule$3 = internalState;
  var getBuiltIn$8 = getBuiltIn$m;
  var Promise$3 = getBuiltIn$8('Promise');
  var setInternalState$3 = InternalStateModule$3.set;
  var getInternalState$2 = InternalStateModule$3.get;
  var TO_STRING_TAG$2 = wellKnownSymbol$6('toStringTag');

  var $return$1 = function (value) {
    var iterator = getInternalState$2(this).iterator;
    var $$return = iterator['return'];
    return $$return === undefined ? Promise$3.resolve({
      done: true,
      value: value
    }) : anObject$x($$return.call(iterator, value));
  };

  var $throw$1 = function (value) {
    var iterator = getInternalState$2(this).iterator;
    var $$throw = iterator['throw'];
    return $$throw === undefined ? Promise$3.reject(value) : $$throw.call(iterator, value);
  };

  var asyncIteratorCreateProxy = function (nextHandler, IS_ITERATOR) {
    var AsyncIteratorProxy = function AsyncIterator(state) {
      state.next = aFunction$p(state.iterator.next);
      state.done = false;
      setInternalState$3(this, state);
    };

    AsyncIteratorProxy.prototype = redefineAll$1(create$2(path$3.AsyncIterator.prototype), {
      next: function next(arg) {
        var state = getInternalState$2(this);
        if (state.done) return Promise$3.resolve({
          done: true,
          value: undefined
        });

        try {
          return Promise$3.resolve(anObject$x(nextHandler.call(state, arg, Promise$3)));
        } catch (error) {
          return Promise$3.reject(error);
        }
      },
      'return': $return$1,
      'throw': $throw$1
    });

    if (!IS_ITERATOR) {
      createNonEnumerableProperty$4(AsyncIteratorProxy.prototype, TO_STRING_TAG$2, 'Generator');
    }

    return AsyncIteratorProxy;
  };

  var $$G = _export;
  var anObject$w = anObject$1e;
  var createAsyncIteratorProxy$6 = asyncIteratorCreateProxy;
  var AsyncIteratorProxy$6 = createAsyncIteratorProxy$6(function (arg, Promise) {
    var state = this;
    var iterator = state.iterator;
    return Promise.resolve(anObject$w(state.next.call(iterator, arg))).then(function (step) {
      if (anObject$w(step).done) {
        state.done = true;
        return {
          done: true,
          value: undefined
        };
      }

      return {
        done: false,
        value: [state.index++, step.value]
      };
    });
  });
  $$G({
    target: 'AsyncIterator',
    proto: true,
    real: true
  }, {
    asIndexedPairs: function asIndexedPairs() {
      return new AsyncIteratorProxy$6({
        iterator: anObject$w(this),
        index: 0
      });
    }
  });

  var toInteger = toInteger$7;

  var toPositiveInteger$4 = function (it) {
    var result = toInteger(it);
    if (result < 0) throw RangeError("The argument can't be less than 0");
    return result;
  };

  var $$F = _export;
  var anObject$v = anObject$1e;
  var toPositiveInteger$3 = toPositiveInteger$4;
  var createAsyncIteratorProxy$5 = asyncIteratorCreateProxy;
  var AsyncIteratorProxy$5 = createAsyncIteratorProxy$5(function (arg, Promise) {
    var state = this;
    return new Promise(function (resolve, reject) {
      var loop = function () {
        try {
          Promise.resolve(anObject$v(state.next.call(state.iterator, state.remaining ? undefined : arg))).then(function (step) {
            try {
              if (anObject$v(step).done) {
                state.done = true;
                resolve({
                  done: true,
                  value: undefined
                });
              } else if (state.remaining) {
                state.remaining--;
                loop();
              } else resolve({
                done: false,
                value: step.value
              });
            } catch (err) {
              reject(err);
            }
          }, reject);
        } catch (error) {
          reject(error);
        }
      };

      loop();
    });
  });
  $$F({
    target: 'AsyncIterator',
    proto: true,
    real: true
  }, {
    drop: function drop(limit) {
      return new AsyncIteratorProxy$5({
        iterator: anObject$v(this),
        remaining: toPositiveInteger$3(limit)
      });
    }
  });

  var aFunction$o = aFunction$J;
  var anObject$u = anObject$1e;
  var getBuiltIn$7 = getBuiltIn$m;
  var Promise$2 = getBuiltIn$7('Promise');
  var push$1 = [].push;

  var createMethod = function (TYPE) {
    var IS_TO_ARRAY = TYPE == 0;
    var IS_FOR_EACH = TYPE == 1;
    var IS_EVERY = TYPE == 2;
    var IS_SOME = TYPE == 3;
    return function (iterator, fn) {
      anObject$u(iterator);
      var next = aFunction$o(iterator.next);
      var array = IS_TO_ARRAY ? [] : undefined;
      if (!IS_TO_ARRAY) aFunction$o(fn);
      return new Promise$2(function (resolve, reject) {
        var loop = function () {
          try {
            Promise$2.resolve(anObject$u(next.call(iterator))).then(function (step) {
              try {
                if (anObject$u(step).done) {
                  resolve(IS_TO_ARRAY ? array : IS_SOME ? false : IS_EVERY || undefined);
                } else {
                  var value = step.value;

                  if (IS_TO_ARRAY) {
                    push$1.call(array, value);
                    loop();
                  } else {
                    Promise$2.resolve(fn(value)).then(function (result) {
                      if (IS_FOR_EACH) {
                        loop();
                      } else if (IS_EVERY) {
                        result ? loop() : resolve(false);
                      } else {
                        result ? resolve(IS_SOME || value) : loop();
                      }
                    }, reject);
                  }
                }
              } catch (err) {
                reject(err);
              }
            }, reject);
          } catch (error) {
            reject(error);
          }
        };

        loop();
      });
    };
  };

  var asyncIteratorIteration = {
    toArray: createMethod(0),
    forEach: createMethod(1),
    every: createMethod(2),
    some: createMethod(3),
    find: createMethod(4)
  };

  var $$E = _export;
  var $every = asyncIteratorIteration.every;
  $$E({
    target: 'AsyncIterator',
    proto: true,
    real: true
  }, {
    every: function every(fn) {
      return $every(this, fn);
    }
  });

  var $$D = _export;
  var aFunction$n = aFunction$J;
  var anObject$t = anObject$1e;
  var createAsyncIteratorProxy$4 = asyncIteratorCreateProxy;
  var AsyncIteratorProxy$4 = createAsyncIteratorProxy$4(function (arg, Promise) {
    var state = this;
    var filterer = state.filterer;
    return new Promise(function (resolve, reject) {
      var loop = function () {
        try {
          Promise.resolve(anObject$t(state.next.call(state.iterator, arg))).then(function (step) {
            try {
              if (anObject$t(step).done) {
                state.done = true;
                resolve({
                  done: true,
                  value: undefined
                });
              } else {
                var value = step.value;
                Promise.resolve(filterer(value)).then(function (selected) {
                  selected ? resolve({
                    done: false,
                    value: value
                  }) : loop();
                }, reject);
              }
            } catch (err) {
              reject(err);
            }
          }, reject);
        } catch (error) {
          reject(error);
        }
      };

      loop();
    });
  });
  $$D({
    target: 'AsyncIterator',
    proto: true,
    real: true
  }, {
    filter: function filter(filterer) {
      return new AsyncIteratorProxy$4({
        iterator: anObject$t(this),
        filterer: aFunction$n(filterer)
      });
    }
  });

  var $$C = _export;
  var $find = asyncIteratorIteration.find;
  $$C({
    target: 'AsyncIterator',
    proto: true,
    real: true
  }, {
    find: function find(fn) {
      return $find(this, fn);
    }
  });

  var getIteratorMethod$2 = getIteratorMethod$7;
  var wellKnownSymbol$5 = wellKnownSymbol$s;
  var ASYNC_ITERATOR = wellKnownSymbol$5('asyncIterator');

  var getAsyncIteratorMethod$2 = function (it) {
    var method = it[ASYNC_ITERATOR];
    return method === undefined ? getIteratorMethod$2(it) : method;
  };

  var $$B = _export;
  var aFunction$m = aFunction$J;
  var anObject$s = anObject$1e;
  var createAsyncIteratorProxy$3 = asyncIteratorCreateProxy;
  var getAsyncIteratorMethod$1 = getAsyncIteratorMethod$2;
  var AsyncIteratorProxy$3 = createAsyncIteratorProxy$3(function (arg, Promise) {
    var state = this;
    var mapper = state.mapper;
    var innerIterator, iteratorMethod;
    return new Promise(function (resolve, reject) {
      var outerLoop = function () {
        try {
          Promise.resolve(anObject$s(state.next.call(state.iterator, arg))).then(function (step) {
            try {
              if (anObject$s(step).done) {
                state.done = true;
                resolve({
                  done: true,
                  value: undefined
                });
              } else {
                Promise.resolve(mapper(step.value)).then(function (mapped) {
                  try {
                    iteratorMethod = getAsyncIteratorMethod$1(mapped);

                    if (iteratorMethod !== undefined) {
                      state.innerIterator = innerIterator = anObject$s(iteratorMethod.call(mapped));
                      state.innerNext = aFunction$m(innerIterator.next);
                      return innerLoop();
                    }

                    reject(TypeError('.flatMap callback should return an iterable object'));
                  } catch (error2) {
                    reject(error2);
                  }
                }, reject);
              }
            } catch (error1) {
              reject(error1);
            }
          }, reject);
        } catch (error) {
          reject(error);
        }
      };

      var innerLoop = function () {
        if (innerIterator = state.innerIterator) {
          try {
            Promise.resolve(anObject$s(state.innerNext.call(innerIterator))).then(function (result) {
              try {
                if (anObject$s(result).done) {
                  state.innerIterator = state.innerNext = null;
                  outerLoop();
                } else resolve({
                  done: false,
                  value: result.value
                });
              } catch (error1) {
                reject(error1);
              }
            }, reject);
          } catch (error) {
            reject(error);
          }
        } else outerLoop();
      };

      innerLoop();
    });
  });
  $$B({
    target: 'AsyncIterator',
    proto: true,
    real: true
  }, {
    flatMap: function flatMap(mapper) {
      return new AsyncIteratorProxy$3({
        iterator: anObject$s(this),
        mapper: aFunction$m(mapper),
        innerIterator: null,
        innerNext: null
      });
    }
  });

  var $$A = _export;
  var $forEach = asyncIteratorIteration.forEach;
  $$A({
    target: 'AsyncIterator',
    proto: true,
    real: true
  }, {
    forEach: function forEach(fn) {
      return $forEach(this, fn);
    }
  });

  var $$z = _export;
  var path$2 = path$6;
  var aFunction$l = aFunction$J;
  var anObject$r = anObject$1e;
  var toObject$1 = toObject$a;
  var createAsyncIteratorProxy$2 = asyncIteratorCreateProxy;
  var getAsyncIteratorMethod = getAsyncIteratorMethod$2;
  var AsyncIterator = path$2.AsyncIterator;
  var AsyncIteratorProxy$2 = createAsyncIteratorProxy$2(function (arg) {
    return anObject$r(this.next.call(this.iterator, arg));
  }, true);
  $$z({
    target: 'AsyncIterator',
    stat: true
  }, {
    from: function from(O) {
      var object = toObject$1(O);
      var usingIterator = getAsyncIteratorMethod(object);
      var iterator;

      if (usingIterator != null) {
        iterator = aFunction$l(usingIterator).call(object);
        if (iterator instanceof AsyncIterator) return iterator;
      } else {
        iterator = object;
      }

      return new AsyncIteratorProxy$2({
        iterator: iterator
      });
    }
  });

  var $$y = _export;
  var aFunction$k = aFunction$J;
  var anObject$q = anObject$1e;
  var createAsyncIteratorProxy$1 = asyncIteratorCreateProxy;
  var AsyncIteratorProxy$1 = createAsyncIteratorProxy$1(function (arg, Promise) {
    var state = this;
    var mapper = state.mapper;
    return Promise.resolve(anObject$q(state.next.call(state.iterator, arg))).then(function (step) {
      if (anObject$q(step).done) {
        state.done = true;
        return {
          done: true,
          value: undefined
        };
      }

      return Promise.resolve(mapper(step.value)).then(function (value) {
        return {
          done: false,
          value: value
        };
      });
    });
  });
  $$y({
    target: 'AsyncIterator',
    proto: true,
    real: true
  }, {
    map: function map(mapper) {
      return new AsyncIteratorProxy$1({
        iterator: anObject$q(this),
        mapper: aFunction$k(mapper)
      });
    }
  });

  var $$x = _export;
  var aFunction$j = aFunction$J;
  var anObject$p = anObject$1e;
  var getBuiltIn$6 = getBuiltIn$m;
  var Promise$1 = getBuiltIn$6('Promise');
  $$x({
    target: 'AsyncIterator',
    proto: true,
    real: true
  }, {
    reduce: function reduce(reducer
    /* , initialValue */
    ) {
      var iterator = anObject$p(this);
      var next = aFunction$j(iterator.next);
      var noInitial = arguments.length < 2;
      var accumulator = noInitial ? undefined : arguments[1];
      aFunction$j(reducer);
      return new Promise$1(function (resolve, reject) {
        var loop = function () {
          try {
            Promise$1.resolve(anObject$p(next.call(iterator))).then(function (step) {
              try {
                if (anObject$p(step).done) {
                  noInitial ? reject(TypeError('Reduce of empty iterator with no initial value')) : resolve(accumulator);
                } else {
                  var value = step.value;

                  if (noInitial) {
                    noInitial = false;
                    accumulator = value;
                    loop();
                  } else {
                    Promise$1.resolve(reducer(accumulator, value)).then(function (result) {
                      accumulator = result;
                      loop();
                    }, reject);
                  }
                }
              } catch (err) {
                reject(err);
              }
            }, reject);
          } catch (error) {
            reject(error);
          }
        };

        loop();
      });
    }
  });

  var $$w = _export;
  var $some = asyncIteratorIteration.some;
  $$w({
    target: 'AsyncIterator',
    proto: true,
    real: true
  }, {
    some: function some(fn) {
      return $some(this, fn);
    }
  });

  var $$v = _export;
  var anObject$o = anObject$1e;
  var toPositiveInteger$2 = toPositiveInteger$4;
  var createAsyncIteratorProxy = asyncIteratorCreateProxy;
  var AsyncIteratorProxy = createAsyncIteratorProxy(function (arg) {
    if (!this.remaining--) {
      this.done = true;
      return {
        done: true,
        value: undefined
      };
    }

    return this.next.call(this.iterator, arg);
  });
  $$v({
    target: 'AsyncIterator',
    proto: true,
    real: true
  }, {
    take: function take(limit) {
      return new AsyncIteratorProxy({
        iterator: anObject$o(this),
        remaining: toPositiveInteger$2(limit)
      });
    }
  });

  var $$u = _export;
  var $toArray = asyncIteratorIteration.toArray;
  $$u({
    target: 'AsyncIterator',
    proto: true,
    real: true
  }, {
    toArray: function toArray() {
      return $toArray(this);
    }
  });

  var $$t = _export;
  var global$3 = global$q;
  var anInstance = anInstance$9;
  var createNonEnumerableProperty$3 = createNonEnumerableProperty$e;
  var fails$1 = fails$g;
  var has = has$g;
  var wellKnownSymbol$4 = wellKnownSymbol$s;
  var IteratorPrototype = iteratorsCore.IteratorPrototype;
  wellKnownSymbol$4('iterator');
  var TO_STRING_TAG$1 = wellKnownSymbol$4('toStringTag');
  var NativeIterator = global$3.Iterator; // FF56- have non-standard global helper `Iterator`

  var FORCED = typeof NativeIterator != 'function' || NativeIterator.prototype !== IteratorPrototype // FF44- non-standard `Iterator` passes previous tests
  || !fails$1(function () {
    NativeIterator({});
  });

  var IteratorConstructor = function Iterator() {
    anInstance(this, IteratorConstructor);
  };

  if (!has(IteratorPrototype, TO_STRING_TAG$1)) {
    createNonEnumerableProperty$3(IteratorPrototype, TO_STRING_TAG$1, 'Iterator');
  }

  if (FORCED || !has(IteratorPrototype, 'constructor') || IteratorPrototype.constructor === Object) {
    createNonEnumerableProperty$3(IteratorPrototype, 'constructor', IteratorConstructor);
  }

  IteratorConstructor.prototype = IteratorPrototype;
  $$t({
    global: true,
    forced: FORCED
  }, {
    Iterator: IteratorConstructor
  });

  var path$1 = path$6;
  var aFunction$i = aFunction$J;
  var anObject$n = anObject$1e;
  var create$1 = objectCreate;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$e;
  var redefineAll = redefineAll$8;
  var wellKnownSymbol$3 = wellKnownSymbol$s;
  var InternalStateModule$2 = internalState;
  var setInternalState$2 = InternalStateModule$2.set;
  var getInternalState$1 = InternalStateModule$2.get;
  var TO_STRING_TAG = wellKnownSymbol$3('toStringTag');

  var $return = function (value) {
    var iterator = getInternalState$1(this).iterator;
    var $$return = iterator['return'];
    return $$return === undefined ? {
      done: true,
      value: value
    } : anObject$n($$return.call(iterator, value));
  };

  var $throw = function (value) {
    var iterator = getInternalState$1(this).iterator;
    var $$throw = iterator['throw'];
    if ($$throw === undefined) throw value;
    return $$throw.call(iterator, value);
  };

  var iteratorCreateProxy = function (nextHandler, IS_ITERATOR) {
    var IteratorProxy = function Iterator(state) {
      state.next = aFunction$i(state.iterator.next);
      state.done = false;
      setInternalState$2(this, state);
    };

    IteratorProxy.prototype = redefineAll(create$1(path$1.Iterator.prototype), {
      next: function next() {
        var state = getInternalState$1(this);
        var result = state.done ? undefined : nextHandler.apply(state, arguments);
        return {
          done: state.done,
          value: result
        };
      },
      'return': $return,
      'throw': $throw
    });

    if (!IS_ITERATOR) {
      createNonEnumerableProperty$2(IteratorProxy.prototype, TO_STRING_TAG, 'Generator');
    }

    return IteratorProxy;
  };

  var $$s = _export;
  var anObject$m = anObject$1e;
  var createIteratorProxy$6 = iteratorCreateProxy;
  var IteratorProxy$6 = createIteratorProxy$6(function (arg) {
    var result = anObject$m(this.next.call(this.iterator, arg));
    var done = this.done = !!result.done;
    if (!done) return [this.index++, result.value];
  });
  $$s({
    target: 'Iterator',
    proto: true,
    real: true
  }, {
    asIndexedPairs: function asIndexedPairs() {
      return new IteratorProxy$6({
        iterator: anObject$m(this),
        index: 0
      });
    }
  });

  var $$r = _export;
  var anObject$l = anObject$1e;
  var toPositiveInteger$1 = toPositiveInteger$4;
  var createIteratorProxy$5 = iteratorCreateProxy;
  var IteratorProxy$5 = createIteratorProxy$5(function (arg) {
    var iterator = this.iterator;
    var next = this.next;
    var result, done;

    while (this.remaining) {
      this.remaining--;
      result = anObject$l(next.call(iterator));
      done = this.done = !!result.done;
      if (done) return;
    }

    result = anObject$l(next.call(iterator, arg));
    done = this.done = !!result.done;
    if (!done) return result.value;
  });
  $$r({
    target: 'Iterator',
    proto: true,
    real: true
  }, {
    drop: function drop(limit) {
      return new IteratorProxy$5({
        iterator: anObject$l(this),
        remaining: toPositiveInteger$1(limit)
      });
    }
  });

  var $$q = _export;
  var iterate$f = iterate$I.exports;
  var aFunction$h = aFunction$J;
  var anObject$k = anObject$1e;
  $$q({
    target: 'Iterator',
    proto: true,
    real: true
  }, {
    every: function every(fn) {
      anObject$k(this);
      aFunction$h(fn);
      return !iterate$f(this, function (value) {
        if (!fn(value)) return iterate$f.stop();
      }, undefined, false, true).stopped;
    }
  });

  var $$p = _export;
  var aFunction$g = aFunction$J;
  var anObject$j = anObject$1e;
  var createIteratorProxy$4 = iteratorCreateProxy;
  var callWithSafeIterationClosing$2 = callWithSafeIterationClosing$5;
  var IteratorProxy$4 = createIteratorProxy$4(function (arg) {
    var iterator = this.iterator;
    var filterer = this.filterer;
    var next = this.next;
    var result, done, value;

    while (true) {
      result = anObject$j(next.call(iterator, arg));
      done = this.done = !!result.done;
      if (done) return;
      value = result.value;
      if (callWithSafeIterationClosing$2(iterator, filterer, value)) return value;
    }
  });
  $$p({
    target: 'Iterator',
    proto: true,
    real: true
  }, {
    filter: function filter(filterer) {
      return new IteratorProxy$4({
        iterator: anObject$j(this),
        filterer: aFunction$g(filterer)
      });
    }
  });

  var $$o = _export;
  var iterate$e = iterate$I.exports;
  var aFunction$f = aFunction$J;
  var anObject$i = anObject$1e;
  $$o({
    target: 'Iterator',
    proto: true,
    real: true
  }, {
    find: function find(fn) {
      anObject$i(this);
      aFunction$f(fn);
      return iterate$e(this, function (value) {
        if (fn(value)) return iterate$e.stop(value);
      }, undefined, false, true).result;
    }
  });

  var $$n = _export;
  var aFunction$e = aFunction$J;
  var anObject$h = anObject$1e;
  var getIteratorMethod$1 = getIteratorMethod$7;
  var createIteratorProxy$3 = iteratorCreateProxy;
  var callWithSafeIterationClosing$1 = callWithSafeIterationClosing$5;
  var IteratorProxy$3 = createIteratorProxy$3(function (arg) {
    var iterator = this.iterator;
    var result, mapped, iteratorMethod, innerIterator;

    while (true) {
      if (innerIterator = this.innerIterator) {
        result = anObject$h(this.innerNext.call(innerIterator));
        if (!result.done) return result.value;
        this.innerIterator = this.innerNext = null;
      }

      result = anObject$h(this.next.call(iterator, arg));
      if (this.done = !!result.done) return;
      mapped = callWithSafeIterationClosing$1(iterator, this.mapper, result.value);
      iteratorMethod = getIteratorMethod$1(mapped);

      if (iteratorMethod === undefined) {
        throw TypeError('.flatMap callback should return an iterable object');
      }

      this.innerIterator = innerIterator = anObject$h(iteratorMethod.call(mapped));
      this.innerNext = aFunction$e(innerIterator.next);
    }
  });
  $$n({
    target: 'Iterator',
    proto: true,
    real: true
  }, {
    flatMap: function flatMap(mapper) {
      return new IteratorProxy$3({
        iterator: anObject$h(this),
        mapper: aFunction$e(mapper),
        innerIterator: null,
        innerNext: null
      });
    }
  });

  var $$m = _export;
  var iterate$d = iterate$I.exports;
  var anObject$g = anObject$1e;
  $$m({
    target: 'Iterator',
    proto: true,
    real: true
  }, {
    forEach: function forEach(fn) {
      iterate$d(anObject$g(this), fn, undefined, false, true);
    }
  });

  var $$l = _export;
  var path = path$6;
  var aFunction$d = aFunction$J;
  var anObject$f = anObject$1e;
  var toObject = toObject$a;
  var createIteratorProxy$2 = iteratorCreateProxy;
  var getIteratorMethod = getIteratorMethod$7;
  var Iterator = path.Iterator;
  var IteratorProxy$2 = createIteratorProxy$2(function (arg) {
    var result = anObject$f(this.next.call(this.iterator, arg));
    var done = this.done = !!result.done;
    if (!done) return result.value;
  }, true);
  $$l({
    target: 'Iterator',
    stat: true
  }, {
    from: function from(O) {
      var object = toObject(O);
      var usingIterator = getIteratorMethod(object);
      var iterator;

      if (usingIterator != null) {
        iterator = aFunction$d(usingIterator).call(object);
        if (iterator instanceof Iterator) return iterator;
      } else {
        iterator = object;
      }

      return new IteratorProxy$2({
        iterator: iterator
      });
    }
  });

  var $$k = _export;
  var aFunction$c = aFunction$J;
  var anObject$e = anObject$1e;
  var createIteratorProxy$1 = iteratorCreateProxy;
  var callWithSafeIterationClosing = callWithSafeIterationClosing$5;
  var IteratorProxy$1 = createIteratorProxy$1(function (arg) {
    var iterator = this.iterator;
    var result = anObject$e(this.next.call(iterator, arg));
    var done = this.done = !!result.done;
    if (!done) return callWithSafeIterationClosing(iterator, this.mapper, result.value);
  });
  $$k({
    target: 'Iterator',
    proto: true,
    real: true
  }, {
    map: function map(mapper) {
      return new IteratorProxy$1({
        iterator: anObject$e(this),
        mapper: aFunction$c(mapper)
      });
    }
  });

  var $$j = _export;
  var iterate$c = iterate$I.exports;
  var aFunction$b = aFunction$J;
  var anObject$d = anObject$1e;
  $$j({
    target: 'Iterator',
    proto: true,
    real: true
  }, {
    reduce: function reduce(reducer
    /* , initialValue */
    ) {
      anObject$d(this);
      aFunction$b(reducer);
      var noInitial = arguments.length < 2;
      var accumulator = noInitial ? undefined : arguments[1];
      iterate$c(this, function (value) {
        if (noInitial) {
          noInitial = false;
          accumulator = value;
        } else {
          accumulator = reducer(accumulator, value);
        }
      }, undefined, false, true);
      if (noInitial) throw TypeError('Reduce of empty iterator with no initial value');
      return accumulator;
    }
  });

  var $$i = _export;
  var iterate$b = iterate$I.exports;
  var aFunction$a = aFunction$J;
  var anObject$c = anObject$1e;
  $$i({
    target: 'Iterator',
    proto: true,
    real: true
  }, {
    some: function some(fn) {
      anObject$c(this);
      aFunction$a(fn);
      return iterate$b(this, function (value) {
        if (fn(value)) return iterate$b.stop();
      }, undefined, false, true).stopped;
    }
  });

  var $$h = _export;
  var anObject$b = anObject$1e;
  var toPositiveInteger = toPositiveInteger$4;
  var createIteratorProxy = iteratorCreateProxy;
  var IteratorProxy = createIteratorProxy(function (arg) {
    if (!this.remaining--) {
      this.done = true;
      return;
    }

    var result = anObject$b(this.next.call(this.iterator, arg));
    var done = this.done = !!result.done;
    if (!done) return result.value;
  });
  $$h({
    target: 'Iterator',
    proto: true,
    real: true
  }, {
    take: function take(limit) {
      return new IteratorProxy({
        iterator: anObject$b(this),
        remaining: toPositiveInteger(limit)
      });
    }
  });

  var $$g = _export;
  var iterate$a = iterate$I.exports;
  var anObject$a = anObject$1e;
  var push = [].push;
  $$g({
    target: 'Iterator',
    proto: true,
    real: true
  }, {
    toArray: function toArray() {
      var result = [];
      iterate$a(anObject$a(this), push, result, false, true);
      return result;
    }
  });

  var anObject$9 = anObject$1e; // `Map.prototype.upsert` method
  // https://github.com/thumbsupep/proposal-upsert

  var mapUpsert = function upsert(key, updateFn
  /* , insertFn */
  ) {
    var map = anObject$9(this);
    var insertFn = arguments.length > 2 ? arguments[2] : undefined;
    var value;

    if (typeof updateFn != 'function' && typeof insertFn != 'function') {
      throw TypeError('At least one callback required');
    }

    if (map.has(key)) {
      value = map.get(key);

      if (typeof updateFn == 'function') {
        value = updateFn(value);
        map.set(key, value);
      }
    } else if (typeof insertFn == 'function') {
      value = insertFn();
      map.set(key, value);
    }

    return value;
  };

  var $$f = _export;
  var IS_PURE$a = isPure;
  var $upsert$2 = mapUpsert; // `Map.prototype.updateOrInsert` method (replaced by `Map.prototype.upsert`)
  // https://github.com/thumbsupep/proposal-upsert

  $$f({
    target: 'Map',
    proto: true,
    real: true,
    forced: IS_PURE$a
  }, {
    updateOrInsert: $upsert$2
  });

  var $$e = _export;
  var IS_PURE$9 = isPure;
  var $upsert$1 = mapUpsert; // `Map.prototype.upsert` method
  // https://github.com/thumbsupep/proposal-upsert

  $$e({
    target: 'Map',
    proto: true,
    real: true,
    forced: IS_PURE$9
  }, {
    upsert: $upsert$1
  });

  var $$d = _export;
  var IS_PURE$8 = isPure;
  var $upsert = mapUpsert; // `WeakMap.prototype.upsert` method
  // https://github.com/thumbsupep/proposal-upsert

  $$d({
    target: 'WeakMap',
    proto: true,
    real: true,
    forced: IS_PURE$8
  }, {
    upsert: $upsert
  });

  var $$c = _export;
  var IS_PURE$7 = isPure;
  var getBuiltIn$5 = getBuiltIn$m;
  var anObject$8 = anObject$1e;
  var aFunction$9 = aFunction$J;
  var speciesConstructor$4 = speciesConstructor$b;
  var iterate$9 = iterate$I.exports; // `Set.prototype.difference` method
  // https://github.com/tc39/proposal-set-methods

  $$c({
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$7
  }, {
    difference: function difference(iterable) {
      var set = anObject$8(this);
      var newSet = new (speciesConstructor$4(set, getBuiltIn$5('Set')))(set);
      var remover = aFunction$9(newSet['delete']);
      iterate$9(iterable, function (value) {
        remover.call(newSet, value);
      });
      return newSet;
    }
  });

  var $$b = _export;
  var IS_PURE$6 = isPure;
  var getBuiltIn$4 = getBuiltIn$m;
  var anObject$7 = anObject$1e;
  var aFunction$8 = aFunction$J;
  var speciesConstructor$3 = speciesConstructor$b;
  var iterate$8 = iterate$I.exports; // `Set.prototype.intersection` method
  // https://github.com/tc39/proposal-set-methods

  $$b({
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$6
  }, {
    intersection: function intersection(iterable) {
      var set = anObject$7(this);
      var newSet = new (speciesConstructor$3(set, getBuiltIn$4('Set')))();
      var hasCheck = aFunction$8(set.has);
      var adder = aFunction$8(newSet.add);
      iterate$8(iterable, function (value) {
        if (hasCheck.call(set, value)) adder.call(newSet, value);
      });
      return newSet;
    }
  });

  var $$a = _export;
  var IS_PURE$5 = isPure;
  var anObject$6 = anObject$1e;
  var aFunction$7 = aFunction$J;
  var iterate$7 = iterate$I.exports; // `Set.prototype.isDisjointFrom` method
  // https://tc39.github.io/proposal-set-methods/#Set.prototype.isDisjointFrom

  $$a({
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$5
  }, {
    isDisjointFrom: function isDisjointFrom(iterable) {
      var set = anObject$6(this);
      var hasCheck = aFunction$7(set.has);
      return !iterate$7(iterable, function (value) {
        if (hasCheck.call(set, value) === true) return iterate$7.stop();
      }).stopped;
    }
  });

  var $$9 = _export;
  var IS_PURE$4 = isPure;
  var getBuiltIn$3 = getBuiltIn$m;
  var anObject$5 = anObject$1e;
  var aFunction$6 = aFunction$J;
  var getIterator = getIterator$3;
  var iterate$6 = iterate$I.exports; // `Set.prototype.isSubsetOf` method
  // https://tc39.github.io/proposal-set-methods/#Set.prototype.isSubsetOf

  $$9({
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$4
  }, {
    isSubsetOf: function isSubsetOf(iterable) {
      var iterator = getIterator(this);
      var otherSet = anObject$5(iterable);
      var hasCheck = otherSet.has;

      if (typeof hasCheck != 'function') {
        otherSet = new (getBuiltIn$3('Set'))(iterable);
        hasCheck = aFunction$6(otherSet.has);
      }

      return !iterate$6(iterator, function (value) {
        if (hasCheck.call(otherSet, value) === false) return iterate$6.stop();
      }, undefined, false, true).stopped;
    }
  });

  var $$8 = _export;
  var IS_PURE$3 = isPure;
  var anObject$4 = anObject$1e;
  var aFunction$5 = aFunction$J;
  var iterate$5 = iterate$I.exports; // `Set.prototype.isSupersetOf` method
  // https://tc39.github.io/proposal-set-methods/#Set.prototype.isSupersetOf

  $$8({
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$3
  }, {
    isSupersetOf: function isSupersetOf(iterable) {
      var set = anObject$4(this);
      var hasCheck = aFunction$5(set.has);
      return !iterate$5(iterable, function (value) {
        if (hasCheck.call(set, value) === false) return iterate$5.stop();
      }).stopped;
    }
  });

  var $$7 = _export;
  var IS_PURE$2 = isPure;
  var getBuiltIn$2 = getBuiltIn$m;
  var anObject$3 = anObject$1e;
  var aFunction$4 = aFunction$J;
  var speciesConstructor$2 = speciesConstructor$b;
  var iterate$4 = iterate$I.exports; // `Set.prototype.union` method
  // https://github.com/tc39/proposal-set-methods

  $$7({
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$2
  }, {
    union: function union(iterable) {
      var set = anObject$3(this);
      var newSet = new (speciesConstructor$2(set, getBuiltIn$2('Set')))(set);
      iterate$4(iterable, aFunction$4(newSet.add), newSet);
      return newSet;
    }
  });

  var $$6 = _export;
  var IS_PURE$1 = isPure;
  var getBuiltIn$1 = getBuiltIn$m;
  var anObject$2 = anObject$1e;
  var aFunction$3 = aFunction$J;
  var speciesConstructor$1 = speciesConstructor$b;
  var iterate$3 = iterate$I.exports; // `Set.prototype.symmetricDifference` method
  // https://github.com/tc39/proposal-set-methods

  $$6({
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$1
  }, {
    symmetricDifference: function symmetricDifference(iterable) {
      var set = anObject$2(this);
      var newSet = new (speciesConstructor$1(set, getBuiltIn$1('Set')))(set);
      var remover = aFunction$3(newSet['delete']);
      var adder = aFunction$3(newSet.add);
      iterate$3(iterable, function (value) {
        remover.call(newSet, value) || adder.call(newSet, value);
      });
      return newSet;
    }
  });

  var defineWellKnownSymbol$2 = defineWellKnownSymbol$5; // `Symbol.asyncDispose` well-known symbol
  // https://github.com/tc39/proposal-using-statement

  defineWellKnownSymbol$2('asyncDispose');

  var defineWellKnownSymbol$1 = defineWellKnownSymbol$5; // `Symbol.dispose` well-known symbol
  // https://github.com/tc39/proposal-using-statement

  defineWellKnownSymbol$1('dispose');

  var $$5 = _export;
  var DESCRIPTORS = descriptors;
  var getPrototypeOf = objectGetPrototypeOf;
  var setPrototypeOf = objectSetPrototypeOf;
  var create = objectCreate;
  var defineProperty = objectDefineProperty;
  var createPropertyDescriptor = createPropertyDescriptor$6;
  var iterate$2 = iterate$I.exports;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$e;
  var InternalStateModule$1 = internalState;
  var setInternalState$1 = InternalStateModule$1.set;
  var getInternalAggregateErrorState = InternalStateModule$1.getterFor('AggregateError');

  var $AggregateError = function AggregateError(errors, message) {
    var that = this;
    if (!(that instanceof $AggregateError)) return new $AggregateError(errors, message);

    if (setPrototypeOf) {
      that = setPrototypeOf(new Error(message), getPrototypeOf(that));
    }

    var errorsArray = [];
    iterate$2(errors, errorsArray.push, errorsArray);
    if (DESCRIPTORS) setInternalState$1(that, {
      errors: errorsArray,
      type: 'AggregateError'
    });else that.errors = errorsArray;
    if (message !== undefined) createNonEnumerableProperty$1(that, 'message', String(message));
    return that;
  };

  $AggregateError.prototype = create(Error.prototype, {
    constructor: createPropertyDescriptor(5, $AggregateError),
    message: createPropertyDescriptor(5, ''),
    name: createPropertyDescriptor(5, 'AggregateError')
  });
  if (DESCRIPTORS) defineProperty.f($AggregateError.prototype, 'errors', {
    get: function () {
      return getInternalAggregateErrorState(this).errors;
    },
    configurable: true
  });
  $$5({
    global: true
  }, {
    AggregateError: $AggregateError
  });

  var $$4 = _export;
  var aFunction$2 = aFunction$J;
  var getBuiltIn = getBuiltIn$m;
  var newPromiseCapabilityModule$1 = newPromiseCapability$2;
  var perform$1 = perform$4;
  var iterate$1 = iterate$I.exports;
  var PROMISE_ANY_ERROR = 'No one promise resolved'; // `Promise.any` method
  // https://github.com/tc39/proposal-promise-any

  $$4({
    target: 'Promise',
    stat: true
  }, {
    any: function any(iterable) {
      var C = this;
      var capability = newPromiseCapabilityModule$1.f(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = perform$1(function () {
        var promiseResolve = aFunction$2(C.resolve);
        var errors = [];
        var counter = 0;
        var remaining = 1;
        var alreadyResolved = false;
        iterate$1(iterable, function (promise) {
          var index = counter++;
          var alreadyRejected = false;
          errors.push(undefined);
          remaining++;
          promiseResolve.call(C, promise).then(function (value) {
            if (alreadyRejected || alreadyResolved) return;
            alreadyResolved = true;
            resolve(value);
          }, function (e) {
            if (alreadyRejected || alreadyResolved) return;
            alreadyRejected = true;
            errors[index] = e;
            --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
          });
        });
        --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

  var isObject = isObject$i;
  var classof$1 = classofRaw$1;
  var wellKnownSymbol$2 = wellKnownSymbol$s;
  var MATCH = wellKnownSymbol$2('match'); // `IsRegExp` abstract operation
  // https://tc39.github.io/ecma262/#sec-isregexp

  var isRegexp = function (it) {
    var isRegExp;
    return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof$1(it) == 'RegExp');
  };

  var anObject$1 = anObject$1e; // `RegExp.prototype.flags` getter implementation
  // https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags

  var regexpFlags = function () {
    var that = anObject$1(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  var $$3 = _export;
  var requireObjectCoercible$1 = requireObjectCoercible$8;
  var isRegExp$1 = isRegexp;
  var getRegExpFlags$1 = regexpFlags;
  var wellKnownSymbol$1 = wellKnownSymbol$s;
  var REPLACE = wellKnownSymbol$1('replace');
  var RegExpPrototype$1 = RegExp.prototype; // `String.prototype.replaceAll` method
  // https://github.com/tc39/proposal-string-replace-all

  $$3({
    target: 'String',
    proto: true
  }, {
    replaceAll: function replaceAll(searchValue, replaceValue) {
      var O = requireObjectCoercible$1(this);
      var IS_REG_EXP, flags, replacer, string, searchString, template, result, position, index;

      if (searchValue != null) {
        IS_REG_EXP = isRegExp$1(searchValue);

        if (IS_REG_EXP) {
          flags = String(requireObjectCoercible$1('flags' in RegExpPrototype$1 ? searchValue.flags : getRegExpFlags$1.call(searchValue)));
          if (!~flags.indexOf('g')) throw TypeError('`.replaceAll` does not allow non-global regexes');
        }

        replacer = searchValue[REPLACE];

        if (replacer !== undefined) {
          return replacer.call(searchValue, O, replaceValue);
        }
      }

      string = String(O);
      searchString = String(searchValue);
      if (searchString === '') return replaceAll.call(string, /(?:)/g, replaceValue);
      template = string.split(searchString);

      if (typeof replaceValue !== 'function') {
        return template.join(String(replaceValue));
      }

      result = template[0];
      position = result.length;

      for (index = 1; index < template.length; index++) {
        result += String(replaceValue(searchString, position, string));
        position += searchString.length + template[index].length;
        result += template[index];
      }

      return result;
    }
  });

  var defineWellKnownSymbol = defineWellKnownSymbol$5;
  defineWellKnownSymbol('replaceAll');

  var $$2 = _export;
  var global$2 = global$q; // `globalThis` object
  // https://github.com/tc39/proposal-global

  $$2({
    global: true
  }, {
    globalThis: global$2
  });

  var $$1 = _export;
  var aFunction$1 = aFunction$J;
  var newPromiseCapabilityModule = newPromiseCapability$2;
  var perform = perform$4;
  var iterate = iterate$I.exports; // `Promise.allSettled` method
  // https://github.com/tc39/proposal-promise-allSettled

  $$1({
    target: 'Promise',
    stat: true
  }, {
    allSettled: function allSettled(iterable) {
      var C = this;
      var capability = newPromiseCapabilityModule.f(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = perform(function () {
        var promiseResolve = aFunction$1(C.resolve);
        var values = [];
        var counter = 0;
        var remaining = 1;
        iterate(iterable, function (promise) {
          var index = counter++;
          var alreadyCalled = false;
          values.push(undefined);
          remaining++;
          promiseResolve.call(C, promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[index] = {
              status: 'fulfilled',
              value: value
            };
            --remaining || resolve(values);
          }, function (e) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[index] = {
              status: 'rejected',
              reason: e
            };
            --remaining || resolve(values);
          });
        });
        --remaining || resolve(values);
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

  var charAt = stringMultibyte.charAt; // `AdvanceStringIndex` abstract operation
  // https://tc39.github.io/ecma262/#sec-advancestringindex

  var advanceStringIndex$1 = function (S, index, unicode) {
    return index + (unicode ? charAt(S, index).length : 1);
  };

  var $ = _export;
  var createIteratorConstructor = createIteratorConstructor$6;
  var requireObjectCoercible = requireObjectCoercible$8;
  var toLength = toLength$8;
  var aFunction = aFunction$J;
  var anObject = anObject$1e;
  var classof = classofRaw$1;
  var isRegExp = isRegexp;
  var getRegExpFlags = regexpFlags;
  var createNonEnumerableProperty = createNonEnumerableProperty$e;
  var fails = fails$g;
  var wellKnownSymbol = wellKnownSymbol$s;
  var speciesConstructor = speciesConstructor$b;
  var advanceStringIndex = advanceStringIndex$1;
  var InternalStateModule = internalState;
  var IS_PURE = isPure;
  var MATCH_ALL = wellKnownSymbol('matchAll');
  var REGEXP_STRING = 'RegExp String';
  var REGEXP_STRING_ITERATOR = REGEXP_STRING + ' Iterator';
  var setInternalState = InternalStateModule.set;
  var getInternalState = InternalStateModule.getterFor(REGEXP_STRING_ITERATOR);
  var RegExpPrototype = RegExp.prototype;
  var regExpBuiltinExec = RegExpPrototype.exec;
  var nativeMatchAll = ''.matchAll;
  var WORKS_WITH_NON_GLOBAL_REGEX = !!nativeMatchAll && !fails(function () {
    'a'.matchAll(/./);
  });

  var regExpExec = function (R, S) {
    var exec = R.exec;
    var result;

    if (typeof exec == 'function') {
      result = exec.call(R, S);
      if (typeof result != 'object') throw TypeError('Incorrect exec result');
      return result;
    }

    return regExpBuiltinExec.call(R, S);
  }; // eslint-disable-next-line max-len


  var $RegExpStringIterator = createIteratorConstructor(function RegExpStringIterator(regexp, string, global, fullUnicode) {
    setInternalState(this, {
      type: REGEXP_STRING_ITERATOR,
      regexp: regexp,
      string: string,
      global: global,
      unicode: fullUnicode,
      done: false
    });
  }, REGEXP_STRING, function next() {
    var state = getInternalState(this);
    if (state.done) return {
      value: undefined,
      done: true
    };
    var R = state.regexp;
    var S = state.string;
    var match = regExpExec(R, S);
    if (match === null) return {
      value: undefined,
      done: state.done = true
    };

    if (state.global) {
      if (String(match[0]) == '') R.lastIndex = advanceStringIndex(S, toLength(R.lastIndex), state.unicode);
      return {
        value: match,
        done: false
      };
    }

    state.done = true;
    return {
      value: match,
      done: false
    };
  });

  var $matchAll = function (string) {
    var R = anObject(this);
    var S = String(string);
    var C, flagsValue, flags, matcher, global, fullUnicode;
    C = speciesConstructor(R, RegExp);
    flagsValue = R.flags;

    if (flagsValue === undefined && R instanceof RegExp && !('flags' in RegExpPrototype)) {
      flagsValue = getRegExpFlags.call(R);
    }

    flags = flagsValue === undefined ? '' : String(flagsValue);
    matcher = new C(C === RegExp ? R.source : R, flags);
    global = !!~flags.indexOf('g');
    fullUnicode = !!~flags.indexOf('u');
    matcher.lastIndex = toLength(R.lastIndex);
    return new $RegExpStringIterator(matcher, S, global, fullUnicode);
  }; // `String.prototype.matchAll` method
  // https://github.com/tc39/proposal-string-matchall


  $({
    target: 'String',
    proto: true,
    forced: WORKS_WITH_NON_GLOBAL_REGEX
  }, {
    matchAll: function matchAll(regexp) {
      var O = requireObjectCoercible(this);
      var flags, S, matcher, rx;

      if (regexp != null) {
        if (isRegExp(regexp)) {
          flags = String(requireObjectCoercible('flags' in RegExpPrototype ? regexp.flags : getRegExpFlags.call(regexp)));
          if (!~flags.indexOf('g')) throw TypeError('`.matchAll` does not allow non-global regexes');
        }

        if (WORKS_WITH_NON_GLOBAL_REGEX) return nativeMatchAll.apply(O, arguments);
        matcher = regexp[MATCH_ALL];
        if (matcher === undefined && IS_PURE && classof(regexp) == 'RegExp') matcher = $matchAll;
        if (matcher != null) return aFunction(matcher).call(regexp, O);
      } else if (WORKS_WITH_NON_GLOBAL_REGEX) return nativeMatchAll.apply(O, arguments);

      S = String(O);
      rx = new RegExp(regexp, 'g');
      return rx[MATCH_ALL](S);
    }
  });
  MATCH_ALL in RegExpPrototype || createNonEnumerableProperty(RegExpPrototype, MATCH_ALL, $matchAll);

  var global$1 = typeof globalThis !== 'undefined' && globalThis || typeof self !== 'undefined' && self || typeof global$1 !== 'undefined' && global$1;
  var support = {
    searchParams: 'URLSearchParams' in global$1,
    iterable: 'Symbol' in global$1 && 'iterator' in Symbol,
    blob: 'FileReader' in global$1 && 'Blob' in global$1 && function () {
      try {
        new Blob();
        return true;
      } catch (e) {
        return false;
      }
    }(),
    formData: 'FormData' in global$1,
    arrayBuffer: 'ArrayBuffer' in global$1
  };

  function isDataView(obj) {
    return obj && DataView.prototype.isPrototypeOf(obj);
  }

  if (support.arrayBuffer) {
    var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

    var isArrayBufferView = ArrayBuffer.isView || function (obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
    };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }

    if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === '') {
      throw new TypeError('Invalid character in header field name: "' + name + '"');
    }

    return name.toLowerCase();
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }

    return value;
  } // Build a destructive iterator for the value list


  function iteratorFor(items) {
    var iterator = {
      next: function () {
        var value = items.shift();
        return {
          done: value === undefined,
          value: value
        };
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function () {
        return iterator;
      };
    }

    return iterator;
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function (value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function (header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function (name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function (name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ', ' + value : value;
  };

  Headers.prototype['delete'] = function (name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function (name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null;
  };

  Headers.prototype.has = function (name) {
    return this.map.hasOwnProperty(normalizeName(name));
  };

  Headers.prototype.set = function (name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function (callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push(name);
    });
    return iteratorFor(items);
  };

  Headers.prototype.values = function () {
    var items = [];
    this.forEach(function (value) {
      items.push(value);
    });
    return iteratorFor(items);
  };

  Headers.prototype.entries = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items);
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'));
    }

    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function (resolve, reject) {
      reader.onload = function () {
        resolve(reader.result);
      };

      reader.onerror = function () {
        reject(reader.error);
      };
    });
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise;
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise;
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }

    return chars.join('');
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0);
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer;
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function (body) {
      /*
        fetch-mock wraps the Response object in an ES6 Proxy to
        provide useful test harness features such as flush. However, on
        ES5 browsers without fetch or Proxy support pollyfills must be used;
        the proxy-pollyfill is unable to proxy an attribute unless it exists
        on the object before the Proxy is created. This change ensures
        Response.bodyUsed exists on the instance, while maintaining the
        semantic of setting Request.bodyUsed in the constructor before
        _initBody is called.
      */
      this.bodyUsed = this.bodyUsed;
      this._bodyInit = body;

      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer); // IE 10-11 can't handle a DataView body.

        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        this._bodyText = body = Object.prototype.toString.call(body);
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function () {
        var rejected = consumed(this);

        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob);
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]));
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob');
        } else {
          return Promise.resolve(new Blob([this._bodyText]));
        }
      };

      this.arrayBuffer = function () {
        if (this._bodyArrayBuffer) {
          var isConsumed = consumed(this);

          if (isConsumed) {
            return isConsumed;
          }

          if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
            return Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset, this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength));
          } else {
            return Promise.resolve(this._bodyArrayBuffer);
          }
        } else {
          return this.blob().then(readBlobAsArrayBuffer);
        }
      };
    }

    this.text = function () {
      var rejected = consumed(this);

      if (rejected) {
        return rejected;
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob);
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text');
      } else {
        return Promise.resolve(this._bodyText);
      }
    };

    if (support.formData) {
      this.formData = function () {
        return this.text().then(decode);
      };
    }

    this.json = function () {
      return this.text().then(JSON.parse);
    };

    return this;
  } // HTTP methods whose capitalization should be normalized


  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method;
  }

  function Request(input, options) {
    if (!(this instanceof Request)) {
      throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
    }

    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read');
      }

      this.url = input.url;
      this.credentials = input.credentials;

      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }

      this.method = input.method;
      this.mode = input.mode;
      this.signal = input.signal;

      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'same-origin';

    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }

    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.signal = options.signal || this.signal;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests');
    }

    this._initBody(body);

    if (this.method === 'GET' || this.method === 'HEAD') {
      if (options.cache === 'no-store' || options.cache === 'no-cache') {
        // Search for a '_' parameter in the query string
        var reParamSearch = /([?&])_=[^&]*/;

        if (reParamSearch.test(this.url)) {
          // If it already exists then set the value with the current time
          this.url = this.url.replace(reParamSearch, '$1_=' + new Date().getTime());
        } else {
          // Otherwise add a new '_' parameter to the end with the current time
          var reQueryString = /\?/;
          this.url += (reQueryString.test(this.url) ? '&' : '?') + '_=' + new Date().getTime();
        }
      }
    }
  }

  Request.prototype.clone = function () {
    return new Request(this, {
      body: this._bodyInit
    });
  };

  function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function (bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form;
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers(); // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2

    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' '); // Avoiding split via regex to work around a common IE11 bug with the core-js 3.6.0 regex polyfill
    // https://github.com/github/fetch/issues/748
    // https://github.com/zloirock/core-js/issues/751

    preProcessedHeaders.split('\r').map(function (header) {
      return header.indexOf('\n') === 0 ? header.substr(1, header.length) : header;
    }).forEach(function (line) {
      var parts = line.split(':');
      var key = parts.shift().trim();

      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers;
  }

  Body.call(Request.prototype);
  function Response(bodyInit, options) {
    if (!(this instanceof Response)) {
      throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
    }

    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = options.status === undefined ? 200 : options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = options.statusText === undefined ? '' : '' + options.statusText;
    this.headers = new Headers(options.headers);
    this.url = options.url || '';

    this._initBody(bodyInit);
  }
  Body.call(Response.prototype);

  Response.prototype.clone = function () {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    });
  };

  Response.error = function () {
    var response = new Response(null, {
      status: 0,
      statusText: ''
    });
    response.type = 'error';
    return response;
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function (url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code');
    }

    return new Response(null, {
      status: status,
      headers: {
        location: url
      }
    });
  };

  var DOMException = global$1.DOMException;

  try {
    new DOMException();
  } catch (err) {
    DOMException = function (message, name) {
      this.message = message;
      this.name = name;
      var error = Error(message);
      this.stack = error.stack;
    };

    DOMException.prototype = Object.create(Error.prototype);
    DOMException.prototype.constructor = DOMException;
  }

  function fetch$1(input, init) {
    return new Promise(function (resolve, reject) {
      var request = new Request(input, init);

      if (request.signal && request.signal.aborted) {
        return reject(new DOMException('Aborted', 'AbortError'));
      }

      var xhr = new XMLHttpRequest();

      function abortXhr() {
        xhr.abort();
      }

      xhr.onload = function () {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        setTimeout(function () {
          resolve(new Response(body, options));
        }, 0);
      };

      xhr.onerror = function () {
        setTimeout(function () {
          reject(new TypeError('Network request failed'));
        }, 0);
      };

      xhr.ontimeout = function () {
        setTimeout(function () {
          reject(new TypeError('Network request failed'));
        }, 0);
      };

      xhr.onabort = function () {
        setTimeout(function () {
          reject(new DOMException('Aborted', 'AbortError'));
        }, 0);
      };

      function fixUrl(url) {
        try {
          return url === '' && global$1.location.href ? global$1.location.href : url;
        } catch (e) {
          return url;
        }
      }

      xhr.open(request.method, fixUrl(request.url), true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false;
      }

      if ('responseType' in xhr) {
        if (support.blob) {
          xhr.responseType = 'blob';
        } else if (support.arrayBuffer && request.headers.get('Content-Type') && request.headers.get('Content-Type').indexOf('application/octet-stream') !== -1) {
          xhr.responseType = 'arraybuffer';
        }
      }

      if (init && typeof init.headers === 'object' && !(init.headers instanceof Headers)) {
        Object.getOwnPropertyNames(init.headers).forEach(function (name) {
          xhr.setRequestHeader(name, normalizeValue(init.headers[name]));
        });
      } else {
        request.headers.forEach(function (value, name) {
          xhr.setRequestHeader(name, value);
        });
      }

      if (request.signal) {
        request.signal.addEventListener('abort', abortXhr);

        xhr.onreadystatechange = function () {
          // DONE (success or failure)
          if (xhr.readyState === 4) {
            request.signal.removeEventListener('abort', abortXhr);
          }
        };
      }

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    });
  }
  fetch$1.polyfill = true;

  if (!global$1.fetch) {
    global$1.fetch = fetch$1;
    global$1.Headers = Headers;
    global$1.Request = Request;
    global$1.Response = Response;
  }

  /* Global Variables */
  //key

  var API_KEY = "e8736658caf702a4d64a14e306a36407"; //elements

  var zipInput = element("#zip"),
      feelingInput = element("#feelings"),
      generateButton = element("#generate"),
      entryHolder = element("#entryHolder"); //helper functions

  function element(ele) {
    return document.querySelector(ele);
  } // Create a new date instance dynamically with JS


  var d = new Date();
  var newDate = d.toLocaleDateString(); //---------- generate weather data -----------

  generateButton.addEventListener("click", function () {
    getExData("http://api.openweathermap.org/data/2.5/weather?zip=".concat(zipInput.value, "&appid=").concat(API_KEY)).then(function (data) {
      addData("/addData", {
        temp: data.main.temp,
        Country: data.sys.country,
        date: newDate,
        userResponse: feelingInput.value || "N/A"
      });
      updateUI("/getData");
    });
  }); // ==================================================================
  // ====== fetch data from from the external API (weather api) =======
  // ==================================================================

  var getExData = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
      var response, data, error;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return fetch(url);

            case 3:
              response = _context.sent;

              if (!response.ok) {
                _context.next = 11;
                break;
              }

              _context.next = 7;
              return response.json();

            case 7:
              data = _context.sent;
              return _context.abrupt("return", data);

            case 11:
              error = "Error ".concat(response.status, " : ").concat(response.statusText); //error message

              throw error;

            case 13:
              _context.next = 20;
              break;

            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](0);
              entryHolder.innerHTML = "<span style=\"color: #ffd5e3\">".concat(_context.t0, "</span>");

              if (!navigator.onLine) {
                entryHolder.innerHTML = "<span style=\"color: #ffd5e3\">Internet connection lost</span>"; //error message
              }

              throw _context.t0;

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 15]]);
    }));

    return function getExData(_x) {
      return _ref.apply(this, arguments);
    };
  }(); // ===========================================
  //============ post data to server ===========
  // ===========================================


  var addData = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var url,
          data,
          res,
          _newDate,
          _args2 = arguments;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              url = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : "";
              data = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
              _context2.prev = 2;
              _context2.next = 5;
              return fetch(url, {
                method: "POST",
                credentials: "same-origin",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
              });

            case 5:
              res = _context2.sent;
              _context2.next = 8;
              return res.json();

            case 8:
              _newDate = _context2.sent;
              return _context2.abrupt("return", _newDate);

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](2);
              throw new Error(_context2.t0);

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[2, 12]]);
    }));

    return function addData() {
      return _ref2.apply(this, arguments);
    };
  }(); // ===========================================
  // ========== get data from server ===========
  // ===========================================


  var updateUI = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
      var res, allData;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return fetch(url + "?dummy=" + Date.now());

            case 3:
              res = _context3.sent;
              _context3.next = 6;
              return res.json();

            case 6:
              allData = _context3.sent;
              // console.log(allData);
              //update UI content
              entryHolder.innerHTML = "\n    Date:\n    <span id=\"date\">".concat(allData.date, "</span><br />\n    Temperature:\n    <span id=\"temp\">").concat((allData.temp - 273.15).toFixed() + "°C", "</span><br />\n    Country:\n    <span id=\"country\">").concat(allData.Country, "</span><br />\n    Your feeling:\n    <span id=\"content\">").concat(allData.userResponse, "</span>");
              _context3.next = 13;
              break;

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](0);
              throw new Error(_context3.t0);

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 10]]);
    }));

    return function updateUI(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();

}());
