import supertest from "supertest";
import chai from "chai";
import app from "../../app.js";
import Joi from "joi";
import joiAssert from 'joi-assert';

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
global.Joi = Joi;
global.joiAssert = joiAssert;
