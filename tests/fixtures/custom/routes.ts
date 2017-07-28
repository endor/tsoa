/* tslint:disable */
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from '../../../src';
import { DeleteTestController } from './../controllers/deleteController';
import { GetTestController } from './../controllers/getController';
import { PatchTestController } from './../controllers/patchController';
import { PostTestController } from './../controllers/postController';
import { PutTestController } from './../controllers/putController';
import { MethodController } from './../controllers/methodController';
import { ParameterController } from './../controllers/parameterController';
import { SecurityTestController } from './../controllers/securityController';
import { expressAuthentication } from './authentication';

const models: TsoaRoute.Models={
  "EnumIndexValue": {
    "enums": ["0", "1"],
  },
  "EnumNumberValue": {
    "enums": ["2", "5"],
  },
  "EnumStringValue": {
    "enums": ["VALUE_1", "VALUE_2"],
  },
  "TestModel": {
    "properties": {
      "numberValue": { "dataType": "double", "required": true },
      "numberArray": { "dataType": "array", "array": { "dataType": "double" }, "required": true },
      "stringValue": { "dataType": "string", "required": true },
      "stringArray": { "dataType": "array", "array": { "dataType": "string" }, "required": true },
      "boolValue": { "dataType": "boolean", "required": true },
      "boolArray": { "dataType": "array", "array": { "dataType": "boolean" }, "required": true },
      "enumValue": { "ref": "EnumIndexValue" },
      "enumArray": { "dataType": "array", "array": { "ref": "EnumIndexValue" } },
      "enumNumberValue": { "ref": "EnumNumberValue" },
      "enumNumberArray": { "dataType": "array", "array": { "ref": "EnumNumberValue" } },
      "enumStringValue": { "ref": "EnumStringValue" },
      "enumStringArray": { "dataType": "array", "array": { "ref": "EnumStringValue" } },
      "modelValue": { "ref": "TestSubModel", "required": true },
      "modelsArray": { "dataType": "array", "array": { "ref": "TestSubModel" }, "required": true },
      "strLiteralVal": { "dataType": "enum", "enums": ["Foo", "Bar"], "required": true },
      "strLiteralArr": { "dataType": "array", "array": { "dataType": "enum", "enums": ["Foo", "Bar"] }, "required": true },
      "unionPrimetiveType": { "dataType": "enum", "enums": ["String", "1", "20", "true", "false"] },
      "dateValue": { "dataType": "datetime" },
      "optionalString": { "dataType": "string" },
      "anyType": { "dataType": "any" },
      "modelsObjectIndirect": { "ref": "TestSubModelContainer" },
      "modelsObjectIndirectNS": { "ref": "TestSubModelContainerNamespace.TestSubModelContainer" },
      "modelsObjectIndirectNS2": { "ref": "TestSubModelContainerNamespace.InnerNamespace.TestSubModelContainer2" },
      "modelsObjectIndirectNS_Alias": { "ref": "TestSubModelContainerNamespace_TestSubModelContainer" },
      "modelsObjectIndirectNS2_Alias": { "ref": "TestSubModelContainerNamespace_InnerNamespace_TestSubModelContainer2" },
      "modelsArrayIndirect": { "ref": "TestSubArrayModelContainer" },
      "modelsEnumIndirect": { "ref": "TestSubEnumModelContainer" },
      "typeAliasCase1": { "ref": "TypeAliasModelCase1" },
      "TypeAliasCase2": { "ref": "TypeAliasModelCase2" },
      "id": { "dataType": "double", "required": true },
    },
  },
  "TestSubModel": {
    "properties": {
      "email": { "dataType": "string", "required": true },
      "circular": { "ref": "TestModel" },
      "id": { "dataType": "double", "required": true },
    },
  },
  "TestSubModel2": {
    "properties": {
      "testSubModel2": { "dataType": "boolean", "required": true },
      "email": { "dataType": "string", "required": true },
      "circular": { "ref": "TestModel" },
      "id": { "dataType": "double", "required": true },
    },
  },
  "TestSubModelContainer": {
    "additionalProperties": { "ref": "TestSubModel2" },
  },
  "TestSubModelNamespace.TestSubModelNS": {
    "properties": {
      "testSubModelNS": { "dataType": "boolean", "required": true },
      "email": { "dataType": "string", "required": true },
      "circular": { "ref": "TestModel" },
      "id": { "dataType": "double", "required": true },
    },
  },
  "TestSubModelContainerNamespace.TestSubModelContainer": {
    "additionalProperties": { "ref": "TestSubModelNamespace.TestSubModelNS" },
  },
  "TestSubModelContainerNamespace.InnerNamespace.TestSubModelContainer2": {
    "additionalProperties": { "ref": "TestSubModelNamespace.TestSubModelNS" },
  },
  "TestSubModelContainerNamespace_TestSubModelContainer": {
  },
  "TestSubModelContainerNamespace_InnerNamespace_TestSubModelContainer2": {
  },
  "TestSubArrayModelContainer": {
    "additionalProperties": { "dataType": "array", "array": { "ref": "TestSubModel2" } },
  },
  "TestSubEnumModelContainer": {
    "additionalProperties": { "ref": "EnumStringValue" },
  },
  "TypeAliasModelCase1": {
    "properties": {
      "value1": { "dataType": "string", "required": true },
      "value2": { "dataType": "string", "required": true },
    },
  },
  "TypeAliasModelCase2": {
    "properties": {
      "value1": { "dataType": "string", "required": true },
      "value2": { "dataType": "string", "required": true },
      "value3": { "dataType": "string", "required": true },
    },
  },
  "TestClassModel": {
    "properties": {
      "publicStringProperty": { "dataType": "string", "required": true, "validators": { "minLength": { "value": 3 }, "maxLength": { "value": 20 }, "pattern": { "value": "^[a-zA-Z]+$" } } },
      "optionalPublicStringProperty": { "dataType": "string", "validators": { "minLength": { "value": 0 }, "maxLength": { "value": 10 } } },
      "stringProperty": { "dataType": "string", "required": true },
      "publicConstructorVar": { "dataType": "string", "required": true },
      "optionalPublicConstructorVar": { "dataType": "string" },
      "id": { "dataType": "double", "required": true },
    },
  },
  "Result": {
    "properties": {
      "value": { "dataType": "enum", "enums": ["success", "failure"], "required": true },
    },
  },
  "GenericModelTestModel": {
    "properties": {
      "result": { "ref": "TestModel", "required": true },
    },
  },
  "GenericModelTestModel[]": {
    "properties": {
      "result": { "dataType": "array", "array": { "ref": "TestModel" }, "required": true },
    },
  },
  "GenericModelstring": {
    "properties": {
      "result": { "dataType": "string", "required": true },
    },
  },
  "GenericModelstring[]": {
    "properties": {
      "result": { "dataType": "array", "array": { "dataType": "string" }, "required": true },
    },
  },
  "GenericRequestTestModel": {
    "properties": {
      "name": { "dataType": "string", "required": true },
      "value": { "ref": "TestModel", "required": true },
    },
  },
  "ErrorResponseModel": {
    "properties": {
      "status": { "dataType": "double", "required": true },
      "message": { "dataType": "string", "required": true },
    },
  },
  "Gender": {
    "enums": ["MALE", "FEMALE"],
  },
  "ParameterTestModel": {
    "properties": {
      "firstname": { "dataType": "string", "required": true },
      "lastname": { "dataType": "string", "required": true },
      "age": { "dataType": "integer", "required": true, "validators": { "minimum": { "value": 1 }, "maximum": { "value": 100 } } },
      "weight": { "dataType": "float", "required": true },
      "human": { "dataType": "boolean", "required": true },
      "gender": { "ref": "Gender", "required": true },
    },
  },
  "UserResponseModel": {
    "properties": {
      "id": { "dataType": "double", "required": true },
      "name": { "dataType": "string", "required": true },
    },
  },
};

