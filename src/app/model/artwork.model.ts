export class Artwork {
  _id: number;
  exibition_id: number;
  title: string;
  beginYear: string;
  endYear: string;
  medium: string;
  dimensions: string;
  author: string;
  description: string;
  imageId: string;

  constructor(obj?: any) {
    this._id = obj && obj._id || 0;
    this.exibition_id = obj && obj.exibition_id || 0;
    this.title = obj && obj.title || '';
    this.beginYear = obj && obj.beginYear || '';
    this.endYear = obj && obj.endYear || '';
    this.medium = obj && obj.medium || '';
    this.dimensions = obj && obj.dimensions || '';
    this.author = obj && obj.author || '';
    this.description = obj && obj.description || '';
    this.imageId = obj && obj.imageId || '';
  }
}