export class FileModel {
    id: number;
    name: string;
    content: string;
    size: any;

    constructor(id: number, name: string, content: string, size: any) {
        this.id = id;
        this.name = name;
        this.content = content;
        this.size = size;
    }
}