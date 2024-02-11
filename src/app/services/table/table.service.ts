import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor() {}

  parsingData(content: string) {
    if (!content) {
      return [];
    }

    const { arrayOfContainers, arrayOfContent } =
      this.parseContentToArray(content);

    const modifiedLines = this.modifyLines(arrayOfContent);

    return this.combineArrays(arrayOfContainers, modifiedLines);
  }

  private parseContentToArray(content: string) {
    const arrayOfContainers: string[] = [];
    const arrayOfContent: string[] = [];

    const data: string[] = content.split('\n');
    const filteredData = data.filter((item: string) => item !== '');

    filteredData.forEach((text: string) => {
      const [container, content] = text.split('|');
      arrayOfContainers.push(container.trim());
      arrayOfContent.push(content.trim());
    });

    return { arrayOfContainers, arrayOfContent };
  }

  private modifyLines(arrayOfContent: string[]) {
    return arrayOfContent.map((content: string) => {
      const startIndex = content.indexOf('{');
      const requestKeys = ['method', 'topic', 'version', 'resource'];
      const responseKeys = ['status'];
      const publicationKeys = ['topic', 'version'];

      const requestMessageWords = requestKeys.every((word: string) =>
        content.includes(word)
      );
      const responseMessageWords = responseKeys.every((word: string) =>
        content.includes(word)
      );
      const publicationMessageWords = publicationKeys.every((word: string) =>
        content.includes(word)
      );

      if (startIndex !== -1) {
        if (requestMessageWords) {
          return `${content.substring(
            0,
            startIndex
          )}[REQUEST]: ${content.substring(startIndex)}`;
        } else if (responseMessageWords) {
          return `${content.substring(
            0,
            startIndex
          )}[RESPONSE]: ${content.substring(startIndex)}`;
        } else if (publicationMessageWords) {
          return `${content.substring(
            0,
            startIndex
          )}[PUBLICATION]: ${content.substring(startIndex)}`;
        }
      }
      return content;
    });
  }

  private combineArrays(arrayOfContainers: string[], modifiedLines: string[]) {
    return arrayOfContainers.map(
      (container: string, index: number) =>
        `${container} -- ${modifiedLines[index]}`
    );
  }
}
