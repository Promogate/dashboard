import S3 from "aws-sdk/clients/s3";

export interface IAWSUploadService {
  uploadImage(input: IAWSUpload.Input): Promise<IAWSUpload.Output>
}

export namespace IAWSUpload {
  export type Input = {
    file: File,
    user: string
  }

  export type Output = {
    url: string
  }
}

export class AWSUploadService implements IAWSUploadService {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      region: "sa-east-1",
      accessKeyId: "AKIAR74NBCHEPXKO3O4K",
      secretAccessKey: "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",
      signatureVersion: "v4",
    });
  }

  async uploadImage(input: IAWSUpload.Input): Promise<IAWSUpload.Output> {
    const fileName = `${Date.now()}.${input.user}`;

    const params = {
      Bucket: "promogate",
      Key: fileName,
      Body: input.file,
    };

    const upload = this.s3.upload(params);
    const { Location } = await upload.promise();
    return {
      url: Location
    };
  }

  async uploadFile(input: IAWSUpload.Input): Promise<IAWSUpload.Output> {
    const params = {
      Bucket: "promogate",
      Key: input.file.name,
      Body: input.file,
    };

    const upload = this.s3.upload(params);
    const { Location } = await upload.promise();
    return {
      url: Location
    };
  }
}