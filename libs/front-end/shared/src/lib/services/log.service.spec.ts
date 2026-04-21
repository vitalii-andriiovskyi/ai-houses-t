/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import { ErrorHandler } from '@angular/core';
import { LogService } from './log.service';
import { APP_CONFIG_TOKEN } from '../tokens/config.token';

describe('LogService', () => {
  let logSpy: jest.SpyInstance;
  let warnSpy: jest.SpyInstance;
  let logger: LogService;
  let errorHandler: ErrorHandler;
  const env: any = {
    production: false
  }

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log');
    warnSpy = jest.spyOn(console, 'warn');

    TestBed.configureTestingModule({
      providers: [
        { provide: ErrorHandler, useClass: MockErrorHandler },
        { provide: APP_CONFIG_TOKEN, useValue: { envRCP: env } },
        LogService
      ]
    });
    logger = TestBed.inject(LogService);
    errorHandler = TestBed.inject(ErrorHandler);
  });

  it('should be created', () => {
    expect(logger).toBeTruthy();
  });

  describe('log', () => {
    it('should delegate to console.log', () => {
      logger.log('param1', 'param2', 'param3');
      expect(logSpy).toHaveBeenCalledWith('param1', 'param2', 'param3');
    });
  });

  describe('warn', () => {
    it('should delegate to console.warn', () => {
      logger.warn('param1', 'param2', 'param3');
      expect(warnSpy).toHaveBeenCalledWith('param1', 'param2', 'param3');
    });
  });

  describe('error', () => {
    it('should delegate to ErrorHandler', () => {
      const err = new Error('some error message');
      logger.error(err);
      expect(errorHandler.handleError).toHaveBeenCalledWith(err);
    });
  });
});

class MockErrorHandler implements ErrorHandler {
  handleError = jest.fn();
}