export function RegisterRoutes(app: any) {
  app.delete('/v1/DeleteTest',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new DeleteTestController();


      const promise=controller.deleteWithReturnValue.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.delete('/v1/DeleteTest/Current',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new DeleteTestController();


      const promise=controller.deleteCurrent.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.delete('/v1/DeleteTest/:numberPathParam/:booleanPathParam/:stringPathParam',
    function(request: any, response: any, next: any) {
      const args={
        numberPathParam: { "in": "path", "name": "numberPathParam", "required": true, "dataType": "double" },
        stringPathParam: { "in": "path", "name": "stringPathParam", "required": true, "dataType": "string" },
        booleanPathParam: { "in": "path", "name": "booleanPathParam", "required": true, "dataType": "boolean" },
        booleanParam: { "in": "query", "name": "booleanParam", "required": true, "dataType": "boolean" },
        stringParam: { "in": "query", "name": "stringParam", "required": true, "dataType": "string" },
        numberParam: { "in": "query", "name": "numberParam", "required": true, "dataType": "double" },
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new DeleteTestController();


      const promise=controller.getModelByParams.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/GetTest',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new GetTestController();


      const promise=controller.getModel.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/GetTest/Current',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new GetTestController();


      const promise=controller.getCurrentModel.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/GetTest/ClassModel',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new GetTestController();


      const promise=controller.getClassModel.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/GetTest/Multi',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new GetTestController();


      const promise=controller.getMultipleModels.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/GetTest/:numberPathParam/:booleanPathParam/:stringPathParam',
    function(request: any, response: any, next: any) {
      const args={
        numberPathParam: { "in": "path", "name": "numberPathParam", "required": true, "dataType": "double", "validators": { "isDouble": { "errorMsg": "numberPathParam" }, "minimum": { "value": 1 }, "maximum": { "value": 10 } } },
        stringPathParam: { "in": "path", "name": "stringPathParam", "required": true, "dataType": "string", "validators": { "minLength": { "value": 1 }, "maxLength": { "value": 10 } } },
        booleanPathParam: { "in": "path", "name": "booleanPathParam", "required": true, "dataType": "boolean" },
        booleanParam: { "in": "query", "name": "booleanParam", "required": true, "dataType": "boolean" },
        stringParam: { "in": "query", "name": "stringParam", "required": true, "dataType": "string", "validators": { "isString": { "errorMsg": "Custom error message" }, "minLength": { "value": 3 }, "maxLength": { "value": 10 } } },
        numberParam: { "in": "query", "name": "numberParam", "required": true, "dataType": "double" },
        optionalStringParam: { "in": "query", "name": "optionalStringParam", "dataType": "string" },
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new GetTestController();


      const promise=controller.getModelByParams.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/GetTest/ResponseWithUnionTypeProperty',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new GetTestController();


      const promise=controller.getResponseWithUnionTypeProperty.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/GetTest/UnionTypeResponse',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new GetTestController();


      const promise=controller.getUnionTypeResponse.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/GetTest/Request',
    function(request: any, response: any, next: any) {
      const args={
        request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new GetTestController();


      const promise=controller.getRequest.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/GetTest/DateParam',
    function(request: any, response: any, next: any) {
      const args={
        date: { "in": "query", "name": "date", "required": true, "dataType": "datetime" },
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new GetTestController();


      const promise=controller.getByDataParam.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/GetTest/ThrowsError',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new GetTestController();


      const promise=controller.getThrowsError.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/GetTest/GeneratesTags',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new GetTestController();


      const promise=controller.getGeneratesTags.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/GetTest/HandleBufferType',
    function(request: any, response: any, next: any) {
      const args={
        buffer: { "in": "query", "name": "buffer", "required": true, "dataType": "buffer" },
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new GetTestController();


      const promise=controller.getBuffer.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/GetTest/GenericModel',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new GetTestController();


      const promise=controller.getGenericModel.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/GetTest/GenericModelArray',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new GetTestController();


      const promise=controller.getGenericModelArray.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/GetTest/GenericPrimitive',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new GetTestController();


      const promise=controller.getGenericPrimitive.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/GetTest/GenericPrimitiveArray',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new GetTestController();


      const promise=controller.getGenericPrimitiveArray.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.patch('/v1/PatchTest',
    function(request: any, response: any, next: any) {
      const args={
        model: { "in": "body", "name": "model", "required": true, "ref": "TestModel" },
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new PatchTestController();


      const promise=controller.patchModel.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.patch('/v1/PatchTest/Location',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new PatchTestController();


      const promise=controller.patchModelAtLocation.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.patch('/v1/PatchTest/Multi',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new PatchTestController();


      const promise=controller.patchWithMultiReturn.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.patch('/v1/PatchTest/WithId/:id',
    function(request: any, response: any, next: any) {
      const args={
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new PatchTestController();


      const promise=controller.patchWithId.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.post('/v1/PostTest',
    function(request: any, response: any, next: any) {
      const args={
        model: { "in": "body", "name": "model", "required": true, "ref": "TestModel" },
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new PostTestController();


      const promise=controller.postModel.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.patch('/v1/PostTest',
    function(request: any, response: any, next: any) {
      const args={
        model: { "in": "body", "name": "model", "required": true, "ref": "TestModel" },
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new PostTestController();


      const promise=controller.updateModel.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.post('/v1/PostTest/WithClassModel',
    function(request: any, response: any, next: any) {
      const args={
        model: { "in": "body", "name": "model", "required": true, "ref": "TestClassModel" },
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new PostTestController();


      const promise=controller.postClassModel.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.post('/v1/PostTest/Location',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new PostTestController();


      const promise=controller.postModelAtLocation.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.post('/v1/PostTest/Multi',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new PostTestController();


      const promise=controller.postWithMultiReturn.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.post('/v1/PostTest/WithId/:id',
    function(request: any, response: any, next: any) {
      const args={
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new PostTestController();


      const promise=controller.postWithId.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.post('/v1/PostTest/WithBodyAndQueryParams',
    function(request: any, response: any, next: any) {
      const args={
        model: { "in": "body", "name": "model", "required": true, "ref": "TestModel" },
        query: { "in": "query", "name": "query", "required": true, "dataType": "string" },
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new PostTestController();


      const promise=controller.postWithBodyAndQueryParams.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.post('/v1/PostTest/GenericBody',
    function(request: any, response: any, next: any) {
      const args={
        genericReq: { "in": "body", "name": "genericReq", "required": true, "ref": "GenericRequestTestModel" },
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new PostTestController();


      const promise=controller.getGenericRequest.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.put('/v1/PutTest',
    function(request: any, response: any, next: any) {
      const args={
        model: { "in": "body", "name": "model", "required": true, "ref": "TestModel" },
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new PutTestController();


      const promise=controller.putModel.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.put('/v1/PutTest/Location',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new PutTestController();


      const promise=controller.putModelAtLocation.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.put('/v1/PutTest/Multi',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new PutTestController();


      const promise=controller.putWithMultiReturn.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.put('/v1/PutTest/WithId/:id',
    function(request: any, response: any, next: any) {
      const args={
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new PutTestController();


      const promise=controller.putWithId.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/MethodTest/Get',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new MethodController();


      const promise=controller.getMethod.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.post('/v1/MethodTest/Post',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new MethodController();


      const promise=controller.postMethod.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.patch('/v1/MethodTest/Patch',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new MethodController();


      const promise=controller.patchMethod.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.put('/v1/MethodTest/Put',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new MethodController();


      const promise=controller.putMethod.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.delete('/v1/MethodTest/Delete',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new MethodController();


      const promise=controller.deleteMethod.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/MethodTest/Description',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new MethodController();


      const promise=controller.description.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/MethodTest/Tags',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new MethodController();


      const promise=controller.tags.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/MethodTest/MultiResponse',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new MethodController();


      const promise=controller.multiResponse.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/MethodTest/SuccessResponse',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new MethodController();


      const promise=controller.successResponse.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/MethodTest/ApiSecurity',
    authenticateMiddleware('api_key'
    ),
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new MethodController();


      const promise=controller.apiSecurity.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/MethodTest/OauthSecurity',
    authenticateMiddleware('tsoa_auth'
      , ["write:pets", "read:pets"]
    ),
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new MethodController();


      const promise=controller.oauthSecurity.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/MethodTest/DeprecatedMethod',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new MethodController();


      const promise=controller.deprecatedMethod.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/MethodTest/SummaryMethod',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new MethodController();


      const promise=controller.summaryMethod.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/MethodTest/returnAnyType',
    function(request: any, response: any, next: any) {
      const args={
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new MethodController();


      const promise=controller.returnAnyType.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/ParameterTest/Query',
    function(request: any, response: any, next: any) {
      const args={
        firstname: { "in": "query", "name": "firstname", "required": true, "dataType": "string" },
        lastname: { "in": "query", "name": "last_name", "required": true, "dataType": "string" },
        age: { "in": "query", "name": "age", "required": true, "dataType": "integer", "validators": { "isInt": { "errorMsg": "age" } } },
        weight: { "in": "query", "name": "weight", "required": true, "dataType": "float", "validators": { "isFloat": { "errorMsg": "weight" } } },
        human: { "in": "query", "name": "human", "required": true, "dataType": "boolean" },
        gender: { "in": "query", "name": "gender", "required": true, "dataType": "enum", "enums": ["MALE", "FEMALE"] },
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new ParameterController();


      const promise=controller.getQuery.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/ParameterTest/Path/:firstname/:last_name/:age/:weight/:human/:gender',
    function(request: any, response: any, next: any) {
      const args={
        firstname: { "in": "path", "name": "firstname", "required": true, "dataType": "string" },
        lastname: { "in": "path", "name": "last_name", "required": true, "dataType": "string" },
        age: { "in": "path", "name": "age", "required": true, "dataType": "integer", "validators": { "isInt": { "errorMsg": "age" } } },
        weight: { "in": "path", "name": "weight", "required": true, "dataType": "float", "validators": { "isFloat": { "errorMsg": "weight" } } },
        human: { "in": "path", "name": "human", "required": true, "dataType": "boolean" },
        gender: { "in": "path", "name": "gender", "required": true, "dataType": "enum", "enums": ["MALE", "FEMALE"] },
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new ParameterController();


      const promise=controller.getPath.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/ParameterTest/Header',
    function(request: any, response: any, next: any) {
      const args={
        firstname: { "in": "header", "name": "firstname", "required": true, "dataType": "string" },
        lastname: { "in": "header", "name": "last_name", "required": true, "dataType": "string" },
        age: { "in": "header", "name": "age", "required": true, "dataType": "integer", "validators": { "isInt": { "errorMsg": "age" } } },
        weight: { "in": "header", "name": "weight", "required": true, "dataType": "float", "validators": { "isFloat": { "errorMsg": "weight" } } },
        human: { "in": "header", "name": "human", "required": true, "dataType": "boolean" },
        gender: { "in": "header", "name": "gender", "required": true, "dataType": "enum", "enums": ["MALE", "FEMALE"] },
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new ParameterController();


      const promise=controller.getHeader.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/ParameterTest/Request',
    function(request: any, response: any, next: any) {
      const args={
        request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new ParameterController();


      const promise=controller.getRequest.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.post('/v1/ParameterTest/Body',
    function(request: any, response: any, next: any) {
      const args={
        body: { "in": "body", "name": "body", "required": true, "ref": "ParameterTestModel" },
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new ParameterController();


      const promise=controller.getBody.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.post('/v1/ParameterTest/BodyProps',
    function(request: any, response: any, next: any) {
      const args={
        firstname: { "in": "body-prop", "name": "firstname", "required": true, "dataType": "string" },
        lastname: { "in": "body-prop", "name": "lastname", "required": true, "dataType": "string" },
        age: { "in": "body-prop", "name": "age", "required": true, "dataType": "integer", "validators": { "isInt": { "errorMsg": "age" } } },
        weight: { "in": "body-prop", "name": "weight", "required": true, "dataType": "float", "validators": { "isFloat": { "errorMsg": "weight" } } },
        human: { "in": "body-prop", "name": "human", "required": true, "dataType": "boolean" },
        gender: { "in": "body-prop", "name": "gender", "required": true, "ref": "Gender" },
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new ParameterController();


      const promise=controller.getBodyProps.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/ParameterTest/ParamaterQueyAnyType',
    function(request: any, response: any, next: any) {
      const args={
        name: { "in": "query", "name": "name", "required": true, "dataType": "any" },
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new ParameterController();


      const promise=controller.parameterAnyType.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.post('/v1/ParameterTest/ParamaterBodyAnyType',
    function(request: any, response: any, next: any) {
      const args={
        body: { "in": "body", "name": "body", "required": true, "dataType": "any" },
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new ParameterController();


      const promise=controller.paramaterBodyAnyType.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.post('/v1/ParameterTest/ParamaterQueyArray',
    function(request: any, response: any, next: any) {
      const args={
        name: { "in": "query", "name": "name", "required": true, "dataType": "array", "array": { "dataType": "string" } },
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new ParameterController();


      const promise=controller.paramaterQueyArray.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/SecurityTest',
    authenticateMiddleware('api_key'
    ),
    function(request: any, response: any, next: any) {
      const args={
        request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new SecurityTestController();


      const promise=controller.GetWithApi.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/SecurityTest/Koa',
    authenticateMiddleware('api_key'
    ),
    function(request: any, response: any, next: any) {
      const args={
        request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new SecurityTestController();


      const promise=controller.GetWithApiForKoa.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/v1/SecurityTest/Oauth',
    authenticateMiddleware('tsoa_auth'
      , ["write:pets", "read:pets"]
    ),
    function(request: any, response: any, next: any) {
      const args={
        request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
      };

      let validatedArgs: any[]=[];
      try {
        validatedArgs=getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller=new SecurityTestController();


      const promise=controller.GetWithSecurity.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });

  function authenticateMiddleware(name: string, scopes: string[]=[]) {
    return (request: any, response: any, next: any) => {
      expressAuthentication(request, name, scopes).then((user: any) => {
        request['user']=user;
        next();
      })
        .catch((error: any) => {
          response.status(401);
          next(error)
        });
    }
  }

  function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
    return Promise.resolve(promise)
      .then((data: any) => {
        let statusCode;
        if (controllerObj instanceof Controller) {
          const controller=controllerObj as Controller
          const headers=controller.getHeaders();
          Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
          });

          statusCode=controller.getStatus();
        }

        if (data) {
          response.status(statusCode|200).json(data);
        } else {
          response.status(statusCode|204).end();
        }
      })
      .catch((error: any) => next(error));
  }

  function getValidatedArgs(args: any, request: any): any[] {
    const errorFields: FieldErrors={};
    const values=Object.keys(args).map(function(key) {
      const name=args[key].name;
      switch (args[key].in) {
        case 'request':
          return request;
        case 'query':
          return ValidateParam(args[key], request.query[name], models, name, errorFields);
        case 'path':
          return ValidateParam(args[key], request.params[name], models, name, errorFields);
        case 'header':
          return ValidateParam(args[key], request.header(name), models, name, errorFields);
        case 'body':
          return ValidateParam(args[key], request.body, models, name, errorFields);
        case 'body-prop':
          return ValidateParam(args[key], request.body[name], models, name, errorFields);
      }
    });

    if (Object.keys(errorFields).length>0) {
      throw new ValidateError(errorFields, '');
    }
    return values;
  }
}