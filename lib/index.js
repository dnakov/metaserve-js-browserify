// Generated by CoffeeScript 1.10.0
(function() {
  var BrowserifyCompiler, Compiler, React, VERBOSE, browserify, fs,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  fs = require('fs');

  browserify = require('browserify');

  React = require('react');

  Compiler = require('metaserve/lib/compiler');

  VERBOSE = process.env.METASERVE_VERBOSE != null;

  BrowserifyCompiler = (function(superClass) {
    extend(BrowserifyCompiler, superClass);

    function BrowserifyCompiler() {
      return BrowserifyCompiler.__super__.constructor.apply(this, arguments);
    }

    BrowserifyCompiler.prototype.default_options = {
      base_dir: './static/js',
      ext: 'js'
    };

    BrowserifyCompiler.prototype.compile = function(coffee_filename, cb) {
      var bundler, bundling, compiled, e, error, options;
      options = this.options;
      try {
        if (VERBOSE) {
          console.log('[Browserify compiler] Going to compile ' + coffee_filename);
        }
        bundler = browserify(options.browserify);
        if (typeof this.beforeBundle === "function") {
          this.beforeBundle(bundler);
        }
        bundling = bundler.add(coffee_filename).bundle();
        bundling.on('error', function(err) {
          console.log('[Browserify compile error]', err);
          return cb("[Browserify compile error] " + err);
        });
        compiled = '';
        bundling.on('data', function(data) {
          return compiled += data;
        });
        return bundling.on('end', function() {
          return cb(null, {
            compiled: compiled
          });
        });
      } catch (error) {
        e = error;
        console.log('[Browserify compile error]', err);
        return cb("[Browserify compile error] " + err);
      }
    };

    return BrowserifyCompiler;

  })(Compiler);

  module.exports = function(options) {
    if (options == null) {
      options = {};
    }
    return new BrowserifyCompiler(options);
  };

  module.exports.BrowserifyCompiler = BrowserifyCompiler;

}).call(this);
