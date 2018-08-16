#!/usr/bin/env node

var AES = require("crypto-js/aes");
var enc = require("crypto-js/enc-utf8");
const chalk = require("chalk");
const logSymbols = require("log-symbols");
const vorpal = require("vorpal")();

vorpal
  .command("about")
  .description("Prints About")
  .alias("a")
  .action(function(args, callback) {
    console.log("A simple CLI for encryption and decryption");
    callback();
  });

vorpal
  .command("encrypt <original> <key>")
  .description("Encrypts word")
  .alias("e")
  .action(function(args, callback) {
    original = args.original;
    key = args.key;
    console.log(logSymbols.info, "Encryption Begin");
    ciphertext = AES.encrypt(original, key).toString();
    console.log(chalk.bold.red(ciphertext));
    console.log(logSymbols.success, "Encryption Successful");
    callback();
  });

vorpal
  .command("decrypt <ciphertext> <key>")
  .description("Decrypts word")
  .alias("d")
  .action(function(args, callback) {
    ciphertext = args.ciphertext;
    key = args.key;
    console.log(logSymbols.info, "Decryption Begin");
    plaintext = AES.decrypt(ciphertext, key).toString(enc);
    console.log(chalk.bold.green(plaintext));
    console.log(logSymbols.success, "Decryption Successful");
    callback();
  });

vorpal
  .command("string encrypt")
  .description("Encrypts text")
  .alias("se")
  .action(function(args, callback) {
    var questions = [
      {
        type: "input",
        name: "phrase",
        message: "Enter the string: "
      },
      {
        type: "input",
        name: "key",
        message: "Enter the key: "
      }
    ];
    this.prompt(questions, function(answers) {
      phrase = answers.phrase;
      key = answers.key;
      console.log(logSymbols.info, "Encryption Begin");
      ciphertext = AES.encrypt(phrase, key).toString();
      console.log(chalk.bold.red(ciphertext));
      console.log(logSymbols.success, "Encryption Successful");
      callback();
    });
  });

vorpal
  .command("string decrypt")
  .description("Decrypts text")
  .alias("sd")
  .action(function(args, callback) {
    var questions = [
      {
        type: "input",
        name: "phrase",
        message: "Enter the string: "
      },
      {
        type: "input",
        name: "key",
        message: "Enter the key: "
      }
    ];
    this.prompt(questions, function(answers) {
      phrase = answers.phrase;
      key = answers.key;
      console.log(logSymbols.info, "Decryption Begin");
      plaintext = AES.decrypt(phrase, key).toString(enc);
      console.log(chalk.bold.green(plaintext));
      console.log(logSymbols.success, "Decryption Successful");
      callback();
    });
  });

vorpal.delimiter(chalk.blue("az$")).show();
