import { TestBed } from '@angular/core/testing';

import { TableService } from './table.service';

describe('TableService', () => {
  let service: TableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('parsingData', () => {
    it('should return empty array if content is empty', () => {
      const result = service.parsingData('');
      expect(result).toEqual([]);
    });

    it('should parse content correctly', () => {
      const content = 'container1|data1\ncontainer2|data2\ncontainer3|data3';
      const expectedResult = [
        'container1 -- data1',
        'container2 -- data2',
        'container3 -- data3',
      ];
      const result = service.parsingData(content);
      expect(result).toEqual(expectedResult);
    });

    it('should handle content with extra whitespace', () => {
      const content = 'container1|   data1  \ncontainer2|data2';
      const expectedResult = ['container1 -- data1', 'container2 -- data2'];
      const result = service.parsingData(content);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('parsingContentToArray', () => {
    it('should parse content correctly into arrays', () => {
      const content = 'container1|data1\ncontainer2|data2\ncontainer3|data3';
      const expectedResult = {
        arrayOfContainers: ['container1', 'container2', 'container3'],
        arrayOfContent: ['data1', 'data2', 'data3'],
      };
      const result = service['parseContentToArray'](content);
      expect(result).toEqual(expectedResult);
    });

    it('should handle empty content', () => {
      const content = '';
      const expectedResult = {
        arrayOfContainers: [],
        arrayOfContent: [],
      };
      const result = service['parseContentToArray'](content);
      expect(result).toEqual(expectedResult);
    });

    it('should handle content with extra whitespace', () => {
      const content = 'container1|   data1  \ncontainer2|data2';
      const expectedResult = {
        arrayOfContainers: ['container1', 'container2'],
        arrayOfContent: ['data1', 'data2'],
      };
      const result = service['parseContentToArray'](content);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('modifyLines', () => {
    it('should modify lines correctly for request message', () => {
      const inputArray = [
        'This is a {test} message with method, topic, version, resource',
      ];
      const expectedOutputArray = [
        'This is a [REQUEST]: {test} message with method, topic, version, resource',
      ];
      const result = service['modifyLines'](inputArray);
      expect(result).toEqual(expectedOutputArray);
    });

    it('should modify lines correctly for response message', () => {
      const inputArray = ['This is a {test} message with status'];
      const expectedOutputArray = [
        'This is a [RESPONSE]: {test} message with status',
      ];
      const result = service['modifyLines'](inputArray);
      expect(result).toEqual(expectedOutputArray);
    });

    it('should modify lines correctly for publication message', () => {
      const inputArray = ['This is a {test} message with topic and version'];
      const expectedOutputArray = [
        'This is a [PUBLICATION]: {test} message with topic and version',
      ];
      const result = service['modifyLines'](inputArray);
      expect(result).toEqual(expectedOutputArray);
    });
  });
});
