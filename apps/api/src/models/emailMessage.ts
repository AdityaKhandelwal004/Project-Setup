import {
  getResourcesFileSource,
  parseHbsTemplate,
} from "../utils/handlebarsUtils.ts";

interface TemplateData {
  [key: string]: any;
}

class EmailMessage {
  private subject: string;
  private resourcePath: string;
  private data: TemplateData;

  constructor(subject: string, resourcePath: string, data: TemplateData) {
    this.subject = subject;
    this.resourcePath = resourcePath;
    this.data = data;
  }

  getSubject(): string {
    return this.subject || "";
  }

  async getFormattedMessage(): Promise<string> {
    if (!this.resourcePath) {
      return "";
    }

    const source = await getResourcesFileSource(this.resourcePath);
    return await parseHbsTemplate(source, this.data);
  }
}

export default EmailMessage;
